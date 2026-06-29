export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--cream)]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-[var(--blush)] rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[var(--rose)] rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-[var(--stone)] font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
