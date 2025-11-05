"use client";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        {/* اسپینر */}
        <div className="w-16 h-16 border-4 border-[#0094da] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

        {/* متن */}
        <p className="text-gray-600">در حال بارگذاری...</p>
      </div>
    </div>
  );
};

export default Loading;
