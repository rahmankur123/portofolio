import React, { useState, useEffect } from 'react';
import {
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
  Sparkles,
  ExternalLink,
  ArrowLeft,
  X,
  Image as ImageIcon,
  Upload,
  Star,
  Crop as CropIcon
} from '../components/Icons';
import { THEME_PRESETS, defaultTheme, setAdminAuthStatus } from '../services/portfolioStorage';
import ImageUploaderWithCrop from '../components/ImageUploaderWithCrop';
import ImageCropModal from '../components/ImageCropModal';

export default function AdminPage({
  navigate,
  theme = defaultTheme,
  profile = {},
  educations = [],
  experiences = [],
  skillCategories = [],
  allAdminProjects = [],
  siteSettings = {},
  socialLinks = [],
  adminMessages = [],
  onUpdateTheme = () => {},
  onUpdateProfile = () => {},
  onUpdateEducations = () => {},
  onUpdateExperiences = () => {},
  onUpdateSkillCategories = () => {},
  onUpdateProjects = () => {},
  onUpdateSiteSettings = () => {},
  onUpdateSocialLinks = () => {},
  onTogglePublish = () => {},
  onUpdateDemoStatus = () => {},
  onUpdateMessageStatus = () => {},
  onDeleteMessage = () => {},
  onResetData = () => {}
}) {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'theme', 'profile', 'projects', 'educations', 'experiences', 'messages', 'socials'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  // Local draft states
  const [themeForm, setThemeForm] = useState(theme || defaultTheme);
  const [profileForm, setProfileForm] = useState(profile || {});
  const [settingsForm, setSettingsForm] = useState(siteSettings || {});
  const [socialsForm, setSocialsForm] = useState(socialLinks || []);

  useEffect(() => {
    if (theme) setThemeForm(theme);
  }, [theme]);

  useEffect(() => {
    if (profile) setProfileForm(profile);
  }, [profile]);

  useEffect(() => {
    if (siteSettings) setSettingsForm(siteSettings);
  }, [siteSettings]);

  useEffect(() => {
    if (socialLinks) setSocialsForm(socialLinks);
  }, [socialLinks]);

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
    const updated = {
      ...themeForm,
      primaryColor: color,
      primaryHover: color,
      primaryPale: `${color}1A`,
      primaryLight: `${color}0D`,
      primaryBorder: `${color}40`,
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
    onUpdateProfile(profileForm);
  };

  // Handler: Save Site Settings
  const handleSaveSettings = (e) => {
    e.preventDefault();
    onUpdateSiteSettings(settingsForm);
  };

  // Handler: Save Socials
  const handleSaveSocials = (e) => {
    e.preventDefault();
    onUpdateSocialLinks(socialsForm);
  };

  // =================== PROJECT CRUD & GALLERY ===================
  const handleOpenNewProject = () => {
    const defaultSample = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80';
    setEditingProject({
      title: '',
      slug: '',
      summary: '',
      description: '',
      category: 'Web Application',
      technologies: ['React', 'CSS'],
      publication_status: 'PUBLISHED',
      demo_status: 'ONLINE',
      live_url: '',
      github_url: '',
      featured: true,
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
      short_description: editingProject.summary || editingProject.short_description || ''
    };

    let updatedList;
    if (editingProject.id) {
      updatedList = allAdminProjects.map((p) =>
        p.id === editingProject.id ? { ...p, ...projectToSave } : p
      );
    } else {
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

  // Education CRUD
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

  // Experience CRUD
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

  const handleLogout = () => {
    if (window.confirm('Keluar dari sesi Admin?')) {
      setAdminAuthStatus(false);
      if (navigate) navigate('/admin/login');
    }
  };

  const publishedCount = (allAdminProjects || []).filter((p) => p.publication_status === 'PUBLISHED').length;
  const draftCount = (allAdminProjects || []).filter((p) => p.publication_status === 'DRAFT').length;
  const newMsgCount = (adminMessages || []).filter((m) => m.status === 'NEW').length;

  return (
    <div className="admin-page-container">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* 1. Left Sidebar Navigation */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand-box">
          <div className="sidebar-logo">
            <Sliders size={20} />
          </div>
          <div>
            <div className="sidebar-brand-name">CMS Admin Panel</div>
            <div className="sidebar-brand-sub">Route: /admin</div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="sidebar-close-mobile-btn"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-menu">
          <div className="menu-group-label">UTAMA</div>
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setIsSidebarOpen(false);
            }}
            className={`sidebar-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          >
            <Layers size={18} />
            <span>Dashboard Ringkas</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('theme');
              setIsSidebarOpen(false);
            }}
            className={`sidebar-nav-item ${activeTab === 'theme' ? 'active' : ''}`}
          >
            <Palette size={18} />
            <span>Tema & Warna Web</span>
          </button>

          <div className="menu-group-label">KONTEN LANDING PAGE</div>
          <button
            onClick={() => {
              setActiveTab('profile');
              setIsSidebarOpen(false);
            }}
            className={`sidebar-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
          >
            <User size={18} />
            <span>Profil & Hero</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('projects');
              setEditingProject(null);
              setIsSidebarOpen(false);
            }}
            className={`sidebar-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
          >
            <FolderGit2 size={18} />
            <span>Proyek Portofolio</span>
            <span className="sidebar-count-badge">{allAdminProjects.length}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('educations');
              setEditingEdu(null);
              setIsSidebarOpen(false);
            }}
            className={`sidebar-nav-item ${activeTab === 'educations' ? 'active' : ''}`}
          >
            <GraduationCap size={18} />
            <span>Riwayat Pendidikan</span>
            <span className="sidebar-count-badge">{educations.length}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('experiences');
              setEditingExp(null);
              setIsSidebarOpen(false);
            }}
            className={`sidebar-nav-item ${activeTab === 'experiences' ? 'active' : ''}`}
          >
            <Briefcase size={18} />
            <span>Pengalaman</span>
            <span className="sidebar-count-badge">{experiences.length}</span>
          </button>

          <div className="menu-group-label">INTERAKSI & SISTEM</div>
          <button
            onClick={() => {
              setActiveTab('messages');
              setIsSidebarOpen(false);
            }}
            className={`sidebar-nav-item ${activeTab === 'messages' ? 'active' : ''}`}
          >
            <Mail size={18} />
            <span>Pesan Masuk</span>
            {newMsgCount > 0 && <span className="sidebar-badge-new">{newMsgCount} Baru</span>}
          </button>

          <button
            onClick={() => {
              setActiveTab('socials');
              setIsSidebarOpen(false);
            }}
            className={`sidebar-nav-item ${activeTab === 'socials' ? 'active' : ''}`}
          >
            <Globe size={18} />
            <span>Tautan & Pengaturan</span>
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-bottom-card">
          <div className="admin-user-info">
            <div className="admin-avatar">A</div>
            <div>
              <div className="admin-user-name">{profile?.full_name || 'Admin'}</div>
              <div className="admin-role-tag">Super Administrator</div>
            </div>
          </div>
          <button onClick={handleLogout} className="sidebar-logout-btn">
            Keluar Sesi
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="admin-main-wrapper">
        {/* Top Navbar Header */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="topbar-hamburger-btn"
            >
              <Sliders size={20} />
            </button>
            <div className="topbar-breadcrumb">
              <span className="crumb-root">Admin</span>
              <span className="crumb-sep">/</span>
              <span className="crumb-current">
                {activeTab === 'dashboard' && 'Dashboard Overview'}
                {activeTab === 'theme' && 'Tema & Warna Web'}
                {activeTab === 'profile' && 'Profil & Hero'}
                {activeTab === 'projects' && 'Proyek Portofolio'}
                {activeTab === 'educations' && 'Riwayat Pendidikan'}
                {activeTab === 'experiences' && 'Pengalaman Kerja & Organisasi'}
                {activeTab === 'messages' && 'Kotak Masuk Kontak'}
                {activeTab === 'socials' && 'Tautan Sosial & Pengaturan'}
              </span>
            </div>
          </div>

          <div className="topbar-actions">
            <button
              onClick={() => (navigate ? navigate('/') : (window.location.pathname = '/'))}
              className="view-public-site-btn"
              title="Buka Landing Page Publik"
            >
              <ExternalLink size={16} />
              <span>Lihat Website Publik</span>
            </button>
          </div>
        </header>

        {/* Body Content */}
        <main className="admin-page-body">
          {/* ================= TAB 0: DASHBOARD ================= */}
          {activeTab === 'dashboard' && (
            <div className="admin-tab-pane">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Ringkasan Sistem &amp; Portofolio (PRD 6.2)</h2>
                  <p className="pane-sub">
                    Statistik konten terkini, status publikasi proyek, dan pintasan modul manajemen.
                  </p>
                </div>
              </div>

              {/* Stat Cards */}
              <div className="stat-cards-grid">
                <div
                  className="dashboard-stat-card"
                  onClick={() => setActiveTab('projects')}
                >
                  <div className="stat-icon-wrap" style={{ background: '#E8F1EC', color: '#17634D' }}>
                    <FolderGit2 size={24} />
                  </div>
                  <div>
                    <div className="stat-num">{allAdminProjects.length}</div>
                    <div className="stat-name">Total Proyek</div>
                  </div>
                  <div className="stat-pill-tag tag-green">{publishedCount} Terbit • {draftCount} Draft</div>
                </div>

                <div
                  className="dashboard-stat-card"
                  onClick={() => setActiveTab('messages')}
                >
                  <div className="stat-icon-wrap" style={{ background: '#FEF3C7', color: '#D97706' }}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="stat-num">{adminMessages.length}</div>
                    <div className="stat-name">Pesan Masuk</div>
                  </div>
                  <div className="stat-pill-tag tag-amber">{newMsgCount} Belum Dibaca</div>
                </div>

                <div
                  className="dashboard-stat-card"
                  onClick={() => setActiveTab('educations')}
                >
                  <div className="stat-icon-wrap" style={{ background: '#EFF6FF', color: '#2563EB' }}>
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <div className="stat-num">{educations.length}</div>
                    <div className="stat-name">Pendidikan</div>
                  </div>
                  <div className="stat-pill-tag tag-blue">Aktif di Landing Page</div>
                </div>

                <div
                  className="dashboard-stat-card"
                  onClick={() => setActiveTab('experiences')}
                >
                  <div className="stat-icon-wrap" style={{ background: '#F5F3FF', color: '#7C3AED' }}>
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <div className="stat-num">{experiences.length}</div>
                    <div className="stat-name">Pengalaman</div>
                  </div>
                  <div className="stat-pill-tag tag-purple">Riwayat Karir</div>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="dashboard-content-box">
                <h3 className="section-inner-title">Aksi Cepat Manajemen</h3>
                <div className="quick-action-btns">
                  <button
                    onClick={() => setActiveTab('theme')}
                    className="quick-action-card"
                  >
                    <Palette size={20} className="action-icon" />
                    <div>
                      <div className="action-title">Kustomisasi Warna Web</div>
                      <div className="action-sub">Ubah skema warna atau ketik hex bebas</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('projects');
                      setEditingProject({
                        title: '',
                        summary: '',
                        description: '',
                        category: 'Web Application',
                        technologies: ['React', 'CSS'],
                        publication_status: 'PUBLISHED',
                        demo_status: 'ONLINE',
                        live_url: '',
                        github_url: ''
                      });
                    }}
                    className="quick-action-card"
                  >
                    <Plus size={20} className="action-icon" />
                    <div>
                      <div className="action-title">Tambah Proyek Baru</div>
                      <div className="action-sub">Publikasikan karya atau jadikan draft</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('profile')}
                    className="quick-action-card"
                  >
                    <User size={20} className="action-icon" />
                    <div>
                      <div className="action-title">Edit Biodata &amp; Hero</div>
                      <div className="action-sub">Perbarui headline dan biografi profil</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Recent Messages Preview */}
              <div className="dashboard-content-box">
                <div className="box-title-row">
                  <h3 className="section-inner-title">Pesan Masuk Terbaru ({adminMessages.length})</h3>
                  <button
                    onClick={() => setActiveTab('messages')}
                    className="btn-text-link"
                  >
                    Lihat Semua Pesan →
                  </button>
                </div>

                {adminMessages.length === 0 ? (
                  <div className="empty-state-notice">Belum ada pesan masuk.</div>
                ) : (
                  <div className="messages-preview-list">
                    {adminMessages.slice(0, 3).map((msg) => (
                      <div key={msg.id} className="preview-message-item">
                        <div className="msg-preview-header">
                          <span className="msg-sender">{msg.sender_name}</span>
                          <span className="msg-email">&lt;{msg.sender_email}&gt;</span>
                          <span className={`msg-status-badge status-${msg.status.toLowerCase()}`}>
                            {msg.status}
                          </span>
                        </div>
                        <div className="msg-preview-subject">{msg.subject}</div>
                        <div className="msg-preview-snippet">{msg.message}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= TAB 1: TEMA & WARNA ================= */}
          {activeTab === 'theme' && (
            <div className="admin-tab-pane">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Kustomisasi Tema &amp; Warna Website</h2>
                  <p className="pane-sub">
                    Pilih preset warna modern atau gunakan pemilih warna kustom (Hex). Perubahan langsung aktif di landing page dan tersimpan otomatis!
                  </p>
                </div>
              </div>

              {/* Preset Cards */}
              <div className="form-group-section">
                <label className="cms-label">1. Preset Skema Warna Siap Pakai</label>
                <div className="preset-grid">
                  {THEME_PRESETS.map((preset) => {
                    const isSelected = themeForm.presetName === preset.name;
                    return (
                      <div
                        key={preset.name}
                        onClick={() => handleSelectPreset(preset)}
                        className={`preset-card ${isSelected ? 'preset-card-selected' : ''}`}
                      >
                        <div className="preset-color-preview">
                          <div
                            className="color-circle"
                            style={{ backgroundColor: preset.primaryColor }}
                          />
                          <div
                            className="color-circle"
                            style={{ backgroundColor: preset.primaryPale }}
                          />
                          <div
                            className="color-circle"
                            style={{ backgroundColor: preset.bgMain }}
                          />
                        </div>
                        <div className="preset-name">{preset.name}</div>
                        <div className="preset-hex">{preset.primaryColor}</div>
                        {isSelected && <span className="preset-active-check">✓ Aktif</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Custom Color Picker */}
              <div className="form-group-section">
                <label className="cms-label">2. Kustom Warna Utama Bebas (Hex Picker)</label>
                <div className="custom-picker-row">
                  <input
                    type="color"
                    value={themeForm.primaryColor}
                    onChange={(e) => handleCustomPrimaryColor(e.target.value)}
                    className="html5-color-picker"
                  />
                  <div className="custom-color-inputs">
                    <input
                      type="text"
                      value={themeForm.primaryColor}
                      onChange={(e) => handleCustomPrimaryColor(e.target.value)}
                      placeholder="#17634D"
                      className="cms-input hex-input"
                    />
                    <span className="hex-hint">
                      Warna ini akan menjadi aksen utama tombol, badge, link, dan highlight seluruh website.
                    </span>
                  </div>
                </div>
              </div>

              {/* Background Color Picker */}
              <div className="form-group-section">
                <label className="cms-label">3. Warna Latar Belakang (Background Tint)</label>
                <div className="bg-preset-row">
                  {[
                    { label: 'Off-White Ivory (Standar PRD)', value: '#F7F7F3' },
                    { label: 'Pure White Clean', value: '#FFFFFF' },
                    { label: 'Soft Cool Mint', value: '#F2F8F5' },
                    { label: 'Light Slate Gray', value: '#F8FAFC' },
                    { label: 'Warm Minimalist', value: '#FAF8F5' }
                  ].map((bg) => (
                    <button
                      key={bg.value}
                      type="button"
                      onClick={() => handleCustomBgColor(bg.value)}
                      className={`bg-preset-btn ${themeForm.bgMain === bg.value ? 'bg-preset-active' : ''}`}
                    >
                      <span className="bg-preview-box" style={{ backgroundColor: bg.value }} />
                      <span>{bg.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Preview Box */}
              <div className="theme-live-preview-box">
                <div className="preview-box-title">Preview Komponen dengan Warna Terpilih:</div>
                <div className="preview-elements-row">
                  <button className="preview-btn-sample" style={{ backgroundColor: themeForm.primaryColor }}>
                    Tombol Utama (CTA)
                  </button>
                  <span
                    className="preview-badge-sample"
                    style={{
                      backgroundColor: themeForm.primaryPale,
                      color: themeForm.primaryColor,
                      border: `1px solid ${themeForm.primaryBorder}`
                    }}
                  >
                    ● Badge Aktif
                  </span>
                  <a href="#test" onClick={(e) => e.preventDefault()} style={{ color: themeForm.primaryColor, fontWeight: 600 }}>
                    Tautan / Link Aktif
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: PROFIL & HERO ================= */}
          {activeTab === 'profile' && (
            <div className="admin-tab-pane">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Manajemen Profil &amp; Hero (PRD 4.2 &amp; 4.3)</h2>
                  <p className="pane-sub">
                    Ubah teks headline, nama lengkap, ringkasan hero, dan biografi lengkap yang tampil di landing page.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="cms-form-grid">
                <div className="cms-form-field">
                  <label className="cms-label">Nama Lengkap</label>
                  <input
                    type="text"
                    value={profileForm.full_name || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                    className="cms-input"
                    required
                  />
                </div>

                <div className="cms-form-field">
                  <label className="cms-label">Headline Profesi (Hero Subtitle)</label>
                  <input
                    type="text"
                    value={profileForm.headline || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                    className="cms-input"
                    required
                  />
                </div>

                <div className="cms-form-field">
                  <label className="cms-label">Status Ketersediaan (Availability Badge)</label>
                  <input
                    type="text"
                    value={profileForm.availability_status || ''}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, availability_status: e.target.value })
                    }
                    className="cms-input"
                    placeholder="Contoh: Available for Freelance &amp; Fulltime"
                  />
                </div>

                <div className="cms-form-field">
                  <label className="cms-label">Lokasi / Domisili</label>
                  <input
                    type="text"
                    value={profileForm.location || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="cms-input"
                    placeholder="Contoh: Jakarta / Depok, Indonesia"
                  />
                </div>

                <div className="cms-form-field">
                  <label className="cms-label">Email Publik</label>
                  <input
                    type="email"
                    value={profileForm.public_email || ''}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, public_email: e.target.value })
                    }
                    className="cms-input"
                    placeholder="nama@email.com"
                  />
                </div>

                <div className="cms-form-field full-width">
                  <ImageUploaderWithCrop
                    label="Foto Profil / Avatar Pengembang (Format 1:1)"
                    currentImageUrl={profileForm.profile_image || profileForm.avatar_url || ''}
                    aspectRatio="1:1"
                    shape="circle"
                    recommendedText="Format 1:1 Persegi / Lingkaran"
                    buttonLabel="Pilih File & Potong Foto Profil (1:1)"
                    onImageCropped={(croppedUrl) => {
                      setProfileForm({
                        ...profileForm,
                        profile_image: croppedUrl,
                        avatar_url: croppedUrl
                      });
                    }}
                  />
                </div>

                <div className="cms-form-field full-width">
                  <label className="cms-label">Ringkasan Hero (Deskripsi Singkat di Header)</label>
                  <textarea
                    rows={3}
                    value={profileForm.summary || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, summary: e.target.value })}
                    className="cms-textarea"
                  />
                </div>

                <div className="cms-form-field full-width">
                  <label className="cms-label">Biografi Lengkap (Section Tentang Saya)</label>
                  <textarea
                    rows={6}
                    value={profileForm.bio || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    className="cms-textarea"
                  />
                </div>

                <div className="form-actions-bar full-width">
                  <button type="submit" className="cms-save-btn">
                    <Save size={18} />
                    <span>Simpan Perubahan Profil</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ================= TAB 3: PROYEK ================= */}
          {activeTab === 'projects' && (
            <div className="admin-tab-pane">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Manajemen Proyek Portofolio (PRD 4.7 &amp; 7.1)</h2>
                  <p className="pane-sub">
                    Kelola proyek portofolio, status publikasi (*Draft/Published*), status *Live Demo*, dan dokumentasi lengkap.
                  </p>
                </div>
                {!editingProject && (
                  <button
                    onClick={handleOpenNewProject}
                    className="cms-add-btn"
                  >
                    <Plus size={16} />
                    <span>Tambah Proyek Baru</span>
                  </button>
                )}
              </div>

              {/* Editing Form */}
              {editingProject && (
                <div className="editing-card-form">
                  <h3 className="section-inner-title">
                    {editingProject.id ? 'Edit Proyek' : 'Tambah Proyek Baru'}
                  </h3>
                  <form onSubmit={handleSaveProject} className="cms-form-grid">
                    <div className="cms-form-field">
                      <label className="cms-label">Judul Proyek</label>
                      <input
                        type="text"
                        value={editingProject.title || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="cms-input"
                        required
                      />
                    </div>

                    <div className="cms-form-field">
                      <label className="cms-label">Kategori</label>
                      <input
                        type="text"
                        value={editingProject.category || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                        className="cms-input"
                      />
                    </div>

                    <div className="cms-form-field">
                      <label className="cms-label">Status Publikasi (PRD 7.1)</label>
                      <select
                        value={editingProject.publication_status || 'PUBLISHED'}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, publication_status: e.target.value })
                        }
                        className="cms-select"
                      >
                        <option value="PUBLISHED">PUBLISHED (Tampil di Landing Page)</option>
                        <option value="DRAFT">DRAFT (Disembunyikan dari Publik)</option>
                      </select>
                    </div>

                    <div className="cms-form-field">
                      <label className="cms-label">Status Live Demo (PRD 7.2)</label>
                      <select
                        value={editingProject.demo_status || 'ONLINE'}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, demo_status: e.target.value })
                        }
                        className="cms-select"
                      >
                        <option value="ONLINE">ONLINE (Tombol Demo Aktif)</option>
                        <option value="MAINTENANCE">MAINTENANCE (Sedang Perawatan)</option>
                        <option value="OFFLINE">OFFLINE (Tidak Tersedia)</option>
                      </select>
                    </div>

                    <div className="cms-form-field">
                      <label className="cms-label">URL Live Demo</label>
                      <input
                        type="url"
                        value={editingProject.live_url || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value })}
                        className="cms-input"
                        placeholder="https://..."
                      />
                    </div>

                    <div className="cms-form-field">
                      <label className="cms-label">URL Repository GitHub</label>
                      <input
                        type="url"
                        value={editingProject.github_url || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })}
                        className="cms-input"
                        placeholder="https://github.com/..."
                      />
                    </div>

                    <div className="cms-form-field full-width">
                      <label className="cms-label">Ringkasan Singkat (Muncul di Kartu Portofolio)</label>
                      <textarea
                        rows={2}
                        value={editingProject.summary || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                        className="cms-textarea"
                      />
                    </div>

                    <div className="cms-form-field full-width">
                      <label className="cms-label">Deskripsi Lengkap / Masalah &amp; Solusi (Detail Modal)</label>
                      <textarea
                        rows={4}
                        value={editingProject.description || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                        className="cms-textarea"
                      />
                    </div>

                    {/* ================= FOTO COVER UTAMA PROYEK (16:9) ================= */}
                    <div className="cms-form-field full-width">
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

                    {/* ================= GALERI FOTO & THUMBNAIL (PRD Bagian 5 & 6.4) ================= */}
                    <div className="cms-form-field full-width gallery-management-field">
                      <div className="gallery-header-row">
                        <div>
                          <label className="cms-label">Galeri Foto Proyek &amp; Pemilihan Thumbnail</label>
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
                          <span className="upload-note">Mendukung format file JPG, PNG, WebP</span>
                        </div>

                        <div className="add-url-option">
                          <input
                            type="url"
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                            placeholder="Atau tempel URL gambar (https://...)"
                            className="cms-input url-photo-input"
                          />
                          <input
                            type="text"
                            value={newImageCaption}
                            onChange={(e) => setNewImageCaption(e.target.value)}
                            placeholder="Keterangan / Caption foto"
                            className="cms-input caption-photo-input"
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
                                    placeholder="Tulis caption foto..."
                                    className="cms-input gallery-caption-input"
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

                    {/* Gallery Item Crop Modal */}
                    <ImageCropModal
                      isOpen={galleryCropModal.isOpen}
                      imageSrc={galleryCropModal.src}
                      initialAspectRatio="16:9"
                      title={galleryCropModal.type === 'add' ? 'Potong Foto Dokumentasi Proyek (16:9)' : 'Sesuaikan & Potong Ulang Foto'}
                      onClose={() => setGalleryCropModal({ ...galleryCropModal, isOpen: false })}
                      onCropComplete={handleGalleryCropComplete}
                    />

                    <div className="form-actions-bar full-width">
                      <button type="submit" className="cms-save-btn">
                        <Save size={18} />
                        <span>Simpan Proyek</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingProject(null)}
                        className="cms-cancel-btn"
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Project Cards List */}
              <div className="admin-project-cards-list">
                {allAdminProjects.map((p) => (
                  <div key={p.id} className="admin-item-row">
                    <div className="item-row-left">
                      <div className="item-thumb-box">
                        <img src={p.cover_image} alt={p.title} className="item-thumb-img" />
                      </div>
                      <div className="item-details">
                        <div className="item-title-row">
                          <span className="item-main-title">{p.title}</span>
                          <span
                            className={`status-pill ${p.publication_status === 'PUBLISHED' ? 'pill-published' : 'pill-draft'}`}
                          >
                            {p.publication_status}
                          </span>
                          <span
                            className={`demo-pill ${p.demo_status === 'ONLINE' ? 'demo-online' : 'demo-other'}`}
                          >
                            Demo: {p.demo_status}
                          </span>
                        </div>
                        <p className="item-desc">{p.summary}</p>
                        <div className="item-meta">
                          <span>{p.category}</span> • <span>{(p.technologies || []).join(', ')}</span> • <span>{(p.images || []).length} Foto</span>
                        </div>
                      </div>
                    </div>

                    <div className="item-actions">
                      <button
                        onClick={() => onTogglePublish(p.id)}
                        className="btn-action-ghost"
                        title={p.publication_status === 'PUBLISHED' ? 'Jadikan Draft' : 'Publikasikan'}
                      >
                        {p.publication_status === 'PUBLISHED' ? <EyeOff size={16} /> : <Eye size={16} />}
                        <span>{p.publication_status === 'PUBLISHED' ? 'Draft' : 'Publish'}</span>
                      </button>

                      <button
                        onClick={() => handleOpenEditProject(p)}
                        className="btn-action-ghost"
                        title="Edit Proyek"
                      >
                        <Edit size={16} />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDeleteProject(p.id)}
                        className="btn-action-danger"
                        title="Hapus Proyek"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 4: PENDIDIKAN ================= */}
          {activeTab === 'educations' && (
            <div className="admin-tab-pane">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Riwayat Pendidikan (PRD 4.4)</h2>
                  <p className="pane-sub">
                    Kelola data studi, universitas, gelar, jurusan, serta pencapaian akademik.
                  </p>
                </div>
                {!editingEdu && (
                  <button
                    onClick={() =>
                      setEditingEdu({
                        institution: '',
                        degree: 'D3',
                        field_of_study: 'Manajemen Informatika',
                        start_year: '2023',
                        end_year: 'Sekarang',
                        is_ongoing: true,
                        description: ''
                      })
                    }
                    className="cms-add-btn"
                  >
                    <Plus size={16} />
                    <span>Tambah Pendidikan</span>
                  </button>
                )}
              </div>

              {editingEdu && (
                <div className="editing-card-form">
                  <h3 className="section-inner-title">
                    {editingEdu.id ? 'Edit Data Pendidikan' : 'Tambah Pendidikan Baru'}
                  </h3>
                  <form onSubmit={handleSaveEducation} className="cms-form-grid">
                    <div className="cms-form-field">
                      <label className="cms-label">Institusi / Universitas</label>
                      <input
                        type="text"
                        value={editingEdu.institution || ''}
                        onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                        className="cms-input"
                        required
                      />
                    </div>
                    <div className="cms-form-field">
                      <label className="cms-label">Jenjang / Gelar</label>
                      <input
                        type="text"
                        value={editingEdu.degree || ''}
                        onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                        className="cms-input"
                        placeholder="D3 / S1"
                      />
                    </div>
                    <div className="cms-form-field">
                      <label className="cms-label">Program Studi / Jurusan</label>
                      <input
                        type="text"
                        value={editingEdu.field_of_study || ''}
                        onChange={(e) => setEditingEdu({ ...editingEdu, field_of_study: e.target.value })}
                        className="cms-input"
                      />
                    </div>
                    <div className="cms-form-field">
                      <label className="cms-label">Tahun (Mulai - Selesai)</label>
                      <input
                        type="text"
                        value={`${editingEdu.start_year || ''} - ${editingEdu.end_year || ''}`}
                        onChange={(e) => {
                          const parts = e.target.value.split('-');
                          setEditingEdu({
                            ...editingEdu,
                            start_year: parts[0]?.trim(),
                            end_year: parts[1]?.trim()
                          });
                        }}
                        className="cms-input"
                        placeholder="2023 - 2026 / Sekarang"
                      />
                    </div>
                    <div className="cms-form-field full-width">
                      <label className="cms-label">Deskripsi &amp; Pencapaian (IPK, Fokus Studi)</label>
                      <textarea
                        rows={3}
                        value={editingEdu.description || ''}
                        onChange={(e) => setEditingEdu({ ...editingEdu, description: e.target.value })}
                        className="cms-textarea"
                      />
                    </div>
                    <div className="form-actions-bar full-width">
                      <button type="submit" className="cms-save-btn">
                        <Save size={18} />
                        <span>Simpan Pendidikan</span>
                      </button>
                      <button type="button" onClick={() => setEditingEdu(null)} className="cms-cancel-btn">
                        Batal
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="admin-project-cards-list">
                {educations.map((edu) => (
                  <div key={edu.id} className="admin-item-row">
                    <div className="item-row-left">
                      <div className="edu-avatar-badge">
                        <GraduationCap size={22} />
                      </div>
                      <div className="item-details">
                        <div className="item-title-row">
                          <span className="item-main-title">{edu.institution}</span>
                          <span className="status-pill pill-published">
                            {edu.degree} {edu.field_of_study}
                          </span>
                        </div>
                        <p className="item-desc">{edu.description}</p>
                        <div className="item-meta">
                          Periode: {edu.start_year} - {edu.end_year || 'Sekarang'}
                        </div>
                      </div>
                    </div>
                    <div className="item-actions">
                      <button onClick={() => setEditingEdu(edu)} className="btn-action-ghost">
                        <Edit size={16} />
                        <span>Edit</span>
                      </button>
                      <button onClick={() => handleDeleteEducation(edu.id)} className="btn-action-danger">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 5: PENGALAMAN ================= */}
          {activeTab === 'experiences' && (
            <div className="admin-tab-pane">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Pengalaman Kerja &amp; Organisasi (PRD 4.5)</h2>
                  <p className="pane-sub">
                    Kelola riwayat karir, magang, freelance, atau organisasi kemahasiswaan.
                  </p>
                </div>
                {!editingExp && (
                  <button
                    onClick={() =>
                      setEditingExp({
                        organization: '',
                        role_title: '',
                        experience_type: 'Internship',
                        start_date: '2024-01',
                        end_date: null,
                        is_current: true,
                        achievements: ['Melakukan pengembangan sistem antarmuka web']
                      })
                    }
                    className="cms-add-btn"
                  >
                    <Plus size={16} />
                    <span>Tambah Pengalaman</span>
                  </button>
                )}
              </div>

              {editingExp && (
                <div className="editing-card-form">
                  <h3 className="section-inner-title">
                    {editingExp.id ? 'Edit Pengalaman' : 'Tambah Pengalaman Baru'}
                  </h3>
                  <form onSubmit={handleSaveExperience} className="cms-form-grid">
                    <div className="cms-form-field">
                      <label className="cms-label">Nama Perusahaan / Organisasi</label>
                      <input
                        type="text"
                        value={editingExp.organization || ''}
                        onChange={(e) => setEditingExp({ ...editingExp, organization: e.target.value })}
                        className="cms-input"
                        required
                      />
                    </div>
                    <div className="cms-form-field">
                      <label className="cms-label">Posisi / Jabatan</label>
                      <input
                        type="text"
                        value={editingExp.role_title || ''}
                        onChange={(e) => setEditingExp({ ...editingExp, role_title: e.target.value })}
                        className="cms-input"
                        required
                      />
                    </div>
                    <div className="cms-form-field">
                      <label className="cms-label">Tipe Pengalaman</label>
                      <input
                        type="text"
                        value={editingExp.experience_type || ''}
                        onChange={(e) =>
                          setEditingExp({ ...editingExp, experience_type: e.target.value })
                        }
                        className="cms-input"
                        placeholder="Internship / Full-time / Freelance / Organisasi"
                      />
                    </div>
                    <div className="cms-form-field">
                      <label className="cms-label">Tahun / Periode</label>
                      <input
                        type="text"
                        value={editingExp.period_text || ''}
                        onChange={(e) => setEditingExp({ ...editingExp, period_text: e.target.value })}
                        className="cms-input"
                        placeholder="Contoh: Jan 2024 - Sekarang"
                      />
                    </div>
                    <div className="cms-form-field full-width">
                      <label className="cms-label">Poin-poin Pencapaian (1 baris per poin)</label>
                      <textarea
                        rows={4}
                        value={(editingExp.achievements || []).join('\n')}
                        onChange={(e) =>
                          setEditingExp({
                            ...editingExp,
                            achievements: e.target.value.split('\n').filter((l) => l.trim().length > 0)
                          })
                        }
                        className="cms-textarea"
                        placeholder="Masukkan poin tanggung jawab atau hasil kerja..."
                      />
                    </div>
                    <div className="form-actions-bar full-width">
                      <button type="submit" className="cms-save-btn">
                        <Save size={18} />
                        <span>Simpan Pengalaman</span>
                      </button>
                      <button type="button" onClick={() => setEditingExp(null)} className="cms-cancel-btn">
                        Batal
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="admin-project-cards-list">
                {experiences.map((exp) => (
                  <div key={exp.id} className="admin-item-row">
                    <div className="item-row-left">
                      <div className="edu-avatar-badge" style={{ background: '#F5F3FF', color: '#7C3AED' }}>
                        <Briefcase size={22} />
                      </div>
                      <div className="item-details">
                        <div className="item-title-row">
                          <span className="item-main-title">{exp.role_title}</span>
                          <span className="status-pill pill-published">
                            {exp.organization} • {exp.experience_type}
                          </span>
                        </div>
                        <ul className="item-bullets">
                          {(exp.achievements || []).map((a, i) => (
                            <li key={i}>{a}</li>
                          ))}
                        </ul>
                        <div className="item-meta">
                          Periode: {exp.period_text || `${exp.start_date} - ${exp.end_date || 'Saat ini'}`}
                        </div>
                      </div>
                    </div>
                    <div className="item-actions">
                      <button onClick={() => setEditingExp(exp)} className="btn-action-ghost">
                        <Edit size={16} />
                        <span>Edit</span>
                      </button>
                      <button onClick={() => handleDeleteExperience(exp.id)} className="btn-action-danger">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 6: PESAN MASUK ================= */}
          {activeTab === 'messages' && (
            <div className="admin-tab-pane">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Kotak Masuk Kontak (PRD 5.3 &amp; 6.2)</h2>
                  <p className="pane-sub">
                    Pesan yang dikirimkan oleh recruiter atau klien melalui formulir kontak publik.
                  </p>
                </div>
              </div>

              {adminMessages.length === 0 ? (
                <div className="empty-state-notice">Belum ada pesan yang masuk dari pengunjung.</div>
              ) : (
                <div className="admin-messages-list">
                  {adminMessages.map((msg) => (
                    <div key={msg.id} className="admin-message-card">
                      <div className="msg-card-top">
                        <div>
                          <div className="msg-card-sender">{msg.sender_name}</div>
                          <div className="msg-card-email">{msg.sender_email}</div>
                        </div>
                        <div className="msg-card-meta">
                          <span className={`msg-status-badge status-${msg.status.toLowerCase()}`}>
                            {msg.status}
                          </span>
                          <span className="msg-card-time">{msg.created_at}</span>
                        </div>
                      </div>

                      <div className="msg-card-subject">
                        <strong>Subjek:</strong> {msg.subject}
                      </div>
                      <div className="msg-card-body">{msg.message}</div>

                      <div className="msg-card-footer">
                        <div className="msg-status-change-group">
                          <label>Ubah Status:</label>
                          <select
                            value={msg.status}
                            onChange={(e) => onUpdateMessageStatus(msg.id, e.target.value)}
                            className="msg-select-status"
                          >
                            <option value="NEW">NEW (Baru)</option>
                            <option value="READ">READ (Sudah Dibaca)</option>
                            <option value="REPLIED">REPLIED (Sudah Dibalas)</option>
                          </select>
                        </div>
                        <button
                          onClick={() => onDeleteMessage(msg.id)}
                          className="msg-delete-btn"
                          title="Hapus Pesan"
                        >
                          <Trash2 size={16} />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 7: TAUTAN SOSIAL & PENGATURAN ================= */}
          {activeTab === 'socials' && (
            <div className="admin-tab-pane">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Tautan Sosial &amp; Identitas Situs (PRD 4.8)</h2>
                  <p className="pane-sub">
                    Atur link akun GitHub, LinkedIn, Instagram, dan reset data portofolio bila diperlukan.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveSettings} className="cms-form-grid">
                <div className="cms-form-field">
                  <label className="cms-label">Judul Situs (Site Title)</label>
                  <input
                    type="text"
                    value={settingsForm.site_title || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, site_title: e.target.value })}
                    className="cms-input"
                  />
                </div>

                <div className="cms-form-field">
                  <label className="cms-label">Copyright Footer</label>
                  <input
                    type="text"
                    value={settingsForm.footer_copyright || ''}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, footer_copyright: e.target.value })
                    }
                    className="cms-input"
                  />
                </div>

                <div className="form-actions-bar full-width">
                  <button type="submit" className="cms-save-btn">
                    <Save size={18} />
                    <span>Simpan Pengaturan Situs</span>
                  </button>
                </div>
              </form>

              {/* Social Links List */}
              <div className="socials-editor-section">
                <h3 className="section-inner-title">Tautan Media Sosial</h3>
                <form onSubmit={handleSaveSocials} className="socials-list-form">
                  {socialsForm.map((s, idx) => (
                    <div key={s.id || idx} className="social-input-row">
                      <span className="social-platform-name">{s.platform}</span>
                      <input
                        type="url"
                        value={s.url}
                        onChange={(e) => {
                          const updated = [...socialsForm];
                          updated[idx].url = e.target.value;
                          setSocialsForm(updated);
                        }}
                        className="cms-input"
                        placeholder={`https://${s.platform.toLowerCase()}.com/...`}
                      />
                    </div>
                  ))}
                  <div className="form-actions-bar">
                    <button type="submit" className="cms-save-btn">
                      <Save size={18} />
                      <span>Simpan Tautan Sosial</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Danger Zone: Reset Data */}
              <div className="danger-zone-box">
                <h3 className="danger-title">Zona Bahaya: Reset Database</h3>
                <p className="danger-desc">
                  Mengembalikan seluruh data profil, proyek, pendidikan, dan tema warna kembali ke pengaturan awal standar PRD.
                </p>
                <button type="button" onClick={onResetData} className="btn-danger-reset">
                  <RefreshCw size={16} />
                  <span>Kembalikan Seluruh Data ke Default Awal</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      <style>{`
        .admin-page-container {
          min-height: 100vh;
          display: flex;
          background-color: var(--bg-main, #F7F7F3);
          color: var(--text-primary, #17221F);
          font-family: inherit;
        }

        /* Sidebar */
        .admin-sidebar {
          width: 270px;
          background-color: #FFFFFF;
          border-right: 1px solid var(--border-color, #DDE1DA);
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          z-index: 100;
          transition: transform 0.25s ease;
        }

        .sidebar-brand-box {
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border-bottom: 1px solid var(--border-color, #DDE1DA);
        }

        .sidebar-logo {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background-color: var(--primary-green, #17634D);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sidebar-brand-name {
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-primary, #17221F);
        }

        .sidebar-brand-sub {
          font-size: 0.75rem;
          color: var(--text-secondary, #64716B);
          font-family: monospace;
        }

        .sidebar-close-mobile-btn {
          display: none;
          background: none;
          border: none;
          color: var(--text-secondary, #64716B);
          cursor: pointer;
          margin-left: auto;
        }

        .sidebar-menu {
          flex: 1;
          padding: 1rem 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          overflow-y: auto;
        }

        .menu-group-label {
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--text-secondary, #64716B);
          letter-spacing: 0.08em;
          padding: 0.75rem 0.75rem 0.25rem;
        }

        .sidebar-nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-md, 8px);
          border: none;
          background: none;
          color: var(--text-secondary, #64716B);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          text-align: left;
          transition: all var(--transition-fast, 0.2s);
        }

        .sidebar-nav-item:hover {
          background-color: var(--primary-green-light, #F0F6F2);
          color: var(--primary-green, #17634D);
        }

        .sidebar-nav-item.active {
          background-color: var(--primary-green-pale, #E8F1EC);
          color: var(--primary-green, #17634D);
          font-weight: 600;
        }

        .sidebar-count-badge {
          margin-left: auto;
          background-color: var(--bg-main, #F7F7F3);
          color: var(--text-secondary, #64716B);
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.15rem 0.45rem;
          border-radius: var(--radius-full, 9999px);
        }

        .sidebar-badge-new {
          margin-left: auto;
          background-color: #EF4444;
          color: #FFFFFF;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.15rem 0.45rem;
          border-radius: var(--radius-full, 9999px);
        }

        .sidebar-bottom-card {
          padding: 1rem 1.25rem;
          border-top: 1px solid var(--border-color, #DDE1DA);
          background-color: #FAFAF9;
        }

        .admin-user-info {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 0.75rem;
        }

        .admin-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background-color: var(--primary-green, #17634D);
          color: #FFFFFF;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
        }

        .admin-user-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary, #17221F);
        }

        .admin-role-tag {
          font-size: 0.72rem;
          color: var(--text-secondary, #64716B);
        }

        .sidebar-logout-btn {
          width: 100%;
          padding: 0.45rem;
          background: #FFFFFF;
          border: 1px solid var(--border-color, #DDE1DA);
          border-radius: 6px;
          color: #DC2626;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: background var(--transition-fast, 0.2s);
        }

        .sidebar-logout-btn:hover {
          background-color: #FEF2F2;
        }

        /* Main Content */
        .admin-main-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .admin-topbar {
          background-color: #FFFFFF;
          border-bottom: 1px solid var(--border-color, #DDE1DA);
          padding: 0.85rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 90;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .topbar-hamburger-btn {
          display: none;
          background: none;
          border: 1px solid var(--border-color, #DDE1DA);
          border-radius: 6px;
          padding: 6px;
          cursor: pointer;
        }

        .topbar-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.875rem;
        }

        .crumb-root {
          color: var(--text-secondary, #64716B);
        }

        .crumb-sep {
          color: var(--border-color, #DDE1DA);
        }

        .crumb-current {
          font-weight: 600;
          color: var(--text-primary, #17221F);
        }

        .view-public-site-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background-color: var(--primary-green-light, #F0F6F2);
          color: var(--primary-green, #17634D);
          border: 1px solid var(--primary-green-border, #C8DCD1);
          border-radius: var(--radius-full, 9999px);
          font-size: 0.825rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast, 0.2s);
        }

        .view-public-site-btn:hover {
          background-color: var(--primary-green, #17634D);
          color: #FFFFFF;
        }

        .admin-page-body {
          padding: 2rem;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
        }

        .admin-tab-pane {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .pane-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }

        .pane-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary, #17221F);
          margin-bottom: 0.25rem;
        }

        .pane-sub {
          font-size: 0.875rem;
          color: var(--text-secondary, #64716B);
        }

        /* Stat cards */
        .stat-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.25rem;
        }

        .dashboard-stat-card {
          background-color: #FFFFFF;
          border: 1px solid var(--border-color, #DDE1DA);
          border-radius: var(--radius-lg, 16px);
          padding: 1.25rem;
          cursor: pointer;
          transition: all var(--transition-fast, 0.2s);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .dashboard-stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
          border-color: var(--primary-green-border, #C8DCD1);
        }

        .stat-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-num {
          font-size: 1.75rem;
          font-weight: 800;
          line-height: 1;
          color: var(--text-primary, #17221F);
        }

        .stat-name {
          font-size: 0.85rem;
          color: var(--text-secondary, #64716B);
          margin-top: 0.2rem;
        }

        .stat-pill-tag {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.2rem 0.55rem;
          border-radius: 4px;
          align-self: flex-start;
        }

        .tag-green { background: #E8F1EC; color: #17634D; }
        .tag-amber { background: #FEF3C7; color: #D97706; }
        .tag-blue { background: #EFF6FF; color: #2563EB; }
        .tag-purple { background: #F5F3FF; color: #7C3AED; }

        /* Dashboard boxes */
        .dashboard-content-box {
          background-color: #FFFFFF;
          border: 1px solid var(--border-color, #DDE1DA);
          border-radius: var(--radius-lg, 16px);
          padding: 1.5rem;
        }

        .section-inner-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary, #17221F);
          margin-bottom: 1rem;
        }

        .box-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .btn-text-link {
          background: none;
          border: none;
          color: var(--primary-green, #17634D);
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
        }

        .quick-action-btns {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1rem;
        }

        .quick-action-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background-color: #FAFAF9;
          border: 1px solid var(--border-color, #DDE1DA);
          border-radius: var(--radius-md, 8px);
          cursor: pointer;
          text-align: left;
          transition: all var(--transition-fast, 0.2s);
        }

        .quick-action-card:hover {
          background-color: var(--primary-green-light, #F0F6F2);
          border-color: var(--primary-green-border, #C8DCD1);
        }

        .action-icon {
          color: var(--primary-green, #17634D);
        }

        .action-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary, #17221F);
        }

        .action-sub {
          font-size: 0.78rem;
          color: var(--text-secondary, #64716B);
        }

        /* Messages preview */
        .messages-preview-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .preview-message-item {
          padding: 0.85rem 1rem;
          background-color: #FAFAF9;
          border: 1px solid var(--border-color, #DDE1DA);
          border-radius: var(--radius-md, 8px);
        }

        .msg-preview-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          margin-bottom: 0.25rem;
        }

        .msg-sender { font-weight: 600; }
        .msg-email { color: var(--text-secondary, #64716B); }
        .msg-preview-subject { font-size: 0.85rem; font-weight: 600; margin-bottom: 0.2rem; }
        .msg-preview-snippet { font-size: 0.8rem; color: var(--text-secondary, #64716B); line-height: 1.4; }

        /* Forms & Cards */
        .editing-card-form {
          background-color: #FFFFFF;
          border: 1px solid var(--primary-green-border, #C8DCD1);
          border-radius: var(--radius-lg, 16px);
          padding: 1.75rem;
          box-shadow: 0 4px 16px rgba(23, 99, 77, 0.05);
        }

        .cms-form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }

        .cms-form-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .cms-form-field.full-width {
          grid-column: span 2;
        }

        .cms-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary, #17221F);
        }

        .cms-input, .cms-select, .cms-textarea {
          width: 100%;
          padding: 0.65rem 0.85rem;
          border: 1px solid var(--border-color, #DDE1DA);
          border-radius: var(--radius-md, 8px);
          font-size: 0.9rem;
          background-color: #FAFAF9;
          color: var(--text-primary, #17221F);
          transition: all var(--transition-fast, 0.2s);
        }

        .cms-input:focus, .cms-select:focus, .cms-textarea:focus {
          outline: none;
          background-color: #FFFFFF;
          border-color: var(--primary-green, #17634D);
          box-shadow: 0 0 0 3px var(--primary-green-pale, #E8F1EC);
        }

        .form-actions-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .cms-save-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.4rem;
          background-color: var(--primary-green, #17634D);
          color: #FFFFFF;
          border: none;
          border-radius: var(--radius-md, 8px);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
        }

        .cms-save-btn:hover {
          background-color: var(--primary-green-hover, #124F3E);
        }

        .cms-cancel-btn {
          padding: 0.7rem 1.2rem;
          background: #FFFFFF;
          border: 1px solid var(--border-color, #DDE1DA);
          border-radius: var(--radius-md, 8px);
          color: var(--text-secondary, #64716B);
          font-size: 0.9rem;
          cursor: pointer;
        }

        .cms-add-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.6rem 1.15rem;
          background-color: var(--primary-green, #17634D);
          color: #FFFFFF;
          border: none;
          border-radius: var(--radius-md, 8px);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
        }

        /* Preset grid */
        .preset-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .preset-card {
          background-color: #FFFFFF;
          border: 1px solid var(--border-color, #DDE1DA);
          border-radius: var(--radius-md, 8px);
          padding: 1rem;
          cursor: pointer;
          transition: all var(--transition-fast, 0.2s);
          position: relative;
        }

        .preset-card:hover {
          border-color: var(--primary-green, #17634D);
          transform: translateY(-2px);
        }

        .preset-card-selected {
          border-color: var(--primary-green, #17634D);
          background-color: var(--primary-green-light, #F0F6F2);
        }

        .preset-color-preview {
          display: flex;
          gap: 0.35rem;
          margin-bottom: 0.5rem;
        }

        .color-circle {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .preset-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary, #17221F);
        }

        .preset-hex {
          font-size: 0.75rem;
          color: var(--text-secondary, #64716B);
          font-family: monospace;
        }

        .preset-active-check {
          display: inline-block;
          margin-top: 0.4rem;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--primary-green, #17634D);
        }

        .custom-picker-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .html5-color-picker {
          width: 48px;
          height: 48px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          background: none;
        }

        .custom-color-inputs {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .hex-input {
          width: 140px;
          font-family: monospace;
          font-weight: 600;
        }

        .hex-hint {
          font-size: 0.78rem;
          color: var(--text-secondary, #64716B);
        }

        .bg-preset-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
          margin-top: 0.5rem;
        }

        .bg-preset-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.45rem 0.85rem;
          background-color: #FFFFFF;
          border: 1px solid var(--border-color, #DDE1DA);
          border-radius: var(--radius-md, 8px);
          font-size: 0.825rem;
          cursor: pointer;
        }

        .bg-preset-active {
          border-color: var(--primary-green, #17634D);
          font-weight: 600;
        }

        .bg-preview-box {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          border: 1px solid rgba(0, 0, 0, 0.15);
        }

        .theme-live-preview-box {
          background-color: #FFFFFF;
          border: 1px solid var(--border-color, #DDE1DA);
          border-radius: var(--radius-md, 8px);
          padding: 1.25rem;
        }

        .preview-box-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary, #64716B);
          margin-bottom: 0.75rem;
        }

        .preview-elements-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .preview-btn-sample {
          color: #FFFFFF;
          border: none;
          padding: 0.55rem 1.1rem;
          border-radius: var(--radius-md, 8px);
          font-size: 0.85rem;
          font-weight: 600;
        }

        .preview-badge-sample {
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full, 9999px);
          font-size: 0.78rem;
          font-weight: 600;
        }

        /* Rows list */
        .admin-project-cards-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .admin-item-row {
          background-color: #FFFFFF;
          border: 1px solid var(--border-color, #DDE1DA);
          border-radius: var(--radius-md, 8px);
          padding: 1rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }

        .item-row-left {
          display: flex;
          align-items: center;
          gap: 1rem;
          min-width: 0;
        }

        .item-thumb-box {
          width: 72px;
          height: 52px;
          border-radius: 6px;
          overflow: hidden;
          flex-shrink: 0;
          background: #E5E7EB;
        }

        .item-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .item-title-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 0.25rem;
        }

        .item-main-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary, #17221F);
        }

        .status-pill {
          font-size: 0.68rem;
          font-weight: 700;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
        }

        .pill-published { background: #E8F1EC; color: #17634D; }
        .pill-draft { background: #F3F4F6; color: #6B7280; }

        .demo-pill {
          font-size: 0.68rem;
          font-weight: 600;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
        }

        .demo-online { background: #ECFDF5; color: #059669; }
        .demo-other { background: #FFFBEB; color: #D97706; }

        .item-desc {
          font-size: 0.825rem;
          color: var(--text-secondary, #64716B);
          margin-bottom: 0.25rem;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .item-meta {
          font-size: 0.75rem;
          color: var(--text-secondary, #64716B);
        }

        .item-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .btn-action-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.45rem 0.75rem;
          background: #FAFAF9;
          border: 1px solid var(--border-color, #DDE1DA);
          border-radius: 6px;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-primary, #17221F);
          cursor: pointer;
        }

        .btn-action-ghost:hover {
          background-color: var(--primary-green-light, #F0F6F2);
          border-color: var(--primary-green-border, #C8DCD1);
          color: var(--primary-green, #17634D);
        }

        .btn-action-danger {
          padding: 0.45rem 0.65rem;
          background: #FEF2F2;
          border: 1px solid #FECACA;
          border-radius: 6px;
          color: #DC2626;
          cursor: pointer;
        }

        .edu-avatar-badge {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: #EFF6FF;
          color: #2563EB;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .item-bullets {
          margin: 0.25rem 0;
          padding-left: 1.25rem;
          font-size: 0.8rem;
          color: var(--text-secondary, #64716B);
        }

        /* Messages */
        .admin-messages-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .admin-message-card {
          background-color: #FFFFFF;
          border: 1px solid var(--border-color, #DDE1DA);
          border-radius: var(--radius-md, 8px);
          padding: 1.25rem;
        }

        .msg-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }

        .msg-card-sender { font-weight: 700; font-size: 0.95rem; }
        .msg-card-email { font-size: 0.8rem; color: var(--text-secondary, #64716B); }
        .msg-card-meta { display: flex; align-items: center; gap: 0.75rem; }
        .msg-card-time { font-size: 0.75rem; color: var(--text-secondary, #64716B); }

        .msg-status-badge {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
        }

        .status-new { background: #FEF2F2; color: #DC2626; }
        .status-read { background: #EFF6FF; color: #2563EB; }
        .status-replied { background: #ECFDF5; color: #059669; }

        .msg-card-subject {
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .msg-card-body {
          font-size: 0.85rem;
          color: var(--text-secondary, #64716B);
          line-height: 1.5;
          background: #FAFAF9;
          padding: 0.75rem 1rem;
          border-radius: 6px;
          margin-bottom: 0.85rem;
        }

        .msg-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .msg-status-change-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: var(--text-secondary, #64716B);
        }

        .msg-select-status {
          padding: 0.35rem 0.65rem;
          border: 1px solid var(--border-color, #DDE1DA);
          border-radius: 6px;
          font-size: 0.8rem;
        }

        .msg-delete-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: none;
          border: none;
          color: #DC2626;
          font-size: 0.8rem;
          cursor: pointer;
        }

        /* Danger zone */
        .danger-zone-box {
          margin-top: 2rem;
          background: #FEF2F2;
          border: 1px solid #FCA5A5;
          border-radius: var(--radius-md, 8px);
          padding: 1.5rem;
        }

        .danger-title {
          font-size: 1rem;
          font-weight: 700;
          color: #991B1B;
          margin-bottom: 0.35rem;
        }

        .danger-desc {
          font-size: 0.85rem;
          color: #7F1D1D;
          margin-bottom: 1rem;
        }

        .btn-danger-reset {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.25rem;
          background-color: #DC2626;
          color: #FFFFFF;
          border: none;
          border-radius: var(--radius-md, 8px);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
        }

        .socials-editor-section {
          background-color: #FFFFFF;
          border: 1px solid var(--border-color, #DDE1DA);
          border-radius: var(--radius-md, 8px);
          padding: 1.5rem;
          margin-top: 1.5rem;
        }

        .socials-list-form {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .social-input-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .social-platform-name {
          width: 100px;
          font-weight: 600;
          font-size: 0.85rem;
        }

        /* Gallery Management & Thumbnail Selection Styles */
        .gallery-management-field {
          background-color: #FAFAF9;
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
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
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
          height: 140px;
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

        /* Mobile responsiveness */
        @media (max-width: 992px) {
          .admin-sidebar {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            transform: translateX(-100%);
          }

          .admin-sidebar.sidebar-open {
            transform: translateX(0);
          }

          .sidebar-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.4);
            z-index: 99;
          }

          .sidebar-close-mobile-btn {
            display: block;
          }

          .topbar-hamburger-btn {
            display: block;
          }

          .admin-page-body {
            padding: 1.25rem;
          }

          .cms-form-grid {
            grid-template-columns: 1fr;
          }

          .cms-form-field.full-width {
            grid-column: span 1;
          }

          .admin-item-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .item-actions {
            width: 100%;
            justify-content: flex-end;
          }
        }
      `}</style>
    </div>
  );
}
