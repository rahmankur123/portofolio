# PRODUCT REQUIREMENTS DOCUMENT (PRD)

## Website Portofolio Pribadi + Admin Panel

**Stack:** React · Node.js + Express · MySQL  
**Versi:** 1.0 — Final  
**Tanggal:** 23 Oktober 2026  
**Status:** Siap menjadi dasar desain UI/UX dan implementasi MVP  
**Platform:** Web responsif — desktop, tablet, dan mobile

Dokumen kebutuhan produk untuk membangun website portofolio profesional yang responsif, mudah dikelola, dan memiliki halaman admin terintegrasi.

**Prinsip produk:** Tampilan publik mengikuti referensi minimalis berwarna off-white dan hijau. Konten utama dikelola melalui admin dan disimpan di MySQL; pembaruan konten tidak membutuhkan perubahan kode atau deployment ulang.

Tampilan publik mengikuti referensi minimalis berwarna off-white dan
hijau. Konten utama dikelola melalui admin dan disimpan di MySQL;
pembaruan konten tidak membutuhkan perubahan kode atau deployment ulang.

# Ringkasan Eksekutif

Website ini berfungsi sebagai portofolio profesional pribadi untuk
menampilkan profil, pendidikan, pengalaman, keterampilan, dan
dokumentasi proyek. Pengunjung dapat menjelajahi detail proyek serta
membuka demo yang tersedia, kemudian mengirim pesan melalui contact
form.

Produk juga mencakup admin panel agar pemilik dapat memperbarui seluruh
konten utama, mengelola media, menentukan status publikasi, mengatur
tautan demo, serta memproses pesan masuk tanpa mengakses database
langsung.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><p><strong>Keputusan arsitektur utama</strong></p>
<p>React digunakan untuk UI. Backend Node.js + Express menyediakan REST
API dan menjadi satu-satunya lapisan aplikasi yang mengakses MySQL.
React tidak boleh berisi kredensial database atau mengakses MySQL secara
langsung.</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

## Tujuan produk

- Membangun kehadiran profesional yang mudah dibagikan kepada recruiter,
  klien, dan kolaborator.

- Menunjukkan keahlian melalui dokumentasi proyek yang mendalam dan
  terstruktur.

- Memungkinkan pemilik mengubah konten portofolio dari admin tanpa
  mengubah source code.

- Menyediakan jalur komunikasi yang sederhana melalui formulir kontak.

- Menyiapkan fondasi teknis yang dapat dikembangkan tanpa membangun
  ulang aplikasi.

## Informasi dan status dokumen

| **Elemen**            | **Keputusan untuk MVP**                                                       |
|-----------------------|-------------------------------------------------------------------------------|
| **Nama produk**       | Personal Portfolio CMS                                                        |
| **Model akses**       | Halaman publik + admin login                                                  |
| **Administrator**     | Satu akun pemilik; multi-admin bukan kebutuhan MVP                            |
| **Bahasa awal**       | Bahasa Indonesia; struktur dapat diperluas untuk multi-bahasa                 |
| **Konten dinamis**    | Profil, pendidikan, pengalaman, skill, proyek, media, kontak, pengaturan      |
| **Prinsip publikasi** | Hanya konten yang dipublikasikan dan diaktifkan yang muncul di website publik |

## Daftar isi

> 1\. Tujuan, pengguna, ruang lingkup, dan bukan sasaran
>
> 2\. Referensi visual dan sistem desain
>
> 3\. Sitemap dan alur pengguna
>
> 4\. Persyaratan halaman publik
>
> 5\. Persyaratan admin panel
>
> 6\. Aturan bisnis dan status proyek
>
> 7\. Kebutuhan fungsional dan prioritas
>
> 8\. Arsitektur, stack, dan API
>
> 9\. Model data MySQL
>
> 10\. Kebutuhan nonfungsional dan keamanan
>
> 11\. Kriteria penerimaan dan pengujian
>
> 12\. Tahapan implementasi, risiko, dan Definition of Done

# 1. Tujuan, Pengguna, dan Ruang Lingkup

## 1.1 Target pengguna

| **Persona**             | **Kebutuhan utama**                                            | **Tindakan yang diharapkan**                                     |
|-------------------------|----------------------------------------------------------------|------------------------------------------------------------------|
| Recruiter / HR          | Menilai latar belakang, pengalaman, skill, dan kualitas proyek | Melihat profil, membaca proyek, menghubungi pemilik              |
| Calon klien             | Memahami kapabilitas dan melihat bukti hasil kerja             | Menjelajahi dokumentasi, membuka demo, mengirim pesan            |
| Developer / kolaborator | Memahami kontribusi dan pilihan teknologi                      | Membaca detail implementasi dan membuka repository bila tersedia |
| Administrator / pemilik | Memperbarui isi portofolio tanpa mengedit kode                 | Mengelola konten, gambar, status proyek, dan pesan               |

## 1.2 Ruang lingkup MVP

| **Modul**                           | **Cakupan MVP**                                                                     | **Prioritas**                              |
|-------------------------------------|-------------------------------------------------------------------------------------|--------------------------------------------|
| **Halaman publik**                  | Hero, profil, pendidikan, pengalaman, skill, proyek, halaman detail, kontak, footer | Must                                       |
| **Admin**                           | Login/logout, dashboard ringkas, pengelolaan CRUD seluruh konten utama              | Must                                       |
| **Proyek & media**                  | Cover, galeri gambar, detail fitur, teknologi, publikasi, status demo               | Must                                       |
| **Contact form**                    | Validasi, penyimpanan database, daftar pesan, status pesan                          | Must                                       |
| **Pengaturan**                      | Profil publik, navigasi, link sosial, footer, metadata dasar                        | Must                                       |
| **SEO dan aksesibilitas dasar**     | Title, meta description, alt text, heading semantik, keyboard-friendly              | Should / sasaran kualitas                  |
| **Notifikasi email**                | Email pemberitahuan untuk pesan baru                                                | Should; perlu layanan email dan kredensial |
| **Monitoring tautan demo otomatis** | Pengecekan berkala terhadap ketersediaan URL eksternal                              | Could; tidak wajib untuk MVP               |

