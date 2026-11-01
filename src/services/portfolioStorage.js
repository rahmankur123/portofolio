// Service layer untuk data portofolio
// Terintegrasi penuh dengan Supabase Database & Storage dengan offline/localStorage fallback
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

import {
  getSupabaseClient,
  isSupabaseConfigured,
  getSupabaseCredentials,
  saveCustomSupabaseCredentials,
  syncCredentialsFromServer,
  testSupabaseConnection
} from './supabaseClient';

import { uploadImageToSupabase } from './supabaseStorage';

export {
  isSupabaseConfigured,
  getSupabaseCredentials,
  saveCustomSupabaseCredentials,
  syncCredentialsFromServer,
  testSupabaseConnection,
  uploadImageToSupabase
};

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
  presetName: 'Forest Green (Default)'
};

export const THEME_PRESETS = [
  {
    name: 'Forest Green (Default)',
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

// Helper membaca dari storage lokal
export function getFromStorage(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    return item !== null ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Gagal membaca dari localStorage [${key}]:`, error);
    return defaultValue;
  }
}

// Helper menyimpan ke storage lokal
export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Gagal menyimpan ke localStorage [${key}]:`, error);
  }
}

// Helper menerapkan warna tema ke CSS Variables
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
// 1. PUBLIC PROFILE
// ==========================================

export async function fetchPublicProfile() {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        saveToStorage(STORAGE_KEYS.PROFILE, data);
        return data;
      }
    } catch (err) {
      console.warn('Gagal fetch profile dari Supabase, menggunakan cache:', err);
    }
  }
  const cached = getFromStorage(STORAGE_KEYS.PROFILE, null);
  return cached !== null ? cached : initialProfile;
}

export async function saveProfile(newProfile) {
  saveToStorage(STORAGE_KEYS.PROFILE, newProfile);

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    try {
      let finalProfileImage = newProfile.profile_image || '';
      if (finalProfileImage.startsWith('data:image/')) {
        finalProfileImage = await uploadImageToSupabase(finalProfileImage, 'avatars');
      }

      const profileToSave = {
        id: 1,
        full_name: newProfile.full_name || '',
        headline: newProfile.headline || '',
        short_bio: newProfile.short_bio || '',
        about_content: newProfile.about_content || '',
        profile_image: finalProfileImage,
        cv_url: newProfile.cv_url || '#download-cv',
        public_email: newProfile.public_email || '',
        location: newProfile.location || '',
        availability: newProfile.availability || '',
        response_time: newProfile.response_time || '',
        github_username: newProfile.github_username || '',
        linkedin_username: newProfile.linkedin_username || '',
        experience_years: newProfile.experience_years || '',
        completed_projects_count: Number(newProfile.completed_projects_count) || 0,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('profiles')
        .upsert(profileToSave, { onConflict: 'id' })
        .select()
        .single();

      if (!error && data) {
        const merged = { ...newProfile, ...data };
        saveToStorage(STORAGE_KEYS.PROFILE, merged);
        return merged;
      }
      if (error) {
        console.error('Error menyimpan profile ke Supabase:', error);
      }
    } catch (err) {
      console.error('Error menyimpan profile ke Supabase:', err);
    }
  }
  return newProfile;
}

// ==========================================
// 2. EDUCATIONS
// ==========================================

export async function fetchPublicEducations() {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    try {
      const { data, error } = await supabase
        .from('educations')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!error && Array.isArray(data)) {
        saveToStorage(STORAGE_KEYS.EDUCATIONS, data);
        return data.filter((item) => item.is_visible);
      }
    } catch (err) {
      console.warn('Gagal fetch educations dari Supabase:', err);
    }
  }
  const cached = getFromStorage(STORAGE_KEYS.EDUCATIONS, null);
  const arr = cached !== null && Array.isArray(cached) ? cached : initialEducations;
  return arr
    .filter((item) => item.is_visible)
    .sort((a, b) => a.sort_order - b.sort_order);
}

