import { useEffect, useState } from 'react';
import { JOB_ROLES } from '../utils/resumeAnalyzer';
import './LoadingAnimation.css';

const STEPS = [
  { icon: '📄', label: 'Reading resume structure',       ms: 700 },
  { icon: '🔍', label: 'Extracting text & keywords',     ms: 750 },
  { icon: '⚡', label: 'Detecting skills & technologies', ms: 800 },
  { icon: '🎯', label: 'Matching target job role',        ms: 650 },
  { icon: '📊', label: 'Calculating ATS score',           ms: 700 },
  { icon: '🧠', label: 'Generating AI improvement plan',  ms: 600 },
];

const LoadingAnimation = ({ fileName, jobRoleId }) => {
  const [done,     setDone]     = useState([]);
  const [active,   setActive]   = useState(0);
  const [progress, setProgress] = useState(0);

  const role = JOB_ROLES.find(r => r.id === jobRoleId) || JOB_ROLES[0];

  useEffect(() => {
    let delay = 0;
    STEPS.forEach((step, i) => {
      const t = setTimeout(() => {
        setActive(i + 1);
        setDone(prev => [...prev, i]);
        setProgress(Math.round(((i + 1) / STEPS.length) * 100));
      }, delay += step.ms);
      return () => clearTimeout(t);
    });
  }, []);

  return (
    <section className="loading section anim-fade-in" aria-live="polite" aria-label="Analyzing resume">
      <div className="loading-card glass-card">

        {/* Top header */}
        <div className="ld-head">
          <div className="ld-spinner" aria-hidden="true">
            <div className="ld-ring ld-ring--outer"/>
            <div className="ld-ring ld-ring--inner"/>
            <div className="ld-ring-core"/>
          </div>
          <div>
            <h2 className="ld-title">
              AI is analyzing <span className="g-text">{fileName}</span>
            </h2>
            <p className="ld-sub">
              Matching against&nbsp;
              <span className="ld-role" style={{ color: role.color }}>
                {role.icon} {role.label}
              </span>
              &nbsp;requirements…
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="ld-progress-wrap">
          <div className="ld-progress-bar progress-bar-wrap">
            <div
              className="progress-bar-fill"
              style={{
                width: `${progress}%`,
                background: 'var(--gradient-brand)',
              }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
            <div className="ld-shimmer" aria-hidden="true"/>
          </div>
          <span className="ld-pct">{progress}%</span>
        </div>

        {/* Step tracker */}
        <div className="ld-steps" role="list">
          {STEPS.map((s, i) => {
            const isDone   = done.includes(i);
            const isActive = active === i;
            return (
              <div
                key={i}
                className={`ld-step ${isDone ? 'ld-step--done' : ''} ${isActive ? 'ld-step--active' : ''}`}
                role="listitem"
                aria-label={`${s.label}: ${isDone ? 'complete' : isActive ? 'in progress' : 'pending'}`}
              >
                <div className="ld-step-indicator" aria-hidden="true">
                  {isDone ? (
                    <div className="ld-check">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  ) : isActive ? (
                    <div className="ld-active-dot"/>
                  ) : (
                    <div className="ld-pending-dot"/>
                  )}
                </div>
                <span className="ld-step-icon" aria-hidden="true">{s.icon}</span>
                <span className="ld-step-label">{s.label}</span>
                {isDone && <span className="ld-done-tag" aria-hidden="true">Done</span>}
              </div>
            );
          })}
        </div>

        {/* Tip */}
        <div className="ld-tip">
          <span aria-hidden="true">💡</span>
          <p>
            <strong>Pro tip:</strong> ATS systems score keyword density — mirror the exact
            language used in the job description for highest match rates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoadingAnimation;
