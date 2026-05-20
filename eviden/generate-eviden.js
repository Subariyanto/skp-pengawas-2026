const fs = require('fs');
const path = require('path');

const IDENTITAS = {
  nama: 'SUBARIYANTO, S.Pd, M.Pd.I.',
  nip: '197002122005011004',
  pangkat: 'Pembina Tingkat I, IV/b',
  jabatan: 'Pengawas Madrasah Madya Tingkat Menengah Pada MA',
  unitKerja: 'Kantor Kementerian Agama Kab. Jember',
  penilai: 'Dr. SANTOSO, S.Ag, M.Pd.',
  nipPenilai: '196908251991031003',
  jabatanPenilai: 'Kepala Kantor Kementerian Agama Kab. Jember'
};

const MADRASAH_BINAAN = [
  'MA Al-Hidayah Kalisat','MA Miftahul Ulum Suren','MA Nurul Huda','MA Al-Falah','MA Darul Hikmah',
  'MA Al-Ishlah','MA Mamba\'ul Ulum','MA Al-Khoiriyah','MA Nurul Jadid','MA Al-Mukarromah',
  'MA Raudlatul Ulum','MA Al-Barokah','MA Darul Ulum','MA Al-Ittihad','MA Miftahul Huda',
  'MA Al-Furqon','MA Nurul Iman','MA Al-Hikmah','MA Darul Falah','MA Al-Muhajirin'
];

const RHK_TW2 = [
  {no:7, judul:'Kolaborasi Warga Madrasah dan Masyarakat', aksi:'Melaksanakan koordinasi dan pendampingan kolaborasi antara madrasah, komite, orang tua, dan masyarakat', bukti:'Laporan Koordinasi dan Pendampingan Kolaborasi', jenis:'laporan'},
  {no:8, judul:'Keaktifan dalam Jejaring Profesi', aksi:'Melaksanakan keaktifan dalam organisasi profesi dan jejaring pengawas serta mendiseminasikan praktik baik', bukti:'Dokumen Keaktifan dalam Organisasi Profesi dan Jejaring Pengawas', jenis:'dokumen'},
  {no:9, judul:'Pendampingan Penyusunan/Reviu Kurikulum Madrasah', aksi:'Melaksanakan pendampingan penyusunan dan reviu Kurikulum Madrasah yang mengintegrasikan Pembelajaran Mendalam', bukti:'Laporan Pendampingan Penyusunan dan Reviu Kurikulum Madrasah', jenis:'laporan'},
  {no:10, judul:'Penguatan Pendidikan Karakter melalui Kepramukaan', aksi:'Melaksanakan pembinaan dan pendampingan penguatan pendidikan karakter peserta didik melalui integrasi kegiatan kepramukaan', bukti:'Laporan Pembinaan dan Pendampingan Penguatan Pendidikan Karakter', jenis:'laporan'},
  {no:11, judul:'Pengembangan Perangkat Kurikulum untuk Mutu Pendidikan', aksi:'Melaksanakan pembinaan, pendampingan, monitoring, dan evaluasi pengembangan perangkat kurikulum madrasah', bukti:'Laporan Pembinaan Pengembangan Perangkat Kurikulum Madrasah', jenis:'laporan'},
  {no:12, judul:'Pendampingan Pemenuhan Standar Akreditasi', aksi:'Melaksanakan pendampingan pemenuhan standar akreditasi melalui pembinaan tata kelola madrasah', bukti:'Laporan Pendampingan Pemenuhan Standar Akreditasi', jenis:'laporan'}
];

const RHK_TW3 = [
  {no:13, judul:'Pendampingan Klinis Penerapan Deep Learning', aksi:'Melaksanakan pendampingan klinis penerapan Pembelajaran Mendalam melalui supervisi akademik, observasi kelas, dan umpan balik', bukti:'Laporan Pendampingan Klinis Penerapan Pembelajaran Mendalam', jenis:'laporan'},
  {no:14, judul:'Evaluasi Implementasi Kebijakan Kurikulum', aksi:'Melaksanakan evaluasi implementasi kebijakan kurikulum pada madrasah binaan melalui pengumpulan data dan analisis', bukti:'Laporan Evaluasi Implementasi Kebijakan Kurikulum', jenis:'laporan'},
  {no:15, judul:'Peningkatan Satuan Pendidikan Unggul', aksi:'Melaksanakan pendampingan peningkatan mutu madrasah menuju satuan pendidikan unggul', bukti:'Laporan Pendampingan Peningkatan Mutu Madrasah', jenis:'laporan'},
  {no:16, judul:'Implementasi Pendidikan Bilingual', aksi:'Melaksanakan pendampingan implementasi pendidikan bilingual pada madrasah binaan', bukti:'Laporan Pendampingan Implementasi Pendidikan Bilingual', jenis:'laporan'},
  {no:17, judul:'Pembinaan Prestasi Kompetisi', aksi:'Melaksanakan pembinaan prestasi peserta didik untuk kompetisi nasional/internasional', bukti:'Laporan Pembinaan Prestasi Peserta Didik', jenis:'laporan'},
  {no:18, judul:'Pendampingan Sertifikasi Guru', aksi:'Melaksanakan pendampingan sertifikasi guru pada madrasah binaan', bukti:'Laporan Pendampingan Sertifikasi Guru', jenis:'laporan'}
];

