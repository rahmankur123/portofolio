import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL_KEY = 'portfolio_supabase_url_v1';
const SUPABASE_ANON_KEY_KEY = 'portfolio_supabase_anon_key_v1';

export function getSupabaseCredentials() {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  let localUrl = '';
  let localKey = '';
  try {
    localUrl = localStorage.getItem(SUPABASE_URL_KEY) || '';
    localKey = localStorage.getItem(SUPABASE_ANON_KEY_KEY) || '';
  } catch {
    // ignore
  }

  const url = (envUrl && envUrl !== 'YOUR_SUPABASE_URL' && envUrl !== 'https://your-project.supabase.co' ? envUrl : '') || localUrl;
  const anonKey = (envKey && envKey !== 'YOUR_SUPABASE_ANON_KEY' ? envKey : '') || localKey;

  return { url: url.trim(), anonKey: anonKey.trim() };
}

export async function syncCredentialsFromServer() {
  try {
    const res = await fetch('/api/supabase-env');
    if (res.ok) {
      const data = await res.json();
      if (data?.url && data?.anonKey && data.url.trim() && data.anonKey.trim()) {
        try {
          localStorage.setItem(SUPABASE_URL_KEY, data.url.trim());
          localStorage.setItem(SUPABASE_ANON_KEY_KEY, data.anonKey.trim());
        } catch {
          // ignore
        }
        return { url: data.url.trim(), anonKey: data.anonKey.trim() };
      } else {
        // Server .env kosong. Cek apakah perangkat ini (misal laptop) punya kredensial di localStorage
        let localUrl = '';
        let localKey = '';
        try {
          localUrl = localStorage.getItem(SUPABASE_URL_KEY) || '';
          localKey = localStorage.getItem(SUPABASE_ANON_KEY_KEY) || '';
        } catch {
          // ignore
        }

        if (
          localUrl &&
          localKey &&
          localUrl.startsWith('https://') &&
          localUrl.includes('.supabase.co') &&
          localKey.length > 20
        ) {
          // Otomatis dorong kredensial dari laptop ke server .env agar HP & perangkat lain langsung terhubung!
          try {
            await fetch('/api/supabase-env', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ url: localUrl.trim(), anonKey: localKey.trim() })
            });
          } catch {
            // ignore
          }
          return { url: localUrl.trim(), anonKey: localKey.trim() };
        }
      }
    }
  } catch (err) {
    console.warn('Gagal sync credentials dari server:', err);
  }
  return getSupabaseCredentials();
}

export function saveCustomSupabaseCredentials(url, anonKey) {
  try {
    if (url && anonKey) {
      localStorage.setItem(SUPABASE_URL_KEY, url.trim());
      localStorage.setItem(SUPABASE_ANON_KEY_KEY, anonKey.trim());
    } else {
      localStorage.removeItem(SUPABASE_URL_KEY);
      localStorage.removeItem(SUPABASE_ANON_KEY_KEY);
    }
  } catch (err) {
    console.warn('Gagal menyimpan kredensial Supabase ke storage:', err);
  }

  // Juga sinkronkan ke server .env agar perangkat lain (seperti HP) otomatis terhubung!
  try {
    fetch('/api/supabase-env', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url ? url.trim() : '', anonKey: anonKey ? anonKey.trim() : '' })
    }).catch(() => {});
  } catch {
    // ignore
  }
}

export function isSupabaseConfigured() {
  const { url, anonKey } = getSupabaseCredentials();
  return Boolean(
    url &&
    anonKey &&
    url.startsWith('https://') &&
    url.includes('.supabase.co') &&
    anonKey.length > 20
  );
}

// Client singleton
let supabaseInstance = null;
let currentUrl = '';
let currentKey = '';

export function getSupabaseClient() {
  const { url, anonKey } = getSupabaseCredentials();

  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!supabaseInstance || currentUrl !== url || currentKey !== anonKey) {
    supabaseInstance = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });
    currentUrl = url;
    currentKey = anonKey;
  }

  return supabaseInstance;
}

// Test koneksi ke Supabase
export async function testSupabaseConnection(overrideUrl, overrideKey) {
  try {
    const url = overrideUrl || getSupabaseCredentials().url;
    const anonKey = overrideKey || getSupabaseCredentials().anonKey;

    if (!url || !anonKey) {
      return { success: false, message: 'URL Supabase atau Anon Key belum diisi.' };
    }

    const testClient = createClient(url, anonKey);
    const { error } = await testClient.from('profiles').select('id').limit(1);

    if (error) {
      if (error.code === '42P01') {
        return {
          success: true,
          tableMissing: true,
          message: 'Berhasil terhubung ke Supabase! Namun tabel database belum dibuat. Silakan jalankan script SQL schema di Supabase SQL Editor.'
        };
      }
      return { success: false, message: `Error Supabase: ${error.message} (Code: ${error.code})` };
    }

    return {
      success: true,
      tableMissing: false,
      message: 'Koneksi ke Supabase sukses dan tabel database terdeteksi normal!'
    };
  } catch (err) {
    return {
      success: false,
      message: `Gagal menghubungkan ke Supabase: ${err.message || 'Cek URL dan Anon Key Anda'}`
    };
  }
}
