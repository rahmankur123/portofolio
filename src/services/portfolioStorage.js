// Service layer untuk data portofolio
// Mematuhi kontrak REST API PRD Bagian 8.4 dan Aturan Bisnis Bagian 7 & Pengelolaan CMS Penuh
import {
  initialProfile,
  initialEducations,
  initialExperiences,
  initialSkillCategories,
  initialProjects,
  initialSocialLinks,
  initialSiteSettings,
  initialContactMessages
} from '../data/initialData';

const STORAGE_KEYS = {
  PROFILE: 'portfolio_profile_v1',
  EDUCATIONS: 'portfolio_educations_v1',
  EXPERIENCES: 'portfolio_experiences_v1',
  SKILLS: 'portfolio_skills_v1',
  PROJECTS: 'portfolio_projects_v1',
  SOCIAL_LINKS: 'portfolio_social_v1',
  SETTINGS: 'portfolio_settings_v1',
  MESSAGES: 'portfolio_messages_v1',
  THEME: 'portfolio_theme_v1'
};

export const defaultTheme = {
  primaryColor: '#17634D',
  primaryHover: '#124F3E',
  primaryPale: '#E8F1EC',
  primaryLight: '#F0F6F2',
  primaryBorder: '#C8DCD1',
  bgMain: '#F7F7F3',
  presetName: 'Forest Green (Default PRD)'
};

export const THEME_PRESETS = [
  {
    name: 'Forest Green (Default PRD)',
    primaryColor: '#17634D',
    primaryHover: '#124F3E',
    primaryPale: '#E8F1EC',
    primaryLight: '#F0F6F2',
    primaryBorder: '#C8DCD1',
    bgMain: '#F7F7F3'
  },
  {
    name: 'Emerald Fresh',
    primaryColor: '#059669',
    primaryHover: '#047857',
    primaryPale: '#D1FAE5',
    primaryLight: '#ECFDF5',
    primaryBorder: '#A7F3D0',
    bgMain: '#F8FAF8'
  },
  {
    name: 'Ocean Blue',
    primaryColor: '#0284C7',
    primaryHover: '#0369A1',
    primaryPale: '#E0F2FE',
    primaryLight: '#F0F9FF',
    primaryBorder: '#BAE6FD',
    bgMain: '#F8FAFC'
  },
  {
    name: 'Royal Indigo',
    primaryColor: '#4F46E5',
    primaryHover: '#4338CA',
    primaryPale: '#EEF2FF',
    primaryLight: '#F5F7FF',
    primaryBorder: '#C7D2FE',
    bgMain: '#FAF8FC'
  },
  {
    name: 'Amethyst Purple',
    primaryColor: '#7C3AED',
    primaryHover: '#6D28D9',
    primaryPale: '#F5F3FF',
    primaryLight: '#FAF5FF',
    primaryBorder: '#DDD6FE',
    bgMain: '#FAF8FD'
  },
  {
    name: 'Sunset Orange',
    primaryColor: '#EA580C',
    primaryHover: '#C2410C',
    primaryPale: '#FFEDD5',
    primaryLight: '#FFF7ED',
    primaryBorder: '#FED7AA',
    bgMain: '#FCF9F7'
  },
  {
    name: 'Slate Minimalist',
    primaryColor: '#1E293B',
    primaryHover: '#0F172A',
    primaryPale: '#F1F5F9',
    primaryLight: '#F8FAFC',
    primaryBorder: '#CBD5E1',
    bgMain: '#F8F9FA'
  }
];

// Helper untuk membaca dari storage dengan fallback
export function getFromStorage(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Gagal membaca dari localStorage [${key}]:`, error);
    return defaultValue;
  }
}

// Helper untuk menyimpan ke storage
export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Gagal menyimpan ke localStorage [${key}]:`, error);
  }
}

