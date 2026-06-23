import './Hero.css';

import {
  Zap,
  Target,
  Briefcase,
  BarChart3,
  Brain
} from "lucide-react";
const METRICS = [
  { icon: '98%', value: '98%', label: 'Accuracy Rate', delay: '0s' },
  { icon: '50K', value: '50K+', label: 'Resumes Analyzed', delay: '1.2s' },
  { icon: '4.9', value: '4.9/5', label: 'User Rating', delay: '2.4s' },
];

const FEATURES = [
  { icon: <Zap size={16} />, text: 'Instant Analysis' },
  { icon: <Target size={16} />, text: 'ATS Score' },
  { icon: <Briefcase size={16} />, text: 'Job Match' },
  { icon: <BarChart3 size={16} />, text: 'Skill Gap' },
  { icon: <Brain size={16} />, text: 'AI Suggestions' },
];

const Hero = () => (
  <section className="hero" id="top" aria-label="Hero section">

    {/* Animated mesh gradient */}
    <div className="hero-mesh" aria-hidden="true" />

    {/* Glow orbs */}
    <div className="hero-orb hero-orb--a" aria-hidden="true" />
    <div className="hero-orb hero-orb--b" aria-hidden="true" />

    <div className="hero-body">

      {/* Badge */}
      <div className="hero-badge anim-fade-up">
        <span className="hero-badge-pulse" aria-hidden="true" />
        <span>AI-Powered Resume Intelligence · v2.0</span>
      </div>

      {/* Title */}
      <h1 className="hero-title anim-fade-up d-100">
        <span className="hero-title-top">ResumeIQ</span>
        <span className="hero-title-bottom g-text">ATS &amp; Job Match Analyzer</span>
      </h1>

      {/* Subtitle */}
      <p className="hero-sub anim-fade-up d-200">
        Analyze your resume, compare it with your dream job, and get
        <br className="hero-br" />
        <strong className="hero-sub-hl"> AI-powered insights</strong> to improve your hiring chances.
      </p>

      {/* Feature pills */}
      <div className="hero-pills anim-fade-up d-300" role="list" aria-label="Features">
        {FEATURES.map(f => (
          <div key={f.text} className="hero-pill" role="listitem">
            <span aria-hidden="true">{f.icon}</span>
            {f.text}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="hero-cta anim-fade-up d-400">
        <a href="#upload" className="btn btn-primary hero-cta-btn" id="hero-cta-btn">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Analyze My Resume
        </a>
        <p className="hero-cta-note">Free · No signup · 100% private</p>
      </div>

      {/* Scroll arrow */}
      <div className="hero-scroll anim-fade-up d-500" aria-hidden="true">
        <div className="hero-scroll-line" />
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>

    {/* Floating metric cards */}
    <div className="hero-floats" aria-hidden="true">
      {METRICS.map(m => (
        <div
          key={m.label}
          className="hero-float-card glass-card anim-float"
          style={{ animationDelay: m.delay }}
        >
          <span className="hfc-icon">{m.icon}</span>
          <div>
            <p className="hfc-value">{m.value}</p>
            <p className="hfc-label">{m.label}</p>
          </div>
        </div>
      ))}
    </div>

  </section>
);

export default Hero;
