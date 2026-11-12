/* Layered Toronto skyline. One coordinate system (viewBox 0 0 1600 520),
   Each layer is drawn wide enough for its parallax factor over the full
   drive range (±MAX_WORLD): far ×0.18, mid ×0.45, near ×1.
   GROUND = 430 is the base line for every building. */
import { memo } from "react";

export const VB_W = 1600;
export const VB_H = 520;
export const GROUND = 430;
export const RAIL_Y = 490;
export const MAX_WORLD = 3000;
export const TRACK_L = -2420;
export const TRACK_R = 4020;

export type SignData = { name: string; src?: string };

/* Rooftop billboard, mounted on a flat roof: a plinth across the roof, two
   legs at the building edges, and a lit panel the width of the building.
   (bx, bw, top) are the host building's front-face x, width and roof line. */
function Sign({ bx, bw, top, h = 34, data, hot = false }: { bx: number; bw: number; top: number; h?: number; data: SignData; hot?: boolean }) {
  const x = bx + 3;
  const w = bw - 6;
  const y = top - 12 - h;
  const stroke = hot ? "#d4ff3a" : "#b7c3ff";
  return (
    <g>
      <rect x={bx} y={top - 3} width={bw} height={3} fill="#070c45" stroke={stroke} strokeWidth="1" />
      <path d={`M${bx + 7},${top - 3} V${y + h} M${bx + bw - 7},${top - 3} V${y + h}`} stroke={stroke} strokeWidth="2" />
      <path d={`M${bx + 7},${top - 3} L${bx + 15},${y + h} M${bx + bw - 7},${top - 3} L${bx + bw - 15},${y + h}`} stroke={stroke} strokeWidth="1" />
      <rect x={x - 4} y={y - 4} width={w + 8} height={h + 8} rx={7} fill={hot ? "#d4ff3a" : "#5c70ff"} opacity={hot ? 0.18 : 0.14} />
      <rect x={x} y={y} width={w} height={h} rx={4} fill="#05060f" stroke={stroke} strokeWidth="1.75" />
      {data.src ? (
        <image href={data.src} x={x + 8} y={y + 7} width={w - 16} height={h - 14} preserveAspectRatio="xMidYMid meet" filter="url(#toWhite)" />
      ) : (
        <text x={x + w / 2} y={y + h / 2 + 4.5} textAnchor="middle" fontSize="12" fontFamily="volksans" fill="#eef1ff" letterSpacing="-0.4">{data.name}</text>
      )}
    </g>
  );
}

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* An extruded box: front face + angled side + top, giving the flat line-art a
   sense of depth. `d` is extrusion depth. */
function Box({ x, y, w, h, d = 8, front, side, stroke, sw = 1.5, win, lit }: {
  x: number; y: number; w: number; h: number; d?: number;
  front: string; side: string; stroke: string; sw?: number; win?: string; lit?: [number, number][];
}) {
  return (
    <g>
      <path d={`M${x + w},${y} l${d},${-d * 0.6} v${h} l${-d},${d * 0.6} Z`} fill={side} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
      <path d={`M${x},${y} l${d},${-d * 0.6} h${w} l${-d},${d * 0.6} Z`} fill={side} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
      <rect x={x} y={y} width={w} height={h} fill={front} stroke={stroke} strokeWidth={sw} />
      {win && <rect x={x + 3} y={y + 5} width={w - 6} height={h - 8} fill={win} />}
      {lit?.map(([lx, ly], i) => (
        <rect key={i} x={lx} y={ly} width={3} height={4} fill="#dce2ff" className="win-lit"
          style={{ ["--td" as string]: `${(i * 1.7) % 7}s`, ["--tw" as string]: `${4 + (i % 5)}s` }} />
      ))}
    </g>
  );
}

function litWindows(r: () => number, x: number, y: number, w: number, h: number, n: number): [number, number][] {
  const out: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const cx = x + 5 + Math.floor(r() * ((w - 10) / 6)) * 6;
    const cy = y + 8 + Math.floor(r() * ((h - 16) / 9)) * 9;
    out.push([cx, cy]);
  }
  return out;
}

