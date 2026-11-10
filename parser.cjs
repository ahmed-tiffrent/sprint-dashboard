const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.readFile(process.argv[2] || 'projectscrumburndownchart.xlsx');

const results = {};
workbook.SheetNames.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    // extract to json, raw rows for inspection
    results[sheetName] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
});

fs.writeFileSync('excel_data.json', JSON.stringify(results, null, 2));
console.log('Done reading excel.');
