"use client";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Share,
  CheckCircle2,
  Star,
  Wallet,
  Eye,
  FileText,
  Timer,
  Percent,
  ShieldAlertIcon,
  Users,
  BadgeCheck,
  PiggyBank,
  Info,
  ReceiptTextIcon,
  Award,
} from "lucide-react";

import { useRouter } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Loading from "./Loading";
const LoanType = function (){
  return <img className="p-2" src="/icons/loan-type.svg" alt="icon"/>
}

const allAdsData = {
  1: {
    id: 1,
    title: "وام قرض الحسنه ۴۰۰ میلیون تومانی",
    bank: {
      name: "بانک سپه",
      logo: "/banks/sepah-low.png",
      rating: 4.8,
      verified: true,
      totalReviews: 2847,
    },
    price: "۴۰۰,۰۰۰,۰۰۰",
    currency: "تومان",
    description:
      "ارائه وام قرض الحسنه با شرایط ویژه برای بازنشستگان و کارمندان دولت. امکان بازپرداخت تا ۵ سال با سود پایین و بدون نیاز به ضامن.",
    fullDescription: `این وام با بهترین شرایط و کمترین نرخ سود در بازار ارائه می‌شود. متقاضیان می‌توانند تا سقف ۴۰۰ میلیون تومان از این تسهیلات استفاده کنند.

ویژگی‌های برجسته:
• پرداخت سریع ظرف ۴۸ ساعت پس از تایید مدارک
• عدم نیاز به ضامن یا وثیقه برای مبالغ تا ۱۰۰ میلیون
• امکان بازپرداخت انعطاف‌پذیر با اقساط ماهانه
• مشاوره رایگان توسط کارشناسان متخصص بانکی
• پشتیبانی ۲۴ ساعته در تمام روزهای هفته

شرایط دریافت:
• داشتن حداقل ۲ سال سابقه کار ثابت
• دریافت حقوق از طریق بانک (حداقل ۶ ماه)
• عدم چک برگشتی در سیستم بانکی
• سن بین ۲۵ تا ۶۵ سال`,
    details: [
      { icon: LoanType, label: "نوع وام", value: "قرض الحسنه" },
      { icon: Wallet, label: "مبلغ", value: "۴۰۰ میلیون تومان" },
      { icon: Timer, label: "مدت بازپرداخت", value: "۱۲ تا ۶۰ ماه" },
      { icon: Percent, label: "نرخ سود", value: "۴٪ سالیانه" },
      { icon: Users, label: "محدوده سنی", value: "۲۵ تا ۶۵ سال" },
      { icon: FileText, label: "مدارک", value: "شناسنامه، فیش حقوقی" },
    ],
    contact: {
      phone: "۰۹۱۲۳۴۵۶۷۸۹",
      email: "loan@sepah-bank.ir",
      address: "مشهد، بلوار وکیل‌آباد، نبش خیابان ۱۵، بانک سپه",
    },
    stats: {
      views: 1247,
      time: "۱ ساعت پیش",
    },
    safetyTips: [
      "هرگز پیش‌پرداخت نکنید",
      "مدارک را فقط در شعبه تحویل دهید",
      "از طریق سایت رسمی اقدام کنید",
      "قرارداد را به دقت بخوانید",
    ],
  },
  2: {
    id: 2,
    title: "وام مسکن ۵۰۰ میلیونی",
    bank: {
      name: "بانک ملی",
      logo: "/banks/melli-low.png",
      rating: 4.6,
      verified: true,
      totalReviews: 1923,
    },
    price: "۵۰۰,۰۰۰,۰۰۰",
    currency: "تومان",
    description:
      "وام مسکن با سود پایین برای جوانان متأهل. امکان بازپرداخت تا ۱۰ سال با شرایط ویژه.",
    fullDescription: `وام مسکن ویژه برای خانواده‌های جوان که قصد خرید یا ساخت مسکن دارند.

ویژگی‌های برجسته:
• تا ۵۰۰ میلیون تومان وام
• بازپرداخت تا ۱۰ سال
• نرخ سود ترجیحی برای زوج‌های جوان
• امکان استفاده همزمان با سایر تسهیلات

شرایط دریافت:
• سن کمتر از ۴۰ سال
• متأهل بودن
• عدم مالکیت مسکن قبلی`,
    details: [
      { icon: LoanType, label: "نوع وام", value: "وام مسکن" },
      { icon: Wallet, label: "مبلغ", value: "۵۰۰ میلیون تومان" },
      { icon: Timer, label: "مدت بازپرداخت", value: "تا ۱۰ سال" },
      { icon: Percent, label: "نرخ سود", value: "۶٪ سالیانه" },
      { icon: Users, label: "محدوده سنی", value: "۲۰ تا ۴۰ سال" },
      { icon: FileText, label: "مدارک", value: "شناسنامه، سند ملک" },
    ],
    contact: {
      phone: "۰۹۱۲۸۸۸۷۷۷۶",
      email: "housing@bmi.ir",
      address: "تهران، میدان ولیعصر، بانک ملی مرکزی",
    },
    stats: {
      views: 2134,
      time: "۲ ساعت پیش",
    },
    safetyTips: [
      "سند ملک را بررسی کنید",
      "از قیمت‌گذاری رسمی استفاده کنید",
      "مشاور حقوقی بگیرید",
      "قرارداد را با دقت بخوانید",
    ],
  },
  3: {
    id: 3,
    title: "وام خودرو ۳۰۰ میلیونی",
    bank: {
      name: "بانک ملت",
      logo: "/banks/mellat-low.png",
      rating: 4.5,
      verified: true,
      totalReviews: 1456,
    },
    price: "۳۰۰,۰۰۰,۰۰۰",
    currency: "تومان",
    description:
      "خرید خودرو با وام بلندمدت و اقساط راحت. بدون نیاز به ضامن تا ۱۵۰ میلیون.",
    fullDescription: `وام خودرو با شرایط مناسب برای خرید خودروهای صفر و کارکرده.

ویژگی‌های برجسته:
• تا ۳۰۰ میلیون تومان وام
• بازپرداخت تا ۵ سال
• بدون نیاز به ضامن تا ۱۵۰ میلیون
• تحویل فوری پس از تایید

شرایط دریافت:
• داشتن گواهینامه معتبر
• سابقه کار حداقل ۱ سال
• حقوق حداقل ۱۰ میلیون تومان`,
    details: [
      { icon: LoanType, label: "نوع وام", value: "وام خودرو" },
      { icon: Wallet, label: "مبلغ", value: "۳۰۰ میلیون تومان" },
      { icon: Timer, label: "مدت بازپرداخت", value: "تا ۵ سال" },
      { icon: Percent, label: "نرخ سود", value: "۵٪ سالیانه" },
      { icon: Users, label: "محدوده سنی", value: "۲۲ تا ۶۰ سال" },
      { icon: FileText, label: "مدارک", value: "شناسنامه، گواهینامه" },
    ],
    contact: {
      phone: "۰۹۱۲۷۷۷۶۶۶۵",
      email: "car@bankmellat.ir",
      address: "اصفهان، میدان امام حسین، بانک ملت",
    },
    stats: {
      views: 892,
      time: "۳ ساعت پیش",
    },
    safetyTips: [
      "خودرو را کارشناسی کنید",
      "از قیمت بازار مطلع شوید",
      "بیمه خودرو الزامی است",
      "قرارداد را حتما بخوانید",
    ],
  },
};