export function Defs() {
  return (
    <defs>
      <linearGradient id="farFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0c1678" stopOpacity="0.55" />
        <stop offset="1" stopColor="#05060f" stopOpacity="0.9" />
      </linearGradient>
      <linearGradient id="midFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#1422b0" stopOpacity="0.55" />
        <stop offset="0.55" stopColor="#070c45" stopOpacity="0.95" />
        <stop offset="1" stopColor="#05060f" />
      </linearGradient>
      <linearGradient id="midSide" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0c1678" />
        <stop offset="1" stopColor="#04050d" />
      </linearGradient>
      <linearGradient id="hero" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#5c70ff" stopOpacity="0.7" />
        <stop offset="0.5" stopColor="#1422b0" stopOpacity="0.9" />
        <stop offset="1" stopColor="#05060f" />
      </linearGradient>
      <linearGradient id="nearFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0a0f33" />
        <stop offset="1" stopColor="#05060f" />
      </linearGradient>
      <radialGradient id="skyGlow" cx="0.62" cy="1" r="0.75">
        <stop offset="0" stopColor="#2e46ff" stopOpacity="0.55" />
        <stop offset="0.45" stopColor="#1c30e6" stopOpacity="0.16" />
        <stop offset="1" stopColor="#05060f" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="podGlow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#b7c3ff" stopOpacity="0.8" />
        <stop offset="1" stopColor="#2e46ff" stopOpacity="0" />
      </radialGradient>
      <filter id="toWhite" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
      </filter>
      <pattern id="winFar" width="6" height="8" patternUnits="userSpaceOnUse">
        <rect width="2" height="3" fill="#1c30e6" opacity="0.45" />
      </pattern>
      <pattern id="winMid" width="6" height="9" patternUnits="userSpaceOnUse">
        <rect width="3" height="4" fill="#5c70ff" opacity="0.28" />
      </pattern>
      <pattern id="pinstripe" width="5" height="10" patternUnits="userSpaceOnUse">
        <rect width="1" height="10" fill="#8a9bff" opacity="0.4" />
      </pattern>
      <pattern id="grid" width="7" height="7" patternUnits="userSpaceOnUse">
        <path d="M7 0H0V7" fill="none" stroke="#5c70ff" strokeOpacity="0.35" strokeWidth="0.75" />
      </pattern>
    </defs>
  );
}

/* ── FAR: dense procedural towers, thin strokes, low contrast ── */
export const FarLayer = memo(function FarLayer() {
  const r = rng(7);
  const items: React.ReactNode[] = [];
  let x = -1300;
  let i = 0;
  while (x < 2900) {
    const w = 26 + Math.floor(r() * 44);
    // taller cluster around downtown core (x≈900–1500)
    const core = Math.exp(-Math.pow((x - 1150) / 520, 2));
    const h = 70 + r() * 90 + core * 150;
    const y = GROUND - h;
    items.push(
      <g key={i++}>
        <rect x={x} y={y} width={w} height={h} fill="url(#farFill)" stroke="#1c30e6" strokeOpacity="0.7" strokeWidth="1" />
        <rect x={x + 3} y={y + 5} width={w - 6} height={h - 6} fill="url(#winFar)" />
        {r() > 0.7 && <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y - 10 - r() * 14} stroke="#1c30e6" strokeWidth="1" />}
      </g>
    );
    x += w + Math.floor(r() * 10) - 2;
  }
  return <g>{items}</g>;
});