## 1.3 Di luar ruang lingkup MVP

- Multi-admin, role dan izin kompleks, serta registrasi publik
  administrator.

- Blog/artikel teknis, komentar proyek, atau community features.

- Login Google, integrasi GitHub API, dan sinkronisasi proyek otomatis.

- Analitik pengunjung tingkat lanjut dan dashboard statistik pemasaran.

- Website builder visual bebas atau desain tema yang dapat diubah tanpa
  batas.

# 2. Referensi Visual dan Sistem Desain

Screenshot yang diberikan pengguna menjadi referensi visual utama.
Implementasi diharapkan mempertahankan karakter minimalis, keterbacaan,
aksen hijau, dan pembagian konten yang rapi, bukan menyalin setiap
detail secara kaku.

<img src="prd_media/media/image1.png"
title="Referensi desain portofolio" style="width:6in;height:3.99524in"
alt="Screenshot referensi desain portofolio: navbar sederhana, hero dua kolom, kartu profil, dan kartu keterampilan dengan aksen hijau." />

Gambar 1. Referensi desain yang diberikan pengguna.

## 2.1 Karakter visual

- Minimalis, profesional, tenang, dan modern; hindari elemen dekoratif
  yang terlalu ramai.

- Latar off-white, teks gelap, aksen hijau pada CTA dan indikator, serta
  border tipis.

- Tipografi sans-serif modern dengan hierarki jelas antara headline,
  judul section, dan isi.

- Kartu menggunakan sudut membulat ringan, shadow minimal, dan jarak
  antar elemen konsisten.

- Animasi dibatasi pada interaksi yang membantu, seperti hover, transisi
  status, dan menu mobile.

## 2.2 Palet warna awal

| **Token**          | **Nilai perkiraan** | **Penggunaan**                                |
|--------------------|---------------------|-----------------------------------------------|
| **Background**     | \#F7F7F3            | Latar utama halaman                           |
| **Primary green**  | \#17634D            | Tombol utama, link aktif, badge, progress bar |
| **Text primary**   | \#17221F            | Judul dan teks utama                          |
| **Text secondary** | \#64716B            | Metadata dan keterangan sekunder              |
| **Border**         | \#DDE1DA            | Pembatas section dan border kartu             |
| **Pale green**     | \#E8F1EC            | Latar badge dan highlight lembut              |

## 2.3 Tata letak dan responsivitas

| **Komponen**   | **Desktop**                                | **Mobile**                                    |
|----------------|--------------------------------------------|-----------------------------------------------|
| Navbar         | Logo/nama di kiri, navigasi di kanan       | Menu ringkas/hamburger; area sentuh nyaman    |
| Hero           | Headline di kiri, kartu profil di kanan    | Disusun satu kolom; tombol mudah dijangkau    |
| Skills         | Beberapa kartu sejajar dalam grid          | Kartu ditumpuk atau grid sesuai lebar layar   |
| Projects       | Grid kartu proyek dengan thumbnail         | Satu kolom atau grid rapat yang tetap terbaca |
| Project detail | Konten dan galeri dalam layout terstruktur | Galeri dan teks satu kolom                    |
| Admin          | Sidebar dan area konten utama              | Sidebar menjadi drawer/menu mobile            |

## 2.4 Komponen desain yang konsisten

- Button: primary, secondary, ghost, dan destructive dengan state
  hover/disabled/loading.

- Card: profil, skill, pengalaman, proyek, dan ringkasan dashboard.

- Badge: status publikasi, online, maintenance, draft, dan status pesan.

- Form controls: label, input, helper text, validation message, serta
  state error.

- Feedback: toast atau inline alert untuk sukses, gagal, memuat, dan
  keadaan kosong.

# 3. Sitemap dan Alur Pengguna

## 3.1 Sitemap halaman publik

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><p>/</p>
<p>├── Section: Profil / About</p>
<p>├── Section: Pendidikan</p>
<p>├── Section: Pengalaman</p>
<p>├── Section: Skills</p>
<p>├── Section: Projects</p>
<p>│ └── /projects/:slug (detail dokumentasi proyek)</p>
<p>├── Section: Contact form</p>
<p>└── Footer / tautan sosial</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

## 3.2 Sitemap admin

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><p>/admin/login</p>
<p>/admin</p>
<p>├── Dashboard</p>
<p>├── Profile</p>
<p>├── Education</p>
<p>├── Experience</p>
<p>├── Skill categories &amp; skills</p>
<p>├── Projects</p>
<p>│ └── Create / Edit / Gallery / Publish</p>
<p>├── Contact messages</p>
<p>├── Social links</p>
<p>└── Website settings</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

## 3.3 Alur pengunjung

> **1.** Pengunjung membuka halaman utama dan mengenali pemilik dari
> hero serta kartu profil.
>
> **2.** Pengunjung menelusuri pendidikan, pengalaman, skill, dan proyek
> pilihan.
>
> **3.** Pengunjung membaca dokumentasi proyek dan membuka Live Demo
> bila status serta URL memenuhi syarat.
>
> **4.** Pengunjung mengirim contact form; backend memvalidasi lalu
> menyimpan pesan ke database.

