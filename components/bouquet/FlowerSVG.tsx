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

    default:
      return wrap(<Rose outer="#C16E7E" mid="#D98A98" inner="#E8B5BF" core="#FFF" />);
  }
});
