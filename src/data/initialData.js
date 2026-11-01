// Data Awal Portfolio
export const initialProfile = {
  id: 1,
  full_name: "Rahman Kurniawan",
  headline: "Junior Full-Stack Web Developer & UI Designer",
  short_bio: "Mahasiswa tingkat akhir Manajemen Informatika yang berfokus pada rancang bangun aplikasi web modern, performa tinggi, dan antarmuka ramah pengguna.",
  about_content: `Saya adalah seorang pengembang web yang passionate dalam mengubah permasalahan bisnis dan kebutuhan pengguna menjadi produk digital yang intuitif serta efisien. Dengan latar belakang akademik di bidang Manajemen Informatika dan pengalaman mengerjakan proyek perangkat lunak dari hulu ke hilir, saya terbiasa membangun arsitektur RESTful API yang aman dengan Node.js & Express, mengelola basis data relasional MySQL/Supabase, serta menyusun antarmuka modern yang responsif menggunakan React.Prinsip kerja saya berakar pada kode yang bersih (clean code), dokumentasi yang rapi, dan empati mendalam terhadap kenyamanan interaksi pengguna akhir (user-centric experience).`,
  profile_image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  cv_url: "https://drive.google.com/file/d/1e13ZYgw-XXq4CSHGpHQm-SP7Kr4H8-gO/view?usp=drivesdk",
  public_email: "rahmankur907@gmail.com",
  location: "Surakarta, Indonesia",
  availability: "Tersedia untuk Magang & Full-time",
  response_time: "Merespons dalam < 24 jam",
  github_username: "rahmankur123",
  linkedin_username: "rahman-kurniawan",
  experience_years: "2+ Tahun Belajar & Eksplorasi Proyek",
  completed_projects_count: 8
};

export const initialEducations = [
  {
    id: 1,
    institution: "Politeknik Negeri / Universitas",
    degree: "Diploma 3 (D3)",
    field_of_study: "Manajemen Informatika",
    start_date: "2023",
    end_date: "2026",
    is_current: true,
    description: "Mempelajari rekayasa perangkat lunak, algoritma struktur data, perancangan basis data relasional, pemrograman web client-server, dan manajemen proyek sistem informasi.",
    achievements: [
      "Indeks Prestasi Kumulatif (IPK): 3.88 / 4.00",
      "Penerima Beasiswa Prestasi Akademik 2024",
      "Asisten Praktikum Pemrograman Basis Data Relasional & Web Dasar"
    ],
    logo_icon: "GraduationCap",
    sort_order: 1,
    is_visible: true
  },
  {
    id: 2,
    institution: "SMK Negeri 1 (Rekayasa Perangkat Lunak)",
    degree: "Sekolah Menengah Kejuruan",
    field_of_study: "Rekayasa Perangkat Lunak (RPL)",
    start_date: "2020",
    end_date: "2023",
    is_current: false,
    description: "Fondasi pemrograman komputer, algoritma dasar, HTML/CSS, JavaScript, PHP native, serta konsep basis data MySQL dasar.",
    achievements: [
      "Lulusan Terbaik Program Keahlian RPL Angkatan 2023",
      "Juara 2 Lomba Kompetensi Siswa (LKS) Bidang Web Technologies Tingkat Kota"
    ],
    logo_icon: "School",
    sort_order: 2,
    is_visible: true
  }
];

