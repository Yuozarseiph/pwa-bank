// components/Header.jsx (نسخه به‌روزرسانی شده)
"use client";

import { useState } from "react";
import Link from "next/link";
import {Search } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const isHomePage = pathname === "/";


  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <header className="w-full fixed top-0 bg-[#0094da] border-b-2 border-blue-600 h-16 z-50">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-2">

            <Link
              href="/"
              className="text-white text-lg sm:text-xl font-bold truncate max-w-[120px] sm:max-w-none hover:opacity-80 transition-opacity"
            >
              اپلیکیشن من
            </Link>
          </div>
          {!isHomePage && (
            <div className="flex-1 max-w-md mx-4">
              <form onSubmit={handleSearch} className="relative mx-2 my-1 border border-white/35 rounded-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجو..."
                  className="w-full px-4 py-2 pr-10 rounded-lg text-white focus:outline-none placeholder:text-gray-300"
                />
                <button
                  type="submit"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-700"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      <div className="h-16"></div>
    </>
  );
}