export async function saveEducations(list) {
  saveToStorage(STORAGE_KEYS.EDUCATIONS, list);

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    try {
      await supabase.from('educations').delete().neq('id', 0);
      if (Array.isArray(list) && list.length > 0) {
        const payload = list.map((item, idx) => ({
          institution: item.institution || '',
          degree: item.degree || '',
          field_of_study: item.field_of_study || '',
          start_date: item.start_date || item.start_year || '',
          end_date: item.end_date || item.end_year || '',
          is_current: Boolean(item.is_current),
          description: item.description || '',
          achievements: Array.isArray(item.achievements) ? item.achievements : [],
          logo_icon: item.logo_icon || 'GraduationCap',
          sort_order: item.sort_order || idx + 1,
          is_visible: item.is_visible !== false
        }));
        await supabase.from('educations').insert(payload);
      }
    } catch (err) {
      console.error('Error menyimpan educations ke Supabase:', err);
    }
  }
  return list;
}

// ==========================================
// 3. EXPERIENCES
// ==========================================

export async function fetchPublicExperiences() {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!error && Array.isArray(data)) {
        saveToStorage(STORAGE_KEYS.EXPERIENCES, data);
        return data.filter((item) => item.is_visible);
      }
    } catch (err) {
      console.warn('Gagal fetch experiences dari Supabase:', err);
    }
  }
  const cached = getFromStorage(STORAGE_KEYS.EXPERIENCES, null);
  const arr = cached !== null && Array.isArray(cached) ? cached : initialExperiences;
  return arr
    .filter((item) => item.is_visible)
    .sort((a, b) => a.sort_order - b.sort_order);
}

export async function saveExperiences(list) {
  saveToStorage(STORAGE_KEYS.EXPERIENCES, list);

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    try {
      await supabase.from('experiences').delete().neq('id', 0);
      if (Array.isArray(list) && list.length > 0) {
        const payload = list.map((item, idx) => ({
          organization: item.organization || '',
          position: item.position || item.role_title || '',
          experience_type: item.experience_type || 'Kerja',
          start_date: item.start_date || '',
          end_date: item.end_date || '',
          is_current: Boolean(item.is_current),
          description: item.description || '',
          achievements: Array.isArray(item.achievements) ? item.achievements : [],
          technologies: Array.isArray(item.technologies) ? item.technologies : [],
          sort_order: item.sort_order || idx + 1,
          is_visible: item.is_visible !== false
        }));
        await supabase.from('experiences').insert(payload);
      }
    } catch (err) {
      console.error('Error menyimpan experiences ke Supabase:', err);
    }
  }
  return list;
}

// ==========================================
// 4. SKILL CATEGORIES
// ==========================================

export async function fetchPublicSkillCategories() {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    try {
      const { data, error } = await supabase
        .from('skill_categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!error && Array.isArray(data)) {
        saveToStorage(STORAGE_KEYS.SKILLS, data);
        return data
          .filter((cat) => cat.is_visible)
          .map((cat) => ({
            ...cat,
            skills: (cat.skills || [])
              .filter((s) => s.is_visible !== false)
              .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
          }));
      }
    } catch (err) {
      console.warn('Gagal fetch skill categories dari Supabase:', err);
    }
  }
  const cached = getFromStorage(STORAGE_KEYS.SKILLS, null);
  const arr = cached !== null && Array.isArray(cached) ? cached : initialSkillCategories;
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

export async function saveSkillCategories(list) {
  saveToStorage(STORAGE_KEYS.SKILLS, list);

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    try {
      await supabase.from('skill_categories').delete().neq('id', 0);
      if (Array.isArray(list) && list.length > 0) {
        const payload = list.map((cat, idx) => ({
          name: cat.name || '',
          description: cat.description || '',
          sort_order: cat.sort_order || idx + 1,
          is_visible: cat.is_visible !== false,
          skills: Array.isArray(cat.skills) ? cat.skills : []
        }));
        await supabase.from('skill_categories').insert(payload);
      }
    } catch (err) {
      console.error('Error menyimpan skill categories ke Supabase:', err);
    }
  }
  return list;
}

// ==========================================
// 5. PROJECTS & DOCUMENTATION GALLERY
// ==========================================