export const initialExperiences = [
  {
    id: 1,
    organization: "Nusantara Digital Studio",
    position: "Frontend Web Developer (Magang)",
    experience_type: "Magang",
    start_date: "Jan 2025",
    end_date: "Saat ini",
    is_current: true,
    description: "Mengembangkan antarmuka landing page responsif dan portal manajemen klien untuk berbagai proyek UKM dan instansi.",
    achievements: [
      "Mengembangkan 15+ komponen UI reusable dengan React dan CSS Modules yang mempercepat perakitan page baru hingga 35%.",
      "Meningkatkan Google Lighthouse performance score dari rata-rata 65 menjadi 94+ melalui optimasi asset dan implementasi lazy loading.",
      "Melakukan koordinasi mingguan dengan desainer UI/UX untuk memastikan konsistensi token desain dan micro-interaction."
    ],
    technologies: ["React", "JavaScript", "CSS Modules", "Git", "Figma"],
    sort_order: 1,
    is_visible: true
  },
  {
    id: 2,
    organization: "Himpunan Mahasiswa Manajemen Informatika",
    position: "Kepala Divisi Teknologi & Informasi",
    experience_type: "Organisasi",
    start_date: "Agu 2024",
    end_date: "Des 2024",
    is_current: false,
    description: "Memimpin tim divisi IT dalam merancang, mengembangkan, dan memelihara sistem informasi kegiatan serta pendaftaran event mahasiswa.",
    achievements: [
      "Membangun portal pendaftaran event kampus yang sukses memproses 1.200+ pendaftar tanpa insiden downtime server.",
      "Mengadakan bootcamp internal pengembangan web dasar yang diikuti oleh lebih dari 70 anggota himpunan.",
      "Menerapkan Git workflow dan standar review kode untuk kolaborasi tim pengembang."
    ],
    technologies: ["Node.js", "Express", "MySQL", "Bootstrap", "Git"],
    sort_order: 2,
    is_visible: true
  },
  {
    id: 3,
    organization: "Freelance Client Projects",
    position: "Full-Stack Web Developer",
    experience_type: "Freelance",
    start_date: "Mei 2024",
    end_date: "Nov 2024",
    is_current: false,
    description: "Mengerjakan aplikasi web custom untuk kebutuhan katalog bisnis lokal, form pemesanan WhatsApp, dan sistem kasir mini.",
    achievements: [
      "Menyelesaikan 4 proyek website tepat waktu dengan kepuasan klien 100% dan ulasan positif.",
      "Mengintegrasikan automasi notifikasi WhatsApp API untuk setiap pesanan baru yang masuk."
    ],
    technologies: ["React", "Node.js", "Express", "MySQL"],
    sort_order: 3,
    is_visible: true
  }
];

export const initialSkillCategories = [
  {
    id: 1,
    name: "Front-end Development",
    description: "Pembuatan antarmuka pengguna yang responsif, terstruktur, dan interaktif.",
    sort_order: 1,
    is_visible: true,
    skills: [
      { id: 101, name: "HTML5 & Semantic Web", percentage: 95, proficiency: "Mahir", icon: "Layout", note: "Struktur semantik terstandar, aksesibilitas (a11y), validasi W3C, dan SEO on-page" },
      { id: 102, name: "Modern CSS3 & Responsive", percentage: 92, proficiency: "Mahir", icon: "Palette", note: "Flexbox, CSS Grid, media queries, animasi micro-interaction, dan Tailwind CSS" },
      { id: 103, name: "React.js", percentage: 90, proficiency: "Mahir", icon: "Code2", note: "Komponen fungsional, custom hooks, context, state management modern, dan Vite" },
      { id: 104, name: "JavaScript (ES6+)", percentage: 88, proficiency: "Mahir", icon: "FileCode", note: "Async/await, closures, manipulasi DOM, modul modular, dan integrasi API" },
      { id: 105, name: "Vite & Tooling", percentage: 85, proficiency: "Mahir", icon: "Zap", note: "Build bundling cepat, environment setup, hot module replacement" },
      { id: 106, name: "TypeScript", percentage: 75, proficiency: "Cukup", icon: "Terminal", note: "Interface deklaratif, typing props, type-safety pada komponen dan data model" }
    ]
  },
  {
    id: 2,
    name: "Back-end & Database",
    description: "Penyusunan REST API andal, autentikasi, serta pemodelan basis data relasional.",
    sort_order: 2,
    is_visible: true,
    skills: [
      { id: 201, name: "Node.js & Express", percentage: 86, proficiency: "Mahir", icon: "Server", note: "Routing RESTful, middleware, error handling terpusat, validasi input" },
      { id: 202, name: "MySQL & SQL Query", percentage: 85, proficiency: "Mahir", icon: "Database", note: "Normalisasi tabel, foreign key, indexing, relasi many-to-many, parameterized queries" },
      { id: 203, name: "RESTful API Architecture", percentage: 88, proficiency: "Mahir", icon: "Globe", note: "Standar HTTP status, endpoint terstruktur, data sanitization, stateless auth" },
      { id: 204, name: "JWT & Auth Security", percentage: 78, proficiency: "Cukup", icon: "ShieldCheck", note: "Token generation, password hashing dengan bcrypt, proteksi endpoint admin" },
      { id: 205, name: "Prisma ORM", percentage: 72, proficiency: "Cukup", icon: "Layers", note: "Skema deklaratif, relasi model, migrasi versioned database" }
    ]
  },
  {
    id: 3,
    name: "Alat Kerja & Alur Kolaborasi",
    description: "Perangkat penunjang produktivitas, pengujian, dan version control tim.",
    sort_order: 3,
    is_visible: true,
    skills: [
      { id: 301, name: "Git & GitHub", percentage: 90, proficiency: "Mahir", icon: "GitBranch", note: "Branching model, pull request, merge conflict resolution, semantic commit" },
      { id: 302, name: "Postman", percentage: 86, proficiency: "Mahir", icon: "Send", note: "API collection testing, mock servers, automated environment variables" },
      { id: 303, name: "Figma to Code", percentage: 88, proficiency: "Mahir", icon: "Figma", note: "Interpretasi autolayout, ekstraksi token warna, tipografi, dan aset ikon" },
      { id: 304, name: "VS Code & Linting", percentage: 92, proficiency: "Mahir", icon: "Code", note: "Setup ESLint, prettier, debugging browser tools, ekstensi produktif" },
      { id: 305, name: "Linux & Deploy Basics", percentage: 70, proficiency: "Cukup", icon: "Cpu", note: "Terminal bash, manajemen package, dasar VPS, PM2, dan static hosting" }
    ]
  }
];