// Helper untuk menerapkan warna tema ke CSS Variables
export function applyThemeToDocument(theme) {
  if (!theme) return;
  const root = document.documentElement;
  if (theme.primaryColor) root.style.setProperty('--primary-green', theme.primaryColor);
  if (theme.primaryHover) root.style.setProperty('--primary-green-hover', theme.primaryHover);
  if (theme.primaryPale) root.style.setProperty('--primary-green-pale', theme.primaryPale);
  if (theme.primaryLight) root.style.setProperty('--primary-green-light', theme.primaryLight);
  if (theme.primaryBorder) root.style.setProperty('--primary-green-border', theme.primaryBorder);
  if (theme.bgMain) root.style.setProperty('--bg-main', theme.bgMain);
}

// ==========================================
// PUBLIC API (Sesuai PRD 8.4)
// ==========================================

export async function fetchPublicProfile() {
  return getFromStorage(STORAGE_KEYS.PROFILE, initialProfile);
}

export async function fetchPublicEducations() {
  const list = getFromStorage(STORAGE_KEYS.EDUCATIONS, initialEducations);
  const arr = Array.isArray(list) ? list : initialEducations;
  return arr
    .filter((item) => item.is_visible)
    .sort((a, b) => a.sort_order - b.sort_order);
}

export async function fetchPublicExperiences() {
  const list = getFromStorage(STORAGE_KEYS.EXPERIENCES, initialExperiences);
  const arr = Array.isArray(list) ? list : initialExperiences;
  return arr
    .filter((item) => item.is_visible)
    .sort((a, b) => a.sort_order - b.sort_order);
}

export async function fetchPublicSkillCategories() {
  const list = getFromStorage(STORAGE_KEYS.SKILLS, initialSkillCategories);
  const arr = Array.isArray(list) ? list : initialSkillCategories;
  return arr
    .filter((cat) => cat.is_visible)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((cat) => ({
      ...cat,
      skills: (cat.skills || [])
        .filter((s) => s.is_visible !== false)
        .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
    }));
}

export async function fetchPublicProjects() {
  const list = getFromStorage(STORAGE_KEYS.PROJECTS, initialProjects);
  const arr = Array.isArray(list) ? list : initialProjects;
  return arr
    .filter((proj) => proj.publication_status === 'PUBLISHED')
    .sort((a, b) => a.sort_order - b.sort_order);
}

export async function fetchPublicProjectBySlug(slug) {
  const list = getFromStorage(STORAGE_KEYS.PROJECTS, initialProjects);
  const arr = Array.isArray(list) ? list : initialProjects;
  const found = arr.find((p) => p.slug === slug);
  if (!found || found.publication_status !== 'PUBLISHED') {
    return null;
  }
  return found;
}

export async function fetchPublicSiteSettings() {
  return getFromStorage(STORAGE_KEYS.SETTINGS, initialSiteSettings);
}

export async function fetchPublicSocialLinks() {
  const list = getFromStorage(STORAGE_KEYS.SOCIAL_LINKS, initialSocialLinks);
  const arr = Array.isArray(list) ? list : initialSocialLinks;
  return arr
    .filter((item) => item.is_visible)
    .sort((a, b) => a.sort_order - b.sort_order);
}

export async function fetchThemeSettings() {
  return getFromStorage(STORAGE_KEYS.THEME, defaultTheme);
}

// ==========================================
// FULL CRUD ADMIN OPERATIONS
// ==========================================

export async function saveProfile(newProfile) {
  saveToStorage(STORAGE_KEYS.PROFILE, newProfile);
  return newProfile;
}

export async function saveEducations(list) {
  saveToStorage(STORAGE_KEYS.EDUCATIONS, list);
  return list;
}

export async function saveExperiences(list) {
  saveToStorage(STORAGE_KEYS.EXPERIENCES, list);
  return list;
}

export async function saveSkillCategories(list) {
  saveToStorage(STORAGE_KEYS.SKILLS, list);
  return list;
}

export async function saveProjects(list) {
  saveToStorage(STORAGE_KEYS.PROJECTS, list);
  return list;
}

export async function saveSiteSettings(settings) {
  saveToStorage(STORAGE_KEYS.SETTINGS, settings);
  return settings;
}

export async function saveSocialLinks(links) {
  saveToStorage(STORAGE_KEYS.SOCIAL_LINKS, links);
  return links;
}

export async function saveThemeSettings(theme) {
  saveToStorage(STORAGE_KEYS.THEME, theme);
  applyThemeToDocument(theme);
  return theme;
}