## 3.4 Alur administrator

> **1.** Admin login ke /admin/login menggunakan akun yang valid.
>
> **2.** Admin membuat atau mengubah konten lalu menyimpan sebagai draft
> atau memublikasikan.
>
> **3.** Admin mengelola dokumentasi, galeri, teknologi, URL demo, dan
> status proyek.
>
> **4.** Admin memeriksa pesan masuk dan memperbarui status
> penanganannya.

# 4. Persyaratan Halaman Publik

## 4.1 Navbar

Navbar berisi logo/inisial, nama pemilik, profesi singkat, dan navigasi
ke section utama. Bagian aktif dapat diberi highlight lembut. Pada
mobile, navigasi berubah menjadi menu ringkas. Item navigasi dan
identitas utama dapat dikelola melalui admin/pengaturan.

## 4.2 Hero dan kartu profil

Hero adalah bagian pertama yang terlihat saat halaman dibuka. Gaya
mengikuti referensi: headline besar di kiri dan kartu ringkasan profil
di kanan pada desktop.

- Konten: foto atau avatar, nama, headline profesi, deskripsi singkat,
  CTA Hubungi Saya, dan CTA Lihat Pengalaman/Proyek.

- Metadata opsional: lokasi, ketersediaan untuk kerja/magang/freelance,
  waktu respons, fokus teknologi, dan email publik.

- Semua informasi dinamis dikelola admin. CTA memiliki tujuan yang valid
  dan tidak mengarah ke placeholder.

- Jika foto belum tersedia, tampilkan placeholder inisial yang konsisten
  dan tidak merusak layout.

## 4.3 Profil / About

Memuat biografi profesional, fokus bidang, minat teknis, dan pendekatan
kerja. Konten mendukung paragraf; rich text opsional dan harus
disanitasi sebelum dirender. Admin dapat mengganti teks dan foto
terkait.

## 4.4 Pendidikan

Ditampilkan sebagai timeline atau daftar dengan institusi, jenjang,
program studi, periode, status masih berlangsung, logo opsional, dan
deskripsi/pencapaian. Admin dapat mengurutkan item dan menyembunyikan
yang belum ingin dipublikasikan.

## 4.5 Pengalaman

Dapat berisi kerja, magang, freelance, organisasi, atau pengalaman
relevan lain. Setiap item menyimpan organisasi, posisi, tipe, tanggal
mulai/akhir, status berjalan, deskripsi, kontribusi/pencapaian, logo
opsional, dan urutan tampilan. Status “Saat ini” menggantikan tanggal
selesai bila pengalaman masih berlangsung.

## 4.6 Skills

Skill dikelompokkan berdasarkan kategori seperti Front-end, Back-end &
Data, dan Alat Kerja. Setiap skill dapat mempunyai nama, ikon,
deskripsi, urutan, dan tingkat penguasaan opsional. Jika indikator
visual digunakan, jangan mengklaim angka yang tidak terukur; label
seperti Dasar/Cukup/Mahir lebih sesuai daripada persentase yang memberi
kesan presisi palsu.

## 4.7 Daftar proyek

Bagian Projects menampilkan kartu proyek pilihan dengan cover, nama,
ringkasan, kategori, teknologi, badge status demo, tombol Detail, dan
tombol Live Demo bila memenuhi aturan. Admin dapat menandai proyek
unggulan dan mengatur urutan. Draft tidak ditampilkan di publik.

## 4.8 Footer

Footer berisi nama pemilik, tahun hak cipta, tautan sosial, email publik
opsional, navigasi tambahan, serta informasi relevan. Link yang
ditampilkan harus sudah divalidasi dan dikelola melalui admin.

# 5. Dokumentasi Proyek dan Contact Form

## 5.1 Halaman detail proyek

Setiap proyek memiliki halaman tersendiri dengan slug unik, misalnya
/projects/nama-proyek. Halaman tidak hanya menampilkan ringkasan, tetapi
menjadi dokumentasi lengkap yang menjelaskan apa yang dibangun, mengapa
dibangun, bagaimana fungsi utamanya, dan kontribusi pemilik.

| **Bagian detail**      | **Isi yang diharapkan**                         | **Aturan**                                                      |
|------------------------|-------------------------------------------------|-----------------------------------------------------------------|
| **Ringkasan**          | Nama, cover, ringkasan, kategori, peran         | Nama dan ringkasan wajib; cover disarankan                      |
| **Latar belakang**     | Masalah, tujuan, target pengguna                | Field terstruktur; bagian dapat disembunyikan bila kosong       |
| **Fungsi/fitur**       | Daftar fitur dengan judul dan deskripsi         | Satu proyek mendukung banyak fitur dan urutannya                |
| **Dokumentasi visual** | Screenshot/galeri, caption, alt text            | Mendukung banyak gambar dan urutan manual                       |
| **Teknologi**          | Bahasa, framework, database, tools              | Relasi many-to-many antara proyek dan teknologi                 |
| **Peran & tantangan**  | Kontribusi pribadi, keputusan teknis, tantangan | Tampilkan bila relevan; proyek tim harus menjelaskan kontribusi |
| **Hasil**              | Manfaat, outcome, pencapaian terukur            | Hindari klaim hasil yang tidak dapat dibuktikan                 |
| **Tautan**             | Live demo, repository, dokumentasi eksternal    | Setiap link divalidasi dan ditampilkan hanya bila tersedia      |

## 5.2 URL, publikasi, dan metadata proyek

