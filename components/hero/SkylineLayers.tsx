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
function Sign({ bx, bw, top, h = 46, data, hot = false }: { bx: number; bw: number; top: number; h?: number; data: SignData; hot?: boolean }) {
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
        <image href={data.src} x={x + 9} y={y + 8} width={w - 18} height={h - 16} preserveAspectRatio="xMidYMid meet" filter="url(#toWhite)" />
      ) : (
        <text x={x + w / 2} y={y + h / 2 + 4.5} textAnchor="middle" fontSize="15" fontFamily="volksans" fill="#eef1ff" letterSpacing="-0.4">{data.name}</text>
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
  let si = 2; // others[0..1] sit on the central towers
  const strip = (from: number, to: number, base: number) => {
    let x = from;
    let k = base;
    while (x < to) {
      const carries = k % 3 === 0 && others.length > 0;
      const w = carries ? 108 + Math.floor(r() * 22) : 40 + Math.floor(r() * 30);
      const top = carries ? 210 + Math.floor(r() * 90) : 190 + Math.floor(r() * 130);
      filler(x, w, top, k);
      if (carries) signs.push(<Sign key={`s${k}`} bx={x} bw={w} top={top} data={others[si++ % others.length]} />);
      x += w + 14 + Math.floor(r() * 26);
      k++;
    }
  };
  strip(-1900, 170, 0);
  strip(1660, 3500, 1000);
  // in-frame fillers between landmarks
  [[580, 40, 255]].forEach(([x, w, t], k) => filler(x, w, t, 200 + k));
  filler(318, 112, 236, 300); // billboard tower (west)

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
      <Box x={866} y={232} w={110} h={GROUND - 232} d={7} front="url(#midFill)" side="url(#midSide)" stroke={S} win="url(#winMid)" lit={litWindows(r, 866, 232, 110, 198, 8)} />

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
        <Box x={1050} y={150} w={104} h={GROUND - 150} front="#05060f" side="#04050d" stroke={S} />
        <rect x={1052} y={152} width={100} height={GROUND - 154} fill="url(#grid)" />
        <Box x={1162} y={208} w={36} h={GROUND - 208} front="#05060f" side="#04050d" stroke={S} />
        <rect x={1164} y={210} width={32} height={GROUND - 212} fill="url(#grid)" />
      </g>

      {/* First Canadian Place — tallest office, pinstriped */}
      <g>
        <Box x={1206} y={92} w={72} h={GROUND - 92} d={9} front="url(#midFill)" side="url(#midSide)" stroke="#b7c3ff" />
        <rect x={1209} y={95} width={66} height={GROUND - 96} fill="url(#pinstripe)" />
        <path d="M1206,92 v10 M1278,92 v10" stroke="#eef1ff" strokeWidth="2" />
        {litWindows(r, 1206, 92, 72, 330, 10).map(([lx, ly], k) => (
          <rect key={k} x={lx} y={ly} width={3} height={4} fill="#dce2ff" className="win-lit" style={{ ["--td" as string]: `${k * 0.9}s` }} />
        ))}
      </g>

      {/* Scotia Plaza — notched chevron top */}
      <g>
        <Box x={1290} y={128} w={48} h={GROUND - 128} front="url(#midFill)" side="url(#midSide)" stroke={S} win="url(#winMid)" lit={litWindows(r, 1290, 128, 48, 300, 8)} />
        <path d="M1290,128 L1299,112 L1307,124 L1314,104 L1321,124 L1329,112 L1338,128" fill="#0c1678" stroke={S} strokeWidth="1.5" />
      </g>

      {/* Commerce Court West */}
      <Box x={1350} y={182} w={108} h={GROUND - 182} front="url(#midFill)" side="url(#midSide)" stroke={S} win="url(#winMid)" lit={litWindows(r, 1350, 182, 108, 248, 8)} />

      {/* The One — supertall with exoskeleton */}
      <g>
        <Box x={1472} y={64} w={40} h={GROUND - 64} d={7} front="url(#midFill)" side="url(#midSide)" stroke="#b7c3ff" />
        {Array.from({ length: 12 }).map((_, k) => {
          const y0 = 70 + k * 30;
          return <path key={k} d={`M1472,${y0} L1512,${y0 + 30} M1512,${y0} L1472,${y0 + 30}`} stroke="#8a9bff" strokeOpacity="0.45" strokeWidth="1" />;
        })}
        <path d="M1472,64 h40" stroke="#eef1ff" strokeWidth="2" />
      </g>

      {/* rooftop billboards */}
      {signs}
      {/* billboard tower (east) */}
      <Box x={1528} y={244} w={112} h={GROUND - 244} d={7} front="url(#midFill)" side="url(#midSide)" stroke={S} win="url(#winMid)" lit={litWindows(r, 1528, 244, 112, 186, 7)} />

      {/* presenting sponsors on the central towers, others flanking them */}
      {presenting[0] && <Sign bx={866} bw={110} top={232} data={presenting[0]} hot />}
      {presenting[1] && <Sign bx={1050} bw={104} top={150} data={presenting[1]} hot />}
      {presenting[2] && <Sign bx={1350} bw={108} top={182} data={presenting[2]} hot />}
      {presenting[3] && <Sign bx={1528} bw={112} top={244} data={presenting[3]} hot />}
      {others[0] && <Sign bx={318} bw={112} top={236} data={others[0]} />}
      {others[1] && <Sign bx={1206} bw={72} top={92} h={40} data={others[1]} />}
    </g>
  );
});

/* ── NEAR: low-rise storefronts, trees, catenary poles ── */
export const NearLayer = memo(function NearLayer() {
  // A clean platform edge in front of the skyline: railing, street lamps and
  // the catenary poles that carry the overhead wire. No buildings.
  const S = "#b7c3ff";
  const items: React.ReactNode[] = [];
  const X0 = -3700, X1 = 5300;
  items.push(
    <g key="rail">
      <rect x={X0} y={GROUND - 16} width={X1 - X0} height={16} fill="#05060f" />
      <line x1={X0} y1={GROUND - 16} x2={X1} y2={GROUND - 16} stroke={S} strokeWidth="1.75" />
      <line x1={X0} y1={GROUND - 9} x2={X1} y2={GROUND - 9} stroke={S} strokeOpacity="0.5" strokeWidth="1" />
    </g>
  );
  for (let bx = X0; bx < X1; bx += 14) {
    items.push(<line key={`b${bx}`} x1={bx} y1={GROUND - 16} x2={bx} y2={GROUND} stroke={S} strokeOpacity="0.45" strokeWidth="1" />);
  }
  for (let lx = X0 + 120; lx < X1; lx += 240) {
    items.push(
      <g key={`lamp${lx}`}>
        <line x1={lx} y1={GROUND} x2={lx} y2={GROUND - 58} stroke="#dce2ff" strokeWidth="2" />
        <path d={`M${lx},${GROUND - 58} q0,-8 10,-8 h6`} fill="none" stroke="#dce2ff" strokeWidth="2" />
        <rect x={lx + 12} y={GROUND - 68} width={10} height={4} rx={2} fill="#eef1ff" />
        <ellipse cx={lx + 17} cy={GROUND - 60} rx={16} ry={10} fill="url(#podGlow)" opacity="0.6" />
      </g>
    );
  }
  for (let px = X0; px < X1; px += 240) {
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
