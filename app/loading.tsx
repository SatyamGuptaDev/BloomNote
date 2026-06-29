export default function Loading() {
  return (
    <div className="flex-1 flex items-center justify-center bg-[var(--blush)]">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-[var(--rose)] border-t-transparent rounded-full animate-spin" />
        <p className="text-[var(--charcoal)] animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