export const initialProjects = [
  {
    id: 1,
    title: "Personal Portfolio & CMS Management System",
    slug: "personal-portfolio-cms",
    short_description: "Sistem portofolio pribadi modern dilengkapi panel CMS mandiri untuk manajemen profil, proyek, keahlian, dan kotak masuk pesan tanpa edit source code.",
    cover_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    category: "Full-Stack Web App",
    role: "Full-Stack Developer & UI Architect",
    overview: "Sebuah aplikasi portofolio digital yang memisahkan antara layer presentasi publik minimalis dengan Content Management System (CMS) di balik layar. Dibuat dengan fondasi arsitektur REST API, pemodelan data terstruktur MySQL, dan UI berbasis React yang sangat responsif.",
    problem_statement: "Umumnya portofolio developer berbentuk static site yang mewajibkan perubahan source code dan redeploy berulang kali hanya untuk menambah proyek baru atau memperbarui status demo tautan. Hal ini sering mengakibatkan portofolio terbengkalai dan recruiter menemui link demo yang sudah kadaluarsa (broken link).",
    objectives: "Membangun platform portofolio yang dapat diperbarui secara dinamis langsung dari admin panel, memiliki aturan bisnis yang ketat untuk status publikasi (Draft vs Published) dan status demo (Online, Maintenance, Offline), serta formulir kontak terlindungi.",
    features: [
      {
        id: 1,
        title: "Pemisahan Status Publikasi dan Live Demo",
        description: "Hanya proyek berstatus PUBLISHED dan demo ONLINE dengan URL valid yang menampilkan tombol Live Demo fungsional secara interaktif."
      },
      {
        id: 2,
        title: "Dokumentasi Proyek Komprehensif",
        description: "Menampilkan studi kasus mendalam: latar belakang masalah, tujuan bisnis, kontribusi personal, tantangan teknis beserta solusi, galeri tangkapan layar, dan tumpukan teknologi."
      },
      {
        id: 3,
        title: "Formulir Kontak Terintegrasi",
        description: "Validasi masukan nama, email, subjek, dan pesan secara real-time dengan proteksi spam dan konfirmasi pengiriman yang elegan."
      },
      {
        id: 4,
        title: "Desain Minimalis Off-White & Forest Green",
        description: "Kombinasi palet warna lembut (#F7F7F3) dengan aksen hijau alami (#17634D), tipografi sans-serif modern, serta hierarki konten yang mudah dipindai oleh recruiter."
      }
    ],
    technical_challenges: "Menerapkan boundary arsitektur yang aman agar kredensial database tidak terekspos di bundle React publik, serta merancang skema relasional MySQL yang fleksibel untuk menampung gambar galeri, tags teknologi, dan urutan item tanpa redundansi data.",
    results: "Memangkas waktu pembaruan konten portofolio hingga 85% tanpa perlu deployment ulang server, serta memberikan impresi profesional bagi calon recruiter maupun klien.",
    live_url: "https://demo.portfolio-cms.dev",
    repository_url: "https://github.com/alifianramadhan/personal-portfolio-cms",
    demo_status: "ONLINE",
    publication_status: "PUBLISHED",
    is_featured: true,
    published_at: "2026-10-23",
    sort_order: 1,
    technologies: ["React", "Node.js", "Express", "MySQL", "Vite", "Modern CSS"],
    images: [
      {
        id: 11,
        image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        caption: "Tampilan beranda portofolio dengan hero dua kolom dan kartu profil ringkas.",
        alt_text: "Hero section portfolio CMS"
      },
      {
        id: 12,
        image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        caption: "Dokumentasi detail proyek dan studi kasus fitur teknis.",
        alt_text: "Halaman dokumentasi proyek"
      },
      {
        id: 13,
        image_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
        caption: "Tampilan dashboard admin panel untuk pengelolaan konten portofolio.",
        alt_text: "Dashboard admin CMS"
      }
    ]
  },
  {
    id: 2,
    title: "Sistem Kasir & Manajemen Stok Multi-Cabang (POS)",
    slug: "inventory-pos-multibranch",
    short_description: "Aplikasi Point-of-Sale kasir berbasis web dengan pelacakan inventaris stok barang real-time, pencetakan struk thermal, dan rekapitulasi laba rugi harian.",
    cover_image: "https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=800&q=80",
    category: "Full-Stack Web App",
    role: "Lead Backend Developer & Database Designer",
    overview: "Sistem kasir dan manajemen rantai pasok untuk toko ritel UMKM dengan kemampuan pencatatan penjualan cepat di perangkat tablet/desktop serta peringatan otomatis ketika stok barang mencapai batas minimum.",
    problem_statement: "Toko ritel konvensional kerap menghadapi selisih stok fisik versus buku catatan kasir, antrean panjang saat jam ramai, dan kesulitan menghitung margin keuntungan bersih harian.",
    objectives: "Menciptakan antarmuka kasir cepat berbasis shortcut keyboard/touchscreen, sinkronisasi stok otomatis saat transaksi sukses, dan laporan analitik penjualan.",
    features: [
      {
        id: 5,
        title: "Transaksi Kasir Cepat (Speed Checkout)",
        description: "Dukungan barcode scanner USB, kalkulasi kembalian otomatis, dan cetak invoice struk instan."
      },
      {
        id: 6,
        title: "Sinkronisasi Stok Real-time",
        description: "Pengurangan persediaan otomatis dari gudang terpilih dengan validasi konkurensi data."
      },
      {
        id: 7,
        title: "Laporan Pendapatan & Grafik Produk Terlaris",
        description: "Dashboard analitik visual untuk memantau performa penjualan harian, mingguan, dan bulanan."
      }
    ],
    technical_challenges: "Menjaga konsistensi transaksi database saat puluhan kasir melakukan transaksi secara bersamaan dengan menerapkan MySQL ACID Transactions dan locking mekanisme pada level baris stok.",
    results: "Mempersingkat waktu pelayanan tiap pelanggan dari 90 detik menjadi 20 detik dan mengeliminasi 98% selisih stok fisik.",
    live_url: "https://pos-demo.tokoberkah.id",
    repository_url: "https://github.com/alifianramadhan/inventory-pos-system",
    demo_status: "ONLINE",
    publication_status: "PUBLISHED",
    is_featured: true,
    published_at: "2026-08-15",
    sort_order: 2,
    technologies: ["React", "Node.js", "Express", "MySQL", "Chart.js"],
    images: [
      {
        id: 21,
        image_url: "https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=1200&q=80",
        caption: "Antarmuka kasir utama dengan layout tombol produk cepat dan keranjang belanja.",
        alt_text: "Tampilan POS Kasir"
      },
      {
        id: 22,
        image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        caption: "Laporan rekap harian dan grafik tren transaksi.",
        alt_text: "Laporan Penjualan"
      }
    ]
  },
  {
    id: 3,
    title: "SIAKAD & Presensi Mahasiswa Berbasis Dynamic QR Code",
    slug: "siakad-presensi-qr-kampus",
    short_description: "Portal akademik perkuliahan terintegrasi sistem absensi presensi mahasiswa menggunakan dynamic QR Code yang diperbarui tiap 30 detik untuk cegah titip absen.",
    cover_image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    category: "Web Application",
    role: "Frontend Developer & API Integration",
    overview: "Aplikasi web perkuliahan yang memfasilitasi dosen membuka sesi perkuliahan, menampilkan QR presensi terenkripsi di layar proyektor kelas, serta mahasiswa memindai langsung dari smartphone mereka.",
    problem_statement: "Presensi lembar kertas memakan waktu perkuliahan 15-20 menit di awal kelas, rentan titip tanda tangan, dan staf akademik butuh rekap manual yang lambat.",
    objectives: "Menghadirkan sistem presensi tanpa kontak fisik dalam hitungan detik dengan verifikasi validitas kode QR dinamis dan pembatasan jarak GPS geofencing.",
    features: [
      {
        id: 8,
        title: "Dynamic Rotating QR Code",
        description: "Kode QR berganti otomatis setiap 30 detik menggunakan token terenkripsi HMAC berbasis waktu."
      },
      {
        id: 9,
        title: "Portal Nilai & Jadwal Kuliah",
        description: "Daftar mata kuliah, kalender akademik semester, dan kartu hasil studi mahasiswa."
      }
    ],
    technical_challenges: "Sinkronisasi waktu presisi (NTP) antara server dan client browser dosen untuk menjamin token QR tidak invalid akibat delay jaringan.",
    results: "Menghemat 15 menit durasi belajar mengajar di tiap sesi perkuliahan dan menghasilkan rekap absensi otomatis 100% akurat.",
    live_url: "",
    repository_url: "https://github.com/alifianramadhan/siakad-presensi-kampus",
    demo_status: "MAINTENANCE",
    publication_status: "PUBLISHED",
    is_featured: false,
    published_at: "2026-05-10",
    sort_order: 3,
    technologies: ["React", "Express", "MySQL", "Socket.io", "Tailwind"],
    images: [
      {
        id: 31,
        image_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
        caption: "Layar proyeksi presensi dosen dengan QR dinamis dan daftar hadir realtime.",
        alt_text: "Presensi Mahasiswa QR"
      }
    ]
  },
  {
    id: 4,
    title: "FinTrack — Personal Finance & Monthly Budget Planner",
    slug: "fintrack-budget-planner",
    short_description: "Aplikasi pencatatan keuangan pribadi dengan metode amplop anggaran (envelope budgeting), visualisasi pengeluaran, dan kalkulator target tabungan masa depan.",
    cover_image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80",
    category: "Frontend Web App",
    role: "Frontend Engineer & UI Designer",
    overview: "Aplikasi pengelolaan arus kas bulanan yang membantu individu memahami pos pengeluaran terbesar mereka dan merencanakan alokasi tabungan dana darurat secara disiplin.",
    problem_statement: "Banyak generasi muda mengalami fenomena 'uang habis tanpa jejak' akibat kurangnya visualisasi pengeluaran harian dan tidak adanya sistem amplop pembatas pengeluaran.",
    objectives: "Menyediakan aplikasi web ringkas, offline-ready dengan LocalStorage fallback, animasi interaktif, serta ringkasan kesehatan finansial mingguan.",
    features: [
      {
        id: 10,
        title: "Sistem Amplop Digital",
        description: "Membatasi pengeluaran per kategori (Makanan, Transportasi, Hiburan) dengan progres bar berwarna dinamis."
      },
      {
        id: 11,
        title: "Visualisasi Grafik Pie & Bar",
        description: "Menampilkan proporsi pengeluaran dengan filter rentang tanggal fleksibel."
      }
    ],
    technical_challenges: "Mengoptimalkan kalkulasi floating point mata uang Rupiah dan rendering interaktif bagan grafik tanpa lag.",
    results: "Mendapat feedback positif dari 50+ pengguna beta yang merasa lebih sadar dalam mengatur pengeluaran bulanan.",
    live_url: "https://fintrack-budget.preview.dev",
    repository_url: "https://github.com/alifianramadhan/fintrack-budget",
    demo_status: "ONLINE",
    publication_status: "PUBLISHED",
    is_featured: false,
    published_at: "2026-03-20",
    sort_order: 4,
    technologies: ["React", "JavaScript", "HTML5", "Modern CSS", "Chart.js"],
    images: [
      {
        id: 41,
        image_url: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80",
        caption: "Dashboard keuangan dengan saldo bersih dan progress bar alokasi amplop belanja.",
        alt_text: "FinTrack Dashboard"
      }
    ]
  },
  {
    id: 5,
    title: "EcoSmart — Monitoring Limbah Daur Ulang Mandiri (Internal Draft)",
    slug: "ecosmart-recycling-tracker",
    short_description: "Prototype sistem penimbangan dan tracking poin daur ulang sampah plastik rumah tangga berbasis IoT sensor dan web dashboard.",
    cover_image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    category: "Full-Stack Web App",
    role: "Full-Stack Developer",
    overview: "Proyek riset kampus untuk menghubungkan timbangan digital mikrokontroler dengan server web guna merekam bobot daur ulang warga.",
    problem_statement: "Pencatatan bank sampah konvensional masih berbasis buku tulis manual.",
    objectives: "Otomasi pencatatan kilogram sampah dan konversi menjadi poin belanja kebutuhan pokok.",
    features: [
      { id: 12, title: "Webhook Sensor IoT", description: "Penerimaan data berat sampah dari ESP32 via HTTP POST." }
    ],
    technical_challenges: "Penyelarasan koneksi sensor dengan REST endpoint lokal.",
    results: "Berhasil menguji coba transmisi 200 data timbangan tanpa paket hilang.",
    live_url: "",
    repository_url: "https://github.com/alifianramadhan/ecosmart-tracker",
    demo_status: "NOT_AVAILABLE",
    publication_status: "DRAFT", // Draft: tidak tampil di halaman publik
    is_featured: false,
    published_at: null,
    sort_order: 5,
    technologies: ["Node.js", "Express", "MySQL", "C++ / ESP32"],
    images: []
  }
];

