# Personal Portfolio & CMS — Frontend Application

Website Landing Page Portofolio Profesional dan CMS Playground mandiri yang dibangun berdasarkan spesifikasi lengkap [Product Requirements Document (PRD)](./prd.md).

---

## 🎨 Karakter Desain & Sistem Visual (PRD Bagian 2)

- **Palet Warna Utama**:
  - Background: `#F7F7F3` (Off-white hangat & elegan)
  - Primary Green: `#17634D` (Aksen hijau hutan natural pada CTA & status aktif)
  - Pale Green: `#E8F1EC` (Badge highlight lembut)
  - Dark Accent: `#0E1715` (Footer & contrast accents)
  - Border: `#DDE1DA` & `#ECEFE9`
- **Tipografi**: `Plus Jakarta Sans` (Sans-serif modern, hierarki tegas, tanpa dekorasi berlebihan).
- **Tata Letak**: Responsif Desktop, Tablet, dan Mobile.

---

## 🚀 Fitur Utama Sesuai PRD

### 1. Halaman Publik (PRD Bagian 4)
- **Navbar Sticky Blur (`#navbar`)**:
  - Logo inisial `AR`, identitas profesi, indikator aktif lembut, drawer mobile menu, tombol akses cepat Admin Preview.
- **Hero Section (`#hero`) (PRD 4.2)**:
  - Layout 2 kolom pada desktop:
    - Kiri: Headline besar, value proposition, availability badge pulsating ("Tersedia untuk Magang & Peluang Kerja"), CTA "Lihat Proyek", "Hubungi Saya", dan "Unduh CV".
    - Kanan: **Kartu Profil Ringkas**: Foto avatar, verifikasi badge, domisili, waktu respon (`< 24 jam`), email publik, dan pil fokus teknologi.
- **Profil / About (`#about`) (PRD 4.3)**:
  - Biografi mendalam, 3 pilar kerja (*Clean Code*, *Integritas Basis Data Relasional*, *Empati UX*).
- **Pendidikan (`#pendidikan`) (PRD 4.4)**:
  - Timeline interaktif, status *Sedang Ditempuh*, jenjang D3 Manajemen Informatika, daftar pencapaian akademik (IPK 3.88).
- **Pengalaman (`#pengalaman`) (PRD 4.5)**:
  - Timeline kerja, magang, organisasi, dan freelance dengan tag teknologi serta poin pencapaian terukur.
- **Keahlian & Tooling (`#skills`) (PRD 4.6)**:
  - Dikelompokkan per kategori (*Front-end*, *Back-end & Database*, *Alat Kerja*).
  - Menggunakan label keahlian realistis (*Mahir* / *Cukup*) tanpa persentase angka yang membingungkan pengunjung.
- **Portofolio Proyek (`#projects`) (PRD 4.7 & 7.1 & 7.2)**:
  - Filter kategori proyek, cover gambar, tag teknologi.
  - **Aturan Bisnis Live Demo (PRD 7.2)**: Tombol *Live Demo* hanya aktif bila status publikasi = `PUBLISHED`, status demo = `ONLINE`, dan URL valid. Jika proyek berstatus `MAINTENANCE` atau `OFFLINE`, tombol menampilkan keterangan pemeliharaan dan non-aktif secara aman.
  - **Studi Kasus Lengkap Modal (PRD 5.1)**: Dokumentasi mendalam mencakup latar belakang masalah, tujuan solusi, daftar fitur terstruktur, tantangan teknis & solusi, hasil terukur, dan galeri tangkapan layar.
- **Formulir Kontak (`#contact`) (PRD 5.3)**:
  - Validasi input real-time (Nama, format Email valid, Subjek, Pesan minimal 10 karakter).
  - Feedback konfirmasi sukses dan penyimpanan pesan interaktif.
- **Footer (`#footer`) (PRD 4.8)**:
  - Copyright 2026, tautan media sosial (GitHub, LinkedIn, Instagram, Email), tautan navigasi, dan tombol kembali ke atas.

### 2. Panel CMS Admin Playground (PRD Bagian 6 & 7)
- Dapat diakses melalui tombol **Admin Preview** di navbar atau floating widget di pojok kiri bawah:
  - **Dashboard Ringkasan**: Statistik total proyek, proyek publik, proyek draft, dan pesan masuk.
  - **Manajemen Publikasi Proyek**: Toggle `PUBLISHED` vs `DRAFT` secara instan (proyek draft langsung disembunyikan dari halaman publik sesuai PRD 7.1).
  - **Manajemen Status Demo**: Ganti status demo `ONLINE`, `MAINTENANCE`, `OFFLINE` untuk menguji reaksi tombol Live Demo publik (PRD 7.2).
  - **Kotak Masuk Pesan**: Melihat pesan yang dikirim dari form kontak, memperbarui status (`NEW`, `READ`, `REPLIED`, `ARCHIVED`), atau menghapus pesan.
  - **Reset Data**: Kembalikan data simulasi ke standar awal PRD kapan saja.

---

## 🛠️ Menjalankan Aplikasi Secara Lokal

Aplikasi menggunakan Node.js dan Vite:

```bash
# 1. Install dependencies (jika belum)
npm install

# 2. Jalankan development server
npm run dev

# Aplikasi akan berjalan di:
# http://localhost:5173/
```

Untuk memverifikasi build produksi:
```bash
npm run build
```

---

## 🔌 Kesiapan Integrasi Backend (Node.js + Express + MySQL)

Arsitektur kode di [src/services/portfolioStorage.js](file:///d:/KULIAH%20MI/projek/src/services/portfolioStorage.js) telah dipisahkan secara modular mengikuti kontrak endpoint REST API di PRD Bagian 8.4:
- `GET /api/profile`
- `GET /api/educations`
- `GET /api/experiences`
- `GET /api/skills`
- `GET /api/projects`
- `GET /api/projects/:slug`
- `POST /api/contact`

Ketika backend Express + MySQL siap dibangun pada tahap berikutnya, fungsi-fungsi di service layer tersebut cukup diarahkan ke panggilan `fetch('/api/...')` tanpa perlu merombak komponen antarmuka antarmuka pengguna!