// Contact form message submission
export async function submitContactMessage({ sender_name, sender_email, subject, message }) {
  if (!sender_name?.trim()) {
    throw new Error('Nama pengirim wajib diisi.');
  }
  if (!sender_email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sender_email.trim())) {
    throw new Error('Format email pengirim tidak valid.');
  }
  if (!message?.trim() || message.trim().length < 5) {
    throw new Error('Pesan minimal berisi 5 karakter.');
  }

  const existingMessages = getFromStorage(STORAGE_KEYS.MESSAGES, initialContactMessages);
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

  const newMessage = {
    id: Date.now(),
    sender_name: sender_name.trim(),
    sender_email: sender_email.trim(),
    subject: subject?.trim() || '(Tanpa Subjek)',
    message: message.trim(),
    status: 'NEW',
    created_at: formattedDate
  };

  const updatedMessages = [newMessage, ...existingMessages];
  saveToStorage(STORAGE_KEYS.MESSAGES, updatedMessages);

  return { success: true, message: 'Pesan Anda berhasil terkirim dan disimpan!', data: newMessage };
}

export async function fetchAdminProjects() {
  return getFromStorage(STORAGE_KEYS.PROJECTS, initialProjects);
}

export async function toggleProjectPublicationStatus(id) {
  const list = getFromStorage(STORAGE_KEYS.PROJECTS, initialProjects);
  const updated = list.map((item) => {
    if (item.id === id) {
      const nextStatus = item.publication_status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
      return {
        ...item,
        publication_status: nextStatus,
        published_at: nextStatus === 'PUBLISHED' ? new Date().toISOString().split('T')[0] : null
      };
    }
    return item;
  });
  saveToStorage(STORAGE_KEYS.PROJECTS, updated);
  return updated;
}

export async function updateProjectDemoStatus(id, demo_status, live_url) {
  const list = getFromStorage(STORAGE_KEYS.PROJECTS, initialProjects);
  const updated = list.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        demo_status,
        live_url: live_url !== undefined ? live_url : item.live_url
      };
    }
    return item;
  });
  saveToStorage(STORAGE_KEYS.PROJECTS, updated);
  return updated;
}

export async function fetchAdminMessages() {
  return getFromStorage(STORAGE_KEYS.MESSAGES, initialContactMessages);
}

export async function updateAdminMessageStatus(id, newStatus) {
  const list = getFromStorage(STORAGE_KEYS.MESSAGES, initialContactMessages);
  const updated = list.map((msg) => (msg.id === id ? { ...msg, status: newStatus } : msg));
  saveToStorage(STORAGE_KEYS.MESSAGES, updated);
  return updated;
}

export async function deleteAdminMessage(id) {
  const list = getFromStorage(STORAGE_KEYS.MESSAGES, initialContactMessages);
  const updated = list.filter((msg) => msg.id !== id);
  saveToStorage(STORAGE_KEYS.MESSAGES, updated);
  return updated;
}

export function resetAllDataToDefault() {
  localStorage.removeItem(STORAGE_KEYS.PROFILE);
  localStorage.removeItem(STORAGE_KEYS.EDUCATIONS);
  localStorage.removeItem(STORAGE_KEYS.EXPERIENCES);
  localStorage.removeItem(STORAGE_KEYS.SKILLS);
  localStorage.removeItem(STORAGE_KEYS.PROJECTS);
  localStorage.removeItem(STORAGE_KEYS.SOCIAL_LINKS);
  localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  localStorage.removeItem(STORAGE_KEYS.MESSAGES);
  localStorage.removeItem(STORAGE_KEYS.THEME);
  applyThemeToDocument(defaultTheme);
}

// ==========================================
// ADMIN AUTHENTICATION (PRD Bagian 6.1)
// ==========================================
export const ADMIN_AUTH_KEY = 'portfolio_admin_auth_v1';

export function getAdminAuthStatus() {
  try {
    return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setAdminAuthStatus(isAuthenticated) {
  try {
    if (isAuthenticated) {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
    } else {
      localStorage.removeItem(ADMIN_AUTH_KEY);
    }
  } catch (err) {
    console.error('Error saving admin auth status:', err);
  }
}

