"use client";

import { ArrowRight, SearchIcon, CalendarIcon, MapPinIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loading from "@/components/Loading";
import Link from "next/link";
import { useRouter } from "next/navigation";

const topNav = [
  { id: 1, lable: "کارمزد %0", percent: 0 },
  { id: 2, lable: "کارمزد %4", percent: 4 },
  { id: 3, lable: "کارمزد %5", percent: 5 },
  { id: 4, lable: "کارمزد %6", percent: 6 },
  { id: 5, lable: "کارمزد %18", percent: 18 },
  { id: 6, lable: "کارمزد %20", percent: 20 },
  { id: 7, lable: "کارمزد %24", percent: 24 },
];

// Map bank slugs to bank names in ads.json
const bankSlugToName = {
  sepah: "بانک سپه",
  melli: "بانک ملی",
  mellat: "بانک ملت",
  "iran-zamin": "بانک ایران زمین",
  saderat: "بانک صادرات",
  "blu-bank": "بلو بانک",
  refah: "بانک رفاه",
  "mehr-iran": "بانک مهر ایران",
  saman: "بانک سامان",
};

const BankLoansSection = ({ bankSlug }) => {
  const [selectedPercent, setSelectedPercent] = useState(null);
  const [priceRange, setPriceRange] = useState({ from: "", to: "" });
  const [showAllLoans, setShowAllLoans] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchLoans();
  }, [bankSlug]);

  useEffect(() => {
    filterLoans();
  }, [selectedPercent, priceRange, loans]);

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

  const fetchLoans = async () => {
    try {
      setLoading(true);

      const bankName = bankSlugToName[bankSlug];

      if (!bankName) {
        console.error("نام بانک یافت نشد");
        setLoans([]);
        return;
      }

      const response = await fetch(
        `/api/ads?bank=${encodeURIComponent(bankName)}`
      );
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

        setLoans(adsWithDetails);
      } else {
        console.error("خطا در دریافت آگهی‌ها:", result.error);
        setLoans([]);
      }
    } catch (error) {
      console.error("خطا در ارتباط با سرور:", error);
      setLoans([]);
    } finally {
      setLoading(false);
    }
  };

  const filterLoans = () => {
    let filtered = loans;

    if (selectedPercent !== null) {
      filtered = filtered.filter((loan) => loan.percent === selectedPercent);
    }

    if (priceRange.from) {
      filtered = filtered.filter(
        (loan) => loan.price >= parseInt(priceRange.from)
      );
    }

    if (priceRange.to) {
      filtered = filtered.filter(
        (loan) => loan.price <= parseInt(priceRange.to)
      );
    }

    setFilteredLoans(filtered);
  };

  const formatNumber = (num) => {
    if (!num) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const parseNumber = (str) => {
    return str.replace(/,/g, "");
  };

  const handlePercentClick = (percentItem) => {
    setSelectedPercent(
      selectedPercent === percentItem.percent ? null : percentItem.percent
    );
    setShowAllLoans(false);
  };

  const handlePriceRangeChange = (e, field) => {
    const rawValue = parseNumber(e.target.value);
    if (rawValue === "" || /^\d+$/.test(rawValue)) {
      setPriceRange((prev) => ({
        ...prev,
        [field]: rawValue,
      }));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setShowAllLoans(false);
  };

  const handleShowMore = () => {
    setShowAllLoans(true);
  };

  const clearFilters = () => {
    setSelectedPercent(null);
    setPriceRange({ from: "", to: "" });
  };

  const bankData = {
    sepah: { name: "سپه", img: "/banks/sepah-low.png" },
    melli: { name: "ملی", img: "/banks/melli-low.png" },
    mellat: { name: "ملت", img: "/banks/mellat-low.png" },
    "iran-zamin": { name: "ایران زمین", img: "/banks/iran-zamin-low.png" },
    saderat: { name: "صادرات", img: "/banks/saderat-low.png" },
    "blu-bank": { name: "بلو", img: "/banks/blu-bank-low.png" },
    refah: { name: "رفاه", img: "/banks/bank-refah-low.png" },
    "mehr-iran": { name: "مهر ایران", img: "/banks/Bank-Mehr-Iran-low.png" },
    saman: { name: "سامان", img: "/banks/bank-saman-low.png" },
  };

  const currentBank = bankData[bankSlug] || {
    name: "بانک",
    img: "/banks/default-bank.png",
  };

  const displayedLoans = showAllLoans
    ? filteredLoans
    : filteredLoans.slice(0, 5);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="max-w-[1080px] mt-20 rounded-xl mb-10 mx-auto px-4 py-8 bg-white">
          {/* Bank Header */}
          <div className="flex items-center gap-4 mb-8 bg-white rounded-2xl p-6 shadow-lg">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
            <img
              src={currentBank.img}
              alt={currentBank.name}
              className="w-16 h-16 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                بانک {currentBank.name}
              </h1>
              <p className="text-slate-600">
                مشاهده و مقایسه تمام وامها و تسهیلات
              </p>
            </div>
          </div>

          {/* Filters Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
            {/* Percent Filter */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-slate-800">
                فیلتر بر اساس کارمزد
              </h3>
              <div className="flex flex-wrap gap-3">
                {topNav.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handlePercentClick(item)}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      selectedPercent === item.percent
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {item.lable}
                  </button>
                ))}
                {selectedPercent !== null && (
                  <button
                    onClick={clearFilters}
                    className="px-6 py-2 rounded-lg font-medium bg-red-100 text-red-600 hover:bg-red-200 transition-all"
                  >
                    حذف فیلترها
                  </button>
                )}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-800">
                محدوده قیمت (تومان)
              </h3>
              <form onSubmit={handleSearch} className="flex gap-4 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm text-slate-600 mb-2">
                    از مبلغ
                  </label>
                  <input
                    type="text"
                    value={formatNumber(priceRange.from)}
                    onChange={(e) => handlePriceRangeChange(e, "from")}
                    placeholder="مثال: 100,000,000"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm text-slate-600 mb-2">
                    تا مبلغ
                  </label>
                  <input
                    type="text"
                    value={formatNumber(priceRange.to)}
                    onChange={(e) => handlePriceRangeChange(e, "to")}
                    placeholder="مثال: 500,000,000"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 self-end"
                >
                  <SearchIcon className="w-5 h-5" />
                  جستجو
                </button>
              </form>
            </div>
          </div>

          {/* Loans Table */}
          <div className="space-y-3 ">
            {displayedLoans.length > 0 ? (
              <>
                {displayedLoans.map((loan) => (
                  <div
                    key={loan.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden"
                  >
                    {/* Main Row */}
                    <div className="grid grid-cols-12 gap-4 items-center p-4">
                      {/* Bank Logo */}
                      <div className="col-span-2 md:col-span-1 flex justify-center">
                        <img
                          src={loan.bank?.logo || "/banks/default-bank.png"}
                          alt={loan.bank?.name}
                          className="w-12 h-12 md:w-14 md:h-14 object-contain"
                        />
                      </div>

                      {/* Percent */}
                      <div className="col-span-2 md:col-span-1 text-center">
                        <p className="text-xs text-slate-500 mb-1">درصد</p>
                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold inline-block">
                          {loan.percent}%
                        </div>
                      </div>

                      {/* Loan Type */}
                      <div className="col-span-3 md:col-span-2">
                        <p className="text-xs text-slate-500 mb-1">نوع وام</p>
                        <p className="text-slate-700 font-semibold text-sm md:text-base truncate">
                          {loan.type}
                        </p>
                      </div>

                      {/* Repayment Period */}
                      <div className="col-span-3 md:col-span-2 text-center">
                        <p className="text-xs text-slate-500 mb-1">ماه اقساط</p>
                        <p className="text-slate-600 text-sm font-medium">
                          {loan.repaymentPeriod}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="col-span-4 md:col-span-3">
                        <p className="text-xs text-slate-500 mb-1">مبلغ وام</p>
                        <p className="text-blue-600 font-bold text-sm md:text-base">
                          {loan.price.toLocaleString()} تومان
                        </p>
                      </div>

                      {/* Location */}
                      <div className="col-span-3 md:col-span-2">
                        <p className="text-xs text-slate-500 mb-1">شهر</p>
                        <div className="flex items-center gap-1 text-slate-600 text-sm">
                          <MapPinIcon className="w-4 h-4" />
                          <span className="truncate">{loan.location}</span>
                        </div>
                      </div>

                      {/* Details Button */}
                      <div className="col-span-3 md:col-span-1 flex justify-end">
                        <Link
                          href={`/ads/${loan.id}`}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          جزئیات
                        </Link>
                      </div>
                    </div>

                    {/* Date Row */}
                    <div className="bg-slate-50 px-4 py-2 border-t border-slate-200">
                      <div className="flex items-center gap-2 text-slate-500 text-xs">
                        <CalendarIcon className="w-4 h-4" />
                        <span>تاریخ آگهی: {formatDate(loan.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Show More Button */}
                {!showAllLoans && filteredLoans.length > 5 && (
                  <button
                    onClick={handleShowMore}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-2xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
                  >
                    نمایش {filteredLoans.length - 5} وام بیشتر
                  </button>
                )}
              </>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  هیچ وامی یافت نشد
                </h3>
                <p className="text-slate-600">
                  هیچ وامی با فیلترهای انتخاب شده یافت نشد
                </p>
                {(selectedPercent !== null ||
                  priceRange.from ||
                  priceRange.to) && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    حذف فیلترها
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Navbar />
      <Footer />
    </>
  );
};

export default BankLoansSection;