export function normalizeProject(proj) {
  if (!proj) return proj;
  return {
    ...proj,
    short_description: proj.short_description || proj.summary || '',
    summary: proj.summary || proj.short_description || '',
    technologies: Array.isArray(proj.technologies) ? proj.technologies : [],
    category: proj.category || proj.project_category || 'Full-Stack Web App',
    project_category: proj.project_category || proj.category || 'Full-Stack Web App',
    github_url: proj.github_url || proj.repository_url || '',
    repository_url: proj.repository_url || proj.github_url || ''
  };
}

export async function fetchPublicProjects() {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('publication_status', 'PUBLISHED')
        .order('sort_order', { ascending: true });

      if (!error && Array.isArray(data)) {
        const normalized = data.map(normalizeProject);
        saveToStorage(STORAGE_KEYS.PROJECTS, normalized);
        return normalized;
      }
    } catch (err) {
      console.warn('Gagal fetch public projects dari Supabase:', err);
    }
  }
  const cached = getFromStorage(STORAGE_KEYS.PROJECTS, null);
  if (cached !== null && Array.isArray(cached)) {
    return cached
      .map(normalizeProject)
      .filter((proj) => proj.publication_status === 'PUBLISHED')
      .sort((a, b) => a.sort_order - b.sort_order);
  }
  return initialProjects
    .map(normalizeProject)
    .filter((proj) => proj.publication_status === 'PUBLISHED')
    .sort((a, b) => a.sort_order - b.sort_order);
}

export async function fetchAdminProjects() {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!error && Array.isArray(data)) {
        const normalized = data.map(normalizeProject);
        saveToStorage(STORAGE_KEYS.PROJECTS, normalized);
        return normalized;
      }
    } catch (err) {
      console.warn('Gagal fetch admin projects dari Supabase:', err);
    }
  }
  const cached = getFromStorage(STORAGE_KEYS.PROJECTS, null);
  return cached !== null && Array.isArray(cached)
    ? cached.map(normalizeProject)
    : initialProjects.map(normalizeProject);
}

export async function fetchPublicProjectBySlug(slug) {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .eq('publication_status', 'PUBLISHED')
        .limit(1)
        .maybeSingle();

      if (!error && data) return data;
    } catch (err) {
      console.warn('Gagal fetch project by slug dari Supabase:', err);
    }
  }
  const list = await fetchPublicProjects();
  return list.find((p) => p.slug === slug) || null;
}

export async function saveProjects(list) {
  saveToStorage(STORAGE_KEYS.PROJECTS, list);

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    try {
      const processedList = await Promise.all(
        list.map(async (proj, idx) => {
          let coverImg = proj.cover_image || '';
          if (coverImg.startsWith('data:image/')) {
            coverImg = await uploadImageToSupabase(coverImg, 'projects');
          }

          let imagesArray = Array.isArray(proj.images) ? [...proj.images] : [];
          imagesArray = await Promise.all(
            imagesArray.map(async (img) => {
              if (img.image_url && img.image_url.startsWith('data:image/')) {
                const uploaded = await uploadImageToSupabase(img.image_url, 'projects');
                return { ...img, image_url: uploaded };
              }
              return img;
            })
          );

          return {
            title: proj.title || 'Proyek Tanpa Judul',
            slug: proj.slug || `project-${Date.now()}-${idx}`,
            project_category: proj.project_category || 'Full-Stack Web',
            summary: proj.summary || '',
            description: proj.description || '',
            cover_image: coverImg,
            images: imagesArray,
            technologies: Array.isArray(proj.technologies) ? proj.technologies : [],
            live_url: proj.live_url || '',
            repository_url: proj.repository_url || '',
            demo_status: proj.demo_status || 'PUBLIC',
            publication_status: proj.publication_status || 'PUBLISHED',
            sort_order: proj.sort_order || idx + 1,
            featured: Boolean(proj.featured),
            published_at: proj.published_at || new Date().toISOString().split('T')[0],
            updated_at: new Date().toISOString()
          };
        })
      );

      await supabase.from('projects').delete().neq('id', 0);
      if (processedList.length > 0) {
        const { data, error } = await supabase.from('projects').insert(processedList).select();
        if (!error && data) {
          saveToStorage(STORAGE_KEYS.PROJECTS, data);
          return data;
        }
      } else {
        saveToStorage(STORAGE_KEYS.PROJECTS, []);
        return [];
      }
    } catch (err) {
      console.error('Error menyimpan projects ke Supabase:', err);
    }
  }
  return list;
}

