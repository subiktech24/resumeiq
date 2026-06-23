import { useState, useCallback } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar            from './components/Navbar';
import Hero              from './components/Hero';
import UploadSection     from './components/UploadSection';
import LoadingAnimation  from './components/LoadingAnimation';
import Dashboard         from './components/Dashboard';
import Footer            from './components/Footer';
import { analyzeResume } from './utils/resumeAnalyzer';
import './App.css';

const S = { IDLE: 'idle', LOADING: 'loading', RESULT: 'result' };

export default function App() {
  const [state,    setState]    = useState(S.IDLE);
  const [result,   setResult]   = useState(null);
  const [fileMeta, setFileMeta] = useState(null); // { name, jobRoleId }
  const [error,    setError]    = useState('');

  const handleAnalyze = useCallback(async (file, jobRoleId) => {
    setFileMeta({ name: file.name, jobRoleId });
    setError('');
    setState(S.LOADING);
    try {
      const data = await analyzeResume(file, jobRoleId);
      setResult(data);
      setState(S.RESULT);
    } catch (err) {
      console.error(err);
      setError('Analysis failed — please try again.');
      setState(S.IDLE);
    }
  }, []);

  const handleReset = useCallback(() => {
    setState(S.IDLE);
    setResult(null);
    setFileMeta(null);
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const isIdle    = state === S.IDLE;
  const isLoading = state === S.LOADING;
  const isResult  = state === S.RESULT;

  return (
    <div className="app">
      <ParticleBackground />

      {/* Ambient glow orbs */}
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />

      <Navbar isResult={isResult} onReset={handleReset} />

      <main className="app-main">
        {(isIdle || isLoading) && <Hero />}

        {isIdle && (
          <>
            <UploadSection onAnalyze={handleAnalyze} />
            {error && (
              <div className="app-error section anim-fade-in">
                <span className="app-error-icon">⚠️</span> {error}
              </div>
            )}
          </>
        )}

        {isLoading && (
          <LoadingAnimation
            fileName={fileMeta?.name || 'your resume'}
            jobRoleId={fileMeta?.jobRoleId}
          />
        )}

        {isResult && result && (
          <Dashboard result={result} onReset={handleReset} />
        )}
      </main>

      <Footer />
    </div>
  );
}
