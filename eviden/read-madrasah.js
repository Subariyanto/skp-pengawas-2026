const XLSX = require('xlsx');
const wb = XLSX.readFile('C:\\Users\\subar\\.openclaw\\media\\inbound\\DATA_MADRASAH_EVIDEN---ad688886-ee33-47a9-be4f-a8c3fd0ce616.xlsx');
console.log('Sheets:', wb.SheetNames);
wb.SheetNames.forEach(name => {
  const ws = wb.Sheets[name];
  const data = XLSX.utils.sheet_to_json(ws, {header:1, defval:''});
  console.log('\n=== ' + name + ' (' + data.length + ' rows) ===');
  data.slice(0, 40).forEach((row, i) => {
    const line = row.map(c => String(c).substring(0,60)).join(' | ');
    if(line.replace(/[| ]/g,'')) console.log('Row ' + (i+1) + ': ' + line);
  });
});
