// Local storage shim — paste this at the top of App.jsx
window.storage = {
  get: async (key) => {
    const value = localStorage.getItem(key);
    return value ? { key, value } : null;
  },
  set: async (key, value) => {
    localStorage.setItem(key, value);
    return { key, value };
  },
};

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = 'dsa_tracker_v2';

const defaultState = {
  streak: { count: 0, lastDate: null },
  problems: [],
  mistakes: [],
  wins: [],
  dailyChecks: { date: null, blocks: [false, false, false, false] }
};

const TOPICS = [
  { id: 'arrays', name: 'Arrays & Strings', stage: 1, target: 8 },
  { id: 'hashmaps', name: 'Hash Maps & Sets', stage: 1, target: 8 },
  { id: 'twopointers', name: 'Two Pointers', stage: 1, target: 8 },
  { id: 'sliding', name: 'Sliding Window', stage: 1, target: 8 },
  { id: 'stack', name: 'Stack & Queue', stage: 2, target: 10 },
  { id: 'linkedlist', name: 'Linked Lists', stage: 2, target: 10 },
  { id: 'binarysearch', name: 'Binary Search', stage: 2, target: 8 },
  { id: 'trees', name: 'Binary Trees (DFS/BFS)', stage: 3, target: 12 },
  { id: 'bst', name: 'Binary Search Trees', stage: 3, target: 8 },
  { id: 'graphs', name: 'Graphs (BFS/DFS/Topo)', stage: 3, target: 12 },
  { id: 'heap', name: 'Heap / Priority Queue', stage: 4, target: 8 },
  { id: 'dp', name: 'Dynamic Programming', stage: 4, target: 12 },
  { id: 'backtracking', name: 'Backtracking', stage: 4, target: 8 },
];

const PATTERNS = [
  'Hash Map', 'Two Pointers', 'Sliding Window', 'BFS', 'DFS',
  'Binary Search', 'Stack', 'Monotonic Stack', 'DP 1D', 'DP 2D',
  'Backtracking', 'Linked List', 'Heap', 'Graph', 'Tree Recursion', 'Prefix Sum'
];

const DAILY_BLOCKS = [
  { title: 'Block 1', sub: 'Warm-up Retrieval', time: '10 min', color: '#F5A623', desc: 'Re-solve one problem from 2–3 days ago. From scratch, no hints, no looking at previous solution. Cannot skip.' },
  { title: 'Block 2', sub: 'Active Problem Solving', time: '40–50 min', color: '#3B82F6', desc: 'One new problem. Read → Restate → Brute Force → Optimize. 25 min then use stuck protocol.' },
  { title: 'Block 3', sub: 'Solution Study', time: '15–20 min', color: '#8B5CF6', desc: 'Watch NeetCode video AFTER your attempt. Answer: What pattern? What key insight? What triggers it?' },
  { title: 'Block 4', sub: 'Re-code from Scratch', time: '10 min', color: '#10B981', desc: 'Close everything. Write optimal solution from memory. Do not look at your previous code. Non-negotiable.' },
];

const STAGES = [
  { stage: 1, label: 'Stage 1 — Fundamentals', weeks: 'Week 1–2', color: '#F5A623' },
  { stage: 2, label: 'Stage 2 — Linear Structures', weeks: 'Week 3–4', color: '#10B981' },
  { stage: 3, label: 'Stage 3 — Trees & Graphs', weeks: 'Week 5–6', color: '#3B82F6' },
  { stage: 4, label: 'Stage 4 — Advanced Patterns', weeks: 'Week 7–8', color: '#8B5CF6' },
];

const MILESTONES = [
  { week: '2 Weeks', color: '#F5A623', items: ['12–14 sessions with no skip', 'Zero copy-paste, zero ChatGPT', '8+ problems re-solved clean', 'Mistake log populated', 'Arrays + HashMaps + 2-Pointers done'] },
  { week: '4 Weeks', color: '#10B981', items: ['Recognize pattern in 2–3 min', '25–30 problems properly logged', 'Most Easys without any hints', 'Errors becoming specific, not vague', 'Sliding Window + Stack started'] },
  { week: '8 Weeks', color: '#3B82F6', items: ['40–50% Mediums solved independently', 'All Stage 1–3 patterns covered', '60–70 problems in log', 'Can solve on 35-min timer', 'Think out loud clearly while coding'] },
];

