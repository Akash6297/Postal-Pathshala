/* ============================================================
   STATE
   ============================================================ */
const state = {
  theme: localStorage.getItem('pm_theme') || 'light',
  topics: JSON.parse(localStorage.getItem('pm_topics') || '{}'),
  mistakes: JSON.parse(localStorage.getItem('pm_mistakes') || '[]'),
  history: JSON.parse(localStorage.getItem('pm_history') || '[]'),
  dates: JSON.parse(localStorage.getItem('pm_dates') || '[]'),
  examDate: localStorage.getItem('pm_examdate') || '',
  overrides: JSON.parse(localStorage.getItem('pm_overrides') || '{}'),
  reports: JSON.parse(localStorage.getItem('pm_reports') || '[]'),
  pdfRead: JSON.parse(localStorage.getItem('pm_pdf_read') || '[]'),
  videoWatched: JSON.parse(localStorage.getItem('pm_video_watched') || '[]'),
  currentSubject: 'postal',
  mockMode: 'full',
  reportFilter: 'all',
  libCategory: null,
  quiz: null,
};

/* ============================================================
   SUBJECTS & TOPICS
   ============================================================ */
const subjects = {
  postal: {
    name: 'Postal Knowledge',
    color: '#1d4ed8',
    ytVideoId: 'gs5QlqKc8n0',
    topics: [
      { name: 'Postal Manual Vol-V — Key Definitions', tags: ['Definitions', 'PMG', 'Divisional Setup'], search: 'Postal Manual Volume 5 definitions PMG Divisional Superintendent GDS exam' },
      { name: 'Postal Manual VI & VII — Rules', tags: ['Stamps & Seals', 'Conduct Rules', 'Procedures'], search: 'Postal Manual Volume 6 7 rules stamps seals conduct GDS exam' },
      { name: 'Post Office Regulations 2024', tags: ['New Rules 2024', 'Office Procedures'], search: 'Post Office Regulations 2024 new rules India Post GDS exam' },
      { name: 'Products & Services — Schemes & Rates', tags: ['KVP', 'NSC', 'RD/TD', 'Speed Post'], search: 'India Post products and services savings schemes KVP NSC interest rates' },
      { name: 'Current Affairs & Annual Report', tags: ['India Post News', 'Annual Report 2025-26'], search: 'India Post Annual Report 2025-26 current affairs GDS exam' },
    ],
  },
  gk: {
    name: 'General Knowledge',
    color: '#059669',
    ytVideoId: '8SJAh6om3EA',
    topics: [
      { name: 'History', tags: ['Ancient', 'Medieval', 'Modern', 'Freedom Struggle'], search: 'Indian history GK GDS MTS Postman exam' },
      { name: 'Geography', tags: ['Indian Geography', 'World Geography', 'Rivers'], search: 'Indian geography GK GDS MTS Postman exam' },
      { name: 'Polity & Constitution', tags: ['Constitution', 'Articles', 'Govt Bodies'], search: 'Indian polity constitution GK GDS MTS Postman exam' },
      { name: 'Science & Technology', tags: ['General Science', 'Inventions'], search: 'general science GK GDS MTS Postman exam' },
      { name: 'Sports & Awards', tags: ['Sports', 'Awards & Honours'], search: 'sports and awards GK GDS MTS Postman exam' },
      { name: 'Static GK — Books, Authors, Firsts in India', tags: ['Books & Authors', 'First in India', 'Static GK'], search: 'static GK books and authors first in India GDS exam' },
      { name: 'Ethics & Moral Values', tags: ['Ethics', 'Moral Values'], search: 'ethics and moral values MCQ GDS exam' },
    ],
  },
  math: {
    name: 'Math & Reasoning',
    color: '#d97706',
    ytVideoId: 'qCKUH9UNcN8',
    topics: [
      { name: 'Number System & Simplification', tags: ['Number System', 'Simplification', 'BODMAS'], search: 'number system simplification maths GDS MTS Postman exam' },
      { name: 'Percentage, Profit & Loss', tags: ['Percentage', 'Profit & Loss'], search: 'percentage profit loss maths tricks GDS MTS Postman exam' },
      { name: 'SI/CI, Ratio & Average', tags: ['Simple Interest', 'Compound Interest', 'Ratio', 'Average'], search: 'simple interest compound interest ratio average maths GDS exam' },
      { name: 'Time-Speed-Distance & Time-Work', tags: ['Speed & Distance', 'Time & Work'], search: 'time speed distance time and work maths GDS exam' },
      { name: 'Mensuration', tags: ['Area', 'Volume', 'Perimeter'], search: 'mensuration area volume perimeter maths GDS exam' },
      { name: 'Reasoning — Series, Coding, Odd One Out', tags: ['Series', 'Coding-Decoding', 'Odd One Out'], search: 'reasoning series coding decoding odd one out GDS MTS Postman exam' },
    ],
  },
};

/* ============================================================
   EXAM PATTERNS
   ============================================================ */
const examPatterns = {
  gds_mts:     { label: 'GDS → MTS',     postal: 30, gk: 10, math: 10, marksPerQ: 2, minutes: 50 },
  gds_postman: { label: 'GDS → Postman', postal: 55, gk: 10, math: 10, marksPerQ: 2, minutes: 75 },
};

/* ============================================================
   PDF STUDY LIBRARY
   ============================================================ */
function seqFiles(folder, prefix, from, to, nameFn) {
  const out = [];
  for (let i = from; i <= to; i++) {
    out.push({ name: nameFn ? nameFn(i) : `${prefix} ${i}`, path: `${folder}/${prefix} - ${i}.pdf` });
  }
  return out;
}