- Slug bersifat unik, mudah dibaca, dan tidak berubah diam-diam setelah
  dipublikasikan.

- Jika slug proyek yang sudah terbit diubah, sistem sebaiknya
  menyediakan redirect dari slug lama atau memperingatkan admin bahwa
  link lama dapat rusak.

- Draft tidak dapat diakses publik. Endpoint publik hanya mengembalikan
  proyek published.

- Halaman detail memiliki title dan meta description yang relevan, serta
  Open Graph metadata bila memungkinkan.

- Gambar mempunyai alt text deskriptif; caption dapat menjelaskan fitur
  yang ditampilkan.

## 5.3 Contact form

| **Field**  | **Kewajiban** | **Validasi**                                         |
|------------|---------------|------------------------------------------------------|
| **Nama**   | Wajib         | Trim spasi, panjang minimum/maksimum yang ditetapkan |
| **Email**  | Wajib         | Format email valid; batas panjang input              |
| **Subjek** | Opsional      | Batas panjang; diperlakukan sebagai teks biasa       |
| **Pesan**  | Wajib         | Batas panjang dan validasi server-side               |

Backend memvalidasi dan membatasi spam sebelum menyimpan pesan beserta
waktu serta status. Pesan hanya dapat diakses admin; notifikasi email
merupakan fitur lanjutan. Error internal tidak boleh dibocorkan.

# 6. Persyaratan Admin Panel

## 6.1 Autentikasi dan akses

- Sediakan login menggunakan email/username dan password; registrasi
  publik tidak tersedia.

- Sediakan logout dan perlindungan seluruh halaman serta endpoint admin.

- Gunakan cookie session yang aman atau strategi token yang tepat;
  jangan menyimpan token sensitif di tempat yang rentan terhadap XSS.

- Hash password dengan algoritme yang sesuai; jangan menyimpan password
  mentah.

- Berikan pesan login generik agar tidak mengungkap apakah email
  tertentu terdaftar.

- Terapkan rate limiting pada login dan kebijakan sesi/masa berlaku yang
  jelas.

## 6.2 Dashboard

Dashboard merangkum jumlah proyek published/draft, pendidikan,
pengalaman, skill aktif, pesan belum dibaca, pesan terbaru, dan tautan
cepat ke modul. Grafik kompleks tidak diperlukan pada MVP.

## 6.3 Modul manajemen konten

| **Modul**            | **Operasi admin**                                  | **Ketentuan utama**                                                       |
|----------------------|----------------------------------------------------|---------------------------------------------------------------------------|
| **Profil**           | Lihat, edit, unggah foto, atur CV                  | Satu profil aktif pada MVP; field publik dapat kosong hanya bila opsional |
| **Pendidikan**       | Tambah, edit, hapus, urutkan, tampil/sembunyi      | Tanggal akhir opsional bila masih berlangsung                             |
| **Pengalaman**       | Tambah, edit, hapus, urutkan, tampil/sembunyi      | Dukungan tipe pengalaman dan status berjalan                              |
| **Kategori & skill** | CRUD kategori dan skill, ikon, urutan              | Skill terhubung ke kategori yang valid                                    |
| **Proyek**           | CRUD, draft/publish, slug, status demo, featured   | Slug unik; validasi URL; konfirmasi sebelum hapus                         |
| **Galeri proyek**    | Unggah, beri caption/alt, urutkan, hapus           | Validasi file; jangan hapus media yang masih terpakai tanpa konfirmasi    |
| **Teknologi**        | CRUD daftar teknologi dan relasi proyek            | Nama teknologi dapat digunakan ulang antarproyek                          |
| **Pesan kontak**     | Baca detail, ubah status, cari/filter, arsip/hapus | Akses hanya untuk admin; penghapusan memakai konfirmasi                   |
| **Pengaturan situs** | Nama situs, navigasi, footer, sosial, metadata     | Validasi URL dan pembatasan field agar layout konsisten                   |

## 6.4 Pengelolaan media

- Jenis: foto profil, cover, screenshot proyek, logo, dan dokumen CV.

- Validasi tipe file berdasarkan isi/format yang diizinkan serta batas
  ukuran; jangan mengandalkan ekstensi saja.

- Nama file yang disimpan harus unik dan aman. File upload tidak boleh
  dapat dieksekusi sebagai kode.

- Optimalkan gambar dan gunakan ukuran responsif; thumbnail atau
  konversi format dapat dilakukan server-side/layanan media.

- Simpan metadata media yang diperlukan dan periksa referensi sebelum
  menghapus file.

- Gunakan penyimpanan persisten atau object storage agar file tidak
  hilang akibat redeploy server.

# 7. Aturan Bisnis dan Kebutuhan Fungsional

## 7.1 Status proyek harus dipisahkan

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><p><strong>Aturan penting</strong></p>
<p>Status publikasi dan status demo adalah dua hal berbeda. Proyek dapat
dipublikasikan tetapi tidak memiliki demo aktif; sebaliknya, proyek
berstatus demo online tetap tidak boleh tampil jika masih berstatus
draft.</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

| **Dimensi**            | **Nilai**     | **Makna**                                                                          |
|------------------------|---------------|------------------------------------------------------------------------------------|
| **Publication status** | DRAFT         | Hanya dapat dilihat oleh admin yang berwenang; tidak muncul di API publik.         |
| **Publication status** | PUBLISHED     | Boleh ditampilkan jika field visibilitas lain memenuhi syarat.                     |
| **Demo status**        | ONLINE        | Admin menyatakan demo siap diakses; tetap perlu URL yang valid.                    |
| **Demo status**        | OFFLINE       | Demo tidak ditawarkan sebagai tautan aktif.                                        |
| **Demo status**        | MAINTENANCE   | Demo sedang diperbaiki; link aktif disembunyikan atau label informasi ditampilkan. |
| **Demo status**        | NOT_AVAILABLE | Tidak tersedia demo publik.                                                        |

