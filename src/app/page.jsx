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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex min-h-dvh flex-col relative bg-[#f1f5f9] overflow-x-hidden">
      <Navbar />
      <Header />
      <div className="flex justify-center items-start flex-row-reverse p-2 lg:gap-6 lg:p-5">
        <div className="w-full md:w-[80%] max-w-[1080px] bg-white rounded-xl p-5">
          <div className=" overflow-y-auto max-h-[calc(100dvh-290px)] lg:max-h-[calc(100dvh-230px)] overscroll-contain touch-pan-y p-2">
            <BankList />
            <hr className="mt-6 text-gray-300" />
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
            <AdsSection />
          </div>
        </div>
        <Sidebar />
      </div>
      <Footer />
    </div>
  );
}
