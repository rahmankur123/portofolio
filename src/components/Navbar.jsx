import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Send,
  Sliders,
  ExternalLink,
  ChevronRight,
  Sparkles
} from './Icons';

export default function Navbar({ profile, onOpenAdmin, siteSettings }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'pendidikan', 'pengalaman', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Beranda' },
    { id: 'about', label: 'Profil' },
    { id: 'pendidikan', label: 'Pendidikan' },
    { id: 'pengalaman', label: 'Pengalaman' },
    { id: 'skills', label: 'Keahlian' },
    { id: 'projects', label: 'Proyek' },
    { id: 'contact', label: 'Kontak' },
  ];

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -75;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const getInitials = (name) => {
    if (!name) return 'RK';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand / Logo */}
        <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className="navbar-brand">
          <div className="brand-logo-badge">
            <span>{getInitials(profile?.full_name || siteSettings?.owner_name || 'Rahman Kurniawan')}</span>
          </div>
          <div className="brand-text">
            <span className="brand-name">{siteSettings?.site_title || profile?.full_name || 'Rahman Kurniawan'}</span>
            <span className="brand-role">{profile?.headline || 'Web Developer'}</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="navbar-nav desktop-only">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="navbar-actions">
          {/* Admin CMS Button */}
          {/*<button
            onClick={onOpenAdmin}
            className="btn btn-secondary btn-sm admin-toggle-btn"
            title="Dashboard Admin"
          >
            <Sliders size={15} />
            <span className="desktop-only-inline">Admin</span>
          </button>
          */}

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="btn btn-primary btn-sm desktop-only-flex"
          >
            <Send size={14} />
            <span>Hubungi</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle-btn mobile-only"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-content">
            <div className="mobile-nav-list">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`mobile-nav-item ${activeSection === link.id ? 'mobile-active' : ''}`}
                >
                  <span>{link.label}</span>
                  <ChevronRight size={16} />
                </a>
              ))}
            </div>

            <div className="mobile-drawer-footer">
              {/*<button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="btn btn-secondary btn-sm full-width"
              >
                <Sliders size={16} />
                <span>Dashboard Admin</span>
              </button>*/}

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="btn btn-primary btn-sm full-width"
              >
                <Send size={16} />
                <span>Kirim Pesan Cepat</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .navbar-wrapper {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          height: var(--nav-height);
          background-color: rgba(247, 247, 243, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-subtle);
          z-index: 900;
          transition: all var(--transition-fast);
        }

        .navbar-scrolled {
          background-color: rgba(247, 247, 243, 0.95);
          box-shadow: 0 4px 20px -2px rgba(23, 34, 31, 0.06);
          border-bottom-color: var(--border-default);
        }

        .navbar-container {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }

        .brand-logo-badge {
          width: 38px;
          height: 38px;
          background-color: var(--primary-green);
          color: #FFFFFF;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.95rem;
          letter-spacing: -0.02em;
          box-shadow: 0 2px 6px rgba(23, 99, 77, 0.25);
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .brand-role {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .navbar-nav {
          display: flex;
          align-items: center;
          gap: 1.75rem;
          background: none;
          padding: 0;
          border: none;
        }

        .nav-link {
          position: relative;
          font-size: 0.925rem;
          font-weight: 500;
          color: var(--text-secondary);
          padding: 0.5rem 0;
          transition: color var(--transition-fast);
        }

        .nav-link:hover {
          color: var(--primary-green);
        }

        .nav-link.active {
          color: var(--primary-green);
          background: none;
          font-weight: 600;
          box-shadow: none;
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--primary-green);
          border-radius: 2px;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .admin-toggle-btn {
          background-color: var(--primary-green-light);
          border-color: var(--primary-green-border);
          color: var(--primary-green);
        }

        .admin-toggle-btn:hover {
          background-color: var(--primary-green-pale);
        }

        .mobile-toggle-btn {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          color: var(--text-primary);
          border: 1px solid var(--border-default);
          background-color: var(--bg-surface);
        }

        /* Mobile Drawer */
        .mobile-drawer {
          position: absolute;
          top: var(--nav-height);
          left: 0;
          right: 0;
          background-color: var(--bg-surface);
          border-bottom: 1px solid var(--border-default);
          box-shadow: var(--shadow-lg);
          padding: 1.25rem;
          animation: slideDown 200ms ease-out;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .mobile-nav-list {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .mobile-nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          color: var(--text-primary);
          transition: background-color var(--transition-fast);
        }

        .mobile-nav-item:hover, .mobile-nav-item.mobile-active {
          background-color: var(--primary-green-light);
          color: var(--primary-green);
        }

        .mobile-drawer-footer {
          margin-top: 1.25rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .full-width {
          width: 100%;
        }

        @media (max-width: 991px) {
          .desktop-only, .desktop-only-flex {
            display: none !important;
          }
          .desktop-only-inline {
            display: none !important;
          }
        }

        @media (min-width: 992px) {
          .mobile-only {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
