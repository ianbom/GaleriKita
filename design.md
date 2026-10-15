# GaleriKita Design System

Panduan wajib untuk membuat, mengubah, dan meninjau frontend GaleriKita.
Identitas visual bersumber dari `resources/js/pages/welcome.tsx`, komponen di
`resources/js/components/galerikita/`, dan `resources/css/app.css`.
Dokumen ini tidak mengubah frontend atau kebijakan produk.

## 1. Cara Menggunakan

- Gunakan token dan komponen aktif sebelum menambahkan pola baru.
- Landing adalah referensi identitas, bukan layout wajib semua halaman.
- Pertahankan struktur khusus admin, autentikasi, pengaturan, dan wizard Host.
- Bagian **Aktual** mendeskripsikan implementasi saat dokumentasi dibuat.
  **Aturan penerapan** menetapkan batas penggunaan dan pengembangan; bukan
  klaim bahwa semua halaman sudah memenuhi aturan tersebut.
- Bila dokumen dan source berbeda, periksa perubahan terbaru. Jangan diam-diam
  mengembalikan perubahan desain yang sengaja dibuat pengguna.
- Kontrak bisnis tetap mengacu pada `GaleriKita_Alur_Host_dan_Fotografer.md`.

## 2. Karakter Visual

**Aktual:** gelap, editorial, berorientasi fotografi; latar hampir hitam, teks
putih hangat, aksen lime, judul serif ekspresif, dan kolase cetak foto.
Surface gelap berlapis membedakan konten tanpa warna mencolok.

**Aturan penerapan:**

- Utamakan foto, keterbacaan, hierarki, dan ruang bernapas.
- Lime menandai aksi utama, fokus, atau penekanan singkat; bukan semua panel.
- Gunakan serif sebagai aksen editorial, bukan default tabel dan field input.
- Hindari dekorasi, gradient, shadow, atau animasi tambahan tanpa fungsi jelas.
- Jangan menyalin kolase, hero besar, dan mockup ke setiap layar.
- Jangan menambahkan tema terang atau pemilih Light/Dark/System tanpa permintaan.

## 3. Token Warna dan Surface

**Aktual:** token global berada di `resources/css/app.css`; blok `@theme`
memetakannya ke utility Tailwind. Gunakan `bg-background`, `text-foreground`,
`bg-card`, `text-muted-foreground`, `border-border`, dan pasangan semantiknya.

| Token                                             | Nilai                       | Peran                           |
| ------------------------------------------------- | --------------------------- | ------------------------------- |
| `background`                                      | `#09090b`                   | Latar utama                     |
| `foreground`                                      | `#f5f4ef`                   | Teks utama                      |
| `card`, `popover`, `muted`                        | `#141416`                   | Surface panel dan lapisan redup |
| `card-foreground`, `popover-foreground`           | `#f5f4ef`                   | Teks pada panel                 |
| `primary`, `accent`, `ring`                       | `#ddf76a`                   | Aksi, aksen, fokus              |
| `primary-foreground`, `accent-foreground`         | `#171b08`                   | Teks pada lime                  |
| `secondary`                                       | `#222225`                   | Surface sekunder                |
| `secondary-foreground`                            | `#f5f4ef`                   | Teks pada surface sekunder      |
| `muted-foreground`                                | `#b1b1b8`                   | Deskripsi dan metadata          |
| `border`, `input`                                 | `#29292d`                   | Garis batas dan token input     |
| `destructive`                                     | `oklch(0.577 0.245 27.325)` | Aksi destruktif dan error       |
| `destructive-foreground`                          | `#f5f4ef`                   | Teks pada surface destruktif    |
| `chart-1`                                         | `#ddf76a`                   | Seri grafik 1                   |
| `chart-2`                                         | `#cbe85a`                   | Seri grafik 2                   |
| `chart-3`                                         | `#afbf52`                   | Seri grafik 3                   |
| `chart-4`                                         | `#b1b1b8`                   | Seri grafik 4                   |
| `chart-5`                                         | `#73737b`                   | Seri grafik 5                   |
| `sidebar`                                         | `#141416`                   | Surface sidebar                 |
| `sidebar-foreground`, `sidebar-accent-foreground` | `#f5f4ef`                   | Teks sidebar                    |
| `sidebar-primary`, `sidebar-ring`                 | `#ddf76a`                   | Aksi dan fokus sidebar          |
| `sidebar-primary-foreground`                      | `#171b08`                   | Teks pada aksi sidebar          |
| `sidebar-accent`                                  | `#222225`                   | Surface aksen sidebar           |
| `sidebar-border`                                  | `#29292d`                   | Border sidebar                  |

