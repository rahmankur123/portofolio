import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  X,
  Check,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Crop as CropIcon,
  Sparkles,
  Image as ImageIcon
} from './Icons';

export default function ImageCropModal({
  isOpen,
  imageSrc,
  initialAspectRatio = '16:9', // '1:1', '16:9', '4:3', '3:2', 'free'
  onClose,
  onCropComplete,
  title = 'Sesuaikan & Potong Gambar'
}) {
  const [aspectRatio, setAspectRatio] = useState(initialAspectRatio);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showCircleGuide, setShowCircleGuide] = useState(initialAspectRatio === '1:1');
  const [imageMeta, setImageMeta] = useState({ naturalWidth: 0, naturalHeight: 0, loaded: false });

  const dragStartRef = useRef({ x: 0, y: 0 });
  const initialPanRef = useRef({ x: 0, y: 0 });
  const cropBoxRef = useRef(null);
  const imgRef = useRef(null);

  // Sync aspect ratio when modal opens or initialAspectRatio changes
  useEffect(() => {
    if (isOpen) {
      setAspectRatio(initialAspectRatio);
      setZoom(1);
      setRotation(0);
      setPan({ x: 0, y: 0 });
      setShowCircleGuide(initialAspectRatio === '1:1');
    }
  }, [isOpen, initialAspectRatio]);

  // Load natural dimensions of source image
  useEffect(() => {
    if (!imageSrc) return;
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setImageMeta({
        naturalWidth: img.naturalWidth || 800,
        naturalHeight: img.naturalHeight || 600,
        loaded: true
      });
    };
    img.onerror = () => {
      setImageMeta({ naturalWidth: 800, naturalHeight: 600, loaded: true });
    };
    img.src = imageSrc;
  }, [imageSrc]);

  // Determine crop box size based on selected aspect ratio
  // Standard container constraint: max width ~480px, max height ~320px
  const getCropBoxDimensions = useCallback(() => {
    const maxWidth = Math.min(window.innerWidth - 64, 460);
    const maxHeight = 300;

    let targetRatio = 16 / 9;
    if (aspectRatio === '1:1') targetRatio = 1;
    else if (aspectRatio === '16:9') targetRatio = 16 / 9;
    else if (aspectRatio === '4:3') targetRatio = 4 / 3;
    else if (aspectRatio === '3:2') targetRatio = 3 / 2;
    else if (aspectRatio === 'free') {
      if (imageMeta.naturalWidth && imageMeta.naturalHeight) {
        targetRatio = imageMeta.naturalWidth / imageMeta.naturalHeight;
      } else {
        targetRatio = 16 / 9;
      }
    }

    let w = maxWidth;
    let h = w / targetRatio;
    if (h > maxHeight) {
      h = maxHeight;
      w = h * targetRatio;
    }
    return { width: Math.round(w), height: Math.round(h) };
  }, [aspectRatio, imageMeta]);

  const { width: cropBoxWidth, height: cropBoxHeight } = getCropBoxDimensions();

  // Compute base cover dimensions so at zoom=1 image completely fills crop frame
  const getBaseImageDimensions = useCallback(() => {
    if (!imageMeta.naturalWidth || !imageMeta.naturalHeight) {
      return { baseWidth: cropBoxWidth, baseHeight: cropBoxHeight };
    }
    // Consider rotation 90 or 270 deg swapped dimensions
    const isSwapped = rotation === 90 || rotation === 270;
    const effNaturalW = isSwapped ? imageMeta.naturalHeight : imageMeta.naturalWidth;
    const effNaturalH = isSwapped ? imageMeta.naturalWidth : imageMeta.naturalHeight;

    const scale = Math.max(cropBoxWidth / effNaturalW, cropBoxHeight / effNaturalH);
    return {
      baseWidth: Math.round(imageMeta.naturalWidth * scale),
      baseHeight: Math.round(imageMeta.naturalHeight * scale)
    };
  }, [imageMeta, cropBoxWidth, cropBoxHeight, rotation]);

  const { baseWidth, baseHeight } = getBaseImageDimensions();

  // Pointer drag events for panning (Desktop & Mobile Touch)
  const handlePointerDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    initialPanRef.current = { ...pan };
    if (e.currentTarget.setPointerCapture) {
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPan({
      x: initialPanRef.current.x + dx,
      y: initialPanRef.current.y + dy
    });
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    if (e.currentTarget.releasePointerCapture) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
  };

  // Perform client-side canvas crop
  const handleApplyCrop = () => {
    if (!imageSrc) return;

    const img = new window.Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      // Determine output canvas size with high crispness and safe memory
      let outputW = 1280;
      let outputH = 720;

      if (aspectRatio === '1:1') {
        outputW = 700;
        outputH = 700;
      } else if (aspectRatio === '16:9') {
        outputW = 1280;
        outputH = 720;
      } else if (aspectRatio === '4:3') {
        outputW = 960;
        outputH = 720;
      } else if (aspectRatio === '3:2') {
        outputW = 1080;
        outputH = 720;
      } else {
        // Freeform
        outputW = Math.round(cropBoxWidth * 2);
        outputH = Math.round(cropBoxHeight * 2);
      }

      const canvas = document.createElement('canvas');
      canvas.width = outputW;
      canvas.height = outputH;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        alert('Gagal memproses gambar pada peramban ini.');
        return;
      }

      // Smooth interpolation
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Fill background (white for transparency fallback or clean edge)
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, outputW, outputH);

      const scaleFactor = outputW / cropBoxWidth;

      // Center context
      ctx.translate(outputW / 2, outputH / 2);
      // Pan offset
      ctx.translate(pan.x * scaleFactor, pan.y * scaleFactor);
      // Rotation
      ctx.rotate((rotation * Math.PI) / 180);
      // Zoom
      ctx.scale(zoom, zoom);

      // Render image centered
      const drawW = baseWidth * scaleFactor;
      const drawH = baseHeight * scaleFactor;

      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);

      try {
        const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
        onCropComplete(croppedDataUrl);
        onClose();
      } catch (err) {
        console.warn('Canvas export tainted, trying direct png fallback', err);
        try {
          const fallbackUrl = canvas.toDataURL();
          onCropComplete(fallbackUrl);
          onClose();
        } catch {
          // If CORS completely blocked, return original
          alert('Gambar eksternal terlindungi CORS. Menggunakan gambar asli.');
          onCropComplete(imageSrc);
          onClose();
        }
      }
    };

    img.onerror = () => {
      alert('Gagal memuat gambar untuk di-crop.');
      onClose();
    };

    img.src = imageSrc;
  };

  if (!isOpen || !imageSrc) return null;

  return (
    <div className="crop-modal-backdrop" onClick={onClose}>
      <div className="crop-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="crop-modal-header">
          <div className="crop-header-title">
            <CropIcon size={20} className="crop-title-icon" />
            <div>
              <h3>{title}</h3>
              <p className="crop-header-sub">
                Geser gambar untuk menentukan posisi terbaik, pilih rasio, lalu simpan.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="crop-close-btn" title="Tutup">
            <X size={20} />
          </button>
        </div>

        {/* Aspect Ratio Presets Bar */}
        <div className="crop-aspect-selector">
          <span className="aspect-label">Format Rasio:</span>
          <div className="aspect-options-row">
            <button
              type="button"
              className={`aspect-btn ${aspectRatio === '1:1' ? 'active' : ''}`}
              onClick={() => {
                setAspectRatio('1:1');
                setShowCircleGuide(true);
                setPan({ x: 0, y: 0 });
              }}
            >
              1:1 (Profil / Avatar)
            </button>
            <button
              type="button"
              className={`aspect-btn ${aspectRatio === '16:9' ? 'active' : ''}`}
              onClick={() => {
                setAspectRatio('16:9');
                setShowCircleGuide(false);
                setPan({ x: 0, y: 0 });
              }}
            >
              16:9 (Dokumentasi Proyek)
            </button>
            <button
              type="button"
              className={`aspect-btn ${aspectRatio === '4:3' ? 'active' : ''}`}
              onClick={() => {
                setAspectRatio('4:3');
                setShowCircleGuide(false);
                setPan({ x: 0, y: 0 });
              }}
            >
              4:3 (Standar Dokumen)
            </button>
            <button
              type="button"
              className={`aspect-btn ${aspectRatio === 'free' ? 'active' : ''}`}
              onClick={() => {
                setAspectRatio('free');
                setShowCircleGuide(false);
                setPan({ x: 0, y: 0 });
              }}
            >
              Bebas / Asli
            </button>
          </div>
        </div>

        {/* Interactive Crop Canvas Viewport */}
        <div className="crop-viewport-container">
          <div
            ref={cropBoxRef}
            className={`crop-box ${isDragging ? 'is-dragging' : ''} ${aspectRatio === '1:1' ? 'is-square' : ''}`}
            style={{ width: `${cropBoxWidth}px`, height: `${cropBoxHeight}px` }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {/* The Draggable / Scalable Image */}
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Crop target"
              draggable={false}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: `${baseWidth}px`,
                height: `${baseHeight}px`,
                maxWidth: 'none',
                transform: `translate(-50%, -50%) translate(${pan.x}px, ${pan.y}px) rotate(${rotation}deg) scale(${zoom})`,
                transformOrigin: 'center center',
                userSelect: 'none',
                pointerEvents: 'none'
              }}
            />

            {/* Rule of Thirds Grid Overlay */}
            <div className="crop-grid-overlay">
              <div className="grid-line grid-v1" />
              <div className="grid-line grid-v2" />
              <div className="grid-line grid-h1" />
              <div className="grid-line grid-h2" />
            </div>

            {/* Optional Circular Guide Overlay for Profile Avatar */}
            {aspectRatio === '1:1' && showCircleGuide && (
              <div className="circle-mask-guide" />
            )}

            {/* Pan & Drag Hint */}
            <div className="crop-drag-hint">
              <span>Tahan &amp; geser untuk memindahkan</span>
            </div>
          </div>
        </div>

        {/* Control Toolbar: Zoom & Rotate */}
        <div className="crop-controls-bar">
          <div className="zoom-control-group">
            <span className="control-label">Perbesar:</span>
            <button
              type="button"
              className="ctrl-icon-btn"
              onClick={() => setZoom((z) => Math.max(0.6, Number((z - 0.15).toFixed(2))))}
              title="Perkecil"
            >
              <ZoomOut size={16} />
            </button>
            <input
              type="range"
              min="0.6"
              max="3"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="crop-zoom-slider"
            />
            <button
              type="button"
              className="ctrl-icon-btn"
              onClick={() => setZoom((z) => Math.min(3, Number((z + 0.15).toFixed(2))))}
              title="Perbesar"
            >
              <ZoomIn size={16} />
            </button>
            <span className="zoom-val-badge">{Math.round(zoom * 100)}%</span>
          </div>

          <div className="extra-tools-group">
            <button
              type="button"
              className="ctrl-icon-btn rotate-btn"
              onClick={() => {
                setRotation((r) => (r + 90) % 360);
                setPan({ x: 0, y: 0 });
              }}
              title="Putar 90 derajat"
            >
              <RotateCw size={16} />
              <span>Putar 90°</span>
            </button>

            {aspectRatio === '1:1' && (
              <button
                type="button"
                className={`ctrl-icon-btn circle-toggle-btn ${showCircleGuide ? 'active' : ''}`}
                onClick={() => setShowCircleGuide(!showCircleGuide)}
                title="Beralih panduan lingkaran avatar"
              >
                <span>Lingkaran Avatar</span>
              </button>
            )}

            <button
              type="button"
              className="ctrl-icon-btn reset-btn"
              onClick={() => {
                setZoom(1);
                setRotation(0);
                setPan({ x: 0, y: 0 });
              }}
              title="Reset Posisi & Zoom"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="crop-modal-footer">
          <button type="button" onClick={onClose} className="crop-btn-cancel">
            Batal
          </button>
          <button type="button" onClick={handleApplyCrop} className="crop-btn-apply">
            <Check size={18} />
            <span>Terapkan &amp; Simpan Hasil Crop</span>
          </button>
        </div>
      </div>

      <style>{`
        .crop-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(8, 14, 12, 0.85);
          backdrop-filter: blur(8px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: fadeIn 0.2s ease-out;
        }

        .crop-modal-card {
          background: #111A17;
          border: 1px solid #283C34;
          border-radius: 16px;
          width: 100%;
          max-width: 580px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
          overflow: hidden;
          animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .crop-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.1rem 1.25rem;
          border-bottom: 1px solid #1E2D27;
        }

        .crop-header-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .crop-title-icon {
          color: #2DD4BF;
        }

        .crop-header-title h3 {
          font-size: 1.05rem;
          font-weight: 700;
          color: #FAFAF7;
          margin: 0;
        }

        .crop-header-sub {
          font-size: 0.78rem;
          color: #94A3B8;
          margin: 0.15rem 0 0 0;
        }

        .crop-close-btn {
          background: transparent;
          border: none;
          color: #94A3B8;
          cursor: pointer;
          padding: 0.4rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }

        .crop-close-btn:hover {
          color: #FAFAF7;
          background: rgba(255, 255, 255, 0.08);
        }

        /* Aspect ratio selection chips */
        .crop-aspect-selector {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1.25rem;
          background: #0D1412;
          border-bottom: 1px solid #1E2D27;
          overflow-x: auto;
        }

        .aspect-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #A7F3D0;
          white-space: nowrap;
        }

        .aspect-options-row {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .aspect-btn {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.35rem 0.65rem;
          border-radius: 6px;
          border: 1px solid #283C34;
          background: #172420;
          color: #D1D5DB;
          cursor: pointer;
          transition: all 0.15s ease;
          white-space: nowrap;
        }

        .aspect-btn:hover {
          border-color: #2DD4BF;
          color: #FAFAF7;
        }

        .aspect-btn.active {
          background: #17634D;
          border-color: #2DD4BF;
          color: #FFFFFF;
          box-shadow: 0 0 10px rgba(45, 212, 191, 0.3);
        }

        /* Viewport */
        .crop-viewport-container {
          padding: 1.5rem 1.25rem;
          background: #090F0D;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 280px;
          max-height: 360px;
          overflow: hidden;
          position: relative;
        }

        .crop-box {
          position: relative;
          overflow: hidden;
          border: 2px solid #2DD4BF;
          border-radius: 10px;
          box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.65);
          cursor: grab;
          touch-action: none;
          transition: box-shadow 0.2s ease;
        }

        .crop-box.is-dragging {
          cursor: grabbing;
        }

        /* Rule of Thirds Grid */
        .crop-grid-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .grid-line {
          position: absolute;
          background: rgba(255, 255, 255, 0.25);
        }

        .grid-v1 { left: 33.333%; top: 0; bottom: 0; width: 1px; }
        .grid-v2 { left: 66.666%; top: 0; bottom: 0; width: 1px; }
        .grid-h1 { top: 33.333%; left: 0; right: 0; height: 1px; }
        .grid-h2 { top: 66.666%; left: 0; right: 0; height: 1px; }

        /* Circular guide for avatar */
        .circle-mask-guide {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px dashed rgba(45, 212, 191, 0.8);
          box-shadow: 0 0 0 9999px rgba(17, 26, 23, 0.35);
          pointer-events: none;
        }

        .crop-drag-hint {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(17, 26, 23, 0.75);
          backdrop-filter: blur(4px);
          padding: 0.2rem 0.6rem;
          border-radius: 12px;
          font-size: 0.68rem;
          color: #E2E8F0;
          pointer-events: none;
          white-space: nowrap;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Controls */
        .crop-controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.25rem;
          background: #111A17;
          border-top: 1px solid #1E2D27;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .zoom-control-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex: 1;
          min-width: 220px;
        }

        .control-label {
          font-size: 0.75rem;
          color: #94A3B8;
          font-weight: 600;
        }

        .crop-zoom-slider {
          flex: 1;
          accent-color: #2DD4BF;
          height: 5px;
          background: #283C34;
          border-radius: 4px;
          cursor: pointer;
        }

        .zoom-val-badge {
          font-size: 0.72rem;
          font-family: monospace;
          color: #2DD4BF;
          min-width: 40px;
        }

        .ctrl-icon-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #172420;
          border: 1px solid #283C34;
          color: #E2E8F0;
          padding: 0.35rem 0.6rem;
          border-radius: 6px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .ctrl-icon-btn:hover {
          background: #1F302B;
          border-color: #2DD4BF;
          color: #FFFFFF;
        }

        .ctrl-icon-btn.active {
          background: #17634D;
          border-color: #2DD4BF;
          color: #FFFFFF;
        }

        .extra-tools-group {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        /* Footer */
        .crop-modal-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          background: #0D1412;
          border-top: 1px solid #1E2D27;
        }

        .crop-btn-cancel {
          background: transparent;
          border: 1px solid #334155;
          color: #94A3B8;
          padding: 0.55rem 1rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .crop-btn-cancel:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #FAFAF7;
        }

        .crop-btn-apply {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #17634D;
          border: 1px solid #2DD4BF;
          color: #FFFFFF;
          padding: 0.55rem 1.25rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(23, 99, 77, 0.4);
          transition: all 0.15s ease;
        }

        .crop-btn-apply:hover {
          background: #1B755B;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(45, 212, 191, 0.35);
        }

        @media (max-width: 600px) {
          .crop-controls-bar {
            flex-direction: column;
            align-items: stretch;
          }
          .extra-tools-group {
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
}
