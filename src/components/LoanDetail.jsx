"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowRight, Calendar, ChartLineIcon, BadgeDollarSignIcon } from "lucide-react";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loading from "./Loading";

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

const LoanDetail = () => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [loan, setLoan] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundLoan = loanBank.find(
        (item) =>
          item.bankSlug === params.bname && item.id === parseInt(params.post)
      );
      setLoan(foundLoan);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [params.bname, params.post]);

  if (loading) {
    return <Loading />;
  }

  if (!loan) {
    return (
      <div className="">
        <Header />
        <Navbar />
        <div className="flex flex-col max-w-[1080px] bg-white mx-2 md:mx-auto p-5 rounded-xl mb-25 md:mb-20 md:mt-10 text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            وام یافت نشد
          </h2>
          <button
            onClick={() => router.back()}
            className="text-[#0094da] hover:text-[#007bb5] transition-colors duration-300"
          >
            بازگشت به صفحه قبل
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="">
      <Header />
      <Navbar />
      <div className="flex flex-col max-w-[1080px] bg-white mx-2 md:mx-auto p-5 rounded-xl mb-25 md:mb-20 md:mt-10">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <button
            onClick={() => router.push("/")}
            className="hover:text-[#0094da] transition-colors duration-300"
          >
            خانه
          </button>
          <ArrowRight className="h-4 w-4" />
          <button
            onClick={() => router.push(`/banks/${loan.bankSlug}`)}
            className="hover:text-[#0094da] transition-colors duration-300"
          >
            بانک {loan.bank}
          </button>
          <ArrowRight className="h-4 w-4" />
          <span className="text-gray-800 font-medium">{loan.description}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <img
            src={loan.icon}
            alt={loan.bank}
            className="h-24 w-24 rounded-xl bg-gray-100 p-3"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {loan.description}
            </h1>
            <p className="text-gray-600 mb-4">بانک {loan.bank}</p>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <BadgeDollarSignIcon className="h-5 w-5 text-[#0094da]" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">مبلغ وام</p>
                  <p className="text-lg font-bold text-gray-800">
                    {loan.price.toLocaleString()} تومان
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-50 rounded-lg">
                  <ChartLineIcon className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">کارمزد</p>
                  <p className="text-lg font-bold text-red-600">
                    %{loan.percent}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8">
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                مشخصات وام
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">بانک</span>
                  <span className="font-medium">{loan.bank}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">نوع وام</span>
                  <span className="font-medium">{loan.description}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">مبلغ</span>
                  <span className="font-medium">
                    {loan.price.toLocaleString()} تومان
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">کارمزد</span>
                  <span className="font-medium text-red-600">
                    %{loan.percent}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                شرایط دریافت
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#0094da] rounded-full"></div>
                  حداقل سن ۱۸ سال
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#0094da] rounded-full"></div>
                  ارائه مدارک شناسایی معتبر
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#0094da] rounded-full"></div>
                  داشتن حساب در بانک {loan.bank}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#0094da] rounded-full"></div>
                  عدم سوء پیشینه مالی
                </li>
              </ul>
            </div>
          </div>

          {/* <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              درخواست وام
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نام کامل
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0094da] focus:border-transparent"
                  placeholder="نام و نام خانوادگی"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  شماره تماس
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0094da] focus:border-transparent"
                  placeholder="09xxxxxxxxx"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مبلغ درخواستی
                </label>
                <input
                  type="text"
                  value={loan.price.toLocaleString()}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0094da] hover:bg-[#007bb5] text-white py-3 px-4 rounded-lg transition-colors duration-300 font-medium"
              >
                ثبت درخواست
              </button>
            </form>
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoanDetail;
