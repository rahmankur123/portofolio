import React, { useEffect, useRef } from 'react';
import {
  Briefcase,
  Calendar,
  Building,
  CheckCircle2,
  Tag,
  Sparkles
} from './Icons';

export default function ExperienceSection({ experiences }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    const section = sectionRef.current;
    if (section) {
      const revealElements = section.querySelectorAll(
        '.scroll-reveal, .experience-card'
      );
      revealElements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, [experiences]);

  const getExperienceTypeBadge = (type) => {
    switch (type?.toLowerCase()) {
      case 'magang':
      case 'internship':
        return <span className="type-badge badge-magang">Magang</span>;
      case 'organisasi':
      case 'organization':
        return <span className="type-badge badge-organisasi">Organisasi</span>;
      case 'freelance':
        return <span className="type-badge badge-freelance">Freelance</span>;
      default:
        return <span className="type-badge badge-default">{type || 'Kerja'}</span>;
    }
  };

  return (
    <section id="pengalaman" className="section experience-section" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="section-header scroll-reveal">
          <div className="section-tag">
            <Briefcase size={14} />
            <span>Riwayat Pengalaman</span>
          </div>
          <h2 className="section-title">Pengalaman Kerja & Kontribusi Nyata</h2>
          <p className="section-subtitle">
            Keterlibatan aktif dalam proyek pengembangan web, kepemimpinan organisasi teknologi, dan solusi freelance.
          </p>
        </div>

        {/* Experience List */}
        <div className="experience-list">
          {experiences && experiences.length > 0 ? (
            experiences.map((item, index) => (
              <div
                key={item.id}
                className="experience-card card scroll-reveal"
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                {/* Header row */}
                <div className="exp-header-row">
                  <div className="exp-title-group">
                    <div className="exp-meta-top">
                      {getExperienceTypeBadge(item.experience_type)}
                      {item.is_current && (
                        <span className="badge badge-online">
                          <span className="status-dot dot-online" />
                          <span>Saat ini</span>
                        </span>
                      )}
                    </div>
                    <h3 className="exp-position">{item.position}</h3>
                    <div className="exp-organization">
                      <Building size={15} className="org-icon" />
                      <span>{item.organization}</span>
                    </div>
                  </div>

                  <div className="exp-period-box">
                    <Calendar size={14} />
                    <span>
                      {item.start_date} — {item.is_current ? 'Saat ini' : item.end_date}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="exp-description">{item.description}</p>

                {/* Achievements */}
                {item.achievements && item.achievements.length > 0 && (
                  <div className="exp-achievements">
                    <span className="achievements-title">Kontribusi & Hasil:</span>
                    <ul className="achievements-list">
                      {item.achievements.map((ach, idx) => (
                        <li key={idx} className="ach-item">
                          <CheckCircle2 size={16} className="ach-icon" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                {item.technologies && item.technologies.length > 0 && (
                  <div className="exp-tech-row">
                    <div className="tech-label">
                      <Tag size={13} />
                      <span>Teknologi:</span>
                    </div>
                    <div className="tech-tags">
                      {item.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-tag-pill">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="empty-state-text">Belum ada data pengalaman yang dipublikasikan.</p>
          )}
        </div>
      </div>

      <style>{`
        .experience-section {
          background-color: var(--bg-main);
        }

        .experience-list {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .experience-card {
          padding: 2rem;
          border-radius: var(--radius-lg);
          transition: all var(--transition-normal);
        }

        .experience-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .exp-header-row {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 1.25rem;
        }

        @media (min-width: 768px) {
          .exp-header-row {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
          }
        }

        .exp-meta-top {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.5rem;
        }

        .type-badge {
          font-size: 0.725rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-sm);
        }

        .badge-magang {
          background-color: #E0E7FF;
          color: #3730A3;
        }

        .badge-organisasi {
          background-color: #FEE2E2;
          color: #991B1B;
        }

        .badge-freelance {
          background-color: #FEF3C7;
          color: #92400E;
        }

        .badge-default {
          background-color: var(--primary-green-pale);
          color: var(--primary-green);
        }

        .exp-position {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .exp-organization {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--primary-green);
          margin-top: 0.25rem;
        }

        .org-icon {
          color: var(--primary-green);
        }

        .exp-period-box {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          background-color: var(--bg-surface-alt);
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-default);
          width: fit-content;
        }

        .exp-description {
          font-size: 0.975rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
        }

        .exp-achievements {
          background-color: var(--bg-surface-alt);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          margin-bottom: 1.25rem;
        }

        .achievements-title {
          display: block;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.65rem;
        }

        .achievements-list {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .ach-item {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }

        .ach-icon {
          color: var(--primary-green);
          flex-shrink: 0;
          margin-top: 0.2rem;
        }

        .exp-tech-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.65rem;
          padding-top: 0.5rem;
        }

        .tech-label {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .tech-tag-pill {
          font-size: 0.775rem;
          font-weight: 600;
          background-color: var(--bg-surface-alt);
          color: var(--text-primary);
          border: 1px solid var(--border-default);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-sm);
        }
      `}</style>
    </section>
  );
}
