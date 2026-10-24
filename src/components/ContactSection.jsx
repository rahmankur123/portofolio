import React, { useState } from 'react';
import {
  Send,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
  ShieldCheck,
  Sparkles
} from './Icons';
import { submitContactMessage } from '../services/portfolioStorage';

export default function ContactSection({ profile, onMessageSent }) {
  const [formData, setFormData] = useState({
    sender_name: '',
    sender_email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successStatus, setSuccessStatus] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.sender_name.trim()) {
      errs.sender_name = 'Nama lengkap wajib diisi.';
    } else if (formData.sender_name.trim().length < 2) {
      errs.sender_name = 'Nama minimal 2 karakter.';
    }

    if (!formData.sender_email.trim()) {
      errs.sender_email = 'Alamat email wajib diisi.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.sender_email.trim())) {
      errs.sender_email = 'Format alamat email tidak valid (contoh: nama@domain.com).';
    }

    if (!formData.message.trim()) {
      errs.message = 'Isi pesan tidak boleh kosong.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Pesan terlalu pendek, mohon jelaskan minimal 10 karakter.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSuccessStatus(null);

    try {
      // Simulasikan delay network realistis
      await new Promise((res) => setTimeout(res, 600));

      const res = await submitContactMessage(formData);
      setSuccessStatus({
        message: 'Terima kasih! Pesan Anda telah terkirim dan tersimpan aman di database CMS.'
      });

      // Reset form
      setFormData({
        sender_name: '',
        sender_email: '',
        subject: '',
        message: ''
      });

      if (onMessageSent) {
        onMessageSent(res.data);
      }
    } catch (err) {
      setErrors({ form: err.message || 'Gagal mengirim pesan. Silakan coba lagi.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <MessageSquare size={14} />
            <span>Kirim Pesan</span>
          </div>
          <h2 className="section-title">Mari Terhubung & Berkolaborasi</h2>
          <p className="section-subtitle">
            Punya ide proyek, tawaran magang, posisi junior developer, atau sekadar ingin berdiskusi teknis? Kirimkan pesan melalui form di bawah.
          </p>
        </div>

        <div className="contact-layout-grid">
          {/* Left: Contact Form Card */}
          <div className="contact-form-card card">
            <h3 className="form-card-title">Formulir Komunikasi Langsung</h3>

            {successStatus && (
              <div className="success-banner">
                <CheckCircle2 size={20} className="success-icon" />
                <p className="success-text">{successStatus.message}</p>
              </div>
            )}

            {errors.form && (
              <div className="error-banner">
                <AlertCircle size={20} className="error-icon" />
                <p className="error-text">{errors.form}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="contact-form">
              {/* Name & Email Row */}
              <div className="form-row-two">
                <div className="form-field">
                  <label htmlFor="sender_name" className="field-label">
                    Nama Lengkap <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="sender_name"
                    name="sender_name"
                    value={formData.sender_name}
                    onChange={handleChange}
                    placeholder="e.g. Budi Santoso"
                    className={`form-input ${errors.sender_name ? 'input-error' : ''}`}
                    disabled={isSubmitting}
                  />
                  {errors.sender_name && (
                    <span className="field-error-msg">{errors.sender_name}</span>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="sender_email" className="field-label">
                    Email Pengirim <span className="required-star">*</span>
                  </label>
                  <input
                    type="email"
                    id="sender_email"
                    name="sender_email"
                    value={formData.sender_email}
                    onChange={handleChange}
                    placeholder="e.g. budi@perusahaan.com"
                    className={`form-input ${errors.sender_email ? 'input-error' : ''}`}
                    disabled={isSubmitting}
                  />
                  {errors.sender_email && (
                    <span className="field-error-msg">{errors.sender_email}</span>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="form-field">
                <label htmlFor="subject" className="field-label">
                  Subjek / Topik Diskusi <span className="optional-tag">(Opsional)</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Tawaran Peluang Magang Web Developer"
                  className="form-input"
                  disabled={isSubmitting}
                />
              </div>

              {/* Message */}
              <div className="form-field">
                <label htmlFor="message" className="field-label">
                  Pesan Anda <span className="required-star">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tuliskan detail pertanyaan, cakupan proyek, atau informasi lowongan Anda di sini..."
                  className={`form-textarea ${errors.message ? 'input-error' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <span className="field-error-msg">{errors.message}</span>
                )}
              </div>

              {/* Submit CTA */}
              <div className="form-submit-row">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary submit-btn"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="spinner" />
                      <span>Sedang Mengirim Pesan...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Kirim Pesan Sekarang</span>
                    </>
                  )}
                </button>

                <div className="privacy-guarantee">
                  <ShieldCheck size={16} />
                  <span>Validasi & penyimpanan data terlindungi (PRD 5.3)</span>
                </div>
              </div>
            </form>
          </div>

          {/* Right: Info Cards */}
          <div className="contact-info-column">
            <div className="info-card card">
              <h4 className="info-card-title">Saluran Komunikasi</h4>
              <p className="info-card-sub">
                Saya selalu terbuka untuk berdiskusi seputar peluang kerja sama atau proyek teknologi.
              </p>

              <div className="info-items-list">
                <div className="info-item">
                  <div className="info-icon-wrapper">
                    <Mail size={18} />
                  </div>
                  <div className="info-text">
                    <span className="info-label">Email Publik</span>
                    <a href={`mailto:${profile?.public_email}`} className="info-value email-link">
                      {profile?.public_email || 'alifian.work@example.com'}
                    </a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon-wrapper">
                    <MapPin size={18} />
                  </div>
                  <div className="info-text">
                    <span className="info-label">Domisili</span>
                    <span className="info-value">{profile?.location || 'Surabaya, Jawa Timur, Indonesia'}</span>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon-wrapper">
                    <Clock size={18} />
                  </div>
                  <div className="info-text">
                    <span className="info-label">Komitmen Respon</span>
                    <span className="info-value">{profile?.response_time || 'Biasanya merespons dalam < 24 jam'}</span>
                  </div>
                </div>
              </div>

              <div className="availability-summary-box">
                <span className="status-dot dot-online" />
                <span className="avail-text">
                  Status Saat Ini: <strong>{profile?.availability}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-section {
          background-color: var(--bg-surface-alt);
        }

        .contact-layout-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }

        @media (min-width: 992px) {
          .contact-layout-grid {
            grid-template-columns: 1.25fr 0.85fr;
            gap: 3rem;
          }
        }

        .contact-form-card {
          padding: 2.25rem;
          border-radius: var(--radius-xl);
        }

        .form-card-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .success-banner {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          background-color: var(--status-online-bg);
          border: 1px solid rgba(16, 185, 129, 0.35);
          border-radius: var(--radius-md);
          margin-bottom: 1.5rem;
        }

        .success-icon {
          color: var(--status-online-text);
          flex-shrink: 0;
        }

        .success-text {
          font-size: 0.9rem;
          color: var(--status-online-text);
          font-weight: 600;
        }

        .error-banner {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          background-color: #FEE2E2;
          border: 1px solid #F87171;
          border-radius: var(--radius-md);
          margin-bottom: 1.5rem;
        }

        .error-icon {
          color: #B91C1C;
          flex-shrink: 0;
        }

        .error-text {
          font-size: 0.9rem;
          color: #B91C1C;
          font-weight: 600;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-row-two {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }

        @media (min-width: 640px) {
          .form-row-two {
            grid-template-columns: 1fr 1fr;
          }
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .field-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .required-star {
          color: #DC2626;
        }

        .optional-tag {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: normal;
        }

        .form-input, .form-textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          font-size: 0.925rem;
          font-family: inherit;
          color: var(--text-primary);
          background-color: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: var(--radius-md);
          outline: none;
          transition: all var(--transition-fast);
        }

        .form-input:focus, .form-textarea:focus {
          border-color: var(--primary-green);
          box-shadow: 0 0 0 3px var(--primary-green-pale);
        }

        .input-error {
          border-color: #EF4444 !important;
          background-color: #FEF2F2 !important;
        }

        .field-error-msg {
          font-size: 0.775rem;
          color: #DC2626;
          font-weight: 500;
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .form-submit-row {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        @media (min-width: 640px) {
          .form-submit-row {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .submit-btn {
          padding: 0.85rem 1.75rem;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .privacy-guarantee {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.775rem;
          color: var(--text-muted);
        }

        /* Right column */
        .info-card {
          padding: 2rem;
          border-radius: var(--radius-xl);
          background-color: var(--bg-surface);
        }

        .info-card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.4rem;
        }

        .info-card-sub {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 1.75rem;
        }

        .info-items-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          padding-bottom: 1.75rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .info-icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          background-color: var(--primary-green-pale);
          color: var(--primary-green);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-text {
          display: flex;
          flex-direction: column;
        }

        .info-label {
          font-size: 0.775rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-muted);
        }

        .info-value {
          font-size: 0.925rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-top: 0.15rem;
        }

        .email-link {
          color: var(--primary-green);
          text-decoration: underline;
        }

        .availability-summary-box {
          margin-top: 1.75rem;
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.85rem 1.15rem;
          background-color: var(--status-online-bg);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: var(--radius-md);
        }

        .avail-text {
          font-size: 0.825rem;
          color: var(--status-online-text);
        }
      `}</style>
    </section>
  );
}
