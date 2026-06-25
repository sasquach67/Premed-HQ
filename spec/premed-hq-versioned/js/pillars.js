/* ============================================================
   pillars.js
   Route/view rendering for the Premed HQ dashboard.
   The data layer is generic; this file gives each pillar its
   deep dashboard shape.
   ============================================================ */
(function () {
  const U = window.PremedUI;
  const S = window.PremedStore;

  const routes = [
    { id: 'home', label: 'Overview', icon: '⌂', group: 'Home' },
    { id: 'northstar', label: 'North Star', icon: '☆', group: 'Home' },
    { id: 'academics', label: 'Academics & GPA', icon: '▦', group: 'Foundation' },
    { id: 'mcat', label: 'MCAT', icon: '◉', group: 'Foundation' },
    { id: 'letters', label: 'Letters of Rec', icon: '✉', group: 'Foundation' },
    { id: 'essays', label: 'Essays & Story Bank', icon: '✎', group: 'Your Story' },
    { id: 'clinical', label: 'Clinical', icon: '+', group: 'Experiences' },
    { id: 'volunteering', label: 'Volunteering', icon: '◇', group: 'Experiences' },
    { id: 'shadowing', label: 'Shadowing', icon: '◌', group: 'Experiences' },
    { id: 'research', label: 'Research', icon: '⌬', group: 'Experiences' },
    { id: 'ecs', label: 'Extracurriculars', icon: '◧', group: 'Experiences' },
    { id: 'schools', label: 'School List', icon: '▱', group: 'Application' },
    { id: 'timeline', label: 'Timeline / Tasks', icon: '□', group: 'Application' },
    { id: 'profile', label: 'Profile / CV', icon: '◫', group: 'Profile' },
  ];

  const routeMap = Object.fromEntries(routes.map((r) => [r.id, r]));

  const gradePoints = {
    'A+': 4, A: 4, 'A-': 3.7,
    'B+': 3.3, B: 3, 'B-': 2.7,
    'C+': 2.3, C: 2, 'C-': 1.7,
    'D+': 1.3, D: 1, 'D-': 0.7,
    F: 0,
  };

  const statusOptions = ['Planned', 'Not started', 'Working on', 'In Progress', 'Finished', 'Done', 'Complete'];
  const assignmentTypes = ['Assignment', 'Exam', 'Quiz', 'Lab', 'Reading', 'Application', 'Meeting', 'Other'];

  function render(routeId, state) {
    const view = views[routeId] || views.home;
    return view(state);
  }

  const views = {
    home: homeView,
    northstar: northStarView,
    academics: academicsView,
    mcat: mcatView,
    clinical: (s) => experienceView(s, 'clinical'),
    volunteering: (s) => experienceView(s, 'volunteering'),
    shadowing: (s) => experienceView(s, 'shadowing'),
    research: researchView,
    ecs: ecsView,
    letters: lettersView,
    essays: essaysView,
    schools: schoolsView,
    timeline: timelineView,
    profile: profileView,
    settings: settingsView,
  };

  function homeView(s) {
    const profile = s.profile || {};
    const name = profile.name || 'Andy';
    const greeting = `${timeGreeting()}, ${name}`;
    const g = gpaStats(s.courses);
    const hours = hourTotals(s);
    const bestMcat = bestMcatScore(s);
    const quote = pickDaily(s._ref?.quotes || []);
    const tip = pickDaily(s._ref?.tips || [], 7);
    const qotd = pickDaily(s._ref?.mcatQotD || [], 13);
    const alerts = upcomingAlerts(s);
    const progressItems = [
      { name: 'GPA', pct: U.percent(g.cum || 0, 4) / 5, color: 'var(--c-gpa)' },
      { name: 'MCAT', pct: mcatProgress(bestMcat) / 5, color: 'var(--c-mcat)' },
      { name: 'Shadowing', pct: U.percent(hours.shadowing, s.goals.shadowing) / 5, color: 'var(--c-shadow)' },
      { name: 'Volunteering', pct: U.percent(hours.volunteering, s.goals.volunteering) / 5, color: 'var(--c-volunteer)' },
      { name: 'Activities', pct: U.percent(s.ecs.length, s.goals.activities || 15) / 5, color: 'var(--c-activities)' },
    ];
    const jumpRoutes = (s._meta.recentRoutes || ['academics', 'mcat', 'timeline'])
      .filter((r) => r !== 'home' && routeMap[r])
      .slice(0, 3);

    return `
      ${U.viewHead('Premed HQ', 'A private command center for UNC premed planning, AMCAS prep, and daily execution.')}
      <section class="card hero">
        <h1>${U.esc(greeting)}</h1>
        <p>Work on whichever module moves the needle right now. Your data autosaves locally as you edit.</p>
        <div class="jump-row">
          ${jumpRoutes.map((r) => `<button class="jump-chip" data-route="${r}">${U.esc(routeMap[r].label)} →</button>`).join('')}
        </div>
      </section>

      <div class="task-strip">
        <strong>Task bar</strong>
        ${s.tasks.filter((t) => !isDone(t.status)).slice(0, 4).map((t) => `<button class="task-chip" data-route="timeline">${U.esc(t.name)}</button>`).join('') || '<span class="muted">No active tasks.</span>'}
      </div>

      <div class="grid grid-4">
        ${U.stat('Cumulative GPA', fmtGpa(g.cum), `${g.credits.toFixed(1)} graded credits`)}
        ${U.stat('Science GPA', fmtGpa(g.science), 'AMCAS BCPM')}
        ${U.stat('Clinical Hours', Math.round(hours.clinical), `${Math.round(U.percent(hours.clinical, s.goals.clinical))}% of baseline`)}
        ${U.stat('MCAT Countdown', countdownLabel(s.mcat.targetDate), `Target ${U.fmtDate(s.mcat.targetDate)}`)}
      </div>

      <div class="grid grid-2">
        ${U.card('Today\'s Quote', `<p class="quote">"${U.esc(quote?.t || '')}"<span class="quote-by">${U.esc(quote?.by || '')}</span></p>`)}
        ${U.card('Tar Heel Ram Tip', `<div class="mascot"><div class="ram">🐏</div><div class="bubble">${U.esc(tip?.t || '')}<div class="tip-src">${U.esc(tip?.src || '')} · ${tip?.tag === 'official' ? 'official' : 'community'}</div></div></div>`)}
      </div>

      <div class="grid grid-2">
        ${U.card('Category Progress', U.segmentedBar(progressItems) + `<div class="ring-row">
          ${U.ring(U.percent(hours.shadowing, s.goals.shadowing), `${Math.round(hours.shadowing)}h`, 'shadowing', 86)}
          ${U.ring(U.percent(hours.volunteering, s.goals.volunteering), `${Math.round(hours.volunteering)}h`, 'service', 86, 'var(--amber)')}
          ${U.ring(U.percent(hours.clinical, s.goals.clinical), `${Math.round(hours.clinical)}h`, 'clinical', 86, 'var(--green)')}
        </div>`)}
        ${U.card('Due Soon / Alerts', renderAlerts(alerts))}
      </div>

      <div class="grid grid-2">
        ${U.card('MCAT Question of the Day', `<p><strong>${U.esc(qotd?.q || '')}</strong></p><details><summary>Show answer</summary><p>${U.esc(qotd?.a || '')}</p></details>`)}
        ${U.card('Today\'s Focus Targets', focusTargets(s) + focusTimeSummary(s), { actions: '<button class="btn btn-sm" data-action="add-focus">+ Add</button>' })}
      </div>

      <div class="grid grid-2">
        ${U.card('Ideas Capture', `<p class="tiny muted">Quick sticky for stray thoughts — autosaves locally.</p>${U.textarea('ideasNote', s.ideasNote || '', { rows: 4, placeholder: 'Random idea, reminder, or insight…' })}`)}
        ${U.card('Quarterly Goals', quarterlyGoalsBox(s))}
      </div>

      <div class="grid grid-2">
        ${U.card('Experience Gap Analysis', gapAnalysisChart(s))}
        ${U.card('AMCAS 2029 Timeline', amcasTimeline(s))}
      </div>

      <div class="grid grid-2">
        ${U.card('Recent Activity', recentActivity(s))}
      </div>`;
  }

  function northStarView(s) {
    const ns = s._ref.northStar;
    return `
      ${U.viewHead('North Star', 'The practical admissions roadmap: what matters, why timing matters, and how the pieces fit together.')}
      ${U.card('What This Actually Is', `<p>${U.esc(ns.intro)}</p><p><strong>Driving fact:</strong> ${U.esc(ns.drivingFact)}</p>`)}
      <div class="grid grid-3">
        ${ns.systems.map((x) => U.stat(x.name, x.name, x.who)).join('')}
      </div>
      <div class="grid grid-2">
        ${U.card('Master Timeline', `<ol class="plain-list">${ns.timeline.map((x) => `<li>${U.esc(x)}</li>`).join('')}</ol><p class="callout">${U.esc(ns.yourPlan)}</p>`)}
        ${U.card('Mindset Themes', `<ul class="plain-list">${ns.mindset.map((x) => `<li>${U.esc(x)}</li>`).join('')}</ul>`)}
      </div>
      ${U.card('Human-Made Community Layer', `<div class="resource-list">${ns.community.map((x) => `<div class="res-item"><span>↗</span><div><a href="${U.attr(x.url)}" target="_blank" rel="noopener">${U.esc(x.name)}</a><div class="tiny muted">${U.esc(x.note)}</div></div></div>`).join('')}</div>`)}
    `;
  }

  function academicsView(s) {
    const tab = s._ui.academicsTab || 'planner';
    const g = gpaStats(s.courses);
    const simStats = gpaStats(s.courses.concat(simRowsAsCourses(s.gpaSim.rows)));
    const activeAssignments = s.assignments.map((r, i) => ({ ...r, _index: i })).filter((r) => r.progress !== 'Finished');
    const events = s.assignments.filter((a) => a.deadline).map((a) => ({ date: a.deadline, title: `${a.course || 'Course'}: ${a.description || a.type || 'Assignment'}`, type: a.type }));

    const bodyByTab = {
      planner: `
        <div class="grid grid-4">
          ${U.stat('Cumulative GPA', fmtGpa(g.cum), `${g.credits.toFixed(1)} graded credits`)}
          ${U.stat('Science GPA', fmtGpa(g.science), 'BCPM only')}
          ${U.stat('AO GPA', fmtGpa(g.ao), 'All other courses')}
          ${U.stat('What-if GPA', fmtGpa(simStats.cum), `${simStats.credits.toFixed(1)} projected credits`)}
        </div>
        ${U.card('AMCAS-Style Course Planner', U.editableTable({
          path: 'courses',
          rows: s.courses,
          template: courseTemplate(),
          addLabel: 'Add course',
          columns: courseColumns(),
          emptyText: 'Add courses to start calculating GPA.',
        }) + '<p class="tiny muted">AMCAS rules: no grade replacement, repeats are averaged, AP/TR rows do not count in GPA unless you enter a letter grade.</p>')}
        <div class="grid grid-2">
          ${U.card('What-if Simulator', whatIfBox(s))}
          ${U.card('Grade Weights What-if', gradeWeightBox(s))}
        </div>
        ${U.card('GPA Trend by Term', gpaTrendChart(s))}`,
      degree: `
        <div class="grid grid-2">
          ${U.card('Tar Heel Tracker', degreeTracker(s))}
          ${U.card('Critical Chemistry Chains', chemChains(s))}
        </div>
        ${U.card('Degree + Pre-Med Requirement Table', U.editableTable({
          path: 'degreeReqs',
          rows: s.degreeReqs,
          template: { id: '', group: 'New group', name: '', satisfiedBy: '', done: false },
          addLabel: 'Add requirement',
          columns: [
            { key: 'group', label: 'Group' },
            { key: 'name', label: 'Requirement' },
            { key: 'satisfiedBy', label: 'Satisfied by' },
            { key: 'done', label: 'Done', type: 'checkbox' },
          ],
        }))}`,
      assignments: `
        ${U.card('Active Assignment Tracker', U.editableTable({
          path: 'assignments',
          rows: activeAssignments,
          template: assignmentTemplate(),
          addLabel: 'Add assignment',
          columns: assignmentColumns(),
          emptyText: 'No active assignments. Finished items stay in your saved data but leave this active view.',
        }))}
        ${U.card('Synced Assignment Calendar', U.calendar(events, s._ui.calendarMonth, 'Assignments / Exams'))}`,
      study: `
        <div class="grid grid-2">
          ${U.card('Lecture Mode', U.editableTable({
            path: 'study.sessions',
            rows: s.study.sessions,
            template: { id: '', course: '', session: '', type: 'Lecture', date: '', recordingUrl: '', status: 'Planned' },
            addLabel: 'Add session',
            columns: [
              { key: 'course', label: 'Course' },
              { key: 'session', label: 'Session' },
              { key: 'type', label: 'Type', type: 'select', options: ['Lecture', 'Lab', 'Discussion', 'Review'] },
              { key: 'date', label: 'Date', type: 'date' },
              { key: 'recordingUrl', label: 'URL', type: 'url' },
              { key: 'status', label: 'Status', type: 'select', status: true, options: statusOptions },
            ],
          }))}
          ${U.card('Study Mode', U.editableTable({
            path: 'study.reviews',
            rows: s.study.reviews,
            template: { id: '', title: '', course: '', startDate: U.todayIso(), interval: '3 days', nextReview: '', status: 'Planned' },
            addLabel: 'Add review topic',
            columns: [
              { key: 'title', label: 'Topic' },
              { key: 'course', label: 'Course' },
              { key: 'startDate', label: 'Start', type: 'date' },
              { key: 'interval', label: 'Interval' },
              { key: 'nextReview', label: 'Next Review', type: 'date' },
              { key: 'status', label: 'Status', type: 'select', status: true, options: statusOptions },
            ],
          }))}
        </div>
        ${U.card('Academic Links & Scratchpad', `
          <div class="grid grid-2 form-grid">
            <label>GoodNotes link ${U.input('study.goodNotesUrl', s.study.goodNotesUrl, { type: 'url', placeholder: 'goodnotes:// or web link' })}</label>
            <label>Claude Cowork / syllabi hub ${U.input('study.coworkUrl', s.study.coworkUrl, { type: 'url', placeholder: 'Link to course material hub' })}</label>
          </div>
          <label>Priming questions / study scratchpad ${U.textarea('study.notesText', s.study.notesText || '', { rows: 6, placeholder: 'Questions to bring into lecture, office hours, or study sessions...' })}</label>
        `)}
        ${U.card('Pomodoro Timer', pomodoroBox(s))}`,
      resources: `
        <div class="grid grid-2">
          ${U.card('Ultimate Academic Guide', academicGuide())}
          ${U.card('Resources', U.resources(s._ref.pillarResources.academics))}
        </div>
        ${U.card('Tips', U.tips(s._ref.pillarTips.academics))}`,
    };

    return `
      ${U.viewHead('Academics & GPA', 'AMCAS-style GPA math, UNC course planning, assignments, calendar, and study workflows.')}
      ${U.subtabs(tab, [
        { id: 'planner', label: 'GPA / Planner' },
        { id: 'degree', label: 'Tar Heel Tracker' },
        { id: 'assignments', label: 'Assignments' },
        { id: 'study', label: 'Study Mode' },
        { id: 'resources', label: 'Resources & Tips' },
      ], 'academicsTab')}
      ${bodyByTab[tab] || bodyByTab.planner}`;
  }

  function mcatView(s) {
    const tab = s._ui.mcatTab || 'content';
    const best = bestMcatScore(s);
    const scoreRows = s.mcat.scores || [];
    const scoreChart = U.chartCanvas('mcat-score-chart', {
      type: 'line',
      data: {
        labels: scoreRows.map((r) => r.date || r.exam || ''),
        datasets: [{ label: 'Total score', data: scoreRows.map(scoreTotal), borderColor: '#4b9cd3', backgroundColor: 'rgba(75,156,211,.12)', tension: .35 }],
      },
      options: chartOptions(472, 528),
    });
    const contentResources = (s.mcat.resources || []).filter((r) => /Content|Anki|Community/.test(r.cat || ''));
    const practiceResources = (s.mcat.resources || []).filter((r) => /Practice|Exam/.test(r.cat || ''));

    const bodyByTab = {
      content: `
        <div class="grid grid-3">
          ${U.stat('Target Test Date', U.fmtDate(s.mcat.targetDate), countdownLabel(s.mcat.targetDate))}
          ${U.stat('Best Logged Score', best || '—', best ? `${Math.round(mcatProgress(best))}% of scaled range` : 'No FLs yet')}
          ${U.stat('Content Domino', 'CHEM 430', 'Biochem finishes Fall 2028')}
        </div>
        ${U.card('Content Review Resource Database', U.editableTable({
          path: 'mcat.resources',
          rows: contentResources.map((r) => ({ ...r, _index: (s.mcat.resources || []).indexOf(r) })),
          template: { id: '', cat: 'Content Review', name: '', url: '', note: '' },
          addLabel: 'Add resource',
          columns: [
            { key: 'cat', label: 'Category', type: 'select', options: ['Content Review', 'Anki Decks', 'Practice & Exams', 'Community', 'Misc'] },
            { key: 'name', label: 'Resource' },
            { key: 'url', label: 'Link', type: 'url' },
            { key: 'note', label: 'Notes', type: 'textarea' },
          ],
        }))}
        ${U.card('Community MCAT Tips', U.tips(s._ref.pillarTips.mcat))}`,
      practice: `
        <div class="grid grid-2">
          ${U.card('Practice Score Tracker', U.editableTable({
            path: 'mcat.scores',
            rows: s.mcat.scores,
            template: { id: '', date: U.todayIso(), exam: '', cp: '', cars: '', bb: '', ps: '', total: '', notes: '' },
            addLabel: 'Add score',
            columns: [
              { key: 'date', label: 'Date', type: 'date' },
              { key: 'exam', label: 'Exam' },
              { key: 'cp', label: 'C/P', type: 'number' },
              { key: 'cars', label: 'CARS', type: 'number' },
              { key: 'bb', label: 'B/B', type: 'number' },
              { key: 'ps', label: 'P/S', type: 'number' },
              { key: 'total', label: 'Total', type: 'number' },
              { key: 'notes', label: 'Notes', type: 'textarea' },
            ],
          }))}
          ${U.card('Trend', scoreChart)}
        </div>
        ${U.card('Practice / Exam Resources', U.editableTable({
          path: 'mcat.resources',
          rows: practiceResources.map((r) => ({ ...r, _index: (s.mcat.resources || []).indexOf(r) })),
          template: { id: '', cat: 'Practice & Exams', name: '', url: '', note: '' },
          addLabel: 'Add practice resource',
          columns: [
            { key: 'cat', label: 'Category', type: 'select', options: ['Content Review', 'Anki Decks', 'Practice & Exams', 'Community', 'Misc'] },
            { key: 'name', label: 'Resource' },
            { key: 'url', label: 'Link', type: 'url' },
            { key: 'note', label: 'Notes', type: 'textarea' },
          ],
        }))}`,
      schedule: `
        ${U.card('Uploaded MCAT Schedule Adaptation', U.editableTable({
          path: 'mcat.schedule',
          rows: s.mcat.schedule,
          template: { id: '', phase: 'Free', block: '', focus: '', status: 'Planned' },
          addLabel: 'Add schedule block',
          columns: [
            { key: 'phase', label: 'Tier / Phase' },
            { key: 'block', label: 'Block' },
            { key: 'focus', label: 'Focus', type: 'textarea' },
            { key: 'status', label: 'Status', type: 'select', status: true, options: statusOptions },
          ],
        }))}`,
      errors: `
        ${U.card('Questions / Passages Error Log', U.editableTable({
          path: 'mcat.errors',
          rows: s.mcat.errors,
          template: { id: '', date: U.todayIso(), source: '', section: 'B/B', topic: '', why: '', fix: '', status: 'Open' },
          addLabel: 'Add missed question',
          columns: [
            { key: 'date', label: 'Date', type: 'date' },
            { key: 'source', label: 'Source' },
            { key: 'section', label: 'Section', type: 'select', options: ['C/P', 'CARS', 'B/B', 'P/S'] },
            { key: 'topic', label: 'Topic' },
            { key: 'why', label: 'Why missed', type: 'textarea' },
            { key: 'fix', label: 'Fix / rule', type: 'textarea' },
            { key: 'status', label: 'Status', type: 'select', status: true, options: ['Open', 'Reviewed', 'Fixed'] },
          ],
        }))}`,
      assessments: `
        ${U.card('Additional Assessments', `<div class="grid grid-2">
          <div><h3>AAMC PREview</h3><p class="muted">Situational judgment scored 1-9. Take before/with secondaries if target schools require or recommend it.</p></div>
          <div><h3>Casper / Altus</h3><p class="muted">Valid one cycle only. Prep like MMI: problem, perspective, responsibility, decide, justify.</p></div>
        </div>`)}
        ${U.card('Assessment Tasks', U.editableTable({
          path: 'tasks',
          rows: s.tasks.map((r, i) => ({ ...r, _index: i })).filter((t) => /Casper|PREview|MCAT|assessment/i.test(`${t.name} ${t.cat}`)),
          template: { id: '', name: 'Take Casper / PREview if required', due: '', status: 'To-Do', cat: 'Assessments', notes: '' },
          addLabel: 'Add assessment task',
          columns: taskColumns(),
        }))}`,
    };

    return `
      ${U.viewHead('MCAT', 'Content review, resource database, uploaded schedule structure, score tracker, countdown, and error log.')}
      ${U.subtabs(tab, [
        { id: 'content', label: 'Content Review' },
        { id: 'practice', label: 'Practice & Exams' },
        { id: 'schedule', label: 'Schedule' },
        { id: 'errors', label: 'Error Log' },
        { id: 'assessments', label: 'Casper / PREview' },
      ], 'mcatTab')}
      ${bodyByTab[tab] || bodyByTab.content}`;
  }

  function experienceView(s, kind) {
    const config = {
      clinical: {
        title: 'Clinical',
        subtitle: 'Direct patient-contact hours, supervisor contacts, reflections, and file links.',
        path: 'clinical',
        goal: s.goals.clinical,
        columns: [
          { key: 'site', label: 'Who / Site' },
          { key: 'role', label: 'Role' },
          { key: 'date', label: 'Date', type: 'date' },
          { key: 'hours', label: 'Hours', type: 'number' },
          { key: 'contact', label: 'Contact' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'reflection', label: 'Story / reflection', type: 'textarea' },
          { key: 'fileUrl', label: 'Files', type: 'url' },
          { key: 'status', label: 'Status', type: 'select', status: true, options: statusOptions },
        ],
        template: experienceTemplate('Clinical site', 'Role'),
      },
      volunteering: {
        title: 'Volunteering',
        subtitle: 'Clinical and non-clinical service, sustained commitments, and underserved-community notes.',
        path: 'volunteering',
        goal: s.goals.volunteering,
        columns: [
          { key: 'site', label: 'Org / Site' },
          { key: 'role', label: 'Role' },
          { key: 'serviceType', label: 'Type', type: 'select', options: ['Non-clinical', 'Clinical', 'Campus', 'Community'] },
          { key: 'date', label: 'Date', type: 'date' },
          { key: 'hours', label: 'Hours', type: 'number' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'reflection', label: 'Reflection', type: 'textarea' },
          { key: 'fileUrl', label: 'Files', type: 'url' },
          { key: 'status', label: 'Status', type: 'select', status: true, options: statusOptions },
        ],
        template: { ...experienceTemplate('Organization', 'Volunteer'), serviceType: 'Non-clinical' },
      },
      shadowing: {
        title: 'Shadowing',
        subtitle: 'Physician shadowing log with specialty, hours, takeaways, and contact info.',
        path: 'shadowing',
        goal: s.goals.shadowing,
        columns: [
          { key: 'physician', label: 'Physician' },
          { key: 'specialty', label: 'Specialty' },
          { key: 'site', label: 'Office / Hospital' },
          { key: 'date', label: 'Date', type: 'date' },
          { key: 'hours', label: 'Hours', type: 'number' },
          { key: 'contact', label: 'Contact' },
          { key: 'reflection', label: 'Takeaways / influential moment', type: 'textarea' },
          { key: 'fileUrl', label: 'Files', type: 'url' },
          { key: 'status', label: 'Status', type: 'select', status: true, options: statusOptions },
        ],
        template: { id: '', physician: '', specialty: '', site: '', date: U.todayIso(), hours: '', contact: '', reflection: '', fileUrl: '', status: 'Planned' },
      },
    }[kind];
    const rows = s[kind] || [];
    const total = U.sum(rows);
    const chart = U.chartCanvas(`${kind}-hours-chart`, hoursChartConfig(rows), 180);
    return `
      ${U.viewHead(config.title, config.subtitle)}
      <div class="grid grid-3">
        ${U.card('Progress', `<div class="progress-combo">${U.ring(U.percent(total, config.goal), `${Math.round(total)}h`, `of ${config.goal}h`, 98)}<div>${U.progressBar(Math.round(total), config.goal, config.title)}<p class="tiny muted">Progress ring summarizes; the detailed table below is the source of truth.</p></div></div>`)}
        ${U.card('Gap Analysis', chart)}
        ${U.card('Tips', U.tips(s._ref.pillarTips[kind]))}
      </div>
      ${U.card(`${config.title} Table`, U.editableTable({
        path: config.path,
        rows,
        template: config.template,
        addLabel: `Add ${config.title.toLowerCase()} entry`,
        columns: config.columns,
      }))}
      <div class="grid grid-2">
        ${U.card('Resources', U.resources(s._ref.pillarResources[kind]))}
        ${kind === 'shadowing' ? U.card('Shadowing Guide Notes', shadowingGuideNotes()) : U.card('Application Payoff', '<p>Use the reflection/story fields immediately after each shift so your Work & Activities and essays have vivid source material later.</p>')}
      </div>`;
  }

  function researchView(s) {
    const total = U.sum(s.research);
    return `
      ${U.viewHead('Research', 'Labs, projects, PI contacts, outputs, Drive embedding, and reflection notes.')}
      <div class="grid grid-3">
        ${U.card('Research Progress', `<div class="progress-combo">${U.ring(U.percent(total, s.goals.research), `${Math.round(total)}h`, 'research', 98)}<div>${U.progressBar(Math.round(total), s.goals.research, '~1.5 yr goal')}</div></div>`)}
        ${U.card('Drive Cabinet', `<label>Research Drive folder ${U.input('docs.researchDriveUrl', s.docs.researchDriveUrl, { type: 'url', placeholder: 'Google Drive folder URL' })}</label>${s.docs.researchDriveUrl ? `<p><a class="btn" href="${U.attr(s.docs.researchDriveUrl)}" target="_blank" rel="noopener">Open Drive folder</a></p>` : '<p class="muted">Paste the folder where papers, posters, proposals, and slide decks live.</p>'}`)}
        ${U.card('Tips', U.tips(s._ref.pillarTips.research))}
      </div>
      ${U.card('Research Table', U.editableTable({
        path: 'research',
        rows: s.research,
        template: { id: '', project: '', pi: '', role: '', date: U.todayIso(), hours: '', output: '', abstract: '', notes: '', fileUrl: '', status: 'Planned' },
        addLabel: 'Add research entry',
        columns: [
          { key: 'project', label: 'Project / Lab' },
          { key: 'pi', label: 'PI / Mentor' },
          { key: 'role', label: 'Role' },
          { key: 'date', label: 'Date', type: 'date' },
          { key: 'hours', label: 'Hours', type: 'number' },
          { key: 'output', label: 'Output', type: 'select', options: ['None yet', 'Poster', 'Abstract', 'Presentation', 'Publication', 'Manuscript'] },
          { key: 'abstract', label: 'Abstract / summary', type: 'textarea' },
          { key: 'fileUrl', label: 'Files', type: 'url' },
          { key: 'status', label: 'Status', type: 'select', status: true, options: statusOptions },
        ],
      }))}
      <div class="grid grid-2">
        ${U.card('Resources', U.resources(s._ref.pillarResources.research))}
        ${U.card('Embedded Drive / Doc Preview', U.docEmbed(s.docs.researchDriveUrl, 'Google Drive folders usually open best as links; paste a previewable Doc/Folder URL when available.'))}
      </div>`;
  }

  function ecsView(s) {
    return `
      ${U.viewHead('Extracurriculars / Leadership', 'Clubs, jobs, hobbies, awards, leadership progression, and AMCAS Work & Activities prep.')}
      <div class="grid grid-3">
        ${U.card('Activities Progress', `<div class="progress-combo">${U.ring(U.percent(s.ecs.length, s.goals.activities || 15), `${s.ecs.length}`, 'of 15 AMCAS', 98)}<div>${U.progressBar(s.ecs.length, s.goals.activities || 15, 'Activities')}</div></div>`)}
        ${U.card('Most Meaningful', `<p class="stat-val">${s.ecs.filter((e) => e.mostMeaningful).length} / 3</p><p class="muted">AMCAS lets you mark up to three Most Meaningful activities.</p>`)}
        ${U.card('Tips', U.tips(s._ref.pillarTips.ecs))}
      </div>
      ${U.card('Activities Table', U.editableTable({
        path: 'ecs',
        rows: s.ecs,
        template: { id: '', activity: '', type: 'Extracurricular', org: '', role: '', start: '', end: '', hours: '', description: '', mostMeaningful: false, reflection: '', fileUrl: '', status: 'Planned' },
        addLabel: 'Add activity',
        columns: [
          { key: 'activity', label: 'Activity' },
          { key: 'type', label: 'Type', type: 'select', options: ['Extracurricular', 'Leadership', 'Teaching', 'Paid Employment', 'Award', 'Hobby', 'Other'] },
          { key: 'org', label: 'Organization' },
          { key: 'role', label: 'Role / progression' },
          { key: 'hours', label: 'Hours', type: 'number' },
          { key: 'description', label: 'AMCAS description', type: 'textarea' },
          { key: 'descriptionLen', label: 'Chars', type: 'computed', compute: (r) => `${String(r.description || '').length}/700` },
          { key: 'mostMeaningful', label: 'MM', type: 'checkbox' },
          { key: 'reflection', label: 'Most meaningful reflection', type: 'textarea' },
          { key: 'fileUrl', label: 'Files', type: 'url' },
          { key: 'status', label: 'Status', type: 'select', status: true, options: statusOptions },
        ],
      }))}
      <div class="grid grid-2">
        ${U.card('Resources', U.resources(s._ref.pillarResources.ecs))}
        ${U.card('AMCAS Reminder', '<p>Up to 15 activities. Keep descriptions concrete, quantify hours, and pull story/reflection material from the Story Bank.</p>')}
      </div>`;
  }

  function lettersView(s) {
    return `
      ${U.viewHead('Letters of Recommendation', 'Recommenders, relationship strength, deadlines, packet links, and thank-you tracking.')}
      <div class="grid grid-3">
        ${U.stat('Requested', s.letters.filter((l) => l.status === 'Asked').length, 'asked but pending')}
        ${U.stat('Received', s.letters.filter((l) => l.status === 'Received').length, 'ready to use')}
        ${U.card('Tips', U.tips(s._ref.pillarTips.letters))}
      </div>
      ${U.card('LOR Tracker', U.editableTable({
        path: 'letters',
        rows: s.letters,
        template: { id: '', recommender: '', relationship: '', type: 'Science faculty', strength: '', askedDate: '', deadline: '', status: 'Not asked', packetUrl: '', thankYou: false, notes: '' },
        addLabel: 'Add recommender',
        columns: [
          { key: 'recommender', label: 'Recommender' },
          { key: 'relationship', label: 'Relationship' },
          { key: 'type', label: 'Type', type: 'select', options: ['Science faculty', 'Non-science faculty', 'PI / Research', 'Clinical supervisor', 'Physician', 'Committee', 'Other'] },
          { key: 'strength', label: 'Strength' },
          { key: 'askedDate', label: 'Asked', type: 'date' },
          { key: 'deadline', label: 'Deadline', type: 'date' },
          { key: 'status', label: 'Status', type: 'select', status: true, options: ['Not asked', 'Asked', 'Received', 'Uploaded', 'Declined'] },
          { key: 'packetUrl', label: 'Packet', type: 'url' },
          { key: 'thankYou', label: 'Thanks', type: 'checkbox' },
          { key: 'notes', label: 'Notes', type: 'textarea' },
        ],
      }))}
      <div class="grid grid-2">
        ${U.card('Resources', U.resources(s._ref.pillarResources.letters))}
        ${U.card('Request Packet Checklist', '<ul class="plain-list"><li>Personal statement draft</li><li>CV / resume</li><li>Transcript</li><li>AAMC letter-writer guidelines</li><li>Specific deadline a few weeks before submission</li></ul>')}
      </div>`;
  }

  function essaysView(s) {
    const ps = s.essayWorkspace.personalStatement;
    return `
      ${U.viewHead('Essays & Story Bank', 'A tagged reflection bank, personal statement workspace, secondaries tracker, and interview-prep bank.')}
      <div class="grid grid-3">
        ${U.stat('Story Prompts', s.stories.length, 'seeded from brief')}
        ${U.stat('Secondaries', s.secondaries.length, 'prompt tracker')}
        ${U.stat('Interview Qs', s.interviewQs.length, 'practice bank')}
      </div>
      ${U.card('Story Bank', U.editableTable({
        path: 'stories',
        rows: s.stories,
        template: { id: '', title: '', date: U.todayIso(), tags: '', body: '', commentary: '', status: 'Open' },
        addLabel: 'Add story',
        columns: [
          { key: 'title', label: 'Prompt / Title' },
          { key: 'date', label: 'Date', type: 'date' },
          { key: 'tags', label: 'Tags' },
          { key: 'body', label: 'What happened?', type: 'textarea' },
          { key: 'commentary', label: 'Personal commentary / framing', type: 'textarea' },
          { key: 'status', label: 'Status', type: 'select', status: true, options: ['Open', 'Drafted', 'Used', 'Archived'] },
        ],
      }))}
      <div class="grid grid-2">
        ${U.card('Personal Statement Workspace', `
          <label>Brain dump ${U.textarea('essayWorkspace.brainDump', s.essayWorkspace.brainDump || '', { rows: 5 })}</label>
          <label>Drafts ${U.textarea('essayWorkspace.personalStatement.drafts', ps.drafts || '', { rows: 10, placeholder: 'Draft personal statement text here...' })}</label>
          ${U.charCount(ps.drafts || '', 5300)}
          <div class="checklist">${(ps.checklist || []).map((c, i) => U.checkbox(`essayWorkspace.personalStatement.checklist.${i}.done`, c.done, c.t)).join('')}</div>
        `)}
        ${U.card('Resources & Tips', U.tips(s._ref.pillarTips.essays) + U.resources(s._ref.pillarResources.essays))}
      </div>
      ${U.card('Embedded Essay Drafts (Google Doc)', `<label>Essays Google Doc URL ${U.input('docs.essaysDocUrl', s.docs.essaysDocUrl || '', { type: 'url', placeholder: 'https://docs.google.com/document/...' })}</label>${U.docEmbed(s.docs.essaysDocUrl, 'Paste a Google Doc URL to edit PS/secondary drafts inline.')}`)}
      <div class="grid grid-2">
        ${U.card('Secondary Prompt Tracker', U.editableTable({
          path: 'secondaries',
          rows: s.secondaries,
          template: { id: '', school: '', prompt: '', status: 'Not started', notes: '', draftUrl: '' },
          addLabel: 'Add secondary',
          columns: [
            { key: 'school', label: 'School' },
            { key: 'prompt', label: 'Prompt', type: 'textarea' },
            { key: 'status', label: 'Status', type: 'select', status: true, options: ['Not started', 'Drafting', 'Ready', 'Submitted'] },
            { key: 'notes', label: 'Notes', type: 'textarea' },
            { key: 'draftUrl', label: 'Draft', type: 'url' },
          ],
        }))}
        ${U.card('Interview Prep Bank', U.editableTable({
          path: 'interviewQs',
          rows: s.interviewQs,
          template: { id: '', q: '', answer: '', status: 'Not started' },
          addLabel: 'Add question',
          columns: [
            { key: 'q', label: 'Question', type: 'textarea' },
            { key: 'answer', label: 'Your answer', type: 'textarea' },
            { key: 'status', label: 'Status', type: 'select', status: true, options: ['Not started', 'Drafting', 'Practiced', 'Strong'] },
          ],
        }))}
      </div>`;
  }

  function schoolsView(s) {
    return `
      ${U.viewHead('School List', 'Early-stage school list builder with MSAR/Admit/Choose DO resource tracking.')}
      <div class="grid grid-3">
        ${U.stat('Schools', s.schools.length, 'tracked')}
        ${U.stat('Submitted', s.schools.filter((x) => x.status === 'Submitted').length, 'applications')}
        ${U.card('Tips', U.tips(s._ref.pillarTips.schools))}
      </div>
      ${U.card('School List Table', U.editableTable({
        path: 'schools',
        rows: s.schools,
        template: { id: '', school: '', program: 'MD', medianGpa: '', medianMcat: '', isStatus: 'Unknown', fit: '', category: 'Target', secondaryStatus: 'Not received', deadline: '', notes: '', url: '' },
        addLabel: 'Add school',
        columns: [
          { key: 'school', label: 'School' },
          { key: 'program', label: 'Program', type: 'select', options: ['MD', 'DO', 'MD/PhD', 'Texas / TMDSAS'] },
          { key: 'medianGpa', label: 'Med GPA', type: 'number' },
          { key: 'medianMcat', label: 'Med MCAT', type: 'number' },
          { key: 'isStatus', label: 'IS/OOS', type: 'select', options: ['In-state', 'OOS-friendly', 'OOS-hostile', 'Unknown'] },
          { key: 'fit', label: 'Mission fit' },
          { key: 'category', label: 'Reach/Target/Safety', type: 'select', options: ['Reach', 'Target', 'Likely', 'Safety', 'Unknown'] },
          { key: 'secondaryStatus', label: 'Secondary', type: 'select', status: true, options: ['Not received', 'Received', 'Drafting', 'Submitted'] },
          { key: 'deadline', label: 'Deadline', type: 'date' },
          { key: 'url', label: 'MSAR / Admit', type: 'url' },
          { key: 'notes', label: 'Notes', type: 'textarea' },
        ],
      }))}
      <div class="grid grid-2">
        ${U.card('Resources', U.resources(s._ref.pillarResources.schools))}
        ${U.card('Calibration Caveat', '<p>Per-school stats and policies must be checked live in MSAR / Choose DO / school websites. Community list-building rules are useful, but official school data wins.</p>')}
      </div>`;
  }

  function timelineView(s) {
    const events = s.tasks.filter((t) => t.due).map((t) => ({ date: t.due, title: t.name, type: t.cat }));
    return `
      ${U.viewHead('Timeline / Tasks', 'Master checklist, AMCAS timeline, reusable kanban board, advising questions, and red-flag reminders.')}
      <div class="grid grid-3">
        ${U.stat('Open Tasks', s.tasks.filter((t) => !isDone(t.status)).length, 'active')}
        ${U.stat('Advising Qs', s.advisingQs.filter((q) => !q.done).length, 'unverified')}
        ${U.stat('Next AMCAS', countdownLabel(s.amcasTimeline?.[0]?.date), s.amcasTimeline?.[0]?.name || '')}
      </div>
      ${U.card('Master Task Table', U.editableTable({
        path: 'tasks',
        rows: s.tasks,
        template: { id: '', name: '', due: '', status: 'To-Do', cat: 'General', notes: '' },
        addLabel: 'Add task',
        columns: taskColumns(),
      }))}
      <div class="grid grid-2">
        ${U.card('Sprint Board', U.kanban(s.kanban))}
        ${U.card('Task Calendar', U.calendar(events, s._ui.calendarMonth, 'Task Deadlines'))}
      </div>
      <div class="grid grid-2">
        ${U.card('Application Checklist', `<div class="checklist">${s.applicationChecklist.map((c, i) => U.checkbox(`applicationChecklist.${i}.done`, c.done, c.text)).join('')}</div>`)}
        ${U.card('Advisor / HPA Verification', `<div class="checklist">${s.advisingQs.map((q, i) => U.checkbox(`advisingQs.${i}.done`, q.done, `[${q.who}] ${q.q}`)).join('')}</div>`)}
      </div>
      <div class="grid grid-2">
        ${U.card('Red Flags / Things Not To Do', `<ul class="plain-list danger-list">${s.redFlags.map((x) => `<li>${U.esc(x)}</li>`).join('')}</ul>`)}
        ${U.card('Resources', U.resources(s._ref.pillarResources.timeline) + U.tips(s._ref.pillarTips.timeline))}
      </div>`;
  }

  function profileView(s) {
    const rows = cvRows(s);
    return `
      ${U.viewHead('Profile / Resume & CV', 'Auto-CV from logged roles plus embedded editable Google Docs resume.')}
      <div class="grid grid-3">
        ${U.stat('Profile', s.profile.name || 'Andy', `${s.profile.school || ''} · ${s.profile.major || ''}`)}
        ${U.stat('CV Rows', rows.length, 'from logged roles')}
        ${U.stat('Goal', s.profile.matriculateGoal || 'Fall 2030', 'matriculation')}
      </div>
      ${U.card('Profile Basics', `
        <div class="grid grid-2 form-grid">
          <label>Name ${U.input('profile.name', s.profile.name)}</label>
          <label>School ${U.input('profile.school', s.profile.school)}</label>
          <label>Major ${U.input('profile.major', s.profile.major)}</label>
          <label>Matriculation goal ${U.input('profile.matriculateGoal', s.profile.matriculateGoal || '')}</label>
        </div>
      `)}
      ${U.card('Auto-CV from Logged Roles', cvTable(rows))}
      <div class="grid grid-2">
        ${U.card('Editable Google Doc Resume', `<label>Resume Google Doc URL ${U.input('profile.resumeDocUrl', s.profile.resumeDocUrl, { type: 'url', placeholder: 'https://docs.google.com/document/...' })}</label>${U.docEmbed(s.profile.resumeDocUrl, 'Paste your editable Google Doc resume URL above.')}`)}
        ${U.card('General Drive Cabinet', `<label>Drive folder URL ${U.input('profile.driveFolderUrl', s.profile.driveFolderUrl, { type: 'url', placeholder: 'Google Drive folder for transcripts, CV, syllabi...' })}</label>${s.profile.driveFolderUrl ? `<p><a class="btn" href="${U.attr(s.profile.driveFolderUrl)}" target="_blank" rel="noopener">Open Drive folder</a></p>` : '<p class="muted">Use Drive for transcripts, syllabi, CV versions, and large files.</p>'}`)}
      </div>`;
  }

  function settingsView(s) {
    const drive = s._meta.drive || {};
    return `
      ${U.viewHead('Settings & Backup', 'Local autosave, manual JSON backups, and optional Google Drive redundancy.')}
      <div class="grid grid-2">
        ${U.card('Manual Data Safety', `
          <p>Your dashboard saves instantly to this browser with <code>localStorage</code>. Export JSON regularly so data is never trapped.</p>
          <div class="button-row">
            <button class="btn btn-primary" data-action="export-json">Export JSON</button>
            <label class="btn">Import JSON <input type="file" accept="application/json" data-action="import-json" hidden></label>
            <button class="btn btn-danger" data-action="reset-seed">Reset to seed</button>
          </div>
          <p class="tiny muted">Last local edit: ${U.relativeTime(s._meta.updatedAt)}</p>
        `)}
        ${U.card('Google Drive Auto-Backup', `
          <p>When hosted on an http(s) origin, the app can back up while it is open and run a daily-on-open backup check. It cannot back up while fully closed without a future backend or local scheduled script.</p>
          <div class="form-grid">
            <label>OAuth Client ID ${U.input('_meta.drive.clientId', drive.clientId, { placeholder: 'Google OAuth web client ID' })}</label>
            <label>Drive folder ID (optional) ${U.input('_meta.drive.folderId', drive.folderId, { placeholder: 'Folder ID only, not full URL' })}</label>
          </div>
          <div class="button-row">
            <button class="btn" data-action="connect-drive">Connect Drive</button>
            <button class="btn btn-primary" data-action="backup-drive">Back up now</button>
          </div>
          <p class="tiny ${s._meta.lastBackupError ? 'red-text' : 'muted'}">Last backed up: ${s._meta.lastBackupAt ? U.fmtDate(s._meta.lastBackupAt) + ' · ' + U.relativeTime(s._meta.lastBackupAt) : 'never'}${s._meta.lastBackupError ? ` · ${U.esc(s._meta.lastBackupError)}` : ''}</p>
        `)}
      </div>
      ${U.card('Google OAuth Setup Notes', `
        <ol class="plain-list">
          <li>Create a Google Cloud project and OAuth consent screen.</li>
          <li>Create an OAuth Web Client ID.</li>
          <li>Add your hosted dashboard origin, for example <code>http://localhost:8000</code> while testing and your static hosting origin later.</li>
          <li>Paste the client ID above. The app uses the narrow <code>drive.file</code> scope and writes <code>premed-hq-auto-backup.json</code>.</li>
        </ol>
      `)}`;
  }

  function gpaStats(rows) {
    const graded = [];
    (rows || []).forEach((r) => {
      const pts = gradePoints[String(r.grade || '').toUpperCase()];
      const cr = Number(r.credits) || 0;
      if (pts == null || !cr) return;
      graded.push({ ...r, pts, cr });
    });

    // AMCAS: repeated courses are averaged (no grade replacement).
    const groups = {};
    graded.forEach((r) => {
      const key = `${String(r.school || '').trim().toLowerCase()}|${String(r.code || r.name || r.id).trim().toLowerCase()}`;
      (groups[key] ||= []).push(r);
    });

    let credits = 0; let qp = 0;
    let sciCredits = 0; let sciQp = 0;
    let aoCredits = 0; let aoQp = 0;
    Object.values(groups).forEach((items) => {
      const totalCr = items.reduce((sum, r) => sum + r.cr, 0);
      const avgPts = items.reduce((sum, r) => sum + r.pts * r.cr, 0) / totalCr;
      const bcpm = truthy(items[0].bcpm);
      credits += totalCr;
      qp += avgPts * totalCr;
      if (bcpm) { sciCredits += totalCr; sciQp += avgPts * totalCr; }
      else { aoCredits += totalCr; aoQp += avgPts * totalCr; }
    });
    return {
      credits,
      cum: credits ? qp / credits : null,
      science: sciCredits ? sciQp / sciCredits : null,
      ao: aoCredits ? aoQp / aoCredits : null,
      sciCredits,
      aoCredits,
    };
  }

  function simRowsAsCourses(rows) {
    return (rows || []).map((r) => ({ code: r.label, credits: r.credits, grade: r.grade, bcpm: r.bcpm }));
  }

  function courseColumns() {
    return [
      { key: 'term', label: 'Term' },
      { key: 'school', label: 'School' },
      { key: 'calendar', label: 'Calendar', type: 'select', options: ['Semester', 'Quarter'] },
      { key: 'code', label: 'Class' },
      { key: 'name', label: 'Course name' },
      { key: 'credits', label: 'Credits', type: 'number' },
      { key: 'grade', label: 'Grade', type: 'select', options: ['', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F', 'AP', 'TR', 'P'] },
      { key: 'bcpm', label: 'AMCAS BCPM?', type: 'checkbox' },
      { key: 'aacomasBcp', label: 'AACOMAS BCP?', type: 'checkbox' },
      { key: 'yearLevel', label: 'Year Level', type: 'select', options: ['Pre-College', 'Freshman', 'Sophomore', 'Junior', 'Senior', 'Postbacc'] },
      { key: 'weighted', label: 'Weighted Grade', type: 'computed', compute: (r) => gradePoints[String(r.grade || '').toUpperCase()] ?? '' },
      { key: 'qp', label: 'QP', type: 'computed', compute: (r) => {
        const pts = gradePoints[String(r.grade || '').toUpperCase()];
        return pts == null ? '' : (pts * (Number(r.credits) || 0)).toFixed(2);
      } },
      { key: 'status', label: 'Status', type: 'select', status: true, options: ['Done', 'Locked', 'Planned', 'In Progress', 'Finished'] },
      { key: 'notes', label: 'Notes', type: 'textarea' },
    ];
  }

  function courseTemplate() {
    return { id: '', term: '', school: 'UNC', calendar: 'Semester', code: '', name: '', credits: 3, grade: '', bcpm: false, aacomasBcp: false, yearLevel: '', status: 'Planned', notes: '' };
  }

  function whatIfBox(s) {
    return `
      <p class="muted">Add hypothetical future courses or a term-average row. They are calculated in addition to your logged graded courses.</p>
      ${U.editableTable({
        path: 'gpaSim.rows',
        rows: s.gpaSim.rows,
        template: { id: '', label: 'Future course', credits: 3, grade: 'A', bcpm: true },
        addLabel: 'Add what-if row',
        compact: true,
        columns: [
          { key: 'label', label: 'Course / term' },
          { key: 'credits', label: 'Credits', type: 'number' },
          { key: 'grade', label: 'Grade', type: 'select', options: ['', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'] },
          { key: 'bcpm', label: 'BCPM', type: 'checkbox' },
        ],
      })}`;
  }

  function gradeWeightBox(s) {
    const current = weightedPercent(s.gradeWeights, 'current');
    const target = weightedPercent(s.gradeWeights, 'target');
    return `
      <div class="grid grid-2 mini-stats">
        ${U.stat('Current weighted', current == null ? '—' : `${current.toFixed(1)}%`, 'from filled current scores')}
        ${U.stat('Projected weighted', target == null ? '—' : `${target.toFixed(1)}%`, 'using target scores')}
      </div>
      ${U.editableTable({
        path: 'gradeWeights',
        rows: s.gradeWeights,
        template: { id: '', category: '', weight: '', current: '', target: '' },
        addLabel: 'Add category',
        compact: true,
        columns: [
          { key: 'category', label: 'Category' },
          { key: 'weight', label: 'Weight %', type: 'number' },
          { key: 'current', label: 'Current %', type: 'number' },
          { key: 'target', label: 'Target %', type: 'number' },
        ],
      })}`;
  }

  function weightedPercent(rows, key) {
    let w = 0; let total = 0;
    (rows || []).forEach((r) => {
      const weight = Number(r.weight);
      const val = Number(r[key]);
      if (!weight || Number.isNaN(val)) return;
      w += weight;
      total += weight * val;
    });
    return w ? total / w : null;
  }

  function degreeTracker(s) {
    const done = s.degreeReqs.filter((d) => d.done).length;
    const total = s.degreeReqs.length || 1;
    return `<div class="progress-combo">${U.ring(U.percent(done, total), `${done}/${total}`, 'reqs', 104)}<div>
      ${U.progressBar(done, total, 'Degree / prereq progress')}
      <p class="muted">Tracks graduation, major requirements, pre-med additions, and transfer-credit verification.</p>
    </div></div>`;
  }

  function chemChains(s) {
    return `<div class="chain-list">${(s.chemChains || []).map((chain) => {
      const steps = chain.steps.map((step) => {
        const c = s.courses.find((x) => x.code === step);
        return `<span class="chain-step ${c && (c.status === 'Done' || c.grade) ? 'done' : ''}">${U.esc(step)}</span>`;
      }).join('<span class="chain-arrow">→</span>');
      return `<div class="chain"><strong>${U.esc(chain.name)}</strong><div>${steps}</div><p class="tiny muted">${U.esc(chain.note)}</p></div>`;
    }).join('')}</div>`;
  }

  function assignmentColumns() {
    return [
      { key: 'course', label: 'Course' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'type', label: 'Type', type: 'select', options: assignmentTypes },
      { key: 'deadline', label: 'Deadline', type: 'date' },
      { key: 'days', label: 'Days left', type: 'computed', compute: (r) => {
        const d = U.daysUntil(r.deadline);
        return d == null ? '' : d < 0 ? `${Math.abs(d)}d late` : `${d}d`;
      } },
      { key: 'progress', label: 'Progress', type: 'select', status: true, options: ['Not started', 'Working on', 'Finished'] },
      { key: 'notes', label: 'Notes', type: 'textarea' },
      { key: 'files', label: 'Files', type: 'url' },
    ];
  }

  function assignmentTemplate() {
    return { id: '', course: '', description: '', type: 'Assignment', deadline: '', progress: 'Not started', notes: '', files: '' };
  }

  function taskColumns() {
    return [
      { key: 'name', label: 'Task', type: 'textarea' },
      { key: 'due', label: 'Due', type: 'date' },
      { key: 'status', label: 'Status', type: 'select', status: true, options: ['To-Do', 'In Progress', 'Done'] },
      { key: 'cat', label: 'Category' },
      { key: 'notes', label: 'Notes', type: 'textarea' },
    ];
  }

  function experienceTemplate(site, role) {
    return { id: '', site, role, date: U.todayIso(), hours: '', contact: '', description: '', reflection: '', fileUrl: '', status: 'Planned' };
  }

  function focusTargets(s) {
    return `<div>${(s.focusTargets || []).map((t, i) => `
      <div class="todo ${t.done ? 'done' : ''}">
        <input type="checkbox" data-edit-path="focusTargets.${i}.done" ${t.done ? 'checked' : ''}>
        <input class="t-text" data-edit-path="focusTargets.${i}.text" value="${U.attr(t.text)}">
        <button class="icon-btn" data-action="delete-row" data-path="focusTargets" data-index="${i}" title="Delete">×</button>
      </div>`).join('') || '<p class="muted">No focus targets yet.</p>'}</div>`;
  }

  function focusTimeSummary(s) {
    const open = (s.focusTargets || []).filter((t) => !t.done).length;
    const done = (s.focusTargets || []).filter((t) => t.done).length;
    return `<p class="tiny muted focus-summary">${open} open · ${done} done today</p>`;
  }

  function gapAnalysisChart(s) {
    const h = hourTotals(s);
    const goals = s.goals || {};
    return U.chartCanvas('home-gap-chart', {
      type: 'bar',
      data: {
        labels: ['Clinical', 'Volunteering', 'Shadowing', 'Research'],
        datasets: [{
          label: 'Hours logged',
          data: [h.clinical, h.volunteering, h.shadowing, h.research],
          backgroundColor: ['#4f9d69', '#d99a2b', '#4b9cd3', '#8b7bd8'],
        }, {
          label: 'Goal',
          data: [goals.clinical || 150, goals.volunteering || 150, goals.shadowing || 50, goals.research || 1000],
          type: 'line',
          borderColor: '#55606e',
          borderDash: [6, 4],
          pointRadius: 4,
          fill: false,
        }],
      },
      options: { ...chartOptions(0, undefined), plugins: { legend: { display: true, position: 'bottom' } } },
    }, 200);
  }

  function quarterlyGoalsBox(s) {
    return `
      <p class="tiny muted">Writing goals down boosts follow-through — review each quarter.</p>
      ${U.editableTable({
        path: 'quarterlyGoals',
        rows: s.quarterlyGoals || [],
        template: { id: '', quarter: 'Fall 2026', goal: '', status: 'Active' },
        addLabel: 'Add goal',
        compact: true,
        columns: [
          { key: 'quarter', label: 'Quarter' },
          { key: 'goal', label: 'Goal', type: 'textarea' },
          { key: 'status', label: 'Status', type: 'select', status: true, options: ['Active', 'Done', 'Deferred'] },
        ],
      })}`;
  }

  function gpaTrendChart(s) {
    const byTerm = {};
    (s.courses || []).forEach((r) => {
      const term = r.term || 'Unknown';
      const pts = gradePoints[String(r.grade || '').toUpperCase()];
      const cr = Number(r.credits) || 0;
      if (pts == null || !cr) return;
      (byTerm[term] ||= { qp: 0, cr: 0 });
      byTerm[term].qp += pts * cr;
      byTerm[term].cr += cr;
    });
    const order = ['Transfer', 'Fall 2026', 'Spring 2027', 'Fall 2027', 'Spring 2028', 'Fall 2028', 'Spring 2029', 'Fall 2029', 'Spring 2030'];
    const labels = [...new Set([...order.filter((t) => byTerm[t]), ...Object.keys(byTerm)])];
    const data = labels.map((t) => (byTerm[t]?.cr ? byTerm[t].qp / byTerm[t].cr : null));
    return U.chartCanvas('gpa-trend-chart', {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Term GPA',
          data,
          borderColor: '#4b9cd3',
          backgroundColor: 'rgba(75,156,211,.12)',
          tension: 0.35,
          spanGaps: true,
        }],
      },
      options: { ...chartOptions(0, 4), plugins: { legend: { display: false } } },
    });
  }

  function pomodoroBox(s) {
    const mins = s.study.pomodoroMinutes || 25;
    const running = s._ui.pomodoroRunning;
    const secs = s._ui.pomodoroSecs ?? mins * 60;
    const label = `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;
    return `
      <div class="pomodoro">
        <div class="pomo-time" id="pomoDisplay">${label}</div>
        <label>Minutes ${U.input('study.pomodoroMinutes', mins, { type: 'number' })}</label>
        <div class="button-row">
          <button class="btn btn-primary" data-action="pomo-start" ${running ? 'disabled' : ''}>Start</button>
          <button class="btn" data-action="pomo-pause" ${running ? '' : 'disabled'}>Pause</button>
          <button class="btn" data-action="pomo-reset">Reset</button>
        </div>
        <p class="tiny muted">Simple focus timer for Study Mode — pairs with spaced-rep reviews above.</p>
      </div>`;
  }

  function renderAlerts(alerts) {
    if (!alerts.length) return '<p class="muted">Nothing urgent in the next few days.</p>';
    return `<div class="alert-list">${alerts.map((a) => `<div class="alert ${a.kind}">
      <strong>${U.esc(a.title)}</strong>
      <span class="muted">${U.esc(a.meta || '')}</span>
      <span class="a-when">${U.esc(a.when)}</span>
    </div>`).join('')}</div>`;
  }

  function upcomingAlerts(s) {
    const alerts = [];
    (s.assignments || []).filter((a) => a.progress !== 'Finished').forEach((a) => {
      const d = U.daysUntil(a.deadline);
      if (d == null) return;
      if (d >= 0 && d <= 3) alerts.push({ kind: 'danger', title: a.description || a.type || 'Assignment', meta: a.course, when: `${d}d` });
      else if (/exam/i.test(a.type || '') && d >= 0 && d <= 7) alerts.push({ kind: 'warn', title: a.description || 'Exam', meta: a.course, when: `${d}d` });
    });
    (s.tasks || []).filter((t) => !isDone(t.status)).forEach((t) => {
      const d = U.daysUntil(t.due);
      if (d != null && d >= 0 && d <= 7) alerts.push({ kind: d <= 2 ? 'danger' : 'warn', title: t.name, meta: t.cat, when: `${d}d` });
    });
    return alerts.slice(0, 6);
  }

  function amcasTimeline(s) {
    return `<div>${(s.amcasTimeline || []).map((t) => {
      const d = U.daysUntil(t.date);
      const status = d == null ? '' : d < 0 ? 'Done' : d === 0 ? 'Today' : `${d}d`;
      return `<div class="tl-row"><span class="tl-name">${U.esc(t.name)}</span><span class="tl-date">${U.fmtDate(t.date)}</span><span class="tl-status ${d < 30 ? 'soon' : 'future'}">${U.esc(status)}</span></div>`;
    }).join('')}<p class="tiny muted">Earlier submission means earlier verification and transmission in rolling admissions.</p></div>`;
  }

  function recentActivity(s) {
    const rows = (s._meta.recentActivity || []).slice(0, 6);
    if (!rows.length) return '<p class="muted">No edits yet. Your next change will appear here.</p>';
    return rows.map((r) => `<div class="tl-row"><span class="tl-name">${U.esc(r.label)}</span><span class="tl-status">${U.relativeTime(r.at)}</span></div>`).join('');
  }

  function academicGuide() {
    return `<ul class="plain-list">
      <li><strong>Sleep is non-negotiable</strong> for memory consolidation, focus, and emotional regulation.</li>
      <li><strong>Prime before class:</strong> skim ahead so lecture becomes a review pass.</li>
      <li><strong>Learn by connection:</strong> ask why a fact matters and map it to the bigger system.</li>
      <li><strong>Recall without cues:</strong> brain dumps, practice questions, and teaching expose gaps.</li>
      <li><strong>Spaced repetition:</strong> revisit after a few days, one week, two weeks, then monthly if needed.</li>
    </ul>`;
  }

  function shadowingGuideNotes() {
    return `<ul class="plain-list">
      <li>Start by asking your own physician, family doctors, university pre-health networks, and local offices.</li>
      <li>Know your weekly availability, desired hours, start date, dress code, and whether it is one-time or ongoing.</li>
      <li>During shadowing, journal memorable patient moments, procedures, questions, and advice.</li>
      <li>Send a thank-you note the next day. If you built a real relationship, ask about a future LOR.</li>
    </ul>`;
  }

  function cvRows(s) {
    const out = [];
    const add = (arr, category, nameKey, roleKey) => (arr || []).forEach((r) => out.push({
      category,
      name: r[nameKey] || r.site || r.project || r.activity || r.physician || '',
      role: r[roleKey] || r.role || r.specialty || '',
      hours: r.hours || '',
      description: r.description || r.reflection || r.abstract || '',
      status: r.status || '',
    }));
    add(s.clinical, 'Clinical', 'site', 'role');
    add(s.volunteering, 'Volunteering', 'site', 'role');
    add(s.shadowing, 'Shadowing', 'physician', 'specialty');
    add(s.research, 'Research', 'project', 'role');
    add(s.ecs, 'Activity', 'activity', 'role');
    return out.filter((r) => r.name || r.role || r.description);
  }

  function cvTable(rows) {
    if (!rows.length) return '<p class="muted">Log roles in the experience pillars and they will appear here automatically.</p>';
    return `<div class="tracker"><table class="tbl"><thead><tr><th>Category</th><th>Name</th><th>Role</th><th>Hours</th><th>Description</th><th>Status</th></tr></thead><tbody>
      ${rows.map((r) => `<tr><td>${U.esc(r.category)}</td><td>${U.esc(r.name)}</td><td>${U.esc(r.role)}</td><td>${U.esc(r.hours)}</td><td>${U.esc(r.description)}</td><td>${U.esc(r.status)}</td></tr>`).join('')}
    </tbody></table></div>`;
  }

  function hoursChartConfig(rows) {
    const byMonth = {};
    (rows || []).forEach((r) => {
      const key = (r.date || 'Undated').slice(0, 7);
      byMonth[key] = (byMonth[key] || 0) + (Number(r.hours) || 0);
    });
    const labels = Object.keys(byMonth).sort();
    return {
      type: 'bar',
      data: { labels, datasets: [{ label: 'Hours', data: labels.map((l) => byMonth[l]), backgroundColor: '#7bafd4' }] },
      options: chartOptions(0, undefined),
    };
  }

  function chartOptions(min, max) {
    return {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { min, max, ticks: { precision: 0 }, grid: { color: '#eef1f4' } },
        x: { grid: { display: false } },
      },
    };
  }

  function bestMcatScore(s) {
    const vals = (s.mcat.scores || []).map(scoreTotal).filter(Boolean);
    return vals.length ? Math.max(...vals) : null;
  }

  function scoreTotal(r) {
    if (Number(r.total)) return Number(r.total);
    const parts = ['cp', 'cars', 'bb', 'ps'].map((k) => Number(r[k]) || 0);
    const sum = parts.reduce((a, b) => a + b, 0);
    return sum > 0 ? sum : null;
  }

  function mcatProgress(score) {
    if (!score) return 0;
    return U.percent(score - 472, 56);
  }

  function hourTotals(s) {
    return {
      clinical: U.sum(s.clinical),
      volunteering: U.sum(s.volunteering),
      shadowing: U.sum(s.shadowing),
      research: U.sum(s.research),
    };
  }

  function timeGreeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  }

  function pickDaily(arr, offset = 0) {
    if (!arr.length) return null;
    return arr[(U.dayOfYear() + offset) % arr.length];
  }

  function countdownLabel(iso) {
    const d = U.daysUntil(iso);
    if (d == null) return 'No date';
    if (d < 0) return 'Passed';
    if (d === 0) return 'Today';
    return `${d}d`;
  }

  function fmtGpa(n) {
    return n == null ? '—' : Number(n).toFixed(2);
  }

  function truthy(v) {
    return v === true || v === 'true' || v === 'Yes' || v === 'yes';
  }

  function isDone(status) {
    return ['Done', 'Finished', 'Complete', 'Received', 'Submitted'].includes(status);
  }

  window.PremedPillars = {
    routes,
    routeMap,
    render,
    gpaStats,
  };
})();
