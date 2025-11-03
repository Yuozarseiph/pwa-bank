"use client";
import { useMemo, useState } from "react";
import { LoanStatus, loans } from "../app/page";

const STATUS_LABELS = Object.values(LoanStatus).map(s => s.label);

const statusColorClass = (status) => {
  const colorByLabel = {
    [LoanStatus.DRAFT.label]:        "bg-gray-100 text-gray-700 border border-gray-300",
    [LoanStatus.SUBMITTED.label]:    "bg-blue-100 text-blue-800 border border-blue-300",
    [LoanStatus.KYC_PENDING.label]:  "bg-yellow-100 text-yellow-800 border border-yellow-300",
    [LoanStatus.UNDER_REVIEW.label]: "bg-[#caeeff] text-[#0094da] border border-[#0094da]",
    [LoanStatus.NEEDS_MORE_INFO.label]: "bg-orange-100 text-orange-800 border border-orange-300",
    [LoanStatus.APPROVED.label]:     "bg-green-100 text-green-800 border border-green-300",
    [LoanStatus.CONTRACT_SIGN.label]:"bg-cyan-100 text-cyan-800 border border-cyan-300",
    [LoanStatus.DISBURSED.label]:    "bg-teal-100 text-teal-800 border border-teal-300",
    [LoanStatus.ACTIVE.label]:       "bg-emerald-100 text-emerald-800 border border-emerald-300",
    [LoanStatus.DELINQUENT.label]:   "bg-red-100 text-red-800 border border-red-300",
    [LoanStatus.DEFAULTED.label]:    "bg-red-200 text-red-900 border border-red-400",
    [LoanStatus.CLOSED.label]:       "bg-gray-200 text-gray-800 border border-gray-400",
    [LoanStatus.REJECTED.label]:     "bg-red-100 text-red-800 border border-red-300",
    [LoanStatus.CANCELED.label]:     "bg-gray-200 text-gray-800 border border-gray-400",
  };
  return colorByLabel[status] || "bg-gray-100 text-gray-700 border border-gray-300";
};

const statusShort = (status) => {
  const shortByLabel = {
    [LoanStatus.DRAFT.label]: "پیش‌نویس",
    [LoanStatus.SUBMITTED.label]: "ارسال",
    [LoanStatus.KYC_PENDING.label]: "احراز",
    [LoanStatus.UNDER_REVIEW.label]: "بررسی",
    [LoanStatus.NEEDS_MORE_INFO.label]: "مدارک",
    [LoanStatus.APPROVED.label]: "تایید",
    [LoanStatus.CONTRACT_SIGN.label]: "امضا",
    [LoanStatus.DISBURSED.label]: "پرداخت",
    [LoanStatus.ACTIVE.label]: "جاری",
    [LoanStatus.DELINQUENT.label]: "معوق",
    [LoanStatus.DEFAULTED.label]: "سررسید",
    [LoanStatus.CLOSED.label]: "تسویه",
    [LoanStatus.REJECTED.label]: "رد",
    [LoanStatus.CANCELED.label]: "لغو",
  };
  return shortByLabel[status] || status;
};