## 7.2 Aturan tombol Live Demo

- Tombol Live Demo hanya ditampilkan jika publication_status =
  PUBLISHED, demo_status = ONLINE, dan live_url terisi serta lolos
  validasi URL.

- Bila proyek offline, maintenance, atau not available, tidak ada tautan
  demo aktif yang ditampilkan.

- Jika admin memilih ONLINE tanpa URL, frontend admin menampilkan
  validasi/peringatan dan backend tidak boleh menyimpan konfigurasi
  tidak konsisten.

- Status online merupakan deklarasi admin; tidak menjamin situs
  eksternal selalu tersedia. Pemeriksaan otomatis adalah fitur lanjutan.

- Tautan eksternal dibuka dengan perlindungan yang sesuai, misalnya
  rel="noopener noreferrer" ketika menggunakan target tab baru.

## 7.3 Prioritas kebutuhan fungsional

| **ID**     | **Kebutuhan**                                                               | **Prioritas** |
|------------|-----------------------------------------------------------------------------|---------------|
| **FR-001** | Halaman publik dapat dibuka tanpa login                                     | Must          |
| **FR-002** | Menampilkan profil, foto, pendidikan, pengalaman, dan skill dari API        | Must          |
| **FR-003** | Menampilkan daftar proyek dan halaman detail tiap proyek                    | Must          |
| **FR-004** | Mendukung banyak gambar, caption, alt text, fitur, dan teknologi per proyek | Must          |
| **FR-005** | Menerapkan aturan status publikasi dan tombol Live Demo                     | Must          |
| **FR-006** | Admin dapat login/logout dan akses admin terproteksi                        | Must          |
| **FR-007** | Admin dapat CRUD konten utama serta mengatur visibilitas/urutan             | Must          |
| **FR-008** | Admin dapat mengunggah dan mengelola media secara aman                      | Must          |
| **FR-009** | Contact form memvalidasi dan menyimpan pesan melalui backend                | Must          |
| **FR-010** | Admin dapat melihat, memfilter, dan mengubah status pesan                   | Must          |
| **FR-011** | Admin dapat mengubah pengaturan situs, navigasi, footer, dan tautan sosial  | Must          |
| **FR-012** | Layout adaptif untuk desktop, tablet, dan mobile                            | Must          |
| **FR-013** | Metadata SEO dasar dan Open Graph                                           | Should        |
| **FR-014** | Filter proyek berdasarkan kategori/teknologi                                | Should        |
| **FR-015** | Email notifikasi pesan baru                                                 | Should        |
| **FR-016** | Pemeriksaan otomatis ketersediaan link demo                                 | Could         |
| **FR-017** | Blog, multi-admin, multi-bahasa, dan analitik lanjutan                      | Future        |

Prioritas: Must = wajib untuk rilis MVP; Should = sasaran setelah fitur
inti stabil atau bagian dari penyelesaian kualitas; Could/Future = dapat
ditunda tanpa menghalangi MVP.

# 8. Arsitektur, Stack, dan API

## 8.1 Stack yang direkomendasikan

| **Lapisan**        | **Teknologi**                                | **Tanggung jawab**                                       |
|--------------------|----------------------------------------------|----------------------------------------------------------|
| **Frontend**       | React + TypeScript + Vite                    | UI publik dan admin; form, routing, state, responsivitas |
| **Styling**        | Tailwind CSS atau CSS Modules                | Design system, layout, komponen responsif                |
| **Routing**        | React Router                                 | Navigasi /, /projects/:slug, /admin/\*                   |
| **Backend**        | Node.js + Express                            | REST API, autentikasi, validasi, aturan bisnis           |
| **Database**       | MySQL                                        | Penyimpanan data terstruktur dan relasional              |
| **Database layer** | Prisma ORM atau driver MySQL                 | Query aman, model data, migrasi                          |
| **Validation**     | Zod atau validator setara                    | Validasi request dan kontrak data                        |
| **Media storage**  | Object storage / media service               | Gambar dan dokumen persisten                             |
| **Deployment**     | Hosting frontend + backend + MySQL terkelola | Build, environment variables, HTTPS, backup              |

TypeScript direkomendasikan untuk mengurangi kesalahan tipe pada
frontend dan backend, tetapi JavaScript tetap memungkinkan. ORM bukan
kewajiban mutlak; bila menggunakan driver langsung, semua query harus
diparameterisasi.

## 8.2 Prinsip arsitektur

- Frontend tidak pernah berisi kredensial MySQL dan tidak mengakses
  MySQL secara langsung.

- Backend adalah boundary keamanan untuk autentikasi, validasi,
  otorisasi, dan aturan publikasi.

- Endpoint publik hanya mengembalikan data yang ditujukan untuk publik;
  draft dan pesan kontak tidak ikut terekspos.

- Migrasi database disimpan dalam version control dan dijalankan secara
  terkendali.

- Konfigurasi rahasia disimpan di environment/secrets manager, bukan
  hardcoded di source code.

- Frontend dan backend boleh di-deploy terpisah selama CORS,
  cookies/session, dan HTTPS dikonfigurasi aman.

