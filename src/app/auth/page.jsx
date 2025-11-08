"use client";
import { useState, useRef, useEffect } from "react";
import { RectangleEllipsis } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Auth() {
  const { login, loading: authLoading } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
  ]);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isPasswordLogin, setIsPasswordLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const inputRefs = useRef([]);

  // Handle phone number submission
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const cleanPhone = phoneNumber.replace(/\s/g, "");

    if (cleanPhone.length < 10) {
      setError("شماره تلفن باید حداقل ۱۰ رقم باشد");
      setLoading(false);
      return;
    }

    if (cleanPhone.length > 11) {
      setError("شماره تلفن نباید بیشتر از ۱۱ رقم باشد");
      setLoading(false);
      return;
    }

    if (!/^09\d{9}$/.test(cleanPhone)) {
      setError("شماره تلفن باید با 09 شروع شود");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/users?search=${cleanPhone}`);
      const result = await response.json();

      if (result.success && result.data.length > 0) {
        console.log("کاربر یافت شد:", result.data[0]);
        setUserId(result.data[0].id);
        setIsCodeSent(true);
      } else {
        // Register new user
        const registerResponse = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "کاربر جدید",
            phone: cleanPhone,
            email: `${cleanPhone}@example.com`,
            password: "123456",
          }),
        });

        const registerResult = await registerResponse.json();
        if (registerResult.success) {
          console.log("کاربر جدید ثبت شد:", registerResult.data);
          setUserId(registerResult.data.id);
          setIsCodeSent(true);
        } else {
          setError(registerResult.error);
        }
      }
    } catch (error) {
      console.error("خطا در ارسال شماره:", error);
      setError("خطا در برقراری ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  // Handle verification code submission
  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const code = verificationCode.join("");
    if (code.length !== 5) {
      setError("کد تایید باید ۵ رقم باشد");
      setLoading(false);
      return;
    }

    if (!/^\d{5}$/.test(code)) {
      setError("کد تایید باید فقط شامل اعداد باشد");
      setLoading(false);
      return;
    }

    try {
      // Fetch user data
      const response = await fetch(`/api/users/${userId}`);
      const result = await response.json();

      if (result.success) {
        setIsVerified(true);
        // Login user
        setTimeout(() => {
          login(result.data);
        }, 1000);
      } else {
        setError("خطا در دریافت اطلاعات کاربر");
      }
    } catch (error) {
      setError("خطا در تایید کد");
    } finally {
      setLoading(false);
    }
  };

  // Handle password login
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password.length < 6) {
      setError("رمز عبور باید حداقل ۶ کاراکتر باشد");
      setLoading(false);
      return;
    }

    try {
      const cleanPhone = phoneNumber.replace(/\s/g, "");
      const response = await fetch(`/api/users?search=${cleanPhone}`);
      const result = await response.json();

      if (result.success && result.data.length > 0) {
        const user = result.data[0];

        // Check password
        if (user.password === password) {
          console.log("ورود موفقیت‌آمیز با رمز عبور:", user);
          setIsVerified(true);

          // Login user
          setTimeout(() => {
            login(user);
          }, 1000);
        } else {
          setError("رمز عبور اشتباه است");
        }
      } else {
        setError("کاربر یافت نشد");
      }
    } catch (error) {
      setError("خطا در ورود با رمز عبور");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = () => {
    console.log("ارسال مجدد کد به شماره:", phoneNumber);
    setVerificationCode(["", "", "", "", ""]);
    setError("");
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, "").slice(0, 11);
    setPhoneNumber(numericValue);
    setError("");
  };

  const handleCodeChange = (index, value) => {
    const numericValue = value.replace(/\D/g, "").slice(0, 1);
    const newCode = [...verificationCode];
    newCode[index] = numericValue;
    setVerificationCode(newCode);

    if (numericValue && index < 4) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleCodeKeyDown = (index, e) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleBackToPhone = () => {
    setIsCodeSent(false);
    setIsPasswordLogin(false);
    setVerificationCode(["", "", "", "", ""]);
    setPassword("");
    setError("");
  };

  const toggleLoginMethod = () => {
    if (phoneNumber.length < 10 && !isPasswordLogin) {
      setError("ابتدا شماره تلفن خود را وارد کنید");
      return;
    }
    setIsPasswordLogin(!isPasswordLogin);
    setVerificationCode(["", "", "", "", ""]);
    setPassword("");
    setError("");
  };

  useEffect(() => {
    if (isCodeSent) {
      inputRefs.current[0] && inputRefs.current[0].focus();
    }
  }, [isCodeSent]);

  if (authLoading) {
    return (
      <main className="bg-[#0094da] w-full h-screen grid place-content-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </main>
    );
  }

  return (
    <main className="bg-[#0094da] w-full h-screen grid place-content-center">
      <div className="bg-white relative mx-1 min-w-[333px] md:w-[450px] h-fit rounded-xl p-5 md:p-10">
        <div className="absolute -top-[25%] left-1/2 -translate-x-1/2 text-9xl">
          <Link href="/">
            <img
              src="/icons/icon.svg"
              className="h-40 w-40 bg-white rounded-full"
              alt="auth icon"
            />
          </Link>
        </div>

        <h1 className="text-md flex items-center">
          ثبت نام | ورود
          <span className="text-sm text-gray-400"></span>
        </h1>

        {/* Phone Number Input */}
        {!isCodeSent && !isPasswordLogin && (
          <>
            <p className="text-sm mt-3 text-gray-600">
              سلام. لطفا شماره تلفن همراه خود را وارد کنید.
            </p>
            <form
              onSubmit={handlePhoneSubmit}
              className="flex flex-col mt-5 gap-6"
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-row-reverse border-2 border-gray-200 rounded-lg px-3 justify-center items-center mt-10">
                  <span className="border-r pr-2 border-black font-bold text-sm">
                    +98
                  </span>
                  <input
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    maxLength={11}
                    required
                    className="w-full py-3 px-3 outline-0 text-sm font-bold placeholder:text-right"
                    dir="ltr"
                    type="text"
                    inputMode="numeric"
                    placeholder="09123456789"
                  />
                </div>
                {error && (
                  <p className="text-red-500 text-sm font-medium text-right">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={phoneNumber.length < 10 || loading}
                className="py-3 mt-6 bg-[#0094da] rounded-xl w-full text-md text-white hover:bg-[#0083c0] cursor-pointer transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "در حال پردازش..." : "ادامه"}
              </button>
            </form>

            <div className="w-full flex items-center justify-center">
              <button
                onClick={toggleLoginMethod}
                className="w-fit flex flex-row-reverse justify-center items-center mt-4 text-gray-500 cursor-pointer gap-2 px-2 py-2 text-sm"
              >
                <RectangleEllipsis />
                ورود با رمز عبور
              </button>
            </div>
          </>
        )}

        {/* Verification Code Input */}
        {isCodeSent && !isPasswordLogin && !isVerified && (
          <>
            <p className="text-md mt-1 text-gray-500">کد تایید را وارد کنید</p>
            <p className="text-sm text-gray-600 mt-2 text-right">
              کد ۵ رقمی به شماره {phoneNumber} ارسال شد.
            </p>
            <form
              onSubmit={handleCodeSubmit}
              className="flex flex-col mt-5 gap-6"
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-row-reverse gap-2 justify-center">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      value={verificationCode[index]}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleCodeKeyDown(index, e)}
                      maxLength={1}
                      required
                      className="w-12 h-12 border-2 border-gray-200 rounded-lg outline-0 text-sm font-bold text-center"
                      type="text"
                      inputMode="numeric"
                    />
                  ))}
                </div>
                {error && (
                  <p className="text-red-500 text-sm font-medium text-right">
                    {error}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  disabled={verificationCode.join("").length !== 5 || loading}
                  className="py-3 bg-[#0094da] rounded-xl w-full text-md text-white hover:bg-[#0083c0] cursor-pointer transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? "در حال تایید..." : "تایید کد"}
                </button>
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-[#0094da] text-sm font-medium cursor-pointer hover:text-[#0083c0] transition-colors"
                >
                  ارسال مجدد کد
                </button>
                <button
                  type="button"
                  onClick={handleBackToPhone}
                  className="text-gray-500 text-sm font-medium cursor-pointer hover:text-gray-700 transition-colors"
                >
                  بازگشت
                </button>
              </div>
            </form>

            <div className="w-full flex items-center justify-center">
              <button
                onClick={toggleLoginMethod}
                className="w-fit flex flex-row-reverse justify-center items-center mt-4 text-gray-500 cursor-pointer gap-2 px-2 py-2 text-sm"
              >
                <RectangleEllipsis />
                ورود با رمز عبور
              </button>
            </div>
          </>
        )}

        {/* Password Login */}
        {isPasswordLogin && !isVerified && (
          <>
            <p className="text-md mt-1 text-gray-500">ورود با رمز عبور</p>
            <p className="text-sm text-gray-600 mt-2 text-right">
              شماره تلفن: {phoneNumber}
            </p>
            <form
              onSubmit={handlePasswordSubmit}
              className="flex flex-col mt-5 gap-6"
            >
              <div className="flex flex-col gap-2">
                <input
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="w-full py-3 px-3 border-2 border-gray-200 rounded-lg outline-0 text-sm font-bold text-right"
                  dir="rtl"
                  type="password"
                  placeholder="رمز عبور خود را وارد کنید"
                />
                {error && (
                  <p className="text-red-500 text-sm font-medium text-right">
                    {error}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  disabled={password.length < 6 || loading}
                  className="py-3 bg-[#0094da] rounded-xl w-full text-md text-white hover:bg-[#0083c0] cursor-pointer transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? "در حال ورود..." : "ورود"}
                </button>
                <button
                  type="button"
                  onClick={handleBackToPhone}
                  className="text-gray-500 text-sm font-medium cursor-pointer hover:text-gray-700 transition-colors"
                >
                  بازگشت
                </button>
              </div>
            </form>

            <div className="w-full flex items-center justify-center">
              <button
                onClick={toggleLoginMethod}
                className="w-fit flex flex-row-reverse justify-center items-center mt-4 text-gray-500 cursor-pointer gap-2 px-2 py-2 text-sm"
              >
                <RectangleEllipsis />
                ورود با کد یکبار مصرف
              </button>
            </div>
          </>
        )}

        {/* Success Message */}
        {isVerified && (
          <>
            <p className="text-md mt-1 text-gray-500">
              ورود با موفقیت انجام شد!
            </p>
            <p className="text-sm text-gray-600 mt-2 text-right">
              در حال انتقال به پنل کاربری...
            </p>
            <div className="flex justify-center mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0094da]"></div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