export const initialSocialLinks = [
  { id: 1, platform: "GitHub", label: "github.com/alifianramadhan", url: "https://github.com", sort_order: 1, is_visible: true, icon: "Github" },
  { id: 2, platform: "LinkedIn", label: "linkedin.com/in/alifian-ramadhan", url: "https://linkedin.com", sort_order: 2, is_visible: true, icon: "Linkedin" },
  { id: 3, platform: "Instagram", label: "@alifian.dev", url: "https://instagram.com", sort_order: 3, is_visible: true, icon: "Instagram" },
  { id: 4, platform: "WhatsApp", label: "Chat WhatsApp", url: "https://wa.me/6281234567890", sort_order: 4, is_visible: true, icon: "WhatsApp" },
  { id: 5, platform: "Twitter", label: "@alifian_dev", url: "https://twitter.com", sort_order: 5, is_visible: true, icon: "Twitter" },
  { id: 6, platform: "Email", label: "alifian.work@example.com", url: "mailto:alifian.work@example.com", sort_order: 6, is_visible: true, icon: "Mail" }
];

export const initialSiteSettings = {
  site_title: "Rahman Kurniawan — Personal Portfolio",
  owner_name: "Rahman Kurniawan",
  hero_greeting: "Halo, Selamat Datang 👋",
  hero_badge_text: "Tersedia untuk Peluang Baru & Magang",
  hero_headline_prefix: "Membangun Solusi Web yang",
  hero_headline_highlight: "Bermakna, Bersih & Terukur",
  hero_subheadline: "Saya menggabungkan ketelitian rekayasa sistem basis data dengan estetika antarmuka front-end yang modern untuk menghasilkan produk digital berkualitas tinggi.",
  copyright_year: 2026,
  footer_text: "Dirancang & dibangun dengan dedikasi penuh untuk hasil yang profesional.",
  footer_copyright: "© 2026 Rahman Kurniawan. Seluruh Hak Cipta Dilindungi.",
  maintenance_notice: "Sistem Live Demo dimonitor secara berkala untuk menjaga stabilitas tautan eksternal."
};

export const initialContactMessages = [
  {
    id: 1,
    sender_name: "Budi Santoso",
    sender_email: "budi.recruiter@techcorp.co.id",
    subject: "Peluang Posisi Junior Frontend Developer",
    message: "Halo Alifian, kami melihat portofolio dan proyek CMS Anda yang sangat terstruktur. Kami ingin mengundang Anda untuk sesi diskusi teknis awal terkait posisi Junior Developer.",
    status: "NEW", // NEW, READ, REPLIED, ARCHIVED
    created_at: "2026-10-23 14:30:00"
  },
  {
    id: 2,
    sender_name: "Maya Kartika",
    sender_email: "maya@kreatifstudio.id",
    subject: "Ajakan Kolaborasi Pembuatan Web App Katalog",
    message: "Selamat siang Alifian, kami sedang memerlukan bantuan freelance untuk menyelesaikan modul dashboard client. Apakah Anda memiliki waktu luang bulan depan?",
    status: "READ",
    created_at: "2026-10-22 09:15:00"
  }
];
