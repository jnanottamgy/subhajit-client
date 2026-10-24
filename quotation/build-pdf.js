// Renders quotation.html to an A4 PDF.
// Usage: node quotation/build-pdf.js   (needs the `playwright` package and a Chromium build)
// Company name, quotation number and dates come from the QUOTE block at the top of quotation.html.
const path = require('path');
const { chromium } = require('playwright');

const src = path.join(__dirname, 'quotation.html');
const out = path.join(__dirname, 'Quotation_Edwin_Paul_Website.pdf');

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + src, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: 'print' });
  const q = await page.evaluate(() => window.QUOTE || {});

  const footer = `
    <div style="width:100%; padding:0 16mm; font-family:Helvetica, Arial, sans-serif; font-size:7.5px;
                color:#5A685F; display:flex; justify-content:space-between; letter-spacing:.04em;">
      <span>${esc(q.company || '')} &middot; Quotation ${esc(q.quoteNo || '')} for Edwin Paul</span>
      <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
    </div>`;

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
