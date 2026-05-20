const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://subariyanto.github.io/skp-pengawas-2026/eviden';
const RAW_URL = 'https://raw.githubusercontent.com/Subariyanto/skp-pengawas-2026/gh-pages/eviden';

const RHK_LIST = [
  {no:7, tw:'II', judul:'Kolaborasi Warga Madrasah dan Masyarakat', bukti:'Laporan Koordinasi dan Pendampingan Kolaborasi', file:'Eviden_RHK7_TWII_Kolaborasi_Warga_Madrasah_dan_.docx'},
  {no:8, tw:'II', judul:'Keaktifan dalam Jejaring Profesi', bukti:'Dokumen Keaktifan dalam Organisasi Profesi dan Jejaring Pengawas', file:'Eviden_RHK8_TWII_Keaktifan_dalam_Jejaring_Profe.docx'},
  {no:9, tw:'II', judul:'Pendampingan Penyusunan/Reviu Kurikulum Madrasah', bukti:'Laporan Pendampingan Penyusunan dan Reviu Kurikulum Madrasah', file:'Eviden_RHK9_TWII_Pendampingan_Penyusunan_Reviu_.docx'},
  {no:10, tw:'II', judul:'Penguatan Pendidikan Karakter via Kepramukaan', bukti:'Laporan Pembinaan Penguatan Pendidikan Karakter via Kepramukaan', file:'Eviden_RHK10_TWII_Penguatan_Pendidikan_Karakter_.docx'},
  {no:11, tw:'II', judul:'Pengembangan Perangkat Kurikulum', bukti:'Laporan Pembinaan Pengembangan Perangkat Kurikulum Madrasah', file:'Eviden_RHK11_TWII_Pengembangan_Perangkat_Kurikul.docx'},
  {no:12, tw:'II', judul:'Pemenuhan Standar Akreditasi', bukti:'Laporan Pendampingan Pemenuhan Standar Akreditasi', file:'Eviden_RHK12_TWII_Pendampingan_Pemenuhan_Standar.docx'},
  {no:13, tw:'III', judul:'Pendampingan Klinis Penerapan Deep Learning', bukti:'Laporan Pendampingan Klinis Penerapan Pembelajaran Mendalam', file:'Eviden_RHK13_TWIII_Pendampingan_Klinis_Penerapan_.docx'},
  {no:14, tw:'III', judul:'Evaluasi Implementasi Kebijakan Kurikulum', bukti:'Laporan Evaluasi Implementasi Kebijakan Kurikulum', file:'Eviden_RHK14_TWIII_Evaluasi_Implementasi_Kebijaka.docx'},
  {no:15, tw:'III', judul:'Peningkatan Satuan Pendidikan Unggul', bukti:'Laporan Pendampingan Peningkatan Mutu Madrasah', file:'Eviden_RHK15_TWIII_Peningkatan_Satuan_Pendidikan_.docx'},
  {no:16, tw:'III', judul:'Implementasi Pendidikan Bilingual', bukti:'Laporan Pendampingan Implementasi Pendidikan Bilingual', file:'Eviden_RHK16_TWIII_Implementasi_Pendidikan_Biling.docx'},
  {no:17, tw:'III', judul:'Pembinaan Prestasi Kompetisi Nasional/Internasional', bukti:'Laporan Pembinaan Prestasi Peserta Didik', file:'Eviden_RHK17_TWIII_Pembinaan_Prestasi_Kompetisi_N.docx'},
  {no:18, tw:'III', judul:'Pendampingan Sertifikasi Guru', bukti:'Laporan Pendampingan Sertifikasi Guru', file:'Eviden_RHK18_TWIII_Pendampingan_Sertifikasi_Guru.docx'},
  {no:19, tw:'IV', judul:'Evaluasi Dampak Pendampingan', bukti:'Laporan Evaluasi Dampak Pendampingan', file:'Eviden_RHK19_TWIV_Evaluasi_Dampak_Pendampingan.docx'},
  {no:20, tw:'IV', judul:'Karya Inovasi/Best Practice Pengawasan', bukti:'Dokumen Karya Inovasi/Best Practice', file:'Eviden_RHK20_TWIV_Karya_Inovasi_Best_Practice_Pe.docx'},
  {no:21, tw:'IV', judul:'Monitoring Rasio Guru terhadap Siswa', bukti:'Laporan Monitoring Rasio Guru-Siswa', file:'Eviden_RHK21_TWIV_Monitoring_Rasio_Guru_terhadap.docx'},
  {no:22, tw:'IV', judul:'Peningkatan Kualifikasi Tenaga Kependidikan', bukti:'Laporan Pendampingan Peningkatan Kualifikasi Tenaga Kependidikan', file:'Eviden_RHK22_TWIV_Peningkatan_Kualifikasi_Tenaga.docx'},
  {no:23, tw:'IV', judul:'Sertifikasi Guru Agama', bukti:'Laporan Pendampingan Sertifikasi Guru Agama', file:'Eviden_RHK23_TWIV_Sertifikasi_Guru_Agama.docx'},
  {no:24, tw:'IV', judul:'Pendampingan PPG', bukti:'Laporan Pendampingan PPG', file:'Eviden_RHK24_TWIV_Pendampingan_PPG.docx'},
  {no:25, tw:'IV', judul:'Pembinaan Prestasi Ekstrakurikuler', bukti:'Laporan Pembinaan Ekstrakurikuler', file:'Eviden_RHK25_TWIV_Pembinaan_Prestasi_Ekstrakurik.docx'},
  {no:26, tw:'IV', judul:'Rekomendasi Pengadaan Guru', bukti:'Dokumen Rekomendasi Pengadaan Guru', file:'Eviden_RHK26_TWIV_Rekomendasi_Pengadaan_Guru.docx'},
];