const AdDetailPage = ({ adId }) => {
  const router = useRouter();
  const [showContactInfo, setShowContactInfo] = useState(false);
  const adData = allAdsData[String(adId)];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (showContactInfo) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [showContactInfo]);

  const handleContact = () => {
    if (adData?.contact?.phone) {
      window.location.href = `tel:${adData.contact.phone}`;
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleMessage = () => {
    if (adData?.contact?.email) {
      window.location.href = `mailto:${adData.contact.email}`;
    }
  };

  const toggleContactInfo = (show) => {
    setShowContactInfo(show);
  };

  if (!adData) {
    return (
      <div className="min-h-screen bg-[#f1f5f9]">
        <Header />
        <Navbar />
        <main className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-3xl shadow-xl p-12 border-4 border-[#a9020a]/30">
              <div className="w-24 h-24 bg-[#a9020a] rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl font-black text-gray-900 mb-4">
                آگهی یافت نشد
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                متأسفانه آگهی مورد نظر شما یافت نشد یا حذف شده است.
              </p>
              <button
                onClick={() => router.push("/")}
                className="px-8 py-4 bg-[#0094da] text-white rounded-2xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                بازگشت به صفحه اصلی
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:pt-20 pb-24 lg:pb-20">
      <style jsx global>{`
        body.no-scroll {
          overflow: hidden;
        }
      `}</style>

      <Header />

      <div className="lg:hidden fixed top-16 left-0 right-0 z-50 bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-2">
          <button
            onClick={() => toggleContactInfo(true)}
            className="w-full group relative overflow-hidden p-3 rounded-xl bg-[#0094da] shadow-md hover:shadow-lg transition-all"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            <div className="relative flex items-center justify-center gap-2">
              <Phone className="w-5 h-5 text-white" />
              <span className="font-bold text-white text-base">
                نمایش اطلاعات تماس
              </span>
            </div>
          </button>
        </div>
      </div>

      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-20 lg:mt-2 md:py-2">
        <button
          onClick={() => router.back()}
          className="group cursor-pointer mb-8 inline-flex items-center gap-3 px-5 py-3 bg-white rounded-2xl text-gray-700 font-medium hover:text-[#0094da] border-2 border-gray-200 hover:border-[#0094da] transition-all shadow-sm hover:shadow-lg"
        >
          <ArrowRight className="w-5 h-5" />
          <span>بازگشت</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="relative bg-[#0094da] rounded-3xl p-8 shadow-2xl overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-white shadow-xl flex items-center justify-center">
                      <img
                        src={adData.bank.logo}
                        alt={adData.bank.name}
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-black text-white">
                          {adData.bank.name}
                        </h3>
                        {adData.bank.verified && (
                          <BadgeCheck className="w-6 h-6 text-yellow-300" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
                  {adData.title}
                </h1>

                <div className="inline-flex items-baseline gap-3 px-8 py-4 rounded-2xl bg-white shadow-xl">
                  <span className="text-4xl font-black text-[#0094da]">
                    {adData.price}
                  </span>
                  <span className="text-lg font-bold text-gray-600">
                    {adData.currency}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-6 mt-6">
                  <div className="flex items-center gap-2 text-white/90">
                    <Eye className="w-5 h-5" />
                    <span className="font-medium">
                      {adData.stats.views.toLocaleString()}
                    </span>
                  </div>
                  <button className="flex items-center gap-2 text-white/90 cursor-pointer">
                    <Share className="w-5 h-5" />
                    <span className="font-medium">پیشنهاد</span>
                  </button>
                  <div className="flex items-center gap-2 text-white/90">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">{adData.stats.time}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <ReceiptTextIcon className="w-5 h-5 text-gray-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">جزئیات وام</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {adData.details.map((detail, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                      <detail.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">
                        {detail.label}
                      </p>
                      <p className="text-sm font-semibold text-gray-800">
                        {detail.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#0094da] flex items-center justify-center">
                  <Info className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-black text-gray-900">
                  توضیحات کامل
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                {adData.fullDescription}
              </p>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="hidden lg:block bg-linear-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-6 border-2 border-gray-100 mb-4">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-xl font-black text-gray-900">
                  ارتباط با اگهی دهنده
                </h3>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-blue-50 hover:bg-blue-100 border transition-all duration-300 border-blue-100">
                  <button
                    onClick={handleContact}
                    className="flex flex-row-reverse items-center justify-end gap-3 py-4 px-3 rounded-xl w-full text-white cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-gray-800">
                        {adData.contact.phone}
                      </span>
                    </div>

                    <Phone className="text-[#0094da] w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={handleMessage}
                  className="w-full p-5 rounded-2xl bg-white border-3 border-[#0094da] hover:bg-[#0094da]/5 transition-all shadow-md hover:shadow-lg"
                >
                  <div className="flex items-center justify-center gap-3">
                    <MessageCircle className="w-6 h-6 text-[#0094da]" />
                    <span className="font-black text-[#0094da] text-lg">
                      ارسال پیام
                    </span>
                  </div>
                </button>
              </div>

              <div className="mt-6 pt-6 border-t-2 border-gray-200 space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50">
                  <MapPin className="w-6 h-6 text-[#0094da] mt-1 flex shrink-0" />
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">
                    {adData.contact.address}
                  </p>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-2xl bg-green-50">
                  <Award className="w-6 h-6 text-green-600 flex shrink-0" />
                  <span className="text-sm text-gray-800 font-bold">
                    آگهی تایید شده و معتبر
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-[#a9020a]/30">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#a9020a] flex items-center justify-center">
                  <ShieldAlertIcon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-black text-gray-900">
                  هشدار امنیتی
                </h3>
              </div>
              <ul className="space-y-3">
                {adData.safetyTips.map((tip, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/70"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#a9020a] mt-0.5 flex shrink-0" />
                    <span className="text-sm text-gray-800 font-medium leading-relaxed">
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      {showContactInfo && (
        <div className="lg:hidden fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-black text-gray-900">
                    اطلاعات تماس
                  </h3>
                </div>
                <button
                  onClick={() => toggleContactInfo(false)}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all"
                >
                  <ArrowRight className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-blue-50 hover:bg-blue-100 border transition-all duration-300 border-blue-100">
                  <button
                    onClick={handleContact}
                    className="flex flex-row-reverse items-center justify-center gap-3 py-4 px-3 rounded-xl w-full text-white cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-gray-800">
                        {adData.contact.phone}
                      </span>
                    </div>

                    <Phone className="text-[#0094da] w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={handleMessage}
                  className="w-full p-4 rounded-2xl bg-white border border-[#0094da] hover:bg-[#0094da]/5 transition-all shadow-md hover:shadow-lg"
                >
                  <div className="flex items-center justify-center gap-3">
                    <MessageCircle className="w-6 h-6 text-[#0094da]" />
                    <span className="font-black text-[#0094da] text-lg">
                      ارسال پیام
                    </span>
                  </div>
                </button>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50">
                  <MapPin className="w-6 h-6 text-[#0094da] mt-1 flex shrink-0" />
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">
                    {adData.contact.address}
                  </p>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-2xl bg-green-50">
                  <Award className="w-6 h-6 text-green-600 flex shrink-0" />
                  <span className="text-sm text-gray-800 font-bold">
                    آگهی تایید شده و معتبر
                  </span>
                </div>
              </div>

              <button
                onClick={() => toggleContactInfo(false)}
                className="w-full mt-6 p-4 rounded-2xl bg-gray-100 hover:bg-gray-200 transition-all font-bold text-gray-700"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AdDetailPage;
