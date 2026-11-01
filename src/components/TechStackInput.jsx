import React, { useState } from 'react';
import { Tag, Plus, X, Check } from './Icons';

const POPULAR_TECH_PRESETS = [
  'React',
  'Vue.js',
  'Next.js',
  'Node.js',
  'Express.js',
  'PostgreSQL',
  'Supabase',
  'MySQL',
  'MongoDB',
  'TailwindCSS',
  'Bootstrap',
  'TypeScript',
  'JavaScript',
  'PHP',
  'Laravel',
  'Python',
  'Docker',
  'REST API',
  'Figma'
];

export default function TechStackInput({
  technologies = [],
  onChange,
  label = 'Tumpukan Teknologi (Tech Stack)',
  helperText = 'Teknologi ini akan tampil sebagai lencana (badge) di kartu proyek dan modal detail.'
}) {
  const [inputValue, setInputValue] = useState('');
  const currentTechs = Array.isArray(technologies) ? technologies : [];

  const handleAdd = (techName) => {
    const trimmed = techName?.trim();
    if (!trimmed) return;
    if (currentTechs.some((t) => t.toLowerCase() === trimmed.toLowerCase())) {
      return;
    }
    const updated = [...currentTechs, trimmed];
    onChange(updated);
    setInputValue('');
  };

  const handleRemove = (indexToRemove) => {
    const updated = currentTechs.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAdd(inputValue);
    }
  };

  const handleTogglePreset = (preset) => {
    const exists = currentTechs.some((t) => t.toLowerCase() === preset.toLowerCase());
    if (exists) {
      onChange(currentTechs.filter((t) => t.toLowerCase() !== preset.toLowerCase()));
    } else {
      onChange([...currentTechs, preset]);
    }
  };

  return (
    <div className="tech-stack-editor-wrapper">
      <div className="tech-stack-header">
        <label className="cms-label">
          <Tag size={15} className="label-icon" />
          <span>{label}</span>
        </label>
        {helperText && <p className="tech-stack-helper">{helperText}</p>}
      </div>

      {/* Selected Tags Box */}
      <div className="selected-tech-tags-container">
        {currentTechs && currentTechs.length > 0 ? (
          currentTechs.map((tech, idx) => (
            <span key={idx} className="tech-chip-active">
              <span className="tech-chip-name">{tech}</span>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="btn-remove-tech"
                title={`Hapus ${tech}`}
              >
                <X size={12} />
              </button>
            </span>
          ))
        ) : (
          <span className="empty-tech-hint">
            Belum ada teknologi dipilih. Silakan ketik nama teknologi atau klik saran di bawah.
          </span>
        )}
      </div>

      {/* Input row */}
      <div className="tech-input-row">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ketik teknologi lalu tekan Enter atau koma (misal: React, Node.js)..."
          className="cms-input tech-custom-input"
        />
        <button
          type="button"
          onClick={() => handleAdd(inputValue)}
          disabled={!inputValue.trim()}
          className="btn-add-tech"
        >
          <Plus size={16} />
          <span>Tambah</span>
        </button>
      </div>

      {/* Preset Suggestions */}
      <div className="tech-presets-box">
        <span className="presets-label">Saran Cepat (Klik untuk memilih/membatalkan):</span>
        <div className="presets-chips-grid">
          {POPULAR_TECH_PRESETS.map((preset) => {
            const isSelected = currentTechs.some(
              (t) => t.toLowerCase() === preset.toLowerCase()
            );
            return (
              <button
                key={preset}
                type="button"
                onClick={() => handleTogglePreset(preset)}
                className={`preset-chip-btn ${isSelected ? 'selected' : ''}`}
              >
                {isSelected && <Check size={11} />}
                <span>{preset}</span>
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        .tech-stack-editor-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid #2B3D37;
          border-radius: 10px;
          margin-top: 0.35rem;
          margin-bottom: 0.5rem;
        }

        .tech-stack-header {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .tech-stack-helper {
          font-size: 0.775rem;
          color: #A3B8B0;
          margin: 0;
        }

        .label-icon {
          color: #3CD1A4;
          margin-right: 0.35rem;
          vertical-align: -2px;
        }

        .selected-tech-tags-container {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.45rem;
          padding: 0.65rem 0.85rem;
          background: #0E1714;
          border: 1px solid #2B3D37;
          border-radius: 8px;
          min-height: 48px;
        }

        .tech-chip-active {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.3rem 0.65rem;
          background: #17634D;
          border: 1px solid #29A884;
          border-radius: 16px;
          color: #FAFAF7;
          font-size: 0.8rem;
          font-weight: 600;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          animation: popTag 0.18s ease-out;
        }

        @keyframes popTag {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .btn-remove-tech {
          background: transparent;
          border: none;
          color: #A3B8B0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          border-radius: 50%;
          transition: color 0.15s;
        }

        .btn-remove-tech:hover {
          color: #EF4444;
        }

        .empty-tech-hint {
          font-size: 0.8rem;
          color: #839990;
          font-style: italic;
        }

        .tech-input-row {
          display: flex;
          gap: 0.5rem;
        }

        .tech-custom-input {
          flex: 1;
        }

        .btn-add-tech {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.65rem 1rem;
          background: #1E2D28;
          border: 1px solid #2B3D37;
          border-radius: 8px;
          color: #FAFAF7;
          font-size: 0.825rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
        }

        .btn-add-tech:hover:not(:disabled) {
          background: #17634D;
          border-color: #29A884;
        }

        .btn-add-tech:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .tech-presets-box {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-top: 0.25rem;
        }

        .presets-label {
          font-size: 0.75rem;
          color: #839990;
          font-weight: 500;
        }

        .presets-chips-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .preset-chip-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.25rem 0.6rem;
          border-radius: 14px;
          font-size: 0.75rem;
          border: 1px solid #2B3D37;
          background: #0E1714;
          color: #A3B8B0;
          cursor: pointer;
          transition: all 0.15s;
        }

        .preset-chip-btn:hover {
          border-color: #3CD1A4;
          color: #FAFAF7;
        }

        .preset-chip-btn.selected {
          background: rgba(41, 168, 132, 0.2);
          border-color: #3CD1A4;
          color: #3CD1A4;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
