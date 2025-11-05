"use client";

import { Clock, MapPin } from "lucide-react";
import Link from "next/link";
const ads = [
  {
    id: 1,
    bankId: 1,
    title: "وام قرض الحسنه ۴۰۰ میلیون تومانی",
    description: "ارائه وام قرض الحسنه برای کارمندان و بازنشستگان در مشهد",
    time: "۱ ساعت قبل",
    location: "خراسان رضوی",
    type: "تسهیلات بانکی",
    price: "۴۰۰,۰۰۰,۰۰۰",
    bank: "بانک سپه",
  },
  {
    id: 2,
    bankId: 2,
    title: "وام مسکن ۵۰۰ میلیونی",
    description: "وام مسکن با سود پایین برای جوانان متأهل",
    time: "۲ ساعت قبل",
    location: "تهران",
    type: "وام مسکن",
    price: "۵۰۰,۰۰۰,۰۰۰",
    bank: "بانک ملی",
  },
  {
    id: 3,
    bankId: 3,
    title: "وام خودرو ۳۰۰ میلیونی",
    description: "خرید خودرو با وام بلندمدت و اقساط راحت",
    time: "۳ ساعت قبل",
    location: "اصفهان",
    type: "وام خودرو",
    price: "۳۰۰,۰۰۰,۰۰۰",
    bank: "بانک ملت",
  },
];

const banks = [
  { id: 1, img: "/banks/sepah-low.png" },
  { id: 2, img: "/banks/melli-low.png" },
  { id: 3, img: "/banks/mellat-low.png" },
  { id: 4, img: "/banks/iran-zamin-low.png" },
  { id: 5, img: "/banks/saderat-low.png" },
  { id: 6, img: "/banks/blu-bank-low.png" },
  { id: 7, img: "/banks/bank-refah-low.png" },
  { id: 8, img: "/banks/Bank-Mehr-Iran-low.png" },
  { id: 9, img: "/banks/bank-saman-low.png" },
];
export default function AdsSection() {
  return (
    <div className="mt-8">
      <h2 className="mt-5 text-xl font-bold flex items-center gap-2">
        <span className="h-2 w-2 bg-[#0094da] rounded-full inline-block"></span>
        آگهی های فروش
      </h2>
      <div className="flex flex-col gap-4 mt-5">
        {ads.map((ad) => {
          const bank = banks.find((b) => b.id === ad.bankId);
          return (
            <Link href={`/ads/${ad.id}`} key={ad.id}>
              <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-3">
                  {bank && (
                    <div className="flex shrink-0">
                      <img
                        src={bank.img}
                        alt="Bank Logo"
                        className="w-12 h-12 rounded-lg object-contain bg-gray-50 p-1"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-bold text-gray-800 line-clamp-1">
                        {ad.title}
                      </h4>
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md whitespace-nowrap mr-2">
                        {ad.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {ad.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{ad.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{ad.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