const pdfLibrary = [
  {
    id: 'postal5', name: 'Postal Manual Vol-V', subject: 'postal', icon: 'mailbox',
    desc: 'Key definitions, divisional setup and core terminology',
    files: [
      { name: 'Volume 1', path: 'Postal Manual Vol - V/Vol - 1.pdf' },
      { name: 'Volume 2', path: 'Postal Manual Vol - V/Vol - 2.pdf' },
      { name: 'Volume 3', path: 'Postal Manual Vol - V/Vol - 3.pdf' },
    ],
  },
  {
    id: 'postal67', name: 'Postal Manual VI & VII', subject: 'postal', icon: 'stamp',
    desc: 'Rules on stamps, seals, conduct and procedures',
    files: [
      { name: 'Postal Manual Volume VII', path: 'Postal Manual VI and VII/Postal Vol - VII.pdf' },
      { name: 'Volume VI Part III — Lecture 1', path: 'Postal Manual VI and VII/Vol VI - Part - III Lecture - 1.pdf' },
      { name: 'Volume VI Part III — Lecture 2', path: 'Postal Manual VI and VII/Vol VI - Part - III Lecture - 2.pdf' },
    ],
  },
  {
    id: 'pogregs', name: 'Post Office Regulations 2024', subject: 'postal', icon: 'scroll',
    desc: 'New office procedures and rules — class-wise lectures',
    files: [
      { name: 'Class 2', path: 'Post Office Regulations 2024/class 2-1.pdf' },
      { name: 'Class 3', path: 'Post Office Regulations 2024/class 3.pdf' },
      { name: 'Class 4', path: 'Post Office Regulations 2024/Class 4.pdf' },
      { name: 'Class 5', path: 'Post Office Regulations 2024/Class 5.pdf' },
      { name: 'Class 6', path: 'Post Office Regulations 2024/Class 6.pdf' },
      { name: 'Class 7', path: 'Post Office Regulations 2024/Class 7.pdf' },
      { name: 'Class 8', path: 'Post Office Regulations 2024/Class 8.pdf' },
      { name: 'Class 9', path: 'Post Office Regulations 2024/Class 9.pdf' },
      { name: 'Class 10', path: 'Post Office Regulations 2024/Class 10.pdf' },
      { name: 'Class 11', path: 'Post Office Regulations 2024/Class 11.pdf' },
      { name: 'Class 12', path: 'Post Office Regulations 2024/Class 12.pdf' },
      { name: 'Class 13', path: 'Post Office Regulations 2024/Class 13.pdf' },
    ],
  },
  {
    id: 'products', name: 'Products & Services', subject: 'postal', icon: 'coins',
    desc: 'Savings schemes, interest rates, Speed Post and more',
    files: seqFiles('Products and Services', 'Lecture', 1, 10, i => `Lecture ${i}`),
  },
  {
    id: 'pog1', name: 'Post Office Guide — Part 1', subject: 'postal', icon: 'van',
    desc: 'Foundational guide lectures for postal operations',
    files: [
      { name: 'Demo — Post Office Guide Part 1', path: 'Post Office Guide - 1/DEMO Post Office Guide Part - 1.pdf' },
      { name: 'Lecture 2', path: 'Post Office Guide - 1/Lecture - 2 (POG-1).pdf' },
      { name: 'Lecture 3', path: 'Post Office Guide - 1/Lecture - 3 (POG-1).pdf' },
      { name: 'Lecture 4', path: 'Post Office Guide - 1/Lecture - 4 (POG-1).pdf' },
      { name: 'Lecture 5', path: 'Post Office Guide - 1/Lecture - 5 (POG-1).pdf' },
      { name: 'Lecture 6', path: 'Post Office Guide - 1/Lecture - 6 (POG-1).pdf' },
      { name: 'Lecture 7', path: 'Post Office Guide - 1/Lecture - 7 (POG-1).pdf' },
      { name: 'Lecture 8', path: 'Post Office Guide - 1/Lecture - 8 (POG-1).pdf' },
      { name: 'Lecture 15', path: 'Post Office Guide - 1/Lecture - 15 (POG-1).pdf' },
      { name: 'Lecture 16', path: 'Post Office Guide - 1/Lecture - 16 (POG-1).pdf' },
    ],
  },
  {
    id: 'annual', name: 'Annual Report 2025-26', subject: 'postal', icon: 'report',
    desc: 'India Post current affairs and annual report highlights',
    files: seqFiles('Annual Report 2025 - 2026', 'Annual Report', 1, 3, i => `Annual Report — Part ${i}`),
  },
  {
    id: 'gkparts', name: 'GK Part Series (1-20)', subject: 'gk', icon: 'globe',
    desc: 'Bite-sized General Knowledge MCQ sets',
    files: seqFiles('GK', 'GK Part', 1, 20, i => `GK Part ${i}`),
  },
  {
    id: 'gk2000', name: '2000 GK Lecture Series', subject: 'gk', icon: 'globe',
    desc: 'Full video-lecture style GK PDF series (1-20)',
    files: seqFiles('GK/2000 GK Series', 'General Knowledge Lecture', 1, 20, i => `Lecture ${i}`),
  },
  {
    id: 'gkspecial', name: 'GK Special Topics', subject: 'gk', icon: 'book',
    desc: 'Focused topic-wise GK material — history, geography, ethics',
    files: [
      { name: 'Ethics & Moral MCQs', path: 'GK/Ethics and Moral MCQs.pdf' },
      { name: 'Moral & Ethics — Part 1', path: 'GK/MORAL AND ETHICS - 1.pdf' },
      { name: 'Famous Slogans by Freedom Fighters', path: 'GK/Famous Slogans by Indian Freedom Fighters.pdf' },
      { name: 'Indian Freedom Fighters’ Struggle', path: 'GK/Indian Freedom Fighters Struggle - 1.pdf' },
      { name: 'Famous Books & Authors', path: 'GK/Famous books and their authors (1).pdf' },
      { name: 'Instruments & Singers', path: 'GK/INSTRUMENTS AND SINGERS.pdf' },
      { name: 'Constitution & Indian Culture', path: 'GK/constitution and Indian Culture.pdf' },
      { name: 'First in India', path: 'GK/first in india.pdf' },
      { name: 'Indian Rivers & Their Projects', path: 'GK/Indian Rivers and Their projects.pdf' },
      { name: 'Indian Rivers — Important Questions', path: 'GK/indian Rivers important questions.pdf' },
      { name: 'Important Lakes in India', path: 'GK/important lakes in india.pdf' },
      { name: 'National Parks — Memory Tricks', path: 'GK/National parks trick.pdf' },
      { name: 'Important Details 2025 — Exam MCQs', path: 'GK/Important Details 2025 exam mcq.pdf' },
      { name: 'Mixed GK Questions', path: 'GK/Mix gk questions.pdf' },
    ],
  },
];

/* Maps each PDF category to the question range in questionsDB that covers its content.
   start/end are inclusive indices within questionsDB[subj].
   max caps how many questions are drawn (defaults to min(20, pool size)). */
const pdfExamMap = {
  postal5:   { subj: 'postal', start: 0,   end: 30,  label: 'Postal Manual Vol-V Exam' },
  postal67:  { subj: 'postal', start: 31,  end: 66,  label: 'Postal Manual VI & VII Exam' },
  pogregs:   { subj: 'postal', start: 67,  end: 92,  label: 'Post Office Regulations 2024 Exam' },
  products:  { subj: 'postal', start: 93,  end: 139, label: 'Products & Services Exam' },
  pog1:      { subj: 'postal', start: 67,  end: 139, label: 'Post Office Guide Exam' },
  annual:    { subj: 'postal', start: 140, end: 307, label: 'Annual Report & Current Affairs Exam' },
  gkparts:   { subj: 'gk',    start: 0,   end: 136, label: 'GK Part Series Exam' },
  gk2000:    { subj: 'gk',    start: 137, end: 258, label: '2000 GK Lecture Series Exam' },
  gkspecial: { subj: 'gk',    start: 259, end: 327, label: 'GK Special Topics Exam' },
};

const libCatIcons = {
  mailbox: '<path d="M3 11a4 4 0 014-4h7a6 6 0 010 12H4a1 1 0 01-1-1z"/><line x1="12" y1="7" x2="12" y2="19"/><circle cx="17" cy="13" r="1"/>',
  stamp:   '<rect x="4" y="3" width="16" height="13" rx="1" stroke-dasharray="2 2"/><circle cx="12" cy="9.5" r="3"/><path d="M8 20h8M12 16v4"/>',
  scroll:  '<path d="M5 4a2 2 0 00-2 2v0a2 2 0 002 2h1v10a2 2 0 002 2h9a2 2 0 002-2v0a2 2 0 00-2-2H8"/><path d="M19 4a2 2 0 00-2-2H6"/><line x1="9" y1="8" x2="16" y2="8"/><line x1="9" y1="11" x2="16" y2="11"/>',
  coins:   '<circle cx="9" cy="9" r="5"/><path d="M14.5 7A5 5 0 1117 16.9"/><path d="M14 14.5a5 5 0 11.5-.001"/>',
  van:     '<path d="M3 16V7a1 1 0 011-1h9l4 4v6a1 1 0 01-1 1H4a1 1 0 01-1-1z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/>',
  report:  '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/>',
  globe:   '<circle cx="12" cy="12" r="9"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 3a14 14 0 010 18 14 14 0 010-18z"/>',
  book:    '<path d="M2 4h6a4 4 0 014 4v12a3 3 0 00-3-3H2z"/><path d="M22 4h-6a4 4 0 00-4 4v12a3 3 0 013-3h7z"/>',
};

/* ============================================================
   MOTIVATION — QUOTES & BADGES
   ============================================================ */
const motivationQuotes = [
  "Every page you read today is a step closer to your GDS → MTS/Postman badge.",
  "Discipline beats motivation. Show up daily, even for 20 minutes.",
  "No negative marking means every guess is a free chance — never leave a question blank!",
  "Postal Knowledge is 60-73% of your marks. Master it first, master the exam.",
  "Your Mistake Book is your secret weapon — review it every Sunday without fail.",
  "Consistency compounds. A small daily streak becomes an unstoppable habit.",
  "The exam rewards preparation, not luck. Put in the reps.",
  "Re-reading the same manual page until it clicks is not wasted time — it's mastery.",
  "Today's mock test score is just data. Use it to study smarter tomorrow.",
  "You're not just studying for an exam — you're building the career you want.",
  "Speed comes after accuracy. Get the concept right, then get fast.",
  "Every GK fact you learn today could be tomorrow's free 2 marks.",
  "Believe in the slow work. One topic at a time, one day at a time.",
  "The aspirants who win are the ones who never stopped showing up.",
  "Your future self is counting on the effort you put in today.",
];