export async function toggleProjectPublicationStatus(id) {
  const list = await fetchAdminProjects();
  const target = list.find((item) => item.id === id);
  if (!target) return list;

  const nextStatus = target.publication_status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
  const updatedList = list.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        publication_status: nextStatus,
        published_at: nextStatus === 'PUBLISHED' ? new Date().toISOString().split('T')[0] : null
      };
    }
    return item;
  });

  saveToStorage(STORAGE_KEYS.PROJECTS, updatedList);

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    try {
      await supabase
        .from('projects')
        .update({
          publication_status: nextStatus,
          published_at: nextStatus === 'PUBLISHED' ? new Date().toISOString().split('T')[0] : null,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
    } catch (err) {
      console.error('Gagal toggle project status di Supabase:', err);
    }
  }
  return updatedList;
}

export async function updateProjectDemoStatus(id, demo_status, live_url) {
  const list = await fetchAdminProjects();
  const updatedList = list.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        demo_status,
        live_url: live_url !== undefined ? live_url : item.live_url
      };
    }
    return item;
  });

  saveToStorage(STORAGE_KEYS.PROJECTS, updatedList);

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    try {
      await supabase
        .from('projects')
        .update({
          demo_status,
          live_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
    } catch (err) {
      console.error('Gagal update demo status di Supabase:', err);
    }
  }
  return updatedList;
}

// ==========================================
// 6. SITE SETTINGS & SOCIAL LINKS
// ==========================================

export async function fetchPublicSiteSettings() {
  const cached = getFromStorage(STORAGE_KEYS.SETTINGS, null);
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        const merged = { ...(cached || initialSiteSettings), ...data };
        saveToStorage(STORAGE_KEYS.SETTINGS, merged);
        return merged;
      }
    } catch (err) {
      console.warn('Gagal fetch site_settings dari Supabase:', err);
    }
  }
  return cached !== null ? cached : initialSiteSettings;
}

export async function saveSiteSettings(settings) {
  saveToStorage(STORAGE_KEYS.SETTINGS, settings);

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    try {
      const payload = {
        id: 1,
        site_title: settings.site_title || '',
        tagline: settings.tagline || settings.hero_subheadline || '',
        meta_description: settings.meta_description || '',
        favicon_url: settings.favicon_url || '',
        contact_email: settings.contact_email || '',
        is_maintenance_mode: Boolean(settings.is_maintenance_mode),
        updated_at: new Date().toISOString()
      };
      const { data, error } = await supabase
        .from('site_settings')
        .upsert(payload, { onConflict: 'id' })
        .select()
        .single();

      if (error) {
        console.error('Error save site_settings ke Supabase:', error);
      } else if (data) {
        const merged = { ...settings, ...data };
        saveToStorage(STORAGE_KEYS.SETTINGS, merged);
        return merged;
      }
    } catch (err) {
      console.error('Error save site_settings ke Supabase:', err);
    }
  }
  return settings;
}

export async function fetchPublicSocialLinks() {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    try {
      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!error && Array.isArray(data)) {
        saveToStorage(STORAGE_KEYS.SOCIAL_LINKS, data);
        return data.filter((item) => item.is_visible);
      }
    } catch (err) {
      console.warn('Gagal fetch social_links dari Supabase:', err);
    }
  }
  const cached = getFromStorage(STORAGE_KEYS.SOCIAL_LINKS, null);
  const arr = cached !== null && Array.isArray(cached) ? cached : initialSocialLinks;
  return arr
    .filter((item) => item.is_visible)
    .sort((a, b) => a.sort_order - b.sort_order);
}

