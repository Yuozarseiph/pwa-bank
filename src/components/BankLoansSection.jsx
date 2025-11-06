"use client";
import { ArrowRight, ChevronLeftIcon, SearchIcon } from "lucide-react";
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
  { id: 3, lable: "کارمزد %18", percent: 18 },
  { id: 4, lable: "کارمزد %20", percent: 20 },
  { id: 5, lable: "کارمزد %24", percent: 24 },
];

const loanBank = [
  {
    id: 1,
    icon: "/banks/melli-low.png",
    bank: "ملی",
    bankSlug: "melli",
    percent: 0,
    price: 15000000,
    description: "وام قرض الحسنه بدون بهره",
  },
  {
    id: 2,
    icon: "/banks/melli-low.png",
    bank: "ملی",
    bankSlug: "melli",
    percent: 4,
    price: 25000000,
    description: "وام مسکن با سود کم",
  },
  {
    id: 3,
    icon: "/banks/melli-low.png",
    bank: "ملی",
    bankSlug: "melli",
    percent: 18,
    price: 30000000,
    description: "وام خودرو با اقساط 36 ماهه",
  },
  {
    id: 4,
    icon: "/banks/melli-low.png",
    bank: "ملی",
    bankSlug: "melli",
    percent: 0,
    price: 20000000,
    description: "وام دانشجویی بدون کارمزد",
  },
  {
    id: 5,
    icon: "/banks/melli-low.png",
    bank: "ملی",
    bankSlug: "melli",
    percent: 4,
    price: 18000000,
    description: "وام ازدواج با شرایط ویژه",
  },
  {
    id: 6,
    icon: "/banks/melli-low.png",
    bank: "ملی",
    bankSlug: "melli",
    percent: 20,
    price: 40000000,
    description: "وام مسکن با بازپرداخت طولانی",
  },
  {
    id: 7,
    icon: "/banks/melli-low.png",
    bank: "ملی",
    bankSlug: "melli",
    percent: 24,
    price: 22000000,
    description: "وام درمان و پزشکی",
  },
  {
    id: 8,
    icon: "/banks/sepah-low.png",
    bank: "سپه",
    bankSlug: "sepah",
    percent: 0,
    price: 28000000,
    description: "وام نوسازی مسکن بدون کارمزد",
  },
  {
    id: 9,
    icon: "/banks/sepah-low.png",
    bank: "سپه",
    bankSlug: "sepah",
    percent: 4,
    price: 10000000,
    description: "وام قرض الحسنه ویژه",
  },
  {
    id: 10,
    icon: "/banks/mellat-low.png",
    bank: "ملت",
    bankSlug: "mellat",
    percent: 18,
    price: 35000000,
    description: "وام خودرو با اقساط بلندمدت",
  },
  {
    id: 11,
    icon: "/banks/mellat-low.png",
    bank: "ملت",
    bankSlug: "mellat",
    percent: 20,
    price: 15000000,
    description: "وام ازدواج با ضمانت ساده",
  },
  {
    id: 12,
    icon: "/banks/iran-zamin-low.png",
    bank: "ایران زمین",
    bankSlug: "iran-zamin",
    percent: 24,
    price: 50000000,
    description: "وام تجاری برای کسب و کار",
  },
  {
    id: 13,
    icon: "/banks/saderat-low.png",
    bank: "صادرات",
    bankSlug: "saderat",
    percent: 4,
    price: 32000000,
    description: "وام مسکن با کارمزد پایین",
  },
  {
    id: 14,
    icon: "/banks/blu-bank-low.png",
    bank: "بلو بانک",
    bankSlug: "blu-bank",
    percent: 24,
    price: 12000000,
    description: "وام سفر با شرایط آسان",
  },
  {
    id: 15,
    icon: "/banks/bank-refah-low.png",
    bank: "رفاه",
    bankSlug: "refah",
    percent: 18,
    price: 16000000,
    description: "وام بازنشستگی",
  },
  {
    id: 16,
    icon: "/banks/Bank-Mehr-Iran-low.png",
    bank: "مهر ایران",
    bankSlug: "mehr-iran",
    percent: 20,
    price: 26000000,
    description: "وام خرید مسکن",
  },
  {
    id: 17,
    icon: "/banks/bank-saman-low.png",
    bank: "سامان",
    bankSlug: "saman",
    percent: 24,
    price: 38000000,
    description: "وام سرمایه گذاری",
  },
  {
    id: 18,
    icon: "/banks/bank-refah-low.png",
    bank: "رفاه",
    bankSlug: "refah",
    percent: 0,
    price: 14000000,
    description: "وام تحصیلی بدون کارمزد",
  },
  {
    id: 19,
    icon: "/banks/Bank-Mehr-Iran-low.png",
    bank: "مهر ایران",
    bankSlug: "mehr-iran",
    percent: 18,
    price: 19000000,
    description: "وام خودروی کارکرده",
  },
  {
    id: 20,
    icon: "/banks/bank-saman-low.png",
    bank: "سامان",
    bankSlug: "saman",
    percent: 24,
    price: 45000000,
    description: "وام راه اندازی کسب و کار",
  },
];

