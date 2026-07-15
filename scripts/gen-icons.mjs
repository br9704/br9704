/**
 * gen-icons.mjs — per-project pixel/.exe-style icons for the profile README + banner.
 *
 * Each icon is a 16x16 pixel-art glyph on a dark rounded "app tile" with a subtle
 * Win95 bevel (light top-left, dark bottom-right), so it stays visible on GitHub's
 * light AND dark themes. Output: assets/icons/<slug>.svg (crisp, scalable, tiny).
 *
 * Run: node scripts/gen-icons.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../assets/icons");
mkdirSync(OUT, { recursive: true });

const T = ".";
const G = 16;
const U = 6;
const PAD = 8;
const TILE = G * U + PAD * 2; // 112

function icon(slug, palette, rows, opts = {}) {
  if (rows.length !== G) throw new Error(`${slug}: expected ${G} rows, got ${rows.length}`);
  const px = [];
  rows.forEach((row, y) => {
    if (row.length !== G) throw new Error(`${slug}: row ${y} is ${row.length} wide: "${row}"`);
    [...row].forEach((c, x) => {
      if (c === T) return;
      const fill = palette[c];
      if (!fill) throw new Error(`${slug}: no palette entry for '${c}'`);
      px.push(`<rect x="${PAD + x * U}" y="${PAD + y * U}" width="${U}" height="${U}" fill="${fill}"/>`);
    });
  });
  const tile = opts.tile ?? "#0b0e0c";
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${TILE}" height="${TILE}" viewBox="0 0 ${TILE} ${TILE}" shape-rendering="crispEdges">` +
    `<rect width="${TILE}" height="${TILE}" rx="14" fill="${tile}"/>` +
    `<path d="M1 14 Q1 1 14 1 H${TILE - 14} Q${TILE - 1} 1 ${TILE - 1} 14" fill="none" stroke="#ffffff26" stroke-width="2"/>` +
    `<path d="M1 ${TILE - 14} Q1 ${TILE - 1} 14 ${TILE - 1} H${TILE - 14} Q${TILE - 1} ${TILE - 1} ${TILE - 1} ${TILE - 14}" fill="none" stroke="#00000073" stroke-width="2"/>` +
    px.join("") +
    `</svg>`;
  writeFileSync(resolve(OUT, `${slug}.svg`), svg);
}

/* Aethereum — the pixel "A" mark (brand green) */
icon("aethereum", { g: "#34C759", d: "#1f8f42" }, [
  "................",
  "....gggggg......",
  "...gg....gg.....",
  "..gg......gg....",
  "..gg......gg....",
  "..gg......gg....",
  "..gggggggggg....",
  "..gg......gg....",
  "..gg......gg....",
  "..gg......gg....",
  "..gg......gg....",
  "................",
  ".gg..gg..gg..gg.",
  ".dd..dd..dd..dd.",
  "................",
  "................",
], { tile: "#08130c" });

/* JJMarine — an anchor (gold on navy) */
icon("jjmarine", { n: "#e8b23a", d: "#b07f18", w: "#f6e0a2" }, [
  "................",
  ".......nn.......",
  "......nwwn......",
  "......nwwn......",
  ".....nnnnnn.....",
  ".......nn.......",
  ".......nn.......",
  ".......nn.......",
  "..n....nn....n..",
  ".nn....nn....nn.",
  ".nd....nn....dn.",
  ".nd...nnnn...dn.",
  "..nn.nn..nn.nn..",
  "...nnnn..nnnn...",
  ".....nn..nn.....",
  "......nnnn......",
], { tile: "#0a1526" });

/* Poke AI — a Pokeball */
icon("pokeai", { k: "#141414", r: "#ee1c25", w: "#f7f7f7", b: "#e0e0e0" }, [
  "....kkkkkkkk....",
  "..kkrrrrrrrrkk..",
  ".krrrrrrrrrrrrk.",
  ".krrrrrrrrrrrrk.",
  "krrrrrrrrrrrrrrk",
  "krrrrrrrrrrrrrrk",
  "kkkkkkkwwkkkkkkk",
  "kwwwwwkwwkwwwwwk",
  "kbbbbwwwwwwbbbbk",
  "kkkkkkkwwkkkkkkk",
  "kbbbbbbbbbbbbbbk",
  "kbbbbbbbbbbbbbbk",
  ".kbbbbbbbbbbbbk.",
  ".kbbbbbbbbbbbbk.",
  "..kkbbbbbbbbkk..",
  "....kkkkkkkk....",
], { tile: "#180909" });

