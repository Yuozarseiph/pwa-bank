"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export default function FloatingSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("ارسال پیام:", message);
      setMessage("");
    }
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-40 bg-[#0094da] hover:bg-[#0083c0] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      <div
        className={`
        fixed bottom-20 right-6 z-40 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200
        transition-all duration-300 transform
        ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }
      `}
      >
        <div className="bg-[#0094da] text-white rounded-t-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div>
              <h3 className="font-bold text-sm">پشتیبانی آنلاین</h3>
              <p className="text-xs text-white/80">پاسخگویی 24 ساعته</p>
            </div>
          </div>
          <button
            onClick={toggleChat}
            className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="h-80 flex flex-col">
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%]">
                <p className="text-sm text-gray-800">سلام! 👋</p>
                <p className="text-sm text-gray-600">
                  چطور می‌تونم کمکتون کنم؟
                </p>
                <span className="text-xs text-gray-400 block text-left mt-1">
                  هم اکنون
                </span>
              </div>
            </div>

            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%]">
                <p className="text-sm text-gray-600">
                  لطفاً سوال یا مشکل خودتون رو اینجا بنویسید.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-gray-200"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="پیام خود را بنویسید..."
                className="flex-1 bg-gray-100 rounded-2xl px-4 py-3 text-sm outline-none focus:bg-gray-200 transition-colors"
                dir="rtl"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="bg-[#0094da] text-white rounded-2xl p-3 hover:bg-[#0083c0] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/20" onClick={toggleChat} />
      )}
    </>
  );
}