## 8.3 Gambaran aliran data

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Browser (React)</p>
<p>| HTTPS / REST JSON</p>
<p>v</p>
<p>Backend API (Node.js + Express)</p>
<p>| autentikasi, validasi, business rules</p>
<p>v</p>
<p>MySQL &lt;----&gt; Media/Object Storage</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

## 8.4 Public API (rancangan awal)

| **Method** | **Endpoint**        | **Tujuan**                        |
|------------|---------------------|-----------------------------------|
| **GET**    | /api/profile        | Profil publik                     |
| **GET**    | /api/educations     | Pendidikan yang terlihat          |
| **GET**    | /api/experiences    | Pengalaman yang terlihat          |
| **GET**    | /api/skills         | Skill dan kategori aktif          |
| **GET**    | /api/projects       | Daftar proyek published           |
| **GET**    | /api/projects/:slug | Detail proyek published           |
| **GET**    | /api/site-settings  | Pengaturan yang aman untuk publik |
| **GET**    | /api/social-links   | Link sosial aktif                 |
| **POST**   | /api/contact        | Menyimpan pesan contact form      |

## 8.5 Admin API (contoh rancangan)

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><p>POST /api/admin/auth/login</p>
<p>POST /api/admin/auth/logout</p>
<p>GET /api/admin/dashboard</p>
<p>GET/PUT /api/admin/profile</p>
<p>POST/PUT/DELETE /api/admin/projects[/:id]</p>
<p>POST /api/admin/projects/:id/images</p>
<p>GET/PATCH /api/admin/messages[/:id]</p>
<p>GET/PUT /api/admin/site-settings</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Endpoint CRUD yang setara dibuat untuk pendidikan, pengalaman,
kategori/skill, teknologi, dan tautan sosial. Semua endpoint admin
memerlukan autentikasi dan validasi input di backend.

## 8.6 Standar respons API

- Gunakan HTTP status code yang sesuai (2xx sukses, 4xx validasi/akses,
  5xx kesalahan server).

- Gunakan bentuk respons yang konsisten; jangan mengirim stack trace
  atau detail SQL ke client.

- Validasi field wajib, batas panjang, format URL, enum status, dan
  referensi relasi.

- Untuk daftar yang panjang, dukung pagination dan filter pada sisi
  backend.

- Operasi terkait lintas tabel dijalankan dalam transaksi saat
  diperlukan.

# 9. Model Data MySQL

Model berikut merupakan skema awal untuk MVP. Nama field dapat
diselaraskan dengan konvensi implementasi. Semua tabel inti menggunakan
primary key; relasi diberi foreign key, unique constraint, dan indeks
sesuai kebutuhan query.

## 9.1 Tabel dan field utama

| **Tabel**                | **Field utama**                                                                                                                                                                                                                                         | **Catatan**                                            |
|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|
| **admin_users**          | id, name, email, password_hash, created_at, updated_at, last_login_at                                                                                                                                                                                   | email unik; password disimpan sebagai hash             |
| **profile**              | id, full_name, headline, short_bio, about_content, profile_image, cv_url, public_email, created_at, updated_at                                                                                                                                          | satu profil aktif pada MVP                             |
| **educations**           | id, institution, degree, field_of_study, start_date, end_date, is_current, description, logo_url, sort_order, is_visible                                                                                                                                | date akhir boleh null bila masih berjalan              |
| **experiences**          | id, organization, position, experience_type, start_date, end_date, is_current, description, achievements, logo_url, sort_order, is_visible                                                                                                              | tipe seperti work, internship, freelance, organization |
| **skill_categories**     | id, name, description, sort_order, is_visible                                                                                                                                                                                                           | kategori skill                                         |
| **skills**               | id, category_id, name, icon_url, description, proficiency_level, sort_order, is_visible                                                                                                                                                                 | category_id FK ke skill_categories                     |
| **projects**             | id, title, slug, short_description, cover_image, overview, problem_statement, objectives, role, results, technical_challenges, live_url, repository_url, demo_status, publication_status, is_featured, published_at, sort_order, created_at, updated_at | slug unik; status menggunakan enum yang divalidasi     |
| **project_images**       | id, project_id, image_url, caption, alt_text, sort_order, created_at                                                                                                                                                                                    | FK ke projects                                         |
| **project_features**     | id, project_id, title, description, sort_order                                                                                                                                                                                                          | banyak fitur per proyek                                |
| **technologies**         | id, name, icon_url                                                                                                                                                                                                                                      | teknologi dapat digunakan ulang                        |
| **project_technologies** | project_id, technology_id                                                                                                                                                                                                                               | tabel penghubung many-to-many                          |
| **contact_messages**     | id, sender_name, sender_email, subject, message, status, created_at, updated_at                                                                                                                                                                         | status NEW, READ, REPLIED, ARCHIVED                    |
| **site_settings**        | id, setting_key, setting_value, updated_at                                                                                                                                                                                                              | setting_key unik; value dapat berupa teks atau JSON    |
| **social_links**         | id, platform, label, url, sort_order, is_visible                                                                                                                                                                                                        | validasi URL dan visibilitas                           |

## 9.2 Relasi inti

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><p>skill_categories 1 ---- * skills</p>
<p>projects 1 ---- * project_images</p>
<p>projects 1 ---- * project_features</p>
<p>projects * ---- * technologies (via project_technologies)</p>
<p>admin_users (auth owner; tidak terkait ke konten satu per satu pada
MVP)</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

# 10. Kebutuhan Nonfungsional dan Keamanan

## 10.1 Keamanan

