import Header from "@/components/Header";
import LoanFilters from "@/components/LoanFilters";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import {
  HouseIcon,
  HandCoinsIcon,
  CarIcon,
  UsersIcon,
  PlaneIcon,
} from "lucide-react";
import Footer from "@/components/Footer";
import Sidebar from "@/components/SideBar";
const banks = [
  { id: 1, img: "/banks/sepah.png" },
  { id: 2, img: "/banks/melli.png" },
  { id: 3, img: "/banks/mellat.png" },
  { id: 4, img: "/banks/iran-zamin.png" },
  { id: 5, img: "/banks/saderat.png" },
  { id: 6, img: "/banks/blu-bank.png" },
  { id: 7, img: "/banks/bank-refah.png" },
  { id: 8, img: "/banks/Bank-Mehr-Iran.png" },
  { id: 9, img: "/banks/bank-saman.png" },
];
const loan = [
  {
    id: 1,
    lable: "وام مسکن",
    img: (
      <HouseIcon className="h-15 w-15 p-1 bg-[#f1f5f9] rounded-xl text-[#0094da]" />
    ),
  },
  {
    id: 2,
    lable: "وام کسب و کار",
    img: (
      <HandCoinsIcon className="h-15 w-15 p-1 bg-[#f1f5f9] rounded-xl text-[#0094da]" />
    ),
  },
  {
    id: 3,
    lable: "وام خودرو",
    img: (
      <CarIcon className="h-15 w-15 p-1 bg-[#f1f5f9] rounded-xl text-[#0094da]" />
    ),
  },
  {
    id: 4,
    lable: "وام ازدواج",
    img: (
      <img
        src="/icons/married.svg"
        className="h-15 w-15 p-1 bg-[#f1f5f9] rounded-xl text-[#0094da]"
      />
    ),
  },
  {
    id: 5,
    lable: "وام سفر",
    img: (
      <PlaneIcon className="h-15 w-15 p-1 bg-[#f1f5f9] rounded-xl text-[#0094da]" />
    ),
  },
];

export const LoanStatus = {
  DRAFT: { id: "DRAFT", label: "پیش‌نویس", short: "پیش‌نویس", color: "zinc" },
  SUBMITTED: {
    id: "SUBMITTED",
    label: "ارسال‌شده",
    short: "ارسال",
    color: "indigo",
  },
  KYC_PENDING: {
    id: "KYC_PENDING",
    label: "در انتظار احراز هویت",
    short: "احراز",
    color: "amber",
  },
  UNDER_REVIEW: {
    id: "UNDER_REVIEW",
    label: "در حال بررسی",
    short: "بررسی",
    color: "blue",
  },
  NEEDS_MORE_INFO: {
    id: "NEEDS_MORE_INFO",
    label: "نیاز به مدارک",
    short: "مدارک",
    color: "orange",
  },
  APPROVED: {
    id: "APPROVED",
    label: "تایید شده",
    short: "تایید",
    color: "emerald",
  },
  CONTRACT_SIGN: {
    id: "CONTRACT_SIGN",
    label: "در انتظار امضا",
    short: "امضا",
    color: "cyan",
  },
  DISBURSED: {
    id: "DISBURSED",
    label: "پرداخت‌شده",
    short: "پرداخت",
    color: "teal",
  },
  ACTIVE: { id: "ACTIVE", label: "جاری", short: "جاری", color: "green" },
  DELINQUENT: { id: "DELINQUENT", label: "معوق", short: "معوق", color: "rose" },
  DEFAULTED: {
    id: "DEFAULTED",
    label: "سررسید گذشته/معوق سنگین",
    short: "سررسید",
    color: "red",
  },
  CLOSED: { id: "CLOSED", label: "تسویه‌شده", short: "تسویه", color: "slate" },
  REJECTED: { id: "REJECTED", label: "رد شده", short: "رد", color: "red" },
  CANCELED: { id: "CANCELED", label: "لغوشده", short: "لغو", color: "zinc" },
};

