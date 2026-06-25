/* ============================================================
   seed.js — initial personalized data (Brief Appendix A + §9 + §12)
   Everything here is the DEFAULT state. Once the user edits, their
   localStorage copy wins; this only seeds a fresh install.
   Exposed as window.SEED.
   ============================================================ */
(function () {
  const uid = (p) => p + '_' + Math.random().toString(36).slice(2, 9);

  // ---- Helper to build a course row ----
  const course = (o) => Object.assign({
    id: uid('c'), term: '', code: '', name: '', credits: 3, grade: '',
    bcpm: false, status: 'Planned', notes: ''
  }, o);

  /* ---------------- Academics: Andy's 4-year plan (Appendix A §5) ----------------
     status: Done = transfer/completed credit, Planned = scheduled, Locked = Year 1 final */
  const courses = [
    // ----- Already earned (transfer / AP) — counted for degree, NOT med prereqs -----
    course({ term: 'Transfer', code: 'BIOL 101', name: 'Intro Biology', credits: 3, grade: 'AP', status: 'Done', bcpm: true, notes: 'Transfer/AP — does NOT satisfy med prereq; frees schedule only.' }),
    course({ term: 'Transfer', code: 'BIOL 101L', name: 'Intro Biology Lab', credits: 1, grade: 'AP', status: 'Done', bcpm: true }),
    course({ term: 'Transfer', code: 'CHEM 101', name: 'General Chem I', credits: 3, grade: 'AP', status: 'Done', bcpm: true }),
    course({ term: 'Transfer', code: 'CHEM 101L', name: 'Gen Chem I Lab', credits: 1, grade: 'AP', status: 'Done', bcpm: true }),
    course({ term: 'Transfer', code: 'CHEM 102', name: 'General Chem II', credits: 3, grade: 'AP', status: 'Done', bcpm: true }),
    course({ term: 'Transfer', code: 'CHEM 102L', name: 'Gen Chem II Lab', credits: 1, grade: 'AP', status: 'Done', bcpm: true }),
    course({ term: 'Transfer', code: 'MATH 231', name: 'Calculus I', credits: 4, grade: 'AP', status: 'Done', bcpm: true }),
    course({ term: 'Transfer', code: 'MATH 232', name: 'Calculus II', credits: 4, grade: 'AP', status: 'Done', bcpm: true }),
    course({ term: 'Transfer', code: 'PHYS 114', name: 'Physics I', credits: 4, grade: 'AP', status: 'Done', bcpm: true, notes: 'Physics fully complete — no physics left.' }),
    course({ term: 'Transfer', code: 'PHYS 115', name: 'Physics II', credits: 4, grade: 'AP', status: 'Done', bcpm: true }),
    course({ term: 'Transfer', code: 'STOR 155', name: 'Intro Statistics', credits: 3, grade: 'AP', status: 'Done', bcpm: false, notes: 'Satisfies MAJOR stat core; may NOT satisfy med schools — plan PSYC 210 in residence.' }),
    course({ term: 'Transfer', code: 'NSCI 175', name: 'Intro Neuroscience', credits: 3, grade: 'TR', status: 'Done', bcpm: true, notes: 'Verify it posted (advising Q1).' }),
    course({ term: 'Transfer', code: 'SPAN 203', name: 'Spanish (Global Language)', credits: 3, grade: 'TR', status: 'Done', bcpm: false, notes: 'Verify Global Language cleared (advising Q1).' }),

    // ----- Fall 2026 (LOCKED) -----
    course({ term: 'Fall 2026', code: 'PSYC 101', name: 'General Psychology', credits: 3, status: 'Locked', bcpm: false, notes: 'Major req + MCAT psych + med prereq. Grab FY-Launch section if avail.' }),
    course({ term: 'Fall 2026', code: 'NURS 50', name: 'First-Year Seminar (Wellness)', credits: 3, status: 'Locked', bcpm: false }),
    course({ term: 'Fall 2026', code: 'BIOL 103', name: 'How Cells Function', credits: 3, status: 'Locked', bcpm: true, notes: 'Major additional req.' }),
    course({ term: 'Fall 2026', code: 'ENGL 105', name: 'English Comp & Rhetoric', credits: 3, status: 'Locked', bcpm: false, notes: 'Cannot be satisfied by exam credit — must take at UNC.' }),
    course({ term: 'Fall 2026', code: 'IDST 101', name: 'College Thriving', credits: 1, status: 'Locked', bcpm: false }),
    course({ term: 'Fall 2026', code: 'IDST 111L', name: 'Data Literacy Lab', credits: 1, status: 'Locked', bcpm: false, notes: 'Not a STEM lab.' }),

    // ----- Spring 2027 (chem chain begins) -----
    course({ term: 'Spring 2027', code: 'CHEM 241', name: 'Modern Analytical Methods', credits: 3, status: 'Planned', bcpm: true, notes: 'Opens lecture-side chem.' }),
    course({ term: 'Spring 2027', code: 'CHEM 241L', name: 'Analytical Methods Lab', credits: 1, status: 'Planned', bcpm: true, notes: 'PREREQ for 262L + med "orgo lab".' }),
    course({ term: 'Spring 2027', code: 'BIOL 220', name: 'Molecular Genetics', credits: 3, status: 'Planned', bcpm: true, notes: 'HPA-listed med prereq. Swap option: NSCI 22x.' }),
    course({ term: 'Spring 2027', code: 'SOCI 101', name: 'Sociology', credits: 3, status: 'Planned', bcpm: false, notes: 'MCAT soc + med prereq.' }),

    // ----- Fall 2027 -----
    course({ term: 'Fall 2027', code: 'CHEM 261', name: 'Organic Chemistry I', credits: 3, status: 'Planned', bcpm: true, notes: 'No lab. Lecture/MCAT chain.' }),
    course({ term: 'Fall 2027', code: 'NSCI 221', name: 'NSCI core (select two) #1', credits: 3, status: 'Planned', bcpm: true }),
    course({ term: 'Fall 2027', code: 'COMP 116', name: 'Intro Programming', credits: 3, status: 'Planned', bcpm: false, notes: 'COMP 110 or 116 required.' }),

    // ----- Spring 2028 -----
    course({ term: 'Spring 2028', code: 'CHEM 262', name: 'Organic Chemistry II', credits: 3, status: 'Planned', bcpm: true, notes: 'Orgo done.' }),
    course({ term: 'Spring 2028', code: 'CHEM 262L', name: 'Organic Chem II Lab', credits: 1, status: 'Planned', bcpm: true, notes: 'Closes lab chain (req 241L).' }),
    course({ term: 'Spring 2028', code: 'NSCI 27x', name: 'Research-Methods Lab', credits: 3, status: 'Planned', bcpm: true }),
    course({ term: 'Spring 2028', code: 'PSYC 210', name: 'Stat Principles of Psych Research', credits: 3, status: 'Planned', bcpm: false, notes: 'Med-safe stats (taken in residence).' }),

    // ----- Fall 2028 (biochem) -----
    course({ term: 'Fall 2028', code: 'CHEM 430', name: 'Biochemistry', credits: 3, status: 'Planned', bcpm: true, notes: 'LAST content domino → drives MCAT date. Also a Knowledge Elective (double-duty).' }),
    course({ term: 'Fall 2028', code: 'NSCI 222', name: 'NSCI core (select two) #2', credits: 3, status: 'Planned', bcpm: true }),
    course({ term: 'Fall 2028', code: 'BIOL 240', name: 'Cell Biology', credits: 3, status: 'Planned', bcpm: true, notes: 'HPA "highly recommended" + Knowledge Elective.' }),

    // ----- Spring 2029 (MCAT window / apply) -----
    course({ term: 'Spring 2029', code: 'BIOL 252', name: 'Anatomy & Physiology', credits: 3, status: 'Planned', bcpm: true, notes: 'HPA recommended.' }),
    course({ term: 'Spring 2029', code: 'BIOL 252L', name: 'A&P Lab', credits: 1, status: 'Planned', bcpm: true }),
    course({ term: 'Spring 2029', code: 'PSYC 245', name: 'Psychopathology', credits: 3, status: 'Planned', bcpm: false, notes: 'Knowledge Elective + MCAT psych.' }),
  ];

  /* ---------------- Degree / Tar Heel Tracker (Appendix A §2.1) ---------------- */
  const degreeReqs = [
    { id: uid('d'), group: 'Additional Requirements (C or better)', name: 'BIOL 103 How Cells Function', satisfiedBy: 'Fall 2026', done: false },
    { id: uid('d'), group: 'Additional Requirements (C or better)', name: 'BIOL 220 Molecular Genetics', satisfiedBy: 'Spring 2027', done: false },
    { id: uid('d'), group: 'Additional Requirements (C or better)', name: 'CHEM 241 + 241L', satisfiedBy: 'Spring 2027', done: false },
    { id: uid('d'), group: 'Additional Requirements (C or better)', name: 'CHEM 261', satisfiedBy: 'Fall 2027', done: false },
    { id: uid('d'), group: 'Additional Requirements (C or better)', name: 'CHEM 262 + 262L', satisfiedBy: 'Spring 2028', done: false },
    { id: uid('d'), group: 'Additional Requirements (C or better)', name: 'COMP 110 or 116', satisfiedBy: 'Fall 2027', done: false },
    { id: uid('d'), group: 'Additional Requirements (C or better)', name: 'PSYC 101', satisfiedBy: 'Fall 2026', done: false },
    { id: uid('d'), group: 'Already satisfied by credit (verify posted)', name: 'BIOL 101/101L', satisfiedBy: 'Transfer', done: true },
    { id: uid('d'), group: 'Already satisfied by credit (verify posted)', name: 'CHEM 101-102/L', satisfiedBy: 'Transfer', done: true },
    { id: uid('d'), group: 'Already satisfied by credit (verify posted)', name: 'MATH 231/232', satisfiedBy: 'Transfer', done: true },
    { id: uid('d'), group: 'Already satisfied by credit (verify posted)', name: 'PHYS 114 + 115 (physics complete)', satisfiedBy: 'Transfer', done: true },
    { id: uid('d'), group: 'Already satisfied by credit (verify posted)', name: 'STOR 155 (major stat core)', satisfiedBy: 'Transfer', done: true },
    { id: uid('d'), group: 'Already satisfied by credit (verify posted)', name: 'NSCI 175 (core)', satisfiedBy: 'Transfer', done: true },
    { id: uid('d'), group: 'Already satisfied by credit (verify posted)', name: 'Global Language (SPAN 203)', satisfiedBy: 'Transfer', done: true },
    { id: uid('d'), group: 'Core', name: 'Research-methods course (NSCI 27* lab)', satisfiedBy: 'Spring 2028', done: false },
    { id: uid('d'), group: 'Core', name: 'Two of NSCI 221 / 222 / 225', satisfiedBy: 'Fall 2027 / Fall 2028', done: false },
    { id: uid('d'), group: 'Core', name: '6 hrs Knowledge Electives', satisfiedBy: 'CHEM 430, BIOL 240…', done: false },
    { id: uid('d'), group: 'Core', name: '6 hrs Math/Methods/Stats Electives', satisfiedBy: 'PSYC 210…', done: false },
    { id: uid('d'), group: 'First-Year Foundations', name: 'ENGL 105', satisfiedBy: 'Fall 2026', done: false },
    { id: uid('d'), group: 'First-Year Foundations', name: 'NURS 50 First-Year Seminar', satisfiedBy: 'Fall 2026', done: false },
    { id: uid('d'), group: 'First-Year Foundations', name: 'IDST 101 College Thriving', satisfiedBy: 'Fall 2026', done: false },
    { id: uid('d'), group: 'First-Year Foundations', name: 'IDST 111L Data Literacy', satisfiedBy: 'Fall 2026', done: false },
    { id: uid('d'), group: 'Pre-med additions', name: 'CHEM 430 Biochem', satisfiedBy: 'Fall 2028', done: false },
    { id: uid('d'), group: 'Pre-med additions', name: 'Sociology (SOCI 101)', satisfiedBy: 'Spring 2027', done: false },
    { id: uid('d'), group: 'Pre-med additions', name: 'PSYC 210 stats in residence (med-safe)', satisfiedBy: 'Spring 2028', done: false },
    { id: uid('d'), group: 'Pre-med additions', name: 'BIOL 252/252L (HPA recommended)', satisfiedBy: 'Spring 2029', done: false },
    { id: uid('d'), group: 'Graduation', name: 'LFIT', satisfiedBy: 'Any term', done: false },
    { id: uid('d'), group: 'Graduation', name: '120 total credit hours', satisfiedBy: 'By Spring 2030', done: false },
  ];

  /* ---------------- Critical chem chains (Appendix A §1) ---------------- */
  const chemChains = [
    { name: 'Lab chain', steps: ['CHEM 241L', 'CHEM 262L'], note: '241L is a prereq for 262L. These supply the 8 hrs of "orgo lab" med schools want (261 has no lab).' },
    { name: 'Lecture / MCAT chain', steps: ['CHEM 261', 'CHEM 262', 'CHEM 430'], note: 'Three sequential terms. CHEM 430 (biochem) is the LAST content domino → it sets your MCAT date.' },
  ];

  /* ---------------- Assignments (starter examples for Fall 2026) ---------------- */
  const assignments = [
    { id: uid('a'), course: 'ENGL 105', description: 'First major essay draft', type: 'Assignment', deadline: '2026-10-15', progress: 'Not started', notes: '', files: '' },
    { id: uid('a'), course: 'BIOL 103', description: 'Midterm exam', type: 'Exam', deadline: '2026-11-05', progress: 'Not started', notes: 'Review cells + metabolism', files: '' },
    { id: uid('a'), course: 'PSYC 101', description: 'Research methods quiz', type: 'Quiz', deadline: '2026-09-28', progress: 'Working on', notes: '', files: '' },
  ];

  /* ---------------- MCAT ---------------- */
  const mcatTargetDate = '2029-03-15'; // Option 2 default (junior spring, Jan–Apr 2029)
  const mcatScores = []; // FL practice + real, user logs
  const mcatErrors = []; // error log
  const mcatSchedule = [
    { id: uid('m'), phase: 'Content Review', block: 'Winter 2028 → Feb 2029', focus: 'Khan Academy + AnKing/Miledown decks; 1 subject at a time', status: 'Planned' },
    { id: uid('m'), phase: 'Practice & Passages', block: 'Feb → Mar 2029', focus: 'UWorld + JackWestin CARS daily; build error log', status: 'Planned' },
    { id: uid('m'), phase: 'AAMC Full-Lengths', block: 'Mar 2029', focus: 'AAMC FLs 1–4 + Section Banks; review > raw score', status: 'Planned' },
    { id: uid('m'), phase: 'Test', block: 'Jan–Apr 2029', focus: 'Sit ≥1 month before AMCAS submission', status: 'Planned' },
  ];
  const mcatResources = [
    { id: uid('r'), cat: 'Content Review', name: 'Khan Academy MCAT Prep', url: 'https://www.khanacademy.org/test-prep/mcat', note: 'Free, comprehensive' },
    { id: uid('r'), cat: 'Content Review', name: 'MedLife Mastery', url: '', note: 'Structured content review program' },
    { id: uid('r'), cat: 'Content Review', name: 'MCAT Self Prep', url: '', note: 'Budget-friendly structured plan' },
    { id: uid('r'), cat: 'Content Review', name: 'JackWestin AAMC content outline', url: 'https://jackwestin.com/', note: 'Free CARS daily + content outline' },
    { id: uid('r'), cat: 'Content Review', name: '300-page Khan Academy Psych/Soc', url: '', note: 'Community study guide' },
    { id: uid('r'), cat: 'Anki Decks', name: 'Miledown / JackSparrow / MrPaintcow decks', url: '', note: 'Pull latest from r/MCAT' },
    { id: uid('r'), cat: 'Anki Decks', name: 'AnKing / Miledown ultimate study guides', url: '', note: 'Community gold standard' },
    { id: uid('r'), cat: 'Practice & Exams', name: 'AAMC Official Prep (FLs + Section Banks)', url: 'https://students-residents.aamc.org/', note: 'Most predictive — save for end' },
    { id: uid('r'), cat: 'Practice & Exams', name: 'UWorld MCAT QBank', url: '', note: 'Best question bank' },
    { id: uid('r'), cat: 'Practice & Exams', name: 'JackWestin practice passages', url: 'https://jackwestin.com/', note: 'Free daily CARS' },
    { id: uid('r'), cat: 'Practice & Exams', name: 'Princeton Review / Kaplan FLs', url: '', note: 'Third-party full lengths' },
    { id: uid('r'), cat: 'Community', name: 'r/MCAT wiki', url: 'https://www.reddit.com/r/MCAT/wiki/index', note: 'Defer deep study-plan here' },
    { id: uid('r'), cat: 'Community', name: 'r/MCAT Discord', url: '', note: 'Study groups + score release threads' },
  ];

  /* ---------------- Hour-log trackers (start empty; goals set) ---------------- */
  const clinical = [];
  const volunteering = [];
  const shadowing = [];
  const research = [];
  const ecs = [];
  const letters = [];

  /* ---------------- Story Bank reflection prompts (Brief §13.4) ---------------- */
  const storyPrompts = [
    'Reasons you want to be a physician',
    'Something you’re very passionate about',
    'A difficult experience that inspired self-growth',
    'A notable leadership experience',
    'A notable research experience',
    'Any notable clinical experiences',
    'A time you asked for help',
    'A time you were humbled',
    'A time you witnessed discrimination',
    'A time you interacted with someone different than you',
    'A time you advocated for someone different than you',
    'A time you failed',
  ];
  const stories = storyPrompts.map((p) => ({
    id: uid('s'), title: p, prompt: true, tags: [], body: '', commentary: '', date: ''
  }));

  /* ---------------- Secondary prompt library (common archetypes) ---------------- */
  const secondaries = [
    { id: uid('sec'), school: '(common archetype)', prompt: 'Why us? / Why this school?', status: 'Not started', notes: 'Reusable "why us" = garbage — make each specific.' },
    { id: uid('sec'), school: '(common archetype)', prompt: 'Adversity / challenge you overcame', status: 'Not started', notes: '' },
    { id: uid('sec'), school: '(common archetype)', prompt: 'Diversity / what you’d add', status: 'Not started', notes: '' },
    { id: uid('sec'), school: '(common archetype)', prompt: 'Gap / what will you do before matriculation', status: 'Not started', notes: '' },
  ];
  const interviewQs = [
    { id: uid('iq'), q: 'Why medicine?', answer: '', status: 'Not started' },
    { id: uid('iq'), q: 'Why DO/MD?', answer: '', status: 'Not started' },
    { id: uid('iq'), q: 'Tell me about yourself.', answer: '', status: 'Not started' },
    { id: uid('iq'), q: 'A time you handled conflict on a team.', answer: '', status: 'Not started' },
    { id: uid('iq'), q: 'An ethical dilemma you faced (MMI-style).', answer: '', status: 'Not started' },
  ];

  /* ---------------- School list (early — mostly empty) ---------------- */
  const schools = [];

  /* ---------------- Timeline / Tasks (Appendix A §9 near-term) ---------------- */
  const tasks = [
    { id: uid('t'), name: 'Enroll Fall 2026 — ConnectCarolina window opens 10:00 AM', due: '2026-07-06', status: 'To-Do', cat: 'Registration', notes: 'Cart 30–40 sections; use Swap not Drop-then-Add. Order: ENGL 105 → IDST 111L → IDST 101 → BIOL 103 (FY-Launch) → PSYC 101 → fillers.' },
    { id: uid('t'), name: 'Confirm transfers posted (NSCI 175, SPAN 203, PHYS 114/115, etc.)', due: '2026-08-15', status: 'To-Do', cat: 'Advising', notes: 'Advising Q1–Q3.' },
    { id: uid('t'), name: 'Meet HPA — verify stats (PSYC 210), BIOL 252/240 for target schools', due: '2026-09-15', status: 'To-Do', cat: 'Advising', notes: 'Advising Q7, Q8.' },
    { id: uid('t'), name: 'Lock in research / shadowing early (don’t wait)', due: '2026-10-01', status: 'To-Do', cat: 'Experience', notes: 'Longitudinal commitment beats last-minute box-checking.' },
    { id: uid('t'), name: 'Start the Story Bank — log experiences while fresh', due: '2026-09-01', status: 'To-Do', cat: 'Essays', notes: 'So Work & Activities + PS write themselves later.' },
  ];

  // Advisor/HPA verification checklist (Appendix A §9)
  const advisingQs = [
    { id: uid('a'), q: 'Did NSCI 175 post as core, and did SPAN 203 clear Global Language?', who: 'Advisor', done: false },
    { id: uid('a'), q: 'Did CHEM 101/L, 102/L, BIOL 101/L, MATH 231/232, STOR 155, PHYS 115 all post?', who: 'Advisor', done: false },
    { id: uid('a'), q: 'Confirm BOTH PHYS 114 and 115 posted (treating physics as complete).', who: 'Advisor', done: false },
    { id: uid('a'), q: 'Will an advisor approve a 200-level chem earlier, or is Spring 2027 the true earliest for CHEM 241?', who: 'Advisor', done: false },
    { id: uid('a'), q: 'Exact offered terms for CHEM 241/241L/261/262/262L — and does CHEM 430 run in Summer?', who: 'Advisor', done: false },
    { id: uid('a'), q: 'Prereqs for BIOL 220 and NSCI 221/222/225 (need PSYC 101 / BIOL 103 first?).', who: 'Advisor', done: false },
    { id: uid('a'), q: 'Will AP-based STOR 155 satisfy med-school stats, or take PSYC 210 in residence?', who: 'HPA', done: false },
    { id: uid('a'), q: 'Confirm BIOL 252/252L and BIOL 240 recs for target schools; any want 2 sem bio w/ lab?', who: 'HPA', done: false },
    { id: uid('a'), q: 'Which transfers clear IDEAs-in-Action Focus Capacities (avoid double-paying)?', who: 'Advisor', done: false },
    { id: uid('a'), q: 'Can a FY-Launch BIOL 103 or PSYC 101 also clear FYS/FYL this fall?', who: 'Advisor', done: false },
  ];

  // Red flags / things NOT to do (Appendix A §10)
  const redFlags = [
    'No 200-level bio/chem in Fall 2026 (and no 300+) without explicit advisor approval.',
    'Don’t stack CHEM 241+241L + BIOL 220 + NSCI 22x + SOCI 101 in one spring — pick ONE of BIOL 220 / NSCI 22x.',
    'Don’t take CHEM 262L before 241L — it’s a prereq.',
    'CHEM 261 has NO lab — orgo lab credit = 241L + 262L.',
    'Don’t schedule the MCAT before CHEM 430 (biochem is the last content domino).',
    'Don’t rely on AP credit to satisfy med-school prereqs — free schedule space only.',
    'Use Swap, never Drop-then-Add, for a class you can’t lose.',
    'Don’t burn first semester on neuro electives you don’t need yet — protect GPA, lock in research/shadowing.',
    'Watch the C-or-better rule on every Additional Requirement and med prereq.',
  ];

  // AMCAS application timeline card (Brief §14.3 — 2029 cycle for Andy)
  const amcasTimeline = [
    { name: 'AMCAS Opens (data entry)', date: '2029-05-01', note: 'Begin entering coursework + activities.' },
    { name: 'First Submission Day', date: '2029-05-29', note: 'Submit ASAP — rolling admissions favors early.' },
    { name: 'First Transmission to Schools', date: '2029-06-29', note: 'Verified apps sent. Earlier = stronger.' },
  ];

  /* ---------------- Daily quotes (Brief §14.3) ---------------- */
  const quotes = [
    { t: 'The secret of getting ahead is getting started.', by: 'Mark Twain' },
    { t: 'It always seems impossible until it’s done.', by: 'Nelson Mandela' },
    { t: 'Longitudinal commitment beats last-minute box-checking.', by: 'r/premed wisdom' },
    { t: 'Apply early, apply complete.', by: 'The one rule of rolling admissions' },
    { t: 'Reflection matters as much as the activity.', by: 'Story Bank principle' },
    { t: 'You don’t have to be great to start, but you have to start to be great.', by: 'Zig Ziglar' },
    { t: 'Protect your GPA; it opens every door later.', by: 'r/premed coursework wiki' },
    { t: 'Fit is mutual — the school list is about mission, not just stats.', by: 'r/premed school-list wiki' },
    { t: 'Discipline is choosing between what you want now and what you want most.', by: 'Abraham Lincoln (attrib.)' },
    { t: 'A C- is not a pass for prereqs — aim for C or higher, every time.', by: 'Med prereq rule' },
    { t: 'Service to those less fortunate than you. Get off campus.', by: 'Goro (SDN adcom)' },
    { t: 'Average matriculant age is ~24–25. You are not behind.', by: 'r/premed' },
  ];

  /* ---------------- MCAT Question of the Day (rotating mini-questions) ---------------- */
  const mcatQotD = [
    { q: 'Which amino acid is the only one without a chiral alpha carbon?', a: 'Glycine (its R-group is just H).' },
    { q: 'A competitive inhibitor changes Vmax and Km how?', a: 'Vmax unchanged; apparent Km increases.' },
    { q: 'Capillaries have the slowest blood velocity. Why does that matter?', a: 'Large total cross-sectional area slows flow → maximizes time for exchange.' },
    { q: 'What is the role of the loop of Henle’s descending limb?', a: 'Permeable to water (not solutes) → water reabsorbed, concentrating filtrate.' },
    { q: 'Operant vs classical conditioning — key difference?', a: 'Operant pairs behavior with consequence; classical pairs two stimuli.' },
    { q: 'Hardy-Weinberg: p² + 2pq + q². What does 2pq represent?', a: 'Frequency of heterozygotes.' },
    { q: 'What does a high pKa tell you about an acid?', a: 'It is a weaker acid (holds its proton more tightly).' },
    { q: 'CARS: what should you do before reading answer choices?', a: 'Form your own answer / main idea first — avoid being led by distractors.' },
  ];

  /* ---------------- Tar Heel mascot tip bank (Brief §12 + North Star + pillars) ---------------- */
  const tips = [
    { t: 'Start your hours + experiences journal NOW, while it’s fresh — Work & Activities and your PS will basically write themselves.', src: 'r/premed wiki', tag: 'community' },
    { t: 'Protect your GPA above all — where you go to undergrad matters far less than how you do.', src: 'r/premed coursework', tag: 'community' },
    { t: 'AMCAS has no grade replacement — every original grade is reported, and repeats are averaged. Plan accordingly.', src: 'AAMC', tag: 'official' },
    { t: 'Aim for ~150–200 clinical hours and ~150–200 non-clinical volunteering hours — depth in 1–2 places beats 10 one-offs.', src: 'r/premed', tag: 'community' },
    { t: 'Shadow ~50 hours across multiple specialties — include primary care even if you have a favorite.', src: 'r/premed shadowing', tag: 'community' },
    { t: 'Research field doesn’t matter — continuity and hours do. Pubs help but aren’t required.', src: 'r/premed research', tag: 'community' },
    { t: 'A C- isn’t accepted for prereqs at many schools — retake if you get one.', src: 'Med prereq rule', tag: 'community' },
    { t: 'Take the MCAT only once content is complete. For you, that’s the term after CHEM 430.', src: 'Your plan', tag: 'official' },
    { t: 'Apply early and complete — rolling admissions rewards June submissions and punishes August ones.', src: 'AAMC', tag: 'official' },
    { t: 'Use Swap, never Drop-then-Add, on ConnectCarolina — Swap is atomic and keeps your seat if the add fails.', src: 'UNC Registrar', tag: 'official' },
    { t: 'Anki for long-term retention — classes, MCAT, and beyond.', src: 'r/premed', tag: 'community' },
    { t: 'If your school has a premed committee letter, use it — don’t circumvent it.', src: 'r/premed LORs', tag: 'community' },
    { t: 'Ask recommenders months ahead: "Would you feel comfortable writing me a STRONG letter?" Give them your CV, PS, transcript.', src: 'r/premed LORs', tag: 'community' },
    { t: 'MSAR ($28/yr) is worth it — check each school’s real GPA/MCAT, in-state friendliness, and AP/PF policies live.', src: 'r/premed school list', tag: 'community' },
    { t: 'Report EVERY college course ever taken, including dual-enrollment — the Clearinghouse can catch omissions.', src: 'AAMC', tag: 'official' },
    { t: 'You can mark up to 3 Work & Activities as "Most Meaningful" — that extra space is the Story Bank payoff.', src: 'AAMC', tag: 'official' },
    { t: 'Average matriculant age is ~24–25. Gap years are normal — "am I too late?" anxiety is usually unfounded.', src: 'r/premed', tag: 'community' },
    { t: 'Sleep is non-negotiable for memory consolidation. Fixed wake time + morning sunlight.', src: 'Ultimate Academic Guide', tag: 'community' },
    { t: 'Prime before class: skim ahead so every lecture feels like review. You’ll retain far more.', src: 'Ultimate Academic Guide', tag: 'community' },
    { t: 'Teaching a concept to an imaginary 5-year-old is the best gap-finder — it exposes what you can’t yet explain.', src: 'Ultimate Academic Guide', tag: 'community' },
  ];

  /* ---------------- Per-pillar Tips (Brief §12 community wisdom) ---------------- */
  const pillarTips = {
    academics: [
      { tag: 'community', t: 'Major doesn’t matter to adcoms — they care that you took prereqs and did well. Pick what interests you.' },
      { tag: 'community', t: 'GPA is recalculated by the service. AMCAS = no grade replacement; AACOMAS = all repeats count; TMDSAS = flat grades (ignores +/-).' },
      { tag: 'community', t: 'Hard prereqs: 1 yr bio+lab, 1 yr gen chem+lab, orgo (1 yr OR 1 sem orgo + 1 sem biochem), 1 yr physics+lab, 1 yr English, 1 yr math.' },
      { tag: 'community', t: 'Don’t take prereqs Pass/Fail — keep the letter grade to avoid school-by-school acceptance headaches.' },
      { tag: 'official', t: 'Prereqs must be done by MATRICULATION, not application — finishing some during the cycle is fine.' },
    ],
    clinical: [
      { tag: 'community', t: 'Pick a role you actually like — a bored EMT gets less out of it than a passionate phlebotomist.' },
      { tag: 'community', t: 'Common roles: Scribe (high exposure), MA, EMT-B, ED Tech, CNA (best bedside manner), phlebotomy/pharmacy/EKG techs.' },
      { tag: 'community', t: 'You need enough to write/speak about it meaningfully — ~150–200 hours baseline.' },
    ],
    volunteering: [
      { tag: 'community', t: '≥150 hours, concentrated in 1–2 experiences showing commitment. "Service schools" expect 500+.' },
      { tag: 'community', t: 'Service to those less fortunate than you; ~2 hrs/month sustained beats stopping the instant you hit a target.' },
      { tag: 'community', t: 'Where to find: VolunteerMatch, Big Brothers Big Sisters, Crisis Text Line, Habitat, Ronald McDonald House, Special Olympics.' },
    ],
    shadowing: [
      { tag: 'community', t: '~50 hours across multiple specialties; include primary care. Hundreds of hours is unnecessary.' },
      { tag: 'community', t: 'You just observe — be respectful, don’t get in the way, ask questions when appropriate.' },
      { tag: 'community', t: 'Find it by taking initiative: cold-email offices, ask your own doctors, ask family/friends. Persistence beats rejection.' },
    ],
    research: [
      { tag: 'community', t: 'Lab class work ≠ research. Curriculum lab reports don’t count; independent hypothesis-testing does.' },
      { tag: 'community', t: 'Prioritize continuity + hours. Posters/abstracts/talks all count; pubs matter more for MD/PhD.' },
      { tag: 'community', t: 'Get a position by emailing lab managers/PIs your CV. Persistence wins. Try AAMC summer programs, SDN finder, ResearchConnect.' },
    ],
    ecs: [
      { tag: 'community', t: 'Depth + commitment over a long scatter of one-offs. Track leadership progression (member → officer → president).' },
      { tag: 'official', t: 'AMCAS allows up to 15 activities; mark up to 3 "Most Meaningful" for extra characters.' },
    ],
    letters: [
      { tag: 'community', t: 'No committee → min 2 science profs + 1 non-science; add a PI letter if you did research.' },
      { tag: 'community', t: '~Half of DO schools want an MD/DO physician letter; MD schools mostly don’t.' },
      { tag: 'community', t: 'Interfolio works across AMCAS / AACOMAS / TMDSAS for storage.' },
    ],
    essays: [
      { tag: 'community', t: 'Pre-writing common secondaries is a known edge — they arrive in waves; turn them around fast.' },
      { tag: 'community', t: 'A reusable "why us" reads as garbage — make every school-specific essay specific.' },
      { tag: 'community', t: 'Log reflections while fresh — the Story Bank is exactly what feeds the PS and W&A.' },
    ],
    schools: [
      { tag: 'community', t: 'Core tools: MSAR (MD, $28/yr), Choose DO Explorer (free), Admit.org school-list builder (free).' },
      { tag: 'community', t: 'In-state/OOS friendliness matters enormously at public schools — many are OOS-hostile. Cast a wide net, apply early + realistically.' },
      { tag: 'community', t: 'Calibration: MD matriculant ≈ 3.77 cGPA / 511–512 MCAT; DO ≈ 3.6 / 503.' },
    ],
    timeline: [
      { tag: 'official', t: 'AMCAS: opens early May → submit late May → transmitted to schools late June. Verification can take 4–6 weeks at peak.' },
      { tag: 'community', t: 'Submit transcripts ASAP — transcript issues are the #1 cause of delays.' },
      { tag: 'official', t: 'Acceptances start Oct 15 (AMCAS traffic). Hold ≤3 by Apr 15, ≤1 by Apr 30.' },
    ],
    mcat: [
      { tag: 'community', t: 'Scored 472–528 (500 = median). Four sections: Chem/Phys, CARS, Bio/Biochem, Psych/Soc.' },
      { tag: 'community', t: 'Most take it Jan–March of the application year. Defer deep study plans to r/MCAT + its wiki.' },
      { tag: 'official', t: 'Budget ~30 days for scores; know your score before applying. Most schools accept an MCAT within ~3 years.' },
    ],
  };

  /* ---------------- Per-pillar Resources (Brief §11/§12 + Appendix A §11) ---------------- */
  const pillarResources = {
    academics: [
      { name: 'r/premed — The Undergraduate Years (coursework wiki)', url: 'https://www.reddit.com/r/premed/wiki/coursework' },
      { name: 'AMCAS Grade Conversion Guide (official)', url: 'https://students-residents.aamc.org/media/7761/download' },
      { name: 'Community AMCAS/AACOMAS GPA Calculator (Google Sheet)', url: 'https://docs.google.com/spreadsheets/d/10xv_43XXgYI14baJroSGyrHIpub4u6g060QaoznnXB4/edit' },
      { name: 'UNC Neuroscience B.S. catalog', url: 'https://catalog.unc.edu/undergraduate/programs-study/neuroscience-major-bs/' },
      { name: 'UNC HPA — Medicine prereqs', url: 'https://hpa.unc.edu/explore/explore-health-careers/medicine/' },
      { name: 'UNC IDEAs in Action — First-Year Foundations', url: 'https://ideasinaction.unc.edu/first-year-foundations/' },
      { name: 'UNC class search (live sections)', url: 'https://reports.unc.edu/class-search/' },
      { name: 'ConnectCarolina registration FAQ (swap/waitlist)', url: 'https://registrar.unc.edu/registration-faq/' },
    ],
    mcat: [
      { name: 'r/MCAT wiki', url: 'https://www.reddit.com/r/MCAT/wiki/index' },
      { name: 'AAMC Official Prep', url: 'https://students-residents.aamc.org/' },
      { name: 'JackWestin (free CARS daily)', url: 'https://jackwestin.com/' },
      { name: 'MCAT validity / oldest accepted dates (AAMC)', url: 'https://students-residents.aamc.org/media/7036/download' },
    ],
    clinical: [
      { name: 'r/premed — Clinical Experience wiki', url: 'https://www.reddit.com/r/premed/wiki/clinicaljobs' },
      { name: 'SDN clinical/medical work activity finder', url: 'https://www.studentdoctor.net/activity-finder/index/medical-clinical-work-experience' },
    ],
    volunteering: [
      { name: 'r/premed — Non-Clinical Volunteering wiki', url: 'https://www.reddit.com/r/premed/wiki/volunteering' },
      { name: 'VolunteerMatch', url: 'https://www.volunteermatch.org/' },
    ],
    shadowing: [
      { name: 'r/premed — Shadowing wiki', url: 'https://www.reddit.com/r/premed/wiki/shadowing' },
      { name: 'Teleshadowing (virtual fallback)', url: 'https://www.teleshadowing.com/' },
      { name: 'HEAL clinical shadowing', url: 'https://www.clinicalshadowing.com/' },
    ],
    research: [
      { name: 'r/premed — Research wiki', url: 'https://www.reddit.com/r/premed/wiki/research' },
      { name: 'SDN research activity finder', url: 'https://www.studentdoctor.net/activity-finder/index/research-experience' },
      { name: 'ResearchConnect', url: 'https://researchconnect.co/' },
      { name: 'AAMC summer undergrad research programs', url: 'https://students-residents.aamc.org/phd-biomedical-science/summer-undergraduate-research-programs' },
    ],
    ecs: [
      { name: 'r/premed — Stay Focused (Advice on ECs)', url: 'https://www.reddit.com/r/premed/comments/v3f37f/stay_focused_advice_on_extracurriculars/' },
    ],
    letters: [
      { name: 'r/premed — Letters of Rec wiki', url: 'https://www.reddit.com/r/premed/wiki/lors' },
      { name: 'AAMC letter-writer guidelines', url: 'https://students-residents.aamc.org/media/5306/download' },
      { name: 'Interfolio (letter storage)', url: 'https://www.interfolio.com/applying-medical-school-use-interfolio/' },
    ],
    essays: [
      { name: 'r/premed — Essays wiki', url: 'https://www.reddit.com/r/premed/wiki/essays' },
      { name: '15 Tips for a Strong Personal Statement', url: 'https://www.reddit.com/r/premed/comments/h9u0l1/15_tips_for_writing_a_strong_personal_statement/' },
      { name: 'Med School Secondary Essay Bank (2018–2023)', url: 'https://www.reddit.com/r/premed/comments/18bgmxf/med_school_secondary_essay_bank_20182023/' },
      { name: 'Pre-Writing Secondaries in 4 Steps', url: 'https://www.reddit.com/r/premed/comments/nwabsj/my_guide_to_prewriting_secondaries_on_4_simple/' },
    ],
    schools: [
      { name: 'MSAR (AAMC)', url: 'https://students-residents.aamc.org/medical-school-admission-requirements/medical-school-admission-requirements-msar-applicants' },
      { name: 'Choose DO Explorer (free)', url: 'https://www.aacom.org/explore-med-schools/choose-do-explorer' },
      { name: 'Admit — school stats + list builder', url: 'https://med.admit.org/school-list-builder' },
      { name: 'AAMC Table A-23 (acceptance by GPA/MCAT)', url: 'https://www.aamc.org/media/6091/download' },
    ],
    timeline: [
      { name: 'r/premed — Applying (AMCAS/AACOMAS) wiki', url: 'https://www.reddit.com/r/premed/wiki/applications' },
      { name: '2026 AMCAS Applicant Guide', url: 'https://students-residents.aamc.org/applying-medical-school-amcas/publication/2026-amcas-applicant-guide' },
      { name: 'AAMC Premed Calendar', url: 'https://students-residents.aamc.org/premed-calendar' },
      { name: 'AAMC FAP (Fee Assistance Program)', url: 'https://students-residents.aamc.org/fee-assistance-program/fee-assistance-program' },
    ],
  };

  /* ---------------- North Star content (Brief §10) ---------------- */
  const northStar = {
    intro: 'Getting into med school isn’t a checklist — it’s assembling a holistic, coherent story that convinces a committee you’ll make a good physician. Grades + MCAT show you can handle the academics; experiences show you know what medicine is; essays + letters + interviews show who you are and why medicine. The pieces are read together.',
    drivingFact: 'Rolling admissions. Schools review and offer seats as applications arrive — applying early (complete + verified, ideally by June) materially raises your odds. This is why the whole timeline is front-loaded.',
    systems: [
      { name: 'AMCAS', who: 'MD (allopathic) — your main one' },
      { name: 'AACOMAS', who: 'DO (osteopathic)' },
      { name: 'TMDSAS', who: 'Texas public schools' },
    ],
    timeline: [
      'Years 1–3 (build): finish prereqs, protect GPA, accumulate clinical/volunteer/shadowing/research hours steadily, build LOR relationships, keep a running story bank.',
      '~12–18 mo before matriculation: take the MCAT once content is complete.',
      'Application year May/June: AMCAS opens — submit primary early.',
      'Summer: secondaries arrive in waves — turn them around fast.',
      'Fall–winter: interviews (rolling).',
      'Winter–spring: decisions (rolling, incl. waitlists). Matriculate the following fall.',
    ],
    yourPlan: 'Your personalized path (§9 + Appendix A): CHEM 430 Fall 2028 → MCAT Jan–Apr 2029 → apply 2029 cycle → matriculate Fall 2030, no gap year.',
    mindset: [
      'Longitudinal commitment beats last-minute box-checking — start early, stay consistent.',
      'Reflection matters as much as the activity — log why it mattered while it’s fresh.',
      'Fit is mutual — school list + interviews are about matching mission, not just stats.',
      'Apply early, apply complete.',
    ],
    community: [
      { name: 'r/premed (Reddit)', url: 'https://www.reddit.com/r/premed/', note: 'Main hub + wiki/FAQ. Fetch-blocked — paste in manually.' },
      { name: 'r/MCAT (Reddit)', url: 'https://www.reddit.com/r/mcat/', note: 'MCAT-specific Q&A + score threads.' },
      { name: 'Student Doctor Network (SDN)', url: 'https://forums.studentdoctor.net/forums/pre-medical-md.10/', note: 'Higher-signal, moderated; adcoms participate.' },
    ],
  };

  /* ---------------- Goals (progress-bar targets — Brief §8 defaults) ---------------- */
  const goals = {
    clinical: 150, volunteering: 150, shadowing: 50, research: 1000 /* hrs ~1.5yr */, ecs: 0,
    clinicalStretch: 1000,
  };

  /* ---------------- Profile ---------------- */
  const profile = {
    name: 'Andy',
    school: 'UNC-Chapel Hill',
    major: 'Neuroscience B.S., Pre-Med',
    startYear: 'Fall 2026',
    matriculateGoal: 'Fall 2030 (2029 cycle, no gap)',
    resumeDocUrl: '', // paste a Google Doc "embed" / preview URL
    driveFolderUrl: '',
  };

  // ---- Assemble default state ----
  window.SEED = {
    profile, courses, degreeReqs, chemChains, assignments,
    mcat: { targetDate: mcatTargetDate, scores: mcatScores, errors: mcatErrors, schedule: mcatSchedule, resources: mcatResources, _scheduleExpanded: false },
    clinical, volunteering, shadowing, research, ecs, letters,
    stories, secondaries, interviewQs, schools,
    tasks, advisingQs, redFlags, amcasTimeline,
    kanban: { todo: [], doing: [], done: [] },
    focusTargets: [
      { id: uid('f'), text: 'Review CHEM 241 syllabus before week 1', done: false },
      { id: uid('f'), text: 'Email one research lab this week', done: false },
    ],
    quarterlyGoals: [
      { id: uid('qg'), quarter: 'Fall 2026', goal: 'Protect GPA — light schedule, strong study habits from day 1', status: 'Active' },
      { id: uid('qg'), quarter: 'Fall 2026', goal: 'Start shadowing + one sustained volunteer commitment', status: 'Active' },
      { id: uid('qg'), quarter: 'Spring 2027', goal: 'Enter CHEM 241/241L chain cleanly; meet HPA on stats plan', status: 'Active' },
    ],
    ideasNote: '',
    goals,
    essayWorkspace: {
      personalStatement: { drafts: '', checklist: defaultPSChecklist() },
      brainDump: '',
    },
    // static reference content (not user-edited, but kept here so it's all in one place)
    _ref: { quotes, mcatQotD, tips, pillarTips, pillarResources, northStar, storyPrompts },
  };

  function defaultPSChecklist() {
    return [
      { t: 'Opens with a specific scene/moment, not a thesis statement', done: false },
      { t: 'Answers "why medicine" through experience, not assertion', done: false },
      { t: 'Shows reflection + growth, not just a list of activities', done: false },
      { t: 'Every paragraph earns its place (5,300 char limit)', done: false },
      { t: 'No clichés ("I want to help people"); concrete + personal', done: false },
      { t: 'Read aloud — flows, sounds like me', done: false },
      { t: 'Reviewed by ≥2 people (1 who knows medicine, 1 who doesn’t)', done: false },
    ];
  }
})();
