"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CircleUserIcon,
  BadgePlus,
  Bell,
  Menu,
  Home,
  Settings,
  User,
} from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        </div>
      </header>

      <div className="h-16"></div>
    </>
  );
}