const RHK_TW4 = [
  {no:19, judul:'Evaluasi Dampak Pendampingan', aksi:'Melaksanakan evaluasi dampak pendampingan terhadap peningkatan mutu madrasah binaan', bukti:'Laporan Evaluasi Dampak Pendampingan', jenis:'laporan'},
  {no:20, judul:'Karya Inovasi/Best Practice Pengawasan', aksi:'Menyusun karya inovasi/Best Practice pengawasan madrasah', bukti:'Dokumen Karya Inovasi/Best Practice', jenis:'dokumen'},
  {no:21, judul:'Monitoring Rasio Guru terhadap Siswa', aksi:'Melaksanakan monitoring rasio guru terhadap siswa sesuai SNP pada madrasah binaan', bukti:'Laporan Monitoring Rasio Guru-Siswa', jenis:'laporan'},
  {no:22, judul:'Peningkatan Kualifikasi Tenaga Kependidikan', aksi:'Melaksanakan pendampingan peningkatan kualifikasi tenaga kependidikan', bukti:'Laporan Pendampingan Peningkatan Kualifikasi', jenis:'laporan'},
  {no:23, judul:'Sertifikasi Guru Agama', aksi:'Melaksanakan pendampingan sertifikasi guru agama pada madrasah binaan', bukti:'Laporan Pendampingan Sertifikasi Guru Agama', jenis:'laporan'},
  {no:24, judul:'Pendampingan PPG', aksi:'Melaksanakan pendampingan guru dalam program PPG (Pendidikan Profesi Guru)', bukti:'Laporan Pendampingan PPG', jenis:'laporan'},
  {no:25, judul:'Pembinaan Prestasi Ekstrakurikuler', aksi:'Melaksanakan pembinaan kegiatan ekstrakurikuler peserta didik pada madrasah binaan', bukti:'Laporan Pembinaan Ekstrakurikuler', jenis:'laporan'},
  {no:26, judul:'Rekomendasi Pengadaan Guru', aksi:'Menyusun rekomendasi pengadaan guru berdasarkan analisis kebutuhan madrasah binaan', bukti:'Dokumen Rekomendasi Pengadaan Guru', jenis:'dokumen'}
];

function getTWPeriod(tw) {
  switch(tw) {
    case 2: return {bulan:'April - Juni 2026', start:'April 2026', end:'Juni 2026'};
    case 3: return {bulan:'Juli - September 2026', start:'Juli 2026', end:'September 2026'};
    case 4: return {bulan:'Oktober - Desember 2026', start:'Oktober 2026', end:'Desember 2026'};
  }
}

