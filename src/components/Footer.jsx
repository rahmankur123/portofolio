import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUp,
  Mail,
  Sliders
} from './Icons';
import { GithubIcon, LinkedinIcon, InstagramIcon, TwitterXIcon, WhatsAppIcon } from './BrandIcons';

export default function Footer({ profile, socialLinks, onOpenAdmin, siteSettings }) {
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
      case 'twitter':
      case 'x':
        return <TwitterXIcon size={18} />;
      case 'whatsapp':
        return <WhatsAppIcon size={18} />;
      default:
        return <Mail size={18} />;
    }
  };

  const getInitials = (name) => {
    if (!name) return 'RK';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <footer className={`footer-wrapper ${isVisible ? 'footer-visible' : ''}`} ref={footerRef}>
      <div className="container footer-container">
        {/* Main Footer Row */}
        <div className="footer-top-row">
          {/* Brand & Bio */}
          <div className="footer-brand-column footer-fade-item" style={{ transitionDelay: '0.1s' }}>
            <div className="footer-brand">
              <div className="footer-logo">{getInitials(profile?.full_name || 'Rahman Kurniawan')}</div>
              <span className="footer-brand-title">{profile?.full_name || 'Rahman Kurniawan'}</span>
            </div>
            <p className="footer-tagline">
              {siteSettings?.footer_text ||
                'Personal Portfolio & CMS — Dibangun dengan pendekatan minimalis, arsitektur REST API, dan basis data terstruktur.'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links-column footer-fade-item" style={{ transitionDelay: '0.25s' }}>
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
          <div className="footer-social-column footer-fade-item" style={{ transitionDelay: '0.4s' }}>
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
              <span>Dashboard</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar footer-fade-item" style={{ transitionDelay: '0.55s' }}>
          <p className="copyright-text">
            {siteSettings?.footer_copyright || (
              <>&copy; {siteSettings?.copyright_year || 2026} {profile?.full_name || 'Rahman Kurniawan'}. Seluruh Hak Cipta Dilindungi.</>
            )}
          </p>

          <button onClick={scrollToTop} className="back-to-top-btn" aria-label="Kembali ke atas">
            <span>Kembali ke atas</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>

      <style>{`
        /* ── Fade-in animation ── */
        @keyframes footerFadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .footer-fade-item {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .footer-visible .footer-fade-item {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Base ── */
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

        /* ── Brand ── */
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

        /* ── Column title ── */
        .footer-col-title {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #FAFAF7;
          margin-bottom: 1.15rem;
          position: relative;
          padding-bottom: 0.65rem;
        }

        .footer-col-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 28px;
          height: 2px;
          background: var(--primary-green);
          border-radius: 2px;
        }

        /* ── Nav links ── */
        .footer-nav-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .footer-nav-link {
          font-size: 0.875rem;
          color: #8E9C96;
          transition: color 0.25s ease, transform 0.25s ease;
          display: inline-block;
        }

        .footer-nav-link:hover {
          color: #10B981;
          transform: translateX(4px);
        }

        /* ── Social icons ── */
        .footer-social-icons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 1.25rem;
        }

        .footer-social-btn {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          background-color: #17221F;
          border: 1px solid #243530;
          color: #CAD5CF;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }

        .footer-social-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--primary-green);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: inherit;
        }

        .footer-social-btn:hover::before {
          opacity: 1;
        }

        .footer-social-btn svg {
          position: relative;
          z-index: 1;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .footer-social-btn:hover {
          color: #FFFFFF;
          border-color: var(--primary-green);
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.25);
        }

        .footer-social-btn:hover svg {
          transform: scale(1.15);
        }

        /* ── Admin button ── */
        .footer-admin-btn {
          background-color: #17221F;
          border-color: #243530;
          color: #CAD5CF;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .footer-admin-btn:hover {
          background-color: var(--primary-green);
          color: #FFFFFF;
          border-color: var(--primary-green);
          box-shadow: 0 4px 16px rgba(16, 185, 129, 0.2);
        }

        /* ── Bottom bar ── */
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
          transition: color 0.25s ease, transform 0.25s ease;
        }

        .back-to-top-btn:hover {
          color: #FFFFFF;
          transform: translateY(-2px);
        }
      `}</style>
    </footer>
  );
}