export async function saveSocialLinks(links) {
  saveToStorage(STORAGE_KEYS.SOCIAL_LINKS, links);

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    try {
      await supabase.from('social_links').delete().neq('id', 0);
      if (Array.isArray(links) && links.length > 0) {
        const payload = links.map((l, idx) => ({
          platform: l.platform || '',
          url: l.url || '',
          icon_name: l.icon_name || 'Globe',
          sort_order: l.sort_order || idx + 1,
          is_visible: l.is_visible !== false
        }));
        await supabase.from('social_links').insert(payload);
      }
    } catch (err) {
      console.error('Error save social_links ke Supabase:', err);
    }
  }
  return links;
}

// ==========================================
// 7. THEME SETTINGS
// ==========================================

export async function fetchThemeSettings() {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    try {
      const { data, error } = await supabase
        .from('theme_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        const mappedTheme = {
          primaryColor: data.primary_color || defaultTheme.primaryColor,
          primaryHover: data.primary_hover || defaultTheme.primaryHover,
          primaryPale: data.primary_pale || defaultTheme.primaryPale,
          primaryLight: data.primary_light || defaultTheme.primaryLight,
          primaryBorder: data.primary_border || defaultTheme.primaryBorder,
          bgMain: data.bg_main || defaultTheme.bgMain,
          presetName: data.preset_name || defaultTheme.presetName
        };
        saveToStorage(STORAGE_KEYS.THEME, mappedTheme);
        return mappedTheme;
      }
    } catch (err) {
      console.warn('Gagal fetch theme dari Supabase:', err);
    }
  }
  const cached = getFromStorage(STORAGE_KEYS.THEME, null);
  return cached !== null ? cached : defaultTheme;
}

export async function saveThemeSettings(theme) {
  saveToStorage(STORAGE_KEYS.THEME, theme);
  applyThemeToDocument(theme);

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    try {
      await supabase
        .from('theme_settings')
        .upsert(
          {
            id: 1,
            primary_color: theme.primaryColor,
            primary_hover: theme.primaryHover,
            primary_pale: theme.primaryPale,
            primary_light: theme.primaryLight,
            primary_border: theme.primaryBorder,
            bg_main: theme.bgMain,
            preset_name: theme.presetName,
            updated_at: new Date().toISOString()
          },
          { onConflict: 'id' }
        );
    } catch (err) {
      console.error('Error save theme ke Supabase:', err);
    }
  }
  return theme;
}

// ==========================================
// 8. CONTACT FORM & ADMIN MESSAGES
// ==========================================

export async function submitContactMessage({ sender_name, sender_email, subject, message }) {
  if (!sender_name?.trim()) throw new Error('Nama pengirim wajib diisi.');
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

  saveToStorage(STORAGE_KEYS.MESSAGES, [newMessage, ...existingMessages]);

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    try {
      const { error } = await supabase.from('contact_messages').insert({
        sender_name: newMessage.sender_name,
        sender_email: newMessage.sender_email,
        subject: newMessage.subject,
        message: newMessage.message,
        status: 'NEW'
      });
      if (error) {
        console.warn('Gagal menyimpan pesan ke Supabase contact_messages:', error.message);
      }
    } catch (err) {
      console.error('Error submit message ke Supabase:', err);
    }
  }

  return { success: true, message: 'Pesan Anda berhasil terkirim dan disimpan!', data: newMessage };
}

export async function fetchAdminMessages() {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data)) {
        saveToStorage(STORAGE_KEYS.MESSAGES, data);
        return data;
      }
    } catch (err) {
      console.warn('Gagal fetch contact messages dari Supabase:', err);
    }
  }
  const cached = getFromStorage(STORAGE_KEYS.MESSAGES, null);
  return cached !== null && Array.isArray(cached) ? cached : initialContactMessages;
}

export async function updateAdminMessageStatus(id, newStatus) {
  const list = await fetchAdminMessages();
  const updated = list.map((msg) => (msg.id === id ? { ...msg, status: newStatus } : msg));
  saveToStorage(STORAGE_KEYS.MESSAGES, updated);

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    try {
      await supabase.from('contact_messages').update({ status: newStatus }).eq('id', id);
    } catch (err) {
      console.error('Gagal update message status di Supabase:', err);
    }
  }
  return updated;
}