**Aturan penerapan:**

- Gunakan pasangan foreground/surface yang benar; teks putih bukan pasangan
  default untuk tombol lime.
- Utamakan token; warna literal ilustrasi tidak otomatis menjadi token baru.
- Jangan memakai warna chart sebagai status sukses/peringatan tanpa definisi
  semantik dan label. Tidak ada token sukses/peringatan baru ditetapkan di sini.
- Pertahankan gradient gelap dan glow radial landing secara subtil. Jangan
  menyebarkannya ke semua halaman atau membuat gradient dominan.
- Border memisahkan panel; shadow untuk elevasi terbatas, bukan semua kontainer.

### Radius, garis, dan kontrol

**Aktual:** `--radius: 0.625rem`; `lg` menggunakan radius dasar, `md` adalah
radius dasar dikurangi `2px`, `sm` dikurangi `4px`. Tombol UI shadcn memakai
`rounded-md`, ukuran dasar tinggi `36px`, small `32px`, large `40px`, ikon `36px`.
Landing CTA memakai bentuk pill dan tinggi dasar `54px`; breakpoint/varian
dapat memendekkan CTA mobile. Form dan kartu tertentu memiliki ukuran khusus.

**Aturan penerapan:** gunakan radius token/varian komponen UI untuk kontrol
biasa. Pertahankan bentuk pill untuk CTA publik bila sesuai konteks. Jangan
mengubah radius atau tinggi komponen global untuk menyamai satu ilustrasi.

## 4. Tipografi

**Aktual:** `font-sans` adalah **Plus Jakarta Sans**; `font-serif` adalah
**Instrument Serif**. Vite menyediakan Jakarta bobot 400/500/600/700/800 dan
Instrument Serif 400 normal/italic. Instrument Sans juga dimuat, tetapi bukan
font default token `font-sans`. Font diproses melalui konfigurasi proyek.

| Peran landing           | Desktop                                      | Mobile / penyesuaian                                   |
| ----------------------- | -------------------------------------------- | ------------------------------------------------------ |
| Hero sans               | 100px, bold, line-height 0.98, tracking -6px | `clamp(59px, 10vw, 83px)`; ukuran menengah 84px/70px   |
| Hero serif italic       | 126px, normal, line-height 0.97              | `clamp(70px, 12vw, 100px)`; ukuran menengah 100px/84px |
| Heading section dasar   | 70px, serif normal, line-height 0.9          | 56px pada 769-1100px; 49px pada mobile                 |
| Eyebrow dasar           | 12px, bold, tracking 2px                     | 10px, tracking 1.6px                                   |
| Deskripsi section dasar | 18px, line-height 1.45                       | 15px                                                   |
| Body wrapper landing    | 16px, sans, line-height 1.45                 | Penyesuaian per komponen                               |
| Brand navbar            | 27px, semibold, tracking -1px                | 23px                                                   |

Angka ini referensi komponen dasar, bukan skala universal. Harga, FAQ, footer,
dan komposisi tertentu memiliki override yang perlu dipertahankan.

**Aturan penerapan:** satu `h1` utama, heading bertingkat secara semantik,
body sans yang terbaca, dan metadata muted. Serif/italic untuk penekanan singkat;
jangan jadikan paragraf panjang uppercase atau memakai display hero di form.
Teks UI baru gunakan ukuran komponen sejenis; jangan mengecilkan teks penting
untuk menghindari pembenahan layout.

## 5. Layout dan Komposisi

**Aktual:** landing memakai container maksimum sekitar `1312px`, margin sisi
`64px` pada layar lebar, `40px` pada rentang menengah, dan `20px` pada mobile.
Urutan konten: navbar sticky, hero kolase, cara kerja, fitur, galeri komunitas,
kategori, harga, FAQ, CTA penutup, footer. Jarak section lapang di desktop,
lebih rapat di mobile. Bento dan mockup berlapis memperagakan produk.

Wrapper main landing memakai `space-y-32` (128px), berubah menjadi `space-y-48`
(192px) pada `md`. Padding bawahnya 96px, naik menjadi 128px pada `md`.
Harga/FAQ memiliki penyesuaian jarak sendiri. Ini bukan kewajiban spacing
antarfield form. Gunakan skala spacing Tailwind yang tersedia; arbitrary value
diperbolehkan untuk mempertahankan komposisi khusus yang sudah ada.