function getTodayQuote() {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const diff = new Date() - start;
  const dayOfYear = Math.floor(diff / 86400000);
  return motivationQuotes[dayOfYear % motivationQuotes.length];
}

const badgeDefs = [
  { id: 'first_topic', name: 'First Steps', desc: 'Mark your first topic as done', icon: 'flag',
    earned: () => Object.values(state.topics).filter(Boolean).length >= 1 },
  { id: 'streak3', name: 'On Fire', desc: '3-day study streak', icon: 'flame',
    earned: () => calcStreak() >= 3 },
  { id: 'streak7', name: 'Unstoppable', desc: '7-day study streak', icon: 'flame',
    earned: () => calcStreak() >= 7 },
  { id: 'first_test', name: 'Test Pilot', desc: 'Complete your first mock test', icon: 'target',
    earned: () => state.history.length >= 1 },
  { id: 'ten_tests', name: 'Test Veteran', desc: 'Complete 10 mock tests', icon: 'target',
    earned: () => state.history.length >= 10 },
  { id: 'score75', name: 'Sharpshooter', desc: 'Score 75% or more in a mock test', icon: 'star',
    earned: () => state.history.some(h => h.pct >= 75) },
  { id: 'score100', name: 'Perfectionist', desc: 'Score a perfect 100% in a mock test', icon: 'trophy',
    earned: () => state.history.some(h => h.pct === 100) },
  { id: 'reader5', name: 'Bookworm', desc: 'Mark 5 PDFs as read in the Study Library', icon: 'book',
    earned: () => state.pdfRead.length >= 5 },
  { id: 'video5', name: 'Video Learner', desc: 'Mark 5 videos as watched in the Video Library', icon: 'play',
    earned: () => state.videoWatched.length >= 5 },
];

const badgeIcons = {
  flag: '<path d="M4 22V4a1 1 0 011-1h13l-2 4 2 4H6a1 1 0 00-1 1v14"/>',
  flame: '<path d="M12 2c1 4-4 5-4 9a4 4 0 008 0c0-1.5-1-2.5-1-2.5s2 1 2 4.5a5 5 0 01-10 0c0-5 5-6.5 5-11z"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4z"/><path d="M7 5H4a2 2 0 002 4M17 5h3a2 2 0 01-2 4"/>',
  book: '<path d="M2 4h6a4 4 0 014 4v12a3 3 0 00-3-3H2z"/><path d="M22 4h-6a4 4 0 00-4 4v12a3 3 0 013-3h7z"/>',
  play: '<circle cx="12" cy="12" r="9"/><polygon points="10 8 16 12 10 16 10 8"/>',
};

/* ============================================================
   QUICK SEARCH TOPICS
   ============================================================ */
const quickTopicsList = [
  'GDS to MTS exam pattern',
  'GDS to Postman exam syllabus',
  'Postal Manual Volume 5 definitions',
  'Post Office Regulations 2024 new rules',
  'India Post savings schemes interest rates',
  'India Post Annual Report 2025-26 current affairs',
  'Indian Polity and Constitution GK',
  'Static GK first in India',
  'Percentage profit loss tricks',
  'Time speed distance shortcuts',
];

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', init);

function init() {
  applyTheme();
  renderSubjects();
  renderPlaylistGrid();
  renderExamSyllabus();
  renderQuickChips();
  renderMistakeBook();
  renderLibrary();
  renderReports();
  updatePatternInfo();
  if (state.examDate) {
    const input = document.getElementById('exam-date-input');
    if (input) input.value = state.examDate;
  }
  renderDashboard();
}

/* ============================================================
   NAVIGATION / THEME / SIDEBAR
   ============================================================ */
function navigateTo(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const sec = document.getElementById('sec-' + id);
  if (sec) sec.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.section === id));

  const titles = {
    dashboard: 'Dashboard', subjects: 'Subjects', mocktest: 'Mock Test',
    playlists: 'Video Library', examinfo: 'Exam Info', search: 'Search Topics', mistakebook: 'Mistake Book',
    library: 'PDF Study Library', reports: 'Question Reports',
  };
  const titleEl = document.getElementById('topbar-title');
  if (titleEl) titleEl.textContent = titles[id] || '';

  if (id === 'dashboard') renderDashboard();
  if (id === 'reports') renderReports();
  if (window.innerWidth <= 768) document.getElementById('sidebar').classList.remove('open');
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('pm_theme', state.theme);
  applyTheme();
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  icon.innerHTML = state.theme === 'dark'
    ? '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>'
    : '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>';
}

/* ============================================================
   DASHBOARD
   ============================================================ */
