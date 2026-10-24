import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Wrench,
  Layers,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Info,
  Calendar,
  Tag
} from './Icons';
import { GithubIcon } from './BrandIcons';

export default function ProjectDetailModal({ project, onClose }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!project) return null;

  // Aturan Bisnis PRD 7.2: Tombol Live Demo
  const isLiveDemoEligible =
    project.publication_status === 'PUBLISHED' &&
    project.demo_status === 'ONLINE' &&
    Boolean(project.live_url?.trim());

  const getDemoStatusBadge = (status) => {
    switch (status) {
      case 'ONLINE':
        return (
          <span className="badge badge-online">
            <span className="status-dot dot-online" />
            <span>Demo Online</span>
          </span>
        );
      case 'MAINTENANCE':
        return (
          <span className="badge badge-maintenance">
            <span className="status-dot dot-maintenance" />
            <span>Sedang Maintenance</span>
          </span>
        );
      case 'OFFLINE':
        return (
          <span className="badge badge-offline">
            <span className="status-dot dot-offline" />
            <span>Demo Offline</span>
          </span>
        );
      default:
        return (
          <span className="badge badge-offline">
            <span>Tidak Tersedia</span>
          </span>
        );
    }
  };

  const images = project.images && project.images.length > 0 ? project.images : [
    {
      id: 1,
      image_url: project.cover_image,
      caption: project.title,
      alt_text: project.title
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content project-detail-modal" onClick={(e) => e.stopPropagation()}>
        {/* Sticky Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <span className="project-category-tag">{project.category}</span>
            <div className="modal-status-group">
              {getDemoStatusBadge(project.demo_status)}
              {project.is_featured && (
                <span className="badge featured-badge">
                  <Sparkles size={12} />
                  <span>Proyek Unggulan</span>
                </span>
              )}
            </div>
          </div>

          <button onClick={onClose} className="modal-close-btn" aria-label="Tutup Dokumentasi">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Title & Short Description */}
          <h2 className="modal-project-title">{project.title}</h2>
          <p className="modal-project-summary">{project.short_description}</p>

          {/* Quick Meta Strip */}
          <div className="project-meta-strip">
            <div className="meta-strip-item">
              <span className="meta-strip-label">Peran Pemilik:</span>
              <span className="meta-strip-value">{project.role || 'Full-Stack Developer'}</span>
            </div>
            {project.published_at && (
              <div className="meta-strip-item">
                <span className="meta-strip-label">Rilis Dokumentasi:</span>
                <span className="meta-strip-value">{project.published_at}</span>
              </div>
            )}
            <div className="meta-strip-item">
              <span className="meta-strip-label">Status Akses:</span>
              <span className="meta-strip-value">{project.publication_status}</span>
            </div>
          </div>

          {/* Gallery / Screenshot Showcase */}
          <div className="project-gallery-box">
            <div className="gallery-main-view">
              <img
                src={images[activeImageIndex].image_url}
                alt={images[activeImageIndex].alt_text || project.title}
                className="gallery-main-img"
              />
              <div className="gallery-caption-overlay">
                <span>{images[activeImageIndex].caption}</span>
              </div>
            </div>

            {images.length > 1 && (
              <div className="gallery-thumbnail-list">
                {images.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`gallery-thumb-btn ${activeImageIndex === idx ? 'thumb-active' : ''}`}
                  >
                    <img src={img.image_url} alt={img.alt_text} className="thumb-img" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action CTAs complying with PRD Section 7.2 */}
          <div className="detail-cta-bar">
            {isLiveDemoEligible ? (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <ExternalLink size={16} />
                <span>Buka Live Demo</span>
              </a>
            ) : (
              <div className="demo-disabled-pill" title="Tautan demo tidak aktif karena status bukan ONLINE atau URL belum disetel">
                <AlertCircle size={16} />
                <span>
                  {project.demo_status === 'MAINTENANCE'
                    ? 'Live Demo Dalam Pemeliharaan'
                    : 'Live Demo Tidak Tersedia'}
                </span>
              </div>
            )}

            {project.repository_url && (
              <a
                href={project.repository_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <GithubIcon size={16} />
                <span>Lihat Source Code</span>
              </a>
            )}
          </div>

          {/* Structured Project Documentation (PRD Section 5.1) */}
          <div className="detail-sections-container">
            {/* Overview & Problem Statement */}
            <div className="detail-card">
              <h3 className="detail-heading">
                <Info size={18} className="heading-icon" />
                <span>Latar Belakang & Masalah</span>
              </h3>
              <p className="detail-paragraph">{project.problem_statement}</p>
            </div>

            {/* Objectives */}
            {project.objectives && (
              <div className="detail-card">
                <h3 className="detail-heading">
                  <CheckCircle2 size={18} className="heading-icon" />
                  <span>Tujuan Solusi</span>
                </h3>
                <p className="detail-paragraph">{project.objectives}</p>
              </div>
            )}

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div className="detail-card">
                <h3 className="detail-heading">
                  <Layers size={18} className="heading-icon" />
                  <span>Fitur & Fungsionalitas Utama</span>
                </h3>
                <div className="features-detail-grid">
                  {project.features.map((feat) => (
                    <div key={feat.id} className="feature-item-box">
                      <h4 className="feature-item-title">{feat.title}</h4>
                      <p className="feature-item-desc">{feat.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Challenges & Solutions */}
            {project.technical_challenges && (
              <div className="detail-card">
                <h3 className="detail-heading">
                  <Wrench size={18} className="heading-icon" />
                  <span>Tantangan Teknis & Keputusan Arsitektur</span>
                </h3>
                <p className="detail-paragraph">{project.technical_challenges}</p>
              </div>
            )}

            {/* Results & Impact */}
            {project.results && (
              <div className="detail-card highlight-card">
                <h3 className="detail-heading">
                  <Sparkles size={18} className="heading-icon" />
                  <span>Hasil & Dampak Terukur</span>
                </h3>
                <p className="detail-paragraph">{project.results}</p>
              </div>
            )}

            {/* Technologies Used */}
            <div className="detail-card">
              <h3 className="detail-heading">
                <Tag size={18} className="heading-icon" />
                <span>Tumpukan Teknologi (Tech Stack)</span>
              </h3>
              <div className="detail-tech-pills">
                {project.technologies?.map((tech, idx) => (
                  <span key={idx} className="tech-badge-large">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <p className="footer-notice">
            Dokumentasi proyek ini dikelola melalui database CMS (PRD Section 5.1).
          </p>
          <button onClick={onClose} className="btn btn-secondary btn-sm">
            Tutup Jendela
          </button>
        </div>
      </div>

      <style>{`
        .project-detail-modal {
          max-width: 860px;
          display: flex;
          flex-direction: column;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.75rem;
          border-bottom: 1px solid var(--border-subtle);
          position: sticky;
          top: 0;
          background-color: var(--bg-surface);
          z-index: 10;
        }

        .modal-header-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .project-category-tag {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--primary-green);
          background-color: var(--primary-green-pale);
          padding: 0.2rem 0.65rem;
          border-radius: var(--radius-sm);
        }

        .modal-status-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .featured-badge {
          background-color: #FEF3C7;
          color: #92400E;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .modal-close-btn {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          background-color: var(--bg-surface-alt);
          border: 1px solid var(--border-default);
          transition: all var(--transition-fast);
        }

        .modal-close-btn:hover {
          color: var(--text-primary);
          background-color: var(--border-subtle);
        }

        .modal-body {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .modal-project-title {
          font-size: 1.85rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.25;
        }

        .modal-project-summary {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .project-meta-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          padding: 1rem 1.25rem;
          background-color: var(--bg-surface-alt);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
        }

        .meta-strip-item {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.85rem;
        }

        .meta-strip-label {
          color: var(--text-muted);
        }

        .meta-strip-value {
          font-weight: 600;
          color: var(--text-primary);
        }

        /* Gallery */
        .project-gallery-box {
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--border-default);
          background-color: #0E1715;
        }

        .gallery-main-view {
          position: relative;
          width: 100%;
          height: 360px;
          overflow: hidden;
          background-color: #0E1715;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (min-width: 768px) {
          .gallery-main-view {
            height: 420px;
          }
        }

        .gallery-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .gallery-caption-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 100%);
          padding: 1rem 1.25rem;
          color: #FFFFFF;
          font-size: 0.875rem;
        }

        .gallery-thumbnail-list {
          display: flex;
          gap: 0.65rem;
          padding: 0.85rem;
          background-color: var(--bg-surface-alt);
          border-top: 1px solid var(--border-default);
          overflow-x: auto;
        }

        .gallery-thumb-btn {
          width: 72px;
          height: 48px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 2px solid transparent;
          opacity: 0.7;
          transition: all var(--transition-fast);
          flex-shrink: 0;
        }

        .gallery-thumb-btn.thumb-active {
          border-color: var(--primary-green);
          opacity: 1;
        }

        .thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .detail-cta-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.85rem;
          padding: 1.25rem;
          background-color: var(--bg-main);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-default);
        }

        .demo-disabled-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          font-weight: 600;
          background-color: var(--bg-surface-alt);
          color: var(--text-secondary);
          border: 1px solid var(--border-default);
        }

        /* Detail Structured Cards */
        .detail-sections-container {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .detail-card {
          padding: 1.5rem;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
        }

        .detail-card.highlight-card {
          background-color: var(--primary-green-light);
          border-color: var(--primary-green-border);
        }

        .detail-heading {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.85rem;
        }

        .heading-icon {
          color: var(--primary-green);
        }

        .detail-paragraph {
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--text-secondary);
        }

        .features-detail-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        @media (min-width: 640px) {
          .features-detail-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .feature-item-box {
          padding: 1.1rem;
          background-color: var(--bg-surface-alt);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }

        .feature-item-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--primary-green);
          margin-bottom: 0.4rem;
        }

        .feature-item-desc {
          font-size: 0.85rem;
          line-height: 1.55;
          color: var(--text-secondary);
        }

        .detail-tech-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-badge-large {
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.35rem 0.85rem;
          background-color: var(--bg-surface-alt);
          color: var(--text-primary);
          border: 1px solid var(--border-default);
          border-radius: var(--radius-full);
        }

        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.75rem;
          border-top: 1px solid var(--border-subtle);
          background-color: var(--bg-surface-alt);
        }

        .footer-notice {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
