import Link from 'next/link';

export function BloomMark({ size = 30, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="dbBloomGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--rose)" />
          <stop offset="100%" stopColor="var(--rose-deep)" />
        </linearGradient>
      </defs>
      {/* rosette petals */}
      <g fill="url(#dbBloomGrad)">
        {[0, 72, 144, 216, 288].map((a) => (
          <path
            key={a}
            d="M16 16 C 12.7 11.2, 12.7 6.4, 16 4.4 C 19.3 6.4, 19.3 11.2, 16 16 Z"
            transform={`rotate(${a} 16 16)`}
            opacity="0.92"
          />
        ))}
      </g>
      {/* center */}
      <circle cx="16" cy="16" r="2.6" fill="#fff" />
      <circle cx="16" cy="16" r="1.4" fill="var(--rose-deep)" />
    </svg>
  );
}

export function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <span className="font-heading text-xl leading-none tracking-tight">
      <span className={`font-light italic ${dark ? 'text-[var(--rose)]' : 'text-[var(--rose-deep)]'}`}>Dear</span>
      <span className={`font-semibold ${dark ? 'text-white' : 'text-[var(--charcoal)]'}`}> Bloomy</span>
    </span>
  );
}

export function Logo({
  dark = false,
  iconSize = 30,
  className = '',
}: {
  dark?: boolean;
  iconSize?: number;
  className?: string;
}) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="Dear Bloomy — home">
      <BloomMark size={iconSize} className="transition-transform duration-500 ease-out group-hover:rotate-[72deg]" />
      <Wordmark dark={dark} />
    </Link>
  );
}
