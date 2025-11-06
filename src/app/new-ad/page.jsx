"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/SideBar";
import { useEffect, useState } from "react";
import {
  BanknoteIcon,
  MapPinIcon,
  FileTextIcon,
  PhoneIcon,
  XIcon,
} from "lucide-react";

export default function NewAd() {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    price: "",
    currency: "تومان",
    type: "",
    bankId: "",
    bankName: "",
    location: "",
    address: "",
    contactPhone: "",
    contactEmail: "",
    loanType: "",
    repaymentPeriod: "",
    interestRate: "",
    minAge: "",
    maxAge: "",
    documents: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const formatNumber = (value) => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "عنوان آگهی الزامی است";
    if (!formData.price.trim()) newErrors.price = "مبلغ وام الزامی است";
    if (!formData.type) newErrors.type = "نوع وام الزامی است";
    if (!formData.bankId) newErrors.bankId = "انتخاب بانک الزامی است";
    if (!formData.description.trim())
      newErrors.description = "توضیحات کوتاه الزامی است";
    if (!formData.fullDescription.trim())
      newErrors.fullDescription = "توضیحات کامل الزامی است";
    if (!formData.location.trim()) newErrors.location = "استان/شهر الزامی است";
    if (!formData.address.trim()) newErrors.address = "آدرس کامل الزامی است";
    if (!formData.contactPhone.trim())
      newErrors.contactPhone = "شماره تماس الزامی است";
    if (!formData.contactEmail.trim())
      newErrors.contactEmail = "ایمیل الزامی است";
    if (!formData.repaymentPeriod.trim())
      newErrors.repaymentPeriod = "مدت بازپرداخت الزامی است";
    if (!formData.interestRate.trim())
      newErrors.interestRate = "نرخ سود الزامی است";
    if (!formData.minAge.trim()) newErrors.minAge = "حداقل سن الزامی است";
    if (!formData.maxAge.trim()) newErrors.maxAge = "حداکثر سن الزامی است";
    if (!formData.documents.trim())
      newErrors.documents = "مدارک مورد نیاز الزامی است";

    if (
      formData.contactPhone &&
      !/^09\d{9}$/.test(formData.contactPhone.replace(/\D/g, ""))
    ) {
      newErrors.contactPhone = "شماره تماس معتبر نیست";
    }

    if (
      formData.contactEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)
    ) {
      newErrors.contactEmail = "ایمیل معتبر نیست";
    }

    if (formData.minAge && formData.maxAge) {
      const minAge = parseInt(formData.minAge);
      const maxAge = parseInt(formData.maxAge);
      if (minAge > maxAge)
        newErrors.ageRange = "حداقل سن نمی‌تواند بیشتر از حداکثر سن باشد";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "price") {
      const formattedValue = formatNumber(value);
      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("فرم ثبت شد:", formData);
      alert("آگهی با موفقیت ثبت شد!");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const closeError = () => {
    setErrors({});
  };

  const banks = [
    { id: 1, name: "بانک سپه" },
    { id: 2, name: "بانک ملی" },
    { id: 3, name: "بانک ملت" },
    { id: 4, name: "بانک صادرات" },
    { id: 5, name: "بانک تجارت" },
    { id: 6, name: "بانک رفاه" },
  ];

  const loanTypes = [
    "تسهیلات بانکی",
    "وام مسکن",
    "وام خودرو",
    "قرض الحسنه",
    "وام ازدواج",
    "وام تحصیلی",
    "وام کسب و کار",
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-dvh flex-col relative bg-[#f1f5f9] overflow-x-hidden lg:pt-20">
      <Navbar />
      <Header />
      <div className="flex relative justify-center items-start flex-row-reverse p-2 lg:gap-6 lg:p-5">
        <div className="w-full md:w-[80%] max-w-[1080px] bg-white rounded-xl p-5 md:p-10 mb-22">
          {Object.keys(errors).length > 0 && (
            <div className="mb-6 p-4 border border-[#a9020a] bg-[#fdf2f2] rounded-lg relative">
              <button
                onClick={closeError}
                className="absolute left-3 top-3 text-[#a9020a] hover:text-[#8a020a]"
              >
                <XIcon className="h-4 w-4" />
              </button>
              <h3 className="text-[#a9020a] font-bold mb-2 text-right">
                لطفا خطاهای زیر را برطرف کنید:
              </h3>
              <ul className="list-disc pr-4 space-y-1">
                {Object.values(errors).map(
                  (error, index) =>
                    error && (
                      <li
                        key={index}
                        className="text-[#a9020a] text-sm text-right"
                      >
                        {error}
                      </li>
                    )
                )}
              </ul>
            </div>
          )}

          <div className="mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
              ثبت آگهی جدید
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              اطلاعات وام خود را در فرم زیر وارد کنید
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg border border-blue-300">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileTextIcon className="h-5 w-5" />
                اطلاعات اصلی آگهی
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عنوان آگهی <span className="text-[#a9020a]">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full bg-white px-3 py-3 border-2 rounded-lg outline-0 text-sm font-bold placeholder:text-right ${
                      errors.title ? "border-[#a9020a]" : "border-gray-200"
                    }`}
                    placeholder="مثال: وام قرض الحسنه ۴۰۰ میلیون تومانی"
                  />
                  {errors.title && (
                    <p className="text-[#a9020a] text-xs mt-1 text-right">
                      {errors.title}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    مبلغ وام <span className="text-[#a9020a]">*</span>
                  </label>
                  <input
                    type="text"
                    name="price"
                    dir="ltr"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={`w-full bg-white px-3 py-3 border-2 rounded-lg outline-0 text-sm font-bold placeholder:text-right ${
                      errors.price ? "border-[#a9020a]" : "border-gray-200"
                    }`}
                    placeholder="مثال: ۴۰۰,۰۰۰,۰۰۰"
                  />
                  {errors.price && (
                    <p className="text-[#a9020a] text-xs mt-1 text-right">
                      {errors.price}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نوع وام <span className="text-[#a9020a]">*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className={`w-full bg-white px-3 py-3 border-2 rounded-lg outline-0 text-sm font-bold ${
                      errors.type ? "border-[#a9020a]" : "border-gray-200"
                    }`}
                  >
                    <option value="">انتخاب کنید</option>
                    {loanTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.type && (
                    <p className="text-[#a9020a] text-xs mt-1 text-right">
                      {errors.type}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    بانک <span className="text-[#a9020a]">*</span>
                  </label>
                  <select
                    name="bankId"
                    value={formData.bankId}
                    onChange={handleInputChange}
                    className={`w-full bg-white px-3 py-3 border-2 rounded-lg outline-0 text-sm font-bold ${
                      errors.bankId ? "border-[#a9020a]" : "border-gray-200"
                    }`}
                  >
                    <option value="">انتخاب بانک</option>
                    {banks.map((bank) => (
                      <option key={bank.id} value={bank.id}>
                        {bank.name}
                      </option>
                    ))}
                  </select>
                  {errors.bankId && (
                    <p className="text-[#a9020a] text-xs mt-1 text-right">
                      {errors.bankId}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    توضیحات کوتاه <span className="text-[#a9020a]">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="2"
                    className={`w-full bg-white px-3 py-3 border-2 rounded-lg outline-0 text-sm font-bold placeholder:text-right ${
                      errors.description
                        ? "border-[#a9020a]"
                        : "border-gray-200"
                    }`}
                    placeholder="توضیح مختصر درباره وام"
                  />
                  {errors.description && (
                    <p className="text-[#a9020a] text-xs mt-1 text-right">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    توضیحات کامل <span className="text-[#a9020a]">*</span>
                  </label>
                  <textarea
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleInputChange}
                    rows="4"
                    className={`w-full bg-white px-3 py-3 border-2 rounded-lg outline-0 text-sm font-bold placeholder:text-right ${
                      errors.fullDescription
                        ? "border-[#a9020a]"
                        : "border-gray-200"
                    }`}
                    placeholder="شرایط کامل وام، ویژگی‌ها، مدارک مورد نیاز و..."
                  />
                  {errors.fullDescription && (
                    <p className="text-[#a9020a] text-xs mt-1 text-right">
                      {errors.fullDescription}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 md:p-6 rounded-lg border border-blue-300">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BanknoteIcon className="h-5 w-5" />
                جزئیات وام
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    مدت بازپرداخت <span className="text-[#a9020a]">*</span>
                  </label>
                  <input
                    type="text"
                    name="repaymentPeriod"
                    value={formData.repaymentPeriod}
                    onChange={handleInputChange}
                    className={`w-full bg-white px-3 py-3 border-2 rounded-lg outline-0 text-sm font-bold placeholder:text-right ${
                      errors.repaymentPeriod
                        ? "border-[#a9020a]"
                        : "border-gray-200"
                    }`}
                    placeholder="مثال: ۱۲ تا ۶۰ ماه"
                  />
                  {errors.repaymentPeriod && (
                    <p className="text-[#a9020a] text-xs mt-1 text-right">
                      {errors.repaymentPeriod}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نرخ سود <span className="text-[#a9020a]">*</span>
                  </label>
                  <input
                    type="text"
                    name="interestRate"
                    value={formData.interestRate}
                    onChange={handleInputChange}
                    className={`w-full bg-white px-3 py-3 border-2 rounded-lg outline-0 text-sm font-bold placeholder:text-right ${
                      errors.interestRate
                        ? "border-[#a9020a]"
                        : "border-gray-200"
                    }`}
                    placeholder="مثال: ۴٪ سالیانه"
                  />
                  {errors.interestRate && (
                    <p className="text-[#a9020a] text-xs mt-1 text-right">
                      {errors.interestRate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    حداقل سن <span className="text-[#a9020a]">*</span>
                  </label>
                  <input
                    type="number"
                    name="minAge"
                    value={formData.minAge}
                    onChange={handleInputChange}
                    className={`w-full bg-white px-3 py-3 border-2 rounded-lg outline-0 text-sm font-bold placeholder:text-right ${
                      errors.minAge ? "border-[#a9020a]" : "border-gray-200"
                    }`}
                    placeholder="مثال: ۲۵"
                  />
                  {errors.minAge && (
                    <p className="text-[#a9020a] text-xs mt-1 text-right">
                      {errors.minAge}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    حداکثر سن <span className="text-[#a9020a]">*</span>
                  </label>
                  <input
                    type="number"
                    name="maxAge"
                    value={formData.maxAge}
                    onChange={handleInputChange}
                    className={`w-full bg-white px-3 py-3 border-2 rounded-lg outline-0 text-sm font-bold placeholder:text-right ${
                      errors.maxAge ? "border-[#a9020a]" : "border-gray-200"
                    }`}
                    placeholder="مثال: ۶۵"
                  />
                  {errors.maxAge && (
                    <p className="text-[#a9020a] text-xs mt-1 text-right">
                      {errors.maxAge}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    مدارک مورد نیاز <span className="text-[#a9020a]">*</span>
                  </label>
                  <input
                    type="text"
                    name="documents"
                    value={formData.documents}
                    onChange={handleInputChange}
                    className={`w-full bg-white px-3 py-3 border-2 rounded-lg outline-0 text-sm font-bold placeholder:text-right ${
                      errors.documents ? "border-[#a9020a]" : "border-gray-200"
                    }`}
                    placeholder="مثال: شناسنامه، فیش حقوقی"
                  />
                  {errors.documents && (
                    <p className="text-[#a9020a] text-xs mt-1 text-right">
                      {errors.documents}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 md:p-6 rounded-lg border border-blue-300">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPinIcon className="h-5 w-5" />
                موقعیت
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    استان/شهر <span className="text-[#a9020a]">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`w-full bg-white px-3 py-3 border-2 rounded-lg outline-0 text-sm font-bold placeholder:text-right ${
                      errors.location ? "border-[#a9020a]" : "border-gray-200"
                    }`}
                    placeholder="مثال: خراسان رضوی"
                  />
                  {errors.location && (
                    <p className="text-[#a9020a] text-xs mt-1 text-right">
                      {errors.location}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    آدرس کامل <span className="text-[#a9020a]">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="2"
                    className={`w-full bg-white px-3 py-3 border-2 rounded-lg outline-0 text-sm font-bold placeholder:text-right ${
                      errors.address ? "border-[#a9020a]" : "border-gray-200"
                    }`}
                    placeholder="آدرس دقیق شعبه بانک"
                  />
                  {errors.address && (
                    <p className="text-[#a9020a] text-xs mt-1 text-right">
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 md:p-6 rounded-lg border border-blue-300">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <PhoneIcon className="h-5 w-5" />
                اطلاعات تماس
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    شماره تماس <span className="text-[#a9020a]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    className={`w-full bg-white px-3 py-3 border-2 rounded-lg outline-0 text-sm font-bold placeholder:text-right ${
                      errors.contactPhone
                        ? "border-[#a9020a]"
                        : "border-gray-200"
                    }`}
                    placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                  />
                  {errors.contactPhone && (
                    <p className="text-[#a9020a] text-xs mt-1 text-right">
                      {errors.contactPhone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ایمیل <span className="text-[#a9020a]">*</span>
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    dir="ltr"
                    className={`w-full bg-white px-3 py-3 border-2 rounded-lg outline-0 text-sm font-bold placeholder:text-right ${
                      errors.contactEmail
                        ? "border-[#a9020a]"
                        : "border-gray-200"
                    }`}
                    placeholder="مثال: email@example.com"
                  />
                  {errors.contactEmail && (
                    <p className="text-[#a9020a] text-xs mt-1 text-right">
                      {errors.contactEmail}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {errors.ageRange && (
              <div className="p-3 border border-[#a9020a] bg-[#fdf2f2] rounded-lg">
                <p className="text-[#a9020a] text-sm text-right">
                  {errors.ageRange}
                </p>
              </div>
            )}

            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 text-sm font-medium"
              >
                انصراف
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#0094da] text-white rounded-lg hover:bg-[#0083c0] transition-all duration-300 text-sm font-medium"
              >
                ثبت آگهی
              </button>
            </div>
          </form>
        </div>
        <Sidebar />
      </div>
      <Footer />
    </div>
  );
}
