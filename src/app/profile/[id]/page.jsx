"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/SideBar";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  User,
  Phone,
  Calendar,
  LogOut,
  ShoppingBag,
  Clock,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const params = useParams();
  const router = useRouter();
  const { user: authUser, logout, loading: authLoading } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Check if user is authorized to view this profile
  useEffect(() => {
    if (!authLoading && authUser) {
      const requestedId = parseInt(params.id);
      const authenticatedUserId = parseInt(authUser.id);

      // If user is trying to view someone else's profile, redirect to their own profile
      if (requestedId !== authenticatedUserId) {
        router.replace(`/profile/${authenticatedUserId}`);
        return;
      }
    }
  }, [authUser, params.id, authLoading, router]);

  async function fetchUser() {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/${params.id}`);
      const result = await response.json();

      if (result.success) {
        setUser(result.data);
      } else {
        setError("کاربر یافت نشد");
      }
    } catch (err) {
      setError("خطا در دریافت اطلاعات کاربر");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (params.id && !authLoading && authUser) {
      const requestedId = parseInt(params.id);
      const authenticatedUserId = parseInt(authUser.id);

      // Only fetch if user is viewing their own profile
      if (requestedId === authenticatedUserId) {
        fetchUser();
      }
    }
  }, [params.id, authLoading, authUser]);

  if (authLoading || loading) {
    return (
      <div className="flex min-h-dvh flex-col relative bg-[#f1f5f9] overflow-x-hidden lg:pt-20">
        <Navbar />
        <Header />
        <div className="flex justify-center items-center flex-1">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0094da]"></div>
        </div>
        <Footer />
      </div>
    );
  }

  // If user is not logged in or trying to access wrong profile
  if (!authUser || error || !user) {
    return (
      <div className="flex min-h-dvh flex-col relative bg-[#f1f5f9] overflow-x-hidden lg:pt-20">
        <Navbar />
        <Header />
        <div className="flex justify-center items-center flex-1">
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <p className="text-red-500 text-lg font-medium mb-4">
              {error || "دسترسی غیرمجاز"}
            </p>
            <button
              onClick={() => router.push("/auth")}
              className="px-6 py-2 bg-[#0094da] text-white rounded-lg hover:bg-[#0083c0] transition-colors"
            >
              ورود به حساب کاربری
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Calculate days since registration
  const daysSinceRegistration = Math.floor(
    (Date.now() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="flex min-h-dvh flex-col relative bg-[#f1f5f9] overflow-x-hidden lg:pt-20 mt-20 lg:mt-0">
      <Navbar />
      <Header />

      <div className="flex justify-center items-start flex-row-reverse p-2 lg:gap-6 lg:p-5">
        <div className="w-full md:w-[80%] max-w-[1080px] bg-white rounded-xl shadow-lg mb-22">
          {/* Profile Header */}
          <div className="relative h-40 bg-gradient-to-r from-[#0094da] to-[#00c6ff] rounded-t-xl">
            <div className="absolute -bottom-16 right-8">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden shadow-xl flex items-center justify-center">
                <User className="text-white" size={64} />
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {user.name}
                </h1>
                <p className="text-sm text-gray-500 mt-1">کاربر سایت</p>
              </div>

              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut size={18} />
                خروج
              </button>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Phone */}
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-[#0094da] rounded-full flex items-center justify-center">
                  <Phone className="text-white" size={24} />
                </div>
                <div className="text-right flex-1">
                  <p className="text-sm text-gray-500 mb-1">شماره تماس</p>
                  <p className="text-lg font-semibold text-gray-800" dir="ltr">
                    {user.phone}
                  </p>
                </div>
              </div>

              {/* Join Date */}
              <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <Calendar className="text-white" size={24} />
                </div>
                <div className="text-right flex-1">
                  <p className="text-sm text-gray-500 mb-1">تاریخ عضویت</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {new Date(user.createdAt).toLocaleDateString("fa-IR")}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-4 mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              {/* User ID */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-[#0094da] rounded-full flex items-center justify-center mb-2">
                  <User className="text-white" size={32} />
                </div>
                <p className="text-2xl font-bold text-[#0094da]">{user.id}</p>
                <p className="text-sm text-gray-600 mt-1">شناسه کاربری</p>
              </div>

              {/* Ads Count */}
              <div className="text-center border-r border-gray-300">
                <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-2">
                  <ShoppingBag className="text-white" size={32} />
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {user.adsCount || 0}
                </p>
                <p className="text-sm text-gray-600 mt-1">تعداد آگهی‌ها</p>
              </div>
            </div>
          </div>
        </div>

        <Sidebar />
      </div>

      <Footer />
    </div>
  );
}
