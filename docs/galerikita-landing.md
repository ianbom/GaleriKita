# Landing page GaleriKita

Route `/` menggunakan halaman Inertia `welcome`. Komponen berada di
`resources/js/components/galerikita/`, styling memakai utility Tailwind langsung
di JSX. Satu stylesheet global: `resources/css/app.css`; tidak ada stylesheet
GaleriKita terpisah. Blok `@theme` dan token `:root` bawaan disesuaikan
menjadi satu palet global GaleriKita: latar `#09090b`, teks `#f5f4ef`, aksen
`#ddf76a`. Tidak ada tema tambahan, custom variant, atau pemilih Light/Dark/System.
Halaman auth/dashboard juga memakai palet global tersebut. URL lama
`/settings/appearance` mengarahkan pengguna terverifikasi ke profil; aksesnya
tetap dilindungi autentikasi dan verifikasi email.
Plus Jakarta Sans dan Instrument Serif dimuat melalui provider font Vite yang
sudah terpasang; build menyimpan font secara lokal.

Utility native Tailwind ditempatkan pada elemen yang ditata, bukan selector
CSS turunan. Arbitrary value mempertahankan ukuran, transform, dan gradasi asli.
Hint `bg-[image:...]` membedakan background-image dari warna; bukan deklarasi
arbitrary property. Arbitrary media variant langsung di JSX mempertahankan
rentang lama: 769-1100px, >1100-1300px, <550px, dan 550-768px. Tidak ada
variant responsif baru di stylesheet global. Class `gk-*` hanya penanda DOM
untuk identifikasi dan tes, bukan selector styling.

## Mengganti foto

Ubah URL setiap key di `resources/js/lib/galerikita-assets.ts`. Semua key awalnya
menggunakan `/images/galerikita/placeholders/photo-placeholder.svg`. Simpan foto
pengganti di `public/images/galerikita/`, lalu gunakan URL `/images/galerikita/...`.
Tidak perlu mengubah komponen. Setiap key adalah satu slot independen.
Container mempertahankan ukuran dan `object-fit: cover`; atur object-position
di komponen terkait jika subjek foto membutuhkan crop khusus.

| Grup         | Key                                                                   | Posisi                                                   |
| ------------ | --------------------------------------------------------------------- | -------------------------------------------------------- |
| `hero`       | `graduation`, `birthday`, `wedding`, `vacation`, `friends`, `extra`   | Enam frame collage hero                                  |
| `hero`       | `background`                                                          | Frame latar redup di belakang hero/cara kerja            |
| `hero`       | `avatar01`, `avatar02`, `avatar03`                                    | Avatar kartu Galeri Reuni                                |
| `how`        | `eventCover`, `eventDetail`                                           | Cover dan foto detail mockup Buat Event                  |
| `how`        | `camera`                                                              | Preview kamera langkah ketiga                            |
| `how`        | `gallery01` sampai `gallery06`                                        | Enam thumbnail mockup galeri, urutan baris kiri ke kanan |
| `features`   | `camera`                                                              | Preview kamera dalam bento                               |
| `features`   | `original`, `film`, `vivid`, `monochrome`                             | Empat thumbnail filter                                   |
| `features`   | `print01`, `print02`                                                  | Dua frame foto di samping kamera                         |
| `features`   | `timer01` sampai `timer06`                                            | Enam foto collage 24 Jam                                 |
| `features`   | `drive01` sampai `drive10`                                            | Sepuluh foto ilustrasi sinkronisasi Drive                |
| `gallery`    | `wedding`                                                             | Kolom pertama, foto besar                                |
| `gallery`    | `concert`, `couple`, `dinner`                                         | Kolom kedua: atas, bawah kiri, bawah kanan               |
| `gallery`    | `friends`, `picnic`, `sunset`                                         | Kolom ketiga: atas, bawah kiri, bawah kanan              |
| `gallery`    | `vacation`, `traveler`, `photographer`                                | Kolom keempat: atas, bawah kiri, bawah kanan             |
| `gallery`    | `graduation`                                                          | Kolom kelima, foto besar                                 |
| `categories` | `wedding`, `birthday`, `graduation`, `gathering`, `vacation`, `other` | Enam kartu kategori sesuai urutan referensi              |
| `closing`    | `left01` sampai `left04`, `right01` sampai `right04`                  | Delapan frame collage CTA penutup                        |

Total: 67 slot foto. Atribut `data-photo` pada setiap gambar menunjukkan key
konfigurasi, misalnya `features.drive03`. Foto, username, dan jumlah like di
galeri adalah konten demonstrasi, bukan bukti pengguna aktif.

