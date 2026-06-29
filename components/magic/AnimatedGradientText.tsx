'use client';

/** Magic-UI style animated gradient text for eyebrow labels / accents. */
export function AnimatedGradientText({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(90deg, var(--rose-deep), var(--rose), #B7A0C9, var(--rose-deep))',
      }}
    >
      {children}
    </span>
  );
}
