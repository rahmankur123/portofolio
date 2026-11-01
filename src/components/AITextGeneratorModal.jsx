import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Check,
  RefreshCw,
  Copy,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Key
} from './Icons';
import {
  generateTextWithGemini,
  getGeminiApiKey,
  saveGeminiApiKey
} from '../services/aiGenerator';

export default function AITextGeneratorModal({
  isOpen,
  onClose,
  fieldType,
  fieldLabel = 'Teks',
  context = {},
  currentValue = '',
  onApply
}) {
  const [tone, setTone] = useState('profesional');
  const [customPrompt, setCustomPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState(currentValue || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showApiKeySetting, setShowApiKeySetting] = useState(false);
  const [apiKey, setApiKey] = useState(() => getGeminiApiKey());
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  if (!isOpen) return null;

  const handleGenerate = async (forcedTone) => {
    setIsGenerating(true);
    setStatusMessage(null);
    try {
      // Simulate quick natural streaming feel
      await new Promise((r) => setTimeout(r, 350));
      const text = await generateTextWithGemini({
        fieldType,
        context,
        tone: forcedTone || tone,
        customPrompt,
        apiKey
      });
      setGeneratedText(text);
      setStatusMessage({
        type: 'success',
        text: 'Draf teks berhasil dibuat! Silakan edit langsung bila ada fakta spesifik yang ingin disesuaikan.'
      });
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Gagal menghasilkan teks.'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyToForm = () => {
    if (!generatedText?.trim()) return;
    onApply(generatedText.trim());
    onClose();
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveKey = (e) => {
    e.preventDefault();
    saveGeminiApiKey(apiKey);
    setStatusMessage({
      type: 'success',
      text: apiKey?.trim()
        ? 'Kunci API Gemini berhasil disimpan!'
        : 'Kunci API Gemini dihapus. Kembali menggunakan Generator AI bawaan.'
    });
    setShowApiKeySetting(false);
  };

  return (
    <div className="ai-modal-overlay" onClick={onClose}>
      <div className="ai-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="ai-modal-header">
          <div className="ai-header-title-box">
            <div className="ai-icon-pill">
              <Sparkles size={18} className="ai-sparkle-icon" />
            </div>
            <div>
              <h3 className="ai-title">Asisten Penulis AI Portofolio</h3>
              <p className="ai-subtitle">
                Generate draf kalimat untuk: <strong>{fieldLabel}</strong>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="ai-close-btn" aria-label="Tutup">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="ai-modal-body">
          {/* Context Tag Banner */}
          <div className="ai-context-banner">
            <span className="context-label">Konteks Terdeteksi:</span>
            <span className="context-value">
              {context.title || context.position || context.headline || context.institution || 'Pengembang Web Portofolio'}
            </span>
            {context.category && (
              <span className="context-chip">{context.category}</span>
            )}
            {Array.isArray(context.technologies) && context.technologies.length > 0 && (
              <span className="context-chip">
                {context.technologies.slice(0, 3).join(', ')}
              </span>
            )}
          </div>

          {/* Quick Prompt Input */}
          <div className="ai-input-group">
            <label className="ai-input-label">
              Topik / Kata Kunci Khusus (Opsional):
            </label>
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Contoh: Sistem kasir cafe, e-commerce pakaian, aplikasi desa, dll."
              className="ai-prompt-input"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleGenerate();
                }
              }}
            />
          </div>

          {/* Tone Selector */}
          <div className="ai-tone-group">
            <span className="ai-input-label">Gaya Penulisan:</span>
            <div className="ai-tone-pills">
              {[
                { id: 'profesional', label: '💼 Profesional & Rapi' },
                { id: 'ringkas', label: '⚡ Ringkas & Padat' },
                { id: 'teknis', label: '🛠️ Teknis & Arsitektur' },
                { id: 'akademik', label: '🎓 Akademik & Formal' }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setTone(t.id);
                    handleGenerate(t.id);
                  }}
                  className={`ai-tone-pill ${tone === t.id ? 'active' : ''}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Trigger */}
          <div className="ai-action-row">
            <button
              type="button"
              onClick={() => handleGenerate()}
              disabled={isGenerating}
              className="btn-ai-generate"
            >
              <Sparkles size={16} className={isGenerating ? 'spin-icon' : ''} />
              <span>{isGenerating ? 'Sedang Menyusun Kalimat...' : (generatedText ? '🔄 Generate Ulang / Variasi Lain' : '✨ Generate Kalimat Sekarang')}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowApiKeySetting(!showApiKeySetting)}
              className="btn-ai-key-toggle"
              title="Pengaturan Google Gemini API Key (Opsional)"
            >
              <Key size={14} />
              <span>{apiKey ? 'Gemini Cloud Aktif' : 'Atur API Key (Opsional)'}</span>
            </button>
          </div>

          {/* API Key Drawer (Optional) */}
          {showApiKeySetting && (
            <div className="ai-key-drawer">
              <div className="key-drawer-header">
                <Key size={14} />
                <span>Pengaturan Google Gemini API (Opsional)</span>
              </div>
              <p className="key-drawer-desc">
                Sistem secara *default* sudah memiliki Generator AI cerdas bawaan yang langsung bekerja tanpa API key. Namun jika Anda ingin menghubungkan API Key Gemini pribadi (Gratis di Google AI Studio), Anda bisa memasukkannya di bawah:
              </p>
              <form onSubmit={handleSaveKey} className="key-drawer-form">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="ai-key-input"
                />
                <button type="submit" className="btn-key-save">
                  Simpan Kunci
                </button>
              </form>
            </div>
          )}

          {/* Feedback message */}
          {statusMessage && (
            <div className={`ai-status-msg ${statusMessage.type}`}>
              {statusMessage.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Generated Result Output Area */}
          <div className="ai-output-area">
            <div className="ai-output-header">
              <span className="output-title">Hasil Kalimat AI (Dapat Diedit Langsung):</span>
              {generatedText && (
                <div className="output-actions">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="btn-copy-text"
                    title="Salin teks ke clipboard"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? 'Tersalin' : 'Salin'}</span>
                  </button>
                </div>
              )}
            </div>

            <textarea
              rows={6}
              value={generatedText}
              onChange={(e) => setGeneratedText(e.target.value)}
              placeholder="Klik 'Generate Kalimat Sekarang' di atas untuk menyusun draf kalimat otomatis..."
              className="ai-output-textarea"
            />

            <div className="ai-output-footer">
              <span className="word-count">
                {generatedText.trim() ? `${generatedText.trim().split(/\s+/).length} kata • ${generatedText.length} karakter` : '0 kata'}
              </span>
              <span className="footer-hint">
                💡 Tip: Anda bisa langsung mengubah angka, nama institusi, atau teknologi di kotak teks ini sebelum menerapkan.
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="ai-modal-footer">
          <button type="button" onClick={onClose} className="btn-cancel">
            Batal
          </button>
          <button
            type="button"
            onClick={handleApplyToForm}
            disabled={!generatedText?.trim()}
            className="btn-apply-text"
          >
            <Check size={16} />
            <span>Terapkan ke Form</span>
          </button>
        </div>
      </div>

      <style>{`
        .ai-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(10, 15, 13, 0.75);
          backdrop-filter: blur(6px);
          z-index: 1200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: fadeInOverlay 0.2s ease-out;
        }

        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .ai-modal-card {
          background: #17221F;
          border: 1px solid #2B3D37;
          border-radius: 16px;
          width: 100%;
          max-width: 680px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);
          color: #FAFAF7;
          overflow: hidden;
          animation: slideUpModal 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUpModal {
          from { transform: translateY(20px) scale(0.97); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .ai-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid #2B3D37;
          background: rgba(23, 99, 77, 0.08);
        }

        .ai-header-title-box {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .ai-icon-pill {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, #17634D 0%, #29A884 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FAFAF7;
          box-shadow: 0 4px 12px rgba(41, 168, 132, 0.3);
        }

        .ai-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #FAFAF7;
          margin: 0;
        }

        .ai-subtitle {
          font-size: 0.825rem;
          color: #A3B8B0;
          margin: 0.15rem 0 0;
        }

        .ai-subtitle strong {
          color: #3CD1A4;
        }

        .ai-close-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid #2B3D37;
          background: transparent;
          color: #A3B8B0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
        }

        .ai-close-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #FAFAF7;
        }

        .ai-modal-body {
          padding: 1.25rem 1.5rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .ai-context-banner {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding: 0.6rem 0.85rem;
          background: rgba(0, 0, 0, 0.25);
          border: 1px dashed #2B3D37;
          border-radius: 8px;
          font-size: 0.8rem;
        }

        .context-label {
          color: #839990;
        }

        .context-value {
          font-weight: 600;
          color: #FAFAF7;
        }

        .context-chip {
          background: rgba(41, 168, 132, 0.15);
          color: #3CD1A4;
          padding: 0.15rem 0.5rem;
          border-radius: 12px;
          font-size: 0.725rem;
          border: 1px solid rgba(41, 168, 132, 0.3);
        }

        .ai-input-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .ai-input-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #A3B8B0;
        }

        .ai-prompt-input {
          padding: 0.65rem 0.9rem;
          background: #0E1714;
          border: 1px solid #2B3D37;
          border-radius: 8px;
          color: #FAFAF7;
          font-size: 0.875rem;
          transition: border-color 0.2s;
        }

        .ai-prompt-input:focus {
          outline: none;
          border-color: #3CD1A4;
        }

        .ai-tone-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .ai-tone-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .ai-tone-pill {
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          font-size: 0.775rem;
          border: 1px solid #2B3D37;
          background: #0E1714;
          color: #A3B8B0;
          cursor: pointer;
          transition: all 0.15s;
        }

        .ai-tone-pill:hover {
          border-color: #3CD1A4;
          color: #FAFAF7;
        }

        .ai-tone-pill.active {
          background: #17634D;
          border-color: #3CD1A4;
          color: #FAFAF7;
          font-weight: 600;
        }

        .ai-action-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          margin-top: 0.25rem;
        }

        .btn-ai-generate {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.7rem 1.25rem;
          background: linear-gradient(135deg, #17634D 0%, #1E7E63 100%);
          border: 1px solid #29A884;
          border-radius: 8px;
          color: #FAFAF7;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 14px rgba(23, 99, 77, 0.35);
        }

        .btn-ai-generate:hover:not(:disabled) {
          background: linear-gradient(135deg, #1E7E63 0%, #29A884 100%);
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(41, 168, 132, 0.45);
        }

        .btn-ai-generate:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .btn-ai-key-toggle {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.65rem 0.9rem;
          background: #0E1714;
          border: 1px solid #2B3D37;
          border-radius: 8px;
          color: #839990;
          font-size: 0.775rem;
          cursor: pointer;
          transition: all 0.15s;
        }

        .btn-ai-key-toggle:hover {
          color: #FAFAF7;
          border-color: #839990;
        }

        .ai-key-drawer {
          background: #0E1714;
          border: 1px solid #2B3D37;
          border-radius: 8px;
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .key-drawer-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.825rem;
          font-weight: 600;
          color: #3CD1A4;
        }

        .key-drawer-desc {
          font-size: 0.75rem;
          color: #839990;
          margin: 0;
          line-height: 1.4;
        }

        .key-drawer-form {
          display: flex;
          gap: 0.5rem;
        }

        .ai-key-input {
          flex: 1;
          padding: 0.45rem 0.75rem;
          background: #17221F;
          border: 1px solid #2B3D37;
          border-radius: 6px;
          color: #FAFAF7;
          font-size: 0.8rem;
        }

        .btn-key-save {
          padding: 0.45rem 0.85rem;
          background: #17634D;
          border: 1px solid #2B3D37;
          border-radius: 6px;
          color: #FAFAF7;
          font-size: 0.775rem;
          font-weight: 600;
          cursor: pointer;
        }

        .ai-status-msg {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 0.85rem;
          border-radius: 8px;
          font-size: 0.8rem;
        }

        .ai-status-msg.success {
          background: rgba(41, 168, 132, 0.12);
          border: 1px solid rgba(41, 168, 132, 0.3);
          color: #3CD1A4;
        }

        .ai-status-msg.error {
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #EF4444;
        }

        .ai-output-area {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          background: #0E1714;
          border: 1px solid #2B3D37;
          border-radius: 10px;
          padding: 0.85rem;
        }

        .ai-output-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .output-title {
          font-size: 0.8rem;
          font-weight: 600;
          color: #A3B8B0;
        }

        .btn-copy-text {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.55rem;
          background: transparent;
          border: 1px solid #2B3D37;
          border-radius: 6px;
          color: #839990;
          font-size: 0.725rem;
          cursor: pointer;
          transition: all 0.15s;
        }

        .btn-copy-text:hover {
          color: #FAFAF7;
          border-color: #839990;
        }

        .ai-output-textarea {
          width: 100%;
          padding: 0.65rem;
          background: #17221F;
          border: 1px solid #2B3D37;
          border-radius: 6px;
          color: #FAFAF7;
          font-family: inherit;
          font-size: 0.875rem;
          line-height: 1.6;
          resize: vertical;
        }

        .ai-output-textarea:focus {
          outline: none;
          border-color: #3CD1A4;
        }

        .ai-output-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.725rem;
          color: #839990;
        }

        .footer-hint {
          color: #3CD1A4;
        }

        .ai-modal-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          border-top: 1px solid #2B3D37;
          background: #111B18;
        }

        .btn-cancel {
          padding: 0.6rem 1.1rem;
          background: transparent;
          border: 1px solid #2B3D37;
          border-radius: 8px;
          color: #A3B8B0;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.15s;
        }

        .btn-cancel:hover {
          color: #FAFAF7;
          border-color: #839990;
        }

        .btn-apply-text {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.6rem 1.25rem;
          background: #17634D;
          border: 1px solid #29A884;
          border-radius: 8px;
          color: #FAFAF7;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-apply-text:hover:not(:disabled) {
          background: #1E7E63;
        }

        .btn-apply-text:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .spin-icon {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// Inline Trigger Button Helper Component
export function AIAssistTriggerButton({ onClick, label = 'Generate dengan AI', small = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`ai-trigger-btn ${small ? 'ai-trigger-small' : ''}`}
      title="Buka Asisten AI untuk menyusun draf kalimat otomatis"
    >
      <Sparkles size={small ? 12 : 14} />
      <span>{label}</span>
      <style>{`
        .ai-trigger-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.3rem 0.65rem;
          background: rgba(41, 168, 132, 0.12);
          border: 1px solid rgba(41, 168, 132, 0.35);
          border-radius: 14px;
          color: #3CD1A4;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.18s ease-in-out;
          user-select: none;
        }

        .ai-trigger-btn:hover {
          background: rgba(41, 168, 132, 0.25);
          border-color: #3CD1A4;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(41, 168, 132, 0.25);
        }

        .ai-trigger-small {
          padding: 0.2rem 0.5rem;
          font-size: 0.7rem;
        }
      `}</style>
    </button>
  );
}
