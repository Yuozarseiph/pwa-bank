// components/Header.jsx (نسخه به‌روزرسانی شده)
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    handleCloseMenu();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // منطق جستجو را اینجا پیاده‌سازی کنید
    console.log("جستجو برای:", searchQuery);
  };

  return (
    <>
      <header className="w-full fixed top-0 bg-[#0094da] border-b-2 border-blue-600 h-16 z-50">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMenu}
              className="p-2 text-white hover:bg-[#a9020a] rounded-lg transition-all duration-300 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link
              href="/"
              className="text-white text-lg sm:text-xl font-bold truncate max-w-[120px] sm:max-w-none hover:opacity-80 transition-opacity"
            >
              اپلیکیشن من
            </Link>
          </div>

          {/* فرم جستجو - فقط در صفحات غیراصلی نمایش داده می‌شود */}
          {!isHomePage && (
            <div className="flex-1 max-w-md mx-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجو..."
                  className="w-full px-4 py-2 pr-10 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button
                  type="submit"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
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