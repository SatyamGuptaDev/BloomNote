import { memo } from 'react';

interface FlowerSVGProps {
  type: string;
  width?: number;
  height?: number;
  className?: string;
}

// Real photographic flower cut-outs (transparent PNGs in /public/flowers).
// Drop a new PNG named "<type>.png" here to upgrade any flower to a real photo.
const IMAGE_FLOWERS: Record<string, string> = {
  daisy: '/flowers/daisy.png',
  sunflower: '/flowers/sunflower.png',
};

// helper: a ring of petals rotated around the centre (50,50)
function ring(count: number, render: (i: number) => React.ReactNode, start = 0) {
  return Array.from({ length: count }).map((_, i) => (
    <g key={i} transform={`rotate(${start + i * (360 / count)} 50 50)`}>
      {render(i)}
    </g>
  ));
}

function Rose({ outer, mid, inner, core, stroke }: { outer: string; mid: string; inner: string; core: string; stroke?: string }) {
  const petal = (rx: number, ry: number, cy: number, fill: string) => (
    <ellipse cx="50" cy={cy} rx={rx} ry={ry} fill={fill} stroke={stroke} strokeWidth={stroke ? 1 : 0} />
  );
  return (
    <>
      <g>{ring(6, () => petal(11, 15, 28, outer), 0)}</g>
      <g>{ring(6, () => petal(9, 12, 33, mid), 30)}</g>
      <g>{ring(5, () => petal(6.5, 9, 38, inner), 0)}</g>
      <circle cx="50" cy="50" r="4.5" fill={core} stroke={stroke} strokeWidth={stroke ? 0.8 : 0} />
    </>
  );
}

