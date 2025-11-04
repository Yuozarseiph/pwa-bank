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

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col relative bg-[#f1f5f9] overflow-x-hidden">
      <Navbar/>
      <Header />
      <div className="flex justify-center items-start flex-row-reverse p-2 lg:gap-6 lg:p-5">
        <div className="w-full md:w-[80%] max-w-[1080px] bg-white rounded-xl p-5 overflow-y-auto max-h-[calc(100dvh-240px)] lg:max-h-[calc(100dvh-150px)] overscroll-contain touch-pan-y">
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
            <span className="h-2 w-2 bg-[#0094da] rounded-full inline-block"></span>
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