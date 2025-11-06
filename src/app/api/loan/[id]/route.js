import { NextResponse } from "next/server";

const loanBank = [
  {
    id: 1,
    icon: "/banks/melli-low.png",
    bank: "ملی",
    bankSlug: "melli",
    percent: 0,
    price: 15000000,
    description: "وام قرض الحسنه بدون بهره",
  },
  {
    id: 2,
    icon: "/banks/melli-low.png",
    bank: "ملی",
    bankSlug: "melli",
    percent: 4,
    price: 25000000,
    description: "وام مسکن با سود کم",
  },
  {
    id: 3,
    icon: "/banks/melli-low.png",
    bank: "ملی",
    bankSlug: "melli",
    percent: 18,
    price: 30000000,
    description: "وام خودرو با اقساط 36 ماهه",
  },
  {
    id: 4,
    icon: "/banks/melli-low.png",
    bank: "ملی",
    bankSlug: "melli",
    percent: 0,
    price: 20000000,
    description: "وام دانشجویی بدون کارمزد",
  },
  {
    id: 5,
    icon: "/banks/melli-low.png",
    bank: "ملی",
    bankSlug: "melli",
    percent: 4,
    price: 18000000,
    description: "وام ازدواج با شرایط ویژه",
  },
  {
    id: 6,
    icon: "/banks/melli-low.png",
    bank: "ملی",
    bankSlug: "melli",
    percent: 20,
    price: 40000000,
    description: "وام مسکن با بازپرداخت طولانی",
  },
  {
    id: 7,
    icon: "/banks/melli-low.png",
    bank: "ملی",
    bankSlug: "melli",
    percent: 24,
    price: 22000000,
    description: "وام درمان و پزشکی",
  },
  {
    id: 8,
    icon: "/banks/sepah-low.png",
    bank: "سپه",
    bankSlug: "sepah",
    percent: 0,
    price: 28000000,
    description: "وام نوسازی مسکن بدون کارمزد",
  },
  {
    id: 9,
    icon: "/banks/sepah-low.png",
    bank: "سپه",
    bankSlug: "sepah",
    percent: 4,
    price: 10000000,
    description: "وام قرض الحسنه ویژه",
  },
  {
    id: 10,
    icon: "/banks/mellat-low.png",
    bank: "ملت",
    bankSlug: "mellat",
    percent: 18,
    price: 35000000,
    description: "وام خودرو با اقساط بلندمدت",
  },
  {
    id: 11,
    icon: "/banks/mellat-low.png",
    bank: "ملت",
    bankSlug: "mellat",
    percent: 20,
    price: 15000000,
    description: "وام ازدواج با ضمانت ساده",
  },
  {
    id: 12,
    icon: "/banks/iran-zamin-low.png",
    bank: "ایران زمین",
    bankSlug: "iran-zamin",
    percent: 24,
    price: 50000000,
    description: "وام تجاری برای کسب و کار",
  },
  {
    id: 13,
    icon: "/banks/saderat-low.png",
    bank: "صادرات",
    bankSlug: "saderat",
    percent: 4,
    price: 32000000,
    description: "وام مسکن با کارمزد پایین",
  },
  {
    id: 14,
    icon: "/banks/blu-bank-low.png",
    bank: "بلو بانک",
    bankSlug: "blu-bank",
    percent: 24,
    price: 12000000,
    description: "وام سفر با شرایط آسان",
  },
  {
    id: 15,
    icon: "/banks/bank-refah-low.png",
    bank: "رفاه",
    bankSlug: "refah",
    percent: 18,
    price: 16000000,
    description: "وام بازنشستگی",
  },
  {
    id: 16,
    icon: "/banks/Bank-Mehr-Iran-low.png",
    bank: "مهر ایران",
    bankSlug: "mehr-iran",
    percent: 20,
    price: 26000000,
    description: "وام خرید مسکن",
  },
  {
    id: 17,
    icon: "/banks/bank-saman-low.png",
    bank: "سامان",
    bankSlug: "saman",
    percent: 24,
    price: 38000000,
    description: "وام سرمایه گذاری",
  },
  {
    id: 18,
    icon: "/banks/bank-refah-low.png",
    bank: "رفاه",
    bankSlug: "refah",
    percent: 0,
    price: 14000000,
    description: "وام تحصیلی بدون کارمزد",
  },
  {
    id: 19,
    icon: "/banks/Bank-Mehr-Iran-low.png",
    bank: "مهر ایران",
    bankSlug: "mehr-iran",
    percent: 18,
    price: 19000000,
    description: "وام خودروی کارکرده",
  },
  {
    id: 20,
    icon: "/banks/bank-saman-low.png",
    bank: "سامان",
    bankSlug: "saman",
    percent: 24,
    price: 45000000,
    description: "وام راه اندازی کسب و کار",
  },
];

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    console.log("🔍 دریافت وام با آیدی:", id);

    if (!id) {
      return NextResponse.json(
        { success: false, error: "آیدی وام الزامی است" },
        { status: 400 }
      );
    }

    const loan = loanBank.find((item) => item.id === parseInt(id));

    if (!loan) {
      return NextResponse.json(
        { success: false, error: "وام یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: loan,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "خطا در دریافت اطلاعات وام" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!allAdsData[id]) {
      return NextResponse.json(
        { success: false, error: "آگهی یافت نشد" },
        { status: 404 }
      );
    }

    // Update ad
    allAdsData[id] = {
      ...allAdsData[id],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: allAdsData[id],
      message: "آگهی با موفقیت به‌روزرسانی شد",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "خطا در به‌روزرسانی آگهی" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    if (!allAdsData[id]) {
      return NextResponse.json(
        { success: false, error: "آگهی یافت نشد" },
        { status: 404 }
      );
    }

    const deletedAd = allAdsData[id];
    delete allAdsData[id];

    return NextResponse.json({
      success: true,
      data: deletedAd,
      message: "آگهی با موفقیت حذف شد",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "خطا در حذف آگهی" },
      { status: 500 }
    );
  }
}
