import React, { useState, useEffect } from 'react';
import {
  Database,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Save,
  Sparkles,
  Check,
  Cpu
} from './Icons';
import {
  isSupabaseConfigured,
  getSupabaseCredentials,
  saveCustomSupabaseCredentials,
  syncCredentialsFromServer,
  testSupabaseConnection
} from '../services/supabaseClient';
import { seedAllDataToSupabase } from '../services/portfolioStorage';

export default function SupabaseConfigCard({ onRefreshData }) {
  const [credentials, setCredentials] = useState(() => getSupabaseCredentials());
  const [isConnected, setIsConnected] = useState(() => isSupabaseConfigured());
  const [testingStatus, setTestingStatus] = useState(null); // { loading: boolean, success?: boolean, message?: string }
  const [seedingStatus, setSeedingStatus] = useState(null); // { loading: boolean, success?: boolean, message?: string }
  const [showSqlGuide, setShowSqlGuide] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  useEffect(() => {
    syncCredentialsFromServer().then((creds) => {
      if (creds && creds.url) {
        setCredentials(creds);
      }
      setIsConnected(isSupabaseConfigured());
    });
  }, []);

  const handleSaveCredentials = (e) => {
    e.preventDefault();
    saveCustomSupabaseCredentials(credentials.url, credentials.anonKey);
    const configured = isSupabaseConfigured();
    setIsConnected(configured);
    setTestingStatus({
      loading: false,
      success: true,
      message: configured
        ? 'Kredensial berhasil disimpan! Silakan klik "Uji Koneksi" untuk memverifikasi.'
        : 'Kredensial dihapus / kosong. Sistem kembali ke mode LocalStorage.'
    });
  };

  const handleTestConnection = async () => {
    setTestingStatus({ loading: true });
    const res = await testSupabaseConnection(credentials.url, credentials.anonKey);
    setTestingStatus({
      loading: false,
      success: res.success,
      tableMissing: res.tableMissing,
      message: res.message
    });
    if (res.success && !res.tableMissing) {
      setIsConnected(true);
      if (onRefreshData) onRefreshData();
    }
  };

  const handleSeedData = async () => {
    if (!window.confirm('Apakah Anda yakin ingin mengisi tabel Supabase dengan data awal portofolio lengkap?')) {
      return;
    }
    setSeedingStatus({ loading: true });
    try {
      const res = await seedAllDataToSupabase();
      setSeedingStatus({ loading: false, success: true, message: res.message });
      if (onRefreshData) onRefreshData();
    } catch (err) {
      setSeedingStatus({
        loading: false,
        success: false,
        message: err.message || 'Gagal sinkronisasi data ke Supabase.'
      });
    }
  };

  const handleCopySqlLocation = () => {
    navigator.clipboard?.writeText('supabase_schema.sql');
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="supabase-card-wrapper card">
      {/* Header */}
      <div className="supabase-card-header">
        <div className="supabase-header-left">
          <div className="supabase-icon-badge">
            <Database size={22} className="supabase-brand-icon" />
          </div>
          <div>
            <div className="supabase-title-row">
              <h3 className="supabase-title">Database Supabase (Cloud PostgreSQL)</h3>
              <span className={`status-pill ${isConnected ? 'status-connected' : 'status-disconnected'}`}>
                <span className="status-dot" />
                {isConnected ? 'Terhubung (Cloud Live)' : 'Mode Lokal (Offline Fallback)'}
              </span>
            </div>
            <p className="supabase-subtitle">
              Simpan profil, proyek, galeri foto dokumentasi, dan kotak masuk secara terpusat di cloud Supabase.
            </p>
          </div>
        </div>

        <a
          href="https://supabase.com/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-supabase-dashboard"
          title="Buka Dashboard Supabase"
        >
          <ExternalLink size={14} />
          <span>Buka Supabase</span>
        </a>
      </div>

      {/* Form Input URL & Anon Key */}
      <form onSubmit={handleSaveCredentials} className="supabase-form">
        <div className="supabase-fields-row">
          <div className="supabase-field-group">
            <label className="supabase-label">
              <span>Project URL</span>
              <span className="label-sub">(Contoh: https://xyzcompany.supabase.co)</span>
            </label>
            <input
              type="url"
              placeholder="https://xyzcompany.supabase.co"
              value={credentials.url}
              onChange={(e) => setCredentials({ ...credentials, url: e.target.value })}
              className="cms-input supabase-input"
            />
          </div>

          <div className="supabase-field-group">
            <label className="supabase-label">
              <span>Anon Public Key</span>
              <span className="label-sub">(Kunci anon / public dari Project Settings &gt; API)</span>
            </label>
            <input
              type="password"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={credentials.anonKey}
              onChange={(e) => setCredentials({ ...credentials, anonKey: e.target.value })}
              className="cms-input supabase-input"
            />
          </div>
        </div>

        {/* Buttons Row */}
        <div className="supabase-actions-bar">
          <button type="submit" className="btn-supabase-save">
            <Save size={16} />
            <span>Simpan Kredensial</span>
          </button>

          <button
            type="button"
            onClick={handleTestConnection}
            disabled={testingStatus?.loading}
            className="btn-supabase-test"
          >
            <RefreshCw size={15} className={testingStatus?.loading ? 'spin-icon' : ''} />
            <span>{testingStatus?.loading ? 'Menguji...' : 'Uji Koneksi'}</span>
          </button>

          <button
            type="button"
            onClick={handleSeedData}
            disabled={seedingStatus?.loading || !isConnected}
            className="btn-supabase-seed"
            title="Isi seluruh tabel Supabase dengan data awal portofolio yang ada di sistem"
          >
            <Sparkles size={15} className={seedingStatus?.loading ? 'spin-icon' : ''} />
            <span>{seedingStatus?.loading ? 'Menyinkronkan...' : 'Sinkronkan Data Awal ke Supabase'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowSqlGuide(!showSqlGuide)}
            className="btn-supabase-toggle-sql"
          >
            <span>{showSqlGuide ? 'Tutup Panduan SQL' : 'Lihat Panduan Tabel & SQL'}</span>
          </button>
        </div>
      </form>

      {/* Feedback Messages */}
      {testingStatus && !testingStatus.loading && (
        <div className={`supabase-feedback-alert ${testingStatus.success ? (testingStatus.tableMissing ? 'alert-warning' : 'alert-success') : 'alert-error'}`}>
          {testingStatus.success ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{testingStatus.message}</span>
        </div>
      )}

      {seedingStatus && !seedingStatus.loading && (
        <div className={`supabase-feedback-alert ${seedingStatus.success ? 'alert-success' : 'alert-error'}`}>
          {seedingStatus.success ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{seedingStatus.message}</span>
        </div>
      )}

      {/* SQL Schema Quick Guide */}
      {showSqlGuide && (
        <div className="supabase-sql-guide">
          <div className="sql-guide-header">
            <h4>Langkah Mudah Setup Database Supabase:</h4>
            <button
              type="button"
              onClick={handleCopySqlLocation}
              className="btn-copy-sql"
              title="Salin nama file skema SQL"
            >
              {copiedSql ? <Check size={14} /> : <Save size={14} />}
              <span>{copiedSql ? 'Tersalin!' : 'File: supabase_schema.sql'}</span>
            </button>
          </div>
          <ol className="sql-steps-list">
            <li>Buka dashboard project Anda di <strong>Supabase</strong>.</li>
            <li>Klik menu <strong>SQL Editor</strong> di bilah navigasi kiri.</li>
            <li>
              Buka file <code>supabase_schema.sql</code> di folder root proyek ini, salin seluruh kodenya, lalu tempel di SQL Editor Supabase.
            </li>
            <li>Klik tombol <strong>Run</strong> untuk membuat 9 tabel, RLS policy, dan bucket penyimpanan foto <code>portfolio-images</code>.</li>
            <li>Masukkan <strong>Project URL</strong> dan <strong>Anon Key</strong> di atas, lalu klik <strong>Simpan Kredensial</strong> &amp; <strong>Uji Koneksi</strong>.</li>
          </ol>
        </div>
      )}

      <style>{`
        .supabase-card-wrapper {
          background: #0E1614;
          border: 1px solid #24352F;
          border-radius: 14px;
          padding: 1.35rem 1.5rem;
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        }

        .supabase-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .supabase-header-left {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .supabase-icon-badge {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #172420;
          border: 1px solid #2B3D37;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2DD4BF;
          flex-shrink: 0;
        }

        .supabase-title-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .supabase-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #FAFAF7;
          margin: 0;
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.2rem 0.65rem;
          border-radius: 999px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .status-connected {
          background: rgba(45, 212, 191, 0.12);
          border: 1px solid rgba(45, 212, 191, 0.35);
          color: #2DD4BF;
        }

        .status-connected .status-dot {
          background: #2DD4BF;
          box-shadow: 0 0 8px #2DD4BF;
        }

        .status-disconnected {
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          color: #FBBF24;
        }

        .status-disconnected .status-dot {
          background: #FBBF24;
        }

        .supabase-subtitle {
          font-size: 0.8rem;
          color: #94A3B8;
          margin: 0.25rem 0 0 0;
        }

        .btn-supabase-dashboard {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.45rem 0.8rem;
          border-radius: 8px;
          background: #172420;
          border: 1px solid #2B3D37;
          color: #FAFAF7;
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .btn-supabase-dashboard:hover {
          background: #22332D;
          border-color: #2DD4BF;
          color: #2DD4BF;
        }

        /* Form */
        .supabase-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .supabase-fields-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .supabase-fields-row {
            grid-template-columns: 1fr;
          }
        }

        .supabase-field-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .supabase-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: #E2E8F0;
        }

        .label-sub {
          font-size: 0.7rem;
          font-weight: 400;
          color: #64748B;
        }

        .supabase-input {
          background: #080D0B;
          border: 1px solid #24352F;
          border-radius: 8px;
          padding: 0.55rem 0.85rem;
          color: #FAFAF7;
          font-size: 0.825rem;
          outline: none;
          transition: border-color 0.15s ease;
        }

        .supabase-input:focus {
          border-color: #2DD4BF;
        }

        /* Buttons bar */
        .supabase-actions-bar {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
        }

        .btn-supabase-save {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #17634D;
          border: 1px solid #2DD4BF;
          color: #FFFFFF;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-supabase-save:hover {
          background: #1B755B;
        }

        .btn-supabase-test {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #172420;
          border: 1px solid #2B3D37;
          color: #E2E8F0;
          padding: 0.5rem 0.9rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-supabase-test:hover:not(:disabled) {
          border-color: #2DD4BF;
          color: #FFFFFF;
        }

        .btn-supabase-seed {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(45, 212, 191, 0.1);
          border: 1px solid rgba(45, 212, 191, 0.3);
          color: #2DD4BF;
          padding: 0.5rem 0.9rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-supabase-seed:hover:not(:disabled) {
          background: rgba(45, 212, 191, 0.18);
          border-color: #2DD4BF;
        }

        .btn-supabase-seed:disabled,
        .btn-supabase-test:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-supabase-toggle-sql {
          margin-left: auto;
          background: transparent;
          border: none;
          color: #94A3B8;
          font-size: 0.78rem;
          cursor: pointer;
          text-decoration: underline;
        }

        .btn-supabase-toggle-sql:hover {
          color: #FAFAF7;
        }

        .spin-icon {
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Alerts */
        .supabase-feedback-alert {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.65rem 0.9rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .alert-success {
          background: rgba(45, 212, 191, 0.12);
          border: 1px solid rgba(45, 212, 191, 0.3);
          color: #2DD4BF;
        }

        .alert-warning {
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.3);
          color: #FBBF24;
        }

        .alert-error {
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #FCA5A5;
        }

        /* SQL Guide */
        .supabase-sql-guide {
          background: #090F0D;
          border: 1px solid #1E2D27;
          border-radius: 10px;
          padding: 1rem 1.25rem;
          margin-top: 0.5rem;
        }

        .sql-guide-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.6rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .sql-guide-header h4 {
          font-size: 0.85rem;
          font-weight: 700;
          color: #2DD4BF;
          margin: 0;
        }

        .btn-copy-sql {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          background: #172420;
          border: 1px solid #2B3D37;
          color: #FAFAF7;
          cursor: pointer;
        }

        .btn-copy-sql:hover {
          border-color: #2DD4BF;
          color: #2DD4BF;
        }

        .sql-steps-list {
          margin: 0;
          padding-left: 1.2rem;
          font-size: 0.8rem;
          color: #CBD5E1;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .sql-steps-list code {
          background: #172420;
          color: #2DD4BF;
          padding: 0.1rem 0.35rem;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.78rem;
        }
      `}</style>
    </div>
  );
}
