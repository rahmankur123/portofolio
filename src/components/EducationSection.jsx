import React, { useEffect, useRef } from 'react';
import {
  GraduationCap,
  Calendar,
  Award,
  CheckCircle2,
  Sparkles
} from './Icons';

export default function EducationSection({ educations }) {
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
        '.scroll-reveal, .timeline-item'
      );
      revealElements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, [educations]);

  return (
    <section id="pendidikan" className="section education-section" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="section-header scroll-reveal">
          <div className="section-tag">
            <GraduationCap size={14} />
            <span>Riwayat Pendidikan</span>
          </div>
          <h2 className="section-title">Latar Belakang Akademik</h2>
          <p className="section-subtitle">
            Fondasi teoritis dan praktikum teknologi informasi yang membentuk cara berpikir analitis dan sistematis.
          </p>
        </div>

        {/* Timeline List */}
        <div className="education-timeline">
          {educations && educations.length > 0 ? (
            educations.map((item, index) => (
              <div
                key={item.id}
                className="timeline-item scroll-reveal"
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                {/* Timeline Axis & Dot */}
                <div className="timeline-axis">
                  <div className={`timeline-dot ${item.is_current ? 'dot-active' : ''}`}>
                    <GraduationCap size={18} />
                  </div>
                  {index !== educations.length - 1 && <div className="timeline-line" />}
                </div>

                {/* Timeline Content Card */}
                <div className="timeline-content-card card">
                  <div className="card-top-row">
                    <div className="institution-info">
                      <span className="degree-badge">{item.degree}</span>
                      <h3 className="study-title">{item.field_of_study}</h3>
                      <h4 className="institution-name">{item.institution}</h4>
                    </div>

                    <div className="period-badge-wrapper">
                      <div className="period-box">
                        <Calendar size={14} />
                        <span>
                          {item.start_date} — {item.is_current ? 'Sekarang' : item.end_date}
                        </span>
                      </div>
                      {item.is_current && (
                        <span className="badge badge-online current-status-badge">
                          <span className="status-dot dot-online" />
                          <span>Sedang Ditempuh</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="education-desc">{item.description}</p>

                  {/* Achievements List */}
                  {item.achievements && item.achievements.length > 0 && (
                    <div className="achievements-box">
                      <div className="achievements-header">
                        <Award size={15} />
                        <span>Pencapaian & Kegiatan Akademik:</span>
                      </div>
                      <ul className="achievements-list">
                        {item.achievements.map((ach, i) => (
                          <li key={i} className="achievement-item">
                            <CheckCircle2 size={15} className="ach-icon" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="empty-state-text">Belum ada data riwayat pendidikan yang dipublikasikan.</p>
          )}
        </div>
      </div>

      <style>{`
        .education-section {
          background-color: var(--bg-surface-alt);
        }

        .education-timeline {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
        }

        .timeline-item {
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 1.25rem;
          position: relative;
        }

        @media (min-width: 768px) {
          .timeline-item {
            grid-template-columns: 56px 1fr;
            gap: 1.75rem;
          }
        }

        .timeline-axis {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .timeline-dot {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: var(--bg-surface);
          border: 2px solid var(--border-default);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          box-shadow: var(--shadow-xs);
          transition: all var(--transition-fast);
        }

        .timeline-dot.dot-active {
          border-color: var(--primary-green);
          background-color: var(--primary-green-pale);
          color: var(--primary-green);
          box-shadow: 0 0 0 4px var(--primary-green-light);
        }

        .timeline-line {
          width: 2px;
          flex-grow: 1;
          background-color: var(--border-default);
          margin-top: 8px;
          margin-bottom: 8px;
        }

        .timeline-content-card {
          padding: 1.75rem;
          border-radius: var(--radius-lg);
          margin-bottom: 1rem;
        }

        .card-top-row {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.15rem;
        }

        @media (min-width: 768px) {
          .card-top-row {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
          }
        }

        .degree-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary-green);
          background-color: var(--primary-green-pale);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-sm);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 0.4rem;
        }

        .study-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .institution-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-top: 0.15rem;
        }

        .period-badge-wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.4rem;
        }

        @media (min-width: 768px) {
          .period-badge-wrapper {
            align-items: flex-end;
          }
        }

        .period-box {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          background-color: var(--bg-main);
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
        }

        .current-status-badge {
          font-size: 0.725rem;
        }

        .education-desc {
          font-size: 0.95rem;
          line-height: 1.65;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
        }

        .achievements-box {
          background-color: var(--bg-main);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.15rem;
        }

        .achievements-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.65rem;
        }

        .achievements-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .achievement-item {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .ach-icon {
          color: var(--primary-green);
          flex-shrink: 0;
          margin-top: 0.2rem;
        }

        .empty-state-text {
          font-style: italic;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
}
