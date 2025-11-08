"use client";

import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="w-full fixed top-0 bg-[#0095daaf] backdrop-blur-sm shadow-lg h-16 z-50">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-white text-lg sm:text-xl font-bold truncate max-w-[120px] sm:max-w-none hover:opacity-80 transition-opacity"
            >
              اپلیکیشن من
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}