"use client";

import { useState } from "react";
import { Home, Smartphone, Package, ContactIcon, Wallet, ChevronDown, ChevronUp, UserIcon } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("خدمات");
  const [expandedItem, setExpandedItem] = useState(null); // فقط یک آیتم می‌تواند باز باشد

  const navItems = [
    { id: 1, name: "خدمات", icon: Home, href: "/" },
    {
      id: 2,
      name: "شارژ",
      icon: Smartphone,
      items: [
        { id: 1, name: "مانده", href: "/" },
        { id: 2, name: "خرید", href: "/" },
        { id: 3, name: "تاریخچه", href: "/" },
      ],
    },
    {
      id: 3,
      name: "بسته‌ها",
      icon: Package,
      items: [
        { id: 1, name: "بسته های من", href: "/" },
        { id: 2, name: "خرید", href: "/" },
        { id: 3, name: "تاریخچه", href: "/" },
      ],
    },
    { id: 4, name: "پشتیبانی", icon: ContactIcon, href: "/" },
    { id: 5, name: "کیف پول", icon: Wallet, href: "/" },
  ];

  const toggleExpanded = (itemId) => {
    setExpandedItem(prev => prev === itemId ? null : itemId);
  };

  const handleItemClick = (itemName, itemId, hasItems) => {
    setActiveItem(itemName);
    if (hasItems) {
      toggleExpanded(itemId);
    }
  };

  return (
    <>
      <nav className="hidden lg:block bg-white border border-gray-300 z-45 lg:w-[450px] lg:h-fit rounded-xl">
        <h2 className="flex m-5 border border-gray-300 p-2 rounded-lg text-sm gap-2 items-center font-light text-gray-500">
          <UserIcon className="text-[#a9020a] text-sm"/> نام کاربری شما
        </h2>
        <span className="block w-full h-px bg-gray-300 mx-2"></span>
        <ul className="flex flex-row lg:flex-col justify-around items-center p-4">
          {navItems.map((item) => (
            <li key={item.id} className="w-full">
              {item.href ? (
                <Link 
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-lg font-medium rounded-xl h-15 transition-all duration-300 ${
                    activeItem === item.name 
                      ? "text-black bg-blue-50 border border-[#0496da]" 
                      : "text-gray-600 border-[#0496da] hover:bg-gray-50"
                  }`}
                  onClick={() => handleItemClick(item.name, item.id, false)}
                >
                  <item.icon className="h-5 w-5 ml-3" />
                  <span>{item.name}</span>
                </Link>
              ) : (
                <div className="flex flex-col">
                  <button
                    className={`flex items-center justify-between w-full px-4 py-3 text-lg font-medium rounded-xl h-15 cursor-pointer transition-all duration-300 ${
                      activeItem === item.name 
                        ? "text-black bg-blue-50 border-2 border-[#0496da]" 
                        : "text-gray-600 border-[#0496da] hover:bg-gray-50"
                    }`}
                    onClick={() => handleItemClick(item.name, item.id, true)}
                  >
                    <div className="flex items-center">
                      <item.icon className="h-5 w-5 ml-3" />
                      <span>{item.name}</span>
                    </div>
                    <div className={`transition-transform duration-300 ${expandedItem === item.id ? 'rotate-180' : 'rotate-0'}`}>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>
                  
                  {/* ساب‌منو با انیمیشن */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedItem === item.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <ul className="bg-white flex flex-col gap-2 py-2">
                      {item.items.map((subitem) => (
                        <li key={subitem.id} className="w-full">
                          <Link
                            href={subitem.href}
                            className="flex items-center text-lg px-4 py-2 pr-12 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-300"
                            onClick={() => setActiveItem(item.name)}
                          >
                            <span>{subitem.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="lg:hidden h-16"></div>
    </>
  );
}