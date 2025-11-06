"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowRight,
  ChartLineIcon,
  BadgeDollarSignIcon,
  ArrowLeft,
} from "lucide-react";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loading from "./Loading";

const LoanDetail = () => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [loan, setLoan] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLoanDetail();
  }, [params.bname, params.post]);

  const fetchLoanDetail = async () => {
    try {
      setLoading(true);
      setError("");
      
      if (!params.post) {
        setError("آیدی وام مشخص نشده است");
        return;
      }

      const response = await fetch(`/api/loan/${params.post}`);
      
      if (!response.ok) {
        throw new Error(`خطای HTTP: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setLoan(result.data);
      } else {
        setError(result.error || "خطا در دریافت اطلاعات وام");
        console.error("خطا در دریافت وام:", result.error);
      }
    } catch (error) {
      console.error("خطا در ارتباط با سرور:", error);
      setError("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error || !loan) {
    return (
      <div className="">
        <Header />
        <Navbar />
        <div className="flex flex-col max-w-[1080px] bg-white mx-2 md:mx-auto p-5 rounded-xl mb-25 md:mb-20 md:mt-10 text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            وام یافت نشد
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="text-[#0094da] hover:text-[#007bb5] transition-colors duration-300"
          >
            بازگشت به صفحه قبل
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="pt-2 px-2 lg:pt-10">
      <Header />
      <Navbar />
      <div className="flex flex-col max-w-[1080px] bg-white lg:mx-auto rounded-xl mx-4 p-5 mt-2 mb-25 lg:mb-20 lg:mt-13">
        <button
          onClick={() => router.back()}
          className="group w-fit cursor-pointer mb-8 inline-flex items-center gap-3 px-5 py-3 bg-white rounded-2xl text-gray-700 font-medium hover:text-[#0094da] border-2 border-gray-200 hover:border-[#0094da] transition-all shadow-sm hover:shadow-lg"
        >
          <ArrowRight className="w-5 h-5" />
          <span>بازگشت</span>
        </button>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <button
            onClick={() => router.push("/")}
            className="cursor-pointer hover:text-[#0094da] transition-colors duration-300"
          >
            خانه
          </button>
          <ArrowLeft className="h-4 w-4" />
          <button
            onClick={() => router.push(`/banks/${loan.bankSlug}`)}
            className="cursor-pointer hover:text-[#0094da] transition-colors duration-300"
          >
            بانک {loan.bank}
          </button>
          <ArrowLeft className="h-4 w-4" />
          <span className="text-gray-800 font-medium">{loan.description}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <img
            src={loan.icon}
            alt={loan.bank}
            className="h-24 w-24 rounded-xl bg-gray-100 p-3"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {loan.description}
            </h1>
            <p className="text-gray-600 mb-4">بانک {loan.bank}</p>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <BadgeDollarSignIcon className="h-5 w-5 text-[#0094da]" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">مبلغ وام</p>
                  <p className="text-lg font-bold text-gray-800">
                    {typeof loan.price === 'number' 
                      ? loan.price.toLocaleString() 
                      : String(loan.price)} تومان
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-50 rounded-lg">
                  <ChartLineIcon className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">کارمزد</p>
                  <p className="text-lg font-bold text-red-600">
                    %{loan.percent}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8">
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                مشخصات وام
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">بانک</span>
                  <span className="font-medium">{loan.bank}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">نوع وام</span>
                  <span className="font-medium">{loan.description}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">مبلغ</span>
                  <span className="font-medium">
                    {typeof loan.price === 'number' 
                      ? loan.price.toLocaleString() 
                      : String(loan.price)} تومان
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">کارمزد</span>
                  <span className="font-medium text-red-600">
                    %{loan.percent}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                شرایط دریافت
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#0094da] rounded-full"></div>
                  حداقل سن ۱۸ سال
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#0094da] rounded-full"></div>
                  ارائه مدارک شناسایی معتبر
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#0094da] rounded-full"></div>
                  داشتن حساب در بانک {loan.bank}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#0094da] rounded-full"></div>
                  عدم سوء پیشینه مالی
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoanDetail;