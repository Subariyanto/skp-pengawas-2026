const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, HeadingLevel, PageBreak } = require('docx');

const MADRASAH = [
  {no:1, nama:'MAS AL - BADRI', kepala:'Saifuddin, S.Pd.I', kec:'Kalisat'},
  {no:2, nama:'MAS AL MUBAROK', kepala:'Yuliana Anggraeni', kec:'Kalisat'},
  {no:3, nama:'MAS MIFTAHUL ULUM KALISAT', kepala:'ISFANDIAR', kec:'Kalisat'},
  {no:4, nama:'MAS BAHRUL AMIN AL KHOLILI', kepala:'Ifrohatul Hasanah, S.Pd', kec:'Kalisat'},
  {no:5, nama:'MAS NURUL ALI', kepala:'Halik, S.Pd.I', kec:'Ledokombo'},
  {no:6, nama:'MAS MIFTAHUL ULUM SUREN', kepala:'Muhammad Hazin Mudzhar, S.Hum', kec:'Ledokombo'},
  {no:7, nama:'MAS AT-TAQWA', kepala:'Dr. Mohammad Erwan, S.Pd, M.Pd', kec:'Ledokombo'},
  {no:8, nama:'MAS AR - ROHMAH', kepala:'Ali Rachamtulloh, S.Pd', kec:'Ledokombo'},
  {no:9, nama:'MAS RAUDLATUL ULUM', kepala:'NUR FARIDZAH, S.Kg', kec:'Ledokombo'},
  {no:10, nama:'MAS KEPENDIDIKAN NURURRAHMAN', kepala:'Abdullah, S.Pd.I, M.Pd.', kec:'Pakusari'},
  {no:11, nama:'MAS HABIBURROHMAN', kepala:'Ahmad Zaini, S.Pd.I, M.Pd', kec:'Pakusari'},
  {no:12, nama:'MAS NURUL QARNAIN', kepala:'Drs. H. IMAM SYAFI\'I, M.Pd.I', kec:'Sukowono'},
  {no:13, nama:'MAS MIFTAHUL ULUM', kepala:'LUTFI GHUFRON, S.Pd.I', kec:'Sukowono'},
  {no:14, nama:'MAS RAUDLATUS SYABAB', kepala:'H. Badrudin, S.Pd.I, M.Pd', kec:'Sukowono'},
  {no:15, nama:'MAS NURUL ISLAM AL-HAMIDY', kepala:'Musthofa, S.Pd.I, M.Pd', kec:'Sumberjambe'},
  {no:16, nama:'MAS BAITUL AZHAR', kepala:'MOCHAMMAD ISWANTO, S.Pd', kec:'Sumberjambe'},
  {no:17, nama:'MAS NURUL IMAM', kepala:'RIZQY FEBRI PUJI LESTARI, S.Pd', kec:'Sumberjambe'},
  {no:18, nama:'MAS PLUS AL MAHFUDZ', kepala:'M.Ainul Fata Al Kiromi, S.H, M.Pd.I', kec:'Sumberjambe'},
  {no:19, nama:'MAS MIFTAHUL ULUM', kepala:'MOHAMMAD RAMSI, SE.', kec:'Sumberjambe'},
  {no:20, nama:'MAS NURUL ULUM', kepala:'Ahmad Ghovind Surur Hafili, S.Pd', kec:'Mayang'}
];

const IDENTITAS = {
  nama: 'SUBARIYANTO, S.Pd, M.Pd.I.',
  nip: '197002122005011004',
  jabatan: 'Pengawas Madrasah Madya / Ketua Pokjawas Kemenag Kab. Jember'
};

