"use client";

import { useState } from "react";
import {
  Home,
  BadgePlusIcon,
  ShoppingBasketIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("خانه");

  const navItems = [
    { id: 1, name: "خانه", icon: Home, href: "/" },
    {
      id: 2,
      name: "ثبت آکهی",
      icon: BadgePlusIcon,
      href: "/",
    },
    {
      id: 3,
      name: "جدید ترین فروش ها",
      icon: ShoppingBasketIcon,
      href: "/",
    },
    { id: 4, name: "پروفایل", icon: UserIcon, href: "/" },
  ];

  return (
    <>
      <nav className="hidden lg:block bg-white border border-gray-300 z-45 lg:w-[450px] lg:h-fit rounded-xl">
        <h2 className="flex m-5 border border-gray-400 p-2 rounded-lg text-sm gap-2 items-center font-light text-gray-500">
          <UserIcon className="text-[#a9020a] text-sm" /> نام کاربری شما
        </h2>
        <hr className="mt-6 text-gray-300 mx-5" />
        <ul className="flex flex-row lg:flex-col justify-around items-center p-4 gap-4">
          {navItems.map((item) => (
            <li key={item.id} className="w-full">
              <Link
                href={item.href}
                className={`flex items-center px-4 py-3 text-lg font-medium rounded-xl h-15 transition-all duration-100 ${
                  activeItem === item.name
                    ? "text-black bg-blue-50 border border-[#0496da]"
                    : "text-gray-600 border-[#0496da] hover:bg-gray-50"
                }`}
                onClick={() => setActiveItem(item.name)}
              >
                <item.icon className="h-5 w-5 ml-3" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="lg:hidden h-16"></div>
    </>
  );
}