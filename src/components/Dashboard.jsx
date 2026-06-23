import { useEffect, useRef, useState } from 'react';
import './Dashboard.css';

/* ─────────────────────────────────────────────
   Reusable: animated count-up number
───────────────────────────────────────────── */
const CountUp = ({ target, duration = 1400, suffix = '' }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(id); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [target, duration]);
  return <>{val}{suffix}</>;
};

/* ─────────────────────────────────────────────
   Circular Score Meter (SVG)
───────────────────────────────────────────── */
const ScoreMeter = ({ score, label, color, size = 170 }) => {
  const R   = 62;
  const C   = 2 * Math.PI * R;
  const off = C - (score / 100) * C;

  const glow =
    color === 'var(--color-success)' ? 'rgba(16,185,129,0.4)'  :
    color === 'var(--color-warning)' ? 'rgba(245,158,11,0.4)' :
                                       'rgba(239,68,68,0.4)';

  const [animated, setAnimated] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 80); return () => clearTimeout(t); }, []);

  return (
    <div className="meter-wrap">
      <svg width={size} height={size} viewBox="0 0 160 160" aria-label={`${label}: ${score}`} role="img">
        {/* Track */}
        <circle cx="80" cy="80" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10"/>
        {/* Progress */}
        <circle
          cx="80" cy="80" r={R}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={animated ? off : C}
          transform="rotate(-90 80 80)"
          style={{
            transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1)',
            filter: `drop-shadow(0 0 8px ${glow})`,
          }}
        />
        {/* Center text */}
        <text x="80" y="72" textAnchor="middle" fill={color}
          fontSize="32" fontWeight="800" fontFamily="Space Grotesk,sans-serif">
          <CountUp target={score} />
        </text>
        <text x="80" y="88" textAnchor="middle" fill="rgba(255,255,255,0.35)"
          fontSize="10.5" fontFamily="Inter,sans-serif">out of 100</text>
        <text x="80" y="106" textAnchor="middle" fill={color}
          fontSize="11.5" fontWeight="700" fontFamily="Inter,sans-serif">{label}</text>
      </svg>
      <div className="meter-halo" style={{ background: `radial-gradient(circle, ${glow} 0%, transparent 70%)` }} aria-hidden="true"/>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Score Card (ATS or Job Match)
