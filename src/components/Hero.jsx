import React from 'react';
import {
  ArrowDown,
  Mail,
  MapPin,
  Clock,
  Download,
  FolderGit2,
  CheckCircle2,
  Sparkles,
  ExternalLink
} from './Icons';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

export default function Hero({ profile, siteSettings }) {
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -75;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        {/* Left Column: Headline & Value Proposition */}
        <div className="hero-left">
          {/* Availability Pill Indicator */}
          <div className="availability-badge">
            <span className="status-dot dot-online" />
            <span className="availability-text">
              {profile?.availability || 'Tersedia untuk Magang & Peluang Kerja'}
            </span>
          </div>

          <h1 className="hero-headline">
            {siteSettings?.hero_headline_prefix || 'Membangun Antarmuka Web yang'}{' '}
            <span className="headline-highlight">
              {siteSettings?.hero_headline_highlight || 'Bermakna, Bersih & Terukur.'}
            </span>
          </h1>

          <p className="hero-description">
            {profile?.short_bio ||
              'Mahasiswa tingkat akhir Manajemen Informatika yang berfokus pada rancang bangun aplikasi web modern, performa tinggi, dan antarmuka ramah pengguna.'}
          </p>

          {/* Action Buttons */}
          <div className="hero-actions">
            <button
              onClick={() => handleScrollTo('projects')}
              className="btn btn-primary"
            >
              <FolderGit2 size={18} />
              <span>Lihat Proyek Pilihan</span>
            </button>

            <button
              onClick={() => handleScrollTo('contact')}
              className="btn btn-secondary"
            >
              <Mail size={18} />
              <span>Hubungi Saya</span>
            </button>

            <a
              href="#cv"
              onClick={(e) => {
                e.preventDefault();
                alert('Mengunduh CV Portofolio Alifian Ramadhan (Format PDF)...');
              }}
              className="btn btn-ghost"
              title="Unduh Curriculum Vitae"
            >
              <Download size={17} />
              <span>Unduh CV</span>
            </a>
          </div>

          {/* Quick Metrics Banner */}
          <div className="hero-metrics">
            <div className="metric-item">
              <span className="metric-number">3.88</span>
              <span className="metric-label">IPK Manajemen Informatika</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-item">
              <span className="metric-number">8+</span>
              <span className="metric-label">Proyek Web Selesai</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-item">
              <span className="metric-number">&lt; 24h</span>
              <span className="metric-label">Waktu Respons Pesan</span>
            </div>
          </div>
        </div>

        {/* Right Column: Profile Summary Card (PRD 4.2) */}
        <div className="hero-right">
          <div className="profile-card card">
            {/* Header / Avatar */}
            <div className="profile-card-header">
              <div className="avatar-wrapper">
                <img
                  src={profile?.profile_image || profile?.avatar_url}
                  alt={profile?.full_name || 'Foto Profil'}
                  className="profile-avatar-img"
                  onError={(e) => {
                    // Fallback inisial konsisten jika gambar tidak termuat (PRD 4.2)
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.nextSibling) e.currentTarget.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="avatar-initials-fallback" style={{ display: 'none' }}>
                  <span>AR</span>
                </div>
                <div className="avatar-verified-badge" title="Profil Terverifikasi">
                  <CheckCircle2 size={18} color="#FFFFFF" fill="#17634D" />
                </div>
              </div>

              <div className="profile-identity">
                <h3 className="profile-name">{profile?.full_name || 'Alifian Ramadhan'}</h3>
                <p className="profile-headline">{profile?.headline || 'Junior Full-Stack Web Developer'}</p>
              </div>
            </div>

            {/* Profile Meta Details */}
            <div className="profile-meta-list">
              <div className="profile-meta-item">
                <MapPin size={16} className="meta-icon" />
                <span className="meta-text">{profile?.location || 'Surabaya, Indonesia'}</span>
              </div>
              <div className="profile-meta-item">
                <Clock size={16} className="meta-icon" />
                <span className="meta-text">{profile?.response_time || 'Merespons dalam < 24 jam'}</span>
              </div>
              <div className="profile-meta-item">
                <Mail size={16} className="meta-icon" />
                <span className="meta-text email-text">{profile?.public_email || 'alifian.work@example.com'}</span>
              </div>
            </div>

            {/* Focus Technologies Pill Grid */}
            <div className="profile-tech-stack">
              <span className="tech-stack-title">Fokus Teknologi Inti</span>
              <div className="tech-pill-group">
                <span className="tech-pill">React</span>
                <span className="tech-pill">Node.js</span>
                <span className="tech-pill">Express</span>
                <span className="tech-pill">MySQL</span>
                <span className="tech-pill">Vite</span>
                <span className="tech-pill">REST API</span>
              </div>
            </div>

            {/* Profile Card Footer / Quick Links */}
            <div className="profile-card-footer">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="GitHub Profile"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={18} />
              </a>
              <button
                onClick={() => handleScrollTo('about')}
                className="btn btn-ghost btn-sm profile-details-link"
              >
                <span>Lihat Biografi Lengkap</span>
                <ArrowDown size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding-top: 3.5rem;
          padding-bottom: 5rem;
          border-bottom: 1px solid var(--border-subtle);
          background: linear-gradient(180deg, rgba(232, 241, 236, 0.3) 0%, rgba(247, 247, 243, 0) 100%);
        }

        @media (min-width: 992px) {
          .hero-section {
            padding-top: 4.5rem;
            padding-bottom: 6.5rem;
          }
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }

        @media (min-width: 992px) {
          .hero-container {
            grid-template-columns: 1.2fr 0.9fr;
            gap: 4rem;
          }
        }

        /* Left Column */
        .hero-left {
          display: flex;
          flex-direction: column;
        }

        .availability-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.4rem 0.95rem;
          background-color: var(--status-online-bg);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: var(--radius-full);
          width: fit-content;
          margin-bottom: 1.5rem;
        }

        .availability-text {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--status-online-text);
        }

        .hero-headline {
          font-size: 2.35rem;
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
        }

        @media (min-width: 768px) {
          .hero-headline {
            font-size: 3.15rem;
          }
        }

        .headline-highlight {
          color: var(--primary-green);
          position: relative;
          display: inline-block;
        }

        .hero-description {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          max-width: 580px;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 2.5rem;
        }

        .hero-metrics {
          display: flex;
          align-items: center;
          gap: 1.75rem;
          padding-top: 1.75rem;
          border-top: 1px solid var(--border-default);
        }

        .metric-item {
          display: flex;
          flex-direction: column;
        }

        .metric-number {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--primary-green);
          line-height: 1.1;
        }

        .metric-label {
          font-size: 0.775rem;
          color: var(--text-secondary);
          margin-top: 0.25rem;
        }

        .metric-divider {
          width: 1px;
          height: 36px;
          background-color: var(--border-default);
        }

        /* Right Column - Profile Card */
        .hero-right {
          display: flex;
          justify-content: center;
        }

        .profile-card {
          width: 100%;
          max-width: 440px;
          padding: 2rem;
          border: 1px solid var(--border-default);
          border-radius: var(--radius-xl);
          background-color: var(--bg-surface);
          box-shadow: var(--shadow-lg);
          position: relative;
        }

        .profile-card-header {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .avatar-wrapper {
          position: relative;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 3px solid var(--primary-green-pale);
          overflow: visible;
          flex-shrink: 0;
        }

        .profile-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .avatar-initials-fallback {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: var(--primary-green);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .avatar-verified-badge {
          position: absolute;
          bottom: 0;
          right: 0;
          background-color: #FFFFFF;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-identity {
          display: flex;
          flex-direction: column;
        }

        .profile-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .profile-headline {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-top: 0.25rem;
        }

        .profile-meta-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 1.25rem 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .profile-meta-item {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .meta-icon {
          color: var(--primary-green);
          flex-shrink: 0;
        }

        .meta-text {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .email-text {
          font-weight: 500;
          color: var(--text-primary);
        }

        .profile-tech-stack {
          padding-top: 1.25rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .tech-stack-title {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          margin-bottom: 0.65rem;
        }

        .tech-pill-group {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .tech-pill {
          font-size: 0.775rem;
          font-weight: 600;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          background-color: var(--primary-green-light);
          color: var(--primary-green);
          border: 1px solid var(--primary-green-border);
        }

        .profile-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.25rem;
        }

        .social-icon-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          background-color: var(--bg-surface-alt);
          color: var(--text-secondary);
          border: 1px solid var(--border-default);
          transition: all var(--transition-fast);
        }

        .social-icon-btn:hover {
          background-color: var(--primary-green-light);
          color: var(--primary-green);
          border-color: var(--primary-green-border);
        }

        .profile-details-link {
          font-size: 0.8rem;
          padding: 0.4rem 0.65rem;
        }
      `}</style>
    </section>
  );
}
