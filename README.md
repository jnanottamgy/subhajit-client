# Edwin Paul – Website Quotation

Quotation for Chef Edwin Paul: a Shopify food-ordering website for catering and corporate buyers, ₹83,000.

- `quotation/quotation.html` – the quotation (open in any browser)
- `quotation/Quotation_Edwin_Paul_Website.pdf` – A4 PDF
- `quotation/build-pdf.js` – rebuilds the PDF after edits: `node quotation/build-pdf.js`

## Rebranding

Open `quotation/quotation.html` and edit the `window.QUOTE` block near the top:
company name, tagline, contact line (phone, email, GSTIN), monogram, quotation number and dates.
The header, "Prepared by", signature line and PDF footer all update from it. Any field still on
its default text shows a yellow highlight, so nothing gets sent with a placeholder by mistake.
Brand colours are the tokens at the top of the `<style>` block (`--leaf`, `--turmeric`, …).
