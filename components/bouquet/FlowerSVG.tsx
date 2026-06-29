import { memo } from 'react';

interface FlowerSVGProps {
  type: string;
  width?: number;
  height?: number;
  className?: string;
}

export const FlowerSVG = memo(function FlowerSVG({ type, width = 60, height = 60, className = '' }: FlowerSVGProps) {
  // Common styles for SVGs
  const svgClass = `block drop-shadow-sm ${className}`;
  const viewBox = "0 0 100 100";

  switch (type) {
    case 'rose-pink':
      return (
        <svg width={width} height={height} viewBox={viewBox} className={svgClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 20C40 20 30 35 30 50C30 65 40 80 50 80C60 80 70 65 70 50C70 35 60 20 50 20Z" fill="#F472B6" />
          <path d="M50 25C43 25 35 38 35 50C35 62 43 75 50 75C57 75 65 62 65 50C65 38 57 25 50 25Z" fill="#F9A8D4" />
          <path d="M50 35C45 35 40 43 40 50C40 57 45 65 50 65C55 65 60 57 60 50C60 43 55 35 50 35Z" fill="#FBCFE8" />
          <circle cx="50" cy="50" r="5" fill="#FDF2F8" />
        </svg>
      );
    case 'rose-red':
      return (
        <svg width={width} height={height} viewBox={viewBox} className={svgClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 20C40 20 30 35 30 50C30 65 40 80 50 80C60 80 70 65 70 50C70 35 60 20 50 20Z" fill="#EF4444" />
          <path d="M50 25C43 25 35 38 35 50C35 62 43 75 50 75C57 75 65 62 65 50C65 38 57 25 50 25Z" fill="#F87171" />
          <path d="M50 35C45 35 40 43 40 50C40 57 45 65 50 65C55 65 60 57 60 50C60 43 55 35 50 35Z" fill="#FCA5A5" />
          <circle cx="50" cy="50" r="5" fill="#FEE2E2" />
        </svg>
      );
    case 'rose-white':
      return (
        <svg width={width} height={height} viewBox={viewBox} className={svgClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 20C40 20 30 35 30 50C30 65 40 80 50 80C60 80 70 65 70 50C70 35 60 20 50 20Z" fill="#F3F4F6" />
          <path d="M50 25C43 25 35 38 35 50C35 62 43 75 50 75C57 75 65 62 65 50C65 38 57 25 50 25Z" fill="#F9FAFB" />
          <path d="M50 35C45 35 40 43 40 50C40 57 45 65 50 65C55 65 60 57 60 50C60 43 55 35 50 35Z" fill="#FFFFFF" />
          <circle cx="50" cy="50" r="5" fill="#F3F4F6" />
        </svg>
      );
    case 'tulip-yellow':
      return (
        <svg width={width} height={height} viewBox={viewBox} className={svgClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 80C35 80 25 60 30 30L40 45L50 25L60 45L70 30C75 60 65 80 50 80Z" fill="#FBBF24" />
          <path d="M50 80C42 80 35 65 38 40L45 50L50 35L55 50L62 40C65 65 58 80 50 80Z" fill="#FCD34D" />
        </svg>
      );
    case 'tulip-purple':
      return (
        <svg width={width} height={height} viewBox={viewBox} className={svgClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 80C35 80 25 60 30 30L40 45L50 25L60 45L70 30C75 60 65 80 50 80Z" fill="#A78BFA" />
          <path d="M50 80C42 80 35 65 38 40L45 50L50 35L55 50L62 40C65 65 58 80 50 80Z" fill="#C4B5FD" />
        </svg>
      );
    case 'sunflower':
      return (
        <svg width={width} height={height} viewBox={viewBox} className={svgClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill="#FDE047" />
          <circle cx="50" cy="50" r="30" fill="#FACC15" />
          <circle cx="50" cy="50" r="20" fill="#78350F" />
          <circle cx="50" cy="50" r="15" fill="#451A03" />
        </svg>
      );
    case 'daisy':
      return (
        <svg width={width} height={height} viewBox={viewBox} className={svgClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill="#FFFFFF" />
          <circle cx="50" cy="50" r="15" fill="#FDE047" />
        </svg>
      );
    case 'lily':
      return (
        <svg width={width} height={height} viewBox={viewBox} className={svgClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 50L20 20C30 10 70 10 80 20L50 50Z" fill="#FDF2F8" />
          <path d="M50 50L80 20C90 30 90 70 80 80L50 50Z" fill="#FCE7F3" />
          <path d="M50 50L80 80C70 90 30 90 20 80L50 50Z" fill="#FDF2F8" />
          <path d="M50 50L20 80C10 70 10 30 20 20L50 50Z" fill="#FCE7F3" />
          <circle cx="50" cy="50" r="8" fill="#FDE047" />
        </svg>
      );
    case 'greenery':
      return (
        <svg width={width} height={height} viewBox={viewBox} className={svgClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 90C45 90 45 20 50 10C55 20 55 90 50 90Z" fill="#4ADE80" />
          <path d="M50 70C30 60 10 40 20 30C30 40 50 60 50 70Z" fill="#86EFAC" />
          <path d="M50 50C70 40 90 20 80 10C70 20 50 40 50 50Z" fill="#86EFAC" />
        </svg>
      );
    default:
      // Fallback
      return (
        <svg width={width} height={height} viewBox={viewBox} className={svgClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="20" fill="#E8A0A0" />
        </svg>
      );
  }
});