function renderDashboard() {
  const totalTopics = Object.values(subjects).reduce((sum, s) => sum + s.topics.length, 0);
  const doneTopics = Object.values(state.topics).filter(Boolean).length;

  setText('stat-topics', `${doneTopics}/${totalTopics}`);
  setText('stat-streak', calcStreak());
  setText('stat-tests', state.history.length);
  setText('stat-mistakes', state.mistakes.length);

  if (state.history.length) {
    const avg = Math.round(state.history.reduce((s, h) => s + h.pct, 0) / state.history.length);
    setText('stat-score', avg + '%');
  } else {
    setText('stat-score', '--');
  }

  const pct = totalTopics ? Math.round((doneTopics / totalTopics) * 100) : 0;
  setText('ring-pct', pct + '%');
  const ring = document.getElementById('progress-ring');
  if (ring) {
    const circumference = 2 * Math.PI * 36;
    ring.setAttribute('stroke-dasharray', circumference);
    ring.setAttribute('stroke-dashoffset', circumference * (1 - pct / 100));
  }

  Object.keys(subjects).forEach(key => {
    const subj = subjects[key];
    const done = subj.topics.filter((t, i) => state.topics[key + '_' + i]).length;
    const p = subj.topics.length ? Math.round((done / subj.topics.length) * 100) : 0;
    const bar = document.getElementById('subj-bar-' + key);
    if (bar) bar.style.width = p + '%';
    setText('subj-lbl-' + key, `${done}/${subj.topics.length}`);
  });

  renderWeekGrid();
  updateCountdown();
  renderMotivation();
  renderAnalyticsCharts();
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function calcStreak() {
  let streak = 0;
  const d = new Date();
  while (true) {
    const key = d.toISOString().slice(0, 10);
    if (state.dates.includes(key)) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

function renderWeekGrid() {
  const grid = document.getElementById('week-grid');
  if (!grid) return;
  const dayLetters = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  let html = '';
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const done = state.dates.includes(key);
    const isToday = i === 0;
    html += `<div class="wg-cell ${done ? 'wg-done' : ''} ${isToday ? 'wg-today' : ''}"><span>${dayLetters[d.getDay()]}</span><span>${d.getDate()}</span></div>`;
  }
  grid.innerHTML = html;
}

function checkIn(silent) {
  const today = new Date().toISOString().slice(0, 10);
  if (!state.dates.includes(today)) {
    state.dates.push(today);
    localStorage.setItem('pm_dates', JSON.stringify(state.dates));
  }
  renderDashboard();
  if (!silent) showToast('Checked in for today — keep the streak going!', 'ok');
}

function setExamDate() {
  const input = document.getElementById('exam-date-input');
  if (!input || !input.value) return;
  state.examDate = input.value;
  localStorage.setItem('pm_examdate', state.examDate);
  updateCountdown();
  showToast('Exam date saved.', 'ok');
}

function updateCountdown() {
  const el = document.getElementById('exam-countdown');
  if (!el) return;
  if (!state.examDate) { el.textContent = 'Set exam date below'; return; }
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const exam = new Date(state.examDate); exam.setHours(0, 0, 0, 0);
  const diff = Math.round((exam - today) / (1000 * 60 * 60 * 24));
  if (diff > 0) el.textContent = `${diff} day${diff === 1 ? '' : 's'} left`;
  else if (diff === 0) el.textContent = 'Exam is today — All the best!';
  else el.textContent = 'Exam date has passed — update it above';
}

/* ============================================================
   SUBJECTS / TOPICS
   ============================================================ */
function switchSubject(key) {
  state.currentSubject = key;
  document.querySelectorAll('#sec-subjects .subject-tab').forEach(t => t.classList.toggle('active', t.dataset.subj === key));
  document.querySelectorAll('#sec-subjects .subject-panel').forEach(p => p.classList.toggle('active', p.id === 'panel-' + key));
}

function renderSubjects() {
  Object.keys(subjects).forEach(key => {
    const subj = subjects[key];
    const panel = document.getElementById('panel-' + key);
    if (!panel) return;
    const doneCount = subj.topics.filter((t, i) => state.topics[key + '_' + i]).length;
    const pct = subj.topics.length ? Math.round((doneCount / subj.topics.length) * 100) : 0;
    const qCount = (questionsDB[key] || []).length;

    let html = `
      <div class="subj-header-bar">
        <div style="flex:1">
          <div style="font-weight:700;margin-bottom:6px">${subj.name} <span style="color:var(--text-muted);font-weight:500;font-size:12.5px">— ${doneCount}/${subj.topics.length} topics done · ${qCount} MCQs in bank</span></div>
          <div class="subj-prog-wrap"><div class="subj-prog-fill" style="width:${pct}%;background:${subj.color}"></div></div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="quickTest('${key}')">Practice this Subject</button>
      </div>
      <div class="topic-grid">`;

    subj.topics.forEach((t, i) => {
      const tid = key + '_' + i;
      const done = !!state.topics[tid];
      html += `
        <div class="topic-card ${done ? 'topic-done' : ''}">
          <div class="topic-card-top">
            <span class="topic-number">Topic ${i + 1}</span>
            <div class="topic-check ${done ? 'checked' : ''}" onclick="toggleTopic('${tid}')">
              ${done ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
            </div>
          </div>
          <div class="topic-name">${t.name}</div>
          <div class="topic-tags">${t.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
          <div class="topic-actions">
            <button class="btn btn-primary btn-sm" onclick="quickTest('${key}')">Practice MCQ</button>
            <button class="btn btn-ghost btn-sm" onclick="topicGoogle('${key}',${i})">Google</button>
            <button class="btn btn-ghost btn-sm" onclick="topicYT('${key}',${i})">YouTube</button>
          </div>
        </div>`;
    });

    html += `</div>`;
    panel.innerHTML = html;
  });
}

function toggleTopic(tid) {
  state.topics[tid] = !state.topics[tid];
  localStorage.setItem('pm_topics', JSON.stringify(state.topics));
  renderSubjects();
  renderDashboard();
}

function topicGoogle(key, i) {
  searchGoogle(subjects[key].topics[i].search);
}
function topicYT(key, i) {
  openYT('Postal Study ' + subjects[key].topics[i].search);
}

/* ============================================================
   MOCK TEST
   ============================================================ */
function switchMockMode(mode) {
  state.mockMode = mode;
  document.querySelectorAll('.mock-mode-tab').forEach(t => t.classList.toggle('active', t.dataset.mode === mode));
  document.getElementById('mock-full').style.display = mode === 'full' ? 'block' : 'none';
  document.getElementById('mock-practice').style.display = mode === 'practice' ? 'block' : 'none';
}

function updatePatternInfo() {
  const sel = document.getElementById('sel-pattern');
  if (!sel) return;
  const p = examPatterns[sel.value];
  const totalQ = p.postal + p.gk + p.math;
  document.getElementById('pattern-info').innerHTML =
    `<strong>${p.label}</strong>: ${p.postal} Postal + ${p.gk} GK + ${p.math} Math = <strong>${totalQ} Questions</strong> · ` +
    `<strong>${totalQ * p.marksPerQ} Marks</strong> · ${p.minutes} Minutes · No negative marking`;
}

function quickTest(subjectKey) {
  navigateTo('mocktest');
  switchMockMode('practice');
  const subjSel = document.getElementById('sel-subject');
  const countSel = document.getElementById('sel-count');
  const timeSel = document.getElementById('sel-time');
  if (subjSel) subjSel.value = subjectKey;
  if (countSel) countSel.value = '20';
  if (timeSel) timeSel.value = '20';
}

function startFullMock() {
  const sel = document.getElementById('sel-pattern');
  const p = examPatterns[sel.value];
  const pool = [];
  ['postal', 'gk', 'math'].forEach(subj => {
    const qs = shuffle(getSubjectQuestions(subj)).slice(0, p[subj]);
    pool.push(...qs);
  });
  beginQuiz(shuffle(pool), p.minutes * 60, p.marksPerQ, p.label);
}

function startTest() {
  const subj = document.getElementById('sel-subject').value;
  const count = parseInt(document.getElementById('sel-count').value, 10);
  const mins = parseInt(document.getElementById('sel-time').value, 10);
  const qs = shuffle(getSubjectQuestions(subj)).slice(0, count);
  beginQuiz(qs, mins * 60, 2, subjects[subj].name + ' Practice');
}

function beginQuiz(qs, seconds, marksPerQ, label) {
  if (!qs.length) {
    showToast('No questions available for this selection yet.', 'err');
    return;
  }
  state.quiz = { qs, cur: 0, score: 0, answers: new Array(qs.length).fill(null), timeLeft: seconds, marksPerQ, label, timer: null };
  document.getElementById('test-setup').style.display = 'none';
  document.getElementById('result-area').style.display = 'none';
  document.getElementById('result-area').innerHTML = '';
  document.getElementById('quiz-area').style.display = 'block';
  renderQ();
  startTimer();
}

function renderQ() {
  const quiz = state.quiz;
  const q = quiz.qs[quiz.cur];
  setText('q-num', `Question ${quiz.cur + 1} of ${quiz.qs.length} — ${quiz.label}`);
  document.getElementById('q-prog-fill').style.width = `${(quiz.cur / quiz.qs.length) * 100}%`;
  setText('q-text', q.q);

  const optsEl = document.getElementById('q-options');
  optsEl.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="opt-key">${String.fromCharCode(65 + i)}</span><span>${escapeHtml(opt)}</span>`;
    btn.onclick = () => selectAnswer(i);
    optsEl.appendChild(btn);
  });

  const explainEl = document.getElementById('q-explain');
  explainEl.style.display = 'none';
  explainEl.textContent = '';

  const nextBtn = document.getElementById('btn-next');
  nextBtn.style.display = 'none';
  nextBtn.innerHTML = quiz.cur === quiz.qs.length - 1
    ? 'Finish'
    : 'Next<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="9 18 15 12 9 6"/></svg>';

  if (quiz.answers[quiz.cur] !== null) showAnswerState();
}

function selectAnswer(i) {
  const quiz = state.quiz;
  if (quiz.answers[quiz.cur] !== null) return;
  quiz.answers[quiz.cur] = i;
  const q = quiz.qs[quiz.cur];
  if (i === q.answer) quiz.score++;
  else addWrongToMB(q);
  showAnswerState();
}

function showAnswerState() {
  const quiz = state.quiz;
  const q = quiz.qs[quiz.cur];
  const sel = quiz.answers[quiz.cur];
  document.querySelectorAll('#q-options .option-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add('correct');
    else if (i === sel) btn.classList.add('wrong');
  });
  if (q.explanation) {
    const ex = document.getElementById('q-explain');
    ex.textContent = q.explanation;
    ex.style.display = 'block';
  }
  document.getElementById('btn-next').style.display = 'inline-flex';
}

function nextQ() {
  const quiz = state.quiz;
  if (quiz.cur < quiz.qs.length - 1) {
    quiz.cur++;
    renderQ();
  } else {
    endTest();
  }
}

function startTimer() {
  updateTimerDisplay();
  state.quiz.timer = setInterval(() => {
    state.quiz.timeLeft--;
    updateTimerDisplay();
    if (state.quiz.timeLeft <= 0) {
      clearInterval(state.quiz.timer);
      endTest();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const t = Math.max(0, state.quiz.timeLeft);
  const m = Math.floor(t / 60), s = t % 60;
  setText('timer-text', `${m}:${s.toString().padStart(2, '0')}`);
  document.getElementById('quiz-timer').classList.toggle('warn', t <= 60);
}

function endTest() {
  const quiz = state.quiz;
  if (quiz.timer) clearInterval(quiz.timer);
  document.getElementById('quiz-area').style.display = 'none';
  document.getElementById('test-setup').style.display = 'block';
  document.getElementById('result-area').style.display = 'block';

  const total = quiz.qs.length;
  const correct = quiz.score;
  const attempted = quiz.answers.filter(a => a !== null).length;
  const marks = correct * quiz.marksPerQ;
  const maxMarks = total * quiz.marksPerQ;
  const pct = Math.round((correct / total) * 100);

  const bySubj = {};
  quiz.qs.forEach((q, i) => {
    const s = q._subj || 'other';
    bySubj[s] = bySubj[s] || { correct: 0, total: 0 };
    bySubj[s].total++;
    if (quiz.answers[i] === q.answer) bySubj[s].correct++;
  });

  state.history.push({ date: new Date().toISOString().slice(0, 10), label: quiz.label, total, correct, marks, maxMarks, pct, bySubj });
  localStorage.setItem('pm_history', JSON.stringify(state.history));
  checkIn(true);

  let msg;
  if (pct >= 75) msg = 'Excellent work!';
  else if (pct >= 50) msg = 'Good effort — keep practicing!';
  else msg = 'Keep practicing — you will improve!';

  const circumference = 2 * Math.PI * 50;
  const offset = circumference * (1 - pct / 100);

  let reviewHtml = '';
  quiz.qs.forEach((q, i) => {
    const sel = quiz.answers[i];
    const isCorrect = sel === q.answer;
    reviewHtml += `<div class="review-item ${isCorrect ? 'c' : 'w'}">
      <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
        <div><strong>Q${i + 1}.</strong> ${escapeHtml(q.q)}</div>
        <button class="btn-icon report-btn" title="Report an issue with this question" onclick="openReportModal(${i})">${reportFlagIcon()}</button>
      </div>
      <span style="color:var(--text-muted)">Your answer: ${sel !== null ? String.fromCharCode(65 + sel) + '. ' + escapeHtml(q.options[sel]) : 'Not answered'}</span><br>
      ${!isCorrect ? `<span style="color:var(--success)">Correct: ${String.fromCharCode(65 + q.answer)}. ${escapeHtml(q.options[q.answer])}</span><br>` : ''}
      ${q.explanation ? `<span style="color:var(--text-muted)">${escapeHtml(q.explanation)}</span>` : ''}
    </div>`;
  });

  document.getElementById('result-area').innerHTML = `
    <div class="result-hero">
      <div class="score-ring-wrap">
        <svg width="110" height="110" viewBox="0 0 110 110">
          <circle class="ring-bg" cx="55" cy="55" r="50" stroke-width="8"/>
          <circle class="ring-fill" cx="55" cy="55" r="50" stroke-width="8" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"/>
        </svg>
        <div class="score-text"><span class="score-pct">${pct}%</span><span class="score-label">Score</span></div>
      </div>
      <div class="result-msg">${msg}</div>
      <div class="result-sub">${quiz.label}</div>
      <div class="result-stats">
        <div class="rs-chip"><div class="rs-num">${correct}/${total}</div><div class="rs-lbl">Correct</div></div>
        <div class="rs-chip"><div class="rs-num">${marks}/${maxMarks}</div><div class="rs-lbl">Marks</div></div>
        <div class="rs-chip"><div class="rs-num">${attempted}/${total}</div><div class="rs-lbl">Attempted</div></div>
      </div>
      <div style="margin-top:18px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
        <button class="btn btn-ghost btn-sm" onclick="navigateTo('mistakebook')">Open Mistake Book</button>
      </div>
    </div>
    <div class="card"><div class="card-title">Answer Review</div>${reviewHtml}</div>
  `;

  renderDashboard();
}

function addWrongToMB(q) {
  state.mistakes.unshift({
    topic: q.q.length > 70 ? q.q.slice(0, 70) + '...' : q.q,
    subject: q._subj || state.currentSubject,
    question: q.q,
    formula: q.options[q.answer],
    why: 'Selected wrong option during mock test',
    date: new Date().toISOString().slice(0, 10),
    auto: true,
  });
  localStorage.setItem('pm_mistakes', JSON.stringify(state.mistakes));
}

/* ============================================================
   VIDEO LIBRARY
   ============================================================ */
function renderPlaylistGrid(filter) {
  filter = filter || 'all';
  const grid = document.getElementById('playlist-grid');
  if (!grid) return;
  let html = '';
  Object.keys(subjects).forEach(key => {
    if (filter !== 'all' && filter !== key) return;
    const subj = subjects[key];
    subj.topics.forEach((t, i) => {
      const vKey = key + '_' + i;
      const watched = state.videoWatched.includes(vKey);
      html += `
        <div class="topic-card ${watched ? 'topic-done' : ''}">
          <div class="topic-card-top">
            <span class="topic-number">${subj.name}</span>
            <div class="topic-check ${watched ? 'checked' : ''}" onclick="toggleVideoWatched('${vKey}')" title="Mark as watched">
              ${watched ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
            </div>
          </div>
          <div class="topic-name">${t.name}</div>
          <div class="topic-tags">${t.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
          <div class="topic-actions">
            <button class="btn btn-primary btn-sm" onclick="watchTopic('${key}',${i})">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Watch — Postal Study
            </button>
            <button class="btn btn-ghost btn-sm" onclick="topicGoogle('${key}',${i})">Google</button>
          </div>
        </div>`;
    });
  });
  grid.innerHTML = html;
}

function filterLib(f) {
  document.querySelectorAll('.lib-filter').forEach(b => b.classList.toggle('active', b.dataset.f === f));
  renderPlaylistGrid(f);
}

/* ============================================================
   IN-SITE YOUTUBE PLAYER
   ============================================================ */
function playVideo(videoId, label) {
  navigateTo('playlists');
  const wrap = document.getElementById('video-player-wrap');
  const frame = document.getElementById('video-player-frame');
  wrap.dataset.videoId = videoId;
  frame.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0';
  setText('video-player-title', label || '');
  wrap.style.display = 'block';
  setTimeout(() => wrap.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
}

function closeVideoPlayer() {
  document.getElementById('video-player-frame').src = '';
  document.getElementById('video-player-wrap').style.display = 'none';
}

function openCurrentVideoInYT() {
  const id = document.getElementById('video-player-wrap').dataset.videoId;
  if (id) window.open('https://www.youtube.com/watch?v=' + id, '_blank');
}

function watchTopic(key, i) {
  const subj = subjects[key];
  const t = subj.topics[i];
  playVideo(subj.ytVideoId, t.name + ' — ' + subj.name);
}

function toggleVideoWatched(key) {
  const i = state.videoWatched.indexOf(key);
  if (i === -1) state.videoWatched.push(key); else state.videoWatched.splice(i, 1);
  localStorage.setItem('pm_video_watched', JSON.stringify(state.videoWatched));
  const active = document.querySelector('.lib-filter.active');
  renderPlaylistGrid(active ? active.dataset.f : 'all');
}

function guessSubjectFromQuery(q) {
  const s = q.toLowerCase();
  const mathHints = ['math', 'maths', 'reasoning', 'number', 'percentage', 'profit', 'loss', 'interest', 'ratio', 'average', 'speed', 'distance', 'mensuration', 'coding', 'series', 'simplification'];
  const gkHints = ['gk', 'history', 'geography', 'polity', 'constitution', 'science', 'sport', 'award', 'static', 'ethic', 'current affairs', 'general knowledge', 'book', 'author'];
  if (mathHints.some(h => s.includes(h))) return 'math';
  if (gkHints.some(h => s.includes(h))) return 'gk';
  return 'postal';
}

function watchSearchQuery() {
  const q = (document.getElementById('main-search-q').value || '').trim();
  if (!q) return;
  const key = guessSubjectFromQuery(q);
  playVideo(subjects[key].ytVideoId, q + ' — ' + subjects[key].name);
}

/* ============================================================
   EXAM INFO
   ============================================================ */
function renderExamSyllabus() {
  const el = document.getElementById('exam-syllabus');
  if (!el) return;
  let html = '';
  Object.keys(subjects).forEach(key => {
    const subj = subjects[key];
    html += `<div style="margin-bottom:14px">
      <div style="font-weight:700;font-size:13.5px;margin-bottom:6px;color:${subj.color}">${subj.name}</div>
      <div class="topic-tags">${subj.topics.map(t => `<span class="tag">${t.name}</span>`).join('')}</div>
    </div>`;
  });
  el.innerHTML = html;
}

/* ============================================================
   SEARCH
   ============================================================ */
function renderQuickChips() {
  const wrap = document.getElementById('quick-chips');
  if (!wrap) return;
  wrap.innerHTML = quickTopicsList.map(t => `<button class="quick-chip" onclick="doSearch('${t}')">${t}</button>`).join('');
}

function doSearch(q) {
  q = (q || '').trim();
  const input = document.getElementById('main-search-q');
  if (input) input.value = q;
  const results = document.getElementById('search-results');
  if (!results) return;
  if (!q) { results.innerHTML = ''; return; }
  results.innerHTML = `
    <div class="card">
      <div class="card-title">Results for "${q}"</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn btn-primary" onclick="searchGoogle('${q}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          Search on Google
        </button>
        <button class="btn btn-primary" onclick="watchSearchQuery()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Watch Here
        </button>
        <button class="btn btn-ghost" onclick="openYT('Postal Study ${q}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Search "Postal Study" on YouTube
        </button>
        <button class="btn btn-ghost" onclick="openYT('${q}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Search all of YouTube
        </button>
      </div>
    </div>`;
}

function searchGoogle(q) {
  window.open('https://www.google.com/search?q=' + encodeURIComponent(q), '_blank');
}
function openYT(q) {
  window.open('https://www.youtube.com/results?search_query=' + encodeURIComponent(q), '_blank');
}

/* ============================================================
   MISTAKE BOOK
   ============================================================ */
let mbFilter = 'all';

function addMistake() {
  const topic = document.getElementById('mb-topic').value.trim();
  const subject = document.getElementById('mb-subj').value;
  const question = document.getElementById('mb-question').value.trim();
  const formula = document.getElementById('mb-formula').value.trim();
  const why = document.getElementById('mb-why').value.trim();
  if (!topic || !question) {
    showToast('Please fill in Topic and Question fields.', 'err');
    return;
  }
  state.mistakes.unshift({ topic, subject, question, formula, why, date: new Date().toISOString().slice(0, 10), auto: false });
  localStorage.setItem('pm_mistakes', JSON.stringify(state.mistakes));
  ['mb-topic', 'mb-question', 'mb-formula', 'mb-why'].forEach(id => document.getElementById(id).value = '');
  renderMistakeBook();
  renderDashboard();
  showToast('Saved to Mistake Book.', 'ok');
}

function filterMB(f) {
  mbFilter = f;
  document.querySelectorAll('.mb-filter').forEach(b => b.classList.toggle('active', b.dataset.f === f));
  renderMistakeBook();
}

function renderMistakeBook() {
  const list = document.getElementById('mb-list');
  const countEl = document.getElementById('mb-count');
  if (!list) return;
  const items = state.mistakes.filter(m => mbFilter === 'all' || m.subject === mbFilter);
  countEl.textContent = `${items.length} entries`;

  if (!items.length) {
    list.innerHTML = `<div class="empty-state">
      <div class="empty-state-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/></svg></div>
      <h4>No mistakes logged</h4><p>Wrong answers from mock tests appear here automatically, or add your own above.</p>
    </div>`;
    return;
  }

  list.innerHTML = items.map(m => {
    const realIdx = state.mistakes.indexOf(m);
    const subjName = subjects[m.subject] ? subjects[m.subject].name : m.subject;
    return `<div class="review-item w">
      <div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start">
        <strong>${m.topic}</strong>
        <button class="btn btn-ghost btn-sm" onclick="deleteMistake(${realIdx})">Remove</button>
      </div>
      <div style="margin:4px 0;color:var(--text-muted)">${m.question}</div>
      ${m.formula ? `<div><strong>Correct answer:</strong> ${m.formula}</div>` : ''}
      ${m.why ? `<div style="color:var(--text-muted)">Why: ${m.why}</div>` : ''}
      <div style="font-size:11px;color:var(--text-light);margin-top:4px">${subjName} · ${m.date}</div>
    </div>`;
  }).join('');
}

function deleteMistake(idx) {
  state.mistakes.splice(idx, 1);
  localStorage.setItem('pm_mistakes', JSON.stringify(state.mistakes));
  renderMistakeBook();
  renderDashboard();
}

/* ============================================================
   QUESTION OVERRIDES (fixes applied from reports)
   ============================================================ */
function getQ(subj, idx) {
  const base = questionsDB[subj][idx];
  const ov = state.overrides[subj + '_' + idx];
  return ov ? Object.assign({}, base, ov) : base;
}

function getSubjectQuestions(subj) {
  return (questionsDB[subj] || []).map((q, i) => Object.assign({}, getQ(subj, i), { _subj: subj, _idx: i }));
}

/* ============================================================
   MODAL HELPERS
   ============================================================ */
function showModal(html) {
  document.getElementById('modal-box').innerHTML = html;
  document.getElementById('modal-overlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.getElementById('modal-box').innerHTML = '';
}

function closeModalOnOverlay(e) {
  if (e.target.id === 'modal-overlay') closeModal();
}

function reportFlagIcon() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 22V4a1 1 0 011-1h13l-2 4 2 4H6a1 1 0 00-1 1v14"/></svg>';
}

function closeIcon() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
}

/* ============================================================
   QUESTION REPORTS & FIXES
   ============================================================ */
function openReportModal(qIdx) {
  const quiz = state.quiz;
  if (!quiz) return;
  const q = quiz.qs[qIdx];
  showModal(`
    <div class="modal-header"><h3>Report a Question Issue</h3><button class="btn-icon" onclick="closeModal()">${closeIcon()}</button></div>
    <div class="modal-body">
      <div class="report-q-preview">${escapeHtml(q.q)}</div>
      <div class="form-group">
        <label>What's wrong with this question?</label>
        <select id="report-type">
          <option value="wrong_answer">The marked correct answer is wrong</option>
          <option value="typo">Typo or unclear wording</option>
          <option value="bad_options">Options are incorrect / duplicated</option>
          <option value="other">Other issue</option>
        </select>
      </div>
      <div class="form-group">
        <label>Details (optional)</label>
        <textarea id="report-comment" placeholder="Describe what's wrong, e.g. the correct answer should be option C..."></textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="submitReport(${qIdx})">${reportFlagIcon()}Submit Report</button>
    </div>
  `);
}

function submitReport(qIdx) {
  const quiz = state.quiz;
  const q = quiz.qs[qIdx];
  const type = document.getElementById('report-type').value;
  const comment = document.getElementById('report-comment').value.trim();
  state.reports.unshift({
    id: Date.now(),
    subj: q._subj, idx: q._idx,
    question: q.q, options: q.options.slice(), answer: q.answer, explanation: q.explanation || '',
    type, comment, date: new Date().toISOString().slice(0, 10), status: 'open',
  });
  localStorage.setItem('pm_reports', JSON.stringify(state.reports));
  closeModal();
  renderReports();
  showToast('Thanks — report saved. Fix it any time from Question Reports.', 'ok');
}

const reportTypeLabels = {
  wrong_answer: 'Wrong answer key', typo: 'Typo / unclear wording',
  bad_options: 'Options incorrect', other: 'Other issue',
};

function filterReports(f) {
  state.reportFilter = f;
  document.querySelectorAll('.report-filter').forEach(b => b.classList.toggle('active', b.dataset.f === f));
  renderReports();
}

function renderReports() {
  const list = document.getElementById('reports-list');
  const countEl = document.getElementById('reports-count');
  if (!list) return;
  const items = state.reports.filter(r => state.reportFilter === 'all' || r.status === state.reportFilter);
  if (countEl) countEl.textContent = `${items.length} ${items.length === 1 ? 'entry' : 'entries'}`;

  if (!items.length) {
    list.innerHTML = `<div class="empty-state">
      <div class="empty-state-icon">${reportFlagIcon()}</div>
      <h4>No reports ${state.reportFilter === 'all' ? 'yet' : 'in this filter'}</h4>
      <p>Spot a wrong answer, typo or unclear question during a mock test? Tap the flag icon on any question to report it — then fix it right here.</p>
    </div>`;
    return;
  }

  list.innerHTML = items.map(r => {
    const realIdx = state.reports.indexOf(r);
    const subjName = subjects[r.subj] ? subjects[r.subj].name : r.subj;
    const overridden = !!state.overrides[r.subj + '_' + r.idx];
    return `<div class="review-item ${r.status === 'fixed' ? 'c' : 'w'}">
      <div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start">
        <strong>${escapeHtml(r.question)}</strong>
        <span class="report-status ${r.status}">${r.status === 'fixed' ? 'Fixed' : 'Open'}</span>
      </div>
      <div style="margin:4px 0;color:var(--text-muted)">Issue: ${reportTypeLabels[r.type] || r.type}${r.comment ? ' — ' + escapeHtml(r.comment) : ''}</div>
      <div style="font-size:11px;color:var(--text-light);margin-bottom:8px">${subjName} · ${r.date}${overridden ? ' · Question already updated' : ''}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <button class="btn btn-primary btn-sm" onclick="openFixModal(${realIdx})">${r.status === 'fixed' ? 'Edit Fix' : 'Fix Question'}</button>
        <button class="btn btn-ghost btn-sm" onclick="dismissReport(${realIdx})">Dismiss</button>
      </div>
    </div>`;
  }).join('');
}

function dismissReport(idx) {
  state.reports.splice(idx, 1);
  localStorage.setItem('pm_reports', JSON.stringify(state.reports));
  renderReports();
}

function openFixModal(reportIdx) {
  const r = state.reports[reportIdx];
  const current = getQ(r.subj, r.idx);
  showModal(`
    <div class="modal-header"><h3>Fix Question</h3><button class="btn-icon" onclick="closeModal()">${closeIcon()}</button></div>
    <div class="modal-body">
      <div class="form-group"><label>Question</label><textarea id="fix-q">${escapeHtml(current.q)}</textarea></div>
      <div class="form-group">
        <label>Options — select the correct one</label>
        ${current.options.map((opt, i) => `
          <div class="fix-option-row">
            <input type="radio" name="fix-answer" value="${i}" ${current.answer === i ? 'checked' : ''} title="Mark as correct answer">
            <input type="text" class="fix-option" value="${escapeHtml(opt)}">
          </div>`).join('')}
        <div style="font-size:11.5px;color:var(--text-muted);margin-top:4px">Select the radio button next to the correct option.</div>
      </div>
      <div class="form-group"><label>Explanation</label><textarea id="fix-explanation">${escapeHtml(current.explanation || '')}</textarea></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveFix(${reportIdx})">Save Fix</button>
    </div>
  `);
}

function saveFix(reportIdx) {
  const r = state.reports[reportIdx];
  const q = document.getElementById('fix-q').value.trim();
  const explanation = document.getElementById('fix-explanation').value.trim();
  const options = Array.from(document.querySelectorAll('.fix-option')).map(inp => inp.value.trim());
  const answerInput = document.querySelector('input[name="fix-answer"]:checked');
  if (!q || options.some(o => !o) || !answerInput) {
    showToast('Please fill in the question, all options and select the correct answer.', 'err');
    return;
  }
  state.overrides[r.subj + '_' + r.idx] = { q, options, answer: parseInt(answerInput.value, 10), explanation };
  localStorage.setItem('pm_overrides', JSON.stringify(state.overrides));
  r.status = 'fixed';
  localStorage.setItem('pm_reports', JSON.stringify(state.reports));
  closeModal();
  renderReports();
  showToast('Question updated — the corrected version will be used from now on.', 'ok');
}

/* ============================================================
   PDF STUDY LIBRARY
   ============================================================ */
function renderLibrary() {
  const grid = document.getElementById('library-categories');
  if (!grid) return;
  grid.innerHTML = pdfLibrary.map(cat => {
    const subj = subjects[cat.subject];
    const readCount = cat.files.filter((f, i) => state.pdfRead.includes(cat.id + '_' + i)).length;
    const pct = Math.round((readCount / cat.files.length) * 100);
    return `<div class="lib-cat-card" onclick="openLibCategory('${cat.id}')">
      <div class="lib-cat-icon" style="background:${subj.color}1a;color:${subj.color}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${libCatIcons[cat.icon] || libCatIcons.book}</svg>
      </div>
      <div class="lib-cat-name">${cat.name}</div>
      <div class="lib-cat-desc">${cat.desc}</div>
      <div class="lib-cat-foot">
        <span class="tag" style="border-color:${subj.color}55;color:${subj.color}">${subj.name}</span>
        <span style="font-size:11.5px;color:var(--text-muted)">${cat.files.length} PDFs</span>
      </div>
      <div class="subj-prog-wrap" style="margin-top:10px"><div class="subj-prog-fill" style="width:${pct}%;background:${subj.color}"></div></div>
      <div style="font-size:11px;color:var(--text-light);margin-top:4px">${readCount}/${cat.files.length} read</div>
    </div>`;
  }).join('');
}

function renderLibFilesList(catId) {
  const cat = pdfLibrary.find(c => c.id === catId);
  document.getElementById('library-files-title').textContent = cat.name;
  document.getElementById('library-files-list').innerHTML = cat.files.map((f, i) => {
    const key = catId + '_' + i;
    const read = state.pdfRead.includes(key);
    return `<div class="topic-card ${read ? 'topic-done' : ''}">
      <div class="topic-card-top">
        <span class="topic-number">${cat.name}</span>
        <div class="topic-check ${read ? 'checked' : ''}" onclick="togglePdfRead('${key}')" title="Mark as read">
          ${read ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
        </div>
      </div>
      <div class="topic-name">${f.name}</div>
      <div class="topic-actions">
        <button class="btn btn-primary btn-sm" onclick="openPdf('${catId}',${i})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>
          Read
        </button>
        <a class="btn btn-ghost btn-sm" href="${encodeURI(f.path)}" target="_blank" rel="noopener">Open in New Tab</a>
      </div>
    </div>`;
  }).join('');
}

function openLibCategory(catId) {
  state.libCategory = catId;
  document.getElementById('library-categories').style.display = 'none';
  document.getElementById('library-viewer').style.display = 'none';
  document.getElementById('library-files').style.display = 'block';
  renderLibFilesList(catId);
}

function backToLibCategories() {
  state.libCategory = null;
  document.getElementById('library-files').style.display = 'none';
  document.getElementById('library-viewer').style.display = 'none';
  document.getElementById('library-categories').style.display = 'grid';
}

function openPdf(catId, fileIdx) {
  const cat = pdfLibrary.find(c => c.id === catId);
  const file = cat.files[fileIdx];
  document.getElementById('library-files').style.display = 'none';
  document.getElementById('library-viewer').style.display = 'block';
  document.getElementById('library-viewer-title').textContent = file.name;
  document.getElementById('library-viewer-frame').src = encodeURI(file.path);
  const btn = document.getElementById('library-mark-read-btn');
  btn.dataset.key = catId + '_' + fileIdx;
  updateMarkReadBtn();
}

function backToLibFiles() {
  document.getElementById('library-viewer-frame').src = '';
  document.getElementById('library-viewer').style.display = 'none';
  document.getElementById('library-files').style.display = 'block';
}

function updateMarkReadBtn() {
  const btn = document.getElementById('library-mark-read-btn');
  const read = state.pdfRead.includes(btn.dataset.key);
  btn.innerHTML = read
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg> Marked as Read'
    : 'Mark as Read';
  btn.classList.toggle('btn-success', read);
  btn.classList.toggle('btn-ghost', !read);
}

function toggleViewerRead() {
  togglePdfRead(document.getElementById('library-mark-read-btn').dataset.key);
  updateMarkReadBtn();
}

function togglePdfRead(key) {
  const i = state.pdfRead.indexOf(key);
  if (i === -1) state.pdfRead.push(key); else state.pdfRead.splice(i, 1);
  localStorage.setItem('pm_pdf_read', JSON.stringify(state.pdfRead));
  renderLibrary();
  if (state.libCategory) renderLibFilesList(state.libCategory);
  renderDashboard();
}

function startPdfExam() {
  const catId = state.libCategory;
  const map = pdfExamMap[catId];
  if (!map) {
    showToast('No exam questions are mapped for this PDF category yet.', 'err');
    return;
  }
  const total = getSubjectQuestions(map.subj).slice(map.start, map.end + 1).length;
  if (!total) {
    showToast('No questions available for this PDF.', 'err');
    return;
  }

  const steps = [10, 20, 30, 50, 100].filter(n => n < total);
  const countOpts = steps.map(n =>
    `<option value="${n}" ${n === Math.min(20, total) ? 'selected' : ''}>${n} Questions</option>`
  ).join('') + `<option value="${total}" ${total <= 20 ? 'selected' : ''}>All — ${total} Questions</option>`;

  showModal(`
    <div class="modal-header">
      <h3>PDF Exam Setup</h3>
      <button class="btn-icon" onclick="closeModal()">${closeIcon()}</button>
    </div>
    <div class="modal-body">
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px">
        <strong>${map.label.replace(' Exam', '')}</strong><br>
        <span style="font-size:12px">${total} questions available — mix is shuffled randomly each time</span>
      </p>
      <div style="display:grid;gap:12px">
        <div class="setup-field">
          <label>How many questions?</label>
          <select id="pdf-exam-count">${countOpts}</select>
        </div>
        <div class="setup-field">
          <label>Time Limit</label>
          <select id="pdf-exam-time">
            <option value="10">10 Minutes</option>
            <option value="20" selected>20 Minutes</option>
            <option value="30">30 Minutes</option>
            <option value="60">60 Minutes</option>
            <option value="90">90 Minutes</option>
          </select>
        </div>
      </div>
      <p style="font-size:11.5px;color:var(--text-muted);margin-top:12px">No negative marking. Wrong answers are saved to your Mistake Book.</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="beginPdfExam()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        Start Exam
      </button>
    </div>
  `);
}

function beginPdfExam() {
  const catId = state.libCategory;
  const map = pdfExamMap[catId];
  const count = parseInt(document.getElementById('pdf-exam-count').value, 10);
  const mins = parseInt(document.getElementById('pdf-exam-time').value, 10);
  const pool = shuffle(getSubjectQuestions(map.subj).slice(map.start, map.end + 1)).slice(0, count);
  closeModal();
  navigateTo('mocktest');
  beginQuiz(pool, mins * 60, 2, map.label);
}

/* ============================================================
   MOTIVATION & BADGES
   ============================================================ */
function renderMotivation() {
  setText('motivation-quote', getTodayQuote());
  const wrap = document.getElementById('badge-row');
  if (!wrap) return;
  wrap.innerHTML = badgeDefs.map(b => {
    const earned = b.earned();
    return `<div class="badge-chip ${earned ? 'earned' : ''}" title="${b.desc}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${badgeIcons[b.icon]}</svg>
      <span>${b.name}</span>
    </div>`;
  }).join('');
}

/* ============================================================
   PERFORMANCE ANALYTICS CHARTS
   ============================================================ */
function emptyChartMsg(msg) {
  return `<div class="chart-empty">${msg}</div>`;
}

function renderScoreTrendChart() {
  const el = document.getElementById('chart-trend');
  if (!el) return;
  const data = state.history.slice(-10);
  if (!data.length) {
    el.innerHTML = emptyChartMsg('Take a mock test to start tracking your score trend here.');
    return;
  }
  const W = 300, H = 130, pad = 22;
  const stepX = data.length > 1 ? (W - pad * 2) / (data.length - 1) : 0;
  const points = data.map((h, i) => {
    const x = pad + stepX * i;
    const y = H - pad - (h.pct / 100) * (H - pad * 2);
    return [x, y, h.pct];
  });
  const polyline = points.map(p => `${p[0]},${p[1]}`).join(' ');
  const gridLines = [0, 25, 50, 75, 100].map(v => {
    const y = H - pad - (v / 100) * (H - pad * 2);
    return `<line x1="${pad}" y1="${y}" x2="${W - pad}" y2="${y}" class="chart-grid"/><text x="0" y="${y + 3}" class="chart-axis-label">${v}</text>`;
  }).join('');
  const dots = points.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="3.5" class="chart-dot"><title>${p[2]}%</title></circle>`).join('');
  el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" class="trend-svg" preserveAspectRatio="none">
    ${gridLines}
    <polyline points="${polyline}" class="chart-line"/>
    ${dots}
  </svg>
  <div class="chart-caption">Last ${data.length} mock test${data.length === 1 ? '' : 's'} — score %</div>`;
}

function renderSubjectAccuracyChart() {
  const el = document.getElementById('chart-accuracy');
  if (!el) return;
  const totals = {};
  state.history.forEach(h => {
    if (!h.bySubj) return;
    Object.keys(h.bySubj).forEach(s => {
      totals[s] = totals[s] || { correct: 0, total: 0 };
      totals[s].correct += h.bySubj[s].correct;
      totals[s].total += h.bySubj[s].total;
    });
  });
  const keys = Object.keys(subjects).filter(k => totals[k] && totals[k].total > 0);
  if (!keys.length) {
    el.innerHTML = emptyChartMsg('Subject-wise accuracy will appear here after your mock tests.');
    return;
  }
  el.innerHTML = keys.map(k => {
    const t = totals[k];
    const pct = Math.round((t.correct / t.total) * 100);
    return `<div class="acc-bar-row">
      <span class="acc-bar-label">${subjects[k].name}</span>
      <div class="sb-track"><div class="sb-fill" style="width:${pct}%;background:${subjects[k].color}"></div></div>
      <span class="acc-bar-pct">${pct}%</span>
    </div>`;
  }).join('');
}

function renderOverallDonut() {
  const el = document.getElementById('chart-donut');
  if (!el) return;
  const totalQ = state.history.reduce((s, h) => s + h.total, 0);
  const totalCorrect = state.history.reduce((s, h) => s + h.correct, 0);
  if (!totalQ) {
    el.innerHTML = emptyChartMsg('Your overall accuracy will be shown here.');
    return;
  }
  const pct = Math.round((totalCorrect / totalQ) * 100);
  const circumference = 2 * Math.PI * 36;
  const offset = circumference * (1 - pct / 100);
  el.innerHTML = `
    <div class="ring-container" style="width:90px;height:90px">
      <svg width="90" height="90" viewBox="0 0 90 90">
        <circle class="ring-bg" cx="45" cy="45" r="36" stroke-width="8"/>
        <circle class="ring-fill" cx="45" cy="45" r="36" stroke-width="8" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"/>
      </svg>
      <div class="ring-text"><span class="ring-pct">${pct}%</span><span class="ring-sub">overall</span></div>
    </div>
    <div class="chart-caption">${totalCorrect}/${totalQ} correct across ${state.history.length} test${state.history.length === 1 ? '' : 's'}</div>`;
}

function renderAnalyticsCharts() {
  renderScoreTrendChart();
  renderSubjectAccuracyChart();
  renderOverallDonut();
}

/* ============================================================
   UTILITIES
   ============================================================ */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function showToast(msg, type) {
  const toast = document.createElement('div');
  toast.className = `toast ${type === 'err' ? 'err' : 'ok'}`;
  toast.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${type === 'err' ? '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>' : '<polyline points="20 6 9 17 4 12"/>'}</svg><span>${msg}</span>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
