/* ============================================================
   store.js
   Small data layer for the dashboard:
   - localStorage persistence on every edit
   - JSON export/import
   - recent activity + recent routes
   - Google Drive backup hook using Google Identity Services
   ============================================================ */
(function () {
  const KEY = 'premed_hq_v1_state';
  const BACKUP_DEBOUNCE_MS = 3500;
  const DAY_MS = 24 * 60 * 60 * 1000;

  let state = null;
  let suppressBackup = false;
  let backupTimer = null;
  const listeners = new Set();

  const clone = (x) => JSON.parse(JSON.stringify(x));
  const nowIso = () => new Date().toISOString();
  const uid = (prefix = 'id') => `${prefix}_${Math.random().toString(36).slice(2, 10)}`;

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      state = raw ? JSON.parse(raw) : clone(window.SEED || {});
    } catch (err) {
      console.warn('Could not load saved dashboard state; using seed data.', err);
      state = clone(window.SEED || {});
    }
    normalize(state);
    save({ silent: true });
    setTimeout(checkDailyDriveBackup, 900);
    return state;
  }

  function normalize(s) {
    s._meta ||= {};
    s._meta.createdAt ||= nowIso();
    s._meta.updatedAt ||= nowIso();
    s._meta.recentActivity ||= [];
    s._meta.recentRoutes ||= ['academics', 'mcat', 'timeline'];
    s._meta.lastBackupAt ||= null;
    s._meta.lastBackupError ||= '';
    s._meta.drive ||= {};
    s._meta.drive.clientId ||= '';
    s._meta.drive.folderId ||= '';
    s._meta.drive.fileId ||= '';
    s._meta.drive.connectedEmail ||= '';
    s._meta.drive.token ||= '';
    s._meta.drive.tokenExpiresAt ||= 0;

    s._ui ||= {};
    s._ui.route ||= 'home';
    s._ui.mcatTab ||= 'content';
    s._ui.academicsTab ||= 'planner';
    s._ui.calendarMonth ||= new Date().toISOString().slice(0, 7);
    s._ui.pomodoroRunning ||= false;
    if (s._ui.pomodoroSecs == null) s._ui.pomodoroSecs = null;

    s.profile ||= {};
    s.profile.name ||= 'Andy';
    s.profile.school ||= 'UNC-Chapel Hill';
    s.profile.major ||= 'Neuroscience B.S., Pre-Med';
    s.profile.resumeDocUrl ||= '';
    s.profile.driveFolderUrl ||= '';

    s.courses ||= [];
    s.degreeReqs ||= [];
    s.assignments ||= [];
    s.tasks ||= [];
    s.clinical ||= [];
    s.volunteering ||= [];
    s.shadowing ||= [];
    s.research ||= [];
    s.ecs ||= [];
    s.letters ||= [];
    s.schools ||= [];
    s.stories ||= [];
    s.secondaries ||= [];
    s.interviewQs ||= [];
    s.advisingQs ||= [];
    s.redFlags ||= [];
    s.focusTargets ||= [];
    s.kanban ||= { todo: [], doing: [], done: [] };

    s.goals ||= {};
    s.goals.clinical ||= 150;
    s.goals.volunteering ||= 150;
    s.goals.shadowing ||= 50;
    s.goals.research ||= 1000;
    s.goals.activities ||= 15;
    s.goals.clinicalStretch ||= 1000;

    s.mcat ||= {};
    s.mcat.targetDate ||= '2029-03-15';
    s.mcat.scores ||= [];
    s.mcat.errors ||= [];
    s.mcat.resources ||= [];
    s.mcat.schedule ||= [];
    // Expand once from uploaded xlsx structure (Free + AAMC bundle tiers) — never duplicate on reload.
    if (!s.mcat._scheduleExpanded && s.mcat.schedule.length <= 4) {
      s.mcat.schedule = uploadedMcatSchedule().concat(s.mcat.schedule);
      s.mcat._scheduleExpanded = true;
    }

    s.amcasTimeline ||= clone(window.SEED?.amcasTimeline || []);
    s.chemChains ||= clone(window.SEED?.chemChains || []);
    s._ref ||= clone(window.SEED?._ref || {});

    s.ideasNote ||= '';
    s.quarterlyGoals ||= [];

    s.gpaSim ||= {
      target: 3.8,
      rows: [
        { id: uid('sim'), label: 'Next semester target', credits: 14, grade: 'A-', bcpm: true },
      ],
    };

    s.gradeWeights ||= [
      { id: uid('gw'), category: 'Exams', weight: 45, current: '', target: '92' },
      { id: uid('gw'), category: 'Labs / problem sets', weight: 25, current: '', target: '95' },
      { id: uid('gw'), category: 'Final', weight: 30, current: '', target: '90' },
    ];

    s.study ||= {
      sessions: [],
      reviews: [],
      notes: [],
      goodNotesUrl: '',
      coworkUrl: '',
      pomodoroMinutes: 25,
    };
    s.study.sessions ||= [];
    s.study.reviews ||= [];
    s.study.notes ||= [];
    s.study.goodNotesUrl ||= '';
    s.study.coworkUrl ||= '';

    s.docs ||= {};
    s.docs.researchDriveUrl ||= '';
    s.docs.essaysDocUrl ||= '';
    s.docs.academicsDocUrl ||= '';

    s.applicationChecklist ||= [
      { id: uid('appc'), text: 'Secure LOR writers', done: false },
      { id: uid('appc'), text: 'Finalize school list', done: false },
      { id: uid('appc'), text: 'Send transcript', done: false },
      { id: uid('appc'), text: 'Write personal statement', done: false },
      { id: uid('appc'), text: 'Write activities descriptions', done: false },
      { id: uid('appc'), text: 'Submit AMCAS', done: false },
      { id: uid('appc'), text: 'Take Casper / PREview if required', done: false },
      { id: uid('appc'), text: 'Submit secondaries', done: false },
    ];

    s.essayWorkspace ||= {};
    s.essayWorkspace.personalStatement ||= { drafts: '', checklist: [] };
    if (!s.essayWorkspace.personalStatement.checklist?.length) {
      s.essayWorkspace.personalStatement.checklist = clone(window.SEED?.essayWorkspace?.personalStatement?.checklist || []);
    }
    s.essayWorkspace.brainDump ||= '';

    // Add fields expected by the richer course table without disturbing seed content.
    s.courses.forEach((c) => {
      c.id ||= uid('c');
      c.school ||= c.term === 'Transfer' ? 'Transfer / AP' : 'UNC';
      c.calendar ||= 'Semester';
      c.yearLevel ||= inferYear(c.term);
      c.aacomasBcp = c.aacomasBcp ?? c.bcpm ?? false;
      c.files ||= '';
    });
  }

  function inferYear(term) {
    if (!term || term === 'Transfer') return 'Pre-College';
    if (term.includes('2026') || term.includes('2027')) return 'Freshman';
    if (term.includes('2028')) return 'Sophomore';
    if (term.includes('2029')) return 'Junior';
    if (term.includes('2030')) return 'Senior';
    return '';
  }

  function uploadedMcatSchedule() {
    const rows = [
      ['Free', 'Foundation 1: Biomolecules', 'Amino acids; DNA; gene expression; meiosis; cellular respiration; carbohydrates', 'Planned'],
      ['Free', 'Foundation 2: Cells', 'Cell intro; cell communication; prokaryotes; mitosis; JackWestin B/B bank; Dx HL', 'Planned'],
      ['Free', 'Foundation 3: Organ Systems', 'Neuro/endocrine; endocrine; hematologic; GI; reproductive; skeletal systems', 'Planned'],
      ['Free', 'Foundation 4: Physical Processes', 'Vectors; Newton laws; work/energy; fluids; gas laws; electrostatics', 'Planned'],
      ['Free', 'Foundation 5: Chemical Processes', 'Acids/bases; models; nucleic acids; carbohydrates; carboxylic acids', 'Planned'],
      ['Free', 'Foundation 6: Processing the Environment', 'Sensory perception; sensation; sleep; memory creation; language', 'Planned'],
      ['Free', 'Foundation 7: Behavior', 'Biological basis of behavior; motivation; psych disorders; normal/non-normal behavior', 'Planned'],
      ['Free', 'Foundation 8-10: Individuals, Society & Culture', 'Self identity; attributing behavior; animal behavior; social structure; social inequity', 'Planned'],
      ['Free', 'Practice Passages & First Full Length', 'KA B/B, C/P, P/S; Kaplan FL 1; reassess', 'Planned'],
      ['Free', 'Mixed Flashcards & Third-Party FLs', 'Bio 50; biochem 50; Princeton FL; reassess', 'Planned'],
      ['AAMC bundle', 'AAMC Full Lengths Week 8', 'AAMC Free Scored; AAMC FL 1; AAMC FL 2; reassess between exams', 'Planned'],
      ['AAMC bundle', 'AAMC Full Lengths Week 9', 'AAMC FL 3; AAMC FL 4; reassess after each', 'Planned'],
      ['AAMC bundle', 'Crunch Time', 'AAMC question banks and section-bank style review', 'Planned'],
    ];
    return rows.map(([phase, block, focus, status]) => ({ id: uid('mcat'), phase, block, focus, status }));
  }

  function save(opts = {}) {
    if (!state) return;
    state._meta.updatedAt = nowIso();
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (err) {
      console.error('Save failed', err);
      toast('Local save failed. Export a backup now.');
    }
    if (!opts.silent) {
      notify();
      scheduleDriveBackup();
    }
  }

  function notify() {
    listeners.forEach((fn) => fn(state));
  }

  function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  function get(path) {
    if (!path) return state;
    return pathToArray(path).reduce((obj, key) => (obj == null ? undefined : obj[key]), state);
  }

  function set(path, value, label) {
    const parts = pathToArray(path);
    let obj = state;
    while (parts.length > 1) {
      const key = parts.shift();
      obj[key] ||= {};
      obj = obj[key];
    }
    obj[parts[0]] = value;
    if (label) recordActivity(label);
    save();
  }

  function setQuiet(path, value) {
    const parts = pathToArray(path);
    let obj = state;
    while (parts.length > 1) {
      const key = parts.shift();
      obj[key] ||= {};
      obj = obj[key];
    }
    obj[parts[0]] = value;
    save({ silent: true });
    scheduleDriveBackup();
  }

  function update(fn, label) {
    fn(state);
    normalize(state);
    if (label) recordActivity(label);
    save();
  }

  function addItem(path, item, label) {
    update((s) => {
      const arr = resolveForWrite(s, path);
      item.id ||= uid('row');
      arr.push(item);
    }, label || 'Added item');
  }

  function removeItem(path, index, label) {
    update((s) => {
      const arr = resolveForWrite(s, path);
      arr.splice(Number(index), 1);
    }, label || 'Deleted item');
  }

  function moveItem(path, index, dir, label) {
    update((s) => {
      const arr = resolveForWrite(s, path);
      const from = Number(index);
      const to = Math.max(0, Math.min(arr.length - 1, from + Number(dir)));
      if (from === to) return;
      const [row] = arr.splice(from, 1);
      arr.splice(to, 0, row);
    }, label || 'Reordered item');
  }

  function resolveForWrite(root, path) {
    const parts = pathToArray(path);
    let obj = root;
    for (const key of parts) {
      obj[key] ||= [];
      obj = obj[key];
    }
    return obj;
  }

  function pathToArray(path) {
    return Array.isArray(path) ? path : String(path).split('.').filter(Boolean);
  }

  function recordActivity(label) {
    state._meta.recentActivity.unshift({ id: uid('act'), label, at: nowIso() });
    state._meta.recentActivity = state._meta.recentActivity.slice(0, 40);
  }

  function setRoute(route) {
    update((s) => {
      s._ui.route = route;
      s._meta.recentRoutes = [route, ...(s._meta.recentRoutes || []).filter((r) => r !== route)].slice(0, 6);
    });
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `premed-hq-backup-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    recordActivity('Exported JSON backup');
    save({ silent: true });
    notify();
  }

  function importJson(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result);
          state = parsed;
          normalize(state);
          recordActivity('Imported JSON backup');
          save();
          resolve();
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  function scheduleDriveBackup() {
    if (suppressBackup) return;
    const drive = state?._meta?.drive || {};
    if (!drive.clientId) return;
    clearTimeout(backupTimer);
    backupTimer = setTimeout(() => {
      backupNow({ interactive: false, reason: 'autosave' }).catch((err) => {
        state._meta.lastBackupError = err.message || String(err);
        save({ silent: true });
        notify();
      });
    }, BACKUP_DEBOUNCE_MS);
  }

  /* Future hook: true "backup while closed" would need a backend cron or local
     scheduled script calling backupNow(). The daily-on-open check below covers
     the realistic case for a static SPA opened at least once per day. */

  async function checkDailyDriveBackup() {
    const drive = state?._meta?.drive || {};
    if (!drive.clientId) return;
    const last = state._meta.lastBackupAt ? new Date(state._meta.lastBackupAt).getTime() : 0;
    if (!last || Date.now() - last >= DAY_MS) {
      try {
        await backupNow({ interactive: false, reason: 'daily-on-open' });
      } catch (err) {
        state._meta.lastBackupError = err.message || String(err);
        save({ silent: true });
        notify();
      }
    }
  }

  function saveDriveSettings({ clientId, folderId }) {
    update((s) => {
      s._meta.drive.clientId = (clientId || '').trim();
      s._meta.drive.folderId = (folderId || '').trim();
    }, 'Updated Google Drive backup settings');
  }

  async function connectDrive() {
    await ensureToken(true);
    toast('Google Drive connected for this browser session.');
    return true;
  }

  async function ensureToken(interactive) {
    const drive = state._meta.drive;
    if (!drive.clientId) throw new Error('Add a Google OAuth client ID in Settings first.');
    if (location.protocol === 'file:') {
      throw new Error('Google OAuth needs a hosted http(s) origin, not file://. Use a local/static server or hosting.');
    }
    if (drive.token && Number(drive.tokenExpiresAt || 0) > Date.now() + 60000) {
      return drive.token;
    }
    await loadScript('https://accounts.google.com/gsi/client');
    return new Promise((resolve, reject) => {
      const tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: drive.clientId,
        scope: 'https://www.googleapis.com/auth/drive.file',
        prompt: interactive ? 'consent' : '',
        callback: (resp) => {
          if (resp.error) {
            reject(new Error(resp.error));
            return;
          }
          suppressBackup = true;
          drive.token = resp.access_token;
          drive.tokenExpiresAt = Date.now() + Number(resp.expires_in || 3600) * 1000;
          suppressBackup = false;
          save({ silent: true });
          resolve(drive.token);
        },
        error_callback: () => reject(new Error(interactive ? 'Google sign-in was cancelled.' : 'Drive token unavailable. Click Connect Drive.')),
      });
      tokenClient.requestAccessToken({ prompt: interactive ? 'consent' : '' });
    });
  }

  async function backupNow(opts = {}) {
    const token = await ensureToken(!!opts.interactive);
    const drive = state._meta.drive;
    const payload = JSON.stringify({ exportedAt: nowIso(), reason: opts.reason || 'manual', data: state }, null, 2);
    const filename = 'premed-hq-auto-backup.json';

    let res;
    if (drive.fileId) {
      res = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${encodeURIComponent(drive.fileId)}?uploadType=media&fields=id,modifiedTime`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: payload,
      });
    } else {
      const boundary = `premed_hq_${Date.now()}`;
      const metadata = { name: filename, mimeType: 'application/json' };
      if (drive.folderId) metadata.parents = [drive.folderId];
      const body = [
        `--${boundary}`,
        'Content-Type: application/json; charset=UTF-8',
        '',
        JSON.stringify(metadata),
        `--${boundary}`,
        'Content-Type: application/json',
        '',
        payload,
        `--${boundary}--`,
      ].join('\r\n');
      res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,modifiedTime', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': `multipart/related; boundary=${boundary}` },
        body,
      });
    }
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Drive backup failed (${res.status}): ${text.slice(0, 140)}`);
    }
    const json = await res.json();
    suppressBackup = true;
    state._meta.drive.fileId = json.id || drive.fileId;
    state._meta.lastBackupAt = nowIso();
    state._meta.lastBackupError = '';
    recordActivity(`Backed up to Google Drive (${opts.reason || 'manual'})`);
    suppressBackup = false;
    save({ silent: true });
    notify();
    return json;
  }

  function loadScript(src) {
    if ([...document.scripts].some((s) => s.src === src)) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Could not load ${src}`));
      document.head.appendChild(script);
    });
  }

  function toast(message) {
    window.PremedUI?.toast?.(message);
  }

  function resetToSeed() {
    state = clone(window.SEED || {});
    normalize(state);
    recordActivity('Reset dashboard to seed data');
    save();
  }

  window.PremedStore = {
    load,
    get,
    set,
    setQuiet,
    update,
    subscribe,
    addItem,
    removeItem,
    moveItem,
    setRoute,
    exportJson,
    importJson,
    resetToSeed,
    uid,
    saveDriveSettings,
    backup: { connectDrive, backupNow, checkDailyDriveBackup },
  };
})();