export const loans = [
  {
    id: "LN-1403-0001",
    applicant: "یوسف",
    avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(
      "یوسف"
    )}`,
    nationalId: "0012345678",
    requestedAmount: 20000000,
    approvedAmount: 18000000,
    termMonths: 18,
    rateAPR: 0.24,
    createdAt: "1403-01-05",
    updatedAt: "1403-01-06",
    status: LoanStatus.UNDER_REVIEW.label,
    statusObj: LoanStatus.UNDER_REVIEW,
    scoreBand: "A2",
    nextAction: "بررسی اعتبار بانکی",
    channel: "وب",
    paymentMethod: "درگاه",
    tags: ["اولین درخواست", "ریسک پایین"],
  },
  {
    id: "LN-1403-0002",
    applicant: "مهدی",
    avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(
      "مهدی"
    )}`,
    nationalId: "0076543210",
    requestedAmount: 50000000,
    approvedAmount: 0,
    termMonths: 24,
    rateAPR: 0.27,
    createdAt: "1403-01-10",
    updatedAt: "1403-01-10",
    status: LoanStatus.NEEDS_MORE_INFO.label,
    statusObj: LoanStatus.NEEDS_MORE_INFO,
    missingDocs: ["گواهی کسر از حقوق", "تصویر شناسنامه"],
    nextAction: "بارگذاری مدارک",
    channel: "موبایل",
    paymentMethod: "—",
    tags: ["مدارک ناقص"],
  },
  {
    id: "LN-1403-0003",
    applicant: "زهرا",
    avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(
      "زهرا"
    )}`,
    nationalId: "0045678912",
    requestedAmount: 15000000,
    approvedAmount: 15000000,
    termMonths: 12,
    rateAPR: 0.23,
    createdAt: "1403-02-01",
    updatedAt: "1403-02-01",
    status: LoanStatus.CONTRACT_SIGN.label,
    statusObj: LoanStatus.CONTRACT_SIGN,
    contractId: "CTR-1403-112",
    nextAction: "امضای الکترونیکی",
    channel: "وب",
    paymentMethod: "درگاه",
    tags: ["مصوب"],
  },
  {
    id: "LN-1403-0004",
    applicant: "نگین",
    avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(
      "نگین"
    )}`,
    nationalId: "0098765432",
    requestedAmount: 30000000,
    approvedAmount: 28000000,
    termMonths: 24,
    rateAPR: 0.25,
    createdAt: "1403-02-10",
    updatedAt: "1403-02-12",
    status: LoanStatus.DISBURSED.label,
    statusObj: LoanStatus.DISBURSED,
    disbursedAt: "1403-02-12",
    firstInstallmentDue: "1403-03-12",
    nextAction: "پرداخت قسط اول",
    channel: "وب",
    paymentMethod: "درگاه",
    tags: ["پرداخت شده"],
  },
  {
    id: "LN-1403-0005",
    applicant: "پارسا",
    avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(
      "پارسا"
    )}`,
    nationalId: "0011122233",
    requestedAmount: 10000000,
    approvedAmount: 10000000,
    termMonths: 9,
    rateAPR: 0.22,
    createdAt: "1403-03-01",
    updatedAt: "1403-03-20",
    status: LoanStatus.DELINQUENT.label,
    statusObj: LoanStatus.DELINQUENT,
    daysPastDue: 18,
    dueAmount: 1450000,
    nextAction: "ارسال یادآوری و جریمه تاخیر",
    channel: "موبایل",
    paymentMethod: "کیف پول",
    tags: ["تاخیر"],
  },
  {
    id: "LN-1403-0006",
    applicant: "سامان",
    avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(
      "سامان"
    )}`,
    nationalId: "0088899977",
    requestedAmount: 8000000,
    approvedAmount: 8000000,
    termMonths: 6,
    rateAPR: 0.2,
    createdAt: "1403-03-05",
    updatedAt: "1403-09-10",
    status: LoanStatus.CLOSED.label,
    statusObj: LoanStatus.CLOSED,
    closedAt: "1403-09-10",
    nextAction: "—",
    channel: "وب",
    paymentMethod: "درگاه",
    tags: ["تسویه"],
  },
  {
    id: "LN-1403-0007",
    applicant: "لیلا",
    avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(
      "لیلا"
    )}`,
    nationalId: "0012233445",
    requestedAmount: 40000000,
    approvedAmount: 0,
    termMonths: 36,
    rateAPR: 0.26,
    createdAt: "1403-03-08",
    updatedAt: "1403-03-10",
    status: LoanStatus.REJECTED.label,
    statusObj: LoanStatus.REJECTED,
    rejectReason: "امتیاز اعتباری ناکافی",
    nextAction: "امکان درخواست مجدد پس از ۳ ماه",
    channel: "وب",
    paymentMethod: "—",
    tags: ["رد شده"],
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col relative bg-[#f1f5f9] overflow-x-hidden">
      <Navbar key={1} />
      <Header />
      <div className="flex justify-center items-start flex-row-reverse lg:gap-6 lg:p-5">
        <div className="w-full md:w-[80%] max-w-[1080px] bg-white rounded-xl p-5 overflow-auto max-h-[calc(100dvh-240px)] lg:max-h-[calc(100dvh-150px)]">
          <p className="text-2xl font-bold border-b border-gray-300">خدمات</p>
          <h2 className="mt-5 text-xl font-bold flex items-center gap-2">
            <span className="h-2 w-2 bg-[#0094da] rounded-full inline-block"></span>
            بانک های تحت پوشش
          </h2>
          <ul className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-x-2 gap-y-6 mt-8">
            {banks.map((item) => (
              <li
                key={item.id}
                className=" hover:scale-105 transition-all duration-300"
              >
                <Link
                  href="/"
                  className="flex flex-col justify-center items-center gap-3 cursor-pointer"
                >
                  <img
                    src={item.img}
                    alt={item.lable}
                    className="h-15 w-15 p-1 bg-[#f1f5f9] rounded-xl"
                  />
                </Link>
              </li>
            ))}
          </ul>
          <hr className="mt-6 text-gray-300" />
          <h2 className="mt-5 text-xl font-bold">
            <span className="h-2 w-2 bg-[#0094da] rounded-full inline-block"></span>{" "}
            وام با کارمزد
          </h2>
          <ul className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2 mt-8">
            {loan.map((item) => (
              <li
                key={item.id}
                className=" hover:scale-105 transition-all duration-300"
              >
                <Link
                  href="/"
                  className="flex flex-col justify-center items-center gap-3 cursor-pointer"
                >
                  {item.img}
                  <h3>{item.lable}</h3>
                </Link>
              </li>
            ))}
          </ul>
          <hr className="mt-6 text-gray-300" />
          <h2 className="mt-5 text-xl font-bold">آگهی های فروش</h2>
          <LoanFilters />
        </div>
        <Sidebar />
      </div>
      <Footer />
    </div>
  );
}
