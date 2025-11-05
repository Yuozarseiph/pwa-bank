"use client";
import { useState, useRef, useEffect } from "react";
import { RectangleEllipsis } from "lucide-react";
import Link from "next/link";
import Loading from "@/components/Loading";

export default function Login() {
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
  const [loading, setLoading] = useState(true);

  const inputRefs = useRef([]);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    setError("");

    const cleanPhone = phoneNumber.replace(/\D/g, "");

    if (cleanPhone.length < 10) {
      setError("شماره تلفن باید حداقل ۱۰ رقم باشد");
      return;
    }

    if (cleanPhone.length > 11) {
      setError("شماره تلفن نباید بیشتر از ۱۱ رقم باشد");
      return;
    }

    if (!/^09\d{9}$/.test(cleanPhone)) {
      setError("شماره تلفن باید با 09 شروع شود");
      return;
    }

    console.log("شماره تلفن معتبر:", cleanPhone);
    setIsCodeSent(true);
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    setError("");

    const code = verificationCode.join("");

    if (code.length !== 5) {
      setError("کد تأیید باید ۵ رقمی باشد");
      return;
    }

    if (!/^\d{5}$/.test(code)) {
      setError("کد تأیید باید فقط شامل اعداد باشد");
      return;
    }

    console.log("کد تأیید:", code);
    setIsVerified(true);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("رمز عبور باید حداقل ۶ کاراکتر باشد");
      return;
    }

    console.log("ورود با رمز عبور برای شماره:", phoneNumber);
    setIsVerified(true);
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
      setError("لطفا ابتدا شماره تلفن خود را وارد کنید");
      return;
    }
    setIsPasswordLogin(!isPasswordLogin);
    setVerificationCode(["", "", "", "", ""]);
    setPassword("");
    setError("");
  };

  useEffect(() => {
    if (isCodeSent && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isCodeSent]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="bg-[#0094da] w-full h-screen grid place-content-center">
      <div className="bg-white relative mx-1 min-w-[333px] md:w-[450px] h-fit rounded-xl p-5 md:p-10">
        <div className="absolute -top-25 left-1/2 -translate-x-1/2 text-9xl">
          <Link href="/">
            <img
              src="/icons/auth-icon.svg"
              className="h-40 w-40"
              alt="auth icon"
            />
          </Link>
        </div>

        <h1 className="text-md flex items-center">
          ثبت نام<span className="text-sm text-gray-400">|</span>ورود
        </h1>

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
                    98+
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
                    placeholder="مثال: 09123456789"
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
                className="py-3 mt-6 bg-[#0094da] rounded-xl w-full text-md text-white hover:bg-[#0083c0] cursor-pointer transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={phoneNumber.length < 10}
              >
                تایید و دریافت کد
              </button>
            </form>
            <div className="w-full flex items-center justify-center">
              <button
                onClick={toggleLoginMethod}
                className="w-fit flex flex-row-reverse justify-center items-center mt-4 text-gray-500 cursor-pointer gap-2 px-2 py-2 text-sm"
              >
                ورود با رمز عبور
                <RectangleEllipsis />
              </button>
            </div>
          </>
        )}

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
                  className="py-3 bg-[#0094da] rounded-xl w-full text-md text-white hover:bg-[#0083c0] cursor-pointer transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={verificationCode.join("").length !== 5}
                >
                  تایید و ادامه
                </button>

                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-[#0094da] text-sm font-medium cursor-pointer hover:text-[#0083c0] transition-colors"
                >
                  دریافت مجدد کد تایید
                </button>

                <button
                  type="button"
                  onClick={handleBackToPhone}
                  className="text-gray-500 text-sm font-medium cursor-pointer hover:text-gray-700 transition-colors"
                >
                  تغییر شماره تلفن
                </button>
              </div>
            </form>

            <div className="w-full flex items-center justify-center">
              <button
                onClick={toggleLoginMethod}
                className="w-fit flex flex-row-reverse justify-center items-center mt-4 text-gray-500 cursor-pointer gap-2 px-2 py-2 text-sm"
              >
                ورود با رمز عبور
                <RectangleEllipsis />
              </button>
            </div>
          </>
        )}

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
                  className="py-3 bg-[#0094da] rounded-xl w-full text-md text-white hover:bg-[#0083c0] cursor-pointer transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={password.length < 6}
                >
                  ورود به حساب
                </button>

                <button
                  type="button"
                  onClick={handleBackToPhone}
                  className="text-gray-500 text-sm font-medium cursor-pointer hover:text-gray-700 transition-colors"
                >
                  تغییر شماره تلفن
                </button>
              </div>
            </form>

            <div className="w-full flex items-center justify-center">
              <button
                onClick={toggleLoginMethod}
                className="w-fit flex flex-row-reverse justify-center items-center mt-4 text-gray-500 cursor-pointer gap-2 px-2 py-2 text-sm"
              >
                ورود با کد تایید
                <RectangleEllipsis />
              </button>
            </div>
          </>
        )}

        {isVerified && (
          <>
            <p className="text-md mt-1 text-gray-500">
              ورود با موفقیت انجام شد!
            </p>
            <p className="text-sm text-gray-600 mt-2 text-right">
              در حال انتقال به پنل کاربری...
            </p>
          </>
        )}
      </div>
    </main>
  );
}