## Integrasi yang belum tersedia

- Buat Event, kartu kategori, dan Lanjutkan: tamu menuju register; pengguna
  masuk menuju dashboard. Belum ada route pembuatan event.
- Kapasitas awal 50 x 100 = 5,000 foto. Kontrol minimum satu; konfigurasi hanya
  state frontend, tidak disimpan atau diteruskan ke dashboard/register.
- FAQ memakai aturan produk dalam `GaleriKita_Alur_Host_dan_Fotografer.md`.
- QR adalah ilustrasi tidak dapat dipindai. Kamera, join, privasi, filter, jam,
  dan Drive adalah mockup HTML/CSS/SVG, bukan fitur backend aktif.
- Panah fitur/galeri adalah elemen visual, bukan carousel.
- Legal dan media sosial nonaktif sampai tujuan resmi tersedia.
- Copyright 2025 mengikuti referensi, bukan tanggal implementasi.

## Pemeriksaan

```powershell
npm run types:check
npm run check
npm run build
php artisan test --filter=GaleriKita
php artisan serve --host=127.0.0.1 --port=8013
Get-Content tests/galerikita-browser.py -Raw | browser-harness
```

Browser check menggunakan Chrome melalui browser-harness. Laravel harus aktif;
gunakan build produksi tanpa Vite dev server untuk pemeriksaan akhir.
`GK_URL` dapat mengganti URL default. Script memeriksa struktur, FAQ, kapasitas
dan batas minimum, CTA tamu, menu/Escape, font, gambar, error browser, serta
overflow pada desktop, mobile, dan sisi breakpoint (18 ukuran). Login/register
juga diperiksa terhadap preferensi OS serta nilai appearance lama di cookie dan
localStorage: palet harus tetap sama. Screenshot full-page disimpan
di `storage/app/galerikita-qa/`. Tes Laravel memakai SQLite in-memory sesuai
`phpunit.xml`, bukan database aktif.

Tes regresi visual: ambil baseline dari versi sebelum migrasi, lalu bandingkan
dengan build setelah migrasi. Jangan merekam baseline dari versi yang sedang
diuji. Artefak baseline dan hasil tersimpan di `storage/app/galerikita-native-qa/`.
`GK_VISUAL_ROOT` dapat mengganti direktori artefak.

```powershell
$env:GK_VISUAL_MODE='capture'
$env:GK_URL='http://127.0.0.1:8014' # Server versi sebelum migrasi
Get-Content tests/galerikita-visual.py -Raw | browser-harness
Remove-Item Env:GK_VISUAL_MODE
$env:GK_URL='http://127.0.0.1:8013' # Server versi setelah migrasi
Get-Content tests/galerikita-visual.py -Raw | browser-harness
```

Tes mewajibkan geometry, teks, tinggi dokumen, serta seluruh pixel screenshot
identik pada 12 lebar (375, 390, 550, 768, 769, 1024, 1100, 1101, 1280,
1300, 1301, 1440px). Computed style dan pseudo-element disimpan untuk diagnosis,
tidak dibandingkan sebagai string: utility native dapat menambahkan lapisan
shadow transparan tanpa mengubah hasil render. Halaman auth tidak dibandingkan
dengan tema lamanya karena paletnya sengaja disatukan.

Desktop mengikuti kedua referensi; mobile adalah interpretasi responsif.
Placeholder sengaja berbeda dari foto final. Detail QR, handwriting, ikon
logo, dan chrome mockup dibuat ulang, bukan screenshot asli; jangan menganggap
hasilnya pixel-perfect tanpa meninjau screenshot.

## Hasil validasi implementasi

- Migrasi utility native mempertahankan geometry, teks, tinggi dokumen, dan
  screenshot (nol selisih pixel) pada 12 lebar landing terhadap baseline
  produksi sebelum migrasi ini. Bukan klaim kesamaan dengan foto referensi.
- Build produksi berhasil. Tes Laravel landing, tema, dan verifikasi email:
  15 tes, 83 assertions; database SQLite in-memory, bukan database aktif.
- Tes browser mencakup FAQ, kapasitas, minimum satu, menu/Escape, CTA tamu,
  font, gambar, overflow responsif, hover/fokus CTA, reduced motion, dan
  login/register dengan satu tema.
- `npm run types:check` masih gagal pada kode Wayfinder generated
  `resources/js/actions/Illuminate/Routing/RedirectController.ts`: properti
  `methods` dan HTTP method `query` tidak sesuai tipe yang dihasilkan.
- Format dokumen lama `GaleriKita_Alur_Host_dan_Fotografer.md` berada di luar
  lingkup perubahan ini.
