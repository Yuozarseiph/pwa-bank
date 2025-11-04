"use client";
import { useState } from "react";
import {
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Share2,
  Heart,
  Shield,
  CheckCircle2,
  Star,
  Wallet,
  Eye,
  FileText,
  Timer,
  Percent,
  AlertCircle,
  Users,
  BadgeCheck,
  PiggyBank,
  HandCoins,
  Building2,
  Info,
  TrendingUp,
  Award,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";

const allAdsData = {
  "1": {
    id: 1,
    title: "وام قرض الحسنه ۴۰۰ میلیون تومانی",
    bank: {
      name: "بانک سپه",
      logo: "/banks/sepah.png",
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
      { icon: PiggyBank, label: "نوع وام", value: "قرض الحسنه" },
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
      likes: 89,
      time: "۱ ساعت پیش",
    },
    features: [
      { icon: Shield, text: "بدون ضامن" },
      { icon: Clock, text: "پرداخت سریع" },
      { icon: FileText, text: "مدارک ساده" },
      { icon: HandCoins, text: "پشتیبانی ۲۴/۷" },
    ],
    safetyTips: [
      "هرگز پیش‌پرداخت نکنید",
      "مدارک را فقط در شعبه تحویل دهید",
      "از طریق سایت رسمی اقدام کنید",
      "قرارداد را به دقت بخوانید",
    ],
  },
  "2": {
    id: 2,
    title: "وام مسکن ۵۰۰ میلیونی",
    bank: {
      name: "بانک ملی",
      logo: "/banks/melli.png",
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
      { icon: PiggyBank, label: "نوع وام", value: "وام مسکن" },
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
      likes: 156,
      time: "۲ ساعت پیش",
    },
    features: [
      { icon: Building2, text: "برای مسکن" },
      { icon: Clock, text: "تا ۱۰ سال" },
      { icon: Users, text: "ویژه جوانان" },
      { icon: HandCoins, text: "سود پایین" },
    ],
    safetyTips: [
      "سند ملک را بررسی کنید",
      "از قیمت‌گذاری رسمی استفاده کنید",
      "مشاور حقوقی بگیرید",
      "قرارداد را با دقت بخوانید",
    ],
  },
  "3": {
    id: 3,
    title: "وام خودرو ۳۰۰ میلیونی",
    bank: {
      name: "بانک ملت",
      logo: "/banks/mellat.png",
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
      { icon: PiggyBank, label: "نوع وام", value: "وام خودرو" },
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
      likes: 67,
      time: "۳ ساعت پیش",
    },
    features: [
      { icon: Shield, text: "بدون ضامن" },
      { icon: Clock, text: "تحویل سریع" },
      { icon: FileText, text: "مدارک کم" },
      { icon: HandCoins, text: "اقساط راحت" },
    ],
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
  const [isFavorite, setIsFavorite] = useState(false);

  const adData = allAdsData[String(adId)];

  const handleContact = () => {
    if (adData?.contact?.phone) {
      window.location.href = `tel:${adData.contact.phone}`;
    }
  };

  const handleMessage = () => {
    if (adData?.contact?.email) {
      window.location.href = `mailto:${adData.contact.email}`;
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: adData.title,
          text: adData.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("اشتراک گذاری لغو شد");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("لینک کپی شد!");
    }
  };

  if (!adData) {
    return (
      <div className="min-h-screen bg-[#f1f5f9]">
        <Header />
        <Navbar />
        <main className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-3xl shadow-xl p-12 border-4 border-red-100">
              <div className="w-24 h-24 bg-linear-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
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
                className="px-8 py-4 bg-linear-to-r from-[#0094da] to-[#0070a8] text-white rounded-2xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all"
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
    <div className="min-h-screen mb-20">
      <Header />
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        <button
          onClick={() => router.back()}
          className="group mb-8 inline-flex items-center gap-3 px-5 py-3 bg-white rounded-2xl text-gray-700 font-medium hover:text-[#0094da] border-2 border-gray-200 hover:border-[#0094da] transition-all shadow-sm hover:shadow-lg"
        >
          <ArrowRight className="w-5 h-5" />
          <span>بازگشت</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="relative bg-linear-to-r from-[#0094da] to-[#0070a8] rounded-3xl p-8 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
              
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
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(adData.bank.rating)
                                ? "fill-yellow-300 text-yellow-300"
                                : "text-white/30"
                            }`}
                          />
                        ))}
                        <span className="text-white/90 text-sm font-medium mr-2">
                          {adData.bank.rating} ({adData.bank.totalReviews.toLocaleString()})
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-3 rounded-xl bg-white/20 hover:bg-white/30 transition-all"
                  >
                    <Heart
                      className={`w-7 h-7 transition-all ${
                        isFavorite
                          ? "fill-red-500 text-red-500"
                          : "text-white"
                      }`}
                    />
                  </button>
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
                    <span className="font-medium">{adData.stats.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <Heart className="w-5 h-5" />
                    <span className="font-medium">{adData.stats.likes}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">{adData.stats.time}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {adData.features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all border-2 border-transparent hover:border-[#0094da] cursor-pointer"
                >
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-linear-to-br from-[#0094da] to-[#0070a8] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-sm font-bold text-gray-800">
                      {feature.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#0094da] to-[#0070a8] flex items-center justify-center">
                  <Info className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-black text-gray-900">توضیحات کامل</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                {adData.fullDescription}
              </p>
            </div>

            <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-3xl shadow-xl p-8 border-2 border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-black text-gray-900">جزئیات وام</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {adData.details.map((detail, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-5 rounded-2xl bg-white shadow-md border-2 border-transparent hover:border-blue-400 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-400 to-cyan-400 flex items-center justify-center flex-shrink-0">
                      <detail.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium mb-1">
                        {detail.label}
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {detail.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className=" lg:top-8 space-y-6">
              <div className="bg-linear-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-6 border-2 border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#0094da] to-[#0070a8] flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900">ارتباط با ما</h3>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleContact}
                    className="w-full group relative overflow-hidden p-5 rounded-2xl bg-linear-to-r from-[#0094da] to-[#0070a8] shadow-lg hover:shadow-2xl transition-all"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                    <div className="relative flex items-center justify-center gap-3">
                      <Phone className="w-6 h-6 text-white" />
                      <span className="font-black text-white text-lg">تماس فوری</span>
                    </div>
                  </button>

                  <button
                    onClick={handleMessage}
                    className="w-full p-5 rounded-2xl bg-white border-3 border-[#0094da] hover:bg-[#0094da]/5 transition-all shadow-md hover:shadow-lg"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <MessageCircle className="w-6 h-6 text-[#0094da]" />
                      <span className="font-black text-[#0094da] text-lg">ارسال پیام</span>
                    </div>
                  </button>

                  <button
                    onClick={handleShare}
                    className="w-full p-5 rounded-2xl bg-gray-100 hover:bg-gray-200 transition-all shadow-md"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <Share2 className="w-6 h-6 text-gray-700" />
                      <span className="font-black text-gray-700 text-lg">اشتراک‌گذاری</span>
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

              <div className="bg-linear-to-br from-amber-50 to-orange-50 rounded-3xl shadow-xl p-6 border-2 border-amber-200">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900">هشدار امنیتی</h3>
                </div>
                <ul className="space-y-3">
                  {adData.safetyTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 rounded-xl bg-white/70">
                      <CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5 flex shrink-0" />
                      <span className="text-sm text-gray-800 font-medium leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdDetailPage;
