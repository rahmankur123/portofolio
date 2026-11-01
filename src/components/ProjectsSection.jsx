import React, { useState, useEffect, useRef } from 'react';
import {
  FolderGit2,
  ExternalLink,
  Layers,
  Sparkles,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Clock
} from './Icons';
import { GithubIcon } from './BrandIcons';

export default function ProjectsSection({ projects, onSelectProject }) {
  const sectionRef = useRef(null);
  const [filterCategory, setFilterCategory] = useState('ALL');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const section = sectionRef.current;
    if (section) {
      const revealElements = section.querySelectorAll(
        '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .project-card'
      );
      revealElements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, [projects, filterCategory]);

  // Filter categories
  const categories = ['ALL', ...new Set(projects.map((p) => p.category).filter(Boolean))];

  const filteredProjects =
    filterCategory === 'ALL'
      ? projects
      : projects.filter((p) => p.category === filterCategory);

  const getDemoBadge = (status) => {
    switch (status) {
      case 'ONLINE':
        return (
          <span className="badge badge-online">
            <span className="status-dot dot-online" />
            <span>Online</span>
          </span>
        );
      case 'MAINTENANCE':
        return (
          <span className="badge badge-maintenance">
            <span className="status-dot dot-maintenance" />
            <span>Maintenance</span>
          </span>
        );
      case 'OFFLINE':
        return (
          <span className="badge badge-offline">
            <span className="status-dot dot-offline" />
            <span>Offline</span>
          </span>
        );
      default:
        return (
          <span className="badge badge-offline">
            <span>N/A</span>
          </span>
        );
    }
  };

  return (
    <section id="projects" className="section projects-section" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="section-header scroll-reveal">
          <div className="section-tag">
            <FolderGit2 size={14} />
            <span>Portofolio Proyek</span>
          </div>
          <h2 className="section-title">Dokumentasi Proyek Pilihan</h2>
          <p className="section-subtitle">
            Kumpulan implementasi sistem web nyata dengan studi kasus mendalam, arsitektur data, dan tautan demo aktif.
          </p>
        </div>

        {/* Filter bar */}
        <div className="projects-filter-bar scroll-reveal">
          <div className="filter-pill-group">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`filter-btn ${filterCategory === cat ? 'filter-active' : ''}`}
              >
                {cat === 'ALL' ? 'Semua Proyek' : cat}
              </button>
            ))}
          </div>

          <span className="filter-count">
            Menampilkan <strong>{filteredProjects.length}</strong> proyek terpublikasi
          </span>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects && filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => {
              // Aturan Bisnis Live Demo
              const isLiveDemoEligible =
                project.publication_status === 'PUBLISHED' &&
                project.demo_status === 'ONLINE' &&
                Boolean(project.live_url?.trim());

              return (
                <div
                  key={project.id}
                  className="project-card card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Card Cover */}
                  <div className="project-cover-wrapper" onClick={() => onSelectProject(project)}>
                    <img
                      src={project.cover_image}
                      alt={project.title}
                      className="project-cover-img"
                      loading="lazy"
                    />
                    <div className="cover-overlay">
                      <span className="overlay-badge">Klik untuk Studi Kasus</span>
                    </div>

                    <div className="cover-top-tags">
                      <span className="category-pill">{project.category}</span>
                      {getDemoBadge(project.demo_status)}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="project-card-body">
                    <div className="project-title-row">
                      <h3
                        className="project-card-title"
                        onClick={() => onSelectProject(project)}
                      >
                        {project.title}
                      </h3>
                    </div>

                    <p className="project-card-desc">{project.short_description || project.summary}</p>

                    {/* Tech Pills */}
                    <div className="project-tech-tags">
                      {project.technologies?.slice(0, 4).map((tech, i) => (
                        <span key={i} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                      {project.technologies?.length > 4 && (
                        <span className="tech-badge-more">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div className="project-card-actions">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="btn btn-secondary btn-sm action-detail-btn"
                      >
                        <span>Detail & Studi Kasus</span>
                        <ArrowRight size={14} />
                      </button>

                      <div className="card-sub-actions">
                        {isLiveDemoEligible ? (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-sm"
                            title="Buka Live Demo"
                          >
                            <ExternalLink size={14} />
                            <span>Demo</span>
                          </a>
                        ) : (
                          <button
                            disabled
                            className="btn btn-secondary btn-sm btn-disabled"
                            title={
                              project.demo_status === 'MAINTENANCE'
                                ? 'Demo sedang dalam pemeliharaan sistem'
                                : 'Demo tidak tersedia'
                            }
                          >
                            <ExternalLink size={14} />
                            <span>
                              {project.demo_status === 'MAINTENANCE' ? 'Maintenance' : 'No Demo'}
                            </span>
                          </button>
                        )}

                        {project.repository_url && (
                          <a
                            href={project.repository_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="icon-link-btn"
                            title="Buka Repositori GitHub"
                          >
                            <GithubIcon size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-projects-state">
              <AlertCircle size={32} />
              <p>Tidak ada proyek yang sesuai dengan kategori yang dipilih.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .projects-section {
          background-color: var(--bg-main);
        }

        .projects-filter-bar {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }

        @media (min-width: 768px) {
          .projects-filter-bar {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }

        .filter-pill-group {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .filter-btn {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          background-color: var(--bg-surface);
          border: 1px solid var(--border-default);
          padding: 0.45rem 1rem;
          border-radius: var(--radius-full);
          transition: all var(--transition-fast);
        }

        .filter-btn:hover {
          color: var(--primary-green);
          border-color: var(--primary-green-border);
        }

        .filter-btn.filter-active {
          background-color: var(--primary-green);
          color: #FFFFFF;
          border-color: var(--primary-green);
          box-shadow: 0 2px 6px rgba(23, 99, 77, 0.2);
        }

        .filter-count {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .filter-count strong {
          color: var(--text-primary);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .project-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-radius: var(--radius-xl);
          transition: all var(--transition-normal);
        }

        .project-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary-green-border);
        }

        .project-cover-wrapper {
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
          cursor: pointer;
          background-color: #0E1715;
        }

        .project-cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 350ms ease;
        }

        .project-card:hover .project-cover-img {
          transform: scale(1.05);
        }

        .cover-overlay {
          position: absolute;
          inset: 0;
          background-color: rgba(23, 34, 31, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity var(--transition-fast);
        }

        .project-card:hover .cover-overlay {
          opacity: 1;
        }

        .overlay-badge {
          background-color: #FFFFFF;
          color: var(--primary-green);
          font-size: 0.775rem;
          font-weight: 700;
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full);
          box-shadow: var(--shadow-md);
        }

        .cover-top-tags {
          position: absolute;
          top: 14px;
          left: 14px;
          right: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          pointer-events: none;
        }

        .category-pill {
          font-size: 0.725rem;
          font-weight: 700;
          background-color: rgba(255, 255, 255, 0.95);
          color: var(--text-primary);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
          backdrop-filter: blur(4px);
          box-shadow: var(--shadow-xs);
        }

        .project-card-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .project-card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          cursor: pointer;
          transition: color var(--transition-fast);
          line-height: 1.35;
        }

        .project-card-title:hover {
          color: var(--primary-green);
        }

        .project-card-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-top: 0.65rem;
          margin-bottom: 1.25rem;
          flex-grow: 1;
        }

        .project-tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.5rem;
        }

        .tech-badge {
          font-size: 0.75rem;
          font-weight: 600;
          background-color: var(--bg-surface-alt);
          color: var(--text-secondary);
          border: 1px solid var(--border-default);
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-sm);
        }

        .tech-badge-more {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          padding: 0.2rem 0.4rem;
        }

        .project-card-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding-top: 1.15rem;
          border-top: 1px solid var(--border-subtle);
        }

        .action-detail-btn {
          font-size: 0.825rem;
        }

        .card-sub-actions {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .icon-link-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          background-color: var(--bg-surface-alt);
          color: var(--text-secondary);
          border: 1px solid var(--border-default);
          transition: all var(--transition-fast);
        }

        .icon-link-btn:hover {
          color: var(--primary-green);
          border-color: var(--primary-green-border);
        }

        .empty-projects-state {
          grid-column: 1 / -1;
          padding: 3rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.85rem;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
}
