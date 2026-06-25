/* ============================================================
   ui.js
   Reusable rendering helpers. The pillar views stay mostly data
   focused; this file owns small UI primitives and formatting.
   ============================================================ */
(function () {
  const chartRegistry = new Map();
  const chartJobs = [];

  const esc = (v) => String(v ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const attr = esc;
  const clamp = (n, min = 0, max = 100) => Math.max(min, Math.min(max, Number(n) || 0));
  const sum = (arr, key = 'hours') => (arr || []).reduce((t, r) => t + (Number(r[key]) || 0), 0);

  function dateLocal(iso) {
    if (!iso) return null;
    const [y, m, d] = String(iso).slice(0, 10).split('-').map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
  }

  function todayIso() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function fmtDate(iso, fallback = '') {
    const d = dateLocal(iso);
    if (!d) return fallback;
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function daysUntil(iso) {
    const d = dateLocal(iso);
    if (!d) return null;
    const today = dateLocal(todayIso());
    return Math.ceil((d - today) / 86400000);
  }

  function relativeTime(iso) {
    if (!iso) return 'never';
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  }

  function dayOfYear(d = new Date()) {
    const start = new Date(d.getFullYear(), 0, 0);
    return Math.floor((d - start) / 86400000);
  }

  function percent(num, denom) {
    if (!denom) return 0;
    return clamp((Number(num) || 0) / Number(denom) * 100);
  }

  function viewHead(title, subtitle, actions = '') {
    return `
      <div class="view-head">
        <div class="view-title-row">
          <div>
            <h1>${esc(title)}</h1>
            ${subtitle ? `<p>${esc(subtitle)}</p>` : ''}
          </div>
          <div class="view-actions">${actions}</div>
        </div>
      </div>`;
  }

  function card(title, body, opts = {}) {
    const head = title ? `
      <div class="card-head">
        <h2>${esc(title)}</h2>
        <span class="spacer"></span>
        ${opts.actions || ''}
      </div>` : '';
    return `<section class="card ${opts.className || ''}">${head}${body}</section>`;
  }

  function stat(label, value, sub = '') {
    return `<div class="card stat">
      <div class="stat-val">${esc(value)}</div>
      <div class="stat-lbl">${esc(label)}</div>
      ${sub ? `<div class="stat-sub">${esc(sub)}</div>` : ''}
    </div>`;
  }

  function pill(text, color = '') {
    return `<span class="pill ${esc(color)}">${esc(text)}</span>`;
  }

  function ring(pct, label, sub = '', size = 92, color = 'var(--uncblue)') {
    const r = (size - 10) / 2;
    const c = 2 * Math.PI * r;
    const off = c - (clamp(pct) / 100) * c;
    return `<span class="ring" style="width:${size}px;height:${size}px">
      <svg width="${size}" height="${size}" aria-hidden="true">
        <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--line-soft)" stroke-width="8"></circle>
        <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round" stroke-dasharray="${c.toFixed(2)}" stroke-dashoffset="${off.toFixed(2)}"></circle>
      </svg>
      <span class="ring-label"><b>${esc(label)}</b>${sub ? `<span>${esc(sub)}</span>` : ''}</span>
    </span>`;
  }

  function progressBar(value, goal, label) {
    const pct = percent(value, goal);
    return `<div class="bar-row">
      <span class="bar-label">${esc(label)}</span>
      <span class="bar"><i style="width:${pct}%"></i></span>
      <span class="bar-val">${esc(value)} / ${esc(goal)}</span>
    </div>`;
  }

  function segmentedBar(items) {
    const segs = items.map((x) => `<span style="width:${clamp(x.pct)}%;background:${x.color}"></span>`).join('');
    const legend = items.map((x) => `<span class="lg"><i class="dot" style="background:${x.color}"></i>${esc(x.name)}</span>`).join('');
    return `<div class="seg-bar">${segs}</div><div class="seg-legend">${legend}</div>`;
  }

  function editableTable({ path, rows, columns, template, addLabel = 'Add row', emptyText = 'No rows yet.', compact = false }) {
    const header = columns.map((c) => `<th>${esc(c.label)}</th>`).join('') + '<th></th>';
    const body = rows.length ? rows.map((row, visibleIndex) => {
      const index = row._index ?? visibleIndex;
      const cells = columns.map((col) => `<td class="${col.className || ''}">${cellInput(path, row, index, col)}</td>`).join('');
      return `<tr>${cells}<td>
        <div class="row-actions">
          <button class="icon-btn" title="Move up" data-action="move-row" data-path="${attr(path)}" data-index="${index}" data-dir="-1">↑</button>
          <button class="icon-btn" title="Move down" data-action="move-row" data-path="${attr(path)}" data-index="${index}" data-dir="1">↓</button>
          <button class="icon-btn" title="Delete" data-action="delete-row" data-path="${attr(path)}" data-index="${index}">×</button>
        </div>
      </td></tr>`;
    }).join('') : `<tr><td class="tbl-empty" colspan="${columns.length + 1}">${esc(emptyText)}</td></tr>`;
    return `<div class="table-shell ${compact ? 'compact' : ''}">
      <div class="tracker"><table class="tbl"><thead><tr>${header}</tr></thead><tbody>${body}</tbody></table></div>
      <button class="btn btn-sm" data-action="add-row" data-path="${attr(path)}" data-template="${attr(JSON.stringify(template || {}))}">+ ${esc(addLabel)}</button>
    </div>`;
  }

  function cellInput(path, row, index, col) {
    const value = col.compute ? col.compute(row, index) : row[col.key];
    if (col.type === 'computed') return `<span class="${col.muted ? 'muted' : ''}">${esc(value)}</span>`;
    if (col.type === 'checkbox') {
      return `<input type="checkbox" data-edit-path="${attr(`${path}.${index}.${col.key}`)}" ${value ? 'checked' : ''} aria-label="${attr(col.label)}">`;
    }
    if (col.type === 'select') {
      const opts = (col.options || []).map((o) => `<option value="${attr(o)}" ${String(value ?? '') === String(o) ? 'selected' : ''}>${esc(o)}</option>`).join('');
      const statusClass = col.status ? 'status' : '';
      return `<select class="${statusClass}" data-v="${attr(value || '')}" data-edit-path="${attr(`${path}.${index}.${col.key}`)}">${opts}</select>`;
    }
    if (col.type === 'textarea') {
      return `<textarea rows="${col.rows || 2}" data-edit-path="${attr(`${path}.${index}.${col.key}`)}" placeholder="${attr(col.placeholder || '')}">${esc(value)}</textarea>`;
    }
    if (col.type === 'url') {
      const open = value ? `<a class="tiny" href="${attr(value)}" target="_blank" rel="noopener">Open</a>` : '';
      return `<div class="url-cell"><input type="url" data-edit-path="${attr(`${path}.${index}.${col.key}`)}" value="${attr(value)}" placeholder="${attr(col.placeholder || 'Drive / doc URL')}">${open}</div>`;
    }
    const type = col.type || 'text';
    return `<input type="${attr(type)}" data-edit-path="${attr(`${path}.${index}.${col.key}`)}" value="${attr(value)}" placeholder="${attr(col.placeholder || '')}">`;
  }

  function tips(items = []) {
    if (!items.length) return '<p class="muted">No tips yet.</p>';
    return `<div class="tips">${items.map((t) => `
      <div class="tip">
        <span class="tip-badge">${pill(t.tag === 'official' ? 'Official' : 'Community', t.tag === 'official' ? 'tag-official' : 'tag-community')}</span>
        <span>${esc(t.t)}</span>
      </div>`).join('')}</div>`;
  }

  function resources(items = []) {
    if (!items.length) return '<p class="muted">No resources yet.</p>';
    return `<div class="resource-list">${items.map((r) => `
      <div class="res-item">
        <span>↗</span>
        <a href="${attr(r.url || '#')}" target="_blank" rel="noopener">${esc(r.name)}</a>
      </div>`).join('')}</div>`;
  }

  function subtabs(active, tabs, key) {
    return `<div class="subtabs">${tabs.map((t) => `
      <button class="subtab ${active === t.id ? 'active' : ''}" data-action="set-ui" data-key="${attr(key)}" data-value="${attr(t.id)}">${esc(t.label)}</button>
    `).join('')}</div>`;
  }

  function calendar(events, monthValue, title = 'Calendar') {
    const [year, month] = (monthValue || todayIso().slice(0, 7)).split('-').map(Number);
    const first = new Date(year, month - 1, 1);
    const startDay = first.getDay();
    const lastDate = new Date(year, month, 0).getDate();
    const prevLast = new Date(year, month - 1, 0).getDate();
    const cells = [];
    const today = todayIso();
    const byDate = {};
    events.forEach((ev) => {
      if (!ev.date) return;
      (byDate[String(ev.date).slice(0, 10)] ||= []).push(ev);
    });
    for (let i = 0; i < 42; i++) {
      const dateNum = i - startDay + 1;
      let d;
      let out = false;
      if (dateNum < 1) {
        d = new Date(year, month - 2, prevLast + dateNum);
        out = true;
      } else if (dateNum > lastDate) {
        d = new Date(year, month, dateNum - lastDate);
        out = true;
      } else {
        d = new Date(year, month - 1, dateNum);
      }
      const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const evs = (byDate[iso] || []).slice(0, 3).map((ev) => `<div class="cal-ev ${attr((ev.type || '').toLowerCase())}" title="${attr(ev.title)}">${esc(ev.title)}</div>`).join('');
      cells.push(`<div class="cal-cell ${out ? 'out' : ''} ${iso === today ? 'today' : ''}">
        <div class="cal-num">${d.getDate()}</div>${evs}
      </div>`);
    }
    const label = first.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
    return `<div class="calendar">
      <div class="cal-head">
        <h3>${esc(title)}</h3>
        <span class="spacer"></span>
        <button class="btn btn-sm" data-action="calendar-shift" data-dir="-1">←</button>
        <strong>${esc(label)}</strong>
        <button class="btn btn-sm" data-action="calendar-shift" data-dir="1">→</button>
      </div>
      <div class="cal-grid">${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => `<div class="cal-dow">${d}</div>`).join('')}${cells.join('')}</div>
    </div>`;
  }

  function kanban(board) {
    const cols = [
      ['todo', 'To-Do'],
      ['doing', 'In Progress'],
      ['done', 'Done'],
    ];
    return `<div class="kanban">${cols.map(([key, label]) => {
      const cards = board[key] || [];
      return `<div class="kan-col" data-kanban-col="${key}">
        <h4>${esc(label)} <span class="count">(${cards.length})</span></h4>
        ${cards.map((card, i) => `<div class="kan-card" draggable="true" data-kanban-status="${key}" data-kanban-index="${i}">
          <button class="kc-del" data-action="delete-kanban" data-status="${key}" data-index="${i}" title="Delete">×</button>
          <strong>${esc(card.title || card.text || 'Untitled')}</strong>
          ${card.note ? `<div class="tiny muted">${esc(card.note)}</div>` : ''}
        </div>`).join('')}
        <button class="kan-add" data-action="add-kanban" data-status="${key}">+ Add card</button>
      </div>`;
    }).join('')}</div>`;
  }

  function chartCanvas(id, config, height = 210) {
    chartJobs.push({ id, config });
    return `<canvas id="${attr(id)}" height="${height}"></canvas>`;
  }

  function runCharts() {
    const jobs = chartJobs.splice(0, chartJobs.length);
    jobs.forEach(({ id, config }) => {
      const node = document.getElementById(id);
      if (!node || !window.Chart) return;
      chartRegistry.get(id)?.destroy();
      chartRegistry.set(id, new Chart(node, config));
    });
  }

  function input(path, value, opts = {}) {
    const type = opts.type || 'text';
    return `<input type="${attr(type)}" data-edit-path="${attr(path)}" value="${attr(value)}" placeholder="${attr(opts.placeholder || '')}">`;
  }

  function textarea(path, value, opts = {}) {
    return `<textarea data-edit-path="${attr(path)}" rows="${opts.rows || 4}" placeholder="${attr(opts.placeholder || '')}">${esc(value)}</textarea>`;
  }

  function checkbox(path, checked, label) {
    return `<label><input type="checkbox" data-edit-path="${attr(path)}" ${checked ? 'checked' : ''}> ${esc(label)}</label>`;
  }

  function charCount(text, max) {
    const n = String(text || '').length;
    return `<div class="charcount ${n > max ? 'over' : ''}">${n} / ${max}</div>`;
  }

  function docEmbed(url, emptyText = 'Paste a Google Docs embed/edit URL to load it here.') {
    if (!url) return `<div class="embed-box muted">${esc(emptyText)}</div>`;
    return `<iframe class="embed-frame" src="${attr(toEmbedUrl(url))}" title="Embedded Google document"></iframe>`;
  }

  function toEmbedUrl(url) {
    if (!url) return '';
    if (url.includes('docs.google.com/document') && !url.includes('embedded=true')) {
      return url + (url.includes('?') ? '&' : '?') + 'embedded=true';
    }
    return url;
  }

  function toast(message) {
    const host = document.getElementById('toastHost');
    if (!host) return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = message;
    host.appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }

  function openModal(html) {
    const host = document.getElementById('modalHost');
    const body = document.getElementById('modalBody');
    body.innerHTML = html;
    host.hidden = false;
  }

  function closeModal() {
    const host = document.getElementById('modalHost');
    if (host) host.hidden = true;
  }

  window.PremedUI = {
    esc,
    attr,
    clamp,
    sum,
    percent,
    todayIso,
    fmtDate,
    daysUntil,
    relativeTime,
    dayOfYear,
    viewHead,
    card,
    stat,
    pill,
    ring,
    progressBar,
    segmentedBar,
    editableTable,
    tips,
    resources,
    subtabs,
    calendar,
    kanban,
    chartCanvas,
    runCharts,
    input,
    textarea,
    checkbox,
    charCount,
    docEmbed,
    toEmbedUrl,
    toast,
    openModal,
    closeModal,
  };
})();
