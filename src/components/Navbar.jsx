"use client";

import { usePathname } from "next/navigation";
import { Home, BadgePlusIcon, ShoppingBasketIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = [
    { id: 1, name: "خانه", icon: Home, href: "/" },
    { id: 2, name: "ثبت آگهی", icon: BadgePlusIcon, href: "/new-ad" },
    { id: 3, name: "جدید ترین فروش ها", icon: ShoppingBasketIcon, href: "/soon" },
    { 
      id: 4, 
      name: "پروفایل", 
      icon: UserIcon, 
      href: user ? `/profile/${user.id}` : "/auth" 
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white flex justify-around items-center px-6 py-3 lg:hidden z-60">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.id}
            href={item.href}
            className={`flex flex-col items-center gap-1 ${
              isActive ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <Icon size={24} />
            <span className="text-xs">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}