const BankLoansSection = ({ bankSlug }) => {
  const [selectedPercent, setSelectedPercent] = useState(null);
  const [priceRange, setPriceRange] = useState({ from: "", to: "" });
  const [showAllLoans, setShowAllLoans] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

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

  const filteredLoans = loanBank.filter((loan) => {
    const bankMatch = loan.bankSlug === bankSlug;
    const percentMatch =
      selectedPercent === null || loan.percent === selectedPercent;
    const fromValue = priceRange.from ? parseInt(priceRange.from) : 0;
    const toValue = priceRange.to ? parseInt(priceRange.to) : Infinity;
    const priceMatch = loan.price >= fromValue && loan.price <= toValue;

    return bankMatch && percentMatch && priceMatch;
  });

  const displayedLoans = showAllLoans
    ? filteredLoans
    : filteredLoans.slice(0, 5);

  return (
    <div className="">
      <Header />
      <Navbar />
      <div className="flex flex-col max-w-[1080px] bg-white lg:mx-auto rounded-xl mx-4 p-5 mt-2 mb-25 lg:mb-20 lg:mt-20">
        <button
          onClick={() => router.back()}
          className="group w-fit cursor-pointer mb-8 inline-flex items-center gap-3 px-5 py-3 bg-white rounded-2xl text-gray-700 font-medium hover:text-[#0094da] border-2 border-gray-200 hover:border-[#0094da] transition-all shadow-sm hover:shadow-lg"
        >
          <ArrowRight className="w-5 h-5" />
          <span>بازگشت</span>
        </button>
        <div className="flex items-center gap-4 mb-8">
          <img
            src={currentBank.img}
            alt={currentBank.name}
            className="h-16 w-16 p-2 bg-[#f1f5f9] rounded-xl"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              وام‌های بانک {currentBank.name}
            </h1>
            <p className="text-gray-600 mt-1">
              مشاهده و مقایسه تمام وام‌ها و تسهیلات
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">کارمزد</h2>
          <ul className="flex flex-wrap gap-4">
            {topNav.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handlePercentClick(item)}
                  className={`flex justify-center items-center cursor-pointer border rounded-full py-2 px-6 transition-all duration-300 ${
                    selectedPercent === item.percent
                      ? "bg-[#0094da] text-white border-[#0094da]"
                      : "text-gray-700 border-gray-300 hover:border-[#0094da]"
                  }`}
                >
                  <span className="text-sm font-medium">{item.lable}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <form
          className="grid md:flex md:flex-wrap md:items-center gap-4 mb-8"
          onSubmit={handleSearch}
        >
          <div className="border border-gray-300 px-4 py-2 rounded-full hover:border-[#0094da] transition-colors duration-300 flex justify-center items-center">
            <label htmlFor="from" className="text-sm text-gray-600 ml-2">
              از
            </label>
            <input
              id="from"
              className="px-4 py-1 w-full md:w-fit outline-0 bg-transparent text-left"
              dir="ltr"
              type="text"
              placeholder="0"
              value={formatNumber(priceRange.from)}
              onChange={(e) => handlePriceRangeChange(e, "from")}
            />
            <span className="text-sm text-gray-600 mr-2">تومان</span>
          </div>

          <div className="border border-gray-300 px-4 py-2 rounded-full hover:border-[#0094da] transition-colors duration-300 flex justify-center items-center">
            <label htmlFor="to" className="text-sm text-gray-600 ml-2">
              تا
            </label>
            <input
              id="to"
              className="px-4 py-1 w-full md:w-fit outline-0 bg-transparent text-left"
              dir="ltr"
              type="text"
              placeholder="100,000,000,000"
              value={formatNumber(priceRange.to)}
              onChange={(e) => handlePriceRangeChange(e, "to")}
            />
            <span className="text-sm text-gray-600 mr-2">تومان</span>
          </div>

          <button
            type="submit"
            className="flex flex-row-reverse gap-3 items-center justify-center px-8 py-3 rounded-full cursor-pointer bg-[#0095da] hover:bg-[#007bb5] text-white transition-all duration-300"
          >
            جستجو
            <SearchIcon className="h-4 w-4" />
          </button>
        </form>

        {filteredLoans.length > 0 ? (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">نتایج جستجو</h3>
              <span className="text-sm text-gray-500">
                {filteredLoans.length} مورد یافت شد
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {displayedLoans.map((loan) => (
                <Link href={`/banks/${loan.bankSlug}/${loan.id}`} key={loan.id}>
                  <div className="flex gap-4 items-center bg-white p-4 rounded-lg border border-gray-200 hover:border-[#0094da] hover:shadow-md transition-all duration-300 cursor-pointer">
                    <img
                      src={loan.icon}
                      alt={loan.bank}
                      className="h-12 w-12 rounded-lg"
                    />

                    <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg">{loan.bank}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {loan.description}
                        </p>
                      </div>
                      <div className="flex items-center flex-row-reverse gap-2">
                        <p className="text-sm font-bold">
                          {loan.price.toLocaleString()} تومان
                        </p>
                        <p className="text-sm text-gray-600">مبلغ:</p>
                      </div>
                      <div className="text-left flex items-center gap-2">
                        <p className="text-lg font-bold text-red-600">
                          %{loan.percent}
                        </p>
                        <p className="text-sm text-gray-600">کارمزد</p>
                      </div>
                    </div>
                    <ChevronLeftIcon className="text-gray-400" />
                  </div>
                </Link>
              ))}
            </div>

            {filteredLoans.length > 5 && !showAllLoans && (
              <button
                onClick={handleShowMore}
                className="w-full mt-6 py-3 text-[#0094da] border border-[#0094da] rounded-lg hover:bg-[#0095da1c] transition-all duration-300 font-bold"
              >
                مشاهده {filteredLoans.length - 5} مورد دیگر
              </button>
            )}

            {showAllLoans && filteredLoans.length > 5 && (
              <button
                onClick={() => setShowAllLoans(false)}
                className="w-full mt-6 py-3 text-[#0094da] border border-[#0094da] rounded-lg hover:bg-[#0095da1c] transition-all duration-300 font-bold"
              >
                نمایش کمتر
              </button>
            )}
          </div>
        ) : (
          <div className="mt-8 text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
            <p className="text-lg">هیچ وامی با فیلترهای انتخاب شده یافت نشد</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-[#0094da] hover:text-[#007bb5] transition-colors duration-300"
            >
              حذف فیلترها
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BankLoansSection;