| **Area**                   | **Persyaratan minimum**                                                                                |
|----------------------------|--------------------------------------------------------------------------------------------------------|
| **Password**               | Hash dengan algoritme password hashing yang sesuai; tidak disimpan sebagai teks biasa.                 |
| **Authentication**         | Semua rute admin dan endpoint sensitif dilindungi di backend.                                          |
| **Database**               | MySQL tidak dibuka secara bebas ke internet; aplikasi memakai user dengan hak minimum.                 |
| **SQL injection**          | Gunakan ORM atau prepared/parameterized queries.                                                       |
| **XSS / konten rich text** | Escape output teks dan sanitasi HTML sesuai kebutuhan.                                                 |
| **CSRF / session**         | Jika menggunakan cookie-based auth, atur SameSite, Secure, HttpOnly dan perlindungan CSRF yang sesuai. |
| **Rate limiting**          | Terapkan pada login dan contact endpoint.                                                              |
| **Upload**                 | Validasi tipe/ukuran, nama file aman, dan penyimpanan yang tidak mengeksekusi file.                    |
| **Secret**                 | API key, database password, cookie secret berada di environment/secrets manager.                       |
| **HTTPS**                  | Wajib untuk lingkungan produksi.                                                                       |
| **Privasi pesan**          | Pesan hanya tersedia bagi admin yang terautentikasi; log tidak memuat isi sensitif secara tidak perlu. |

## 10.2 Performa

- Gunakan gambar yang dikompresi dan ukuran responsif, dengan lazy
  loading pada gambar di luar viewport.

- Hindari memuat semua gambar dokumentasi resolusi penuh pada daftar
  proyek.

- Gunakan pagination untuk daftar yang panjang dan indeks database untuk
  filter yang sering digunakan.

- API harus mempunyai penanganan error dan timeout yang wajar.

- Ukur Core Web Vitals setelah deployment pada kondisi
  perangkat/jaringan nyata; target angka final ditetapkan setelah
  baseline tersedia.

## 10.3 Responsivitas dan aksesibilitas

- Tidak ada horizontal overflow pada viewport umum desktop, tablet, dan
  mobile.

- Navigasi, form, dialog, dan aksi utama dapat digunakan melalui
  keyboard.

- Setiap input memiliki label; error ditampilkan dekat field terkait.

- Gambar informatif memiliki alt text; gambar dekoratif memakai alt
  kosong bila sesuai.

- Kontras warna memadai dan status tidak dibedakan hanya menggunakan
  warna.

- Gunakan heading semantik dan urutan fokus yang masuk akal.

## 10.4 SEO dan rendering

- Tiap halaman memiliki title dan meta description yang relevan.

- Halaman proyek mempunyai slug, Open Graph metadata, dan alt text
  gambar.

- Sitemap dan robots.txt dipertimbangkan saat deployment.

# 11. Kriteria Penerimaan dan Pengujian

Fitur dianggap selesai jika skenario yang relevan lulus pada lingkungan
uji. Pengujian minimum mencakup perilaku normal, validasi, akses tanpa
izin, serta tampilan responsif.

## 11.1 Halaman publik

- Pengunjung dapat membuka website tanpa login dan melihat data yang
  telah dipublikasikan.

- Foto/nama/profil serta daftar pendidikan, pengalaman, dan skill cocok
  dengan data yang tersimpan.

- Proyek published tampil; draft tidak muncul pada daftar maupun detail
  publik.

- Setiap proyek memiliki halaman detail dengan fitur, teknologi, dan
  gambar sesuai data admin.

- Tombol Live Demo hanya muncul jika status publikasi published, demo
  online, dan URL valid tersedia.

- Layout dapat digunakan pada ukuran layar mobile dan desktop tanpa
  konten terpotong.

## 11.2 Admin panel

- Login dengan kredensial valid berhasil; kredensial salah ditolak
  dengan pesan yang tidak membocorkan detail sensitif.

- Pengguna tanpa autentikasi tidak dapat mengakses API admin meskipun
  memanggil endpoint secara langsung.

- Admin dapat membuat, membaca, memperbarui, menghapus, mengurutkan, dan
  mengatur visibilitas setiap modul utama.

- Admin dapat menyimpan proyek sebagai draft lalu memublikasikannya
  setelah konten siap.

- Admin dapat mengunggah gambar dengan tipe/ukuran valid dan sistem
  menolak file yang tidak diizinkan.

- Aksi hapus memerlukan konfirmasi, dan relasi data yang terkait
  ditangani secara konsisten.

## 11.3 Contact form

- Field wajib kosong atau format email tidak valid ditolak.

- Pesan valid berhasil disimpan ke database dan menghasilkan konfirmasi
  untuk pengunjung.

- Pengiriman berulang yang terlalu cepat dibatasi atau ditangani
  sehingga tidak menghasilkan duplikasi yang tidak diinginkan.

- Pesan tidak tersedia pada halaman publik dan hanya dapat dikelola
  melalui admin.

- Admin dapat membuka pesan dan mengubah statusnya.

## 11.4 Keamanan dan operasi

- Bundle frontend tidak mengandung password database atau secret
  backend.

- Input konten tidak dapat menjalankan script berbahaya pada halaman
  publik.

- Kredensial tidak tampil di log/error response.

- Backup database berhasil dibuat dan pemulihan diuji pada lingkungan
  yang sesuai.

- Tidak ada defect kritis pada alur utama setelah regression test.

# 12. Tahapan Implementasi, Risiko, dan Definition of Done

## 12.1 Tahapan implementasi

