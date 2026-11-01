import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Code2, FileCode, Layout, Palette, Zap, Terminal, Server, Database,
  Globe, ShieldCheck, Layers, GitBranch, Send, Code, Cpu, Sparkles, CheckCircle
} from './Icons';
import { FigmaIcon } from './BrandIcons';

const ICON_MAP = {
  Code2, FileCode, Layout, Palette, Zap, Terminal, Server, Database,
  Globe, ShieldCheck, Layers, GitBranch, Send, Figma: FigmaIcon, Code, Cpu
};

const getProficiencyPercentage = (skill) => {
  if (typeof skill?.percentage === 'number') return skill.percentage;
  switch (skill?.proficiency?.toLowerCase()) {
    case 'mahir': return 90;
    case 'cukup': return 75;
    case 'dasar': return 50;
    default: return 70;
  }
};

const getProficiencyLabel = (level) => {
  switch (level?.toLowerCase()) {
    case 'mahir': return 'Advanced';
    case 'cukup': return 'Intermediate';
    case 'dasar': return 'Beginner';
    default: return level || 'Practiced';
  }
};

function SkillProgressRow({ skill, index }) {
  const rowRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const percentage = getProficiencyPercentage(skill);
  const IconComp = ICON_MAP[skill.icon] || Code;

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const staggerDelay = index * 0.1;

  return (
    <div
      ref={rowRef}
      className="skill-progress-row"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${staggerDelay}s, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${staggerDelay}s`,
      }}
    >
      <div className="skill-row-header">
        <div className="skill-row-icon">
          <IconComp size={18} />
        </div>
        <div className="skill-row-info">
          <span className="skill-row-name">{skill.name}</span>
          <span className="skill-row-level">{getProficiencyLabel(skill.proficiency)}</span>
        </div>
        <span className="skill-row-percentage">{percentage}%</span>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: isVisible ? `${percentage}%` : '0%',
            transitionDelay: `${staggerDelay + 0.2}s`,
          }}
        />
      </div>

      {skill.note && (
        <p className="skill-row-note">{skill.note}</p>
      )}
    </div>
  );
}

export default function SkillsSection({ skillCategories }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState('ALL');

  const filteredCategories =
    selectedCategoryId === 'ALL'
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === selectedCategoryId);

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Cpu size={14} />
            <span>Keahlian & Tooling</span>
          </div>
          <h2 className="section-title">Keterampilan Teknis</h2>
          <p className="section-subtitle">
            Keahlian diukur berdasarkan pengalaman praktik nyata dalam berbagai proyek dan studi kasus profesional.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="category-filter-tabs">
          <button
            onClick={() => setSelectedCategoryId('ALL')}
            className={`cat-tab-btn ${selectedCategoryId === 'ALL' ? 'cat-tab-active' : ''}`}
          >
            Semua Bidang
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryId(cat.id)}
              className={`cat-tab-btn ${selectedCategoryId === cat.id ? 'cat-tab-active' : ''}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Categories & Skills Progress Bars */}
        <div className="skills-categories-wrapper">
          {filteredCategories.map((category) => (
            <div key={category.id} className="category-block">
              <div className="category-block-header">
                <h3 className="category-block-title">{category.name}</h3>
                <p className="category-block-desc">{category.description}</p>
              </div>

              <div className="skills-progress-list">
                {category.skills?.map((skill, idx) => (
                  <SkillProgressRow key={skill.id} skill={skill} index={idx} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Professional Note Banner */}
        <div className="skills-guideline-banner">
          <div className="guideline-content">
            <CheckCircle size={18} className="guideline-icon" />
            <p className="guideline-text">
              <strong>Verified Skills:</strong> Seluruh keahlian di atas telah dibuktikan melalui dokumentasi kode dan arsitektur pada daftar proyek di bawah.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .skills-section {
          background-color: var(--bg-surface-alt);
        }

        .category-filter-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
          margin-bottom: 2.5rem;
        }

        .cat-tab-btn {
          padding: 0.55rem 1.15rem;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
          background-color: var(--bg-surface);
          border: 1px solid var(--border-default);
          transition: all var(--transition-fast);
          cursor: pointer;
        }

        .cat-tab-btn:hover {
          color: var(--primary-green);
          border-color: var(--primary-green-border);
        }

        .cat-tab-btn.cat-tab-active {
          background-color: var(--primary-green);
          color: #FFFFFF;
          border-color: var(--primary-green);
          box-shadow: 0 2px 8px rgba(23, 99, 77, 0.25);
        }

        .skills-categories-wrapper {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .category-block-header {
          margin-bottom: 1.5rem;
        }

        .category-block-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .category-block-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-top: 0.25rem;
        }

        /* ── Progress Bar Skill Rows ── */

        .skills-progress-list {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        .skill-progress-row {
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: var(--radius-lg);
          padding: 1.15rem 1.35rem;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }

        .skill-progress-row:hover {
          border-color: var(--primary-green-border);
          box-shadow: 0 2px 12px rgba(23, 99, 77, 0.08);
        }

        .skill-row-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.65rem;
        }

        .skill-row-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          background-color: var(--primary-green-light);
          color: var(--primary-green);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid var(--primary-green-border);
        }

        .skill-row-info {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          flex: 1;
          min-width: 0;
        }

        .skill-row-name {
          font-size: 0.975rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .skill-row-level {
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-tertiary, var(--text-secondary));
          opacity: 0.75;
        }

        .skill-row-percentage {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--primary-green);
          flex-shrink: 0;
          font-variant-numeric: tabular-nums;
          min-width: 40px;
          text-align: right;
        }

        /* ── Track & Fill ── */

        .progress-track {
          width: 100%;
          height: 8px;
          background-color: var(--border-default, #e5e7eb);
          border-radius: 999px;
          overflow: hidden;
          position: relative;
        }

        .progress-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--primary-green), #10B981 70%, #34D399 100%);
          width: 0%;
          transition: width 1.2s cubic-bezier(0.22, 0.61, 0.36, 1);
          position: relative;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.35);
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.35),
            transparent
          );
          animation: progressShimmer 2.5s infinite;
        }

        @keyframes progressShimmer {
          0% { left: -100%; }
          50%, 100% { left: 100%; }
        }

        .skill-row-note {
          font-size: 0.82rem;
          line-height: 1.5;
          color: var(--text-secondary);
          margin-top: 0.55rem;
          opacity: 0.85;
        }

        /* ── Banner ── */

        .skills-guideline-banner {
          margin-top: 3rem;
          padding: 1.25rem 1.5rem;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: var(--radius-lg);
        }

        .guideline-content {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .guideline-icon {
          color: var(--primary-green);
          flex-shrink: 0;
        }

        .guideline-text {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .guideline-text strong {
          color: var(--text-primary);
        }

        /* ── Responsive ── */

        @media (min-width: 640px) {
          .skills-progress-list {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.1rem;
          }
        }

        @media (min-width: 1024px) {
          .skills-progress-list {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
