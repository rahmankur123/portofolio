import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import EducationSection from './components/EducationSection';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectDetailModal from './components/ProjectDetailModal';
import AdminPreviewModal from './components/AdminPreviewModal';
import AdminPage from './pages/AdminPage';
import AdminLoginPage from './pages/AdminLoginPage';

import {
  fetchPublicProfile,
  fetchPublicEducations,
  fetchPublicExperiences,
  fetchPublicSkillCategories,
  fetchPublicProjects,
  fetchPublicSiteSettings,
  fetchPublicSocialLinks,
  fetchAdminProjects,
  fetchAdminMessages,
  fetchThemeSettings,
  toggleProjectPublicationStatus,
  updateProjectDemoStatus,
  updateAdminMessageStatus,
  deleteAdminMessage,
  resetAllDataToDefault,
  saveProfile,
  saveEducations,
  saveExperiences,
  saveSkillCategories,
  saveProjects,
  saveSiteSettings,
  saveSocialLinks,
  saveThemeSettings,
  applyThemeToDocument,
  defaultTheme,
  getAdminAuthStatus,
  setAdminAuthStatus
} from './services/portfolioStorage';

import {
  syncCredentialsFromServer,
  isSupabaseConfigured,
  getSupabaseClient
} from './services/supabaseClient';

import {
  initialProfile,
  initialEducations,
  initialExperiences,
  initialSkillCategories,
  initialProjects,
  initialSocialLinks,
  initialSiteSettings,
  initialContactMessages
} from './data/initialData';

import { Sliders, Sparkles, AlertCircle, CheckCircle2 } from './components/Icons';

