import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Globe,
  Wrench,
  Trash2,
  RefreshCw,
  Mail,
  FolderGit2,
  Layers,
  ArrowRight,
  ShieldCheck,
  Palette,
  User,
  GraduationCap,
  Briefcase,
  Cpu,
  Plus,
  Edit,
  Save,
  Check,
  Image as ImageIcon,
  Upload,
  Star,
  Crop as CropIcon
} from './Icons';
import { THEME_PRESETS, defaultTheme } from '../services/portfolioStorage';
import ImageUploaderWithCrop from './ImageUploaderWithCrop';
import ImageCropModal from './ImageCropModal';
import SupabaseConfigCard from './SupabaseConfigCard';
import TechStackInput from './TechStackInput';
import AITextGeneratorModal, { AIAssistTriggerButton } from './AITextGeneratorModal';

export default function AdminPreviewModal({
  isOpen,
  onClose,
  // Current states
  theme,
  profile,
  educations,
  experiences,
  skillCategories,
  allAdminProjects,
  siteSettings,
  socialLinks,
  adminMessages,
  // Handlers
  onUpdateTheme,
  onUpdateProfile,
  onUpdateEducations,
  onUpdateExperiences,
  onUpdateSkillCategories,
  onUpdateProjects,
  onUpdateSiteSettings,
  onUpdateSocialLinks,
  onTogglePublish,
  onUpdateDemoStatus,
  onUpdateMessageStatus,
  onDeleteMessage,
  onResetData
}) {
  const [activeTab, setActiveTab] = useState('theme'); // 'theme', 'profile', 'projects', 'educations', 'experiences', 'skills', 'messages', 'socials'

  // Form states for adding/editing items
  const [editingProject, setEditingProject] = useState(null);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageCaption, setNewImageCaption] = useState('');
  const [galleryCropModal, setGalleryCropModal] = useState({
    isOpen: false,
    type: 'add',
    index: -1,
    src: '',
    caption: ''
  });

  const [editingEdu, setEditingEdu] = useState(null);
  const [editingExp, setEditingExp] = useState(null);
  const [aiModal, setAiModal] = useState({
    isOpen: false,
    fieldType: '',
    fieldLabel: '',
    context: {},
    currentValue: '',
    onApply: () => {}
  });

  // Local draft states for forms
  const [themeForm, setThemeForm] = useState(theme || defaultTheme);
  const [profileForm, setProfileForm] = useState(profile || {});
  const [settingsForm, setSettingsForm] = useState(siteSettings || {});
  const [socialsForm, setSocialsForm] = useState(socialLinks || []);

  const isDirtyRef = useRef({
    theme: false,
    profile: false,
    settings: false,
    socials: false
  });

  useEffect(() => {
    if (theme && !isDirtyRef.current.theme) setThemeForm(theme);
  }, [theme]);

  useEffect(() => {
    if (profile && !isDirtyRef.current.profile) setProfileForm(profile);
  }, [profile]);

  useEffect(() => {
    if (siteSettings && !isDirtyRef.current.settings) setSettingsForm(siteSettings);
  }, [siteSettings]);

  useEffect(() => {
    if (socialLinks && !isDirtyRef.current.socials) setSocialsForm(socialLinks);
  }, [socialLinks]);

  if (!isOpen) return null;

  // Handler: Apply Theme Preset
  const handleSelectPreset = (preset) => {
    const updated = {
      ...themeForm,
      ...preset,
      presetName: preset.name
    };
    setThemeForm(updated);
    onUpdateTheme(updated);
  };

  // Handler: Custom Primary Color Change
  const handleCustomPrimaryColor = (color) => {
    // Generate soft pale tints automatically
    const updated = {
      ...themeForm,
      primaryColor: color,
      primaryHover: color,
      primaryPale: `${color}1A`, // 10% opacity hex
      primaryLight: `${color}0D`, // 5% opacity hex
      primaryBorder: `${color}40`, // 25% opacity hex
      presetName: 'Kustom'
    };
    setThemeForm(updated);
    onUpdateTheme(updated);
  };

  // Handler: Custom Background Color Change
  const handleCustomBgColor = (bgColor) => {
    const updated = {
      ...themeForm,
      bgMain: bgColor
    };
    setThemeForm(updated);
    onUpdateTheme(updated);
  };

  // Handler: Save Profile
  const handleSaveProfile = (e) => {
    e.preventDefault();
    isDirtyRef.current.profile = false;
    onUpdateProfile(profileForm);
  };

  // Handler: Save Site Settings
  const handleSaveSettings = (e) => {
    e.preventDefault();
    isDirtyRef.current.settings = false;
    onUpdateSiteSettings(settingsForm);
  };

  // =================== PROJECT CRUD & GALLERY ===================
  const handleOpenNewProject = () => {
    const defaultSample = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80';
    setEditingProject({
      title: '',
      slug: '',
      short_description: '',
      description: '',
      category: 'Full-Stack Web App',
      role: 'Full-Stack Developer',
      technologies: ['React', 'CSS'],
      publication_status: 'PUBLISHED',
      demo_status: 'ONLINE',
      live_url: '',
      repository_url: '',
      cover_image: defaultSample,
      images: [
        {
          id: 1,
          image_url: defaultSample,
          caption: 'Tampilan Antarmuka Utama'
        }
      ]
    });
    setNewImageUrl('');
    setNewImageCaption('');
  };

  const handleOpenEditProject = (proj) => {
    const projectImages = Array.isArray(proj.images) && proj.images.length > 0
      ? proj.images
      : (proj.cover_image ? [{ id: 1, image_url: proj.cover_image, caption: proj.title || 'Foto Proyek' }] : []);
    const cover_image = proj.cover_image || projectImages[0]?.image_url || '';

    setEditingProject({
      ...proj,
      cover_image,
      images: projectImages
    });
    setNewImageUrl('');
    setNewImageCaption('');
  };

  // File Upload via FileReader with auto 16:9 crop modal for project documentation
  const handleImageFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Format file harus berupa gambar (JPG, PNG, WebP, dll)!');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setGalleryCropModal({
        isOpen: true,
        type: 'add',
        index: -1,
        src: reader.result,
        caption: file.name.replace(/\.[^/.]+$/, '')
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleGalleryCropComplete = (croppedUrl) => {
    if (galleryCropModal.type === 'add') {
      const currentImages = Array.isArray(editingProject.images) ? [...editingProject.images] : [];
      const newImgObj = {
        id: Date.now(),
        image_url: croppedUrl,
        caption: galleryCropModal.caption || 'Foto Dokumentasi Proyek'
      };
      const updatedImages = [...currentImages, newImgObj];
      const updatedCover = editingProject.cover_image || croppedUrl;
      setEditingProject({
        ...editingProject,
        images: updatedImages,
        cover_image: updatedCover
      });
    } else if (galleryCropModal.type === 'edit' && galleryCropModal.index >= 0) {
      const idx = galleryCropModal.index;
      const updated = [...editingProject.images];
      const oldUrl = updated[idx]?.image_url;
      updated[idx] = { ...updated[idx], image_url: croppedUrl };
      let updatedCover = editingProject.cover_image;
      if (oldUrl === editingProject.cover_image) {
        updatedCover = croppedUrl;
      }
      setEditingProject({
        ...editingProject,
        images: updated,
        cover_image: updatedCover
      });
    }
    setGalleryCropModal({ isOpen: false, type: 'add', index: -1, src: '', caption: '' });
  };

  // Add Photo via URL
  const handleAddPhotoByUrl = () => {
    if (!newImageUrl.trim()) return;
    const currentImages = Array.isArray(editingProject.images) ? [...editingProject.images] : [];
    const newImgObj = {
      id: Date.now(),
      image_url: newImageUrl.trim(),
      caption: newImageCaption.trim() || 'Foto Proyek'
    };
    const updatedImages = [...currentImages, newImgObj];
    const updatedCover = editingProject.cover_image || newImageUrl.trim();
    setEditingProject({
      ...editingProject,
      images: updatedImages,
      cover_image: updatedCover
    });
    setNewImageUrl('');
    setNewImageCaption('');
  };

  // Add Quick Sample Image
  const handleAddSampleImage = (url, caption) => {
    const currentImages = Array.isArray(editingProject.images) ? [...editingProject.images] : [];
    const newImgObj = {
      id: Date.now(),
      image_url: url,
      caption: caption
    };
    const updatedImages = [...currentImages, newImgObj];
    const updatedCover = editingProject.cover_image || url;
    setEditingProject({
      ...editingProject,
      images: updatedImages,
      cover_image: updatedCover
    });
  };

  // Set selected photo as Thumbnail (Cover Image)
  const handleSetThumbnail = (imageUrl) => {
    setEditingProject({
      ...editingProject,
      cover_image: imageUrl
    });
  };

  // Remove photo
  const handleRemovePhoto = (indexToRemove) => {
    const currentImages = Array.isArray(editingProject.images) ? [...editingProject.images] : [];
    const removedImg = currentImages[indexToRemove];
    const updatedImages = currentImages.filter((_, idx) => idx !== indexToRemove);
    let updatedCover = editingProject.cover_image;
    if (removedImg?.image_url === editingProject.cover_image) {
      updatedCover = updatedImages[0]?.image_url || '';
    }
    setEditingProject({
      ...editingProject,
      images: updatedImages,
      cover_image: updatedCover
    });
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!editingProject.title?.trim()) {
      alert('Judul proyek tidak boleh kosong!');
      return;
    }

    const images = Array.isArray(editingProject.images) && editingProject.images.length > 0
      ? editingProject.images
      : (editingProject.cover_image ? [{ id: Date.now(), image_url: editingProject.cover_image, caption: editingProject.title }] : []);
    const cover_image = editingProject.cover_image || images[0]?.image_url || '';

    const projectToSave = {
      ...editingProject,
      cover_image,
      images,
      summary: editingProject.short_description || editingProject.summary || ''
    };

    let updatedList;
    if (editingProject.id) {
      // Edit existing
      updatedList = allAdminProjects.map((p) =>
        p.id === editingProject.id ? { ...p, ...projectToSave } : p
      );
    } else {
      // Add new
      const newProj = {
        ...projectToSave,
        id: Date.now(),
        slug: editingProject.slug || editingProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        publication_status: editingProject.publication_status || 'PUBLISHED',
        demo_status: editingProject.demo_status || 'ONLINE',
        published_at: new Date().toISOString().split('T')[0],
        sort_order: allAdminProjects.length + 1
      };
      updatedList = [newProj, ...allAdminProjects];
    }

    onUpdateProjects(updatedList);
    setEditingProject(null);
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Hapus proyek ini dari database portofolio?')) {
      const updatedList = allAdminProjects.filter((p) => p.id !== id);
      onUpdateProjects(updatedList);
      if (editingProject?.id === id) setEditingProject(null);
    }
  };

  // =================== EDUCATION CRUD ===================
  const handleSaveEducation = (e) => {
    e.preventDefault();
    if (!editingEdu.institution?.trim()) return;

    let updatedList;
    if (editingEdu.id) {
      updatedList = educations.map((item) =>
        item.id === editingEdu.id ? { ...editingEdu } : item
      );
    } else {
      const newEdu = {
        ...editingEdu,
        id: Date.now(),
        sort_order: educations.length + 1,
        is_visible: true
      };
      updatedList = [...educations, newEdu];
    }
    onUpdateEducations(updatedList);
    setEditingEdu(null);
  };

  const handleDeleteEducation = (id) => {
    if (window.confirm('Hapus data pendidikan ini?')) {
      const updated = educations.filter((item) => item.id !== id);
      onUpdateEducations(updated);
      if (editingEdu?.id === id) setEditingEdu(null);
    }
  };

  // =================== EXPERIENCE CRUD ===================
  const handleSaveExperience = (e) => {
    e.preventDefault();
    if (!editingExp.organization?.trim()) return;

    let updatedList;
    if (editingExp.id) {
      updatedList = experiences.map((item) =>
        item.id === editingExp.id ? { ...editingExp } : item
      );
    } else {
      const newExp = {
        ...editingExp,
        id: Date.now(),
        sort_order: experiences.length + 1,
        is_visible: true
      };
      updatedList = [...experiences, newExp];
    }
    onUpdateExperiences(updatedList);
    setEditingExp(null);
  };

  const handleDeleteExperience = (id) => {
    if (window.confirm('Hapus data pengalaman ini?')) {
      const updated = experiences.filter((item) => item.id !== id);
      onUpdateExperiences(updated);
      if (editingExp?.id === id) setEditingExp(null);
    }
  };

  // =================== SOCIAL LINKS ===================
  const handleSaveSocials = (e) => {
    e.preventDefault();
    onUpdateSocialLinks(socialsForm);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content cms-admin-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="admin-modal-header">
          <div className="admin-header-title-box">
            <div className="admin-badge-icon">
              <Sliders size={20} />
            </div>
            <div>
              <h2 className="admin-modal-title">Panel CMS & Manajemen Konten</h2>
              <p className="admin-modal-subtitle">
                Ubah seluruh data teks, proyek, dan warna tema landing page secara real-time.
              </p>
            </div>
          </div>

          <button onClick={onClose} className="modal-close-btn" aria-label="Tutup Admin Modal">
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation Menu */}
        <div className="admin-navigation-tabs">
          <button
            onClick={() => setActiveTab('theme')}
            className={`cms-tab-btn ${activeTab === 'theme' ? 'active-tab' : ''}`}
          >
            <Palette size={16} />
            <span>Tema & Warna</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`cms-tab-btn ${activeTab === 'profile' ? 'active-tab' : ''}`}
          >
            <User size={16} />
            <span>Profil & Hero</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('projects');
              setEditingProject(null);
            }}
            className={`cms-tab-btn ${activeTab === 'projects' ? 'active-tab' : ''}`}
          >
            <FolderGit2 size={16} />
            <span>Proyek ({allAdminProjects.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('educations');
              setEditingEdu(null);
            }}
            className={`cms-tab-btn ${activeTab === 'educations' ? 'active-tab' : ''}`}
          >
            <GraduationCap size={16} />
            <span>Pendidikan ({educations.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('experiences');
              setEditingExp(null);
            }}
            className={`cms-tab-btn ${activeTab === 'experiences' ? 'active-tab' : ''}`}
          >
            <Briefcase size={16} />
            <span>Pengalaman ({experiences.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`cms-tab-btn ${activeTab === 'messages' ? 'active-tab' : ''}`}
          >
            <Mail size={16} />
            <span>Pesan ({adminMessages.length})</span>
            {adminMessages.filter((m) => m.status === 'NEW').length > 0 && (
              <span className="cms-tab-counter">
                {adminMessages.filter((m) => m.status === 'NEW').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('socials')}
            className={`cms-tab-btn ${activeTab === 'socials' ? 'active-tab' : ''}`}
          >
            <Globe size={16} />
            <span>Tautan Sosial</span>
          </button>
        </div>

        {/* CMS Body Content */}
        <div className="admin-modal-body">
          {/* ========================================================
              TAB 1: TEMA & WARNA WEBSITE
             ======================================================== */}
          {activeTab === 'theme' && (
            <div className="cms-tab-pane">
              <div className="cms-section-card">
                <h3 className="cms-card-title">Pilihan Palet Warna Aksen (Primary Color)</h3>
                <p className="cms-card-desc">
                  Ubah warna tombol utama, badge, garis aktif, dan aksen landing page secara instan.
                </p>

                {/* Preset Colors Grid */}
                <div className="theme-presets-grid">
                  {THEME_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectPreset(preset)}
                      className={`preset-btn ${themeForm.presetName === preset.name ? 'preset-active' : ''}`}
                    >
                      <div
                        className="preset-color-circle"
                        style={{ backgroundColor: preset.primaryColor }}
                      />
                      <span className="preset-name">{preset.name}</span>
                      {themeForm.presetName === preset.name && (
                        <Check size={14} className="preset-check-icon" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Custom Color Picker */}
                <div className="custom-color-row">
                  <div className="color-picker-box">
                    <label className="picker-label">Atur Warna Bebas (Hex Picker):</label>
                    <div className="picker-input-group">
                      <input
                        type="color"
                        value={themeForm.primaryColor}
                        onChange={(e) => handleCustomPrimaryColor(e.target.value)}
                        className="color-picker-native"
                      />
                      <input
                        type="text"
                        value={themeForm.primaryColor}
                        onChange={(e) => handleCustomPrimaryColor(e.target.value)}
                        className="form-input color-hex-text"
                      />
                    </div>
                  </div>

                  {/* Background Tint Picker */}
                  <div className="color-picker-box">
                    <label className="picker-label">Warna Dasar Latar Halaman (Background):</label>
                    <div className="bg-options-row">
                      {[
                        { label: 'Off-White Ivory', val: '#F7F7F3' },
                        { label: 'Clean White', val: '#FFFFFF' },
                        { label: 'Warm Ivory', val: '#FAF8F5' },
                        { label: 'Soft Slate', val: '#F8FAFC' }
                      ].map((bg, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleCustomBgColor(bg.val)}
                          className={`bg-chip ${themeForm.bgMain === bg.val ? 'bg-chip-active' : ''}`}
                        >
                          <span className="chip-circle" style={{ backgroundColor: bg.val }} />
                          <span>{bg.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Site Identity Settings */}
              <div className="cms-section-card">
                <h3 className="cms-card-title">Judul Situs & Teks Utama (Site Identity)</h3>
                <form onSubmit={handleSaveSettings} className="cms-form-grid">
                  <div className="form-field">
                    <label className="field-label">Judul Situs (Page Title / Navbar)</label>
                    <input
                      type="text"
                      value={settingsForm.site_title || ''}
                      onChange={(e) => {
                        isDirtyRef.current.settings = true;
                        setSettingsForm({ ...settingsForm, site_title: e.target.value });
                      }}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Teks Badge Ketersediaan (Hero)</label>
                    <input
                      type="text"
                      value={settingsForm.hero_badge_text || ''}
                      onChange={(e) => {
                        isDirtyRef.current.settings = true;
                        setSettingsForm({ ...settingsForm, hero_badge_text: e.target.value });
                      }}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Awalan Headline Hero</label>
                    <input
                      type="text"
                      value={settingsForm.hero_headline_prefix || ''}
                      onChange={(e) => {
                        isDirtyRef.current.settings = true;
                        setSettingsForm({ ...settingsForm, hero_headline_prefix: e.target.value });
                      }}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Sorotan Headline Hero (Aksen Berwarna)</label>
                    <input
                      type="text"
                      value={settingsForm.hero_headline_highlight || ''}
                      onChange={(e) => {
                        isDirtyRef.current.settings = true;
                        setSettingsForm({ ...settingsForm, hero_headline_highlight: e.target.value });
                      }}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field full-width">
                    <label className="field-label">Teks Footer Hak Cipta</label>
                    <input
                      type="text"
                      value={settingsForm.footer_text || ''}
                      onChange={(e) => {
                        isDirtyRef.current.settings = true;
                        setSettingsForm({ ...settingsForm, footer_text: e.target.value });
                      }}
                      className="form-input"
                    />
                  </div>

                  <div className="form-actions-row">
                    <button type="submit" className="btn btn-primary btn-sm">
                      <Save size={15} />
                      <span>Simpan Pengaturan Teks Situs</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 2: PROFIL & HERO DATA
             ======================================================== */}
          {activeTab === 'profile' && (
            <div className="cms-tab-pane">
              <form onSubmit={handleSaveProfile} className="cms-section-card cms-form-grid">
                <h3 className="cms-card-title full-width">Data Profil Publik</h3>

                <div className="form-field">
                  <label className="field-label">Nama Lengkap</label>
                  <input
                    type="text"
                    value={profileForm.full_name || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-field">
                  <div className="label-with-ai-row">
                    <label className="field-label">Headline Profesi</label>
                    <AIAssistTriggerButton
                      label="✨ AI Headline"
                      small
                      onClick={() =>
                        setAiModal({
                          isOpen: true,
                          fieldType: 'profile_headline',
                          fieldLabel: 'Headline Profesi',
                          context: profileForm,
                          currentValue: profileForm.headline || '',
                          onApply: (text) => setProfileForm((prev) => ({ ...prev, headline: text }))
                        })
                      }
                    />
                  </div>
                  <input
                    type="text"
                    value={profileForm.headline || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">Email Publik</label>
                  <input
                    type="email"
                    value={profileForm.public_email || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, public_email: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">Domisili / Lokasi</label>
                  <input
                    type="text"
                    value={profileForm.location || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">Status Ketersediaan</label>
                  <input
                    type="text"
                    value={profileForm.availability || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, availability: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">Komitmen Waktu Respons</label>
                  <input
                    type="text"
                    value={profileForm.response_time || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, response_time: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-field full-width">
                  <ImageUploaderWithCrop
                    label="Foto Profil / Avatar Pengembang (Format 1:1)"
                    currentImageUrl={profileForm.profile_image || ''}
                    aspectRatio="1:1"
                    shape="circle"
                    recommendedText="Format 1:1 Persegi / Lingkaran"
                    buttonLabel="Pilih File & Potong Foto Profil (1:1)"
                    onImageCropped={(croppedUrl) => {
                      setProfileForm({
                        ...profileForm,
                        profile_image: croppedUrl
                      });
                    }}
                  />
                </div>

                <div className="form-field full-width">
                  <div className="label-with-ai-row">
                    <label className="field-label">Deskripsi Singkat (Hero Section)</label>
                    <AIAssistTriggerButton
                      label="✨ Generate Ringkasan AI"
                      small
                      onClick={() =>
                        setAiModal({
                          isOpen: true,
                          fieldType: 'profile_short_bio',
                          fieldLabel: 'Deskripsi Singkat (Hero)',
                          context: profileForm,
                          currentValue: profileForm.short_bio || '',
                          onApply: (text) => setProfileForm((prev) => ({ ...prev, short_bio: text }))
                        })
                      }
                    />
                  </div>
                  <textarea
                    rows={3}
                    value={profileForm.short_bio || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, short_bio: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <div className="form-field full-width">
                  <div className="label-with-ai-row">
                    <label className="field-label">Biografi Lengkap (About Section)</label>
                    <AIAssistTriggerButton
                      label="✨ Generate Biografi AI"
                      small
                      onClick={() =>
                        setAiModal({
                          isOpen: true,
                          fieldType: 'profile_about',
                          fieldLabel: 'Biografi Lengkap (About)',
                          context: profileForm,
                          currentValue: profileForm.about_content || '',
                          onApply: (text) => setProfileForm((prev) => ({ ...prev, about_content: text }))
                        })
                      }
                    />
                  </div>
                  <textarea
                    rows={6}
                    value={profileForm.about_content || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, about_content: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <div className="form-actions-row full-width">
                  <button type="submit" className="btn btn-primary">
                    <Save size={16} />
                    <span>Simpan Perubahan Profil</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================
              TAB 3: KELOLA PROYEK (CRUD)
             ======================================================== */}
          {activeTab === 'projects' && (
            <div className="cms-tab-pane">
              {editingProject ? (
                /* Edit/Add Project Form */
                <form onSubmit={handleSaveProject} className="cms-section-card cms-form-grid">
                  <div className="form-card-top-header full-width">
                    <h3 className="cms-card-title">
                      {editingProject.id ? 'Edit Proyek' : 'Tambah Proyek Baru'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="btn btn-secondary btn-sm"
                    >
                      Batal
                    </button>
                  </div>

                  <div className="form-field full-width">
                    <label className="field-label">Judul Proyek *</label>
                    <input
                      type="text"
                      required
                      value={editingProject.title || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Kategori</label>
                    <input
                      type="text"
                      value={editingProject.category || 'Full-Stack Web App'}
                      onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Peran Pemilik</label>
                    <input
                      type="text"
                      value={editingProject.role || 'Full-Stack Developer'}
                      onChange={(e) => setEditingProject({ ...editingProject, role: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Status Publikasi</label>
                    <select
                      value={editingProject.publication_status || 'PUBLISHED'}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, publication_status: e.target.value })
                      }
                      className="form-input"
                    >
                      <option value="PUBLISHED">PUBLISHED (Tampil di Landing Page)</option>
                      <option value="DRAFT">DRAFT (Sembunyikan dari Publik)</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Status Live Demo</label>
                    <select
                      value={editingProject.demo_status || 'ONLINE'}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, demo_status: e.target.value })
                      }
                      className="form-input"
                    >
                      <option value="ONLINE">ONLINE (Demo Aktif)</option>
                      <option value="MAINTENANCE">MAINTENANCE (Pemeliharaan)</option>
                      <option value="OFFLINE">OFFLINE (Tidak Aktif)</option>
                      <option value="NOT_AVAILABLE">NOT_AVAILABLE</option>
                    </select>
                  </div>

                  <div className="form-field full-width">
                    <label className="field-label">URL Live Demo</label>
                    <input
                      type="url"
                      value={editingProject.live_url || ''}
                      placeholder="https://..."
                      onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field full-width">
                    <label className="field-label">URL Repositori GitHub</label>
                    <input
                      type="url"
                      value={editingProject.repository_url || ''}
                      placeholder="https://github.com/..."
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, repository_url: e.target.value })
                      }
                      className="form-input"
                    />
                  </div>

                  {/* Tumpukan Teknologi (Tech Stack) */}
                  <div className="form-field full-width">
                    <TechStackInput
                      technologies={editingProject.technologies || []}
                      onChange={(techs) =>
                        setEditingProject({ ...editingProject, technologies: techs })
                      }
                    />
                  </div>

                  {/* ================= FOTO COVER UTAMA PROYEK (16:9) ================= */}
                  <div className="form-field full-width">
                    <ImageUploaderWithCrop
                      label="Foto Sampul / Cover Proyek (Format 16:9)"
                      currentImageUrl={editingProject.cover_image || ''}
                      aspectRatio="16:9"
                      shape="rect"
                      recommendedText="Format Layar Lebar 16:9 (Dokumentasi)"
                      buttonLabel="Upload & Potong Cover (16:9)"
                      onImageCropped={(croppedUrl) => {
                        const currentImages = Array.isArray(editingProject.images) ? [...editingProject.images] : [];
                        let updatedImages = currentImages;
                        if (!currentImages.some((img) => img.image_url === croppedUrl)) {
                          updatedImages = [
                            {
                              id: Date.now(),
                              image_url: croppedUrl,
                              caption: `${editingProject.title || 'Foto Proyek'} (Sampul)`
                            },
                            ...currentImages
                          ];
                        }
                        setEditingProject({
                          ...editingProject,
                          cover_image: croppedUrl,
                          images: updatedImages
                        });
                      }}
                    />
                  </div>

                  {/* Photo Gallery & Thumbnail Selection */}
                  <div className="form-field full-width gallery-management-field">
                    <div className="gallery-header-row">
                      <div>
                        <label className="field-label" style={{ marginBottom: '2px' }}>
                          Galeri Foto Proyek &amp; Pemilihan Thumbnail
                        </label>
                        <p className="gallery-help-text">
                          Tambahkan beberapa foto tangkapan layar proyek. Klik tombol <strong>"Jadikan Thumbnail"</strong> pada foto yang ingin dijadikan sampul utama kartu proyek di landing page.
                        </p>
                      </div>
                      <span className="gallery-count-badge">
                        {(editingProject.images || []).length} Foto Terunggah
                      </span>
                    </div>

                    {/* Input Bar: Upload File & URL */}
                    <div className="add-photo-bar">
                      <div className="upload-file-option">
                        <label className="btn-upload-file">
                          <Upload size={16} />
                          <span>Upload &amp; Potong Foto Galeri (16:9)</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileUpload}
                            style={{ display: 'none' }}
                          />
                        </label>
                        <span className="upload-note">Mendukung format file JPG, PNG, WebP (langsung tersimpan)</span>
                      </div>

                      <div className="add-url-option">
                        <input
                          type="url"
                          value={newImageUrl}
                          onChange={(e) => setNewImageUrl(e.target.value)}
                          placeholder="Atau tempel URL gambar (https://...)"
                          className="form-input url-photo-input"
                        />
                        <input
                          type="text"
                          value={newImageCaption}
                          onChange={(e) => setNewImageCaption(e.target.value)}
                          placeholder="Keterangan / Caption foto"
                          className="form-input caption-photo-input"
                        />
                        <button
                          type="button"
                          onClick={handleAddPhotoByUrl}
                          className="btn-add-url-photo"
                          disabled={!newImageUrl.trim()}
                        >
                          <Plus size={16} />
                          <span>Tambah URL</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!newImageUrl.trim()) return;
                            setGalleryCropModal({
                              isOpen: true,
                              type: 'add',
                              index: -1,
                              src: newImageUrl.trim(),
                              caption: newImageCaption.trim() || 'Foto Dokumentasi Proyek'
                            });
                            setNewImageUrl('');
                            setNewImageCaption('');
                          }}
                          className="btn-crop-gallery-card"
                          disabled={!newImageUrl.trim()}
                          title="Buka pemotong foto dari URL ini"
                        >
                          <CropIcon size={14} />
                          <span>Crop URL (16:9)</span>
                        </button>
                      </div>
                    </div>

                    {/* Quick Sample Photos */}
                    <div className="sample-photos-row">
                      <span className="sample-label">Pintasan Sampel Foto Cepat:</span>
                      <button
                        type="button"
                        onClick={() => handleAddSampleImage('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80', 'Dashboard Analitik Modern')}
                        className="btn-sample-photo"
                      >
                        + Dashboard Analitik
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddSampleImage('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80', 'Editor Source Code')}
                        className="btn-sample-photo"
                      >
                        + Code Editor
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddSampleImage('https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=1200&q=80', 'Sistem Kasir & Transaksi')}
                        className="btn-sample-photo"
                      >
                        + Transaksi Kasir
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddSampleImage('https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80', 'Responsive Mobile App Preview')}
                        className="btn-sample-photo"
                      >
                        + Mobile Preview
                      </button>
                    </div>

                    {/* Photo Cards Grid */}
                    {(!editingProject.images || editingProject.images.length === 0) ? (
                      <div className="gallery-empty-notice">
                        <ImageIcon size={32} />
                        <span>Belum ada foto yang ditambahkan ke proyek ini. Silakan pilih file gambar dari komputer/HP atau tempel URL di atas.</span>
                      </div>
                    ) : (
                      <div className="project-gallery-admin-grid">
                        {editingProject.images.map((img, idx) => {
                          const isCurrentCover = img.image_url === editingProject.cover_image;
                          return (
                            <div
                              key={img.id || idx}
                              className={`gallery-admin-item-card ${isCurrentCover ? 'card-is-thumbnail' : ''}`}
                            >
                              <div className="gallery-thumb-container">
                                <img src={img.image_url} alt={img.caption || 'Foto proyek'} className="gallery-thumb-preview" />
                                {isCurrentCover ? (
                                  <div className="badge-thumbnail-active">
                                    <Star size={13} fill="#FFFFFF" />
                                    <span>Thumbnail Utama</span>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => handleSetThumbnail(img.image_url)}
                                    className="btn-set-as-thumbnail"
                                    title="Klik untuk memilih foto ini sebagai thumbnail cover proyek"
                                  >
                                    <Star size={13} />
                                    <span>Jadikan Thumbnail</span>
                                  </button>
                                )}
                              </div>

                              <div className="gallery-card-content">
                                <input
                                  type="text"
                                  value={img.caption || ''}
                                  onChange={(e) => {
                                    const updated = [...editingProject.images];
                                    updated[idx] = { ...updated[idx], caption: e.target.value };
                                    setEditingProject({ ...editingProject, images: updated });
                                  }}
                                  placeholder="Caption foto..."
                                  className="form-input gallery-caption-input"
                                />
                                <button
                                  type="button"
                                  onClick={() => setGalleryCropModal({
                                    isOpen: true,
                                    type: 'edit',
                                    index: idx,
                                    src: img.image_url,
                                    caption: img.caption || ''
                                  })}
                                  className="btn-crop-gallery-card"
                                  title="Potong atau sesuaikan rasio foto ini"
                                >
                                  <CropIcon size={13} />
                                  <span>Crop</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleRemovePhoto(idx)}
                                  className="btn-remove-photo"
                                  title="Hapus foto ini"
                                >
                                  <Trash2 size={14} />
                                  <span>Hapus</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Gallery Crop Modal */}
                  <ImageCropModal
                    isOpen={galleryCropModal.isOpen}
                    imageSrc={galleryCropModal.src}
                    initialAspectRatio="16:9"
                    title={galleryCropModal.type === 'add' ? 'Potong Foto Dokumentasi Proyek (16:9)' : 'Sesuaikan & Potong Ulang Foto'}
                    onClose={() => setGalleryCropModal({ ...galleryCropModal, isOpen: false })}
                    onCropComplete={handleGalleryCropComplete}
                  />

                  <div className="form-field full-width">
                    <div className="label-with-ai-row">
                      <label className="field-label">Ringkasan Singkat (Kartu Proyek)</label>
                      <AIAssistTriggerButton
                        label="✨ Generate Ringkasan AI"
                        small
                        onClick={() =>
                          setAiModal({
                            isOpen: true,
                            fieldType: 'project_summary',
                            fieldLabel: 'Ringkasan Singkat Proyek',
                            context: editingProject,
                            currentValue: editingProject.short_description || editingProject.summary || '',
                            onApply: (text) =>
                              setEditingProject((prev) => ({
                                ...prev,
                                short_description: text,
                                summary: text
                              }))
                          })
                        }
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={editingProject.short_description || ''}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          short_description: e.target.value,
                          summary: e.target.value
                        })
                      }
                      className="form-textarea"
                    />
                  </div>

                  <div className="form-field full-width">
                    <div className="label-with-ai-row">
                      <label className="field-label">Latar Belakang & Masalah (Problem Statement)</label>
                      <AIAssistTriggerButton
                        label="✨ Generate Deskripsi AI"
                        small
                        onClick={() =>
                          setAiModal({
                            isOpen: true,
                            fieldType: 'project_description',
                            fieldLabel: 'Latar Belakang & Masalah Proyek',
                            context: editingProject,
                            currentValue: editingProject.problem_statement || editingProject.description || '',
                            onApply: (text) =>
                              setEditingProject((prev) => ({
                                ...prev,
                                problem_statement: text,
                                description: text
                              }))
                          })
                        }
                      />
                    </div>
                    <textarea
                      rows={3}
                      value={editingProject.problem_statement || ''}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          problem_statement: e.target.value,
                          description: e.target.value
                        })
                      }
                      className="form-textarea"
                    />
                  </div>

                  <div className="form-field full-width">
                    <label className="field-label">Tujuan Solusi (Objectives)</label>
                    <textarea
                      rows={2}
                      value={editingProject.objectives || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, objectives: e.target.value })}
                      className="form-textarea"
                    />
                  </div>

                  <div className="form-field full-width">
                    <label className="field-label">Tantangan Teknis & Solusi Arsitektur</label>
                    <textarea
                      rows={2}
                      value={editingProject.technical_challenges || ''}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, technical_challenges: e.target.value })
                      }
                      className="form-textarea"
                    />
                  </div>

                  <div className="form-field full-width">
                    <label className="field-label">Hasil Terukur (Results)</label>
                    <input
                      type="text"
                      value={editingProject.results || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, results: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field full-width">
                    <label className="field-label">Teknologi (Pisahkan dengan koma)</label>
                    <input
                      type="text"
                      value={
                        Array.isArray(editingProject.technologies)
                          ? editingProject.technologies.join(', ')
                          : editingProject.technologies || ''
                      }
                      placeholder="React, Node.js, Express, MySQL"
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                        })
                      }
                      className="form-input"
                    />
                  </div>

                  <div className="form-actions-row full-width">
                    <button type="submit" className="btn btn-primary">
                      <Save size={16} />
                      <span>Simpan Proyek</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="btn btn-secondary"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              ) : (
                /* Projects List */
                <div className="cms-section-card">
                  <div className="cms-card-header-row">
                    <div>
                      <h3 className="cms-card-title">Daftar Proyek CMS</h3>
                      <p className="cms-card-desc">
                        Kelola data proyek, atur publikasi (Draft/Published), dan status Live Demo.
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setEditingProject({
                          title: '',
                          category: 'Full-Stack Web App',
                          role: 'Full-Stack Developer',
                          publication_status: 'PUBLISHED',
                          demo_status: 'ONLINE',
                          live_url: '',
                          repository_url: '',
                          cover_image:
                            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
                          short_description: '',
                          problem_statement: '',
                          objectives: '',
                          results: '',
                          technologies: ['React', 'Node.js', 'MySQL']
                        })
                      }
                      className="btn btn-primary btn-sm"
                    >
                      <Plus size={15} />
                      <span>Tambah Proyek Baru</span>
                    </button>
                  </div>

                  <div className="cms-items-table">
                    {allAdminProjects.map((proj) => (
                      <div key={proj.id} className="cms-table-item">
                        <div className="cms-item-info">
                          <div className="cms-item-title-row">
                            <h4 className="cms-item-name">{proj.title}</h4>
                            <span
                              className={`status-pill ${proj.publication_status === 'PUBLISHED' ? 'pill-published' : 'pill-draft'}`}
                            >
                              {proj.publication_status}
                            </span>
                            <span className={`status-pill pill-demo-${proj.demo_status.toLowerCase()}`}>
                              Demo: {proj.demo_status}
                            </span>
                          </div>
                          <p className="cms-item-meta">{proj.category} • {proj.role}</p>
                          <p className="cms-item-sub">{proj.short_description}</p>
                        </div>

                        <div className="cms-item-actions">
                          <button
                            onClick={() => onTogglePublish(proj.id)}
                            className={`btn btn-sm ${proj.publication_status === 'PUBLISHED' ? 'btn-secondary' : 'btn-primary'}`}
                            title="Toggle status publikasi"
                          >
                            {proj.publication_status === 'PUBLISHED' ? <EyeOff size={14} /> : <Eye size={14} />}
                            <span>{proj.publication_status === 'PUBLISHED' ? 'Jadikan Draft' : 'Terbitkan'}</span>
                          </button>

                          <button
                            onClick={() => setEditingProject(proj)}
                            className="btn btn-secondary btn-sm"
                            title="Edit data proyek"
                          >
                            <Edit size={14} />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="btn-delete-icon"
                            title="Hapus proyek"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              TAB 4: KELOLA PENDIDIKAN
             ======================================================== */}
          {activeTab === 'educations' && (
            <div className="cms-tab-pane">
              {editingEdu ? (
                <form onSubmit={handleSaveEducation} className="cms-section-card cms-form-grid">
                  <h3 className="cms-card-title full-width">
                    {editingEdu.id ? 'Edit Pendidikan' : 'Tambah Pendidikan Baru'}
                  </h3>

                  <div className="form-field full-width">
                    <label className="field-label">Nama Institusi *</label>
                    <input
                      type="text"
                      required
                      value={editingEdu.institution || ''}
                      onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Gelar / Jenjang</label>
                    <input
                      type="text"
                      value={editingEdu.degree || 'Diploma 3 (D3)'}
                      onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Program Studi / Jurusan</label>
                    <input
                      type="text"
                      value={editingEdu.field_of_study || 'Manajemen Informatika'}
                      onChange={(e) => setEditingEdu({ ...editingEdu, field_of_study: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Tahun Mulai</label>
                    <input
                      type="text"
                      value={editingEdu.start_date || '2023'}
                      onChange={(e) => setEditingEdu({ ...editingEdu, start_date: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Tahun Selesai (atau 'Sekarang')</label>
                    <input
                      type="text"
                      value={editingEdu.end_date || '2026'}
                      onChange={(e) => setEditingEdu({ ...editingEdu, end_date: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field full-width">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={Boolean(editingEdu.is_current)}
                        onChange={(e) => setEditingEdu({ ...editingEdu, is_current: e.target.checked })}
                      />
                      <span>Masih sedang ditempuh saat ini</span>
                    </label>
                  </div>

                  <div className="form-field full-width">
                    <label className="field-label">Deskripsi Pendidikan</label>
                    <textarea
                      rows={3}
                      value={editingEdu.description || ''}
                      onChange={(e) => setEditingEdu({ ...editingEdu, description: e.target.value })}
                      className="form-textarea"
                    />
                  </div>

                  <div className="form-actions-row full-width">
                    <button type="submit" className="btn btn-primary">
                      <Save size={16} />
                      <span>Simpan Pendidikan</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingEdu(null)}
                      className="btn btn-secondary"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              ) : (
                <div className="cms-section-card">
                  <div className="cms-card-header-row">
                    <div>
                      <h3 className="cms-card-title">Riwayat Pendidikan</h3>
                      <p className="cms-card-desc">Kelola timeline pendidikan yang ditampilkan.</p>
                    </div>
                    <button
                      onClick={() =>
                        setEditingEdu({
                          institution: '',
                          degree: 'Diploma 3 (D3)',
                          field_of_study: 'Manajemen Informatika',
                          start_date: '2023',
                          end_date: '2026',
                          is_current: true,
                          description: '',
                          achievements: ['IPK: 3.88 / 4.00']
                        })
                      }
                      className="btn btn-primary btn-sm"
                    >
                      <Plus size={15} />
                      <span>Tambah Pendidikan</span>
                    </button>
                  </div>

                  <div className="cms-items-table">
                    {educations.map((item) => (
                      <div key={item.id} className="cms-table-item">
                        <div className="cms-item-info">
                          <h4 className="cms-item-name">{item.field_of_study} ({item.degree})</h4>
                          <p className="cms-item-meta">{item.institution} • {item.start_date} - {item.is_current ? 'Sekarang' : item.end_date}</p>
                          <p className="cms-item-sub">{item.description}</p>
                        </div>
                        <div className="cms-item-actions">
                          <button
                            onClick={() => setEditingEdu(item)}
                            className="btn btn-secondary btn-sm"
                          >
                            <Edit size={14} />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteEducation(item.id)}
                            className="btn-delete-icon"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              TAB 5: KELOLA PENGALAMAN
             ======================================================== */}
          {activeTab === 'experiences' && (
            <div className="cms-tab-pane">
              {editingExp ? (
                <form onSubmit={handleSaveExperience} className="cms-section-card cms-form-grid">
                  <h3 className="cms-card-title full-width">
                    {editingExp.id ? 'Edit Pengalaman' : 'Tambah Pengalaman Baru'}
                  </h3>

                  <div className="form-field full-width">
                    <label className="field-label">Perusahaan / Organisasi *</label>
                    <input
                      type="text"
                      required
                      value={editingExp.organization || ''}
                      onChange={(e) => setEditingExp({ ...editingExp, organization: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Posisi / Jabatan</label>
                    <input
                      type="text"
                      value={editingExp.position || ''}
                      onChange={(e) => setEditingExp({ ...editingExp, position: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Tipe Pengalaman</label>
                    <select
                      value={editingExp.experience_type || 'Magang'}
                      onChange={(e) => setEditingExp({ ...editingExp, experience_type: e.target.value })}
                      className="form-input"
                    >
                      <option value="Magang">Magang (Internship)</option>
                      <option value="Organisasi">Organisasi</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Kerja">Pekerjaan Penuh</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Tanggal Mulai</label>
                    <input
                      type="text"
                      value={editingExp.start_date || 'Jan 2025'}
                      onChange={(e) => setEditingExp({ ...editingExp, start_date: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Tanggal Selesai</label>
                    <input
                      type="text"
                      value={editingExp.end_date || 'Saat ini'}
                      onChange={(e) => setEditingExp({ ...editingExp, end_date: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field full-width">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={Boolean(editingExp.is_current)}
                        onChange={(e) => setEditingExp({ ...editingExp, is_current: e.target.checked })}
                      />
                      <span>Masih berjalan saat ini</span>
                    </label>
                  </div>

                  <div className="form-field full-width">
                    <label className="field-label">Deskripsi Peran</label>
                    <textarea
                      rows={3}
                      value={editingExp.description || ''}
                      onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                      className="form-textarea"
                    />
                  </div>

                  <div className="form-actions-row full-width">
                    <button type="submit" className="btn btn-primary">
                      <Save size={16} />
                      <span>Simpan Pengalaman</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingExp(null)}
                      className="btn btn-secondary"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              ) : (
                <div className="cms-section-card">
                  <div className="cms-card-header-row">
                    <div>
                      <h3 className="cms-card-title">Riwayat Pengalaman</h3>
                      <p className="cms-card-desc">Kelola pengalaman kerja, magang, dan organisasi.</p>
                    </div>
                    <button
                      onClick={() =>
                        setEditingExp({
                          organization: '',
                          position: '',
                          experience_type: 'Magang',
                          start_date: 'Jan 2025',
                          end_date: 'Saat ini',
                          is_current: true,
                          description: '',
                          achievements: [],
                          technologies: ['React', 'JavaScript']
                        })
                      }
                      className="btn btn-primary btn-sm"
                    >
                      <Plus size={15} />
                      <span>Tambah Pengalaman</span>
                    </button>
                  </div>

                  <div className="cms-items-table">
                    {experiences.map((item) => (
                      <div key={item.id} className="cms-table-item">
                        <div className="cms-item-info">
                          <h4 className="cms-item-name">{item.position}</h4>
                          <p className="cms-item-meta">{item.organization} • {item.experience_type} ({item.start_date} - {item.is_current ? 'Saat ini' : item.end_date})</p>
                          <p className="cms-item-sub">{item.description}</p>
                        </div>
                        <div className="cms-item-actions">
                          <button
                            onClick={() => setEditingExp(item)}
                            className="btn btn-secondary btn-sm"
                          >
                            <Edit size={14} />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteExperience(item.id)}
                            className="btn-delete-icon"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              TAB 6: PESAN MASUK
             ======================================================== */}
          {activeTab === 'messages' && (
            <div className="cms-tab-pane">
              <div className="cms-section-card">
                <h3 className="cms-card-title">Kotak Masuk Kontak Pengunjung</h3>
                <p className="cms-card-desc">
                  Pesan yang dikirimkan oleh recruiter atau pengunjung melalui formulir kontak.
                </p>

                {adminMessages.length === 0 ? (
                  <p className="cms-empty-text">Belum ada pesan yang masuk.</p>
                ) : (
                  <div className="cms-items-table">
                    {adminMessages.map((msg) => (
                      <div key={msg.id} className="cms-table-item msg-table-item">
                        <div className="cms-item-info">
                          <div className="cms-item-title-row">
                            <h4 className="cms-item-name">{msg.sender_name}</h4>
                            <span className="msg-email-text">&lt;{msg.sender_email}&gt;</span>
                            <span className={`msg-status-badge badge-${msg.status.toLowerCase()}`}>
                              {msg.status}
                            </span>
                          </div>
                          <p className="msg-subject-line"><strong>Subjek:</strong> {msg.subject}</p>
                          <p className="msg-preview-body">{msg.message}</p>
                          <span className="msg-time">{msg.created_at}</span>
                        </div>

                        <div className="cms-item-actions">
                          <select
                            value={msg.status}
                            onChange={(e) => onUpdateMessageStatus(msg.id, e.target.value)}
                            className="demo-select"
                          >
                            <option value="NEW">NEW</option>
                            <option value="READ">READ</option>
                            <option value="REPLIED">REPLIED</option>
                            <option value="ARCHIVED">ARCHIVED</option>
                          </select>

                          <button
                            onClick={() => onDeleteMessage(msg.id)}
                            className="btn-delete-icon"
                            title="Hapus Pesan"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 7: TAUTAN SOSIAL & RESET
             ======================================================== */}
          {activeTab === 'socials' && (
            <div className="cms-tab-pane">
              {/* Database Supabase Integration Card */}
              <SupabaseConfigCard />

              <form onSubmit={handleSaveSocials} className="cms-section-card cms-form-grid">
                <h3 className="cms-card-title full-width">Kelola Tautan Sosial (Social Links)</h3>

                {socialsForm.map((link, idx) => (
                  <div key={link.id || idx} className="form-field full-width">
                    <label className="field-label">{link.platform} URL</label>
                    <input
                      type="url"
                      value={link.url || ''}
                      onChange={(e) => {
                        const updated = [...socialsForm];
                        updated[idx].url = e.target.value;
                        setSocialsForm(updated);
                      }}
                      className="form-input"
                    />
                  </div>
                ))}

                <div className="form-actions-row full-width">
                  <button type="submit" className="btn btn-primary">
                    <Save size={16} />
                    <span>Simpan Tautan Sosial</span>
                  </button>
                </div>
              </form>

              {/* Danger Zone: Reset Data */}
              <div className="cms-section-card danger-zone">
                <h4 className="danger-title">Reset Seluruh Konten & Warna ke Bawaan</h4>
                <p className="danger-desc">
                  Mengembalikan data dan warna landing page kembali ke standar pengaturan awal.
                </p>
                <button
                  type="button"
                  onClick={onResetData}
                  className="btn btn-secondary btn-sm danger-reset-btn"
                >
                  <RefreshCw size={14} />
                  <span>Reset ke Data Awal</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="admin-modal-footer">
          <span className="footer-tip">
            ✨ Seluruh perubahan data dan warna langsung tersimpan otomatis ke browser dan tampil di landing page!
          </span>
          <button onClick={onClose} className="btn btn-primary btn-sm">
            Tutup Panel CMS
          </button>
        </div>
      </div>

      {/* AI Text Generator Modal */}
      <AITextGeneratorModal
        isOpen={aiModal.isOpen}
        onClose={() => setAiModal((prev) => ({ ...prev, isOpen: false }))}
        fieldType={aiModal.fieldType}
        fieldLabel={aiModal.fieldLabel}
        context={aiModal.context}
        currentValue={aiModal.currentValue}
        onApply={aiModal.onApply}
      />

      <style>{`
        .label-with-ai-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.35rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .cms-admin-modal {
          max-width: 960px;
          display: flex;
          flex-direction: column;
        }

        .admin-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.75rem;
          border-bottom: 1px solid var(--border-subtle);
          background-color: var(--bg-surface);
        }

        .admin-header-title-box {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .admin-badge-icon {
          width: 42px;
          height: 42px;
          border-radius: var(--radius-md);
          background-color: var(--primary-green-pale);
          color: var(--primary-green);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .admin-modal-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .admin-modal-subtitle {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .admin-navigation-tabs {
          display: flex;
          border-bottom: 1px solid var(--border-default);
          background-color: var(--bg-surface-alt);
          padding: 0 1.25rem;
          gap: 0.25rem;
          overflow-x: auto;
        }

        .cms-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 1rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          border-bottom: 2px solid transparent;
          transition: all var(--transition-fast);
          white-space: nowrap;
        }

        .cms-tab-btn:hover {
          color: var(--primary-green);
        }

        .cms-tab-btn.active-tab {
          color: var(--primary-green);
          border-bottom-color: var(--primary-green);
          background-color: var(--bg-surface);
        }

        .cms-tab-counter {
          background-color: #EF4444;
          color: #FFFFFF;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.1rem 0.45rem;
          border-radius: var(--radius-full);
        }

        .admin-modal-body {
          padding: 1.75rem;
          overflow-y: auto;
          max-height: 560px;
          background-color: var(--bg-surface-alt);
        }

        .cms-tab-pane {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .cms-section-card {
          padding: 1.75rem;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-xs);
        }

        .cms-card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
        }

        .cms-card-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
        }

        /* Color Presets */
        .theme-presets-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        @media (min-width: 640px) {
          .theme-presets-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .preset-btn {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.65rem 0.85rem;
          border: 1px solid var(--border-default);
          border-radius: var(--radius-md);
          background-color: var(--bg-surface);
          cursor: pointer;
          transition: all var(--transition-fast);
          text-align: left;
        }

        .preset-btn:hover {
          border-color: var(--primary-green);
          transform: translateY(-1px);
        }

        .preset-btn.preset-active {
          border-color: var(--primary-green);
          box-shadow: 0 0 0 2px var(--primary-green-pale);
          background-color: var(--primary-green-light);
        }

        .preset-color-circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .preset-name {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-primary);
          flex: 1;
        }

        .preset-check-icon {
          color: var(--primary-green);
        }

        .custom-color-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-subtle);
        }

        @media (min-width: 768px) {
          .custom-color-row {
            grid-template-columns: 1fr 1.2fr;
          }
        }

        .color-picker-box {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .picker-label {
          font-size: 0.825rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .picker-input-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .color-picker-native {
          width: 44px;
          height: 38px;
          border: 1px solid var(--border-default);
          border-radius: var(--radius-sm);
          cursor: pointer;
          background: none;
        }

        .color-hex-text {
          max-width: 140px;
          font-family: monospace;
          text-transform: uppercase;
        }

        .bg-options-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .bg-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.75rem;
          font-size: 0.775rem;
          font-weight: 600;
          border: 1px solid var(--border-default);
          border-radius: var(--radius-sm);
          background-color: var(--bg-surface);
          color: var(--text-primary);
          cursor: pointer;
        }

        .bg-chip.bg-chip-active {
          border-color: var(--primary-green);
          background-color: var(--primary-green-light);
          color: var(--primary-green);
        }

        .chip-circle {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1px solid var(--border-default);
        }

        /* Forms */
        .cms-form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.15rem;
        }

        @media (min-width: 640px) {
          .cms-form-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .full-width {
          grid-column: 1 / -1;
        }

        .form-card-top-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .form-actions-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 0.75rem;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-primary);
          cursor: pointer;
        }

        /* Items list & table */
        .cms-card-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .cms-items-table {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .cms-table-item {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          padding: 1.15rem;
          border: 1px solid var(--border-default);
          border-radius: var(--radius-md);
          background-color: var(--bg-surface);
        }

        @media (min-width: 768px) {
          .cms-table-item {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }

        .cms-item-info {
          flex: 1;
        }

        .cms-item-title-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
          margin-bottom: 0.25rem;
        }

        .cms-item-name {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .cms-item-meta {
          font-size: 0.8rem;
          color: var(--primary-green);
          font-weight: 600;
          margin-bottom: 0.35rem;
        }

        .cms-item-sub {
          font-size: 0.825rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .cms-item-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .btn-delete-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #DC2626;
          border: 1px solid #FCA5A5;
          border-radius: var(--radius-sm);
          background-color: #FFF5F5;
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }

        .btn-delete-icon:hover {
          background-color: #FEE2E2;
        }

        .msg-email-text {
          font-size: 0.8rem;
          color: var(--primary-green);
        }

        .msg-subject-line {
          font-size: 0.85rem;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .msg-preview-body {
          font-size: 0.825rem;
          color: var(--text-secondary);
          background-color: var(--bg-surface-alt);
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-sm);
          margin-bottom: 0.35rem;
        }

        .msg-time {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .danger-zone {
          border-color: #FCA5A5;
          background-color: #FFF5F5;
        }

        .danger-title {
          font-size: 1rem;
          font-weight: 700;
          color: #B91C1C;
          margin-bottom: 0.35rem;
        }

        .danger-desc {
          font-size: 0.825rem;
          color: #7F1D1D;
          margin-bottom: 1rem;
        }

        .danger-reset-btn {
          color: #B91C1C;
          border-color: #F87171;
        }

        /* Gallery Management & Thumbnail Selection Styles */
        .gallery-management-field {
          background-color: var(--bg-surface-alt, #F9FAF9);
          border: 1px dashed var(--primary-green-border, #C8DCD1);
          border-radius: var(--radius-md, 8px);
          padding: 1.25rem;
          margin-top: 0.5rem;
        }

        .gallery-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
          gap: 1rem;
        }

        .gallery-help-text {
          font-size: 0.8rem;
          color: var(--text-secondary, #64716B);
          margin-top: 0.2rem;
          line-height: 1.4;
        }

        .gallery-count-badge {
          background-color: var(--primary-green-pale, #E8F1EC);
          color: var(--primary-green, #17634D);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full, 9999px);
          white-space: nowrap;
        }

        .add-photo-bar {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          flex-wrap: wrap;
          margin-bottom: 0.85rem;
        }

        .upload-file-option {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .btn-upload-file {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1rem;
          background-color: var(--primary-green, #17634D);
          color: #FFFFFF;
          border-radius: var(--radius-md, 8px);
          font-size: 0.825rem;
          font-weight: 600;
          cursor: pointer;
          transition: background var(--transition-fast, 0.2s);
        }

        .btn-upload-file:hover {
          background-color: var(--primary-green-hover, #124F3E);
        }

        .upload-note {
          font-size: 0.72rem;
          color: var(--text-secondary, #64716B);
        }

        .add-url-option {
          display: flex;
          gap: 0.5rem;
          flex: 1;
          min-width: 280px;
        }

        .url-photo-input {
          flex: 2;
        }

        .caption-photo-input {
          flex: 1.5;
        }

        .btn-add-url-photo {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.65rem 1rem;
          background-color: #FFFFFF;
          border: 1px solid var(--border-color, #DDE1DA);
          border-radius: var(--radius-md, 8px);
          font-size: 0.825rem;
          font-weight: 600;
          color: var(--text-primary, #17221F);
          cursor: pointer;
          white-space: nowrap;
          transition: all var(--transition-fast, 0.2s);
        }

        .btn-add-url-photo:hover:not(:disabled) {
          background-color: var(--primary-green-light, #F0F6F2);
          border-color: var(--primary-green-border, #C8DCD1);
          color: var(--primary-green, #17634D);
        }

        .btn-add-url-photo:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .sample-photos-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1.25rem;
          font-size: 0.78rem;
        }

        .sample-label {
          color: var(--text-secondary, #64716B);
          font-weight: 500;
        }

        .btn-sample-photo {
          background: #FFFFFF;
          border: 1px solid var(--border-color, #DDE1DA);
          border-radius: 4px;
          padding: 0.2rem 0.55rem;
          font-size: 0.72rem;
          color: var(--text-primary, #17221F);
          cursor: pointer;
          transition: all var(--transition-fast, 0.2s);
        }

        .btn-sample-photo:hover {
          border-color: var(--primary-green, #17634D);
          color: var(--primary-green, #17634D);
        }

        .gallery-empty-notice {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 2rem;
          background: #FFFFFF;
          border: 1px dashed var(--border-color, #DDE1DA);
          border-radius: var(--radius-md, 8px);
          color: var(--text-secondary, #64716B);
          font-size: 0.85rem;
          text-align: center;
        }

        .project-gallery-admin-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
        }

        .gallery-admin-item-card {
          background: #FFFFFF;
          border: 1px solid var(--border-color, #DDE1DA);
          border-radius: var(--radius-md, 8px);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all var(--transition-fast, 0.2s);
        }

        .gallery-admin-item-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .gallery-admin-item-card.card-is-thumbnail {
          border: 2px solid var(--primary-green, #17634D);
          box-shadow: 0 0 0 3px var(--primary-green-pale, #E8F1EC);
        }

        .gallery-thumb-container {
          position: relative;
          width: 100%;
          height: 130px;
          background: #E5E7EB;
        }

        .gallery-thumb-preview {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .badge-thumbnail-active {
          position: absolute;
          top: 8px;
          left: 8px;
          background: var(--primary-green, #17634D);
          color: #FFFFFF;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.25rem 0.55rem;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.25);
        }

        .btn-set-as-thumbnail {
          position: absolute;
          bottom: 8px;
          left: 8px;
          right: 8px;
          background: rgba(23, 34, 31, 0.85);
          backdrop-filter: blur(4px);
          color: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 4px;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.35rem 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          transition: all var(--transition-fast, 0.2s);
        }

        .btn-set-as-thumbnail:hover {
          background: var(--primary-green, #17634D);
          border-color: var(--primary-green, #17634D);
        }

        .gallery-card-content {
          padding: 0.65rem;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          background: #FAFAF9;
          border-top: 1px solid var(--border-color, #DDE1DA);
        }

        .gallery-caption-input {
          font-size: 0.75rem;
          padding: 0.35rem 0.5rem;
        }

        .btn-remove-photo {
          display: inline-flex;
          align-items: center;
          gap: 0.2rem;
          background: #FEF2F2;
          border: 1px solid #FECACA;
          border-radius: 4px;
          color: #DC2626;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.35rem 0.5rem;
          cursor: pointer;
          flex-shrink: 0;
        }

        .btn-remove-photo:hover {
          background: #FEE2E2;
        }

        .btn-crop-gallery-card {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          background: #172420;
          border: 1px solid #283C34;
          border-radius: 4px;
          color: #2DD4BF;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.35rem 0.55rem;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.15s ease;
        }

        .btn-crop-gallery-card:hover {
          background: #17634D;
          color: #FFFFFF;
          border-color: #2DD4BF;
        }

        .admin-modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.15rem 1.75rem;
          border-top: 1px solid var(--border-subtle);
          background-color: var(--bg-surface);
        }

        .footer-tip {
          font-size: 0.775rem;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}