**Aturan penerapan:**

- Gunakan container responsif dan ritme konsisten yang sesuai kebutuhan halaman;
  angka landing adalah baseline, bukan ukuran wajib semua shell.
- Kelompokkan heading, deskripsi, visual, dan aksi. Prioritaskan keterbacaan
  sebelum dekorasi atau kepadatan.
- Bento, kolase, dan mockup bukan layout default untuk tabel, admin, atau form.
- Pada layar kecil, susun ulang kolom, rapikan dekorasi, pertahankan konten,
  kontrol, dan urutan baca. Jangan sembunyikan informasi untuk mengatasi overflow.
- Hindari border bertumpuk, shadow besar, dan kartu berulang tanpa hierarki.

## 6. Komponen

### Navigasi

- Navbar publik sticky menampilkan brand, navigasi section, autentikasi/dashboard,
  dan CTA Buat Event. Pada mobile, link digantikan drawer.
- Drawer memakai primitive Sheet, memiliki nama aksesibel, dan tetap dapat
  ditutup melalui perilaku keyboard yang didukung komponen.
- Footer memisahkan deskripsi brand, statement editorial, tautan, dan sosial.
  Tujuan yang belum tersedia tidak boleh tampil seolah-olah tautan aktif.
- Layout admin memiliki sidebar/header sendiri; pertahankan pola tersebut,
  bukan navbar landing.

### Tombol dan aksi

- Aksi utama publik memakai lime, teks `primary-foreground`, bentuk pill,
  bobot kuat, dan tinggi target sentuh memadai.
- Aksi sekunder memakai outline/ghost. Buat hierarki primer-sekunder jelas.
- Gunakan `Button` atau `EventLink` yang ada bila sesuai. Pertahankan hover,
  focus-visible, disabled, loading, dan error pada aksi yang mengubah data.
- Tombol ikon memerlukan nama aksesibel; ikon dekoratif disembunyikan dari
  pembaca layar.

### Kartu, form, dan data

- Gunakan komponen UI yang ada (`Card`, input, dialog, sheet, dan lainnya) serta
  token semantik untuk surface, border, dan ring.
- Pilihan kategori/paket harus punya state pilihan yang tidak bergantung pada
  warna saja dan menjelaskan konsekuensi pilihan.
- Form memiliki label terhubung ke field, instruksi seperlunya, error di dekat
  field, dan indikator required yang jelas. Placeholder bukan pengganti label.
- Tabel dan data padat admin mengikuti pola admin. Jangan menerapkan jarak atau
  dekorasi landing yang mengurangi kapasitas informasi.

### FAQ dan kontrol kapasitas

- FAQ memakai tombol pertanyaan dengan `aria-expanded`, `aria-controls`, dan
  region jawaban berlabel. Pertahankan indikator buka/tutup dan fokus keyboard.
- Kontrol kuantitas menggunakan tombol tambah/kurang berlabel dan nilai output;
  tombol batas menjadi disabled. Tampilkan keterkaitan pilihan dan hasil hitung
  secara terbaca, bukan hanya angka dekoratif.
- Tampilan harga mengikuti data resmi. Nilai demo atau kalkulasi kapasitas tidak
  boleh berubah menjadi janji tarif karena dicantumkan di desain.

### State yang wajib dipertimbangkan

**Aturan penerapan untuk fitur yang relevan, bukan klaim implementasi saat ini:**

- Loading: beri indikator/proses berlabel; cegah submit ganda tanpa menghilangkan
  konteks atau input yang sudah diisi.
- Kosong: jelaskan keadaan dan langkah berikutnya; jangan menampilkan statistik
  fiktif sebagai pengisi.
- Error: tampilkan pesan yang membantu pemulihan, pertahankan input aman, dan
  arahkan fokus ke error bila diperlukan.
- Berhasil: beri konfirmasi yang jelas, jangan bergantung pada warna saja.
- Disabled: jelaskan penyebab bila tidak jelas; jangan samarkan sebagai aksi aktif.
- Destruktif: gunakan varian destruktif dan konfirmasi yang sesuai konsekuensi.
- Selected/active: sertakan indikator semantik, bukan sekadar pergantian warna.

### Foto dan ilustrasi

- Foto adalah fokus visual; pertahankan rasio container, `object-cover`, dan
  atur object-position bila crop memotong subjek penting.
- Hero memakai frame foto miring/bertumpuk. Mockup produk, kamera, QR, dan
  perangkat adalah ilustrasi khusus konteks, bukan dekorasi global.
