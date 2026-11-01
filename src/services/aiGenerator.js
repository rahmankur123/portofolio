// Service untuk Generator Teks AI Otomatis Portofolio & CMS
// Mendukung intelligent generative synthesis offline/built-in dan opsi Cloud Gemini API

const GEMINI_API_KEY_STORAGE = 'portfolio_gemini_api_key_v1';

export function getGeminiApiKey() {
  try {
    return localStorage.getItem(GEMINI_API_KEY_STORAGE) || import.meta.env.VITE_GEMINI_API_KEY || '';
  } catch {
    return '';
  }
}

export function saveGeminiApiKey(key) {
  try {
    if (key?.trim()) {
      localStorage.setItem(GEMINI_API_KEY_STORAGE, key.trim());
    } else {
      localStorage.removeItem(GEMINI_API_KEY_STORAGE);
    }
  } catch {
    // ignore
  }
}

// ============================================================================
// TEMPLATE & LOGIKA SINTESIS TEKS CERDAS (BUILT-IN / ZERO API KEY REQUIRED)
// Menghasilkan kalimat profesional dalam Bahasa Indonesia yang siap di-custom
// ============================================================================

export function generateBuiltInText({ fieldType, context = {}, tone = 'profesional', customPrompt = '' }) {
  const promptLower = (customPrompt || '').toLowerCase();

  switch (fieldType) {
    // -------------------------------------------------------------
    // 1. PROYEK: RINGKASAN SINGKAT (SUMMARY / SHORT DESCRIPTION)
    // -------------------------------------------------------------
    case 'project_summary': {
      const title = context.title?.trim() || 'Aplikasi Web Modern';
      const cat = context.category || 'Web Application';
      const techStr = Array.isArray(context.technologies) && context.technologies.length > 0
        ? `menggunakan ${context.technologies.slice(0, 3).join(', ')}`
        : 'berbasis arsitektur full-stack modern';

      if (promptLower.includes('kasir') || promptLower.includes('pos') || title.toLowerCase().includes('kasir') || title.toLowerCase().includes('pos')) {
        const variants = [
          `Sistem Point of Sale (POS) dan manajemen transaksi kasir yang dirancang untuk mempercepat pencatatan penjualan, pemantauan inventaris stok secara real-time, dan pelaporan keuangan harian otomatis ${techStr}.`,
          `Aplikasi kasir cerdas yang mengoptimalkan alur transaksi ritel dengan antarmuka kasir cepat, integrasi cetak struk digital, dan rekapitulasi laba-rugi terintegrasi ${techStr}.`,
          `Solusi digitalisasi kasir dan inventaris toko terpadu yang memangkas waktu checkout hingga 40% dan mengeliminasi selisih stok opname melalui pencatatan transaksi terpusat.`
        ];
        return variants[Math.floor(Math.random() * variants.length)];
      }

      if (promptLower.includes('toko') || promptLower.includes('shop') || promptLower.includes('commerce') || title.toLowerCase().includes('shop') || title.toLowerCase().includes('commerce')) {
        const variants = [
          `Platform e-commerce responsif dengan katalog produk dinamis, keranjang belanja interaktif, kalkulasi ongkos kirim otomatis, serta integrasi gateway pembayaran aman ${techStr}.`,
          `Website toko online modern yang dirancang untuk memaksimalkan konversi belanja melalui pencarian produk instan, ulasan pembeli, dan manajemen pesanan multi-status ${techStr}.`,
          `Aplikasi e-commerce yang menghadirkan pengalaman belanja mulus bagi pelanggan dan dashboard analitik komprehensif bagi pemilik usaha dalam mengelola stok serta promosi.`
        ];
        return variants[Math.floor(Math.random() * variants.length)];
      }

      if (promptLower.includes('surat') || promptLower.includes('desa') || promptLower.includes('administrasi') || promptLower.includes('kantor')) {
        const variants = [
          `Sistem informasi tata kelola administrasi dan pengarsipan surat digital terpadu yang memangkas birokrasi manual serta mempermudah tracking disposisi surat secara real-time ${techStr}.`,
          `Aplikasi layanan mandiri administrasi desa/kantor yang memudahkan verifikasi berkas kependudukan, pembuatan surat keterangan otomatis, dan visualisasi data kependudukan dinamis.`
        ];
        return variants[Math.floor(Math.random() * variants.length)];
      }

      if (promptLower.includes('kampus') || promptLower.includes('akademik') || promptLower.includes('mahasiswa') || promptLower.includes('sekolah')) {
        const variants = [
          `Sistem informasi akademik terpadu yang memfasilitasi pengisian KRS, pemantauan kurikulum, penjadwalan kuliah, serta penilaian transparan mahasiswa ${techStr}.`,
          `Portal manajemen kegiatan belajar dan administrasi kampus yang menghubungkan mahasiswa, dosen, dan staf pengelola secara terpusat dengan kontrol hak akses berbasis peran.`
        ];
        return variants[Math.floor(Math.random() * variants.length)];
      }

      // Default Proyek Summary
      const defaultVariants = [
        `Platform ${cat.toLowerCase()} modern yang dirancang untuk mengotomatisasi alur kerja ${title}, menyederhanakan pengolahan data kompleks, dan menghadirkan antarmuka pengguna yang intuitif ${techStr}.`,
        `Solusi perangkat lunak berbasis web untuk ${title} yang mengedepankan performa tinggi, keamanan autentikasi pengguna, dan visualisasi data interaktif bagi pemangku kepentingan.`,
        `Aplikasi web terintegrasi yang mentransformasi pencatatan konvensional ${title} menjadi sistem digital real-time dengan efisiensi operasional dan akurasi data terjamin.`
      ];
      return defaultVariants[Math.floor(Math.random() * defaultVariants.length)];
    }

    // -------------------------------------------------------------
    // 2. PROYEK: DESKRIPSI LENGKAP / STUDI KASUS (DESCRIPTION)
    // -------------------------------------------------------------
    case 'project_description': {
      const title = context.title?.trim() || 'Aplikasi Web';
      const cat = context.category || 'Full-Stack Web';
      const techList = Array.isArray(context.technologies) && context.technologies.length > 0
        ? context.technologies.join(', ')
        : 'React, Node.js, Express, dan PostgreSQL/Supabase';

      return `### 1. Latar Belakang & Permasalahan
Sebelum pengembangan proyek **${title}**, proses operasional masih mengandalkan pencatatan manual dan sistem terfragmentasi yang rentan terhadap kehilangan data, selisih perhitungan, serta waktu tunggu pengguna yang relatif lama. Kebutuhan akan platform digital terpusat yang dapat diakses kapan saja dan dari perangkat apa pun menjadi urgensi utama.

### 2. Pendekatan Solusi & Arsitektur
Proyek ini dikembangkan dengan arsitektur modern berprinsip pemisahan tanggung jawab (Clean Architecture). Sisi front-end dibangun responsif dengan antarmuka adaptif, sementara back-end menyediakan RESTful API berkecepatan tinggi dengan validasi skema ketat serta pengamanan autentikasi berbasis sesi/token JWT.

**Tumpukan Teknologi yang Diimplementasikan:**
- **Antarmuka (Frontend):** Antarmuka responsif ramah seluler & desktop dengan penataan komponen modular.
- **Logika & Database:** ${techList} untuk penyimpanan data relasional dan sinkronisasi data real-time.
- **Keamanan:** Autentikasi terenkripsi, sanitasi input, dan kontrol hak akses pengguna (Role-Based Access Control).

### 3. Fitur Unggulan Sistem
- Dashboard analitik interaktif dengan ringkasan metrik statistik utama.
- Manajemen data CRUD lengkap dengan pencarian instan dan filter multi-kriteria.
- Ekspor laporan otomatis (PDF/Excel) untuk kebutuhan dokumentasi dan audit.
- Desain antarmuka fleksibel yang diuji optimal pada layar laptop maupun ponsel pintar (mobile-friendly).

### 4. Hasil & Dampak Implementasi
Implementasi sistem ini berhasil memangkas waktu pemrosesan data hingga 60%, mengeliminasi redundansi pencatatan fisik, serta memberikan transparansi operasional yang signifikan bagi para pengguna akhir.`;
    }

    // -------------------------------------------------------------
    // 3. PROFIL: TENTANG SAYA LENGKAP (ABOUT CONTENT)
    // -------------------------------------------------------------
    case 'profile_about': {
      const name = context.full_name || 'Alifian Ramadhan';
      const headline = context.headline || 'Web Developer & UI Designer';

      return `Saya adalah seorang pengembang web yang memiliki antusiasme mendalam dalam mentransformasi tantangan bisnis dan ide kreatif menjadi aplikasi digital yang andal, cepat, serta mudah digunakan.

Dengan latar belakang akademik di bidang Manajemen Informatika dan pengalaman mengerjakan berbagai proyek rekayasa perangkat lunak dari hulu ke hilir, saya memiliki fondasi kuat dalam pemodelan basis data relasional, perancangan arsitektur RESTful API, hingga perakitan antarmuka modern yang interaktif dan responsif di berbagai perangkat.

Prinsip kerja saya berakar pada penerapan kode yang bersih (clean & maintainable code), dokumentasi teknis yang rapi, serta empati mendalam terhadap kenyamanan interaksi pengguna akhir (user-centric experience). Di luar urusan koding, saya gemar mengeksplorasi tren teknologi komputasi awan terbaru, berkontribusi dalam tim kolaboratif, dan senantiasa terbuka untuk peluang magang maupun proyek profesional yang menantang.`;
    }

    // -------------------------------------------------------------
    // 4. PROFIL: BIO SINGKAT (SHORT BIO HERO)
    // -------------------------------------------------------------
    case 'profile_short_bio': {
      const variants = [
        'Mahasiswa tingkat akhir Manajemen Informatika yang berfokus pada rancang bangun aplikasi web modern, performa tinggi, dan antarmuka ramah pengguna.',
        'Junior Full-Stack Web Developer dengan ketertarikan mendalam pada arsitektur API terintegrasi, database relasional, dan desain antarmuka pengguna yang bersih serta intuitif.',
        'Pengembang web antusias yang berdedikasi menciptakan solusi digital efisien, aman, dan responsif dengan kombinasi logika teknis yang kuat serta estetika desain modern.'
      ];
      return variants[Math.floor(Math.random() * variants.length)];
    }

    // -------------------------------------------------------------
    // 5. PROFIL: HEADLINE / GELAR PROFESIONAL
    // -------------------------------------------------------------
    case 'profile_headline': {
      const variants = [
        'Junior Full-Stack Web Developer & UI Designer',
        'Web Developer & Information Management Student',
        'Frontend & Backend Web Developer | UI/UX Enthusiast',
        'Software Engineering Enthusiast & Full-Stack Developer'
      ];
      return variants[Math.floor(Math.random() * variants.length)];
    }

    // -------------------------------------------------------------
    // 6. PENDIDIKAN: DESKRIPSI STUDI
    // -------------------------------------------------------------
    case 'education_description': {
      const institution = context.institution || 'Perguruan Tinggi';
      const degree = context.degree || 'D3 / S1';
      const field = context.field_of_study || 'Manajemen Informatika';

      return `Menempuh jenjang studi ${degree} ${field} di ${institution} dengan fokus pendalaman pada rekayasa perangkat lunak, perancangan basis data relasional, arsitektur web client-server, serta analisis sistem informasi bisnis. Aktif mengembangkan proyek perangkat lunak praktikum dan menyelesaikan tugas akhir bertema sistem informasi terintegrasi.`;
    }

    // -------------------------------------------------------------
    // 7. PENDIDIKAN: PENCAPAIAN / PRESTASI
    // -------------------------------------------------------------
    case 'education_achievements': {
      const variants = [
        'Meraih Indeks Prestasi Kumulatif (IPK) 3.80/4.00 dengan predikat Sangat Memuaskan.',
        'Menyelesaikan Proyek Akhir perancangan sistem informasi berbasis web dengan nilai A.',
        'Aktif sebagai asisten praktikum laboratorium pemrograman web dan basis data.',
        'Finalis kompetisi pengembangan inovasi aplikasi web tingkat universitas/regional.'
      ];
      return variants[Math.floor(Math.random() * variants.length)];
    }

    // -------------------------------------------------------------
    // 8. PENGALAMAN: DESKRIPSI PERAN & TANGGUNG JAWAB
    // -------------------------------------------------------------
    case 'experience_description': {
      const position = context.position || 'Web Developer Intern';
      const org = context.organization || 'Perusahaan / Organisasi';
      const type = context.experience_type || 'Kerja';

      if (type === 'Organisasi' || type === 'Kepanitiaan') {
        return `Bertanggung jawab sebagai ${position} di ${org}. Mengoordinasikan kebutuhan publikasi digital, mengelola alur komunikasi internal tim, serta menginisiasi platform web dokumentasi kegiatan yang diakses oleh ratusan peserta.`;
      }

      return `Bertugas sebagai ${position} di ${org}. Bertanggung jawab dalam merancang antarmuka pengguna interaktif, mengintegrasikan endpoint RESTful API, melakukan optimasi kueri basis data, serta berkolaborasi aktif dalam tim pengembangan dengan metodologi Scrum/Agile untuk memastikan rilis fitur tepat waktu.`;
    }

    // -------------------------------------------------------------
    // 9. PENGALAMAN: PENCAPAIAN / KONTRIBUSI
    // -------------------------------------------------------------
    case 'experience_achievements': {
      const variants = [
        'Mengembangkan dan meluncurkan 3+ modul fitur utama tepat sebelum tenggat waktu rilis produksi.',
        'Meningkatkan kecepatan pemuatan halaman web hingga 35% melalui optimasi aset dan kueri database.',
        'Mengurangi laporan bug pengguna sebesar 25% melalui implementasi pengujian validasi input ketat.',
        'Mendokumentasikan alur API secara komprehensif sehingga mempercepat waktu onboarding tim baru sebesar 40%.'
      ];
      return variants[Math.floor(Math.random() * variants.length)];
    }

    // -------------------------------------------------------------
    // 10. PENGATURAN SITUS: META DESCRIPTION SEO
    // -------------------------------------------------------------
    case 'site_meta_description': {
      const title = context.site_title || 'Alifian Ramadhan';
      return `Portofolio profesional ${title}. Menampilkan biodata profil, riwayat pendidikan Manajemen Informatika, pengalaman kerja, keahlian teknis, dan dokumentasi proyek web modern.`;
    }

    default:
      return 'Deskripsi berkualitas tinggi yang siap Anda sesuaikan dengan capaian dan fakta riil proyek Anda.';
  }
}