/* ── MID: Toronto landmarks + filler towers, heavy linework, extruded ── */
export const MidLayer = memo(function MidLayer({ presenting, others }: { presenting: SignData[]; others: SignData[] }) {
  const r = rng(42);
  const S = "#8a9bff";
  const fillers: React.ReactNode[] = [];
  const filler = (x: number, w: number, top: number, k: number) => {
    const h = GROUND - top;
    fillers.push(<Box key={`f${k}`} x={x} y={top} w={w} h={h} front="url(#midFill)" side="url(#midSide)" stroke={S} win="url(#winMid)" lit={litWindows(r, x, top, w, h, Math.round(h / 40))} />);
  };
  // procedural towers beyond the downtown core — revealed as you drive
  const signs: React.ReactNode[] = [];
  let si = 0;
  const strip = (from: number, to: number, base: number) => {
    let x = from;
    let k = base;
    while (x < to) {
      const carries = k % 3 === 0 && others.length > 0;
      const w = carries ? 92 + Math.floor(r() * 22) : 40 + Math.floor(r() * 30);
      const top = carries ? 210 + Math.floor(r() * 90) : 190 + Math.floor(r() * 130);
      filler(x, w, top, k);
      if (carries) signs.push(<Sign key={`s${k}`} bx={x} bw={w} top={top} data={others[si++ % others.length]} />);
      x += w + 14 + Math.floor(r() * 26);
      k++;
    }
  };
  strip(-1900, 170, 0);
  strip(1500, 3500, 1000);
  // in-frame fillers between landmarks
  [[365, 34, 280], [580, 40, 255]].forEach(([x, w, t], k) => filler(x, w, t, 200 + k));

  return (
    <g strokeLinejoin="round">
      {fillers}

      {/* Aura — stepped crown */}
      <g>
        <Box x={200} y={120} w={48} h={GROUND - 120} front="url(#midFill)" side="url(#midSide)" stroke={S} win="url(#winMid)" lit={litWindows(r, 200, 120, 48, 310, 8)} />
        <path d="M206,120 v-10 h36 v10 M212,110 v-9 h24 v9 M219,101 v-12 h10 v12" fill="#070c45" stroke={S} strokeWidth="1.5" />
        <line x1="224" y1="89" x2="224" y2="70" stroke={S} strokeWidth="1.5" />
      </g>

      {/* One Bloor — curved glass */}
      <g>
        <path d={`M262,${GROUND} V170 C262,150 290,138 318,140 V${GROUND} Z`} fill="url(#midFill)" stroke={S} strokeWidth="1.5" />
        <path d={`M318,140 l8,-5 V${GROUND - 5} l-8,5`} fill="url(#midSide)" stroke={S} strokeWidth="1.5" />
        {Array.from({ length: 6 }).map((_, k) => (
          <path key={k} d={`M${268 + k * 8},${GROUND} V${165 - k * 4}`} stroke={S} strokeOpacity="0.35" strokeWidth="1" />
        ))}
      </g>

      {/* Old City Hall — clock tower */}
      <g>
        <Box x={392} y={352} w={120} h={GROUND - 352} d={6} front="url(#midFill)" side="url(#midSide)" stroke={S} win="url(#winMid)" />
        <path d="M392,352 l10,-14 h100 l10,14" fill="#070c45" stroke={S} strokeWidth="1.5" />
        <rect x={438} y={235} width={30} height={117} fill="url(#midFill)" stroke={S} strokeWidth="1.5" />
        <path d="M434,235 L453,196 L472,235 Z" fill="#0c1678" stroke={S} strokeWidth="1.5" />
        <circle cx={453} cy={256} r={9} fill="#05060f" stroke="#dce2ff" strokeWidth="1.5" />
        <path d="M453,256 v-6 M453,256 h4" stroke="#dce2ff" strokeWidth="1.2" />
        <line x1="453" y1="196" x2="453" y2="184" stroke={S} strokeWidth="1.5" />
      </g>

      {/* L Tower — flowing curve */}
      <g>
        <path d={`M524,${GROUND} V190 C524,170 532,160 548,158 C556,190 566,230 572,${GROUND} Z`} fill="url(#midFill)" stroke={S} strokeWidth="1.5" />
        <path d={`M536,${GROUND} V180 M548,${GROUND} V162`} stroke={S} strokeOpacity="0.4" strokeWidth="1" />
      </g>

      {/* Rogers Centre — the dome */}
      <g>
        <path d={`M630,${GROUND} V372 H870 V${GROUND}`} fill="url(#midFill)" stroke={S} strokeWidth="1.5" />
        <path d="M630,372 C660,318 840,318 870,372 Z" fill="url(#hero)" stroke="#b7c3ff" strokeWidth="1.75" />
        {[0.18, 0.36, 0.5, 0.64, 0.82].map((t, k) => {
          const px = 630 + 240 * t;
          return <path key={k} d={`M${px},372 Q${750 + (px - 750) * 0.25},${332} 750,331`} fill="none" stroke="#b7c3ff" strokeOpacity="0.55" strokeWidth="1" />;
        })}
        <path d="M641,355 C680,336 820,336 859,355" fill="none" stroke="#b7c3ff" strokeOpacity="0.5" strokeWidth="1" />
        <rect x={630} y={380} width={240} height={50} fill="url(#grid)" />
        {Array.from({ length: 9 }).map((_, k) => (
          <rect key={k} x={642 + k * 26} y={392} width={14} height={20} rx={7} fill="#05060f" stroke={S} strokeWidth="1" />
        ))}
      </g>

      {/* Union tower — flat roof, carries a presenting billboard */}
      <Box x={878} y={236} w={94} h={GROUND - 236} d={7} front="url(#midFill)" side="url(#midSide)" stroke={S} win="url(#winMid)" lit={litWindows(r, 878, 236, 94, 194, 7)} />

      {/* CN Tower — the hero, scaled up from its base, brightest strokes + glow */}
      <g transform={`translate(1010 ${GROUND}) scale(1.24) translate(-1010 ${-GROUND})`}>
        <circle cx={1010} cy={140} r={70} fill="url(#podGlow)" opacity="0.55" />
        {/* legs */}
        <path d={`M984,${GROUND} L1003,160 H1017 L1036,${GROUND} Z`} fill="url(#hero)" stroke="#dce2ff" strokeWidth="1.75" />
        <path d={`M1010,${GROUND} V160 M994,${GROUND - 40} L1006,175 M1026,${GROUND - 40} L1014,175`} stroke="#dce2ff" strokeOpacity="0.6" strokeWidth="1" />
        {/* main pod */}
        <path d="M985,156 Q1010,166 1035,156 L1040,146 Q1010,134 980,146 Z" fill="#1c30e6" stroke="#eef1ff" strokeWidth="1.75" />
        <path d="M982,146 Q1010,136 1038,146 L1034,134 Q1010,124 986,134 Z" fill="#070c45" stroke="#eef1ff" strokeWidth="1.5" />
        <path d="M986,140 Q1010,131 1034,140" fill="none" stroke="#dce2ff" strokeWidth="2" strokeDasharray="2 3" />
        {/* upper shaft */}
        <path d="M1006,128 L1007.5,62 H1012.5 L1014,128 Z" fill="url(#hero)" stroke="#dce2ff" strokeWidth="1.5" />
        {/* skypod */}
        <rect x={1001} y={54} width={18} height={9} rx={3} fill="#1c30e6" stroke="#eef1ff" strokeWidth="1.5" />
        {/* antenna */}
        <path d="M1008.5,54 L1009.4,10 H1010.6 L1011.5,54 Z" fill="#dce2ff" stroke="#dce2ff" strokeWidth="1" />
        <circle cx={1010} cy={9} r={2.6} fill="#eef1ff" className="beacon" />
        <circle cx={1010} cy={9} r={8} fill="url(#podGlow)" className="beacon" />
      </g>

      {/* TD Centre — two black towers with grid */}
      <g>
        <Box x={1060} y={150} w={84} h={GROUND - 150} front="#05060f" side="#04050d" stroke={S} />
        <rect x={1062} y={152} width={80} height={GROUND - 154} fill="url(#grid)" />
        <Box x={1152} y={208} w={42} h={GROUND - 208} front="#05060f" side="#04050d" stroke={S} />
        <rect x={1154} y={210} width={38} height={GROUND - 212} fill="url(#grid)" />
      </g>

      {/* First Canadian Place — tallest office, pinstriped */}
      <g>
        <Box x={1206} y={92} w={60} h={GROUND - 92} d={9} front="url(#midFill)" side="url(#midSide)" stroke="#b7c3ff" />
        <rect x={1209} y={95} width={54} height={GROUND - 96} fill="url(#pinstripe)" />
        <path d="M1206,92 v10 M1266,92 v10" stroke="#eef1ff" strokeWidth="2" />
        <line x1="1236" y1="92" x2="1236" y2="70" stroke="#b7c3ff" strokeWidth="1.5" />
        {litWindows(r, 1206, 92, 60, 330, 10).map(([lx, ly], k) => (
          <rect key={k} x={lx} y={ly} width={3} height={4} fill="#dce2ff" className="win-lit" style={{ ["--td" as string]: `${k * 0.9}s` }} />
        ))}
      </g>

      {/* Scotia Plaza — notched chevron top */}
      <g>
        <Box x={1280} y={128} w={54} h={GROUND - 128} front="url(#midFill)" side="url(#midSide)" stroke={S} win="url(#winMid)" lit={litWindows(r, 1280, 128, 54, 300, 9)} />
        <path d="M1280,128 L1290,112 L1300,124 L1307,104 L1314,124 L1324,112 L1334,128" fill="#0c1678" stroke={S} strokeWidth="1.5" />
      </g>

      {/* Commerce Court West */}
      <Box x={1340} y={182} w={76} h={GROUND - 182} front="url(#midFill)" side="url(#midSide)" stroke={S} win="url(#winMid)" lit={litWindows(r, 1340, 182, 76, 248, 7)} />

      {/* The One — supertall with exoskeleton */}
      <g>
        <Box x={1428} y={64} w={40} h={GROUND - 64} d={7} front="url(#midFill)" side="url(#midSide)" stroke="#b7c3ff" />
        {Array.from({ length: 12 }).map((_, k) => {
          const y0 = 70 + k * 30;
          return <path key={k} d={`M1428,${y0} L1468,${y0 + 30} M1468,${y0} L1428,${y0 + 30}`} stroke="#8a9bff" strokeOpacity="0.45" strokeWidth="1" />;
        })}
        <path d="M1428,64 h40" stroke="#eef1ff" strokeWidth="2" />
      </g>

      {/* rooftop billboards */}
      {signs}
      {presenting[0] && <Sign bx={878} bw={94} top={236} data={presenting[0]} hot />}
      {presenting[1] && <Sign bx={1060} bw={84} top={150} data={presenting[1]} hot />}
      {presenting[2] && <Sign bx={1340} bw={76} top={182} data={presenting[2]} hot />}
    </g>
  );
});