const RHK_ALL = [
  {no:7,tw:2,judul:'Kolaborasi Warga Madrasah dan Masyarakat',aksi:'Melaksanakan koordinasi dan pendampingan kolaborasi antara madrasah, komite, orang tua, dan masyarakat',bukti:'Laporan Koordinasi dan Pendampingan Kolaborasi',jenis:'laporan'},
  {no:8,tw:2,judul:'Keaktifan dalam Jejaring Profesi',aksi:'Melaksanakan keaktifan dalam organisasi profesi dan jejaring pengawas serta mendiseminasikan praktik baik pengawasan',bukti:'Dokumen Keaktifan dalam Organisasi Profesi dan Jejaring Pengawas',jenis:'dokumen'},
  {no:9,tw:2,judul:'Pendampingan Penyusunan/Reviu Kurikulum Madrasah',aksi:'Melaksanakan pendampingan penyusunan dan reviu Kurikulum Madrasah yang mengintegrasikan Pembelajaran Mendalam',bukti:'Laporan Pendampingan Penyusunan dan Reviu Kurikulum Madrasah',jenis:'laporan'},
  {no:10,tw:2,judul:'Penguatan Pendidikan Karakter melalui Kepramukaan',aksi:'Melaksanakan pembinaan dan pendampingan penguatan pendidikan karakter peserta didik melalui integrasi kegiatan kepramukaan',bukti:'Laporan Pembinaan Penguatan Pendidikan Karakter via Kepramukaan',jenis:'laporan'},
  {no:11,tw:2,judul:'Pengembangan Perangkat Kurikulum untuk Mutu Pendidikan',aksi:'Melaksanakan pembinaan, pendampingan, monitoring, dan evaluasi pengembangan perangkat kurikulum madrasah binaan',bukti:'Laporan Pembinaan Pengembangan Perangkat Kurikulum Madrasah',jenis:'laporan'},
  {no:12,tw:2,judul:'Pendampingan Pemenuhan Standar Akreditasi',aksi:'Melaksanakan pendampingan pemenuhan standar akreditasi melalui pembinaan tata kelola madrasah, verifikasi dokumen, dan evaluasi mutu',bukti:'Laporan Pendampingan Pemenuhan Standar Akreditasi',jenis:'laporan'},
  {no:13,tw:3,judul:'Pendampingan Klinis Penerapan Deep Learning',aksi:'Melaksanakan pendampingan klinis penerapan Pembelajaran Mendalam melalui supervisi akademik, observasi kelas, dan umpan balik',bukti:'Laporan Pendampingan Klinis Penerapan Pembelajaran Mendalam',jenis:'laporan'},
  {no:14,tw:3,judul:'Evaluasi Implementasi Kebijakan Kurikulum',aksi:'Melaksanakan evaluasi implementasi kebijakan kurikulum pada madrasah binaan melalui pengumpulan data, analisis, dan penyusunan rekomendasi',bukti:'Laporan Evaluasi Implementasi Kebijakan Kurikulum',jenis:'laporan'},
  {no:15,tw:3,judul:'Peningkatan Satuan Pendidikan Unggul',aksi:'Melaksanakan pendampingan peningkatan mutu madrasah menuju satuan pendidikan unggul',bukti:'Laporan Pendampingan Peningkatan Mutu Madrasah',jenis:'laporan'},
  {no:16,tw:3,judul:'Implementasi Pendidikan Bilingual',aksi:'Melaksanakan pendampingan implementasi pendidikan bilingual pada madrasah binaan',bukti:'Laporan Pendampingan Implementasi Pendidikan Bilingual',jenis:'laporan'},
  {no:17,tw:3,judul:'Pembinaan Prestasi Kompetisi Nasional/Internasional',aksi:'Melaksanakan pembinaan prestasi peserta didik untuk kompetisi nasional/internasional',bukti:'Laporan Pembinaan Prestasi Peserta Didik',jenis:'laporan'},
  {no:18,tw:3,judul:'Pendampingan Sertifikasi Guru',aksi:'Melaksanakan pendampingan sertifikasi guru pada madrasah binaan',bukti:'Laporan Pendampingan Sertifikasi Guru',jenis:'laporan'},
  {no:19,tw:4,judul:'Evaluasi Dampak Pendampingan',aksi:'Melaksanakan evaluasi dampak pendampingan terhadap peningkatan mutu madrasah binaan',bukti:'Laporan Evaluasi Dampak Pendampingan',jenis:'laporan'},
  {no:20,tw:4,judul:'Karya Inovasi/Best Practice Pengawasan',aksi:'Menyusun karya inovasi/Best Practice pengawasan madrasah',bukti:'Dokumen Karya Inovasi/Best Practice',jenis:'dokumen'},
  {no:21,tw:4,judul:'Monitoring Rasio Guru terhadap Siswa',aksi:'Melaksanakan monitoring rasio guru terhadap siswa sesuai SNP pada madrasah binaan',bukti:'Laporan Monitoring Rasio Guru-Siswa',jenis:'laporan'},
  {no:22,tw:4,judul:'Peningkatan Kualifikasi Tenaga Kependidikan',aksi:'Melaksanakan pendampingan peningkatan kualifikasi tenaga kependidikan pada madrasah binaan',bukti:'Laporan Pendampingan Peningkatan Kualifikasi Tenaga Kependidikan',jenis:'laporan'},
  {no:23,tw:4,judul:'Sertifikasi Guru Agama',aksi:'Melaksanakan pendampingan sertifikasi guru agama pada madrasah binaan',bukti:'Laporan Pendampingan Sertifikasi Guru Agama',jenis:'laporan'},
  {no:24,tw:4,judul:'Pendampingan PPG',aksi:'Melaksanakan pendampingan guru dalam program PPG (Pendidikan Profesi Guru)',bukti:'Laporan Pendampingan PPG',jenis:'laporan'},
  {no:25,tw:4,judul:'Pembinaan Prestasi Ekstrakurikuler',aksi:'Melaksanakan pembinaan kegiatan ekstrakurikuler peserta didik pada madrasah binaan',bukti:'Laporan Pembinaan Ekstrakurikuler',jenis:'laporan'},
  {no:26,tw:4,judul:'Rekomendasi Pengadaan Guru',aksi:'Menyusun rekomendasi pengadaan guru berdasarkan analisis kebutuhan madrasah binaan',bukti:'Dokumen Rekomendasi Pengadaan Guru',jenis:'dokumen'}
];

