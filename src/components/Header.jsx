"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CircleUserIcon,
  BadgePlus,
  Bell,
  Search,
  Menu,
  X,
  Home,
  Settings,
  User,
} from "lucide-react";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsMenuOpen(false);
    if (isSearchOpen) {
      setSearchQuery("");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSearchOpen(false);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
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

          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
              <input
                type="text"
                placeholder="جستجو..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/20 text-white placeholder-white/70 rounded-lg py-2 pr-10 pl-4 focus:outline-none focus:bg-white/30 transition-all duration-300 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleSearch}
              className="p-2 text-white hover:bg-[#a9020a] rounded-lg transition-all duration-300 lg:hidden"
            >
              <Search className="h-5 w-5" />
            </button>

            <button className="p-2 text-white hover:bg-[#a9020a] rounded-lg transition-all duration-300 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -left-1 w-2 h-2 bg-red-500 rounded-full border border-[#0094da] animate-pulse"></span>
            </button>

            <button className="flex items-center gap-1 sm:gap-2 text-white hover:bg-[#a9020a] px-2 sm:px-3 py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm">
              <BadgePlus className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">درخواست جدید</span>
            </button>

            {!isLoggedIn ? (
              <Link
                href="/auth"
                className="flex items-center gap-1 sm:gap-2 text-white hover:bg-[#a9020a] px-2 sm:px-3 py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm"
              >
                <CircleUserIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">ورود</span>
              </Link>
            ) : (
              <div className="hidden lg:flex items-center gap-1 border-r border-white/30 pr-3 mr-2">
                <Link
                  href="/profile"
                  className="p-2 text-white hover:bg-[#a9020a] rounded-lg transition-all duration-300"
                >
                  <User className="h-5 w-5" />
                </Link>
                <Link
                  href="/settings"
                  className="p-2 text-white hover:bg-[#a9020a] rounded-lg transition-all duration-300"
                >
                  <Settings className="h-5 w-5" />
                </Link>
                <Link
                  href="/"
                  className="p-2 text-white hover:bg-[#a9020a] rounded-lg transition-all duration-300"
                >
                  <Home className="h-5 w-5" />
                </Link>
              </div>
            )}
          </div>
        </div>

        <div
          className={`
          lg:hidden absolute top-16 left-0 right-0 bg-[#0094da] border-t border-blue-500 overflow-hidden
          transition-all duration-300 ease-in-out
          ${isSearchOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}
        `}
        >
          <div className="p-3">
            <div className="relative">
              <input
                type="text"
                placeholder="جستجو..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/20 text-white placeholder-white/70 rounded-lg py-2 pr-12 pl-4 focus:outline-none focus:bg-white/30 transition-all duration-300 text-sm"
                autoFocus
              />
              <button
                onClick={handleCloseSearch}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white hover:bg-[#a9020a] rounded-full p-1 transition-all duration-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          className={`
          lg:hidden absolute top-16 left-0 right-0 bg-[#0094da] border-t border-blue-500 overflow-hidden
          transition-all duration-300 ease-in-out
          ${isMenuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}
        `}
        >
          <div className="p-3 space-y-2">
            <button className="w-full flex items-center gap-2 text-white hover:bg-[#a9020a] px-3 py-2 rounded-lg transition-all duration-300 text-sm">
              <BadgePlus className="h-4 w-4" />
              <span>درخواست جدید</span>
            </button>

            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 text-white hover:bg-[#a9020a] px-3 py-2 rounded-lg transition-all duration-300 text-sm"
                  onClick={handleCloseMenu}
                >
                  <User className="h-4 w-4" />
                  <span>پروفایل</span>
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 text-white hover:bg-[#a9020a] px-3 py-2 rounded-lg transition-all duration-300 text-sm"
                  onClick={handleCloseMenu}
                >
                  <Settings className="h-4 w-4" />
                  <span>تنظیمات</span>
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-2 text-white hover:bg-[#a9020a] px-3 py-2 rounded-lg transition-all duration-300 text-sm"
                  onClick={handleCloseMenu}
                >
                  <Home className="h-4 w-4" />
                  <span>صفحه اصلی</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 text-white hover:bg-red-600 px-3 py-2 rounded-lg transition-all duration-300 text-sm"
                >
                  <CircleUserIcon className="h-4 w-4" />
                  <span>خروج</span>
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="flex items-center gap-2 text-white hover:bg-[#a9020a] px-3 py-2 rounded-lg transition-all duration-300 text-sm"
                onClick={handleCloseMenu}
              >
                <CircleUserIcon className="h-4 w-4" />
                <span>ورود به حساب</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="h-16"></div>
    </>
  );
}
