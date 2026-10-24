import React, { useState } from 'react';
import {
  Code2,
  FileCode,
  Layout,
  Palette,
  Zap,
  Terminal,
  Server,
  Database,
  Globe,
  ShieldCheck,
  Layers,
  GitBranch,
  Send,
  Code,
  Cpu,
  Sparkles,
  CheckCircle
} from './Icons';
import { FigmaIcon } from './BrandIcons';

const ICON_MAP = {
  Code2,
  FileCode,
  Layout,
  Palette,
  Zap,
  Terminal,
  Server,
  Database,
  Globe,
  ShieldCheck,
  Layers,
  GitBranch,
  Send,
  Figma: FigmaIcon,
  Code,
  Cpu
};

export default function SkillsSection({ skillCategories }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState('ALL');

  const filteredCategories =
    selectedCategoryId === 'ALL'
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === selectedCategoryId);

  const getProficiencyBadge = (level) => {
    switch (level?.toLowerCase()) {
      case 'mahir':
        return <span className="proficiency-badge badge-mahir">Mahir</span>;
      case 'cukup':
        return <span className="proficiency-badge badge-cukup">Cukup</span>;
      case 'dasar':
        return <span className="proficiency-badge badge-dasar">Dasar</span>;
      default:
        return <span className="proficiency-badge">{level || 'Terlatih'}</span>;
    }
  };

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Cpu size={14} />
            <span>Keahlian & Tooling</span>
          </div>
          <h2 className="section-title">Kompilasi Keterampilan Teknis</h2>
          <p className="section-subtitle">
            Keahlian diukur berdasarkan pengalaman praktik nyata dalam proyek, bukan persentase angka yang tidak terukur (PRD 4.6).
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

        {/* Categories & Skills Grid */}
        <div className="skills-categories-wrapper">
          {filteredCategories.map((category) => (
            <div key={category.id} className="category-block">
              <div className="category-block-header">
                <h3 className="category-block-title">{category.name}</h3>
                <p className="category-block-desc">{category.description}</p>
              </div>

              <div className="skills-grid">
                {category.skills?.map((skill) => {
                  const IconComp = ICON_MAP[skill.icon] || Code;
                  return (
                    <div key={skill.id} className="skill-card card">
                      <div className="skill-card-top">
                        <div className="skill-icon-wrapper">
                          <IconComp size={22} />
                        </div>
                        <div className="skill-header-meta">
                          <h4 className="skill-name">{skill.name}</h4>
                          {getProficiencyBadge(skill.proficiency)}
                        </div>
                      </div>

                      <p className="skill-note">{skill.note || skill.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* PRD Best Practice Note Banner */}
        <div className="skills-guideline-banner">
          <div className="guideline-content">
            <CheckCircle size={18} className="guideline-icon" />
            <p className="guideline-text">
              <strong>Standar Transparansi:</strong> Seluruh keahlian di atas telah dibuktikan melalui dokumentasi kode dan arsitektur pada daftar proyek di bawah.
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
          margin-bottom: 1.25rem;
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

        .skills-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }

        @media (min-width: 640px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .skills-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .skill-card {
          padding: 1.4rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all var(--transition-fast);
        }

        .skill-card:hover {
          transform: translateY(-2px);
          border-color: var(--primary-green-border);
        }

        .skill-card-top {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.85rem;
        }

        .skill-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background-color: var(--primary-green-light);
          color: var(--primary-green);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid var(--primary-green-border);
        }

        .skill-header-meta {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .skill-name {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .proficiency-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-sm);
          width: fit-content;
        }

        .badge-mahir {
          background-color: var(--status-online-bg);
          color: var(--status-online-text);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .badge-cukup {
          background-color: #FEF3C7;
          color: #92400E;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .badge-dasar {
          background-color: #F3F4F6;
          color: #4B5563;
        }

        .skill-note {
          font-size: 0.85rem;
          line-height: 1.55;
          color: var(--text-secondary);
        }

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
      `}</style>
    </section>
  );
}
