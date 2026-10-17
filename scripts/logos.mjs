// Generates every Coding Moves logo as SVG from ONE master design.
// Child logos = same tile + same "C" mark, recoloured, plus a small corner badge.
// Run: node scripts/logos.mjs   (writes to public/logos and public/favicons)
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const VARIANTS = {
  main: {
    label: "Coding Moves",
    light: "#7DD3FC", // top / highlight
    mid: "#3B82F6", // main face
    deep: "#1E3A8A", // extrusion (3D side)
    chev: ["#67E8F9", "#3B82F6"],
    badge: null,
  },
  services: {
    label: "Coding Moves Services",
    light: "#FDE68A",
    mid: "#F59E0B",
    deep: "#9A3412",
    chev: ["#FCD34D", "#F97316"],
    badge: "briefcase",
  },
  lab: {
    label: "Coding Moves Lab",
    light: "#A5F3FC",
    mid: "#06B6D4",
    deep: "#155E75",
    chev: ["#CFFAFE", "#22D3EE"],
    badge: "flask",
  },
  "open-source": {
    label: "Coding Moves Open Source",
    light: "#A7F3D0",
    mid: "#10B981",
    deep: "#065F46",
    chev: ["#6EE7B7", "#14B8A6"],
    badge: "branch",
  },
  products: {
    label: "Coding Moves Products",
    light: "#DDD6FE",
    mid: "#8B5CF6",
    deep: "#4C1D95",
    chev: ["#C4B5FD", "#8B5CF6"],
    badge: "cube",
  },
  research: {
    label: "Coding Moves Research",
    light: "#F5D0FE",
    mid: "#C026D3",
    deep: "#701A75",
    chev: ["#F0ABFC", "#C026D3"],
    badge: "book",
  },
  academy: {
    label: "Coding Moves Academy",
    light: "#FECDD3",
    mid: "#F43F5E",
    deep: "#9F1239",
    chev: ["#FDA4AF", "#F43F5E"],
    badge: "cap",
  },
};

// The "C": an open hexagon (opening on the right), thick stroke.
const C_PATH = "M332,193 L224,130 L116,193 L116,319 L224,382 L332,319";
const CHEV_1 = "M300,214 L342,256 L300,298";
const CHEV_2 = "M362,214 L404,256 L362,298";

const BADGE_ICONS = {
  // all drawn in a 0..48 box, white strokes
  briefcase:
    '<rect x="6" y="15" width="36" height="25" rx="5"/><path d="M17 15v-4a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4"/><path d="M6 26h36"/>',
  flask:
    '<path d="M19 6h10"/><path d="M21 6v12L9 38a3 3 0 0 0 3 4h24a3 3 0 0 0 3-4L27 18V6"/><path d="M14 30h20"/>',
  branch:
    '<circle cx="14" cy="10" r="4.5"/><circle cx="14" cy="38" r="4.5"/><circle cx="34" cy="16" r="4.5"/><path d="M14 14.5v19"/><path d="M34 20.5c0 9-20 6-20 13"/>',
  cap:
    '<path d="M3 18 24 9l21 9-21 9z"/><path d="M12 22v10c0 3 6 6 12 6s12-3 12-6V22"/><path d="M45 18v12"/>',
  cube:
    '<path d="M24 5 41 14v20L24 43 7 34V14z"/><path d="M7 14l17 9 17-9"/><path d="M24 23v20"/>',
  book:
    '<path d="M24 12c-5-4-12-4-18-2v28c6-2 13-2 18 2 5-4 12-4 18-2V10c-6-2-13-2-18 2z"/><path d="M24 12v28"/>',
};

