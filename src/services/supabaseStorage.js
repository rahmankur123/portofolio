import { getSupabaseClient, isSupabaseConfigured } from './supabaseClient';

const BUCKET_NAME = 'portfolio-images';

/**
 * Konversi DataURL (Base64) ke Blob untuk di-upload ke Supabase Storage
 */
function dataURLtoBlob(dataurl) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * Upload gambar (Base64 atau File Blob) ke Supabase Storage
 * @param {string|File|Blob} imageInput - Base64 Data URL atau File
 * @param {string} folder - 'avatars' atau 'projects'
 * @returns {Promise<string>} Public URL gambar atau fallback Base64
 */
export async function uploadImageToSupabase(imageInput, folder = 'projects') {
  if (!imageInput) return '';

  // Jika input sudah merupakan URL eksternal (http:// atau https://) bukan data:image, kembalikan langsung
  if (typeof imageInput === 'string' && (imageInput.startsWith('http://') || imageInput.startsWith('https://'))) {
    return imageInput;
  }

  // Jika Supabase belum dikonfigurasi, gunakan data URL langsung
  if (!isSupabaseConfigured()) {
    return imageInput;
  }

  const supabase = getSupabaseClient();
  if (!supabase) return imageInput;

  try {
    let fileBlob;
    let extension = 'jpg';

    if (typeof imageInput === 'string' && imageInput.startsWith('data:image/')) {
      fileBlob = dataURLtoBlob(imageInput);
      const mime = imageInput.substring(11, imageInput.indexOf(';'));
      if (mime === 'png') extension = 'png';
      else if (mime === 'webp') extension = 'webp';
    } else if (imageInput instanceof Blob || imageInput instanceof File) {
      fileBlob = imageInput;
      if (imageInput.name) {
        const parts = imageInput.name.split('.');
        if (parts.length > 1) extension = parts.pop().toLowerCase();
      }
    } else {
      return imageInput;
    }

    const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${extension}`;

    // Upload ke bucket
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, fileBlob, {
        cacheControl: '3600',
        upsert: true,
        contentType: fileBlob.type || 'image/jpeg'
      });

    if (error) {
      console.warn('Gagal upload ke Supabase Storage (menggunakan Base64 fallback):', error.message);
      return typeof imageInput === 'string' ? imageInput : URL.createObjectURL(fileBlob);
    }

    // Dapatkan URL publik
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    return publicUrlData?.publicUrl || imageInput;
  } catch (err) {
    console.warn('Error upload image ke Supabase:', err);
    return imageInput;
  }
}
