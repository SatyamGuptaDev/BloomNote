import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--cream)] px-4 text-center">
      <h2 className="font-heading text-5xl text-[var(--charcoal)] mb-4">404</h2>
      <h3 className="text-2xl text-[var(--charcoal)] mb-4">Page Not Found</h3>
      <p className="text-[var(--stone)] mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-[var(--rose)] text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors shadow-sm"
      >
        Return Home
      </Link>
    </div>
  );
}
