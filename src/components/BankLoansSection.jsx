"use client";
import { ChevronLeftIcon, SearchIcon } from "lucide-react";
import { useState } from "react";

const banks = [
  { id: 1, img: "/banks/sepah-low.png", name: "سپه" },
  { id: 2, img: "/banks/melli-low.png", name: "ملی" },
  { id: 3, img: "/banks/mellat-low.png", name: "ملت" },
  { id: 4, img: "/banks/iran-zamin-low.png", name: "ایران زمین" },
  { id: 5, img: "/banks/saderat-low.png", name: "صادرات" },
  { id: 6, img: "/banks/blu-bank-low.png", name: "بلو " },
  { id: 7, img: "/banks/bank-refah-low.png", name: "رفاه" },
  { id: 8, img: "/banks/Bank-Mehr-Iran-low.png", name: "مهر ایران" },
  { id: 9, img: "/banks/bank-saman-low.png", name: "سامان" },
];

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
    percent: 0,
    price: 15000000,
    description: "وام قرض الحسنه بدون بهره",
  },
  {
    id: 2,
    icon: "/banks/melli-low.png",
    bank: "ملی",
    percent: 4,
    price: 25000000,
    description: "وام مسکن با سود کم",
  },
  {
    id: 3,
    icon: "/banks/melli-low.png",
    bank: "ملی",
    percent: 18,
    price: 30000000,
    description: "وام خودرو با اقساط 36 ماهه",
  },
  {
    id: 4,
    icon: "/banks/melli-low.png",
    bank: "ملی",
    percent: 0,
    price: 20000000,
    description: "وام دانشجویی بدون کارمزد",
  },
  {
    id: 5,
    icon: "/banks/melli-low.png",
    bank: "ملی",
    percent: 4,
    price: 18000000,
    description: "وام ازدواج با شرایط ویژه",
  },
  {
    id: 6,
    icon: "/banks/melli-low.png",
    bank: "ملی",
    percent: 20,
    price: 40000000,
    description: "وام مسکن با بازپرداخت طولانی",
  },
  {
    id: 7,
    icon: "/banks/melli-low.png",
    bank: "ملی",
    percent: 24,
    price: 22000000,
    description: "وام درمان و پزشکی",
  },
  {
    id: 8,
    icon: "/banks/sepah-low.png",
    bank: "سپه",
    percent: 0,
    price: 28000000,
    description: "وام نوسازی مسکن بدون کارمزد",
  },
  {
    id: 9,
    icon: "/banks/sepah-low.png",
    bank: "سپه",
    percent: 4,
    price: 10000000,
    description: "وام قرض الحسنه ویژه",
  },
  {
    id: 10,
    icon: "/banks/mellat-low.png",
    bank: "ملت",
    percent: 18,
    price: 35000000,
    description: "وام خودرو با اقساط بلندمدت",
  },
  {
    id: 11,
    icon: "/banks/mellat-low.png",
    bank: "ملت",
    percent: 20,
    price: 15000000,
    description: "وام ازدواج با ضمانت ساده",
  },
  {
    id: 12,
    icon: "/banks/iran-zamin-low.png",
    bank: "ایران زمین",
    percent: 24,
    price: 50000000,
    description: "وام تجاری برای کسب و کار",
  },
  {
    id: 13,
    icon: "/banks/saderat-low.png",
    bank: "صادرات",
    percent: 4,
    price: 32000000,
    description: "وام مسکن با کارمزد پایین",
  },
  {
    id: 14,
    icon: "/banks/blu-bank-low.png",
    bank: "بلو بانک",
    percent: 24,
    price: 12000000,
    description: "وام سفر با شرایط آسان",
  },
  {
    id: 15,
    icon: "/banks/bank-refah-low.png",
    bank: "رفاه",
    percent: 18,
    price: 16000000,
    description: "وام بازنشستگی",
  },
  {
    id: 16,
    icon: "/banks/Bank-Mehr-Iran-low.png",
    bank: "مهر ایران",
    percent: 20,
    price: 26000000,
    description: "وام خرید مسکن",
  },
  {
    id: 17,
    icon: "/banks/bank-saman-low.png",
    bank: "سامان",
    percent: 24,
    price: 38000000,
    description: "وام سرمایه گذاری",
  },
  {
    id: 18,
    icon: "/banks/bank-refah-low.png",
    bank: "رفاه",
    percent: 0,
    price: 14000000,
    description: "وام تحصیلی بدون کارمزد",
  },
  {
    id: 19,
    icon: "/banks/Bank-Mehr-Iran-low.png",
    bank: "مهر ایران",
    percent: 18,
    price: 19000000,
    description: "وام خودروی کارکرده",
  },
  {
    id: 20,
    icon: "/banks/bank-saman-low.png",
    bank: "سامان",
    percent: 24,
    price: 45000000,
    description: "وام راه اندازی کسب و کار",
  },
];
const BankLoansSection = () => {
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedPercent, setSelectedPercent] = useState(null);
  const [priceRange, setPriceRange] = useState({ from: "", to: "" });
  const [showAllLoans, setShowAllLoans] = useState(false);

  const handleBankClick = (bank) => {
    setSelectedBank(bank);
    setSelectedPercent(null);
    setPriceRange({ from: "", to: "" });
    setShowAllLoans(false);
  };

  const handlePercentClick = (percentItem) => {
    setSelectedPercent(
      selectedPercent === percentItem.percent ? null : percentItem.percent
    );
    setShowAllLoans(false);
  };

  const handlePriceRangeChange = (e, field) => {
    setPriceRange((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
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

  const filteredLoans = selectedBank
    ? loanBank.filter((loan) => {
        const bankMatch = loan.bank === selectedBank.name;
        const percentMatch =
          selectedPercent === null || loan.percent === selectedPercent;
        const priceMatch =
          (!priceRange.from || loan.price >= parseInt(priceRange.from || 0)) &&
          (!priceRange.to || loan.price <= parseInt(priceRange.to || 0));

        return bankMatch && percentMatch && priceMatch;
      })
    : [];

  const displayedLoans = showAllLoans
    ? filteredLoans
    : filteredLoans.slice(0, 5);

  return (
    <>
      <h2 className="mt-5 text-xl font-bold flex items-center gap-2">
        <span className="h-2 w-2 bg-[#0094da] rounded-full inline-block"></span>
        بانک های تحت پوشش
      </h2>
      <ul className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-x-2 gap-y-6 mt-8">
        {banks.map((item) => (
          <li
            key={item.id}
            className="hover:scale-105 transition-all duration-300"
          >
            <button
              onClick={() => handleBankClick(item)}
              className={`flex flex-col justify-center items-center gap-3 cursor-pointer rounded-lg ${
                selectedBank?.id === item.id
                  ? "bg-blue-50 border border-blue-200"
                  : ""
              }`}
            >
              <img
                src={item.img}
                alt={item.name}
                className="h-15 w-15 p-1 bg-[#f1f5f9] rounded-xl"
              />
            </button>
          </li>
        ))}
      </ul>

      {selectedBank && (
        <>
          <hr className="mt-6 text-gray-300" />
          <p className="text-2xl font-bold border-gray-300 px-2 mt-6">کارمزد</p>
          <ul className="flex flex-wrap gap-4 mt-8">
            {topNav.map((item) => (
              <li
                key={item.id}
                className="hover:scale-105 transition-all duration-300"
              >
                <button
                  onClick={() => handlePercentClick(item)}
                  className={`flex flex-col justify-center items-center cursor-pointer border rounded-full py-1 px-8 ${
                    selectedPercent === item.percent
                      ? "bg-[#0094da] text-white border-[#0094da]"
                      : "text-gray-700 border-gray-300 hover:border-[#0094da]"
                  }`}
                >
                  <h3>{item.lable}</h3>
                </button>
              </li>
            ))}
          </ul>

          <form
            className="grid md:flex md:flex-wrap md:justify-center md:items-center xl:justify-start gap-4 mt-5"
            onSubmit={handleSearch}
          >
            <div className="border border-gray-300 px-4 py-1 rounded-full hover:border-[#0094da] transition-colors duration-300 flex justify-center items-center">
              <label htmlFor="from" className="text-sm text-gray-600">
                از
              </label>
              <input
                id="from"
                className="px-4 py-1 outline-0 bg-transparent w-full md:w-fit"
                dir="ltr"
                type="number"
                placeholder="0"
                value={priceRange.from}
                onChange={(e) => handlePriceRangeChange(e, "from")}
              />
            </div>
            <div className="border border-gray-300 px-5 py-1 rounded-full hover:border-[#0094da] transition-colors duration-300 flex justify-center items-center">
              <label htmlFor="to" className="text-sm text-gray-600">
                تا
              </label>
              <input
                id="to"
                className="px-4 py-1 outline-0 bg-transparent w-full md:w-fit"
                dir="ltr"
                type="number"
                placeholder="100,000,000,000"
                value={priceRange.to}
                onChange={(e) => handlePriceRangeChange(e, "to")}
              />
            </div>
            <button
              type="submit"
              className="flex flex-row-reverse gap-4 items-center justify-center px-10 py-3 md:py-2 rounded-full cursor-pointer bg-[#0095da1c] hover:bg-[#0095da2a] transition-all duration-300"
            >
              جستجو <SearchIcon className="text-[#0094da]" />
            </button>
          </form>

          {filteredLoans.length > 0 ? (
            <div className="mt-8 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">
                  وام‌های بانک {selectedBank.name}
                </h3>
                <span className="text-sm text-gray-500">
                  {filteredLoans.length} مورد یافت شد
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {displayedLoans.map((loan) => (
                  <div
                    key={loan.id}
                    className="flex gap-4 items-center bg-white p-4 rounded-lg border border-gray-200 hover:scale-101 hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <img
                      src={loan.icon}
                      alt={loan.bank}
                      className="h-10 w-10 rounded-lg"
                    />

                    <div className="flex flex-col justify-center items-start md:flex-row md:justify-between md:items-center w-full gap-4">
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
                        <p className="text-sm text-gray-600"> مبلغ : </p>
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
            selectedBank && (
              <div className="mt-8 text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
                <p className="text-lg">
                  هیچ وامی با فیلترهای انتخاب شده یافت نشد
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-[#0094da] hover:text-[#007bb5] transition-colors duration-300"
                >
                  حذف فیلترها
                </button>
              </div>
            )
          )}
        </>
      )}
    </>
  );
};

export default BankLoansSection;