export default function App() {
  // Client-side routing state: supports both path (/admin, /admin/login) and hash (#/admin)
  const [currentPath, setCurrentPath] = useState(() => {
    const p = window.location.pathname;
    const h = window.location.hash;
    if (h.startsWith('#/admin/login') || h === '#admin/login') return '/admin/login';
    if (h.startsWith('#/admin') || h === '#admin') return '/admin';
    return p || '/';
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return getAdminAuthStatus();
  });

  const navigate = (toPath) => {
    window.history.pushState({}, '', toPath);
    setCurrentPath(toPath);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname;
      const h = window.location.hash;
      if (h.startsWith('#/admin/login') || h === '#admin/login') setCurrentPath('/admin/login');
      else if (h.startsWith('#/admin') || h === '#admin') setCurrentPath('/admin');
      else setCurrentPath(p || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Theme state
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_theme_v1');
      return saved ? JSON.parse(saved) : defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  // Apply theme to document CSS variables immediately
  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  // Initialize state synchronously so page renders immediately without blank frame
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_profile_v1');
      return saved ? JSON.parse(saved) : initialProfile;
    } catch {
      return initialProfile;
    }
  });

  const [educations, setEducations] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_educations_v1');
      const list = saved ? JSON.parse(saved) : initialEducations;
      return Array.isArray(list)
        ? list.filter((i) => i.is_visible).sort((a, b) => a.sort_order - b.sort_order)
        : initialEducations;
    } catch {
      return initialEducations;
    }
  });

  const [experiences, setExperiences] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_experiences_v1');
      const list = saved ? JSON.parse(saved) : initialExperiences;
      return Array.isArray(list)
        ? list.filter((i) => i.is_visible).sort((a, b) => a.sort_order - b.sort_order)
        : initialExperiences;
    } catch {
      return initialExperiences;
    }
  });

  const [skillCategories, setSkillCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_skills_v1');
      const list = saved ? JSON.parse(saved) : initialSkillCategories;
      return Array.isArray(list)
        ? list.filter((c) => c.is_visible).sort((a, b) => a.sort_order - b.sort_order)
        : initialSkillCategories;
    } catch {
      return initialSkillCategories;
    }
  });

  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_projects_v1');
      if (saved !== null) {
        const list = JSON.parse(saved);
        if (Array.isArray(list)) {
          return list.filter((p) => p.publication_status === 'PUBLISHED').sort((a, b) => a.sort_order - b.sort_order);
        }
      }
      return initialProjects.filter((p) => p.publication_status === 'PUBLISHED');
    } catch {
      return initialProjects.filter((p) => p.publication_status === 'PUBLISHED');
    }
  });

  const [siteSettings, setSiteSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_settings_v1');
      return saved ? JSON.parse(saved) : initialSiteSettings;
    } catch {
      return initialSiteSettings;
    }
  });

  const [socialLinks, setSocialLinks] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_social_v1');
      const list = saved ? JSON.parse(saved) : initialSocialLinks;
      return Array.isArray(list)
        ? list.filter((i) => i.is_visible).sort((a, b) => a.sort_order - b.sort_order)
        : initialSocialLinks;
    } catch {
      return initialSocialLinks;
    }
  });

  // Admin & Modals
  const [allAdminProjects, setAllAdminProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_projects_v1');
      if (saved !== null) {
        const list = JSON.parse(saved);
        if (Array.isArray(list)) return list;
      }
      return initialProjects;
    } catch {
      return initialProjects;
    }
  });

  const [adminMessages, setAdminMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_messages_v1');
      const list = saved ? JSON.parse(saved) : initialContactMessages;
      return Array.isArray(list) ? list : initialContactMessages;
    } catch {
      return initialContactMessages;
    }
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Update document title dynamically whenever site title or profile changes
  useEffect(() => {
    const title = siteSettings?.site_title || (profile?.full_name ? `${profile.full_name} — Web Developer & UI Designer` : 'Personal Portfolio');
    document.title = title;
  }, [siteSettings?.site_title, profile?.full_name]);

  // Reload data from storage safely (only update states if content actually changed)
  const loadData = async () => {
    try {
      const [
        profData,
        eduData,
        expData,
        skillsData,
        projData,
        settingsData,
        socialData,
        adminProjData,
        adminMsgData,
        themeData
      ] = await Promise.all([
        fetchPublicProfile(),
        fetchPublicEducations(),
        fetchPublicExperiences(),
        fetchPublicSkillCategories(),
        fetchPublicProjects(),
        fetchPublicSiteSettings(),
        fetchPublicSocialLinks(),
        fetchAdminProjects(),
        fetchAdminMessages(),
        fetchThemeSettings()
      ]);

      setProfile((prev) => (JSON.stringify(prev) !== JSON.stringify(profData) ? profData : prev));
      setEducations((prev) => (JSON.stringify(prev) !== JSON.stringify(eduData) ? eduData : prev));
      setExperiences((prev) => (JSON.stringify(prev) !== JSON.stringify(expData) ? expData : prev));
      setSkillCategories((prev) => (JSON.stringify(prev) !== JSON.stringify(skillsData) ? skillsData : prev));
      setProjects((prev) => (JSON.stringify(prev) !== JSON.stringify(projData) ? projData : prev));
      setSiteSettings((prev) => (JSON.stringify(prev) !== JSON.stringify(settingsData) ? settingsData : prev));
      setSocialLinks((prev) => (JSON.stringify(prev) !== JSON.stringify(socialData) ? socialData : prev));
      setAllAdminProjects((prev) => (JSON.stringify(prev) !== JSON.stringify(adminProjData) ? adminProjData : prev));
      setAdminMessages((prev) => (JSON.stringify(prev) !== JSON.stringify(adminMsgData) ? adminMsgData : prev));
      if (themeData) {
        setTheme((prev) => {
          if (JSON.stringify(prev) !== JSON.stringify(themeData)) {
            applyThemeToDocument(themeData);
            return themeData;
          }
          return prev;
        });
      }
    } catch (err) {
      console.error('Gagal memuat data portofolio:', err);
    }
  };

  useEffect(() => {
    let realtimeChannel = null;
    let isSubscribed = true;

    const setupSyncAndRealtime = async () => {
      // 1. Sinkronkan kredensial dari server
      await syncCredentialsFromServer();

      // 2. Muat data aktual dari Supabase / LocalStorage sekali saat awal buka
      if (isSubscribed) {
        await loadData();
      }

      // 3. Pasang pendengar Realtime Supabase (hanya update saat ada event perubahan nyata dari DB)
      if (isSupabaseConfigured()) {
        const supabase = getSupabaseClient();
        if (supabase) {
          try {
            realtimeChannel = supabase
              .channel('portfolio-sync-channel')
              .on('postgres_changes', { event: '*', schema: 'public' }, () => {
                if (isSubscribed) {
                  loadData();
                }
              })
              .subscribe();
          } catch (e) {
            console.warn('Realtime channel subscribe failed:', e);
          }
        }
      }
    };

    setupSyncAndRealtime();

    return () => {
      isSubscribed = false;
      if (realtimeChannel && isSupabaseConfigured()) {
        const supabase = getSupabaseClient();
        if (supabase) {
          supabase.removeChannel(realtimeChannel);
        }
      }
    };
  }, []);

  // Real-time Handlers for CMS
  const handleUpdateTheme = (newTheme) => {
    setTheme(newTheme);
    saveThemeSettings(newTheme);
    applyThemeToDocument(newTheme);
    showToast(`Warna tema berhasil diperbarui ke: ${newTheme.presetName || 'Kustom'}!`);
  };

  const handleUpdateProfile = (newProfile) => {
    setProfile(newProfile);
    saveProfile(newProfile);
    showToast('Profil & data biodata berhasil diperbarui di landing page!');
  };

  const handleUpdateEducations = (newList) => {
    saveEducations(newList);
    setEducations(newList.filter((i) => i.is_visible).sort((a, b) => a.sort_order - b.sort_order));
    showToast('Data riwayat pendidikan berhasil diperbarui!');
  };

  const handleUpdateExperiences = (newList) => {
    saveExperiences(newList);
    setExperiences(newList.filter((i) => i.is_visible).sort((a, b) => a.sort_order - b.sort_order));
    showToast('Data riwayat pengalaman berhasil diperbarui!');
  };

  const handleUpdateSkillCategories = (newList) => {
    saveSkillCategories(newList);
    setSkillCategories(newList.filter((c) => c.is_visible).sort((a, b) => a.sort_order - b.sort_order));
    showToast('Keahlian berhasil diperbarui!');
  };

  const handleUpdateProjects = (newList) => {
    saveProjects(newList);
    setAllAdminProjects(newList);
    const publicOnly = newList
      .filter((p) => p.publication_status === 'PUBLISHED')
      .sort((a, b) => a.sort_order - b.sort_order);
    setProjects(publicOnly);
    showToast('Daftar proyek berhasil diperbarui!');
  };

  const handleUpdateSiteSettings = (newSettings) => {
    setSiteSettings(newSettings);
    saveSiteSettings(newSettings);
    showToast('Identitas & setting situs berhasil diperbarui!');
  };

  const handleUpdateSocialLinks = (newLinks) => {
    saveSocialLinks(newLinks);
    setSocialLinks(newLinks.filter((i) => i.is_visible).sort((a, b) => a.sort_order - b.sort_order));
    showToast('Tautan sosial media berhasil diperbarui!');
  };

  const handleTogglePublish = async (id) => {
    const updated = await toggleProjectPublicationStatus(id);
    setAllAdminProjects(updated);
    // Refresh public projects
    const publicOnly = updated.filter((p) => p.publication_status === 'PUBLISHED');
    setProjects(publicOnly);

    const changedProj = updated.find((p) => p.id === id);
    showToast(
      `Status proyek "${changedProj.title}" diubah menjadi ${changedProj.publication_status}.`
    );
  };

  const handleUpdateDemoStatus = async (id, newStatus) => {
    const updated = await updateProjectDemoStatus(id, newStatus);
    setAllAdminProjects(updated);
    const publicOnly = updated.filter((p) => p.publication_status === 'PUBLISHED');
    setProjects(publicOnly);

    // Update selected project if open
    if (selectedProject && selectedProject.id === id) {
      setSelectedProject(updated.find((p) => p.id === id));
    }

    showToast(`Status Live Demo diperbarui ke ${newStatus}.`);
  };

  const handleUpdateMessageStatus = async (id, newStatus) => {
    const updated = await updateAdminMessageStatus(id, newStatus);
    setAdminMessages(updated);
    showToast(`Status pesan diperbarui ke ${newStatus}.`);
  };

  const handleDeleteMessage = async (id) => {
    const updated = await deleteAdminMessage(id);
    setAdminMessages(updated);
    showToast('Pesan berhasil dihapus dari database CMS.', 'error');
  };

  const handleResetData = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan seluruh data dan tema ke pengaturan awal?')) {
      resetAllDataToDefault();
      setTheme(defaultTheme);
      applyThemeToDocument(defaultTheme);
      loadData();
      showToast('Seluruh data dan warna tema berhasil di-reset ke nilai default.');
    }
  };

  const handleMessageSent = (newMsg) => {
    setAdminMessages((prev) => [newMsg, ...prev]);
    showToast(`Pesan dari ${newMsg.sender_name} berhasil dicatat di CMS!`);
  };

  // ROUTE 1: /admin/login (Dedicated Login Screen)
  if (currentPath === '/admin/login') {
    return (
      <div className="portfolio-app">
        <AdminLoginPage
          onLoginSuccess={() => {
            setIsAdminAuthenticated(true);
            navigate('/admin');
            showToast('Selamat datang di Admin CMS Dashboard!');
          }}
          navigate={navigate}
          siteSettings={siteSettings}
        />
        {toast && (
          <div className="toast-container">
            <div className={`toast ${toast.type === 'error' ? 'toast-error' : 'toast-success'}`}>
              {toast.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
              <span>{toast.message}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ROUTE 2: /admin (Dedicated Full-Page Admin Dashboard)
  if (currentPath === '/admin' || currentPath.startsWith('/admin')) {
    // If not authenticated, require login first
    if (!isAdminAuthenticated) {
      return (
        <div className="portfolio-app">
          <AdminLoginPage
            onLoginSuccess={() => {
              setIsAdminAuthenticated(true);
              navigate('/admin');
              showToast('Login berhasil!');
            }}
            navigate={navigate}
            siteSettings={siteSettings}
          />
          {toast && (
            <div className="toast-container">
              <div className={`toast ${toast.type === 'error' ? 'toast-error' : 'toast-success'}`}>
                {toast.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                <span>{toast.message}</span>
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="portfolio-app">
        <AdminPage
          navigate={navigate}
          theme={theme}
          profile={profile}
          educations={educations}
          experiences={experiences}
          skillCategories={skillCategories}
          allAdminProjects={allAdminProjects}
          siteSettings={siteSettings}
          socialLinks={socialLinks}
          adminMessages={adminMessages}
          onUpdateTheme={handleUpdateTheme}
          onUpdateProfile={handleUpdateProfile}
          onUpdateEducations={handleUpdateEducations}
          onUpdateExperiences={handleUpdateExperiences}
          onUpdateSkillCategories={handleUpdateSkillCategories}
          onUpdateProjects={handleUpdateProjects}
          onUpdateSiteSettings={handleUpdateSiteSettings}
          onUpdateSocialLinks={handleUpdateSocialLinks}
          onTogglePublish={handleTogglePublish}
          onUpdateDemoStatus={handleUpdateDemoStatus}
          onUpdateMessageStatus={handleUpdateMessageStatus}
          onDeleteMessage={handleDeleteMessage}
          onResetData={handleResetData}
        />
        {toast && (
          <div className="toast-container">
            <div className={`toast ${toast.type === 'error' ? 'toast-error' : 'toast-success'}`}>
              {toast.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
              <span>{toast.message}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ROUTE 3: / (Public Landing Page)
  return (
    <div className="portfolio-app">
      {/* 1. Navbar */}
      <Navbar
        profile={profile}
        onOpenAdmin={() => navigate('/admin')}
        siteSettings={siteSettings}
      />

      {/* Hero Section */}
      <Hero profile={profile} siteSettings={siteSettings} socialLinks={socialLinks} />

      {/* About Section */}
      <AboutSection profile={profile} />

      {/* Education Timeline */}
      <EducationSection educations={educations} />

      {/* Experience Timeline */}
      <ExperienceSection experiences={experiences} />

      {/* Skills Section */}
      <SkillsSection skillCategories={skillCategories} />

      {/* Projects Section */}
      <ProjectsSection
        projects={projects}
        onSelectProject={(proj) => setSelectedProject(proj)}
      />

      {/* Contact Form */}
      <ContactSection profile={profile} onMessageSent={handleMessageSent} />

      {/* Footer */}
      <Footer
        profile={profile}
        socialLinks={socialLinks}
        onOpenAdmin={() => navigate('/admin')}
        siteSettings={siteSettings}
      />

      {/* Modals */}
      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Admin Preview Modal */}
      <AdminPreviewModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        theme={theme}
        profile={profile}
        educations={educations}
        experiences={experiences}
        skillCategories={skillCategories}
        allAdminProjects={allAdminProjects}
        siteSettings={siteSettings}
        socialLinks={socialLinks}
        adminMessages={adminMessages}
        onUpdateTheme={handleUpdateTheme}
        onUpdateProfile={handleUpdateProfile}
        onUpdateEducations={handleUpdateEducations}
        onUpdateExperiences={handleUpdateExperiences}
        onUpdateSkillCategories={handleUpdateSkillCategories}
        onUpdateProjects={handleUpdateProjects}
        onUpdateSiteSettings={handleUpdateSiteSettings}
        onUpdateSocialLinks={handleUpdateSocialLinks}
        onTogglePublish={handleTogglePublish}
        onUpdateDemoStatus={handleUpdateDemoStatus}
        onUpdateMessageStatus={handleUpdateMessageStatus}
        onDeleteMessage={handleDeleteMessage}
        onResetData={handleResetData}
      />

      {/* Floating Admin Trigger Pill - Direct route to /admin */}
      {/*<div className="floating-admin-trigger">
        <button
          onClick={() => navigate('/admin')}
          className="admin-floating-btn"
          title="Buka Halaman Admin Panel (/admin)"
        >
          <Sliders size={18} />
          <span className="floating-btn-text">Admin Panel (/admin)</span>
          {adminMessages.filter((m) => m.status === 'NEW').length > 0 && (
            <span className="floating-badge">
              {adminMessages.filter((m) => m.status === 'NEW').length}
            </span>
          )}
        </button>
      </div>*/}

      {/* Toast Feedback */}
      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type === 'error' ? 'toast-error' : 'toast-success'}`}>
            {toast.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <style>{`
        .portfolio-app {
          min-height: 100vh;
          position: relative;
        }

        .app-loading-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-main);
        }

        .loading-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1rem;
        }

        .loading-spinner-ring {
          width: 44px;
          height: 44px;
          border: 3px solid var(--primary-green-border);
          border-top-color: var(--primary-green);
          border-radius: 50%;
          animation: spinRing 0.8s linear infinite;
        }

        @keyframes spinRing {
          to { transform: rotate(360deg); }
        }

        .loading-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .loading-sub {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .floating-admin-trigger {
          position: fixed;
          bottom: 24px;
          left: 24px;
          z-index: 850;
        }

        .admin-floating-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.65rem 1.15rem;
          background-color: #17221F;
          color: #FAFAF7;
          border: 1px solid #2B3D37;
          border-radius: var(--radius-full);
          font-size: 0.825rem;
          font-weight: 600;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          transition: all var(--transition-fast);
        }

        .admin-floating-btn:hover {
          background-color: var(--primary-green);
          border-color: var(--primary-green-border);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(23, 99, 77, 0.35);
        }

        .floating-badge {
          background-color: #EF4444;
          color: #FFFFFF;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.1rem 0.4rem;
          border-radius: var(--radius-full);
        }

        @media (max-width: 576px) {
          .floating-btn-text {
            display: none;
          }
          .admin-floating-btn {
            padding: 0.65rem;
            border-radius: 50%;
            width: 44px;
            height: 44px;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