───────────────────────────────────────────── */
const ScoreCard = ({ title, subtitle, score, label, color, icon, accentClass }) => (
  <div className={`score-card glass-card ${accentClass}`} role="region" aria-label={title}>
    <div className="sc-header">
      <div className="sc-title-wrap">
        <span className="sc-icon" aria-hidden="true">{icon}</span>
        <div>
          <h3 className="sc-title">{title}</h3>
          <p className="sc-sub">{subtitle}</p>
        </div>
      </div>
    </div>
    <div className="sc-meter">
      <ScoreMeter score={score} label={label} color={color} />
    </div>
    <div className="sc-bar-row">
      <div className="progress-bar-wrap sc-bar">
        <div className="progress-bar-fill" style={{ width:`${score}%`, background: color === 'var(--color-success)' ? 'var(--gradient-success)' : color === 'var(--color-warning)' ? 'var(--gradient-warning)' : 'var(--gradient-danger)' }}/>
      </div>
      <span className="sc-bar-val" style={{ color }}>{score}%</span>
    </div>
    <div className="sc-legend">
      {[['75+','Excellent','var(--color-success)'],['50–74','Average','var(--color-warning)'],['<50','Needs Work','var(--color-danger)']].map(([r,l,c])=>(
        <div key={r} className={`sc-leg-item ${((score>=75&&r==='75+')||(score>=50&&score<75&&r==='50–74')||(score<50&&r==='<50'))?'sc-leg-active':''}`}>
          <span className="sc-leg-dot" style={{background:c}} aria-hidden="true"/>
          <span className="sc-leg-label">{l}</span>
          <span className="sc-leg-range">{r}</span>
        </div>
      ))}
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Stat card (small)
───────────────────────────────────────────── */
const StatCard = ({ icon, value, suffix='', label, color, delay }) => (
  <div className="stat-card glass-card anim-fade-up" style={{ animationDelay: `${delay}ms` }} role="figure" aria-label={`${label}: ${value}${suffix}`}>
    <div className="stat-icon" style={{ background:`${color}15`, border:`1px solid ${color}28` }} aria-hidden="true">{icon}</div>
    <div className="stat-val" style={{ color }}>
      <CountUp target={value} suffix={suffix} duration={1200} />
    </div>
    <p className="stat-label">{label}</p>
  </div>
);

/* ─────────────────────────────────────────────
   Skills panel
───────────────────────────────────────────── */
const SkillsPanel = ({ title, skills, type, icon, emptyMsg }) => (
  <div className="skills-panel glass-card" role="region" aria-label={title}>
    <div className="panel-header">
      <div className="panel-header-icon" aria-hidden="true">{icon}</div>
      <div>
        <h3 className="panel-title">{title}</h3>
        <p className="panel-count">{skills.length} skill{skills.length !== 1 ? 's' : ''}</p>
      </div>
    </div>
    <div className="chips-wrap">
      {skills.length > 0 ? skills.map(s => (
        <span key={s.id} className={`chip chip-${type}`} title={s.cat}>
          <span aria-hidden="true">{s.icon}</span>
          {s.label}
          <span className="chip-cat">{s.cat}</span>
        </span>
      )) : (
        <p className="panel-empty">{emptyMsg}</p>
      )}
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Strong Areas
───────────────────────────────────────────── */
const StrongAreas = ({ areas }) => (
  <div className="areas-panel glass-card" role="region" aria-label="Strong areas">
    <div className="panel-header">
      <div className="panel-header-icon green-icon" aria-hidden="true">💪</div>
      <div>
        <h3 className="panel-title">Strong Areas</h3>
        <p className="panel-count">Categories where you excel</p>
      </div>
    </div>
    {areas.length === 0 ? (
      <p className="panel-empty">Upload a resume to discover your strong areas.</p>
    ) : (
      <div className="areas-list">
        {areas.map(({ cat, count }, i) => (
          <div key={cat} className="area-item area-item--strong anim-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="area-left">
              <div className="area-dot area-dot--green" aria-hidden="true"/>
              <span className="area-cat">{cat}</span>
            </div>
            <div className="area-bar-wrap">
              <div className="progress-bar-wrap" style={{ height: '4px' }}>
                <div className="progress-bar-fill" style={{ width: `${Math.min(count * 33, 100)}%`, background: 'var(--gradient-success)' }}/>
              </div>
            </div>
            <span className="area-count">{count} skill{count>1?'s':''}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

/* ─────────────────────────────────────────────
   Weak Areas
───────────────────────────────────────────── */
const WeakAreas = ({ areas, strengthMessage }) => (
  <div className="areas-panel glass-card" role="region" aria-label="Weak areas and strength analysis">
    <div className="panel-header">
      <div className="panel-header-icon red-icon" aria-hidden="true">🔬</div>
      <div>
        <h3 className="panel-title">Strength Analysis</h3>
        <p className="panel-count">AI assessment of your profile</p>
      </div>
    </div>
    <div className="strength-box">
      <span aria-hidden="true">✨</span>
      <p>{strengthMessage}</p>
    </div>
    {areas.length > 0 && (
      <div className="areas-list">
        {areas.slice(0, 5).map(({ cat, missing }, i) => (
          <div key={cat} className="area-item anim-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="area-left">
              <div className="area-dot area-dot--red" aria-hidden="true"/>
              <span className="area-cat">{cat}</span>
            </div>
            <span className="area-gap-tag">GAP</span>
            <span className="area-count">{missing.length} missing</span>
          </div>
        ))}
      </div>
    )}
    {areas.length === 0 && <p className="panel-empty green-text">🎉 No skill gaps — excellent coverage!</p>}
  </div>
);

/* ─────────────────────────────────────────────
   Suggestions Panel
───────────────────────────────────────────── */
const SuggestionsPanel = ({ suggestions }) => (
  <div className="sugg-panel glass-card" role="region" aria-label="AI improvement suggestions">
    <div className="panel-header">
      <div className="panel-header-icon yellow-icon" aria-hidden="true">💡</div>
      <div>
        <h3 className="panel-title">AI Improvement Plan</h3>
        <p className="panel-count">Personalised recommendations to boost your score</p>
      </div>
    </div>

    {suggestions.length === 0 ? (
      <div className="sugg-perfect">
        <div className="sugg-perfect-icon" aria-hidden="true">🏆</div>
        <h4>Perfect Match!</h4>
        <p>Your resume covers all target skills. You're in the top tier of applicants!</p>
      </div>
    ) : (
      <div className="sugg-list">
        {suggestions.map((s, i) => (
          <div
            key={s.id}
            className={`sugg-item sugg-item--${s.priority} anim-fade-up`}
            style={{ animationDelay: `${i * 70}ms` }}
            role="listitem"
          >
            <div className="sugg-num" aria-hidden="true">{i + 1}</div>
            <div className="sugg-emoji" aria-hidden="true">{s.icon}</div>
            <div className="sugg-body">
              <div className="sugg-head-row">
                <span className="sugg-skill">{s.label}</span>
                <span className={`sugg-priority-badge priority--${s.priority}`} aria-label={`Priority: ${s.priority}`}>
                  {s.priority === 'critical' ? '🔥 Critical' : '📌 Recommended'}
                </span>
              </div>
              <p className="sugg-text">{s.suggestion}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

/* ─────────────────────────────────────────────
   Job Match Summary Banner
───────────────────────────────────────────── */
const JobMatchBanner = ({ result }) => {
  const { jobRole, matchedJobSkills, missingJobSkills } = result;
  return (
    <div className="jm-banner glass-card" role="region" aria-label="Job match summary">
      <div className="jm-left">
        <span className="jm-role-icon" aria-hidden="true" style={{ color: jobRole.color }}>{jobRole.icon}</span>
        <div>
          <p className="jm-role-label">Analyzing for</p>
          <h3 className="jm-role-name">{jobRole.label}</h3>
          <p className="jm-role-desc">{jobRole.description}</p>
        </div>
      </div>
      <div className="jm-skills">
        <div className="jm-col">
          <p className="jm-col-label">
            <span className="jm-dot jm-dot--green" aria-hidden="true"/>
            Role Skills Found ({matchedJobSkills.length})
          </p>
          <div className="jm-chips">
            {matchedJobSkills.map(s => (
              <span key={s.id} className="jm-chip jm-chip--found">{s.icon} {s.label}</span>
            ))}
            {matchedJobSkills.length === 0 && <span className="jm-chip-empty">None detected</span>}
          </div>
        </div>
        <div className="jm-col">
          <p className="jm-col-label">
            <span className="jm-dot jm-dot--red" aria-hidden="true"/>
            Role Skills Missing ({missingJobSkills.length})
          </p>
          <div className="jm-chips">
            {missingJobSkills.map(s => (
              <span key={s.id} className="jm-chip jm-chip--missing">{s.icon} {s.label}</span>
            ))}
            {missingJobSkills.length === 0 && <span className="jm-chip-empty green-text">✓ All matched!</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main Dashboard
───────────────────────────────────────────── */
const Dashboard = ({ result, onReset }) => {
  const topRef = useRef(null);

  useEffect(() => {
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  }, []);

  return (
    <section className="dash section anim-fade-in" ref={topRef} id="dashboard" aria-label="Analysis results">

      {/* ── Header ── */}
      <div className="dash-header">
        <div>
          <div className="badge">
          <span className="badge-dot"></span>
          Analysis Complete · {result.meta.analyzedAt}
          </div>
          <h2 className="dash-title">
            Your <span className="g-text">Resume Intelligence</span> Report
          </h2>
          <p className="dash-sub">
            <strong>{result.meta.fileName}</strong>
            <span className="dash-sub-dot" aria-hidden="true">·</span>
            {result.meta.fileSize}
            <span className="dash-sub-dot" aria-hidden="true">·</span>
            Targeting <strong style={{ color: result.jobRole.color }}>{result.jobRole.icon} {result.jobRole.label}</strong>
          </p>
        </div>
        <button className="btn btn-ghost" onClick={onReset} id="new-analysis-btn" aria-label="Start new analysis">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          New Analysis
        </button>
      </div>

      {/* ── Row 1: Score Cards ── */}
      <div className="dash-scores">
        <ScoreCard
          title="ATS Compatibility Score"
          subtitle="Across all 16 industry benchmarks"
          score={result.atsScore}
          label={result.atsLabel}
          color={result.atsColor}
          icon="ATS"
          accentClass="score-card--ats"
        />
        <ScoreCard
          title="Job Match Score"
          subtitle={`Match vs ${result.jobRole.label} requirements`}
          score={result.jobMatchScore}
          label={result.jobMatchLabel}
          color={result.jobMatchColor}
          icon="JOB"
          accentClass="score-card--job"
        />
      </div>

      {/* ── Row 2: Quick Stats ── */}
      <div className="dash-stats">
        <StatCard icon="TS" value={result.stats.totalSkills}   label="Total Skills Checked" color="#6366f1" delay={0}   />
        <StatCard icon="SF" value={result.stats.skillsFound}   label="Skills Detected"      color="#10b981" delay={80}  />
        <StatCard icon="MS" value={result.stats.skillsMissing} label="Skills Missing"        color="#ef4444" delay={160} />
        <StatCard icon="JM" value={result.stats.jobMatch} suffix="%" label="Job Match Rate"  color="#f59e0b" delay={240} />
      </div>

      {/* ── Row 3: Job Match Banner ── */}
      <JobMatchBanner result={result} />

      {/* ── Row 4: Skills Split ── */}
      <div className="dash-skills">
        <SkillsPanel
          title="Skills Detected"
          skills={result.foundSkills}
          type="found"
          icon="✅"
          emptyMsg="No matching skills found in your resume."
        />
        <SkillsPanel
          title="Missing Skills"
          skills={result.missingSkills}
          type="missing"
          icon="❌"
          emptyMsg="🎉 All skills detected — perfect coverage!"
        />
      </div>

      {/* ── Row 5: Strong + Weak areas ── */}
      <div className="dash-areas">
        <StrongAreas areas={result.strongAreas} />
        <WeakAreas areas={result.weakAreas} strengthMessage={result.strengthMessage} />
      </div>

      {/* ── Row 6: Full-width Suggestions ── */}
      <SuggestionsPanel suggestions={result.suggestions} />

      {/* ── Footer CTA ── */}
      <div className="dash-cta glass-card" role="complementary" aria-label="Call to action">
        <div className="dash-cta-left">
          <span className="dash-cta-icon" aria-hidden="true">AI</span>
          <div>
            <h3 className="dash-cta-title">Ready to level up?</h3>
            <p className="dash-cta-desc">Apply the AI suggestions above, update your resume, then re-analyze to watch your scores climb.</p>
          </div>
        </div>
        <button className="btn btn-primary" onClick={onReset} id="re-analyze-btn" aria-label="Analyze another resume">
          Analyze Another Resume
        </button>
      </div>

    </section>
  );
};

export default Dashboard;
