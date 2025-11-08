"use client";

import {
  Home,
  BadgePlusIcon,
  ShoppingBasketIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = [
    { id: 1, name: "خانه", icon: Home, href: "/" },
    {
      id: 2,
      name: "ثبت آگهی",
      icon: BadgePlusIcon,
      href: "/new-ad",
    },
    {
      id: 3,
      name: "جدید ترین فروش ها",
      icon: ShoppingBasketIcon,
      href: "/soon",
    },
    {
      id: 4,
      name: "پروفایل",
      icon: UserIcon,
      href: user ? `/profile/${user.id}` : "/auth",
    },
  ];

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="hidden sticky lg:block bg-white border border-gray-300 z-45 lg:w-[450px] lg:h-fit rounded-xl">
      <div className="text-center pb-3">
        <p className="flex m-2 border border-gray-400 p-2 rounded-lg text-sm gap-2 items-center font-light text-gray-500">
          <UserIcon className="text-[#a9020a] text-sm" />
          {user ? user.name : "نام کاربری شما"}
        </p>
      </div>
      <hr className="text-gray-300 mx-5" />
      <ul className="flex flex-row lg:flex-col justify-around items-center p-4 gap-4">
        {navItems.map((item) => (
          <li key={item.id} className="w-full">
            <Link
              href={item.href}
              className={`flex gap-2 items-center px-4 py-3 text-lg font-medium rounded-xl h-15 transition-all duration-100 ${
                isActive(item.href)
                  ? "text-black bg-blue-50 border border-[#0496da]"
                  : "text-gray-600 border-[#0496da] hover:bg-gray-50"
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// "use client";

// import {
//   Home,
//   BadgePlusIcon,
//   ShoppingBasketIcon,
//   UserIcon,
// } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function Sidebar() {
//   const pathname = usePathname();

//   const navItems = [
//     { id: 1, name: "خانه", icon: Home, href: "/" },
//     {
//       id: 2,
//       name: "ثبت آکهی",
//       icon: BadgePlusIcon,
//       href: "/new-ad",
//     },
//     {
//       id: 3,
//       name: "جدید ترین فروش ها",
//       icon: ShoppingBasketIcon,
//       href: "/soon",
//     },
//     { id: 4, name: "پروفایل", icon: UserIcon, href: "/profile" },
//   ];

//   const isActive = (href) => {
//     if (href === "/") {
//       return pathname === "/";
//     }
//     return pathname.startsWith(href);
//   };

//   return (
//     <nav className="hidden sticky lg:block bg-white border border-gray-300 z-45 lg:w-[450px] lg:h-fit rounded-xl">
//       <h2 className="flex m-5 border border-gray-400 p-2 rounded-lg text-sm gap-2 items-center font-light text-gray-500">
//         <UserIcon className="text-[#a9020a] text-sm" /> نام کاربری شما
//       </h2>
//       <hr className="mt-6 text-gray-300 mx-5" />
//       <ul className="flex flex-row lg:flex-col justify-around items-center p-4 gap-4">
//         {navItems.map((item) => (
//           <li key={item.id} className="w-full">
//             <Link
//               href={item.href}
//               className={`flex items-center px-4 py-3 text-lg font-medium rounded-xl h-15 transition-all duration-100 ${
//                 isActive(item.href)
//                   ? "text-black bg-blue-50 border border-[#0496da]"
//                   : "text-gray-600 border-[#0496da] hover:bg-gray-50"
//               }`}
//             >
//               <item.icon className="h-5 w-5 ml-3" />
//               <span>{item.name}</span>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// }
