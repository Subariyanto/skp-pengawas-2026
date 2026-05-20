const XLSX = require('xlsx');
const wb = XLSX.readFile('C:\\Users\\subar\\.openclaw\\media\\inbound\\01-SKP_SUBARIYANTO_2026_Rev.1---8cfb6dc2-0067-4d73-9bf7-834387aab9e7.xlsm');

// SKP sheet has links in column P (index 15)
const ws = wb.Sheets['SKP'];
const data = XLSX.utils.sheet_to_json(ws, {header:1, defval:''});

// Find rows with RHK data (rows 16+ have RHK entries with links in col P)
console.log('=== Links from SKP sheet (Col P = Link Bukti Dukung) ===');
for (let i = 15; i < 80; i++) {
  const row = data[i];
  if (!row) continue;
  const no = row[1]; // col B = No
  const link = row[15]; // col P = Link
  if (no && link && String(link).startsWith('http')) {
    console.log('RHK ' + no + ': ' + link);
  }
}

// Also check Eviden sheet
if (wb.Sheets['Eviden']) {
  console.log('\n=== Eviden Sheet ===');
  const evWs = wb.Sheets['Eviden'];
  const evData = XLSX.utils.sheet_to_json(evWs, {header:1, defval:''});
  for (let i = 0; i < Math.min(60, evData.length); i++) {
    const row = evData[i];
    const line = row.map((c,ci) => {
      const s = String(c);
      if (s.startsWith('http') || s.length > 3) return 'Col'+ci+':'+s.substring(0,100);
      return '';
    }).filter(x=>x).join(' | ');
    if (line) console.log('Row '+(i+1)+': '+line);
  }
}

// Check RHK sheets for links
for (let n = 1; n <= 6; n++) {
  const sheetName = 'RHK-' + n;
  if (wb.Sheets[sheetName]) {
    const rhkWs = wb.Sheets[sheetName];
    const rhkData = XLSX.utils.sheet_to_json(rhkWs, {header:1, defval:''});
    let links = [];
    rhkData.forEach((row, i) => {
      row.forEach((cell, ci) => {
        if (String(cell).startsWith('http')) links.push('Row'+(i+1)+' Col'+ci+': '+cell);
      });
    });
    if (links.length) {
      console.log('\n=== ' + sheetName + ' links ===');
      links.forEach(l => console.log(l));
    }
  }
}
