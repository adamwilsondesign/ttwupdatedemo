/* Flexity-style articulated streetcar, local coords: body 0..420 x 0..72,
   wheels hang to y≈84. Origin is top-left of the body. */
import { forwardRef } from "react";

export const CAR_W = 420;
export const CAR_H = 86; // body + wheels

const WHEELS = [52, 88, 192, 228, 332, 368];

export const Streetcar = forwardRef<SVGGElement, { wheelRef: React.RefObject<(SVGGElement | null)[]> ; beamRef: React.RefObject<SVGGElement | null> }>(
  function Streetcar({ wheelRef, beamRef }, ref) {
    return (
      <g ref={ref}>
        <defs>
          <linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8a9bff" />
            <stop offset="0.35" stopColor="#2e46ff" />
            <stop offset="1" stopColor="#1422b0" />
          </linearGradient>
          <linearGradient id="carGlass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0c1678" />
            <stop offset="1" stopColor="#05060f" />
          </linearGradient>
          <linearGradient id="beamR" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#dce2ff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#dce2ff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="underGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#5c70ff" stopOpacity="0.65" />
            <stop offset="1" stopColor="#2e46ff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* light pool on the road */}
        <ellipse cx={210} cy={92} rx={260} ry={16} fill="url(#underGlow)" />

        {/* headlight beams — flipped by direction of travel */}
        <g ref={beamRef} style={{ transformOrigin: "210px 60px", transition: "opacity 400ms" }}>
          <path d="M414,56 L620,30 L620,94 Z" fill="url(#beamR)" />
        </g>

        {/* pantograph to the wire */}
        <g stroke="#dce2ff" strokeWidth="1.75" fill="none" strokeLinejoin="round">
          <path d="M196,-2 L214,-24 L200,-42" />
          <path d="M224,-2 L214,-24" />
          <path d="M186,-43 H214" strokeWidth="2.5" />
        </g>
        {/* roof pods */}
        <rect x={150} y={-6} width={36} height={8} rx={3} fill="#1422b0" stroke="#dce2ff" strokeWidth="1.5" />
        <rect x={236} y={-6} width={36} height={8} rx={3} fill="#1422b0" stroke="#dce2ff" strokeWidth="1.5" />

        {/* body */}
        <path d="M16,12 Q20,0 40,0 H380 Q400,0 404,12 L418,50 Q421,70 404,72 H16 Q-1,70 2,50 Z"
          fill="url(#carBody)" stroke="#eef1ff" strokeWidth="2" strokeLinejoin="round" />
        {/* window band */}
        <path d="M22,14 H398 L408,40 H12 Z" fill="url(#carGlass)" stroke="#eef1ff" strokeWidth="1.5" strokeLinejoin="round" />
        {/* mullions */}
        {[48, 70, 92, 118, 162, 184, 206, 228, 252, 298, 320, 342, 370].map((x) => (
          <line key={x} x1={x} y1={14} x2={x} y2={40} stroke="#8a9bff" strokeWidth="1.5" />
        ))}
        {/* windshields */}
        <path d="M22,14 L12,40 H30 L34,14 Z" fill="#1c30e6" fillOpacity="0.6" stroke="#eef1ff" strokeWidth="1.25" />
        <path d="M398,14 L408,40 H390 L386,14 Z" fill="#1c30e6" fillOpacity="0.6" stroke="#eef1ff" strokeWidth="1.25" />
        {/* articulation joints */}
        {[140, 280].map((x) => (
          <g key={x}>
            <rect x={x - 5} y={2} width={10} height={68} fill="#070c45" stroke="#eef1ff" strokeWidth="1.25" />
            {[10, 22, 34, 46, 58].map((y) => <line key={y} x1={x - 5} y1={y} x2={x + 5} y2={y} stroke="#8a9bff" strokeWidth="1" />)}
          </g>
        ))}
        {/* doors */}
        {[96, 196, 330].map((x) => (
          <g key={x}>
            <rect x={x} y={16} width={26} height={54} rx={2} fill="#05060f" fillOpacity="0.55" stroke="#eef1ff" strokeWidth="1.5" />
            <line x1={x + 13} y1={16} x2={x + 13} y2={70} stroke="#eef1ff" strokeWidth="1" />
          </g>
        ))}
        {/* stripe */}
        <path d="M4,52 H416" stroke="#eef1ff" strokeWidth="3" />
        <path d="M4,58 H416" stroke="#eef1ff" strokeOpacity="0.4" strokeWidth="1" />
        {/* destination signs */}
        <rect x={356} y={4} width={34} height={8} rx={1.5} fill="#05060f" stroke="#eef1ff" strokeWidth="1" />
        <text x={373} y={10.4} textAnchor="middle" fontSize="6" fill="#b7c3ff" fontFamily="decimaMono, monospace">504 KING</text>
        <rect x={30} y={4} width={34} height={8} rx={1.5} fill="#05060f" stroke="#eef1ff" strokeWidth="1" />
        <text x={47} y={10.4} textAnchor="middle" fontSize="6" fill="#b7c3ff" fontFamily="decimaMono, monospace">TTW 2027</text>
        {/* lights */}
        <circle cx={412} cy={60} r={3.2} fill="#eef1ff" />
        <circle cx={8} cy={60} r={3.2} fill="#eef1ff" />
        {/* skirt */}
        <rect x={10} y={66} width={400} height={8} rx={3} fill="#070c45" stroke="#eef1ff" strokeWidth="1.5" />

        {/* wheels */}
        {WHEELS.map((cx, i) => (
          <g key={cx} transform={`translate(${cx} 78)`}>
            <g ref={(el) => { if (wheelRef.current) wheelRef.current[i] = el; }}>
              <circle r={8} fill="#05060f" stroke="#eef1ff" strokeWidth="1.75" />
              <path d="M-8,0 H8 M0,-8 V8" stroke="#8a9bff" strokeWidth="1.25" />
              <circle r={2} fill="#eef1ff" />
            </g>
          </g>
        ))}
      </g>
    );
  }
);