/* ── NEAR: low-rise storefronts, trees, catenary poles ── */
export const NearLayer = memo(function NearLayer() {
  const r = rng(99);
  const S = "#b7c3ff";
  const items: React.ReactNode[] = [];
  let x = -3700;
  let i = 0;
  while (x < 5300) {
    const w = 46 + Math.floor(r() * 46);
    const h = 36 + Math.floor(r() * 44);
    const y = GROUND - h;
    const type = r();
    items.push(
      <g key={i++}>
        <rect x={x} y={y} width={w} height={h} fill="url(#nearFill)" stroke={S} strokeWidth="1.75" />
        {type < 0.35 && <path d={`M${x - 2},${y} L${x + w / 2},${y - 16} L${x + w + 2},${y}`} fill="#070c45" stroke={S} strokeWidth="1.75" strokeLinejoin="round" />}
        {type >= 0.35 && type < 0.6 && <path d={`M${x},${y} v-6 h${w} v6`} fill="none" stroke={S} strokeWidth="1.5" />}
        {/* storefront glass + awning */}
        <rect x={x + 5} y={GROUND - 18} width={w - 10} height={14} fill={r() > 0.45 ? "#1c30e6" : "#0c1678"} fillOpacity={0.55} stroke={S} strokeWidth="1" />
        <path d={`M${x + 3},${GROUND - 20} h${w - 6} l-3,-5 h${-(w - 12)} Z`} fill="#2e46ff" stroke={S} strokeWidth="1" />
        {h > 50 && Array.from({ length: Math.floor((w - 8) / 12) }).map((_, k) => (
          <rect key={k} x={x + 7 + k * 12} y={y + 8} width={6} height={9} fill={r() > 0.6 ? "#dce2ff" : "#070c45"} fillOpacity={0.85} stroke={S} strokeWidth="0.75" />
        ))}
      </g>
    );
    // tree
    if (r() > 0.55) {
      const tx = x + w + 4;
      items.push(
        <g key={i++}>
          <line x1={tx} y1={GROUND} x2={tx} y2={GROUND - 20} stroke={S} strokeWidth="1.5" />
          <circle cx={tx} cy={GROUND - 28} r={11} fill="#070c45" stroke={S} strokeWidth="1.5" />
          <circle cx={tx - 6} cy={GROUND - 22} r={7} fill="#070c45" stroke={S} strokeWidth="1.5" />
        </g>
      );
    }
    x += w + 8 + Math.floor(r() * 10);
  }
  // catenary poles every 240 units
  for (let px = -3700; px < 5300; px += 240) {
    items.push(
      <g key={`pole${px}`}>
        <line x1={px} y1={GROUND + 6} x2={px} y2={340} stroke="#dce2ff" strokeWidth="2.5" />
        <line x1={px} y1={348} x2={px + 30} y2={363} stroke="#dce2ff" strokeWidth="1.5" />
        <circle cx={px} cy={340} r={2.5} fill="#dce2ff" />
      </g>
    );
  }
  return <g>{items}</g>;
});

