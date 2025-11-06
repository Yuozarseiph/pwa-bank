"use client";

import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <Header/>
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#0094da] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">در حال بارگذاری...</p>
      </div>
      <Navbar/>
      <Footer/>
    </div>
  );
};

export default Loading;