export async function deleteAdminMessage(id) {
  const list = await fetchAdminMessages();
  const updated = list.filter((msg) => msg.id !== id);
  saveToStorage(STORAGE_KEYS.MESSAGES, updated);

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    try {
      await supabase.from('contact_messages').delete().eq('id', id);
    } catch (err) {
      console.error('Gagal delete message di Supabase:', err);
    }
  }
  return updated;
}

// ==========================================
// 9. ONE-CLICK DATA SEEDING KE SUPABASE
// ==========================================
export async function seedAllDataToSupabase() {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase belum terhubung. Konfigurasikan URL dan Anon Key terlebih dahulu.');
  }

  const supabase = getSupabaseClient();

  // 1. Profil
  await supabase.from('profiles').upsert({ ...initialProfile, id: 1 }, { onConflict: 'id' });

  // 2. Educations
  await supabase.from('educations').delete().neq('id', 0);
  await supabase.from('educations').insert(
    initialEducations.map((e, idx) => ({
      institution: e.institution,
      degree: e.degree,
      field_of_study: e.field_of_study,
      start_date: e.start_date,
      end_date: e.end_date,
      is_current: Boolean(e.is_current),
      description: e.description,
      achievements: e.achievements || [],
      logo_icon: e.logo_icon || 'GraduationCap',
      sort_order: idx + 1,
      is_visible: e.is_visible !== false
    }))
  );

  // 3. Experiences
  await supabase.from('experiences').delete().neq('id', 0);
  await supabase.from('experiences').insert(
    initialExperiences.map((e, idx) => ({
      organization: e.organization,
      position: e.position,
      experience_type: e.experience_type || 'Kerja',
      start_date: e.start_date,
      end_date: e.end_date,
      is_current: Boolean(e.is_current),
      description: e.description,
      achievements: e.achievements || [],
      technologies: e.technologies || [],
      sort_order: idx + 1,
      is_visible: e.is_visible !== false
    }))
  );

  // 4. Skills
  await supabase.from('skill_categories').delete().neq('id', 0);
  await supabase.from('skill_categories').insert(
    initialSkillCategories.map((c, idx) => ({
      name: c.name,
      description: c.description,
      sort_order: idx + 1,
      is_visible: c.is_visible !== false,
      skills: c.skills || []
    }))
  );

  // 5. Projects
  await supabase.from('projects').delete().neq('id', 0);
  await supabase.from('projects').insert(
    initialProjects.map((p, idx) => ({
      title: p.title,
      slug: p.slug,
      project_category: p.project_category || 'Full-Stack Web',
      summary: p.summary,
      description: p.description,
      cover_image: p.cover_image,
      images: p.images || [],
      technologies: p.technologies || [],
      live_url: p.live_url || '',
      repository_url: p.repository_url || '',
      demo_status: p.demo_status || 'PUBLIC',
      publication_status: p.publication_status || 'PUBLISHED',
      sort_order: idx + 1,
      featured: Boolean(p.featured),
      published_at: p.published_at || '2025-01-15'
    }))
  );

  // 6. Settings
  await supabase.from('site_settings').upsert({ ...initialSiteSettings, id: 1 }, { onConflict: 'id' });

  // 7. Socials
  await supabase.from('social_links').delete().neq('id', 0);
  await supabase.from('social_links').insert(
    initialSocialLinks.map((s, idx) => ({
      platform: s.platform,
      url: s.url,
      icon_name: s.icon_name || 'Globe',
      sort_order: idx + 1,
      is_visible: s.is_visible !== false
    }))
  );

  // 8. Theme
  await supabase.from('theme_settings').upsert(
    {
      id: 1,
      primary_color: defaultTheme.primaryColor,
      primary_hover: defaultTheme.primaryHover,
      primary_pale: defaultTheme.primaryPale,
      primary_light: defaultTheme.primaryLight,
      primary_border: defaultTheme.primaryBorder,
      bg_main: defaultTheme.bgMain,
      preset_name: defaultTheme.presetName
    },
    { onConflict: 'id' }
  );

  return { success: true, message: 'Seluruh data portofolio berhasil disinkronkan ke Supabase!' };
}

// Reset data
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

// Auth Admin
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
