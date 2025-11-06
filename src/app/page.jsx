"use client";
import Header from "@/components/Header";
import AdsSection from "@/components/AdsSection";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { HouseIcon, HandCoinsIcon, CarIcon, PlaneIcon } from "lucide-react";
import Footer from "@/components/Footer";
import Sidebar from "@/components/SideBar";
import BankList from "@/components/BankList";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

const loan = [
  {
    id: 1,
    lable: "وام مسکن",
    img: (
      <HouseIcon className="h-full w-full p-3 bg-[#f1f5f9] rounded-xl text-[#0094da]" />
    ),
  },
  {
    id: 2,
    lable: "وام کسب و کار",
    img: (
      <HandCoinsIcon className="h-full w-full p-3 bg-[#f1f5f9] rounded-xl text-[#0094da]" />
    ),
  },
  {
    id: 3,
    lable: "وام خودرو",
    img: (
      <CarIcon className="h-full w-full p-3 bg-[#f1f5f9] rounded-xl text-[#0094da]" />
    ),
  },
  {
    id: 4,
    lable: "وام ازدواج",
    img: (
      <img
        src="/icons/married.svg"
        className="h-full w-full p-3 bg-[#f1f5f9] rounded-xl text-[#0094da]"
      />
    ),
  },
  {
    id: 5,
    lable: "وام سفر",
    img: (
      <PlaneIcon className="h-full w-full p-3 bg-[#f1f5f9] rounded-xl text-[#0094da]" />
    ),
  },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex min-h-dvh flex-col relative bg-[#f1f5f9] overflow-x-hidden lg:pt-20">
      <Navbar />
      <Header />
      <div className="flex justify-center items-start flex-row-reverse  p-2 lg:gap-6 lg:p-5">
        <div className="w-full md:w-[80%] max-w-[1080px] bg-white rounded-xl p-5 mb-22">
          <div className="  h-fit  overscroll-contain touch-pan-y p-2">
            <BankList />
            <hr className="mt-6 text-gray-300" />
            <ul className="grid grid-cols-4 gap-3 sm:grid-cols-5 sm:gap-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-9 mt-8">
              {loan.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-center items-center hover:scale-105 transition-all duration-300"
                >
                  <Link
                    href="/"
                    className="flex flex-col justify-center items-center gap-1 cursor-pointer w-20"
                  >
                    <div className="h-16 w-16 sm:h-18 sm:w-18 md:h-20 md:w-20">
                      {item.img}
                    </div>
                    <h3 className="max-w-[100px] truncate text-sm sm:text-[16px] lg:text-lg">
                      {item.lable.length > 10
                        ? `${item.lable.substring(0, 10)}...`
                        : item.lable}
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
            <hr className="mt-6 text-gray-300" />
            <AdsSection />
          </div>
        </div>
          <Sidebar />
      </div>
      <Footer />
    </div>
  );
}
