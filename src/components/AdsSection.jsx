"use client";

import { ArrowUpLeftIcon, CalendarIcon, MapPinIcon, Route } from "lucide-react";
import { navigate } from "next/dist/client/components/segment-cache-impl/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import Loading from "./Loading";

export default function AdsSection() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAds();
  }, []);

  // Helper function to extract percent and repayment period from details
  const extractDetailsFromAd = async (adId) => {
    try {
      const response = await fetch(`/api/ads/${adId}`);
      const result = await response.json();

      let percent = 4;
      let repaymentPeriod = "نامشخص";

      if (result.success && result.data && result.data.details) {
        // Extract interest rate
        const interestDetail = result.data.details.find(
          (d) => d.label === "نرخ سود" || d.label === "کارمزد"
        );

        if (interestDetail && interestDetail.value) {
          const match = interestDetail.value.match(/(\d+|[۰-۹]+)/);
          if (match) {
            const persianToEnglish = match[0]
              .replace(/۰/g, "0")
              .replace(/۱/g, "1")
              .replace(/۲/g, "2")
              .replace(/۳/g, "3")
              .replace(/۴/g, "4")
              .replace(/۵/g, "5")
              .replace(/۶/g, "6")
              .replace(/۷/g, "7")
              .replace(/۸/g, "8")
              .replace(/۹/g, "9");
            percent = parseInt(persianToEnglish);
          }
        }

        // Extract repayment period
        const repaymentDetail = result.data.details.find(
          (d) => d.label === "مدت بازپرداخت"
        );

        if (repaymentDetail && repaymentDetail.value) {
          repaymentPeriod = repaymentDetail.value;
        }
      }

      return { percent, repaymentPeriod };
    } catch (error) {
      console.error("خطا در دریافت جزئیات:", error);
      return { percent: 4, repaymentPeriod: "نامشخص" };
    }
  };

  // Helper function to parse price to number
  const parsePriceToNumber = (priceStr) => {
    if (typeof priceStr === "number") return priceStr;
    if (typeof priceStr !== "string") return 0;

    const cleaned = priceStr
      .replace(/,/g, "")
      .replace(/۰/g, "0")
      .replace(/۱/g, "1")
      .replace(/۲/g, "2")
      .replace(/۳/g, "3")
      .replace(/۴/g, "4")
      .replace(/۵/g, "5")
      .replace(/۶/g, "6")
      .replace(/۷/g, "7")
      .replace(/۸/g, "8")
      .replace(/۹/g, "9");

    const num = parseInt(cleaned);
    return isNaN(num) ? 0 : num;
  };

  // Format date to Persian
  const formatDate = (dateString) => {
    if (!dateString) return "نامشخص";

    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "لحظاتی پیش";
    if (diffInHours < 24) return `${diffInHours} ساعت پیش`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "دیروز";
    if (diffInDays < 7) return `${diffInDays} روز پیش`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} هفته پیش`;

    return date.toLocaleDateString("fa-IR");
  };
  const formatPriceWithLabel = (price) => {
    if (!price || price === 0) return "رایگان";

    const numPrice =
      typeof price === "string" ? parsePriceToNumber(price) : price;

    if (numPrice >= 1000000000) {
      const billions = (numPrice / 1000000000).toFixed(1);
      const formattedBillions = billions.endsWith(".0")
        ? billions.slice(0, -2)
        : billions;
      return `${formattedBillions.replace(".", "/")} میلیارد`;
    }

    if (numPrice >= 1000000) {
      const millions = (numPrice / 1000000).toFixed(0);
      return `${millions} میلیون`;
    }

    return `${numPrice.toLocaleString()} تومان`;
  };

  const fetchAds = async () => {
    try {
      const response = await fetch("/api/ads");
      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        const adsWithDetails = await Promise.all(
          result.data.map(async (ad) => {
            const { percent, repaymentPeriod } = await extractDetailsFromAd(
              ad.id
            );
            return {
              id: ad.id,
              title: ad.title,
              description: ad.description,
              price: parsePriceToNumber(ad.price),
              percent: percent,
              repaymentPeriod: repaymentPeriod,
              bank: ad.bank,
              type: ad.type,
              location: ad.location,
              createdAt: ad.createdAt,
            };
          })
        );

        setAds(adsWithDetails);
      } else {
        console.error("خطا در دریافت آگهیها:", result.error);
      }
    } catch (error) {
      console.error("خطا در ارتباط با سرور:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800">جدیدترین آگهی‌ها</h2>
        <span className="text-sm text-slate-600 bg-slate-100 px-4 py-2 rounded-full">
          {ads.length} آگهی
        </span>
      </div>

      {ads.length > 0 ? (
        ads.map((ad) => (
          <div
            key={ad.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden"
          >
            <Link href={`/ads/${ad.id}`}>
              {/* Main Row */}
              <div className="flex justify-between md:grid md:grid-cols-12 gap-4 items-center p-4">
                {/* Bank Logo */}
                <div className="col-span-2 md:col-span-1 flex justify-center">
                  <img
                    src={ad.bank?.logo || "/banks/default-bank.png"}
                    alt={ad.bank?.name}
                    className="w-12 h-12 min-w-12 min-h-12 md:w-14 md:h-14 object-contain"
                  />
                </div>

                {/* Percent */}
                <div className="col-span-2 md:col-span-1 text-center">
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold inline-block">
                    {ad.percent}%
                  </div>
                </div>

                {/* Loan Type */}
                <div className="col-span-3 md:col-span-2">
                  <p className="text-slate-700 font-semibold text-sm md:text-base truncate">
                    {ad.type}
                  </p>
                </div>

                {/* Repayment Period */}
                <div className="col-span-3 md:col-span-2 text-center">
                  <p className="text-slate-600 text-sm font-medium">
                    {ad.repaymentPeriod}
                  </p>
                </div>

                {/* Price */}
                <div className="col-span-4 md:col-span-3">
                  <p className="text-blue-600 font-bold text-sm md:text-base">
                    {formatPriceWithLabel(ad.price)}
                  </p>
                </div>

                {/* Location */}
                <div className="col-span-3 md:col-span-2 md:block hidden">
                  <div className="flex items-center gap-1 text-slate-600 text-sm">
                    <MapPinIcon className="w-4 h-4" />
                    <span className="truncate">{ad.location}</span>
                  </div>
                </div>

                {/* Details Button */}
                <div className="col-span-3 hidden md:flex md:col-span-1  justify-end">
                  <button
                    onClick={() => {
                      navigate(`/ads/${ad.id}`);
                    }}
                    className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    جزئیات
                  </button>
                </div>
              </div>

              {/* Date Row */}
              <div className="bg-slate-50 px-4 py-2 border-t border-slate-200">
                <div className="flex justify-between items-center gap-2 text-slate-500 text-xs">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    <span> {formatDate(ad.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 md:hidden">
                    <div className="flex items-center gap-1 text-slate-600 text-sm">
                      <MapPinIcon className="w-4 h-4" />
                      <span className="truncate">{ad.location}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      navigate(`/ads/${ad.id}`);
                    }}
                    className="cursor-pointer text-blue-500 md:hidden px-4 py-2 rounded-lg text-sm font-medium transition-colors flex flex-row-reverse justify-center items-center"
                  >
                    <ArrowUpLeftIcon className="w-4 h-4" />
                    جزئیات
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            هیچ آگهی‌ای موجود نیست
          </h3>
          <p className="text-slate-600">
            در حال حاضر آگهی ثبت شده‌ای وجود ندارد
          </p>
        </div>
      )}
    </div>
  );
}
