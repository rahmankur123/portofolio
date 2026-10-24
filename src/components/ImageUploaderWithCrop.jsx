import React, { useState, useRef } from 'react';
import {
  Upload,
  Crop as CropIcon,
  Image as ImageIcon,
  Check,
  RotateCw,
  Sparkles,
  X
} from './Icons';
import ImageCropModal from './ImageCropModal';

export default function ImageUploaderWithCrop({
  label = 'Upload Foto',
  currentImageUrl = '',
  onImageCropped, // (base64OrUrl) => void
  aspectRatio = '16:9', // '1:1' for profile, '16:9' for project
  shape = 'rect', // 'circle' for avatar, 'rect' for project
  recommendedText = 'Disarankan rasio 16:9',
  buttonLabel = 'Pilih File & Potong'
}) {
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [cropSourceSrc, setCropSourceSrc] = useState('');
  const [urlInputMode, setUrlInputMode] = useState(false);
  const [tempUrl, setTempUrl] = useState('');
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputRef = useRef(null);

  // When a file is picked from device/HP or dragged
  const handleProcessFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Format file harus berupa gambar (JPG, PNG, WebP)!');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const resultDataUrl = reader.result;
      setCropSourceSrc(resultDataUrl);
      setIsCropModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleProcessFile(file);
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleProcessFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  // Crop existing image
  const handleCropExisting = () => {
    if (!currentImageUrl) return;
    setCropSourceSrc(currentImageUrl);
    setIsCropModalOpen(true);
  };

  // Crop from external URL
  const handleApplyUrl = () => {
    if (!tempUrl.trim()) return;
    setCropSourceSrc(tempUrl.trim());
    setIsCropModalOpen(true);
  };

  return (
    <div className="image-uploader-crop-wrapper">
      {label && (
        <div className="uploader-label-row">
          <label className="uploader-label">{label}</label>
          {recommendedText && (
            <span className="uploader-recommended-badge">
              <Sparkles size={12} />
              <span>{recommendedText}</span>
            </span>
          )}
        </div>
      )}

      {/* Main Container */}
      <div className={`uploader-box-container ${isDraggingOver ? 'dragging-over' : ''}`}>
        {/* Left: Preview thumbnail if image exists */}
        {currentImageUrl ? (
          <div className="preview-container">
            <div className={`preview-frame ${shape === 'circle' ? 'is-circle' : 'is-rect'}`}>
              <img
                src={currentImageUrl}
                alt="Pratinjau"
                className="preview-img"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80';
                }}
              />
            </div>
            <button
              type="button"
              onClick={handleCropExisting}
              className="btn-quick-crop"
              title="Potong ulang gambar ini"
            >
              <CropIcon size={14} />
              <span>Potong / Crop Ulang</span>
            </button>
          </div>
        ) : (
          <div className={`preview-placeholder ${shape === 'circle' ? 'is-circle' : 'is-rect'}`}>
            <ImageIcon size={28} />
            <span>Belum ada foto</span>
          </div>
        )}

        {/* Right: Upload Actions & Dropzone */}
        <div
          className="uploader-action-zone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
          />

          {!urlInputMode ? (
            <div className="upload-buttons-column">
              <div className="dropzone-text">
                <Upload size={20} className="upload-icon-pulse" />
                <span className="drop-title">Pilih atau Seret Foto ke Sini</span>
                <span className="drop-sub">Mendukung format JPG, PNG, WebP dari HP atau Komputer</span>
              </div>

              <div className="action-buttons-row">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-upload-file"
                >
                  <Upload size={15} />
                  <span>{buttonLabel}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setUrlInputMode(true)}
                  className="btn-switch-url"
                >
                  Gunakan URL
                </button>
              </div>
            </div>
          ) : (
            <div className="url-input-block">
              <div className="url-input-row">
                <input
                  type="url"
                  placeholder="Tempel tautan URL gambar (https://...)"
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  className="url-field-input"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  disabled={!tempUrl.trim()}
                  className="btn-load-crop-url"
                >
                  <CropIcon size={14} />
                  <span>Load &amp; Crop</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => setUrlInputMode(false)}
                className="btn-cancel-url"
              >
                ← Kembali ke Upload File
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal Cropper */}
      <ImageCropModal
        isOpen={isCropModalOpen}
        imageSrc={cropSourceSrc}
        initialAspectRatio={aspectRatio}
        onClose={() => setIsCropModalOpen(false)}
        onCropComplete={(croppedUrl) => {
          onImageCropped(croppedUrl);
          setIsCropModalOpen(false);
        }}
        title={`Potong ${label || 'Gambar'} (${aspectRatio === '1:1' ? 'Foto Profil 1:1' : 'Dokumentasi 16:9'})`}
      />

      <style>{`
        .image-uploader-crop-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
        }

        .uploader-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .uploader-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #FAFAF7;
        }

        .uploader-recommended-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          font-weight: 600;
          color: #2DD4BF;
          background: rgba(45, 212, 191, 0.1);
          border: 1px solid rgba(45, 212, 191, 0.25);
          padding: 0.15rem 0.5rem;
          border-radius: 999px;
        }

        .uploader-box-container {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #111A17;
          border: 1px dashed #2B3D37;
          border-radius: 12px;
          padding: 1rem;
          transition: all 0.2s ease;
        }

        .uploader-box-container.dragging-over {
          border-color: #2DD4BF;
          background: rgba(45, 212, 191, 0.06);
        }

        /* Preview container */
        .preview-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .preview-frame {
          overflow: hidden;
          background: #1E2D27;
          border: 2px solid #2B3D37;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .preview-frame.is-circle {
          width: 84px;
          height: 84px;
          border-radius: 50%;
        }

        .preview-frame.is-rect {
          width: 130px;
          height: 74px;
          border-radius: 8px;
        }

        .preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .btn-quick-crop {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #172420;
          border: 1px solid #2B3D37;
          color: #2DD4BF;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-quick-crop:hover {
          background: #17634D;
          color: #FFFFFF;
          border-color: #2DD4BF;
        }

        .preview-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.3rem;
          color: #64748B;
          font-size: 0.7rem;
          background: #15221E;
          border: 1px solid #243530;
          flex-shrink: 0;
        }

        .preview-placeholder.is-circle {
          width: 84px;
          height: 84px;
          border-radius: 50%;
        }

        .preview-placeholder.is-rect {
          width: 130px;
          height: 74px;
          border-radius: 8px;
        }

        /* Action zone */
        .uploader-action-zone {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .dropzone-text {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          margin-bottom: 0.6rem;
        }

        .upload-icon-pulse {
          color: #2DD4BF;
        }

        .drop-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: #FAFAF7;
        }

        .drop-sub {
          font-size: 0.72rem;
          color: #94A3B8;
        }

        .action-buttons-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .btn-upload-file {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #17634D;
          border: 1px solid #283C34;
          color: #FFFFFF;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.45rem 0.9rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-upload-file:hover {
          background: #1B755B;
          border-color: #2DD4BF;
          transform: translateY(-1px);
        }

        .btn-switch-url {
          background: transparent;
          border: 1px solid #2B3D37;
          color: #94A3B8;
          font-size: 0.78rem;
          padding: 0.45rem 0.75rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-switch-url:hover {
          color: #FAFAF7;
          border-color: #475569;
        }

        /* URL block */
        .url-input-block {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .url-input-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .url-field-input {
          flex: 1;
          background: #0E1614;
          border: 1px solid #283C34;
          border-radius: 8px;
          padding: 0.45rem 0.75rem;
          color: #FAFAF7;
          font-size: 0.8rem;
          outline: none;
        }

        .url-field-input:focus {
          border-color: #2DD4BF;
        }

        .btn-load-crop-url {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #17634D;
          border: 1px solid #283C34;
          color: #FFFFFF;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.45rem 0.8rem;
          border-radius: 8px;
          cursor: pointer;
          white-space: nowrap;
        }

        .btn-load-crop-url:hover:not(:disabled) {
          background: #1B755B;
          border-color: #2DD4BF;
        }

        .btn-load-crop-url:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-cancel-url {
          background: transparent;
          border: none;
          color: #94A3B8;
          font-size: 0.72rem;
          cursor: pointer;
          align-self: flex-start;
          padding: 0;
        }

        .btn-cancel-url:hover {
          color: #2DD4BF;
          text-decoration: underline;
        }

        @media (max-width: 580px) {
          .uploader-box-container {
            flex-direction: column;
            align-items: flex-start;
          }
          .preview-container {
            align-self: center;
          }
        }
      `}</style>
    </div>
  );
}
