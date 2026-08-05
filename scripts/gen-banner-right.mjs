/**
 * gen-banner.mjs — the profile banner (assets/banner.png) and the LinkedIn variants.
 *
 * Output: 1584x396 @2x = 3168x792 (LinkedIn profile-banner spec; also used as the
 * README hero). Composition: the portfolio dither wallpaper, radially masked so it
 * reads as texture behind the tiles and fades to clean black at the edges, then the
 * flagship icon tiles and three lines of mono type.
 *
 * Setup (from this repo root):
 *   mkdir -p dl
 *   gh api repos/br9704/brwski-portfolio/contents/public/images/wallpaper/dither-static.png \
 *     --jq '.content' | base64 -d > dl/dither.png
 *   ln -s . repo                       # the script reads repo/assets/icons/<slug>.svg
 *   SHARP_ESM=/path/to/node_modules/sharp/dist/index.mjs node scripts/gen-banner.mjs
 *
 * Run it from the directory holding dl/ and repo/ — paths are relative.
 * gen-banner-right.mjs is the same banner right-anchored, for LinkedIn (the left
 * third is left clean because the profile photo sits there).
 */
import { readFileSync } from "node:fs";
const sharp = (await import(process.env.SHARP_ESM)).default;

const S = 2;
const W = 1584 * S, H = 396 * S;
const MONO = "ui-monospace, 'SF Mono', 'DejaVu Sans Mono', Menlo, Consolas, monospace";
const RIGHT = W - 70 * S;                 // right anchor for all content

/* Background: portfolio dither, focal shifted RIGHT, fading to clean black on the
   left (where the LinkedIn profile photo sits) — partial, not everywhere. */
const dither = await sharp("dl/dither.png").resize(W, H, { fit: "cover", position: "top" }).png().toBuffer();
const mask = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
     <defs><radialGradient id="m" cx="70%" cy="34%" r="60%">
       <stop offset="0" stop-color="#fff" stop-opacity="0.62"/>
       <stop offset="0.5" stop-color="#fff" stop-opacity="0.32"/>
       <stop offset="1" stop-color="#000" stop-opacity="0"/>
     </radialGradient></defs>
     <rect width="${W}" height="${H}" fill="url(#m)"/>
   </svg>`,
);
const maskedDither = await sharp(dither).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
let base = await sharp({ create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 1 } } })
  .composite([{ input: maskedDither, left: 0, top: 0 }]).png().toBuffer();

const comps = [];

/* 3 flagship icons (white) on B&W tiles, RIGHT-aligned near the top */
const ICONS = ["aethereum", "pokeai", "sentinel", "jjmarine"];
const names = { aethereum: "Aethereum", pokeai: "Poke AI", sentinel: "Sentinel", jjmarine: "JJ Marine" };
const IP = 104 * S, GAP = 44 * S, GLYPH = 68 * S;
const rowW = ICONS.length * IP + (ICONS.length - 1) * GAP;
const startX = Math.round(RIGHT - rowW);      // right-anchored
const rowY = 42 * S;
const tileSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${IP}" height="${IP}"><rect width="${IP}" height="${IP}" rx="${16 * S}" fill="#000000"/><rect x="1" y="1" width="${IP - 2}" height="${IP - 2}" rx="${15 * S}" fill="none" stroke="#ffffff40" stroke-width="${1.5 * S}"/></svg>`;
let lab = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">`;
for (let i = 0; i < ICONS.length; i++) {
  const svg = readFileSync(`repo/assets/icons/${ICONS[i]}.svg`, "utf8").replaceAll("currentColor", "#ffffff");
  const glyph = await sharp(Buffer.from(svg)).resize(GLYPH, GLYPH, { kernel: "nearest", fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const t = await sharp(Buffer.from(tileSvg)).composite([{ input: glyph, gravity: "center" }]).png().toBuffer();
  const x = startX + i * (IP + GAP);
  comps.push({ input: t, left: x, top: rowY });
  lab += `<text x="${x + IP / 2}" y="${rowY + IP + 24 * S}" text-anchor="middle" font-family="${MONO}" font-size="${14 * S}" fill="#cfcfcf">${names[ICONS[i]]}</text>`;
}
lab += `</svg>`;
comps.push({ input: Buffer.from(lab), left: 0, top: 0 });

/* text — RIGHT-aligned (text-anchor="end" at RIGHT), no name, no cat */
const textSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <text x="${RIGHT}" y="${262 * S}" text-anchor="end" font-family="${MONO}" font-weight="700" font-size="${40 * S}" fill="#ffffff" letter-spacing="${1 * S}">building great experiences</text>
  <text x="${RIGHT}" y="${302 * S}" text-anchor="end" font-family="${MONO}" font-size="${17 * S}" fill="#bdbdbd">apps · SaaS · agentic AI   —   iOS · web · design + engineering as one</text>
  <text x="${RIGHT}" y="${340 * S}" text-anchor="end" font-family="${MONO}" font-size="${15 * S}" fill="#8f8f8f">melbourne, au   ·   open to work   ·   brunojaamaa.dev</text>
</svg>`;
comps.push({ input: Buffer.from(textSvg), left: 0, top: 0 });

await sharp(base).composite(comps).png().toFile("/Users/brunojaamaa/Desktop/bruno-linkedin-banner-v2-right.png");
console.log("right-aligned dither banner written");