function getTWLabel(tw){ return tw===2?'II':tw===3?'III':'IV'; }
function getTWPeriod(tw){
  switch(tw){
    case 2: return 'April - Juni 2026';
    case 3: return 'Juli - September 2026';
    case 4: return 'Oktober - Desember 2026';
  }
}
function getTWEndMonth(tw){
  switch(tw){ case 2: return 'Juni 2026'; case 3: return 'September 2026'; case 4: return 'Desember 2026'; }
}

const borderNone = { top:{style:BorderStyle.NONE}, bottom:{style:BorderStyle.NONE}, left:{style:BorderStyle.NONE}, right:{style:BorderStyle.NONE} };
const borderAll = { top:{style:BorderStyle.SINGLE,size:1}, bottom:{style:BorderStyle.SINGLE,size:1}, left:{style:BorderStyle.SINGLE,size:1}, right:{style:BorderStyle.SINGLE,size:1} };

async function generateDocx(rhk) {
  const twLabel = getTWLabel(rhk.tw);
  const period = getTWPeriod(rhk.tw);
  const endMonth = getTWEndMonth(rhk.tw);

  const madrasahRows = MADRASAH.map(m => new TableRow({
    children: [
      new TableCell({borders:borderAll, children:[new Paragraph({children:[new TextRun({text:String(m.no),size:22})]})] }),
      new TableCell({borders:borderAll, children:[new Paragraph({children:[new TextRun({text:m.nama,size:22})]})] }),
      new TableCell({borders:borderAll, children:[new Paragraph({children:[new TextRun({text:m.kepala,size:22})]})] }),
      new TableCell({borders:borderAll, children:[new Paragraph({children:[new TextRun({text:m.kec,size:22})]})] }),
      new TableCell({borders:borderAll, children:[new Paragraph({children:[new TextRun({text:'',size:22})]})] }),
    ]
  }));

  const doc = new Document({
    sections: [{
      properties: { page: { margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
      children: [
        new Paragraph({alignment:AlignmentType.CENTER, children:[new TextRun({text:'KEMENTERIAN AGAMA REPUBLIK INDONESIA',bold:true,size:24})]}),
        new Paragraph({alignment:AlignmentType.CENTER, children:[new TextRun({text:'KANTOR KEMENTERIAN AGAMA KABUPATEN JEMBER',bold:true,size:24})]}),
        new Paragraph({alignment:AlignmentType.CENTER, children:[new TextRun({text:'Jl. KH. Wahid Hasyim No. 1 Jember - Jawa Timur',size:20})]}),
        new Paragraph({alignment:AlignmentType.CENTER, spacing:{after:200}, children:[new TextRun({text:'_____________________________________________________________',size:20})]}),
        new Paragraph({text:''}),
        new Paragraph({alignment:AlignmentType.CENTER, children:[new TextRun({text:rhk.bukti.toUpperCase(),bold:true,size:26})]}),
        new Paragraph({alignment:AlignmentType.CENTER, spacing:{after:300}, children:[new TextRun({text:`Triwulan ${twLabel} - Periode ${period}`,size:22})]}),
        new Paragraph({text:''}),
        // I. DASAR
        new Paragraph({children:[new TextRun({text:'I. DASAR',bold:true,size:24})]}),
        new Paragraph({numbering:{reference:'num1',level:0}, children:[new TextRun({text:'Sasaran Kinerja Pegawai (SKP) Tahun 2026',size:22})]}),
        new Paragraph({numbering:{reference:'num1',level:0}, children:[new TextRun({text:'Peraturan Menteri PANRB Nomor 6 Tahun 2022 tentang Pengelolaan Kinerja Pegawai ASN',size:22})]}),
        new Paragraph({numbering:{reference:'num1',level:0}, children:[new TextRun({text:'Perdirjen GTK Nomor 7328 Tahun 2023',size:22})]}),
        new Paragraph({numbering:{reference:'num1',level:0}, spacing:{after:200}, children:[new TextRun({text:'Program Kerja Pengawas Madrasah Tahun 2026',size:22})]}),
        // II. TUJUAN
        new Paragraph({children:[new TextRun({text:'II. TUJUAN',bold:true,size:24})]}),
        new Paragraph({spacing:{after:200}, children:[new TextRun({text:`${rhk.aksi} dalam rangka meningkatkan mutu layanan pendidikan pada madrasah binaan di wilayah Kabupaten Jember.`,size:22})]}),
        // III. SASARAN
        new Paragraph({children:[new TextRun({text:'III. SASARAN',bold:true,size:24})]}),
        new Paragraph({spacing:{after:100}, children:[new TextRun({text:'Madrasah binaan di wilayah KKMA 04 Kabupaten Jember:',size:22})]}),
        new Table({
          width:{size:100,type:WidthType.PERCENTAGE},
          rows: [
            new TableRow({children:[
              new TableCell({borders:borderAll, children:[new Paragraph({children:[new TextRun({text:'No',bold:true,size:22})]})]}),
              new TableCell({borders:borderAll, children:[new Paragraph({children:[new TextRun({text:'Nama Madrasah',bold:true,size:22})]})]}),
              new TableCell({borders:borderAll, children:[new Paragraph({children:[new TextRun({text:'Kepala Madrasah',bold:true,size:22})]})]}),
              new TableCell({borders:borderAll, children:[new Paragraph({children:[new TextRun({text:'Kecamatan',bold:true,size:22})]})]}),
              new TableCell({borders:borderAll, children:[new Paragraph({children:[new TextRun({text:'Keterangan',bold:true,size:22})]})]}),
            ]}),
            ...madrasahRows
          ]
        }),
        new Paragraph({text:''}),
        // IV. PELAKSANAAN
        new Paragraph({children:[new TextRun({text:'IV. PELAKSANAAN',bold:true,size:24})]}),
        new Paragraph({spacing:{after:100}, children:[new TextRun({text:'[Uraikan pelaksanaan kegiatan: waktu, tempat, peserta, metode, dan proses]',size:22,italics:true})]}),
        new Paragraph({text:''}),
        // V. HASIL
        new Paragraph({children:[new TextRun({text:'V. HASIL DAN PEMBAHASAN',bold:true,size:24})]}),
        new Paragraph({spacing:{after:100}, children:[new TextRun({text:'[Uraikan hasil pelaksanaan kegiatan, temuan, analisis, dan data pendukung. Minimal 2-3 paragraf]',size:22,italics:true})]}),
        new Paragraph({text:''}),
        // VI. KESIMPULAN
        new Paragraph({children:[new TextRun({text:'VI. KESIMPULAN DAN REKOMENDASI',bold:true,size:24})]}),
        new Paragraph({children:[new TextRun({text:'Kesimpulan:',bold:true,size:22})]}),
        new Paragraph({spacing:{after:100}, children:[new TextRun({text:'[Isi kesimpulan]',size:22,italics:true})]}),
        new Paragraph({children:[new TextRun({text:'Rekomendasi:',bold:true,size:22})]}),
        new Paragraph({spacing:{after:200}, children:[new TextRun({text:'[Isi rekomendasi]',size:22,italics:true})]}),
        // VII. PENUTUP
        new Paragraph({children:[new TextRun({text:'VII. PENUTUP',bold:true,size:24})]}),
        new Paragraph({spacing:{after:400}, children:[new TextRun({text:`Demikian laporan ini disusun sebagai bukti dukung pelaksanaan RHK ${rhk.no} pada Triwulan ${twLabel} Tahun 2026.`,size:22})]}),
        // TTD
        new Paragraph({text:''}),
        new Paragraph({text:''}),
        new Table({
          width:{size:100,type:WidthType.PERCENTAGE},
          rows:[
            new TableRow({children:[
              new TableCell({borders:borderNone, children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:'Mengetahui,',size:22})]})]}),
              new TableCell({borders:borderNone, children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:`Jember, .......... ${endMonth}`,size:22})]})]})
            ]}),
            new TableRow({children:[
              new TableCell({borders:borderNone, children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:'Ketua Pokjawas Kemenag Kab. Jember',size:22})]})]}),
              new TableCell({borders:borderNone, children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:'Pengawas Madrasah,',size:22})]})]})
            ]}),
            new TableRow({children:[
              new TableCell({borders:borderNone, children:[new Paragraph({text:''}),new Paragraph({text:''}),new Paragraph({text:''}),new Paragraph({text:''})]}),
              new TableCell({borders:borderNone, children:[new Paragraph({text:''}),new Paragraph({text:''}),new Paragraph({text:''}),new Paragraph({text:''})]})
            ]}),
            new TableRow({children:[
              new TableCell({borders:borderNone, children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:IDENTITAS.nama,bold:true,underline:{},size:22})]})]}),
              new TableCell({borders:borderNone, children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:IDENTITAS.nama,bold:true,underline:{},size:22})]})]})
            ]}),
            new TableRow({children:[
              new TableCell({borders:borderNone, children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:`NIP. ${IDENTITAS.nip}`,size:20})]})]}),
              new TableCell({borders:borderNone, children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:`NIP. ${IDENTITAS.nip}`,size:20})]})]})
            ]})
          ]
        }),
        new Paragraph({text:''}),
        new Paragraph({children:[new TextRun({text:'LAMPIRAN:',bold:true,size:22})]}),
        new Paragraph({numbering:{reference:'num2',level:0}, children:[new TextRun({text:'Dokumentasi foto kegiatan',size:22})]}),
        new Paragraph({numbering:{reference:'num2',level:0}, children:[new TextRun({text:'Daftar hadir peserta',size:22})]}),
        new Paragraph({numbering:{reference:'num2',level:0}, children:[new TextRun({text:'Instrumen yang digunakan',size:22})]}),
        new Paragraph({numbering:{reference:'num2',level:0}, children:[new TextRun({text:'Data hasil kegiatan',size:22})]}),
      ]
    }],
    numbering: {
      config: [
        { reference:'num1', levels:[{level:0,format:'decimal',text:'%1.',alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:720,hanging:360}}}}] },
        { reference:'num2', levels:[{level:0,format:'decimal',text:'%1.',alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:720,hanging:360}}}}] }
      ]
    }
  });

  const filename = `Eviden_RHK${rhk.no}_TW${twLabel}_${rhk.judul.replace(/[^a-zA-Z0-9]/g,'_').substring(0,30)}.docx`;
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(path.join(__dirname, filename), buffer);
  return filename;
}

async function main() {
  const files = [];
  for (const rhk of RHK_ALL) {
    const f = await generateDocx(rhk);
    files.push(f);
    console.log('Generated: ' + f);
  }
  console.log('\nTotal: ' + files.length + ' files');
}

main().catch(e => console.error(e));