// ============================================================================
// CLOUD AI CALLER (GOOGLE GEMINI API) - OPSIONAL
// ============================================================================

export async function generateTextWithGemini({
  fieldType,
  context = {},
  tone = 'profesional',
  customPrompt = '',
  apiKey = ''
}) {
  const activeKey = apiKey?.trim() || getGeminiApiKey();

  // Jika tidak ada API key, gunakan sintesis cerdas built-in yang instan & zero-error
  if (!activeKey) {
    return generateBuiltInText({ fieldType, context, tone, customPrompt });
  }

  const promptMessage = `
Kamu adalah asisten penulisan portofolio profesional untuk seorang pengembang web (Web Developer) lulusan Manajemen Informatika di Indonesia.
Buatkan teks dalam Bahasa Indonesia dengan gaya ${tone} untuk bidang "${fieldType}".

Konteks Data yang Diketahui:
- Judul/Posisi: ${context.title || context.position || context.headline || '-'}
- Kategori/Organisasi: ${context.category || context.organization || context.institution || '-'}
- Teknologi Terkait: ${Array.isArray(context.technologies) ? context.technologies.join(', ') : '-'}
- Instruksi/Topik Tambahan Pengguna: ${customPrompt || 'Buatkan deskripsi yang realistis, menarik, dan terstruktur rapi.'}

Ketentuan:
1. Tuliskan teks secara langsung tanpa basa-basi seperti "Tentu, ini drafnya:".
2. Format teks sesuai kebutuhan (paragraf rapi atau poin markdown bila deskripsi mendalam).
3. Buat teks terasa profesional, autentik, dan mudah disesuaikan dengan data riil pengguna.
`;

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeKey}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: promptMessage }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API HTTP Error: ${response.status}`);
    }

    const result = await response.json();
    const candidateText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (candidateText?.trim()) {
      return candidateText.trim();
    }
    throw new Error('Respons Gemini kosong');
  } catch (err) {
    console.warn('Gagal memanggil Gemini API, beralih ke generator lokal:', err);
    // Fallback otomatis ke generator cerdas bawaan
    return generateBuiltInText({ fieldType, context, tone, customPrompt });
  }
}
