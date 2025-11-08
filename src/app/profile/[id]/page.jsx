"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/SideBar";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { User, Phone, Mail, MapPin, Calendar, Edit2, LogOut } from "lucide-react";
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
              onClick={() => router.push('/auth')}
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

  return (
    <div className="flex min-h-dvh flex-col relative bg-[#f1f5f9] overflow-x-hidden lg:pt-20">
      <Navbar />
      <Header />
      
      <div className="flex justify-center items-start flex-row-reverse p-2 lg:gap-6 lg:p-5">
        <div className="w-full md:w-[80%] max-w-[1080px] bg-white rounded-xl shadow-lg mb-22">
          {/* Profile Header */}
          <div className="relative h-40 bg-gradient-to-r from-[#0094da] to-[#00c6ff] rounded-t-xl">
            <div className="absolute -bottom-16 right-8">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-xl">
                <img
                  src={user.profile?.avatar || "/avatars/default.jpg"}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                <p className="text-sm text-gray-500 mt-1">
                  {user.role === "admin" ? "مدیر سیستم" : user.role === "agent" ? "نماینده" : "کاربر"}
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => console.log("Edit profile")}
                  className="flex items-center gap-2 px-4 py-2 bg-[#0094da] text-white rounded-lg hover:bg-[#0083c0] transition-colors"
                >
                  <Edit2 size={18} />
                  ویرایش پروفایل
                </button>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <LogOut size={18} />
                  خروج
                </button>
              </div>
            </div>

            {/* Bio */}
            {user.profile?.bio && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 text-right leading-relaxed">{user.profile.bio}</p>
              </div>
            )}

            {/* Contact Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Phone */}
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-[#0094da] rounded-full flex items-center justify-center">
                  <Phone className="text-white" size={24} />
                </div>
                <div className="text-right flex-1">
                  <p className="text-sm text-gray-500 mb-1">شماره تماس</p>
                  <p className="text-lg font-semibold text-gray-800" dir="ltr">{user.phone}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <Mail className="text-white" size={24} />
                </div>
                <div className="text-right flex-1">
                  <p className="text-sm text-gray-500 mb-1">ایمیل</p>
                  <p className="text-lg font-semibold text-gray-800 break-all">{user.email}</p>
                </div>
              </div>

              {/* Location */}
              {user.profile?.location && (
                <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div className="text-right flex-1">
                    <p className="text-sm text-gray-500 mb-1">موقعیت مکانی</p>
                    <p className="text-lg font-semibold text-gray-800">{user.profile.location}</p>
                  </div>
                </div>
              )}

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
            <div className="grid grid-cols-3 gap-4 mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#0094da]">{user.id}</p>
                <p className="text-sm text-gray-600 mt-1">شناسه کاربری</p>
              </div>
              <div className="text-center border-x border-gray-300">
                <p className="text-3xl font-bold text-green-600">
                  {Math.floor((Date.now() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24))}
                </p>
                <p className="text-sm text-gray-600 mt-1">روز عضویت</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">
                  {user.role === "admin" ? "⭐" : user.role === "agent" ? "🏆" : "👤"}
                </p>
                <p className="text-sm text-gray-600 mt-1">نقش کاربری</p>
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