export default function DSATracker() {
  const [state, setState] = useState(null);
  const [tab, setTab] = useState('today');
  const [showProblemModal, setShowProblemModal] = useState(false);
  const [showMistakeModal, setShowMistakeModal] = useState(false);
  const [prob, setProb] = useState({ name: '', difficulty: 'Easy', pattern: '', topic: '', independent: false, stuck: '', insight: '' });
  const [mist, setMist] = useState({ pattern: '', desc: '' });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const today = new Date().toISOString().split('T')[0];

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const r = await window.storage.get(STORAGE_KEY);
        setState(r ? JSON.parse(r.value) : defaultState);
      } catch { setState(defaultState); }
      setLoading(false);
    };
    load();
  }, []);

  const save = useCallback(async (s) => {
    setState(s);
    try { await window.storage.set(STORAGE_KEY, JSON.stringify(s)); }
    catch (e) { console.error(e); }
  }, []);

  const toggleBlock = (idx) => {
    let s = { ...state };
    const checks = s.dailyChecks.date === today ? [...s.dailyChecks.blocks] : [false, false, false, false];
    checks[idx] = !checks[idx];
    s.dailyChecks = { date: today, blocks: checks };
    if (checks.every(Boolean)) {
      const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
      const yd = yesterday.toISOString().split('T')[0];
      const newCount = s.streak.lastDate === yd ? s.streak.count + 1 : s.streak.lastDate === today ? s.streak.count : 1;
      s.streak = { count: newCount, lastDate: today };
      showToast(`🔥 Session complete! Streak: ${newCount} days`);
    }
    save(s);
  };

  const addProblem = () => {
    if (!prob.name.trim()) return;
    const d2 = new Date(); d2.setDate(d2.getDate() + 2);
    const p = { id: Date.now(), ...prob, firstSolvedDate: today, nextReview: d2.toISOString().split('T')[0], reviewCount: 0, failCount: 0, isRedFlag: false, reviewHistory: [] };
    const newState = { ...state, problems: [p, ...state.problems] };
    if (prob.independent) newState.wins = [{ id: Date.now(), name: prob.name, date: today, pattern: prob.pattern }, ...state.wins];
    save(newState);
    setProb({ name: '', difficulty: 'Easy', pattern: '', topic: '', independent: false, stuck: '', insight: '' });
    setShowProblemModal(false);
    showToast(prob.independent ? '🎯 Win logged!' : '✓ Problem logged');
  };

  const markReview = (id, success) => {
    const days = success ? 7 : 2;
    const nd = new Date(); nd.setDate(nd.getDate() + days);
    const problems = state.problems.map(p => {
      if (p.id !== id) return p;
      const fc = p.failCount + (success ? 0 : 1);
      return { ...p, nextReview: nd.toISOString().split('T')[0], reviewCount: p.reviewCount + 1, failCount: fc, isRedFlag: fc >= 2, reviewHistory: [...p.reviewHistory, { date: today, success }] };
    });
    save({ ...state, problems });
    showToast(success ? '✓ Review passed → next in 7 days' : '↩ Review failed → retry in 2 days', success ? 'success' : 'error');
  };

  const addMistake = () => {
    if (!mist.pattern.trim()) return;
    const ex = state.mistakes.find(m => m.pattern.toLowerCase() === mist.pattern.toLowerCase());
    const mistakes = ex
      ? state.mistakes.map(m => m.id === ex.id ? { ...m, count: m.count + 1, lastSeen: today, desc: mist.desc || m.desc } : m)
      : [{ id: Date.now(), pattern: mist.pattern, desc: mist.desc, count: 1, lastSeen: today }, ...state.mistakes];
    save({ ...state, mistakes });
    setMist({ pattern: '', desc: '' });
    setShowMistakeModal(false);
    showToast('Mistake pattern logged');
  };

  if (loading || !state) return (
    <div style={{ background: '#080B0F', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F5A623', fontFamily: 'monospace', fontSize: 13 }}>
      initializing...
    </div>
  );

  const checks = state.dailyChecks.date === today ? state.dailyChecks.blocks : [false, false, false, false];
  const dueReviews = state.problems.filter(p => p.nextReview <= today);
  const redFlags = state.problems.filter(p => p.isRedFlag);
  const topicCounts = {};
  state.problems.forEach(p => { if (p.topic) topicCounts[p.topic] = (topicCounts[p.topic] || 0) + 1; });
  const sessionPct = Math.round((checks.filter(Boolean).length / 4) * 100);

  const TABS = [
    { id: 'today', label: 'TODAY' },
    { id: 'problems', label: 'PROBLEMS', badge: dueReviews.length },
    { id: 'topics', label: 'ROADMAP' },
    { id: 'mistakes', label: 'MISTAKES', badge: redFlags.length, badgeColor: '#EF4444' },
    { id: 'wins', label: 'WINS' },
  ];

  return (
    <div style={{ background: '#080B0F', minHeight: '100vh', color: '#D4D4D8', fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#080B0F}::-webkit-scrollbar-thumb{background:#1E2530;border-radius:2px}
        .card{background:#0E1117;border:1px solid #1A2030;padding:16px}
        .card-hover:hover{border-color:#2A3545;background:#111520}
        .btn{border:none;cursor:pointer;font-family:'JetBrains Mono',monospace;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;transition:all 0.15s}
        .btn-primary{background:#F5A623;color:#080B0F;padding:9px 18px;font-size:11px}
        .btn-primary:hover{background:#FFB84D}
        .btn-ghost{background:transparent;color:#555;border:1px solid #1E2530;padding:7px 14px;font-size:11px}
        .btn-ghost:hover{border-color:#F5A623;color:#F5A623}
        .btn-sm{padding:5px 10px;font-size:10px}
        .btn-ok{background:#10B98120;color:#10B981;border:1px solid #10B98140}
        .btn-ok:hover{background:#10B98130}
        .btn-fail{background:#EF444420;color:#EF4444;border:1px solid #EF444440}
        .btn-fail:hover{background:#EF444430}
        input,select,textarea{background:#0A0D12;border:1px solid #1E2530;color:#D4D4D8;padding:9px 12px;font-family:'JetBrains Mono',monospace;font-size:12px;width:100%;outline:none;transition:border-color 0.2s;resize:none}
        input:focus,select:focus,textarea:focus{border-color:#F5A623}
        select option{background:#0E1117}
        .tab{background:none;border:none;cursor:pointer;padding:10px 16px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;transition:all 0.2s;border-bottom:2px solid transparent}
        .tab.on{color:#F5A623;border-bottom-color:#F5A623}
        .tab.off{color:#3A4555}
        .tab.off:hover{color:#7A8595}
        .chk{width:22px;height:22px;border:2px solid #2A3545;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.2s}
        .chk.done{border-color:#F5A623;background:#F5A623}
        .badge{padding:2px 7px;font-size:9px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase}
        .easy{background:#10B98115;color:#10B981}
        .medium{background:#F59E0B15;color:#F59E0B}
        .hard{background:#EF444415;color:#EF4444}
        .pbar{height:3px;background:#1A2030}
        .pfill{height:100%;transition:width 0.6s ease}
        .row:hover{background:#0D1018}
        .modal-bg{position:fixed;inset:0;background:rgba(0,0,0,0.88);display:flex;align-items:center;justify-content:center;z-index:100;padding:16px}
        .modal{background:#0E1117;border:1px solid #1E2530;padding:24px;width:100%;max-width:500px;max-height:90vh;overflow-y:auto}
        .label{font-size:10px;color:#3A4555;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:5px}
        .num{font-family:'Space Grotesk',sans-serif;font-weight:800;line-height:1}
        .toast{position:fixed;bottom:24px;right:24px;padding:10px 18px;font-size:11px;font-family:'JetBrains Mono',monospace;letter-spacing:0.08em;z-index:200;border:1px solid;animation:fadeUp 0.3s ease}
        .toast-s{background:#10B98115;border-color:#10B981;color:#10B981}
        .toast-e{background:#EF444415;border-color:#EF4444;color:#EF4444}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .slide-in{animation:fadeUp 0.25s ease}
        .seg{height:2px;background:#F5A623;transition:width 0.4s ease}
      `}</style>

      {/* Toast */}
      {toast && <div className={`toast ${toast.type === 'error' ? 'toast-e' : 'toast-s'}`}>{toast.msg}</div>}

      {/* Header */}
      <div style={{ borderBottom: '1px solid #12181F', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#080B0F', zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 800, color: '#F5A623', letterSpacing: '-0.03em' }}>DSA.exe</div>
          <div style={{ width: 1, height: 14, background: '#1E2530' }} />
          <div style={{ fontSize: 10, color: '#2E3A4A', letterSpacing: '0.15em' }}>PROBLEM SOLVER TRACKER</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {dueReviews.length > 0 && (
            <div style={{ fontSize: 10, color: '#3B82F6', background: '#3B82F610', border: '1px solid #3B82F630', padding: '4px 10px', letterSpacing: '0.08em' }}>
              {dueReviews.length} REVIEW{dueReviews.length > 1 ? 'S' : ''} DUE
            </div>
          )}
          <div>
            <div style={{ fontSize: 9, color: '#2E3A4A', letterSpacing: '0.15em', textAlign: 'right' }}>STREAK</div>
            <div className="num" style={{ fontSize: 22, color: '#F5A623' }}>{state.streak.count} 🔥</div>
          </div>
        </div>
      </div>

      {/* Session progress bar */}
      <div style={{ height: 2, background: '#12181F' }}>
        <div className="seg" style={{ width: `${sessionPct}%` }} />
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid #12181F', padding: '0 20px', display: 'flex', overflowX: 'auto' }}>
        {TABS.map(({ id, label, badge, badgeColor = '#3B82F6' }) => (
          <button key={id} className={`tab ${tab === id ? 'on' : 'off'}`} onClick={() => setTab(id)}>
            {label}
            {badge > 0 && <span style={{ marginLeft: 5, background: badgeColor, color: 'white', borderRadius: 10, padding: '0 5px', fontSize: 9 }}>{badge}</span>}
          </button>
        ))}
      </div>

      <div style={{ padding: '20px', maxWidth: 860, margin: '0 auto' }}>

        {/* ─── TODAY ─── */}
        {tab === 'today' && (
          <div className="slide-in">
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
              {[
                { label: 'Day Streak', val: state.streak.count, color: '#F5A623' },
                { label: 'Total Logged', val: state.problems.length, color: '#D4D4D8' },
                { label: 'Solo Solves', val: state.wins.length, color: '#10B981' },
                { label: 'Red Flags', val: redFlags.length, color: redFlags.length > 0 ? '#EF4444' : '#D4D4D8' },
              ].map(({ label, val, color }) => (
                <div key={label} className="card" style={{ textAlign: 'center', padding: '14px 10px' }}>
                  <div className="num" style={{ fontSize: 30, color }}>{val}</div>
                  <div style={{ fontSize: 10, color: '#2E3A4A', marginTop: 5, letterSpacing: '0.1em' }}>{label.toUpperCase()}</div>
                </div>
              ))}
            </div>

            {/* Daily routine */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 10, color: '#2E3A4A', letterSpacing: '0.15em', marginBottom: 12 }}>TODAY'S SESSION — {today} — {checks.filter(Boolean).length}/4 BLOCKS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {DAILY_BLOCKS.map((b, i) => (
                  <div key={i} className="card card-hover" onClick={() => toggleBlock(i)} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', cursor: 'pointer', borderLeft: `3px solid ${checks[i] ? b.color : '#1A2030'}`, transition: 'all 0.2s', opacity: checks[i] ? 0.6 : 1 }}>
                    <div className={`chk ${checks[i] ? 'done' : ''}`} style={{ marginTop: 2, ...(checks[i] ? { borderColor: b.color, background: b.color } : {}) }}>
                      {checks[i] && <span style={{ color: '#080B0F', fontSize: 11, fontWeight: 900 }}>✓</span>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: checks[i] ? b.color : '#D4D4D8' }}>{b.title} — {b.sub}</span>
                        <span style={{ fontSize: 9, color: b.color, background: b.color + '15', padding: '2px 7px', letterSpacing: '0.08em' }}>{b.time}</span>
                      </div>
                      <div style={{ fontSize: 11, color: '#3A4A5A', lineHeight: 1.7 }}>{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {checks.every(Boolean) && (
                <div style={{ marginTop: 12, padding: '12px 16px', background: '#10B98110', border: '1px solid #10B98130', color: '#10B981', fontSize: 12, textAlign: 'center', fontWeight: 700, letterSpacing: '0.1em' }}>
                  ✦ SESSION COMPLETE — STREAK: {state.streak.count} DAYS ✦
                </div>
              )}
            </div>

            {/* Stuck Protocol */}
            <div className="card" style={{ borderLeft: '3px solid #3B82F6', marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: '#3B82F6', fontWeight: 700, letterSpacing: '0.15em', marginBottom: 10 }}>⚡ STUCK PROTOCOL</div>
              {[
                ['0–25 min', 'Attempt fully independently. Brute force → optimize.'],
                ['25 min', 'First hint only. Try 10 more minutes.'],
                ['35 min', 'Read the idea/approach. Close tab. Code from scratch.'],
                ['ALWAYS', 'Never copy-paste code. Never open ChatGPT.'],
              ].map(([time, rule], i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: i < 3 ? 7 : 0, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 10, color: i === 3 ? '#EF4444' : '#3B82F6', minWidth: 50, flexShrink: 0, fontWeight: 700 }}>{time}</span>
                  <span style={{ fontSize: 11, color: i === 3 ? '#EF4444' : '#5A6A7A', lineHeight: 1.5 }}>{rule}</span>
                </div>
              ))}
            </div>

            {/* Reviews due */}
            {dueReviews.length > 0 && (
              <div className="card" style={{ borderLeft: '3px solid #F59E0B' }}>
                <div style={{ fontSize: 10, color: '#F59E0B', fontWeight: 700, letterSpacing: '0.15em', marginBottom: 10 }}>📋 DUE FOR REVIEW ({dueReviews.length})</div>
                {dueReviews.map(p => (
                  <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #12181F' }}>
                    <div>
                      <span style={{ fontSize: 12, color: '#D4D4D8' }}>{p.name}</span>
                      {p.pattern && <span style={{ marginLeft: 8, fontSize: 10, color: '#3A4A5A' }}>{p.pattern}</span>}
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-sm btn-ok" onClick={() => markReview(p.id, true)}>✓ Solved</button>
                      <button className="btn btn-sm btn-fail" onClick={() => markReview(p.id, false)}>✗ Failed</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── PROBLEMS ─── */}
        {tab === 'problems' && (
          <div className="slide-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: '#2E3A4A', letterSpacing: '0.15em' }}>{state.problems.length} PROBLEMS LOGGED</div>
              <button className="btn btn-primary" onClick={() => setShowProblemModal(true)}>+ LOG PROBLEM</button>
            </div>

            {state.problems.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: 48, color: '#2E3A4A' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>📝</div>
                <div style={{ fontSize: 12 }}>No problems logged yet.</div>
                <div style={{ fontSize: 11, marginTop: 6, color: '#1E2530' }}>Complete your first session, then log your problem here.</div>
              </div>
            ) : (
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 70px 110px 70px 95px 70px', padding: '10px 16px', borderBottom: '1px solid #12181F', fontSize: 9, color: '#2E3A4A', letterSpacing: '0.12em' }}>
                  <div>PROBLEM</div><div>DIFF</div><div>PATTERN</div><div>SOLO</div><div>NEXT REVIEW</div><div>FLAG</div>
                </div>
                {state.problems.map(p => (
                  <div key={p.id} className="row" style={{ display: 'grid', gridTemplateColumns: '1fr 70px 110px 70px 95px 70px', padding: '10px 16px', borderBottom: '1px solid #0D1015', alignItems: 'center', transition: 'background 0.12s' }}>
                    <div>
                      <div style={{ fontSize: 12, color: '#D4D4D8' }}>{p.name}</div>
                      <div style={{ fontSize: 10, color: '#2E3A4A', marginTop: 2 }}>{p.firstSolvedDate}</div>
                    </div>
                    <div><span className={`badge ${p.difficulty?.toLowerCase()}`}>{p.difficulty}</span></div>
                    <div style={{ fontSize: 10, color: '#4A5A6A' }}>{p.pattern || '—'}</div>
                    <div style={{ fontSize: 11, color: p.independent ? '#10B981' : '#2E3A4A', fontWeight: p.independent ? 700 : 400 }}>{p.independent ? '✓ YES' : 'No'}</div>
                    <div style={{ fontSize: 10, color: p.nextReview <= today ? '#3B82F6' : '#3A4A5A' }}>
                      {p.nextReview <= today ? `⚡ ${p.nextReview}` : p.nextReview}
                    </div>
                    <div style={{ fontSize: 10, color: p.isRedFlag ? '#EF4444' : '#2E3A4A' }}>{p.isRedFlag ? '🚩 FLAG' : '—'}</div>
                  </div>
                ))}
              </div>
            )}

            {redFlags.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <div style={{ fontSize: 10, color: '#2E3A4A', letterSpacing: '0.15em', marginBottom: 10 }}>🚩 RED FLAG PROBLEMS — PRIORITY REVIEW ({redFlags.length})</div>
                <div className="card" style={{ borderLeft: '3px solid #EF4444' }}>
                  <div style={{ fontSize: 11, color: '#3A4A5A', marginBottom: 12 }}>Failed to re-solve 2+ times. These are your priority problems for weekend review sessions.</div>
                  {redFlags.map(p => (
                    <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #12181F' }}>
                      <div>
                        <span style={{ fontSize: 12, color: '#EF4444' }}>{p.name}</span>
                        {p.pattern && <span style={{ marginLeft: 8, fontSize: 10, color: '#3A4A5A' }}>{p.pattern}</span>}
                      </div>
                      <span style={{ fontSize: 10, color: '#3A4A5A' }}>failed {p.failCount}×</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── TOPICS ─── */}
        {tab === 'topics' && (
          <div className="slide-in">
            <div style={{ fontSize: 10, color: '#2E3A4A', letterSpacing: '0.15em', marginBottom: 20 }}>8-WEEK TOPIC ROADMAP</div>

            {STAGES.map(({ stage, label, weeks, color }) => (
              <div key={stage} style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 6, height: 6, background: color, borderRadius: '50%' }} />
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700, color: '#D4D4D8' }}>{label}</span>
                  <span style={{ fontSize: 10, color: '#2E3A4A', letterSpacing: '0.1em' }}>{weeks}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {TOPICS.filter(t => t.stage === stage).map(t => {
                    const solved = topicCounts[t.id] || 0;
                    const pct = Math.min((solved / t.target) * 100, 100);
                    return (
                      <div key={t.id} className="card" style={{ padding: '11px 14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                          <span style={{ fontSize: 12, color: pct >= 100 ? color : '#D4D4D8' }}>{t.name} {pct >= 100 && '✓'}</span>
                          <span style={{ fontSize: 10, color: '#3A4A5A' }}>{solved}/{t.target}</span>
                        </div>
                        <div className="pbar"><div className="pfill" style={{ width: `${pct}%`, background: color }} /></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Milestones */}
            <div style={{ fontSize: 10, color: '#2E3A4A', letterSpacing: '0.15em', marginBottom: 12, marginTop: 4 }}>MILESTONES</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {MILESTONES.map(({ week, color, items }) => (
                <div key={week} className="card" style={{ borderTop: `2px solid ${color}` }}>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 800, color, marginBottom: 12 }}>{week}</div>
                  {items.map((item, i) => (
                    <div key={i} style={{ fontSize: 10, color: '#4A5A6A', marginBottom: 7, paddingLeft: 10, borderLeft: `2px solid ${color}25`, lineHeight: 1.6 }}>{item}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── MISTAKES ─── */}
        {tab === 'mistakes' && (
          <div className="slide-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: '#2E3A4A', letterSpacing: '0.15em' }}>MISTAKE PATTERN TRACKER</div>
              <button className="btn btn-primary" onClick={() => setShowMistakeModal(true)}>+ LOG PATTERN</button>
            </div>

            <div className="card" style={{ borderLeft: '3px solid #F59E0B', marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: '#F59E0B', fontWeight: 700, letterSpacing: '0.12em', marginBottom: 6 }}>SUNDAY AUDIT</div>
              <div style={{ fontSize: 11, color: '#3A4A5A', lineHeight: 1.7 }}>Review your top 3 patterns. The following week, consciously watch for those exact mistakes while solving. Name them. Track them. Fix them.</div>
            </div>

            {state.mistakes.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: 48, color: '#2E3A4A' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
                <div style={{ fontSize: 12 }}>No patterns logged yet.</div>
                <div style={{ fontSize: 11, marginTop: 6, color: '#1E2530' }}>Log mistake patterns as you notice them while solving.</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[...state.mistakes].sort((a, b) => b.count - a.count).map((m, i) => (
                  <div key={m.id} className="card card-hover" style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ background: i === 0 ? '#F5A62320' : '#1A2030', color: i === 0 ? '#F5A623' : '#3A4A5A', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 800, flexShrink: 0 }}>{m.count}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: '#D4D4D8', marginBottom: 4 }}>{m.pattern}</div>
                      <div style={{ fontSize: 11, color: '#4A5A6A', lineHeight: 1.5 }}>{m.desc}</div>
                      <div style={{ fontSize: 10, color: '#2E3A4A', marginTop: 5 }}>last seen: {m.lastSeen}</div>
                    </div>
                    <button className="btn btn-ghost btn-sm" onClick={() => {
                      const mistakes = state.mistakes.map(x => x.id === m.id ? { ...x, count: x.count + 1, lastSeen: today } : x);
                      save({ ...state, mistakes });
                      showToast('Count updated');
                    }}>+1</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── WINS ─── */}
        {tab === 'wins' && (
          <div className="slide-in">
            <div style={{ fontSize: 10, color: '#2E3A4A', letterSpacing: '0.15em', marginBottom: 16 }}>INDEPENDENT SOLVES — WINS LOG</div>

            <div className="card" style={{ borderLeft: '3px solid #10B981', marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: '#10B981', fontWeight: 700, letterSpacing: '0.12em', marginBottom: 6 }}>WHEN CONFIDENCE DROPS</div>
              <div style={{ fontSize: 11, color: '#3A4A5A', lineHeight: 1.7 }}>Open this tab. Read through every win. You solved each of these on your own. Progress is real even when it doesn't feel like it.</div>
            </div>

            {state.wins.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: 48, color: '#2E3A4A' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>🏆</div>
                <div style={{ fontSize: 12 }}>Your wins will appear here.</div>
                <div style={{ fontSize: 11, marginTop: 6, color: '#1E2530' }}>Check "Solved independently" when logging a problem to add it here.</div>
              </div>
            ) : (
              <>
                <div className="card" style={{ textAlign: 'center', padding: '20px', marginBottom: 12, borderColor: '#10B98120' }}>
                  <div className="num" style={{ fontSize: 48, color: '#10B981' }}>{state.wins.length}</div>
                  <div style={{ fontSize: 11, color: '#3A4A5A', marginTop: 4 }}>independent solves</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {state.wins.map((w, i) => (
                    <div key={w.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: 14, borderLeft: '3px solid #10B981' }}>
                      <div className="num" style={{ fontSize: 22, color: '#10B981', minWidth: 36 }}>#{state.wins.length - i}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, color: '#D4D4D8' }}>{w.name}</div>
                        <div style={{ fontSize: 10, color: '#3A4A5A', marginTop: 3 }}>{w.pattern ? `${w.pattern}  ·  ` : ''}{w.date}</div>
                      </div>
                      <span style={{ fontSize: 20 }}>🎯</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

      </div>

      {/* ─── ADD PROBLEM MODAL ─── */}
      {showProblemModal && (
        <div className="modal-bg" onClick={e => e.target === e.currentTarget && setShowProblemModal(false)}>
          <div className="modal slide-in">
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 800, color: '#F5A623', marginBottom: 20 }}>LOG PROBLEM</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <div className="label">Problem Name *</div>
                <input placeholder="e.g. Two Sum" value={prob.name} onChange={e => setProb({ ...prob, name: e.target.value })} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <div className="label">Difficulty</div>
                  <select value={prob.difficulty} onChange={e => setProb({ ...prob, difficulty: e.target.value })}>
                    <option>Easy</option><option>Medium</option><option>Hard</option>
                  </select>
                </div>
                <div>
                  <div className="label">Pattern</div>
                  <select value={prob.pattern} onChange={e => setProb({ ...prob, pattern: e.target.value })}>
                    <option value="">— Select —</option>
                    {PATTERNS.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <div className="label">Topic (for roadmap)</div>
                <select value={prob.topic} onChange={e => setProb({ ...prob, topic: e.target.value })}>
                  <option value="">— Select —</option>
                  {TOPICS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
              <div>
                <div className="label">Where did you get stuck?</div>
                <textarea rows={2} placeholder="e.g. Didn't recognize the complement lookup opportunity" value={prob.stuck} onChange={e => setProb({ ...prob, stuck: e.target.value })} />
              </div>
              <div>
                <div className="label">Key Insight</div>
                <textarea rows={2} placeholder="e.g. x + complement = target → look up complement in map while iterating" value={prob.insight} onChange={e => setProb({ ...prob, insight: e.target.value })} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#0A0D12', border: '1px solid #1A2030', cursor: 'pointer' }} onClick={() => setProb({ ...prob, independent: !prob.independent })}>
                <div style={{ width: 16, height: 16, border: `2px solid ${prob.independent ? '#10B981' : '#2A3545'}`, background: prob.independent ? '#10B981' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {prob.independent && <span style={{ color: '#080B0F', fontSize: 10, fontWeight: 900 }}>✓</span>}
                </div>
                <span style={{ fontSize: 11, color: prob.independent ? '#10B981' : '#4A5A6A' }}>Solved independently — no hints, no ChatGPT</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={addProblem}>LOG PROBLEM</button>
              <button className="btn btn-ghost" onClick={() => setShowProblemModal(false)}>CANCEL</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── ADD MISTAKE MODAL ─── */}
      {showMistakeModal && (
        <div className="modal-bg" onClick={e => e.target === e.currentTarget && setShowMistakeModal(false)}>
          <div className="modal slide-in">
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 800, color: '#F5A623', marginBottom: 20 }}>LOG MISTAKE PATTERN</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <div className="label">Pattern Name</div>
                <input placeholder="e.g. Missing hash map optimization" value={mist.pattern} onChange={e => setMist({ ...mist, pattern: e.target.value })} />
              </div>
              <div>
                <div className="label">What exactly keeps going wrong?</div>
                <textarea rows={3} placeholder="Be specific. The more precise, the more useful this becomes." value={mist.desc} onChange={e => setMist({ ...mist, desc: e.target.value })} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={addMistake}>LOG PATTERN</button>
              <button className="btn btn-ghost" onClick={() => setShowMistakeModal(false)}>CANCEL</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
