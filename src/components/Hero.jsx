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
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsAppIcon, TwitterXIcon } from './BrandIcons';

export default function Hero({ profile, siteSettings, socialLinks }) {
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -75;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const getSocialIcon = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'github': return <GithubIcon size={18} />;
      case 'linkedin': return <LinkedinIcon size={18} />;
      case 'instagram': return <InstagramIcon size={18} />;
      case 'whatsapp': return <WhatsAppIcon size={18} />;
      case 'twitter':
      case 'x': return <TwitterXIcon size={18} />;
      case 'email':
      case 'mail': return <Mail size={18} />;
      default: return <ExternalLink size={18} />;
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        {/* Left Column: Headline & Value Proposition */}
        <div className="hero-left">
          {/* Availability Pill Indicator */}
          <div className="availability-badge hero-anim-badge">
            <span className="status-dot dot-online" />
            <span className="availability-text">
              {profile?.availability || 'Tersedia untuk Magang & Peluang Kerja'}
            </span>
          </div>

          <h1 className="hero-headline hero-anim-headline">
            <span className="headline-line hero-anim-headline-line-1">
              {siteSettings?.hero_headline_prefix || 'Membangun Antarmuka Web yang'}{' '}
            </span>
            <span className="headline-highlight headline-line hero-anim-headline-line-2">
              {siteSettings?.hero_headline_highlight || 'Bermakna, Bersih & Terukur.'}
            </span>
          </h1>

          <p className="hero-description hero-anim-description">
            {profile?.short_bio ||
              'Mahasiswa tingkat akhir Manajemen Informatika yang berfokus pada rancang bangun aplikasi web modern, performa tinggi, dan antarmuka ramah pengguna.'}
          </p>

          {/* Action Buttons */}
          <div className="hero-actions">
            <button
              onClick={() => handleScrollTo('projects')}
              className="btn btn-primary hero-anim-action-1"
            >
              <FolderGit2 size={18} />
              <span>Lihat Proyek Pilihan</span>
            </button>

            <button
              onClick={() => handleScrollTo('contact')}
              className="btn btn-secondary hero-anim-action-2"
            >
              <Mail size={18} />
              <span>Hubungi Saya</span>
            </button>

            <a
              href="#cv"
              onClick={(e) => {
                e.preventDefault();
                alert('Mengunduh CV Portofolio Rahman Kurniawan (Format PDF)...');
              }}
              className="btn btn-ghost hero-anim-action-3"
              title="Unduh Curriculum Vitae"
            >
              <Download size={17} />
              <span>Unduh CV</span>
            </a>
          </div>

          {/* Social Quick Bar */}
          <div className="hero-social-bar hero-anim-action-3">
            <span className="hero-social-label">Media Sosial:</span>
            <div className="hero-social-icons">
              {(socialLinks && socialLinks.length > 0 ? socialLinks : [
                { id: 1, platform: 'GitHub', url: 'https://github.com/rahmankur123', label: 'GitHub' },
                { id: 3, platform: 'Instagram', url: 'https://instagram.com/rahmnkrn', label: 'Instagram' },
                { id: 4, platform: 'WhatsApp', url: 'https://wa.me/6289648920876', label: 'WhatsApp' }
              ]).map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-pill"
                  title={link.label || link.platform}
                  aria-label={link.platform}
                >
                  {getSocialIcon(link.platform)}
                  <span>{link.platform}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Metrics Banner */}
          <div className="hero-metrics">
            <div className="metric-item hero-anim-metric-1">
              <span className="metric-number">3.94</span>
              <span className="metric-label">IPK Teknologi Rekayasa Perangkat Lunak</span>
            </div>
            <div className="metric-divider hero-anim-metric-2" />
            <div className="metric-item hero-anim-metric-3">
              <span className="metric-number">8+</span>
              <span className="metric-label">Proyek Web Selesai</span>
            </div>
            <div className="metric-divider hero-anim-metric-4" />
            <div className="metric-item hero-anim-metric-5">
              <span className="metric-number">&lt; 24h</span>
              <span className="metric-label">Waktu Respons Pesan</span>
            </div>
          </div>
        </div>

        {/* Right Column: Profile Summary Card */}
        <div className="hero-right hero-anim-card">
          <div className="profile-card card hero-float">
            {/* Header / Avatar */}
            <div className="profile-card-header hero-anim-card-inner-1">
              <div className="avatar-wrapper">
                <img
                  src={profile?.profile_image || profile?.avatar_url}
                  alt={profile?.full_name || 'Foto Profil'}
                  className="profile-avatar-img"
                  onError={(e) => {
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
            <div className="profile-meta-list hero-anim-card-inner-2">
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
            <div className="profile-tech-stack hero-anim-card-inner-3">
              <span className="tech-stack-title">Fokus Teknologi Inti</span>
              <div className="tech-pill-group">
                <span className="tech-pill">React</span>
                <span className="tech-pill">Node.js</span>
                <span className="tech-pill">Express</span>
                <span className="tech-pill">MySQL</span>
                <span className="tech-pill">Vite</span>
                <span className="tech-pill">REST API</span>
                <span className="tech-pill">TypeScript</span>
                <span className="tech-pill">HTML & CSS</span>
                <span className="tech-pill">PHP</span>
                <span className="tech-pill">Laravel</span>
                <span className="tech-pill">Postgresql</span>
              </div>
            </div>

            {/* Profile Card Footer / Quick Links */}
            <div className="profile-card-footer hero-anim-card-inner-4">
              <div className="profile-social-group">
                {(socialLinks && socialLinks.length > 0 ? socialLinks.slice(0, 4) : [
                  { id: 1, platform: 'GitHub', url: 'https://github.com/rahmankur123' },
                  { id: 3, platform: 'Instagram', url: 'https://instagram.com/rahmnkrn' },
                  { id: 4, platform: 'WhatsApp', url: 'https://wa.me/6289648920876' }
                ]).map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-btn"
                    title={link.label || link.platform}
                    aria-label={link.platform}
                  >
                    {getSocialIcon(link.platform)}
                  </a>
                ))}
              </div>
              <button
                onClick={() => handleScrollTo('about')}
                className="btn btn-ghost btn-sm profile-details-link"
              >
                <span>Biografi</span>
                <ArrowDown size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ===================== KEYFRAMES ===================== */
        @keyframes heroFadeInDown {
          from {
            opacity: 0;
            transform: translateY(-18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroFadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes heroFadeInLeft {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes heroFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes heroPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.35);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
          }
        }

        /* ===================== ANIMATION CLASSES ===================== */

        /* Availability badge — fade-in slide-down */
        .hero-anim-badge {
          animation: heroFadeInDown 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
        }

        /* Headline line 1 — fade-in slide-up */
        .hero-anim-headline {
          overflow: hidden;
        }
        .hero-anim-headline-line-1 {
          display: inline;
          animation: heroFadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.25s both;
        }

        /* Headline line 2 (highlight) — fade-in slide-up staggered */
        .hero-anim-headline-line-2 {
          animation: heroFadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both;
        }

        /* Description — fade-in */
        .hero-anim-description {
          animation: heroFadeIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.55s both;
        }

        /* Action buttons — fade-in slide-up staggered */
        .hero-anim-action-1 {
          animation: heroFadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.65s both;
        }
        .hero-anim-action-2 {
          animation: heroFadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.75s both;
        }
        .hero-anim-action-3 {
          animation: heroFadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.85s both;
        }

        /* Metrics — fade-in staggered */
        .hero-anim-metric-1 {
          animation: heroFadeIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.9s both;
        }
        .hero-anim-metric-2 {
          animation: heroFadeIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) 1.0s both;
        }
        .hero-anim-metric-3 {
          animation: heroFadeIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) 1.05s both;
        }
        .hero-anim-metric-4 {
          animation: heroFadeIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) 1.15s both;
        }
        .hero-anim-metric-5 {
          animation: heroFadeIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) 1.2s both;
        }

        /* Profile card — fade-in slide-left */
        .hero-anim-card {
          animation: heroFadeInLeft 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both;
        }

        /* Profile card subtle floating */
        .hero-float {
          animation: heroFloat 5s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        /* Profile card inner elements — stagger fade-in */
        .hero-anim-card-inner-1 {
          animation: heroFadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.6s both;
        }
        .hero-anim-card-inner-2 {
          animation: heroFadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.75s both;
        }
        .hero-anim-card-inner-3 {
          animation: heroFadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.9s both;
        }
        .hero-anim-card-inner-4 {
          animation: heroFadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) 1.05s both;
        }

        /* Status dot pulse */
        .hero-anim-badge .status-dot.dot-online {
          animation: heroPulse 2.5s ease-in-out infinite;
          animation-delay: 1s;
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .hero-anim-badge,
          .hero-anim-headline-line-1,
          .hero-anim-headline-line-2,
          .hero-anim-description,
          .hero-anim-action-1,
          .hero-anim-action-2,
          .hero-anim-action-3,
          .hero-anim-metric-1,
          .hero-anim-metric-2,
          .hero-anim-metric-3,
          .hero-anim-metric-4,
          .hero-anim-metric-5,
          .hero-anim-card,
          .hero-anim-card-inner-1,
          .hero-anim-card-inner-2,
          .hero-anim-card-inner-3,
          .hero-anim-card-inner-4,
          .hero-float,
          .hero-anim-badge .status-dot.dot-online {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }

        /* ===================== LAYOUT & DESIGN ===================== */

        .hero-section {
          padding-top: 3.5rem;
          padding-bottom: 5rem;
          border-bottom: 1px solid var(--border-subtle);
          background: linear-gradient(180deg, rgba(232, 241, 236, 0.3) 0%, rgba(247, 247, 243, 0) 100%);
          overflow: hidden;
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
          display: inline;
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

        .hero-social-bar {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .hero-social-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .hero-social-icons {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .hero-social-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
          background-color: var(--bg-surface);
          border: 1px solid var(--border-default);
          box-shadow: var(--shadow-xs);
          transition: all var(--transition-fast);
        }

        .hero-social-pill:hover {
          color: var(--primary-green);
          border-color: var(--primary-green-border);
          background-color: var(--primary-green-light);
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }

        .profile-social-group {
          display: flex;
          align-items: center;
          gap: 0.45rem;
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
