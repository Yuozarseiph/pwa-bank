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
    <div className="flex min-h-dvh flex-col relative bg-[#f1f5f9] overflow-x-hidden lg:pt-20 mt-20 lg:mt-0">
      <Navbar />
      <Header />
      <div className="flex justify-center items-start flex-row-reverse  p-2 lg:gap-6 lg:p-5">
        <div className="w-full md:w-[80%] max-w-[1080px] bg-white rounded-xl p-2 mb-22">
          <div className="h-fit  overscroll-contain touch-pan-y p-2">
            <BankList />
            <hr className="my-6 text-gray-300" />
            <ul className="grid-list">
              {loan.map((item) => (
                <li
                  key={item.id}
                  className="hover:scale-105 transition-all duration-400"
                >
                  <Link href="/" className="grid-card">
                    <div className="grid-icon">{item.img}</div>
                    <h3 className="grid-title">{item.lable}</h3>
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
