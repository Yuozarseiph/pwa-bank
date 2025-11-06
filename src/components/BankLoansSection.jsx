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

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/loan?bankSlug=${bankSlug}`);
      const result = await response.json();
      
      if (result.success) {
        setLoans(result.data);
      } else {
        console.error("خطا در دریافت وام‌ها:", result.error);
      }
    } catch (error) {
      console.error("خطا در ارتباط با سرور:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterLoans = () => {
    let filtered = loans;

    // Filter by percent
    if (selectedPercent !== null) {
      filtered = filtered.filter(loan => loan.percent === selectedPercent);
    }

    // Filter by price range
    if (priceRange.from) {
      filtered = filtered.filter(loan => loan.price >= parseInt(priceRange.from));
    }

    if (priceRange.to) {
      filtered = filtered.filter(loan => loan.price <= parseInt(priceRange.to));
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