const outDir = path.join(__dirname);

RHK_LIST.forEach(r => {
  const slug = `rhk${r.no}`;
  const html = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Eviden RHK ${r.no} - TW ${r.tw} | SKP Pengawas 2026</title>
<style>
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin:0;padding:20px;background:#f4f6f9;color:#2c3e50}
.container{max-width:700px;margin:0 auto}
.back{display:inline-block;margin-bottom:15px;color:#1a5276;text-decoration:none;font-size:13px}
.card{background:#fff;border-radius:10px;padding:25px;box-shadow:0 2px 8px rgba(0,0,0,.06)}
.badge{display:inline-block;background:#1a5276;color:#fff;padding:4px 10px;border-radius:4px;font-size:11px;margin-bottom:10px}
h1{color:#1a5276;font-size:20px;margin:10px 0}
.info{margin:15px 0;font-size:14px;line-height:1.8}
.info strong{color:#1a5276}
.btn-dl{display:inline-block;background:#27ae60;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:bold;margin-top:15px}
.btn-dl:hover{background:#219a52}
.note{background:#fff3cd;padding:12px;border-radius:6px;font-size:12px;margin-top:20px}
.footer{text-align:center;font-size:11px;color:#999;margin-top:25px}
</style>
</head>
<body>
<div class="container">
<a href="index.html" class="back">\u2190 Kembali ke Daftar Eviden</a>
<div class="card">
<span class="badge">Triwulan ${r.tw}</span>
<h1>RHK ${r.no}: ${r.judul}</h1>
<div class="info">
<p><strong>Bukti Dukung:</strong> ${r.bukti}</p>
<p><strong>Triwulan:</strong> ${r.tw}</p>
<p><strong>Format:</strong> Microsoft Word (.docx)</p>
<p><strong>Pengawas:</strong> SUBARIYANTO, S.Pd, M.Pd.I.</p>
</div>
<a href="${RAW_URL}/${r.file}" class="btn-dl">\ud83d\udce5 Download Template Eviden (.docx)</a>
<div class="note">
\ud83d\udca1 <strong>Cara penggunaan:</strong><br>
1. Klik tombol Download di atas<br>
2. Buka file di Microsoft Word<br>
3. Edit bagian yang bertanda [...] sesuai data aktual<br>
4. Simpan dan upload ke Google Drive
</div>
</div>
<p class="footer">SKP Pengawas Madrasah 2026 - Kemenag Kab. Jember</p>
</div>
</body>
</html>`;

  fs.writeFileSync(path.join(outDir, `${slug}.html`), html);
  console.log(`Created: ${slug}.html -> ${BASE_URL}/${slug}.html`);
});

console.log('\nDone! Total:', RHK_LIST.length, 'pages created.');
