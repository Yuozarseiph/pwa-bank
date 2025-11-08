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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-gray-200 border-t-2 flex justify-around items-center px-6 py-3 lg:hidden z-60">
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

// components/Navbar.jsx
// 'use client';

// import { usePathname } from 'next/navigation';
// import { 
//   Home, 
//   BadgePlusIcon, 
//   ShoppingBasketIcon,
//   UserIcon
// } from "lucide-react";
// import Link from 'next/link';

// export default function Navbar() {
//   const pathname = usePathname();

//   const navItems = [
//     { id: 1, name: 'خانه', icon: Home, href: '/' },
//     { id: 2, name: 'ثبت آگهی', icon: BadgePlusIcon, href: '/new-ad' },
//     { id: 3, name: 'جدید ترین فروش ها', icon: ShoppingBasketIcon, href: '/soon' },
//     { id: 4, name: 'پروفایل', icon: UserIcon, href: '/profile' },
//   ];

//   return (
//     <>
//       <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-2xl z-50">
//         <div className="flex justify-around items-center py-2">
//           {navItems.map((item) => {
//             const IconComponent = item.icon;
//             const isActive = pathname === item.href;
            
//             return (
//               <Link href={item.href} key={item.id}>
//                 <button
//                   className={`flex flex-col items-center py-2 px-1 flex-1 transition-all duration-200 cursor-pointer ${
//                     isActive 
//                       ? 'text-[#0094da]' 
//                       : 'text-gray-500'
//                   }`}
//                 >
//                   <IconComponent className="h-6 w-6 mb-1" />
//                   <span className="text-xs font-medium">{item.name}</span>
//                   {isActive && (
//                     <div className="w-1 h-1 bg-[#0094da] rounded-full mt-1"></div>
//                   )}
//                 </button>
//               </Link>
//             );
//           })}
//         </div>
//       </nav>

//       <div className="lg:hidden h-16"></div>
//     </>
//   );
// }