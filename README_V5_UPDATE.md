# RIDAA Store V5 — Advanced Product Experience

This update adds a premium product-card hover experience, Quick View carousel, Quick Shop, full product details, editable size guide, multiple product images, and desktop magnifier zoom.

## IMPORTANT — existing store
If your current live store already has a working `supabase-config.js`, **do not replace that file**. The V5 update ZIP intentionally does not include it.

## Update order
1. In Supabase > SQL Editor, run `ridaa-v5-upgrade.sql` once.
2. Upload/replace these files in GitHub:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `admin.html`
   - `admin.css`
   - `admin.js`
3. Commit. Cloudflare will redeploy from GitHub.
4. Open `admin.html`, edit any product and add:
   - main image
   - multiple gallery images
   - color name/color swatch
   - sizes
   - product-detail bullet points
   - size-guide drawing image
   - A/B/C measurements for M/L/XL/2XL

## Customer experience
- Hovering a product photo reveals Quick View + Quick Shop.
- Hovering each action morphs the label into an eye/cart icon.
- Quick View opens a gallery carousel without leaving the catalog.
- Clicking the product photo opens the complete product-detail experience.
- The complete view includes thumbnails, arrows, color, sizes, quantity, cart, size guide, and a desktop magnifier.

