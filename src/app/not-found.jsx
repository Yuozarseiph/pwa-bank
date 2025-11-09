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

        <div className="space-y-4">
          <Link 
            href="/"
            className="w-full bg-[#0094da] hover:bg-[#0083c0] text-white rounded-xl py-4 px-6 font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          >
            <Home className="h-5 w-5" />
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  );
}