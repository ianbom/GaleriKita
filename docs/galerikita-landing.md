# Landing page GaleriKita

Route `/` menggunakan halaman Inertia `welcome`. Komponen berada di
`resources/js/components/galerikita/`, styling khusus di
`resources/css/galerikita.css`. Halaman auth/dashboard tetap memakai styling lama.
Plus Jakarta Sans dan Instrument Serif dimuat melalui provider font Vite yang
sudah terpasang; build menyimpan font secara lokal.

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
php artisan test --filter=GaleriKitaLandingTest
php artisan serve --host=127.0.0.1 --port=8013
Get-Content tests/galerikita-browser.py -Raw | browser-harness
```

Browser check menggunakan Chrome melalui browser-harness. Laravel harus aktif;
gunakan build produksi tanpa Vite dev server untuk pemeriksaan akhir.
`GK_URL` dapat mengganti URL default. Script memeriksa struktur, FAQ, kapasitas
dan batas minimum, CTA tamu, menu/Escape, font, gambar, error browser, serta
overflow pada 1440, 1280, 1024, 768, 390, dan 375px. Screenshot full-page disimpan
di `storage/app/galerikita-qa/`. Tes Laravel memakai SQLite in-memory sesuai
`phpunit.xml`, bukan database aktif.

Desktop mengikuti kedua referensi; mobile adalah interpretasi responsif.
Placeholder sengaja berbeda dari foto final. Detail QR, handwriting, ikon
logo, dan chrome mockup dibuat ulang, bukan screenshot asli; jangan menganggap
hasilnya pixel-perfect tanpa meninjau screenshot.

## Hasil validasi implementasi

- Build produksi berhasil; lint dan format seluruh file landing berhasil.
- Dua tes Laravel berhasil, 20 assertions; Pint file tes berhasil.
- Browser produksi berhasil pada enam ukuran yang ditentukan. Tidak ada
  error console/runtime atau overflow horizontal; 67 gambar memiliki key unik.
  FAQ, kapasitas, minimum satu, menu/Escape, dan tujuan CTA tamu terverifikasi.
- Screenshot desktop dan mobile ditinjau; komposisi dibandingkan dengan
  referensi setelah normalisasi lebar. Placeholder dan detail ilustrasi tetap
  merupakan perbedaan yang disengaja; bukan klaim pixel-perfect.
- `npm run types:check` masih gagal pada kode Wayfinder generated
  `resources/js/actions/Illuminate/Routing/RedirectController.ts`: properti
  `methods` dan HTTP method `query` tidak sesuai tipe yang dihasilkan. Tidak ada
  error TypeScript yang dilaporkan pada file landing.
- `npm run check` masih melaporkan format dokumen lama
  `GaleriKita_Alur_Host_dan_Fotografer.md`; dokumen tersebut tidak diubah.