| **Tahap**               | **Aktivitas**                                                                              | **Output**                                     |
|-------------------------|--------------------------------------------------------------------------------------------|------------------------------------------------|
| **1. Fondasi**          | Finalisasi wireframe, setup React/TypeScript, backend Express, MySQL, migrasi, auth dasar  | Struktur aplikasi dan skema awal berfungsi     |
| **2. Public pages**     | Navbar, hero, profil, pendidikan, pengalaman, skills, project list/detail, contact, footer | Halaman publik dapat menampilkan data dari API |
| **3. Admin CMS**        | Dashboard, CRUD setiap modul, upload, draft/publish, status demo, pesan, setting           | Konten utama dapat dikelola melalui admin      |
| **4. Hardening**        | Validasi, rate limit, keamanan upload, SEO, responsivitas, QA, backup                      | MVP siap deploy dan diuji                      |
| **5. Iterasi lanjutan** | Notifikasi email, filter, monitor demo, blog, analitik, multi-bahasa jika dibutuhkan       | Fitur tambahan berdasarkan penggunaan nyata    |

## 12.2 Risiko dan mitigasi

| **Risiko**                                             | **Mitigasi**                                                                    |
|--------------------------------------------------------|---------------------------------------------------------------------------------|
| **Gambar besar memperlambat halaman**                  | Kompresi, lazy loading, ukuran responsif, thumbnail untuk kartu                 |
| **Demo berubah/offline setelah status disetel online** | Status dapat diubah manual; monitoring otomatis ditunda ke fase lanjutan        |
| **Admin atau endpoint disalahgunakan**                 | Autentikasi server-side, password hash, rate limiting, HTTPS, hak akses minimum |
| **Spam contact form**                                  | Validasi backend, rate limit, honeypot/CAPTCHA sesuai kebutuhan                 |
| **Data hilang saat server bermasalah**                 | Backup database, storage persisten, dan restore test                            |
| **Isi proyek terlalu berbeda antar proyek**            | Gunakan field terstruktur dan bagian opsional yang konsisten                    |
| **Perubahan schema memecahkan aplikasi**               | Migrasi versioned, staging, dan regression test                                 |
| **Slug berubah dan link lama rusak**                   | Slug unik, peringatan admin, serta redirect bila diperlukan                     |

## 12.3 Definition of Done

- Semua fitur Must pada PRD telah diimplementasikan.

- Acceptance criteria utama lulus pada lingkungan uji.

- Halaman publik menggunakan data backend/MySQL; admin dapat mengubah
  konten tanpa mengedit source code.

- Status publikasi proyek, status demo, dan syarat tombol Live Demo
  berfungsi sesuai aturan.

- Contact form menyimpan data dan admin dapat mengelola pesan.

- Layout diuji pada desktop dan mobile; tidak ada masalah keamanan
  kritis yang diketahui.

- Environment variables, migrasi database, proses deployment, backup,
  dan restore terdokumentasi.

- Ada README atau dokumentasi teknis untuk setup lokal dan deployment.

## 12.4 Keputusan teknis yang perlu ditetapkan saat kickoff

| **Keputusan**         | **Rekomendasi awal**                                                                                                                          |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| **Autentikasi**       | Untuk satu admin, gunakan session cookie aman atau strategi token yang dirancang dengan benar; tetapkan setelah pilihan deployment diketahui. |
| **ORM**               | Prisma untuk migrasi dan akses data yang konsisten, kecuali ada kebutuhan khusus yang memilih driver MySQL langsung.                          |
| **Rich text**         | MVP memakai field terstruktur dan deskripsi sederhana; tambah rich text editor jika kebutuhan konten menuntutnya.                             |
| **Email notifikasi**  | Prioritaskan setelah contact form stabil; butuh provider email dan konfigurasi pengirim.                                                      |
| **Penyimpanan media** | Pilih layanan persisten/object storage sesuai anggaran dan platform hosting.                                                                  |
| **SEO rendering**     | Mulai dengan metadata dasar; evaluasi prerendering/SSR jika SEO organik menjadi sasaran besar.                                                |

# Lampiran A. Glosarium

| **Istilah**             | **Definisi**                                                                      |
|-------------------------|-----------------------------------------------------------------------------------|
| **Admin panel**         | Antarmuka privat untuk mengelola isi website.                                     |
| **CMS**                 | Content Management System; sistem untuk membuat dan memperbarui konten.           |
| **CRUD**                | Create, Read, Update, Delete.                                                     |
| **REST API**            | Antarmuka HTTP yang menghubungkan frontend dan backend.                           |
| **Slug**                | Bagian URL yang mudah dibaca, misalnya /projects/nama-proyek.                     |
| **Draft**               | Konten yang disimpan tetapi belum dipublikasikan.                                 |
| **Published**           | Konten yang boleh tampil di halaman publik.                                       |
| **Object storage**      | Layanan penyimpanan file/media yang terpisah dari database.                       |
| **Acceptance criteria** | Kondisi yang harus terpenuhi agar fitur dinyatakan dapat diterima.                |
| **MVP**                 | Minimum Viable Product; rilis awal dengan fitur inti yang benar-benar diperlukan. |

# Penutup

PRD ini menjadi acuan kebutuhan produk untuk website portofolio pribadi
dengan admin panel. Pelaksanaan sebaiknya dimulai dari wireframe halaman
publik dan admin, dilanjutkan ERD final MySQL, spesifikasi endpoint,
lalu implementasi bertahap sesuai prioritas. Perubahan ruang lingkup
setelah tahap implementasi dimulai sebaiknya dicatat sebagai revisi agar
kebutuhan, desain, dan pengujian tetap selaras.

Urutan kerja yang direkomendasikan: wireframe UI/UX → ERD MySQL → API
specification → struktur folder proyek → implementasi MVP → pengujian
acceptance criteria → deployment.
