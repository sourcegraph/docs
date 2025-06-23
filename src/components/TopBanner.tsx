'use client';

import Link from 'next/link';
import { useState } from 'react';

interface TopBannerProps {
  text?: string;
  link?: string;
  backgroundColor?: string;
  textColor?: string;
  linkText?: string;
  opacity?: string;
}

const hexToRgb = (hex: string) => {
  hex = hex.replace(/^#/, '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return `${r}, ${g}, ${b}`;
}

export function TopBanner({
  text = "",
  link = "https://sourcegraph.com/",
  backgroundColor = "#F34E3F",
  textColor = "white",
  linkText = 'new docs',
  opacity = '1'
}: TopBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      style={{ backgroundColor: `rgba(${hexToRgb(backgroundColor)}, ${opacity})`, color: textColor }}
      className="fixed top-0 z-[100] min-h-[42px] w-full flex items-center justify-center px-4 py-2 md:py-0 md:h-[42px]"
    >
      <div className="flex items-center gap-2 text-xs sm:text-sm max-w-[90%] md:max-w-none text-center">
        <span className="line-clamp-2 md:line-clamp-1">{text}</span>
        <Link href={link} target="_blank" className="flex items-center hover:opacity-80 whitespace-nowrap">
          {linkText && <span>{linkText}</span>}
          <svg className="lucide lucide-arrow-right w-3 h-3 ml-1 sm:w-4 sm:h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 sm:right-4 hover:opacity-80"
      >
        <svg
          className="h-3 w-3 sm:h-4 sm:w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
