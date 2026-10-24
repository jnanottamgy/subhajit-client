// Renders quotation.html to an A4 PDF.
// Usage: node quotation/build-pdf.js   (needs the `playwright` package and a Chromium build)
const path = require('path');
const { chromium } = require('playwright');

const src = path.join(__dirname, 'quotation.html');
const out = path.join(__dirname, 'Quotation_Subhajit_Website_JN-Q-2026-27-001.pdf');

const footer = `
  <div style="width:100%; padding:0 16mm; font-family:Helvetica, Arial, sans-serif; font-size:7.5px;
              color:#5A685F; display:flex; justify-content:space-between; letter-spacing:.04em;">
    <span>Jnanottam &middot; Quotation JN/Q/2026-27/001 for Subhajit</span>
    <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
  </div>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + src, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: 'print' });
  await page.pdf({
    path: out,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: footer,
  });
  await browser.close();
  console.log('Wrote ' + out);
})();
