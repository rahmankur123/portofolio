import React, { useState } from 'react';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  ArrowLeft
} from '../components/Icons';
import { setAdminAuthStatus } from '../services/portfolioStorage';

export default function AdminLoginPage({ onLoginSuccess, navigate, siteSettings }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Username dan password wajib diisi.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // PRD 6.1: Username/Email and password check (Demo admin: admin / admin123)
      const validUsername = username.trim().toLowerCase();
      if ((validUsername === 'admin' || validUsername === 'admin@portfolio.dev') && password === 'admin123') {
        setAdminAuthStatus(true);
        if (onLoginSuccess) onLoginSuccess();
        if (navigate) navigate('/admin');
      } else {
        setErrorMsg('Kredensial tidak valid. Silakan periksa username atau password Anda.');
        setIsLoading(false);
      }
    }, 400);
  };

  const handleAutoFillDemo = () => {
    setUsername('admin');
    setPassword('admin123');
    setErrorMsg('');
  };

  return (
    <div className="admin-login-page">
      <div className="login-card-container">
        {/* Top Back Link */}
        <div className="login-top-bar">
          <button
            onClick={() => (navigate ? navigate('/') : (window.location.pathname = '/'))}
            className="back-to-home-btn"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Website Publik</span>
          </button>
        </div>

        {/* Card */}
        <div className="admin-login-card">
          <div className="login-header">
            <div className="login-icon-badge">
              <ShieldCheck size={28} />
            </div>
            <h1 className="login-title">Admin CMS Portal</h1>
            <p className="login-subtitle">
              Masuk untuk mengelola seluruh data landing page &amp; kustomisasi tema warna.
            </p>
          </div>

          {errorMsg && (
            <div className="login-alert-error">
              <AlertCircle size={18} />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="login-form">
            <div className="login-field-group">
              <label htmlFor="login-username" className="login-label">
                Username / Email Admin
              </label>
              <div className="login-input-wrapper">
                <User size={18} className="login-input-icon" />
                <input
                  id="login-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin atau email Anda"
                  className="login-input"
                  autoFocus
                  required
                />
              </div>
            </div>

            <div className="login-field-group">
              <div className="label-with-hint">
                <label htmlFor="login-password" className="login-label">
                  Password
                </label>
              </div>
              <div className="login-input-wrapper">
                <Lock size={18} className="login-input-icon" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="login-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle-btn"
                  title={showPassword ? 'Sembunyikan' : 'Tampilkan'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`login-submit-btn ${isLoading ? 'btn-loading' : ''}`}
            >
              {isLoading ? (
                <span>Memverifikasi...</span>
              ) : (
                <>
                  <span>Masuk ke Dashboard</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Helper Box */}
          <div className="demo-credentials-box">
            <div className="demo-box-header">
              <Sparkles size={16} />
              <span>Akun Demo Cepat (PRD 6.1)</span>
            </div>
            <p className="demo-credentials-text">
              Username: <code>admin</code> • Password: <code>admin123</code>
            </p>
            <button
              type="button"
              onClick={handleAutoFillDemo}
              className="autofill-demo-btn"
            >
              Gunakan Akun Demo Otomatis
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="login-page-footer">
          <p>© {new Date().getFullYear()} {siteSettings?.site_title || 'Personal Portfolio CMS'} • Dilindungi Sesi Autentikasi</p>
        </div>
      </div>

      <style>{`
        .admin-login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-main, #F7F7F3);
          padding: 2rem 1.25rem;
          position: relative;
        }

        .login-card-container {
          width: 100%;
          max-width: 440px;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .login-top-bar {
          display: flex;
          justify-content: flex-start;
        }

        .back-to-home-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          color: var(--text-secondary, #64716B);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: color var(--transition-fast, 0.2s);
        }

        .back-to-home-btn:hover {
          color: var(--primary-green, #17634D);
        }

        .admin-login-card {
          background-color: #FFFFFF;
          border: 1px solid var(--border-color, #DDE1DA);
          border-radius: var(--radius-lg, 16px);
          padding: 2.25rem 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
        }

        .login-header {
          text-align: center;
          margin-bottom: 1.75rem;
        }

        .login-icon-badge {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: var(--primary-green-pale, #E8F1EC);
          color: var(--primary-green, #17634D);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }

        .login-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary, #17221F);
          margin-bottom: 0.4rem;
        }

        .login-subtitle {
          font-size: 0.875rem;
          color: var(--text-secondary, #64716B);
          line-height: 1.5;
        }

        .login-alert-error {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1rem;
          background-color: #FEF2F2;
          border: 1px solid #FCA5A5;
          border-radius: var(--radius-md, 8px);
          color: #DC2626;
          font-size: 0.85rem;
          margin-bottom: 1.25rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .login-field-group {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          text-align: left;
        }

        .login-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary, #17221F);
        }

        .login-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .login-input-icon {
          position: absolute;
          left: 12px;
          color: var(--text-secondary, #64716B);
          pointer-events: none;
        }

        .login-input {
          width: 100%;
          padding: 0.75rem 0.9rem 0.75rem 2.5rem;
          border: 1px solid var(--border-color, #DDE1DA);
          border-radius: var(--radius-md, 8px);
          font-size: 0.9rem;
          color: var(--text-primary, #17221F);
          background-color: #FAFAF9;
          transition: all var(--transition-fast, 0.2s);
        }

        .login-input:focus {
          outline: none;
          border-color: var(--primary-green, #17634D);
          background-color: #FFFFFF;
          box-shadow: 0 0 0 3px var(--primary-green-pale, #E8F1EC);
        }

        .password-toggle-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: var(--text-secondary, #64716B);
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 4px;
        }

        .password-toggle-btn:hover {
          color: var(--text-primary, #17221F);
        }

        .login-submit-btn {
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.85rem 1.5rem;
          background-color: var(--primary-green, #17634D);
          color: #FFFFFF;
          border: none;
          border-radius: var(--radius-md, 8px);
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast, 0.2s);
        }

        .login-submit-btn:hover:not(:disabled) {
          background-color: var(--primary-green-hover, #124F3E);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(23, 99, 77, 0.25);
        }

        .demo-credentials-box {
          margin-top: 1.5rem;
          padding: 1rem;
          background-color: var(--primary-green-light, #F0F6F2);
          border: 1px dashed var(--primary-green-border, #C8DCD1);
          border-radius: var(--radius-md, 8px);
          text-align: center;
        }

        .demo-box-header {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--primary-green, #17634D);
          margin-bottom: 0.3rem;
        }

        .demo-credentials-text {
          font-size: 0.8rem;
          color: var(--text-secondary, #64716B);
          margin-bottom: 0.65rem;
        }

        .demo-credentials-text code {
          background-color: #FFFFFF;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          border: 1px solid var(--border-color, #DDE1DA);
          font-family: monospace;
          color: var(--text-primary, #17221F);
          font-weight: 600;
        }

        .autofill-demo-btn {
          background-color: #FFFFFF;
          border: 1px solid var(--primary-green-border, #C8DCD1);
          color: var(--primary-green, #17634D);
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.4rem 0.85rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all var(--transition-fast, 0.2s);
        }

        .autofill-demo-btn:hover {
          background-color: var(--primary-green, #17634D);
          color: #FFFFFF;
        }

        .login-page-footer {
          text-align: center;
          font-size: 0.78rem;
          color: var(--text-secondary, #64716B);
        }
      `}</style>
    </div>
  );
}
