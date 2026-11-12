// Renders the raster brand files the site serves from `public/`: the social card (og.png), the
// iOS home-screen icon and the web manifest icons. Run `npm run brand-assets` after the logo
// changes and commit the output; the build does not run this.
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const publicDir = fileURLToPath(new URL('../public/', import.meta.url));
const PAPER = '#FAF8F1';
const INK = '#22301F';
const BRAND = '#1F7A4E';
const MUTED = '#75705F';

const icon = await readFile(`${publicDir}brand/logo-icon.svg`);
const lockup = await readFile(`${publicDir}brand/logo-default.svg`);

/** The mark centred on a paper square, with breathing room around it. */
async function squareIcon(size) {
  const mark = await sharp(icon, { density: 600 })
    .resize({ width: Math.round(size * 0.62), height: Math.round(size * 0.62), fit: 'inside' })
    .png()
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: PAPER } })
    .composite([{ input: mark, gravity: 'centre' }])
    .png();
}

await (await squareIcon(180)).toFile(`${publicDir}apple-touch-icon.png`);
await (await squareIcon(192)).toFile(`${publicDir}icon-192.png`);
await (await squareIcon(512)).toFile(`${publicDir}icon-512.png`);

// Social card, 1200x630, one per language: the card carries a sentence, and a Portuguese page
// shared with an English card reads as the wrong site.
const logo = await sharp(lockup, { density: 300 }).resize({ width: 360 }).png().toBuffer();
const CARDS = [
  {
    file: 'og.png',
    line1: 'Know what fits',
    line2: 'your diet',
    lead: 'Scan any food. Get a 0-100 score made for you.',
  },
  {
    file: 'og-pt-br.png',
    line1: 'Saiba o que cabe',
    line2: 'na sua dieta',
    lead: 'Escaneie qualquer alimento. Receba uma nota de 0 a 100 feita para você.',
  },
];

for (const card of CARDS) {
  const text = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <style>
    text { font-family: 'Plus Jakarta Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; }
  </style>
  <text x="80" y="330" font-size="84" font-weight="800" fill="${INK}" letter-spacing="-2.5">${card.line1}</text>
  <text x="80" y="428" font-size="84" font-weight="800" fill="${BRAND}" letter-spacing="-2.5">${card.line2}</text>
  <text x="80" y="508" font-size="31" font-weight="500" fill="${MUTED}">${card.lead}</text>
  <rect x="80" y="560" width="1040" height="6" rx="3" fill="${BRAND}" opacity=".18"/>
</svg>`);

  await sharp({ create: { width: 1200, height: 630, channels: 4, background: PAPER } })
    .composite([
      { input: logo, left: 80, top: 84 },
      { input: text, left: 0, top: 0 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(`${publicDir}${card.file}`);
}

console.log('Wrote og.png, og-pt-br.png, apple-touch-icon.png, icon-192.png and icon-512.png to public/');
