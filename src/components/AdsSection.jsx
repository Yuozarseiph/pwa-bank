"use client";
import { Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// مپ کردن نام بانک‌ها به لوگوی آنها
const bankLogoMap = {
  "بانک سپه": "/banks/sepah-low.png",
  "بانک ملی": "/banks/melli-low.png",
  "بانک ملت": "/banks/mellat-low.png",
  "بانک ایران زمین": "/banks/iran-zamin-low.png",
  "بانک صادرات": "/banks/saderat-low.png",
  "بلو بانک": "/banks/blu-bank-low.png",
  "بانک رفاه": "/banks/bank-refah-low.png",
  "بانک مهر ایران": "/banks/Bank-Mehr-Iran-low.png",
  "بانک سامان": "/banks/bank-saman-low.png",
};

export default function AdsSection() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const response = await fetch("/api/ads?limit=3");
      const result = await response.json();

      if (result.success) {
        setAds(result.data);
      } else {
        console.error("خطا در دریافت آگهی‌ها:", result.error);
      }
    } catch (error) {
      console.error("خطا در ارتباط با سرور:", error);
    } finally {
      setLoading(false);
    }
  };

  // تابع برای گرفتن لوگوی بانک بر اساس نام
  const getBankLogo = (bankName) => {
    return bankLogoMap[bankName] || "/banks/default-bank.png";
  };

  if (loading) {
    return (
      <div className="mt-8">
        <h2 className="mt-5 text-xl font-bold flex items-center gap-2">
          <span className="h-2 w-2 bg-[#0094da] rounded-full inline-block"></span>
          آگهی های فروش
        </h2>
        <div className="flex flex-col gap-4 mt-5">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="mt-5 text-xl font-bold flex items-center gap-2">
        <span className="h-2 w-2 bg-[#0094da] rounded-full inline-block"></span>
        آگهی های فروش
      </h2>
      <div className="flex flex-col gap-4 mt-5">
        {ads.map((ad) => {
          const bankLogo = ad.bank?.logo || getBankLogo(ad.bank?.name);

          return (
            <Link href={`/ads/${ad.id}`} key={ad.id}>
              <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="flex shrink-0">
                    <img
                      src={bankLogo}
                      alt={ad.bank?.name || "بانک"}
                      className="w-12 h-12 rounded-lg object-contain bg-gray-50 p-1"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-bold text-gray-800 line-clamp-1">
                        {ad.title}
                      </h4>
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md whitespace-nowrap mr-2">
                        {ad.type || "وام بانکی"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {ad.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{ad.stats?.time || "همین الان"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{ad.location || ad.bank?.name || "تهران"}</span>
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