/* ── TRACK: rails, ties and buffer stops — part of the near layer ── */
export function Track() {
  const n = Math.floor((TRACK_R - TRACK_L) / 18);
  const Buffer = ({ x, dir }: { x: number; dir: 1 | -1 }) => (
    <g>
      <path d={`M${x},${RAIL_Y + 12} v-30 h${dir * 14} v30`} fill="none" stroke="#dce2ff" strokeWidth="2" />
      <rect x={dir === 1 ? x : x - 22} y={RAIL_Y - 26} width={22} height={12} rx={2} fill="#d4ff3a" stroke="#04050d" strokeWidth="1.5" />
      <path d={`M${dir === 1 ? x + 4 : x - 18},${RAIL_Y - 20} h14`} stroke="#04050d" strokeWidth="3" strokeDasharray="3 3" />
      <text x={x - dir * 46} y={RAIL_Y - 40} textAnchor="middle" fontSize="11" fontFamily="decimaMono, monospace" letterSpacing="2" fill="#d4ff3a">END OF LINE</text>
      <rect x={x - dir * 46 - 3} y={RAIL_Y - 34} width={6} height={44} fill="#dce2ff" />
    </g>
  );
  return (
    <g>
      {Array.from({ length: n }).map((_, k) => (
        <rect key={k} x={TRACK_L + 6 + k * 18} y={RAIL_Y - 3} width={6} height={13} fill="#1422b0" />
      ))}
      <line x1={TRACK_L} y1={RAIL_Y} x2={TRACK_R} y2={RAIL_Y} stroke="#8a9bff" strokeWidth="2.5" />
      <line x1={TRACK_L} y1={RAIL_Y + 8} x2={TRACK_R} y2={RAIL_Y + 8} stroke="#5c70ff" strokeWidth="2" />
      <Buffer x={TRACK_L} dir={1} />
      <Buffer x={TRACK_R} dir={-1} />
    </g>
  );
}