- Aset landing dipetakan melalui `resources/js/lib/galerikita-assets.ts`;
  simpan foto di `public/images/galerikita/` dan ganti per slot key.
- Prioritaskan loading gambar hero yang terlihat langsung; gambar di bawah
  lipatan menggunakan lazy loading sesuai pola komponen.
- Gambar bermakna butuh teks alternatif; gambar dekoratif tidak boleh
  menduplikasi informasi bagi pembaca layar.
- Tandai mockup/data demo dengan konteks yang tepat. Jangan tampilkan QR, angka,
  harga, atau integrasi ilustratif sebagai fitur/hasil backend aktif.

## 7. Responsivitas

Breakpoint eksplisit landing yang menjadi peta umum:

| Rentang         | Perilaku                                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `<= 768px`      | Link navbar desktop disembunyikan; gunakan drawer. Margin container sekitar `20px`; hero dan section menyesuaikan/beralih ke layout mobile. |
| `769px-1100px`  | Layout desktop dengan ukuran teks, jarak, dan proporsi kolom yang disesuaikan.                                                              |
| `1101px-1300px` | Margin container sekitar `40px` dan komposisi menengah.                                                                                     |
| `> 1300px`      | Container maksimum sekitar `1312px`, margin sekitar `64px`.                                                                                 |

Sebagian komponen memakai breakpoint tambahan (termasuk sekitar `550px`) dan
breakpoint standar Tailwind. Periksa implementasi sebelum mengubah breakpoint;
tabel ini bukan klaim bahwa semua komponen hanya memiliki empat variasi.

Uji pada lebar kecil, `390px`, sisi breakpoint `768px`/`769px`, menengah, serta
desktop `1440px`. Wizard yang ada juga diuji pada `320px`, `375px`, dan `430px`.
Pastikan tidak ada overflow horizontal tak disengaja atau kontrol tertutup pada
viewport pendek. Jangan menyelesaikan overflow dengan menyembunyikan konten.

## 8. Interaksi, Motion, Aksesibilitas

- Sediakan skip link, urutan heading semantik, landmark navigasi/main/footer,
  serta nama aksesibel untuk kontrol.
- Fokus keyboard harus terlihat (`focus-visible`); lime adalah ring global.
  Jangan hapus outline tanpa pengganti setara.
- Tautan/tombol bisa dioperasikan dengan keyboard. Drawer, dialog, accordion,
  dan form mengikuti primitive serta perilaku aksesibel yang tersedia.
- Jangan andalkan warna saja untuk status, pilihan, atau error; sertakan teks,
  ikon berlabel, atau indikator bentuk lain.
- Hormati `prefers-reduced-motion`; nonaktifkan motion/transisi non-esensial.
  Jangan menambah animasi yang mengganggu membaca atau menggunakan kontrol.
- Galeri berjalan adalah marquee dekoratif; jangan samarkan sebagai carousel
  interaktif. Pertahankan label region dan reduced-motion fallback.
- Muted text harus tetap terbaca di surface aktual. Sediakan target sentuh
  memadai dan pulihkan scroll halaman setelah drawer ditutup.
- Validasi kontras terhadap pasangan token pada state normal, hover, fokus,
  disabled, error, dan selected; jangan berasumsi token otomatis memenuhi
  kontras semua ukuran teks.

## 9. Penerapan dan Verifikasi

Saat membuat atau mengubah UI:

1. Periksa halaman, layout, komponen, token, dan interaksi sejenis yang sudah
   ada sebelum membuat pola baru.
2. Gunakan token semantik serta komponen aktif. Hindari nilai warna literal baru
   bila token yang sesuai tersedia.
3. Pertahankan perbedaan landing, autentikasi, admin, dan wizard Host. Catat
   pengecualian yang disengaja bila pola umum tidak sesuai.
4. Periksa responsive, overflow, menu, keyboard/fokus, reduced motion, foto,
   dan state penting pada browser bila memungkinkan.
5. Gunakan `tests/galerikita-browser.py` dan `tests/galerikita-visual.py` untuk
   landing bila relevan. Browser test landing mencakup berbagai lebar
   `320px-1440px`. Screenshot/build saja bukan verifikasi browser visual.

Untuk detail slot aset, batas mockup, dan pemeriksaan landing, lihat
`docs/galerikita-landing.md`. Untuk aturan dan status domain, lihat
`GaleriKita_Alur_Host_dan_Fotografer.md`. Panduan ini tidak menetapkan harga,
akses, atau kebijakan bisnis.