function generateLaporan(rhk, tw) {
  const period = getTWPeriod(tw);
  const madrasahSample = MADRASAH_BINAAN.slice(0, 5);
  
  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Eviden RHK ${rhk.no} - ${rhk.judul}</title>
<style>
body{font-family:'Times New Roman',serif;margin:40px 60px;line-height:1.8;color:#000;font-size:12pt}
h1{text-align:center;font-size:14pt;margin-bottom:5px}
h2{text-align:center;font-size:12pt;font-weight:normal;margin-bottom:20px}
h3{font-size:12pt;margin:20px 0 10px}
.header{text-align:center;margin-bottom:30px;border-bottom:2px solid #000;padding-bottom:15px}
.header img{height:60px}
.header p{margin:2px 0;font-size:11pt}
table{width:100%;border-collapse:collapse;margin:15px 0;font-size:11pt}
th,td{border:1px solid #000;padding:6px 10px;text-align:left;vertical-align:top}
th{background:#f0f0f0;font-weight:bold}
.ttd{margin-top:50px;display:flex;justify-content:space-between}
.ttd-col{text-align:center;width:45%}
.ttd-col .nama{margin-top:60px;font-weight:bold;text-decoration:underline}
.ttd-col .nip{font-size:10pt}
.no-print{background:#e8f5e9;padding:10px;border-radius:5px;margin:10px 0;font-size:10pt;font-style:italic}
@media print{.no-print{display:none} body{margin:20px 40px}}
</style>
</head>
<body>
<div class="header">
<h1>KEMENTERIAN AGAMA REPUBLIK INDONESIA</h1>
<h2>KANTOR KEMENTERIAN AGAMA KABUPATEN JEMBER</h2>
<p>Jl. KH. Wahid Hasyim No. 1 Jember - Jawa Timur</p>
</div>

<h1>${rhk.bukti.toUpperCase()}</h1>
<h2>Triwulan ${tw === 2 ? 'II' : tw === 3 ? 'III' : 'IV'} - Periode ${period.bulan}</h2>

<div class="no-print">📝 Petunjuk: Edit bagian yang ditandai [...] sesuai data aktual Anda. Hapus petunjuk ini sebelum dicetak.</div>

<h3>I. DASAR</h3>
<ol>
<li>Sasaran Kinerja Pegawai (SKP) Tahun 2026</li>
<li>Peraturan Menteri PANRB Nomor 6 Tahun 2022 tentang Pengelolaan Kinerja Pegawai ASN</li>
<li>Perdirjen GTK Nomor 7328 Tahun 2023</li>
<li>Program Kerja Pengawas Madrasah Tahun 2026</li>
</ol>

<h3>II. TUJUAN</h3>
<p>${rhk.aksi} dalam rangka meningkatkan mutu layanan pendidikan pada madrasah binaan di wilayah Kabupaten Jember.</p>

<h3>III. SASARAN</h3>
<p>Madrasah binaan di wilayah KKMA 04 Kabupaten Jember, meliputi:</p>
<table>
<thead><tr><th>No</th><th>Nama Madrasah</th><th>Keterangan</th></tr></thead>
<tbody>
${MADRASAH_BINAAN.map((m, i) => `<tr><td>${i+1}</td><td>${m}</td><td>[Isi status/catatan]</td></tr>`).join('\n')}
</tbody>
</table>

<h3>IV. PELAKSANAAN</h3>
<table>
<thead><tr><th>No</th><th>Kegiatan</th><th>Waktu</th><th>Tempat</th><th>Hasil</th></tr></thead>
<tbody>
<tr><td>1</td><td>${rhk.aksi}</td><td>[Tanggal pelaksanaan]</td><td>[Lokasi]</td><td>[Hasil kegiatan]</td></tr>
<tr><td>2</td><td>Monitoring dan evaluasi</td><td>[Tanggal]</td><td>[Lokasi]</td><td>[Hasil monitoring]</td></tr>
<tr><td>3</td><td>Penyusunan laporan</td><td>[Tanggal]</td><td>[Lokasi]</td><td>[Dokumen laporan]</td></tr>
</tbody>
</table>

<h3>V. HASIL DAN PEMBAHASAN</h3>
<p>[Uraikan hasil pelaksanaan kegiatan, temuan, analisis, dan rekomendasi. Minimal 2-3 paragraf.]</p>
<p>Berdasarkan pelaksanaan kegiatan ${rhk.aksi.toLowerCase()}, diperoleh hasil sebagai berikut:</p>
<ol>
<li>[Temuan/hasil 1]</li>
<li>[Temuan/hasil 2]</li>
<li>[Temuan/hasil 3]</li>
</ol>

<h3>VI. KESIMPULAN DAN REKOMENDASI</h3>
<p><strong>Kesimpulan:</strong></p>
<p>[Isi kesimpulan dari kegiatan yang telah dilaksanakan]</p>
<p><strong>Rekomendasi:</strong></p>
<ol>
<li>[Rekomendasi 1]</li>
<li>[Rekomendasi 2]</li>
</ol>

<h3>VII. PENUTUP</h3>
<p>Demikian laporan ini disusun sebagai bukti dukung pelaksanaan RHK ${rhk.no} pada Triwulan ${tw === 2 ? 'II' : tw === 3 ? 'III' : 'IV'} Tahun 2026. Semoga dapat menjadi bahan pertimbangan dalam evaluasi kinerja.</p>

<div class="ttd">
<div class="ttd-col">
<p>Mengetahui,</p>
<p>${IDENTITAS.jabatanPenilai}</p>
<div class="nama">${IDENTITAS.penilai}</div>
<div class="nip">NIP. ${IDENTITAS.nipPenilai}</div>
</div>
<div class="ttd-col">
<p>Jember, [Tanggal] ${period.end}</p>
<p>Pengawas Madrasah,</p>
<div class="nama">${IDENTITAS.nama}</div>
<div class="nip">NIP. ${IDENTITAS.nip}</div>
</div>
</div>

<h3 style="margin-top:40px">LAMPIRAN</h3>
<ol>
<li>Dokumentasi foto kegiatan</li>
<li>Daftar hadir peserta</li>
<li>Instrumen yang digunakan</li>
<li>Data hasil [sesuaikan]</li>
</ol>
</body>
</html>`;
}

function generateDokumen(rhk, tw) {
  const period = getTWPeriod(tw);
  
  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Eviden RHK ${rhk.no} - ${rhk.judul}</title>
<style>
body{font-family:'Times New Roman',serif;margin:40px 60px;line-height:1.8;color:#000;font-size:12pt}
h1{text-align:center;font-size:14pt;margin-bottom:5px}
h2{text-align:center;font-size:12pt;font-weight:normal;margin-bottom:20px}
h3{font-size:12pt;margin:20px 0 10px}
.header{text-align:center;margin-bottom:30px;border-bottom:2px solid #000;padding-bottom:15px}
.header p{margin:2px 0;font-size:11pt}
table{width:100%;border-collapse:collapse;margin:15px 0;font-size:11pt}
th,td{border:1px solid #000;padding:6px 10px;text-align:left;vertical-align:top}
th{background:#f0f0f0;font-weight:bold}
.ttd{margin-top:50px;display:flex;justify-content:space-between}
.ttd-col{text-align:center;width:45%}
.ttd-col .nama{margin-top:60px;font-weight:bold;text-decoration:underline}
.ttd-col .nip{font-size:10pt}
.no-print{background:#e8f5e9;padding:10px;border-radius:5px;margin:10px 0;font-size:10pt;font-style:italic}
@media print{.no-print{display:none} body{margin:20px 40px}}
</style>
</head>
<body>
<div class="header">
<h1>KEMENTERIAN AGAMA REPUBLIK INDONESIA</h1>
<h2>KANTOR KEMENTERIAN AGAMA KABUPATEN JEMBER</h2>
<p>Jl. KH. Wahid Hasyim No. 1 Jember - Jawa Timur</p>
</div>

<h1>${rhk.bukti.toUpperCase()}</h1>
<h2>Triwulan ${tw === 2 ? 'II' : tw === 3 ? 'III' : 'IV'} - Periode ${period.bulan}</h2>

<div class="no-print">📝 Petunjuk: Edit bagian yang ditandai [...] sesuai data aktual Anda. Hapus petunjuk ini sebelum dicetak.</div>

<h3>I. PENDAHULUAN</h3>
<p>Dokumen ini disusun sebagai bukti dukung pelaksanaan Rencana Hasil Kerja (RHK) Nomor ${rhk.no} tentang "${rhk.judul}" pada Triwulan ${tw === 2 ? 'II' : tw === 3 ? 'III' : 'IV'} Tahun 2026.</p>

<h3>II. DASAR HUKUM</h3>
<ol>
<li>Peraturan Menteri PANRB Nomor 6 Tahun 2022</li>
<li>Perdirjen GTK Nomor 7328 Tahun 2023</li>
<li>SKP Pengawas Madrasah Tahun 2026</li>
</ol>

<h3>III. ISI DOKUMEN</h3>
<p>[Uraikan isi dokumen sesuai dengan jenis RHK. Berikut kerangka yang dapat digunakan:]</p>

<table>
<thead><tr><th>No</th><th>Komponen</th><th>Uraian</th></tr></thead>
<tbody>
<tr><td>1</td><td>Latar Belakang</td><td>[Isi latar belakang penyusunan dokumen]</td></tr>
<tr><td>2</td><td>Tujuan</td><td>${rhk.aksi}</td></tr>
<tr><td>3</td><td>Ruang Lingkup</td><td>Madrasah binaan KKMA 04 Kab. Jember (20 MA Swasta)</td></tr>
<tr><td>4</td><td>Metodologi</td><td>[Isi metode yang digunakan]</td></tr>
<tr><td>5</td><td>Hasil</td><td>[Isi hasil/temuan]</td></tr>
<tr><td>6</td><td>Rekomendasi</td><td>[Isi rekomendasi]</td></tr>
</tbody>
</table>

<h3>IV. DATA PENDUKUNG</h3>
<table>
<thead><tr><th>No</th><th>Nama Madrasah</th><th>Kondisi Awal</th><th>Kondisi Akhir</th><th>Keterangan</th></tr></thead>
<tbody>
${MADRASAH_BINAAN.slice(0,10).map((m, i) => `<tr><td>${i+1}</td><td>${m}</td><td>[Data awal]</td><td>[Data akhir]</td><td>[Catatan]</td></tr>`).join('\n')}
</tbody>
</table>

<h3>V. PENUTUP</h3>
<p>Demikian dokumen ini disusun untuk memenuhi kelengkapan bukti dukung SKP Tahun 2026.</p>

<div class="ttd">
<div class="ttd-col">
<p>Mengetahui,</p>
<p>${IDENTITAS.jabatanPenilai}</p>
<div class="nama">${IDENTITAS.penilai}</div>
<div class="nip">NIP. ${IDENTITAS.nipPenilai}</div>
</div>
<div class="ttd-col">
<p>Jember, [Tanggal] ${period.end}</p>
<p>Pengawas Madrasah,</p>
<div class="nama">${IDENTITAS.nama}</div>
<div class="nip">NIP. ${IDENTITAS.nip}</div>
</div>
</div>
</body>
</html>`;
}

// Generate all files
const allRHK = [
  {tw: 2, items: RHK_TW2},
  {tw: 3, items: RHK_TW3},
  {tw: 4, items: RHK_TW4}
];

let indexHtml = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Download Eviden SKP 2026 - Triwulan II, III, IV</title>
<style>
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin:0;padding:20px;background:#f4f6f9;color:#2c3e50}
.container{max-width:900px;margin:0 auto}
h1{color:#1a5276;text-align:center;margin-bottom:5px}
h2{color:#148f77;text-align:center;font-weight:normal;margin-bottom:30px}
.tw-section{background:#fff;border-radius:10px;padding:20px;margin-bottom:20px;box-shadow:0 2px 8px rgba(0,0,0,.06)}
.tw-section h3{color:#1a5276;border-bottom:2px solid #1a5276;padding-bottom:8px;margin-bottom:15px}
.file-list{list-style:none;padding:0}
.file-list li{padding:10px 15px;border:1px solid #eee;border-radius:6px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center}
.file-list li:hover{background:#f0f9ff}
.file-info{flex:1}
.file-info .title{font-weight:600;font-size:13px}
.file-info .desc{font-size:11px;color:#666;margin-top:3px}
.btn-dl{background:#1a5276;color:#fff;padding:6px 14px;border-radius:5px;text-decoration:none;font-size:12px;font-weight:600}
.btn-dl:hover{background:#154360}
.note{background:#fff3cd;padding:12px;border-radius:6px;font-size:12px;margin-bottom:20px}
</style>
</head>
<body>
<div class="container">
<h1>📁 Eviden SKP Pengawas Madrasah 2026</h1>
<h2>SUBARIYANTO, S.Pd, M.Pd.I. - Kemenag Kab. Jember</h2>
<div class="note">💡 <strong>Cara penggunaan:</strong> Klik "Download" untuk membuka dokumen eviden. Lalu Ctrl+P untuk cetak/save as PDF. Edit bagian [...] sesuai data aktual sebelum upload ke Google Drive.</div>
`;

allRHK.forEach(({tw, items}) => {
  const twLabel = tw === 2 ? 'II' : tw === 3 ? 'III' : 'IV';
  const period = getTWPeriod(tw);
  
  indexHtml += `<div class="tw-section">
<h3>Triwulan ${twLabel} (${period.bulan})</h3>
<ul class="file-list">`;
  
  items.forEach(rhk => {
    const filename = `eviden-rhk${rhk.no}-tw${tw}.html`;
    const content = rhk.jenis === 'laporan' ? generateLaporan(rhk, tw) : generateDokumen(rhk, tw);
    fs.writeFileSync(path.join(__dirname, filename), content, 'utf8');
    
    indexHtml += `
<li>
<div class="file-info">
<div class="title">RHK ${rhk.no}: ${rhk.judul}</div>
<div class="desc">${rhk.bukti}</div>
</div>
<a href="${filename}" target="_blank" class="btn-dl">📄 Download</a>
</li>`;
  });
  
  indexHtml += `</ul></div>`;
});

indexHtml += `
<p style="text-align:center;font-size:11px;color:#999;margin-top:20px">Dibuat oleh: Subariyanto - Ketua Pokjawas Kemenag Kab. Jember</p>
</div>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'index.html'), indexHtml, 'utf8');
console.log('Done! Generated eviden files for TW2, TW3, TW4');
console.log('Files:', fs.readdirSync(__dirname).filter(f => f.endsWith('.html')).length, 'HTML files');
