'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, ArrowLeft, Search, RefreshCw } from 'lucide-react';

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0094da] via-blue-400 to-blue-300 flex items-center justify-center p-4">
      <div className={`
        bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full mx-auto
        transform transition-all duration-700 ease-out
        ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}
      `}>
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-linear-to-br from-[#0094da] to-[#0083c0] rounded-2xl flex items-center justify-center text-white text-4xl font-bold rotate-45">
              <span className="-rotate-45">۴۰۴</span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#a9020a] rounded-full flex items-center justify-center text-white text-sm font-bold animate-pulse">
              !
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            صفحه مورد نظر پیدا نشد!
          </h1>
          <p className="text-gray-600 leading-7">
            متأسفانه صفحه‌ای که به دنبال آن هستید 
            <span className="text-[#0094da] font-bold mx-1">وجود ندارد</span>
            یا ممکن است به آدرس دیگری منتقل شده باشد.
          </p>
        </div>

        <div className="flex justify-center gap-6 mb-8 opacity-60">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center animate-bounce" style={{ animationDelay: '0.1s' }}>
            <Search className="h-6 w-6 text-[#0094da]" />
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center animate-bounce" style={{ animationDelay: '0.3s' }}>
            <Home className="h-6 w-6 text-[#0094da]" />
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s' }}>
            <RefreshCw className="h-6 w-6 text-[#0094da]" />
          </div>
        </div>

        <div className="space-y-4">
          <Link 
            href="/"
            className="w-full bg-[#0094da] hover:bg-[#0083c0] text-white rounded-xl py-4 px-6 font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          >
            <Home className="h-5 w-5" />
            بازگشت به صفحه اصلی
          </Link>

          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="w-full border-2 border-[#0094da] text-[#0094da] hover:bg-[#0094da] hover:text-white rounded-xl py-4 px-6 font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'در حال بارگذاری...' : 'بارگذاری مجدد'}
          </button>

          <button
            onClick={() => window.history.back()}
            className="w-full text-gray-600 hover:text-gray-800 rounded-xl py-3 px-6 font-medium transition-all duration-300 flex items-center justify-center gap-3 hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
            بازگشت به صفحه قبلی
          </button>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-800 text-center leading-6">
            اگر فکر می‌کنید این یک خطاست، 
            <Link href="/support" className="font-bold mx-1 hover:underline">
              با پشتیبانی تماس بگیرید
            </Link>
          </p>
        </div>
      </div>

      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-white/20 rounded-full animate-[float_8s_ease-in-out_infinite]"></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-white/30 rounded-full animate-[float_10s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-white/10 rounded-full animate-[float_12s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-white/40 rounded-full animate-[float_9s_ease-in-out_infinite]"></div>
        <div className="absolute top-2/3 left-1/5 w-7 h-7 bg-white/25 rounded-full animate-[float_11s_ease-in-out_infinite]"></div>
        <div className="absolute top-1/2 right-1/5 w-5 h-5 bg-white/35 rounded-full animate-[float_7s_ease-in-out_infinite]"></div>
        
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute top-10 right-10 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-10 w-28 h-28 bg-white/5 rounded-full blur-xl"></div>
      </div>
    </div>
  );
}