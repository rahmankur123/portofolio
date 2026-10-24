import React from 'react';
import {
  ArrowUp,
  Mail,
  Sliders
} from './Icons';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './BrandIcons';

export default function Footer({ profile, socialLinks, onOpenAdmin, siteSettings }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSocialIcon = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'github':
        return <GithubIcon size={18} />;
      case 'linkedin':
        return <LinkedinIcon size={18} />;
      case 'email':
      case 'mail':
        return <Mail size={18} />;
      case 'instagram':
        return <InstagramIcon size={18} />;
      default:
        return <Mail size={18} />;
    }
  };

  return (
    <footer className="footer-wrapper">
      <div className="container footer-container">
        {/* Main Footer Row */}
        <div className="footer-top-row">
          {/* Brand & Bio */}
          <div className="footer-brand-column">
            <div className="footer-brand">
              <div className="footer-logo">AR</div>
              <span className="footer-brand-title">{profile?.full_name || 'Alifian Ramadhan'}</span>
            </div>
            <p className="footer-tagline">
              {siteSettings?.footer_text ||
                'Personal Portfolio & CMS — Dibangun dengan pendekatan minimalis, arsitektur REST API, dan basis data terstruktur.'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links-column">
            <h4 className="footer-col-title">Navigasi Halaman</h4>
            <div className="footer-nav-list">
              <a href="#about" className="footer-nav-link">Profil Profesional</a>
              <a href="#pendidikan" className="footer-nav-link">Riwayat Pendidikan</a>
              <a href="#pengalaman" className="footer-nav-link">Pengalaman Kerja</a>
              <a href="#skills" className="footer-nav-link">Daftar Keahlian</a>
              <a href="#projects" className="footer-nav-link">Studi Kasus Proyek</a>
              <a href="#contact" className="footer-nav-link">Kirim Pesan</a>
            </div>
          </div>

          {/* Socials & Admin Trigger */}
          <div className="footer-social-column">
            <h4 className="footer-col-title">Terhubung & Kelola</h4>
            <div className="footer-social-icons">
              {socialLinks &&
                socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-btn"
                    title={link.label}
                    aria-label={link.platform}
                  >
                    {getSocialIcon(link.platform)}
                  </a>
                ))}
            </div>

            <button onClick={onOpenAdmin} className="btn btn-secondary btn-sm footer-admin-btn">
              <Sliders size={14} />
              <span>Buka Admin CMS Preview</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            &copy; {siteSettings?.copyright_year || 2026} {profile?.full_name || 'Alifian Ramadhan'}. Seluruh Hak Cipta Dilindungi. Sesuai Dokumen PRD v1.0.
          </p>

          <button onClick={scrollToTop} className="back-to-top-btn" aria-label="Kembali ke atas">
            <span>Kembali ke atas</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>

      <style>{`
        .footer-wrapper {
          background-color: #0E1715;
          color: #FAFAF7;
          padding-top: 4.5rem;
          padding-bottom: 2.5rem;
        }

        .footer-container {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .footer-top-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }

        @media (min-width: 768px) {
          .footer-top-row {
            grid-template-columns: 1.5fr 1fr 1fr;
            gap: 3rem;
          }
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .footer-logo {
          width: 36px;
          height: 36px;
          background-color: var(--primary-green);
          color: #FFFFFF;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.9rem;
        }

        .footer-brand-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #FFFFFF;
        }

        .footer-tagline {
          font-size: 0.9rem;
          color: #8E9C96;
          line-height: 1.6;
          max-width: 380px;
        }

        .footer-col-title {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #FAFAF7;
          margin-bottom: 1.15rem;
        }

        .footer-nav-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .footer-nav-link {
          font-size: 0.875rem;
          color: #8E9C96;
          transition: color var(--transition-fast);
        }

        .footer-nav-link:hover {
          color: #10B981;
        }

        .footer-social-icons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 1.25rem;
        }

        .footer-social-btn {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          background-color: #17221F;
          border: 1px solid #243530;
          color: #CAD5CF;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .footer-social-btn:hover {
          background-color: var(--primary-green);
          color: #FFFFFF;
          border-color: var(--primary-green);
          transform: translateY(-2px);
        }

        .footer-admin-btn {
          background-color: #17221F;
          border-color: #243530;
          color: #CAD5CF;
        }

        .footer-admin-btn:hover {
          background-color: var(--primary-green);
          color: #FFFFFF;
          border-color: var(--primary-green);
        }

        .footer-bottom-bar {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding-top: 2rem;
          border-top: 1px solid #1C2B26;
          align-items: center;
          text-align: center;
        }

        @media (min-width: 768px) {
          .footer-bottom-bar {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }
        }

        .copyright-text {
          font-size: 0.825rem;
          color: #64716B;
        }

        .back-to-top-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.825rem;
          font-weight: 600;
          color: #8E9C96;
          transition: color var(--transition-fast);
        }

        .back-to-top-btn:hover {
          color: #FFFFFF;
        }
      `}</style>
    </footer>
  );
}