export function logoSvg(id, { size = 512, tile = true } = {}) {
  const v = VARIANTS[id];
  const g = (n) => `${id}-${n}`;
  const hasBadge = Boolean(v.badge);
  // Shift the mark slightly up-left when a badge sits in the corner.
  const shift = hasBadge
    ? "translate(244 244) scale(.84) translate(-262 -262)"
    : "translate(4 0)";

  const tileSvg = tile
    ? `
  <rect x="8" y="8" width="496" height="496" rx="116" fill="url(#${g("tile")})"/>
  <rect x="9.5" y="9.5" width="493" height="493" rx="114.5" fill="none" stroke="url(#${g("rim")})" stroke-width="3"/>
  <ellipse cx="256" cy="70" rx="210" ry="90" fill="url(#${g("shine")})"/>`
    : "";

  const badge = hasBadge
    ? `
  <g transform="translate(388 388)">
    <circle r="86" fill="${tile ? "#0A1222" : "none"}"/>
    <circle r="70" fill="url(#${g("badge")})"/>
    <circle r="70" fill="none" stroke="${v.light}" stroke-opacity=".55" stroke-width="3"/>
    <g transform="translate(-30 -30) scale(1.25)" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${BADGE_ICONS[v.badge]}</g>
  </g>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${size}" height="${size}" role="img" aria-label="${v.label} logo">
  <title>${v.label}</title>
  <defs>
    <linearGradient id="${g("tile")}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#16233F"/>
      <stop offset="1" stop-color="#060B16"/>
    </linearGradient>
    <linearGradient id="${g("rim")}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${v.light}" stop-opacity=".45"/>
      <stop offset=".5" stop-color="${v.mid}" stop-opacity=".12"/>
      <stop offset="1" stop-color="#000" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="${g("shine")}">
      <stop offset="0" stop-color="#fff" stop-opacity=".09"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${g("face")}" x1="116" y1="130" x2="332" y2="382" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${v.light}"/>
      <stop offset=".45" stop-color="${v.mid}"/>
      <stop offset="1" stop-color="${v.deep}"/>
    </linearGradient>
    <linearGradient id="${g("chev")}" x1="300" y1="0" x2="404" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${v.chev[0]}"/>
      <stop offset="1" stop-color="${v.chev[1]}"/>
    </linearGradient>
    <linearGradient id="${g("badge")}" x1="0" y1="-70" x2="0" y2="70" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${v.mid}"/>
      <stop offset="1" stop-color="${v.deep}"/>
    </linearGradient>
    <filter id="${g("glow")}" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="14"/>
    </filter>
  </defs>${tileSvg}
  <g transform="${shift}">
    <!-- soft glow behind the mark -->
    <path d="${C_PATH}" fill="none" stroke="${v.mid}" stroke-opacity=".45" stroke-width="64" filter="url(#${g("glow")})"/>
    <!-- 3D extrusion (the "side" of the block) -->
    <path d="${C_PATH}" transform="translate(9 13)" fill="none" stroke="${v.deep}" stroke-width="58" stroke-linejoin="miter"/>
    <path d="${CHEV_1}" transform="translate(6 9)" fill="none" stroke="${v.deep}" stroke-width="30" stroke-linejoin="miter"/>
    <path d="${CHEV_2}" transform="translate(6 9)" fill="none" stroke="${v.deep}" stroke-width="30" stroke-linejoin="miter"/>
    <!-- front face -->
    <path d="${C_PATH}" fill="none" stroke="url(#${g("face")})" stroke-width="58" stroke-linejoin="miter"/>
    <!-- top highlight line for the metallic edge -->
    <path d="M318,185 L224,130 L130,185" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="4" stroke-linejoin="miter" transform="translate(0 -24)"/>
    <path d="${CHEV_1}" fill="none" stroke="url(#${g("chev")})" stroke-width="30" stroke-linejoin="miter"/>
    <path d="${CHEV_2}" fill="none" stroke="url(#${g("chev")})" stroke-width="30" stroke-linejoin="miter"/>
  </g>${badge}
</svg>
`;
}

// Simplified mark for 16–32px: no glow, no highlight line, no badge.
export function faviconSvg(id) {
  const v = VARIANTS[id];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="f" x1="116" y1="130" x2="332" y2="382" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${v.light}"/><stop offset="1" stop-color="${v.mid}"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="512" height="512" rx="120" fill="#0B1220"/>
  <path d="${C_PATH}" transform="translate(-6 0)" fill="none" stroke="url(#f)" stroke-width="72" stroke-linejoin="miter"/>
  <path d="M296,206 L346,256 L296,306" fill="none" stroke="${v.chev[0]}" stroke-width="40"/>
  <path d="M372,206 L422,256 L372,306" fill="none" stroke="${v.chev[0]}" stroke-width="40"/>
</svg>
`;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const out = join(process.cwd(), "public", "logos");
  const favicons = join(process.cwd(), "public", "favicons");
  mkdirSync(out, { recursive: true });
  mkdirSync(favicons, { recursive: true });
  for (const id of Object.keys(VARIANTS)) {
    writeFileSync(join(out, `${id}.svg`), logoSvg(id));
    writeFileSync(join(out, `${id}-mark.svg`), logoSvg(id, { tile: false }));
    writeFileSync(join(favicons, `${id}.svg`), faviconSvg(id));
  }
  writeFileSync(join(process.cwd(), "public", "favicon.svg"), faviconSvg("main"));
  console.log("Logos and favicons written to public");
}