export const FlowerSVG = memo(function FlowerSVG({ type, width = 60, height = 60, className = '' }: FlowerSVGProps) {
  // Real photo flower → render the image, scaled to fit a square box.
  const imgSrc = IMAGE_FLOWERS[type];
  if (imgSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imgSrc}
        alt={type.replace('-', ' ')}
        width={width}
        height={height}
        draggable={false}
        className={`block select-none object-contain drop-shadow-md ${className}`}
        style={{ width, height }}
      />
    );
  }

  const svgClass = `block drop-shadow-sm ${className}`;
  const viewBox = '0 0 100 100';
  const wrap = (children: React.ReactNode) => (
    <svg width={width} height={height} viewBox={viewBox} className={svgClass} fill="none" xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  );

  switch (type) {
    case 'rose-pink':
      return wrap(<Rose outer="#EC4899" mid="#F472B6" inner="#F9A8D4" core="#FCE7F3" />);
    case 'rose-red':
      return wrap(<Rose outer="#DC2626" mid="#EF4444" inner="#F87171" core="#FECACA" />);
    case 'rose-white':
      return wrap(<Rose outer="#E5E7EB" mid="#F3F4F6" inner="#FCFCFD" core="#FFFFFF" stroke="#D1D5DB" />);

    case 'tulip-yellow':
    case 'tulip-purple': {
      const [base, light] = type === 'tulip-yellow' ? ['#F59E0B', '#FCD34D'] : ['#8B5CF6', '#C4B5FD'];
      return wrap(
        <>
          <path d="M50 30 C 56 45 56 70 50 88 C 44 70 44 45 50 30 Z" fill="#4D7C0F" opacity="0" />
          <rect x="48.5" y="55" width="3" height="34" rx="1.5" fill="#65A30D" />
          <path d="M50 60 C 70 58 82 44 80 34 C 70 44 54 50 50 60 Z" fill="#84CC16" />
          {/* cup */}
          <path d="M30 34 C 33 64 40 84 50 84 C 60 84 67 64 70 34 L60 46 L50 30 L40 46 Z" fill={base} />
          <path d="M40 40 C 42 64 46 80 50 82 C 54 80 58 64 60 40 L55 47 L50 36 L45 47 Z" fill={light} />
        </>
      );
    }

    case 'sunflower':
      return wrap(
        <>
          <g>{ring(14, () => <ellipse cx="50" cy="20" rx="5" ry="15" fill="#FBBF24" />, 0)}</g>
          <g>{ring(14, () => <ellipse cx="50" cy="22" rx="4" ry="13" fill="#FDE047" />, 12)}</g>
          <circle cx="50" cy="50" r="17" fill="#92400E" />
          <circle cx="50" cy="50" r="12" fill="#78350F" />
        </>
      );

    case 'daisy':
      return wrap(
        <>
          <g>{ring(12, () => <ellipse cx="50" cy="22" rx="5.5" ry="15" fill="#FFFFFF" stroke="#F3F4F6" strokeWidth="0.8" />, 0)}</g>
          <circle cx="50" cy="50" r="11" fill="#FBBF24" />
          <circle cx="50" cy="50" r="6" fill="#F59E0B" />
        </>
      );

    case 'lily':
      return wrap(
        <>
          <g>{ring(6, () => <path d="M50 50 C 44 30 47 14 50 8 C 53 14 56 30 50 50 Z" fill="#FBCFE8" />, 0)}</g>
          <g>{ring(6, () => <path d="M50 50 C 47 34 48 22 50 18 C 52 22 53 34 50 50 Z" fill="#FDF2F8" />, 30)}</g>
          <circle cx="50" cy="50" r="5" fill="#FDE047" />
          <g>{ring(5, () => <circle cx="50" cy="44" r="1.6" fill="#F59E0B" />, 0)}</g>
        </>
      );

    case 'greenery':
      return wrap(
        <>
          <path d="M50 92 C 50 70 50 35 50 12" stroke="#4D7C0F" strokeWidth="3" strokeLinecap="round" />
          <path d="M50 30 C 32 28 18 14 20 8 C 32 12 48 20 50 30 Z" fill="#84CC16" />
          <path d="M50 48 C 68 46 82 32 80 26 C 68 30 52 38 50 48 Z" fill="#65A30D" />
          <path d="M50 62 C 34 60 22 48 24 42 C 34 46 48 52 50 62 Z" fill="#84CC16" />
        </>
      );

    case 'orchid':
      return wrap(
        <>
          <defs>
            <radialGradient id="orch" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FDF4FF" />
              <stop offset="100%" stopColor="#A855F7" />
            </radialGradient>
            <linearGradient id="orch-lip" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7E22CE" />
              <stop offset="100%" stopColor="#D946EF" />
            </linearGradient>
          </defs>
          <g>{ring(3, () => <path d="M50 50 C 40 25 45 10 50 5 C 55 10 60 25 50 50 Z" fill="url(#orch)" />, 90)}</g>
          <g>{ring(2, () => <path d="M50 50 C 20 40 10 20 25 15 C 40 10 45 35 50 50 Z" fill="url(#orch)" />, 140)}</g>
          <path d="M50 50 C 40 60 40 80 50 85 C 60 80 60 60 50 50 Z" fill="url(#orch-lip)" />
          <circle cx="50" cy="50" r="4" fill="#FDE047" />
        </>
      );

    case 'carnation':
      return wrap(
        <>
          <defs>
            <radialGradient id="carn" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#9F1239" />
              <stop offset="70%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#FDA4AF" />
            </radialGradient>
          </defs>
          <g>{ring(8, () => <path d="M50 50 L 30 15 C 35 10 40 15 45 10 C 50 15 55 10 60 15 L 50 50 Z" fill="url(#carn)" />, 0)}</g>
          <g>{ring(6, () => <path d="M50 50 L 35 25 C 40 20 45 25 50 20 C 55 25 60 20 65 25 L 50 50 Z" fill="url(#carn)" />, 25)}</g>
          <g>{ring(5, () => <path d="M50 50 L 40 35 C 45 30 50 35 55 30 C 60 35 60 40 50 50 Z" fill="#BE123C" />, 0)}</g>
        </>
      );

    case 'lavender':
      return wrap(
        <>
          <path d="M50 95 L50 20" stroke="#65A30D" strokeWidth="2.5" strokeLinecap="round" />
          <g>
            {[25, 35, 45, 55, 65, 75].map((y, i) => (
              <g key={y}>
                <ellipse cx="45" cy={y} rx="3" ry="5" fill="#A855F7" transform={`rotate(-45 45 ${y})`} />
                <ellipse cx="55" cy={y - 2} rx="3" ry="5" fill="#9333EA" transform={`rotate(45 55 ${y - 2})`} />
                <ellipse cx="46" cy={y - 4} rx="2.5" ry="4" fill="#C084FC" transform={`rotate(-60 46 ${y - 4})`} />
                <ellipse cx="54" cy={y - 6} rx="2.5" ry="4" fill="#A855F7" transform={`rotate(60 54 ${y - 6})`} />
              </g>
            ))}
          </g>
        </>
      );

    case 'cherry-blossom':
      return wrap(
        <>
          <defs>
            <radialGradient id="cherry" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FBCFE8" />
              <stop offset="100%" stopColor="#FDF2F8" />
            </radialGradient>
          </defs>
          <g>{ring(5, () => <path d="M50 50 C 35 25 35 5 45 5 C 50 10 50 10 50 10 C 50 10 50 10 55 5 C 65 5 65 25 50 50 Z" fill="url(#cherry)" stroke="#F9A8D4" strokeWidth="0.5" />, 0)}</g>
          <g>{ring(5, () => <line x1="50" y1="50" x2="50" y2="35" stroke="#F472B6" strokeWidth="1" />, 36)}</g>
          <circle cx="50" cy="50" r="3" fill="#F472B6" />
        </>
      );

    case 'baby-breath':
      return wrap(
        <>
          <path d="M50 90 C 50 70 40 50 30 30 M50 90 C 50 70 60 50 70 30 M50 90 L50 20 M40 50 L20 40 M60 50 L80 40" stroke="#84CC16" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {[
            [30,30], [70,30], [50,20], [20,40], [80,40], [35,45], [65,45], [45,35], [55,35], [40,60], [60,60]
          ].map(([cx, cy], i) => (
            <g key={i} transform={`translate(${cx-50}, ${cy-50})`}>
              <circle cx="50" cy="50" r="3" fill="#FFFFFF" />
              <circle cx="50" cy="50" r="1" fill="#FDE047" />
            </g>
          ))}
        </>
      );

    case 'peony':
      return wrap(
        <>
          <defs>
            <radialGradient id="peony-out" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="#F9A8D4" />
              <stop offset="100%" stopColor="#F472B6" />
            </radialGradient>
            <radialGradient id="peony-in" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FBCFE8" />
              <stop offset="100%" stopColor="#F9A8D4" />
            </radialGradient>
          </defs>
          <g>{ring(8, () => <circle cx="50" cy="20" r="18" fill="url(#peony-out)" opacity="0.9" />, 0)}</g>
          <g>{ring(6, () => <circle cx="50" cy="28" r="14" fill="url(#peony-in)" opacity="0.9" />, 15)}</g>
          <g>{ring(5, () => <circle cx="50" cy="35" r="10" fill="#FCE7F3" opacity="0.9" />, 30)}</g>
          <circle cx="50" cy="50" r="8" fill="#FDF2F8" />
        </>
      );

    case 'iris':
      return wrap(
        <>
          <defs>
            <linearGradient id="iris-up" x1="0" y1="100%" x2="0" y2="0">
              <stop offset="0%" stopColor="#4C1D95" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="iris-down" x1="0" y1="0" x2="0" y2="100%">
              <stop offset="0%" stopColor="#6D28D9" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <g>{ring(3, () => (
            <g>
              <path d="M50 50 C 40 70 35 90 50 95 C 65 90 60 70 50 50 Z" fill="url(#iris-down)" />
              <path d="M50 55 L50 80" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>
          ), 60)}</g>
          <g>{ring(3, () => <path d="M50 50 C 40 30 45 10 50 5 C 55 10 60 30 50 50 Z" fill="url(#iris-up)" />, 0)}</g>
        </>
      );

    case 'marigold':
      return wrap(
        <>
          <defs>
            <radialGradient id="marigold" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="70%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#C2410C" />
            </radialGradient>
          </defs>
          <g>{ring(16, () => <path d="M50 50 C 45 30 40 15 50 10 C 60 15 55 30 50 50 Z" fill="url(#marigold)" />, 0)}</g>
          <g>{ring(12, () => <path d="M50 50 C 45 35 42 22 50 18 C 58 22 55 35 50 50 Z" fill="#F59E0B" />, 15)}</g>
          <g>{ring(8, () => <path d="M50 50 C 47 40 45 30 50 26 C 55 30 53 40 50 50 Z" fill="#FBBF24" />, 25)}</g>
          <circle cx="50" cy="50" r="5" fill="#FCD34D" />
        </>
      );

    case 'hydrangea':
      return wrap(
        <>
          <defs>
            <radialGradient id="hydr" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E0E7FF" />
              <stop offset="100%" stopColor="#818CF8" />
            </radialGradient>
          </defs>
          {[
            [50,25], [30,40], [70,40], [40,65], [60,65], [50,45]
          ].map(([cx, cy], i) => (
            <g key={i} transform={`translate(${cx-50}, ${cy-50}) scale(0.6)`}>
              <g>{ring(4, () => <circle cx="50" cy="35" r="15" fill="url(#hydr)" />, 45)}</g>
              <circle cx="50" cy="50" r="3" fill="#6366F1" />
            </g>
          ))}
        </>
      );

    case 'poppy':
      return wrap(
        <>
          <defs>
            <radialGradient id="poppy" cx="50%" cy="50%" r="50%">
              <stop offset="20%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#991B1B" />
            </radialGradient>
          </defs>
          <g>{ring(4, () => <path d="M50 50 C 20 40 10 10 50 5 C 90 10 80 40 50 50 Z" fill="url(#poppy)" opacity="0.9" />, 45)}</g>
          <circle cx="50" cy="50" r="10" fill="#1C1917" />
          <g>{ring(12, () => <circle cx="50" cy="37" r="1.5" fill="#A8A29E" />, 0)}</g>
        </>
      );

    case 'protea':
      return wrap(
        <>
          <defs>
            <linearGradient id="protea-bract" x1="0" y1="100%" x2="0" y2="0">
              <stop offset="0%" stopColor="#F9A8D4" />
              <stop offset="100%" stopColor="#BE185D" />
            </linearGradient>
          </defs>
          <g>{ring(12, () => <path d="M50 50 C 40 40 30 20 50 5 C 70 20 60 40 50 50 Z" fill="url(#protea-bract)" />, 0)}</g>
          <g>{ring(8, () => <path d="M50 50 C 43 45 38 30 50 15 C 62 30 57 45 50 50 Z" fill="#F472B6" />, 22.5)}</g>
          <circle cx="50" cy="50" r="18" fill="#FDF2F8" />
          <g>{ring(16, () => <line x1="50" y1="50" x2="50" y2="35" stroke="#9D174D" strokeWidth="1" />, 0)}</g>
          <g>{ring(10, () => <line x1="50" y1="50" x2="50" y2="40" stroke="#F472B6" strokeWidth="1.5" />, 0)}</g>
          <circle cx="50" cy="50" r="8" fill="#831843" />
        </>
      );

    case 'leaf-stem':
      return wrap(
        <>
          <path d="M50 95 C 45 70 55 40 50 10" stroke="#4D7C0F" strokeWidth="3" fill="none" strokeLinecap="round" />
          <g>{ring(2, () => <path d="M50 70 C 30 65 20 50 25 45 C 40 40 50 55 50 70 Z" fill="#65A30D" />, 10)}</g>
          <g>{ring(2, () => <path d="M51 45 C 70 40 80 25 75 20 C 60 15 50 30 51 45 Z" fill="#84CC16" />, -10)}</g>
          <path d="M50 20 C 35 15 30 5 35 2 C 45 2 52 10 50 20 Z" fill="#A3E635" />
        </>
      );

    default:
      return wrap(<Rose outer="#C16E7E" mid="#D98A98" inner="#E8B5BF" core="#FFF" />);
  }
});
