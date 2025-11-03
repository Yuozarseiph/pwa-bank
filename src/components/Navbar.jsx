'use client';

import { useState } from 'react';
import { 
  Home, 
  Smartphone, 
  Package, 
  Settings,
  Wallet
} from "lucide-react";
import Link from 'next/link';

export default function Navbar() {
  const [activeItem, setActiveItem] = useState('خانه');

  const navItems = [
    { id: 1, name: 'خانه', icon: Home, href: '/' },
    { id: 2, name: 'شارژ', icon: Smartphone, href: '/charge' },
    { id: 3, name: 'بسته‌ها', icon: Package, href: '/packages' },
    { id: 4, name: 'خدمات', icon: Settings, href: '/services' },
    { id: 5, name: 'کیف پول', icon: Wallet, href: '/wallet' },
  ];

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-2xl z-50">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeItem === item.name;
            const href = item.href;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.name)}
                className={`flex flex-col items-center py-2 px-1 flex-1 transition-all duration-200 ${
                  isActive 
                    ? 'text-[#0094da]' 
                    : 'text-gray-500'
                }`}
              >
                <IconComponent className="h-6 w-6 mb-1" />
                <Link href={href}><span className="text-xs font-medium">{item.name}</span></Link>
                {isActive && (
                  <div className="w-1 h-1 bg-[#0094da] rounded-full mt-1"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="lg:hidden h-16"></div>
    </>
  );
}