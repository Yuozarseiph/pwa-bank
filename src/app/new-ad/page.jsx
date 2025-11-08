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
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";


export default function NewAd() {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [showErrorBox, setShowErrorBox] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    price: "",
    currency: "تومان",
    type: "",
    bankId: "",
    bankName: "",
    provinceId: "",
    cityId: "",
    address: "",
    contactPhone: "",
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

  useEffect(() => {
    fetchProvinces();
    fetchCities();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await fetch(
        "https://iranplacesapi.liara.run/api/provinces"
      );
      const data = await response.json();
      setProvinces(data);
    } catch (error) {
      console.error("خطا در دریافت لیست استان‌ها:", error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await fetch(
        "https://iranplacesapi.liara.run/api/cities"
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("خطا در دریافت لیست شهرها:", error);
    }
  };

  useEffect(() => {
    if (formData.provinceId && cities.length > 0) {
      const filtered = cities.filter(
        (city) => city.province_id == formData.provinceId
      );
      setFilteredCities(filtered);
      if (
        formData.cityId &&
        !filtered.some((city) => city.id == formData.cityId)
      ) {
        setFormData((prev) => ({ ...prev, cityId: "" }));
      }
    } else {
      setFilteredCities([]);
    }
  }, [formData.provinceId, cities]);

  const formatNumber = (value) => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const validatePrice = (priceValue) => {
    const numericValue = parseInt(priceValue.replace(/\D/g, ""));

    if (numericValue < 1000000) {
      return "مبلغ وام باید حداقل ۱,۰۰۰,۰۰۰ تومان باشد";
    }

    if (numericValue % 1000 !== 0) {
      return "مبلغ وام باید مضرب ۱,۰۰۰ باشد";
    }

    return "";
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "عنوان آگهی الزامی است";
    if (!formData.price.trim()) {
      newErrors.price = "مبلغ وام الزامی است";
    } else {
      const priceError = validatePrice(formData.price);
      if (priceError) newErrors.price = priceError;
    }
    if (!formData.type) newErrors.type = "نوع وام الزامی است";
    if (!formData.bankId) newErrors.bankId = "انتخاب بانک الزامی است";
    if (!formData.description.trim())
      newErrors.description = "توضیحات کوتاه الزامی است";
    if (!formData.fullDescription.trim())
      newErrors.fullDescription = "توضیحات کامل الزامی است";
    if (!formData.provinceId) newErrors.provinceId = "انتخاب استان الزامی است";
    if (!formData.cityId) newErrors.cityId = "انتخاب شهر الزامی است";
    if (!formData.address.trim()) newErrors.address = "آدرس کامل الزامی است";
    if (!formData.contactPhone.trim())
      newErrors.contactPhone = "شماره تماس الزامی است";
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

    if (formData.minAge && formData.maxAge) {
      const minAge = parseInt(formData.minAge);
      const maxAge = parseInt(formData.maxAge);
      if (minAge > maxAge)
        newErrors.ageRange = "حداقل سن نمی‌تواند بیشتر از حداکثر سن باشد";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setShowErrorBox(true);
      return false;
    } else {
      setShowErrorBox(false);
      return true;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "price") {
      const formattedValue = formatNumber(value);
      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));

      if (value.trim()) {
        const priceError = validatePrice(value);
        setErrors((prev) => ({
          ...prev,
          price: priceError,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        setShowErrorBox(false);
      }
    }
  };

  const getLocationName = () => {
    const province = provinces.find((p) => p.id == formData.provinceId);
    const city = cities.find((c) => c.id == formData.cityId);

    if (province && city) {
      return `${province.name}، ${city.name}`;
    } else if (province) {
      return province.name;
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);

        const response = await fetch("/api/ads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            fullDescription: formData.fullDescription,
            price: formData.price.replace(/,/g, ""),
            currency: formData.currency,
            type: formData.type,
            bank: {
              name:
                banks.find((bank) => bank.id == formData.bankId)?.name || "",
              logo: "/banks/default-bank.png",
            },
            contact: {
              phone: formData.contactPhone,
              address: formData.address,
            },
            details: [
              { label: "نوع وام", value: formData.type },
              {
                label: "مبلغ",
                value: formData.price + " " + formData.currency,
              },
              { label: "مدت بازپرداخت", value: formData.repaymentPeriod },
              { label: "نرخ سود", value: formData.interestRate },
              {
                label: "محدوده سنی",
                value: `${formData.minAge} تا ${formData.maxAge} سال`,
              },
              { label: "مدارک", value: formData.documents },
            ],
            location: getLocationName(),
            safetyTips: ["از قیمت بازار مطلع شوید", "قرارداد را حتما بخوانید"],
          }),
        });

        const result = await response.json();

        if (result.success) {
          console.log("آگهی با موفقیت ثبت شد:", result.data);
          alert("آگهی با موفقیت ثبت شد!");
          setShowErrorBox(false);
          setFormData({
            title: "",
            description: "",
            fullDescription: "",
            price: "",
            currency: "تومان",
            type: "",
            bankId: "",
            bankName: "",
            provinceId: "",
            cityId: "",
            address: "",
            contactPhone: "",
            loanType: "",
            repaymentPeriod: "",
            interestRate: "",
            minAge: "",
            maxAge: "",
            documents: "",
          });
        } else {
          alert("خطا در ثبت آگهی: " + result.error);
        }
      } catch (error) {
        console.error("خطا در ارسال آگهی:", error);
        alert("خطا در ارتباط با سرور");
      } finally {
        setLoading(false);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const closeError = () => {
    setErrors({});
    setShowErrorBox(false);
  };

  const banks = [
    { id: 1, name: "بانک سپه" },
    { id: 2, name: "بانک ملی" },
    { id: 3, name: "بانک ملت" },
    { id: 4, name: "بانک ایران زمین" },
    { id: 5, name: "بانک صادرات" },
    { id: 6, name: "بلو بانک" },
    { id: 7, name: "بانک رفاه" },
    { id: 8, name: "بانک مهر ایران" },
    { id: 9, name: "بانک سامان" },
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
    <div className="flex min-h-dvh flex-col relative bg-[#f1f5f9] overflow-x-hidden lg:pt-20 mt-20 lg:mt-0">
      <Navbar />
      <Header />
      <div className="flex relative justify-center items-start flex-row-reverse p-2 lg:gap-6 lg:p-5">
        <div className="w-full md:w-[80%] max-w-[1080px] bg-white rounded-xl shadow-sm p-5 md:p-10 mb-22">
          {showErrorBox && Object.keys(errors).length > 0 && (
            <div className="mb-6 p-4 border-2 border-red-200 bg-red-50 rounded-xl relative shadow-sm">
              <button
                onClick={closeError}
                className="absolute left-3 top-3 text-red-600 hover:text-red-800 transition-colors"
              >
                <XIcon className="h-5 w-5" />
              </button>
              <h3 className="text-red-700 font-bold mb-3 text-right flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                لطفا خطاهای زیر را برطرف کنید:
              </h3>
              <ul className="list-none pr-2 space-y-2">
                {Object.values(errors).map(
                  (error, index) =>
                    error && (
                      <li
                        key={index}
                        className="text-red-600 text-sm text-right flex items-start gap-2"
                      >
                        <span className="text-red-500 mt-0.5">•</span>
                        <span>{error}</span>
                      </li>
                    )
                )}
              </ul>
            </div>
          )}

          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              ثبت آگهی جدید
            </h1>
            <p className="text-sm md:text-base text-gray-500">
              اطلاعات وام خود را در فرم زیر وارد کنید
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Main Information Section */}
            <div className="bg-linear-to-br from-blue-50 to-blue-100/50 p-5 md:p-7 rounded-xl border-2 border-blue-200 shadow-sm">
              <h2 className="text-lg md:text-xl font-bold mb-5 flex items-center gap-2 text-gray-800">
                <FileTextIcon className="h-6 w-6 text-blue-600" />
                اطلاعات اصلی آگهی
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    عنوان آگهی <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full bg-white px-4 py-3.5 border-2 rounded-xl outline-none text-sm font-medium placeholder:text-right transition-all duration-200 ${
                      errors.title
                        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    }`}
                    placeholder="مثال: وام قرض الحسنه ۴۰۰ میلیون تومانی"
                  />
                  {errors.title && (
                    <p className="text-red-600 text-xs mt-1.5 text-right flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.title}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    مبلغ وام (تومان) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="price"
                    dir="ltr"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={`w-full bg-white px-4 py-3.5 border-2 rounded-xl outline-none text-sm font-bold placeholder:text-right transition-all duration-200 ${
                      errors.price
                        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    }`}
                    placeholder="مثال: ۴۰۰,۰۰۰,۰۰۰"
                  />
                  {errors.price && (
                    <p className="text-red-600 text-xs mt-1.5 text-right flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.price}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1.5 text-right">
                    مبلغ باید مضرب ۱,۰۰۰ و حداقل ۱,۰۰۰,۰۰۰ تومان باشد
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    نوع وام <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className={`w-full bg-white px-4 py-3.5 border-2 rounded-xl outline-none text-sm font-bold transition-all duration-200 ${
                      errors.type
                        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
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
                    <p className="text-red-600 text-xs mt-1.5 text-right flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.type}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    بانک <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="bankId"
                    value={formData.bankId}
                    onChange={handleInputChange}
                    className={`w-full bg-white px-4 py-3.5 border-2 rounded-xl outline-none text-sm font-bold transition-all duration-200 ${
                      errors.bankId
                        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
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
                    <p className="text-red-600 text-xs mt-1.5 text-right flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.bankId}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    توضیحات کوتاه <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="2"
                    className={`w-full bg-white px-4 py-3.5 border-2 rounded-xl outline-none text-sm font-medium placeholder:text-right transition-all duration-200 resize-none ${
                      errors.description
                        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    }`}
                    placeholder="توضیح مختصر درباره وام"
                  />
                  {errors.description && (
                    <p className="text-red-600 text-xs mt-1.5 text-right flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    توضیحات کامل <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleInputChange}
                    rows="5"
                    className={`w-full bg-white px-4 py-3.5 border-2 rounded-xl outline-none text-sm font-medium placeholder:text-right transition-all duration-200 resize-none ${
                      errors.fullDescription
                        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    }`}
                    placeholder="شرایط کامل وام، ویژگی‌ها، مدارک مورد نیاز و..."
                  />
                  {errors.fullDescription && (
                    <p className="text-red-600 text-xs mt-1.5 text-right flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.fullDescription}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Loan Details Section */}
            <div className="bg-linear-to-br from-orange-50 to-orange-100/50 p-5 md:p-7 rounded-xl border-2 border-orange-200 shadow-sm">
              <h2 className="text-lg md:text-xl font-bold mb-5 flex items-center gap-2 text-gray-800">
                <BanknoteIcon className="h-6 w-6 text-orange-600" />
                جزئیات وام
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    مدت بازپرداخت <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="repaymentPeriod"
                    value={formData.repaymentPeriod}
                    onChange={handleInputChange}
                    className={`w-full bg-white px-4 py-3.5 border-2 rounded-xl outline-none text-sm font-medium placeholder:text-right transition-all duration-200 ${
                      errors.repaymentPeriod
                        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    }`}
                    placeholder="مثال: ۱۲ تا ۶۰ ماه"
                  />
                  {errors.repaymentPeriod && (
                    <p className="text-red-600 text-xs mt-1.5 text-right flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.repaymentPeriod}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    نرخ سود <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="interestRate"
                    value={formData.interestRate}
                    onChange={handleInputChange}
                    className={`w-full bg-white px-4 py-3.5 border-2 rounded-xl outline-none text-sm font-medium placeholder:text-right transition-all duration-200 ${
                      errors.interestRate
                        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    }`}
                    placeholder="مثال: ۴٪ سالیانه"
                  />
                  {errors.interestRate && (
                    <p className="text-red-600 text-xs mt-1.5 text-right flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.interestRate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    حداقل سن <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    name="minAge"
                    value={formData.minAge}
                    onChange={handleInputChange}
                    className={`w-full bg-white px-4 py-3.5 border-2 rounded-xl outline-none text-sm font-medium placeholder:text-right transition-all duration-200 ${
                      errors.minAge
                        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    }`}
                    placeholder="مثال: ۲۵"
                  />
                  {errors.minAge && (
                    <p className="text-red-600 text-xs mt-1.5 text-right flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.minAge}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    حداکثر سن <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    name="maxAge"
                    value={formData.maxAge}
                    onChange={handleInputChange}
                    className={`w-full bg-white px-4 py-3.5 border-2 rounded-xl outline-none text-sm font-medium placeholder:text-right transition-all duration-200 ${
                      errors.maxAge
                        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    }`}
                    placeholder="مثال: ۶۵"
                  />
                  {errors.maxAge && (
                    <p className="text-red-600 text-xs mt-1.5 text-right flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.maxAge}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    مدارک مورد نیاز <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="documents"
                    value={formData.documents}
                    onChange={handleInputChange}
                    className={`w-full bg-white px-4 py-3.5 border-2 rounded-xl outline-none text-sm font-medium placeholder:text-right transition-all duration-200 ${
                      errors.documents
                        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    }`}
                    placeholder="مثال: شناسنامه، فیش حقوقی"
                  />
                  {errors.documents && (
                    <p className="text-red-600 text-xs mt-1.5 text-right flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.documents}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className="bg-linear-to-br from-blue-50 to-blue-100/50 p-5 md:p-7 rounded-xl border-2 border-blue-200 shadow-sm">
              <h2 className="text-lg md:text-xl font-bold mb-5 flex items-center gap-2 text-gray-800">
                <MapPinIcon className="h-6 w-6 text-blue-600" />
                موقعیت
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    استان <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="provinceId"
                    value={formData.provinceId}
                    onChange={handleInputChange}
                    className={`w-full bg-white px-4 py-3.5 border-2 rounded-xl outline-none text-sm font-bold transition-all duration-200 ${
                      errors.provinceId
                        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    }`}
                  >
                    <option value="">انتخاب استان</option>
                    {provinces.map((province) => (
                      <option key={province.id} value={province.id}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                  {errors.provinceId && (
                    <p className="text-red-600 text-xs mt-1.5 text-right flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.provinceId}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    شهر <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="cityId"
                    value={formData.cityId}
                    onChange={handleInputChange}
                    disabled={!formData.provinceId}
                    className={`w-full bg-white px-4 py-3.5 border-2 rounded-xl outline-none text-sm font-bold transition-all duration-200 ${
                      errors.cityId
                        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    } ${
                      !formData.provinceId
                        ? "opacity-50 cursor-not-allowed bg-gray-50"
                        : ""
                    }`}
                  >
                    <option value="">
                      {formData.provinceId
                        ? "انتخاب شهر"
                        : "ابتدا استان را انتخاب کنید"}
                    </option>
                    {filteredCities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  {errors.cityId && (
                    <p className="text-red-600 text-xs mt-1.5 text-right flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.cityId}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    آدرس کامل <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className={`w-full bg-white px-4 py-3.5 border-2 rounded-xl outline-none text-sm font-medium placeholder:text-right transition-all duration-200 resize-none ${
                      errors.address
                        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    }`}
                    placeholder="آدرس دقیق شعبه بانک"
                  />
                  {errors.address && (
                    <p className="text-red-600 text-xs mt-1.5 text-right flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="bg-linear-to-br from-orange-50 to-orange-100/50 p-5 md:p-7 rounded-xl border-2 border-orange-200 shadow-sm">
              <h2 className="text-lg md:text-xl font-bold mb-5 flex items-center gap-2 text-gray-800">
                <PhoneIcon className="h-6 w-6 text-orange-600" />
                اطلاعات تماس
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    شماره تماس <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    className={`w-full bg-white px-4 py-3.5 border-2 rounded-xl outline-none text-sm font-medium placeholder:text-right transition-all duration-200 ${
                      errors.contactPhone
                        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    }`}
                    placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                  />
                  {errors.contactPhone && (
                    <p className="text-red-600 text-xs mt-1.5 text-right flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.contactPhone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Age Range Error (if exists) */}
            {errors.ageRange && (
              <div className="p-4 border-2 border-red-200 bg-red-50 rounded-xl shadow-sm">
                <p className="text-red-700 text-sm text-right flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.ageRange}
                </p>
              </div>
            )}

            {/* Form Action Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t-2 border-gray-100">
              <Link
                href="/"
                className="px-8 py-3.5 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 text-sm shadow-sm"
              >
                انصراف
              </Link>
              <button
                type="submit"
                className="px-8 py-3.5 bg-linear-to-l from-[#0094da] to-[#00b4ff] text-white font-bold rounded-xl hover:from-[#0083c0] hover:to-[#009de6] transition-all duration-300 text-sm shadow-md hover:shadow-lg"
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