export default function LoanList() {
  const [tab, setTab] = useState("active"); 
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const tabFilter = (l) => {
    if (tab === "all") return true;
    if (tab === "active")
      return [
        LoanStatus.UNDER_REVIEW.label,
        LoanStatus.APPROVED.label,
        LoanStatus.CONTRACT_SIGN.label,
        LoanStatus.DISBURSED.label,
        LoanStatus.ACTIVE.label,
      ].includes(l.status);
    if (tab === "unpaid") return [LoanStatus.DELINQUENT.label].includes(l.status);
    if (tab === "unfulfilled")
      return [LoanStatus.NEEDS_MORE_INFO.label, LoanStatus.KYC_PENDING.label].includes(l.status);
    return true;
  };

  const filtered = useMemo(() => {
    return loans.filter((l) => {
      const matchText =
        !q ||
        l.id.includes(q) ||
        l.applicant.includes(q) ||
        (l.nationalId && l.nationalId.includes(q));
      const matchStatus = !status || l.status === status;
      const minOk = !minAmount || l.requestedAmount >= Number(minAmount);
      const maxOk = !maxAmount || l.requestedAmount <= Number(maxAmount);
      const matchTab = tabFilter(l);
      return matchText && matchStatus && minOk && maxOk && matchTab;
    });
  }, [q, status, minAmount, maxAmount, tab]);

  const kpis = useMemo(() => {
    const by = (label) => loans.filter((l) => l.status === label).length;
    return [
      { label: "ارسال‌شده", value: by(LoanStatus.SUBMITTED.label), color: "bg-blue-50 border border-blue-200" },
      { label: "در حال بررسی", value: by(LoanStatus.UNDER_REVIEW.label), color: "bg-[#caeeff] border border-[#0094da]" },
      { label: "تایید شده", value: by(LoanStatus.APPROVED.label), color: "bg-green-50 border border-green-200" },
      { label: "پرداخت‌شده", value: by(LoanStatus.DISBURSED.label), color: "bg-teal-50 border border-teal-200" },
      { label: "معوق", value: by(LoanStatus.DELINQUENT.label), color: "bg-red-50 border border-red-200" },
    ];
  }, []);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">فیلتر سریع</h3>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="flex gap-4 text-sm flex-wrap">
          {[
            { id: "all", label: "همه" },
            { id: "active", label: "فعال" },
            { id: "unpaid", label: "پرداخت‌نشده" },
            { id: "unfulfilled", label: "تکمیل‌نشده" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                tab === t.id 
                  ? "bg-[#0094da] text-white shadow-lg" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        
        <div className="flex-1 max-w-md">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="جستجو: شناسه، نام، کد ملی"
            className="w-full h-10 rounded-lg border border-gray-300 px-4 outline-none focus:ring-2 focus:ring-[#0094da] focus:border-[#0094da] transition-all"
          />
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-4">شاخص‌ها</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {kpis.map((k, i) => (
          <div key={i} className={`rounded-xl p-4 text-center ${k.color} transition-all hover:scale-105`}>
            <p className="text-sm mb-1">{k.label}</p>
            <p className="text-2xl font-bold">{k.value}</p>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-4">فیلترهای پیشرفته</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-12 rounded-lg border border-gray-300 px-4 bg-white focus:ring-2 focus:ring-[#0094da] focus:border-[#0094da] transition-all"
        >
          <option value="">همه وضعیت‌ها</option>
          {STATUS_LABELS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <input
          type="number"
          inputMode="numeric"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
          placeholder="حداقل مبلغ (ریال)"
          className="h-12 rounded-lg border border-gray-300 px-4 focus:ring-2 focus:ring-[#0094da] focus:border-[#0094da] transition-all"
        />
        <input
          type="number"
          inputMode="numeric"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
          placeholder="حداکثر مبلغ (ریال)"
          className="h-12 rounded-lg border border-gray-300 px-4 focus:ring-2 focus:ring-[#0094da] focus:border-[#0094da] transition-all"
        />
        <button
          onClick={() => { setQ(""); setStatus(""); setMinAmount(""); setMaxAmount(""); setTab("active"); }}
          className="h-12 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-[#0094da] transition-all"
        >
          ریست فیلترها
        </button>
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-4">لیست درخواست‌ها</h3>
      <div className="space-y-3">
        {filtered.map((l) => (
          <div key={l.id} className="rounded-xl border border-gray-200 bg-white hover:border-[#0094da] hover:shadow-md transition-all duration-300">
            <div className="flex items-start gap-4 p-4">
              <input type="checkbox" className="mt-1 h-5 w-5 accent-[#0094da]" />
              <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4">
                
                <div>
                  <div className="font-mono text-[#0094da] font-semibold cursor-pointer hover:text-[#007bbd] transition-colors">
                    {l.id}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    ایجاد: {l.createdAt} {l.updatedAt ? `• بروزرسانی: ${l.updatedAt}` : ""}
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-gray-800">{l.applicant}</div>
                  <div className="text-xs text-gray-500">{l.nationalId || "—"}</div>
                </div>

                <div className="flex items-center">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-medium ${statusColorClass(l.status)}`}>
                    {statusShort(l.status)}
                  </span>
                </div>

                <div>
                  <div className="font-semibold text-gray-800">{l.requestedAmount.toLocaleString("fa-IR")} ریال</div>
                  <div className="text-xs text-gray-500 mt-1">
                    مصوب: {l.approvedAmount ? l.approvedAmount.toLocaleString("fa-IR") : "—"} • {Math.round(l.rateAPR * 100)}% • {l.termMonths} ماه
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-700 font-medium">{l.nextAction || "—"}</div>
                  <div className="text-xs text-gray-500 mt-1">{l.channel || "—"} • {l.paymentMethod || "—"}</div>
                </div>

                <div className="flex flex-wrap gap-1 justify-start md:justify-end">
                  {Array.isArray(l.tags) && l.tags.slice(0,3).map((t) => (
                    <span key={t} className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs border border-gray-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          <div className="text-4xl mb-2">🔍</div>
          <p className="text-lg">نتیجه‌ای یافت نشد</p>
          <p className="text-sm text-gray-400 mt-1">لطفاً فیلترهای خود را تغییر دهید</p>
        </div>
      )}
    </div>
  );
}