/* Sentinel — a watching eye (steel-blue) */
icon("sentinel", { s: "#5b8bd0", w: "#e6effb", i: "#12294a", c: "#8fbdf2", d: "#2c527f" }, [
  "................",
  "................",
  "....ssssssss....",
  "..sswwwwwwwwss..",
  ".swwwwiiiiwwwws.",
  "swwwiicccciiwwws",
  "swwwiicwwciiwwws",
  "swwwiicccciiwwws",
  ".swwwwiiiiwwwws.",
  "..sswwwwwwwwss..",
  "....ssssssss....",
  "................",
  ".....d....d.....",
  "...dd..dd..dd...",
  "................",
  "................",
], { tile: "#0a1220" });

/* The Desktop — a CRT monitor (Win95 teal screen) */
icon("desktop", { g: "#c9d1cf", d: "#7d8a86", s: "#1aa89a", h: "#7fe9dd", k: "#0c0f0e" }, [
  "................",
  ".gggggggggggggg.",
  ".gkkkkkkkkkkkkg.",
  ".gksssssssssskg.",
  ".gkshhssssssskg.",
  ".gksssssssssskg.",
  ".gkssssshhssskg.",
  ".gksssssssssskg.",
  ".gkssssssshsskg.",
  ".gkkkkkkkkkkkkg.",
  ".gggggggggggggg.",
  "...gg......gg...",
  "....dddddddd....",
  "...dddddddddd...",
  "..dddddddddddd..",
  "................",
], { tile: "#0a1210" });

/* SpeechMax — a microphone (green) */
icon("speechmax", { g: "#34C759", d: "#1f8f42", k: "#0c110d" }, [
  "......gggg......",
  ".....gggggg.....",
  ".....gkkkkg.....",
  ".....gggggg.....",
  ".....gkkkkg.....",
  ".....gggggg.....",
  ".....gkkkkg.....",
  "....gggggggg....",
  "....dg....gd....",
  "....dg....gd....",
  ".....dg..gd.....",
  "......dddd......",
  ".......gg.......",
  ".......gg.......",
  ".....gggggg.....",
  "................",
], { tile: "#0b0e0c" });

/* Rock Purple — a vinyl record */
icon("rockpurple", { p: "#a855f7", k: "#1c0a2e", d: "#6d28d9", w: "#ede0ff" }, [
  "....pppppppp....",
  "..ppkkkkkkkkpp..",
  ".pkkppppppppkkp.",
  ".pkpddddddddpkp.",
  "pkpdkkkkkkkkdpkp",
  "pkpdkwwwwwwkdpkp",
  "pkpdkwppppwkdpkp",
  "pkpdkwppppwkdpkp",
  "pkpdkwwwwwwkdpkp",
  "pkpdkkkkkkkkdpkp",
  ".pkpddddddddpkp.",
  ".pkkppppppppkkp.",
  "..ppkkkkkkkkpp..",
  "....pppppppp....",
  "................",
  "................",
], { tile: "#150a24" });

/* gitpulse — a terminal >_ prompt */
icon("gitpulse", { g: "#34C759", d: "#1f8f42", k: "#04170b" }, [
  ".dddddddddddddd.",
  ".dkkkkkkkkkkkkd.",
  ".dkkkkkkkkkkkkd.",
  ".dkgg.........d.",
  ".dkggg........d.",
  ".dkgggg.......d.",
  ".dkggggg......d.",
  ".dkgggg..gggg.d.",
  ".dkggg...gggg.d.",
  ".dkgg.........d.",
  ".dkg..........d.",
  ".dkkkkkkkkkkkkd.",
  ".dkkkkkkkkkkkkd.",
  ".dddddddddddddd.",
  "................",
  "................",
], { tile: "#04160a" });

/* UniSpace — a map pin */
icon("unispace", { a: "#ff9f1c", d: "#c56f00", w: "#ffe6b0", k: "#1a1204" }, [
  ".....aaaa.......",
  "...aaaaaaaa.....",
  "..aaaaaaaaaa....",
  "..aakwwwwkaa....",
  ".aakwwwwwwkaa...",
  ".aakwwkkwwkaa...",
  ".aakwwkkwwkaa...",
  ".aakwwwwwwkaa...",
  "..aakwwwwkaa....",
  "..aaaaaaaaaa....",
  "...aaaaaaaa.....",
  "....aaaaaa......",
  ".....aaaa.......",
  "......aa........",
  "......dd........",
  "................",
], { tile: "#1a1204" });

/* Ripple — concentric ripples */
icon("ripple", { b: "#38bdf8", d: "#0284c7", w: "#bae6fd" }, [
  "................",
  "......dddd......",
  "....dd....dd....",
  "...d..bbbb..d...",
  "..d..b....b..d..",
  "..d.b..ww..b.d..",
  ".d..b.wwww.b..d.",
  ".d..b.wwww.b..d.",
  ".d..b..ww..b..d.",
  "..d.b......b.d..",
  "..d..b....b..d..",
  "...d..bbbb..d...",
  "....dd....dd....",
  "......dddd......",
  "................",
  "................",
], { tile: "#04141f" });

console.log("wrote icons to", OUT);
