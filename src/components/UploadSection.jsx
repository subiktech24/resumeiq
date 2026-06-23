import { useState, useRef, useCallback } from 'react';
import { JOB_ROLES } from '../utils/resumeAnalyzer';
import './UploadSection.css';

const UploadSection = ({ onAnalyze }) => {
  const [file,        setFile]        = useState(null);
  const [jobRoleId,   setJobRoleId]   = useState('');
  const [customRole,  setCustomRole]  = useState('');
  const [dragging,    setDragging]    = useState(false);
  const [error,       setError]       = useState('');
  const inputRef = useRef(null);

  const validate = (f) => {
    if (!f) return 'No file selected.';
    if (f.type !== 'application/pdf' && !f.name.endsWith('.pdf')) return 'Please upload a PDF file.';
    if (f.size > 10 * 1024 * 1024) return 'File must be under 10 MB.';
    return null;
  };

  const pickFile = useCallback((f) => {
    const err = validate(f);
    if (err) { setError(err); return; }
    setError(''); setFile(f);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault(); setDragging(false);
    pickFile(e.dataTransfer.files[0]);
  }, [pickFile]);

  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);
  const onInput = (e) => pickFile(e.target.files[0]);

  const handleSubmit = () => {
    if (!file) { setError('Please upload your resume first.'); return; }
    if (!jobRoleId) { setError('Please select your target job role.'); return; }
    setError('');
    onAnalyze(file, jobRoleId);
  };

  const selectedRole = JOB_ROLES.find(r => r.id === jobRoleId);

  return (
    <section className="upload section" id="upload" aria-label="Upload resume">
      <div className="upload-hd anim-fade-up">
        <div className="badge">
          <span className="badge-dot"></span>
          Step 1 of 2 — Upload &amp; Configure
        </div>
        <h2 className="upload-title">
          Start Your <span className="g-text">AI Analysis</span>
        </h2>
        <p className="upload-desc">
          Upload your resume PDF and select your target job role. Our AI will generate a
          personalised ATS score, job match percentage, and improvement roadmap.
        </p>
      </div>

      <div className="upload-grid">

        {/* ── Left: File Drop ── */}
        <div className="upload-left">
          <p className="upload-step-label">
            <span className="step-num">01</span> Upload Resume PDF
          </p>
          <div
            className={`dropzone glass-card ${dragging ? 'dropzone--drag' : ''} ${file ? 'dropzone--filled' : ''}`}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onClick={() => !file && inputRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="Upload resume PDF by drag and drop or click"
            onKeyDown={e => e.key === 'Enter' && !file && inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={onInput}
              className="dz-input"
              id="resume-file-input"
              aria-label="Select resume PDF file"
            />

            {!file ? (
              <div className="dz-empty">
                <div className={`dz-icon-ring ${dragging ? 'dz-icon-ring--drag' : ''}`}>
                  <div className="dz-icon-glow" aria-hidden="true"/>
                  <svg className="dz-icon" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                    <rect width="64" height="64" rx="16" fill="rgba(99,102,241,0.12)"/>
                    <path d="M32 42V22M32 22L25 29M32 22L39 29" stroke="url(#dg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 46h28" stroke="url(#dg)" strokeWidth="2.5" strokeLinecap="round"/>
                    <defs>
                      <linearGradient id="dg" x1="18" y1="22" x2="46" y2="46" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#6366f1"/><stop offset="1" stopColor="#a78bfa"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <p className="dz-main">
                  {dragging ? '✨ Release to upload' : 'Drag & drop your resume'}
                </p>
                <p className="dz-sub">or <span className="dz-link">browse files</span></p>
                <p className="dz-meta">PDF only · Max 10 MB</p>
              </div>
            ) : (
              <div className="dz-file">
                <div className="dz-file-icon" aria-hidden="true">
                  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                    <rect width="38" height="38" rx="10" fill="rgba(16,185,129,0.1)"/>
                    <path d="M11 9h9l9 9v15a2 2 0 01-2 2H11a2 2 0 01-2-2V11a2 2 0 012-2z" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 9v9h9" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 22h10M14 26h6" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="dz-file-info">
                  <p className="dz-file-name">{file.name}</p>
                  <p className="dz-file-meta">
                    <span>{(file.size / 1024).toFixed(1)} KB</span>
                    <span className="dot">·</span>
                    <span className="dz-ready">✓ Ready to analyze</span>
                  </p>
                </div>
                <button
                  className="dz-remove"
                  onClick={e => { e.stopPropagation(); setFile(null); if(inputRef.current) inputRef.current.value=''; }}
                  aria-label="Remove file"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Right: Job Role ── */}
        <div className="upload-right">
          <p className="upload-step-label">
            <span className="step-num">02</span> Select Target Job Role
          </p>

          <div className="roles-grid" role="radiogroup" aria-label="Select job role">
            {JOB_ROLES.map(role => (
              <button
                key={role.id}
                className={`role-card ${jobRoleId === role.id ? 'role-card--active' : ''}`}
                onClick={() => setJobRoleId(role.id)}
                role="radio"
                aria-checked={jobRoleId === role.id}
                id={`role-${role.id}`}
                style={{ '--role-color': role.color }}
              >
                
                <span className="role-name">{role.label}</span>
                {jobRoleId === role.id && (
                  <span className="role-check" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Selected role info */}
          {selectedRole && (
            <div className="role-info anim-fade-in">
              <span className="role-info-icon" aria-hidden="true">{selectedRole.icon}</span>
              <div>
                <p className="role-info-name">{selectedRole.label}</p>
                <p className="role-info-desc">{selectedRole.description}</p>
                <div className="role-info-skills">
                  {selectedRole.skills.map(sk => (
                    <span key={sk} className="role-skill-tag">{sk}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="upload-error anim-fade-in" role="alert">
          <span aria-hidden="true">⚠️</span> {error}
        </div>
      )}

      {/* CTA */}
      <div className="upload-cta anim-fade-up d-300">
        <button
          id="analyze-btn"
          className="btn btn-primary upload-cta-btn"
          onClick={handleSubmit}
          disabled={!file || !jobRoleId}
          aria-label="Analyze resume"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Analyze My Resume
        </button>
        <p className="upload-cta-note">Processed 100% locally — Secure and private</p>
      </div>

      {/* Bottom features */}
      <div className="upload-feats">
        {[
         { label: 'Instant', desc: 'Results in seconds' },
         { label: 'ATS Score', desc: 'Precision 0–100 scoring' },
         { label: 'Job Match', desc: 'Role-based analysis' },
         { label: 'Private', desc: 'No server. No storage.' }
].map(f => (
          <div key={f.label} className="upload-feat glass-card">
            <div>
              <p className="uf-label">{f.label}</p>
              <p className="uf-desc">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UploadSection;
