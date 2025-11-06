import { NextResponse } from "next/server";

const allAdsData = {
  1: {
    id: 1,
    title: "وام قرض الحسنه ۴۰۰ میلیون تومانی",
    bank: {
      name: "بانک سپه",
      logo: "/banks/sepah-low.png",
      rating: 4.8,
      verified: true,
      totalReviews: 2847,
    },
    price: "۴۰۰,۰۰۰,۰۰۰",
    currency: "تومان",
    description:
      "ارائه وام قرض الحسنه با شرایط ویژه برای بازنشستگان و کارمندان دولت.",
    fullDescription: `این وام با بهترین شرایط و کمترین نرخ سود در بازار ارائه می‌شود. متقاضیان می‌توانند تا سقف ۴۰۰ میلیون تومان از این تسهیلات استفاده کنند.

ویژگی‌های برجسته:
• پرداخت سریع ظرف ۴۸ ساعت پس از تایید مدارک
• عدم نیاز به ضامن یا وثیقه برای مبالغ تا ۱۰۰ میلیون
• امکان بازپرداخت انعطاف‌پذیر با اقساط ماهانه
• مشاوره رایگان توسط کارشناسان متخصص بانکی
• پشتیبانی ۲۴ ساعته در تمام روزهای هفته

شرایط دریافت:
• داشتن حداقل ۲ سال سابقه کار ثابت
• دریافت حقوق از طریق بانک (حداقل ۶ ماه)
• عدم چک برگشتی در سیستم بانکی
• سن بین ۲۵ تا ۶۵ سال`,
    details: [
      { label: "نوع وام", value: "قرض الحسنه" },
      { label: "مبلغ", value: "۴۰۰ میلیون تومان" },
      { label: "مدت بازپرداخت", value: "۱۲ تا ۶۰ ماه" },
      { label: "نرخ سود", value: "۴٪ سالیانه" },
      { label: "محدوده سنی", value: "۲۵ تا ۶۵ سال" },
      { label: "مدارک", value: "شناسنامه، فیش حقوقی" },
    ],
    contact: {
      phone: "۰۹۱۲۳۴۵۶۷۸۹",
      email: "loan@sepah-bank.ir",
      address: "مشهد، بلوار وکیل‌آباد، نبش خیابان ۱۵، بانک سپه",
    },
    stats: {
      views: 1247,
      time: "۱ ساعت پیش",
    },
    safetyTips: [
      "هرگز پیش‌پرداخت نکنید",
      "مدارک را فقط در شعبه تحویل دهید",
      "از طریق سایت رسمی اقدام کنید",
      "قرارداد را به دقت بخوانید",
    ],
    type: "قرض الحسنه",
    location: "خراسان رضوی",
  },
  2: {
    id: 2,
    title: "وام مسکن ۵۰۰ میلیونی",
    bank: {
      name: "بانک ملی",
      logo: "/banks/melli-low.png",
      rating: 4.6,
      verified: true,
      totalReviews: 1923,
    },
    price: "۵۰۰,۰۰۰,۰۰۰",
    currency: "تومان",
    description: "وام مسکن با سود پایین برای جوانان متأهل.",
    fullDescription: `وام مسکن ویژه برای خانواده‌های جوان که قصد خرید یا ساخت مسکن دارند.

ویژگی‌های برجسته:
• تا ۵۰۰ میلیون تومان وام
• بازپرداخت تا ۱۰ سال
• نرخ سود ترجیحی برای زوج‌های جوان
• امکان استفاده همزمان با سایر تسهیلات

شرایط دریافت:
• سن کمتر از ۴۰ سال
• متأهل بودن
• عدم مالکیت مسکن قبلی`,
    details: [
      { label: "نوع وام", value: "وام مسکن" },
      { label: "مبلغ", value: "۵۰۰ میلیون تومان" },
      { label: "مدت بازپرداخت", value: "تا ۱۰ سال" },
      { label: "نرخ سود", value: "۶٪ سالیانه" },
      { label: "محدوده سنی", value: "۲۰ تا ۴۰ سال" },
      { label: "مدارک", value: "شناسنامه، سند ملک" },
    ],
    contact: {
      phone: "۰۹۱۲۸۸۸۷۷۷۶",
      email: "housing@bmi.ir",
      address: "تهران، میدان ولیعصر، بانک ملی مرکزی",
    },
    stats: {
      views: 2134,
      time: "۲ ساعت پیش",
    },
    safetyTips: [
      "سند ملک را بررسی کنید",
      "از قیمت‌گذاری رسمی استفاده کنید",
      "مشاور حقوقی بگیرید",
      "قرارداد را با دقت بخوانید",
    ],
    type: "وام مسکن",
    location: "تهران",
  },
  3: {
    id: 3,
    title: "وام خودرو ۳۰۰ میلیونی",
    bank: {
      name: "بانک ملت",
      logo: "/banks/mellat-low.png",
      rating: 4.5,
      verified: true,
      totalReviews: 1456,
    },
    price: "۳۰۰,۰۰۰,۰۰۰",
    currency: "تومان",
    description: "خرید خودرو با وام بلندمدت و اقساط راحت.",
    fullDescription: `وام خودرو با شرایط مناسب برای خرید خودروهای صفر و کارکرده.

ویژگی‌های برجسته:
• تا ۳۰۰ میلیون تومان وام
• بازپرداخت تا ۵ سال
• بدون نیاز به ضامن تا ۱۵۰ میلیون
• تحویل فوری پس از تایید

شرایط دریافت:
• داشتن گواهینامه معتبر
• سابقه کار حداقل ۱ سال
• حقوق حداقل ۱۰ میلیون تومان`,
    details: [
      { label: "نوع وام", value: "وام خودرو" },
      { label: "مبلغ", value: "۳۰۰ میلیون تومان" },
      { label: "مدت بازپرداخت", value: "تا ۵ سال" },
      { label: "نرخ سود", value: "۵٪ سالیانه" },
      { label: "محدوده سنی", value: "۲۲ تا ۶۰ سال" },
      { label: "مدارک", value: "شناسنامه، گواهینامه" },
    ],
    contact: {
      phone: "۰۹۱۲۷۷۷۶۶۶۵",
      email: "car@bankmellat.ir",
      address: "اصفهان، میدان امام حسین، بانک ملت",
    },
    stats: {
      views: 892,
      time: "۳ ساعت پیش",
    },
    safetyTips: [
      "خودرو را کارشناسی کنید",
      "از قیمت بازار مطلع شوید",
      "بیمه خودرو الزامی است",
      "قرارداد را حتما بخوانید",
    ],
    type: "وام خودرو",
    location: "اصفهان",
  },
};

export async function GET(request, { params }) {
  try {
    console.log("🔍 API Called - Request URL:", request.url);

    const { id } = await params;
    console.log("📝 Received ID:", id);
    console.log("📝 Type of ID:", typeof id);

    if (!id) {
      console.log("❌ No ID provided");
      return NextResponse.json(
        { success: false, error: "آیدی آگهی الزامی است" },
        { status: 400 }
      );
    }

    // تبدیل id به string برای تطبیق با کلیدهای object
    const adId = String(id);
    console.log("🔍 Looking for ad with ID:", adId);
    console.log("📊 Available IDs:", Object.keys(allAdsData));

    const ad = allAdsData[adId];

    if (!ad) {
      console.log("❌ Ad not found for ID:", adId);
      return NextResponse.json(
        { success: false, error: "آگهی یافت نشد" },
        { status: 404 }
      );
    }

    console.log("✅ Ad found:", ad.title);

    // افزایش تعداد بازدیدها
    ad.stats.views += 1;

    return NextResponse.json({
      success: true,
      data: ad,
    });
  } catch (error) {
    console.error("❌ Error in API route:", error);
    console.error("❌ Error stack:", error.stack);

    return NextResponse.json(
      {
        success: false,
        error: "خطا در دریافت اطلاعات آگهی",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const adId = String(id);

    if (!allAdsData[adId]) {
      return NextResponse.json(
        { success: false, error: "آگهی یافت نشد" },
        { status: 404 }
      );
    }

    // Update ad
    allAdsData[adId] = {
      ...allAdsData[adId],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: allAdsData[adId],
      message: "آگهی با موفقیت به‌روزرسانی شد",
    });
  } catch (error) {
    console.error("Error in PUT:", error);
    return NextResponse.json(
      { success: false, error: "خطا در به‌روزرسانی آگهی" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const adId = String(id);

    if (!allAdsData[adId]) {
      return NextResponse.json(
        { success: false, error: "آگهی یافت نشد" },
        { status: 404 }
      );
    }

    const deletedAd = allAdsData[adId];
    delete allAdsData[adId];

    return NextResponse.json({
      success: true,
      data: deletedAd,
      message: "آگهی با موفقیت حذف شد",
    });
  } catch (error) {
    console.error("Error in DELETE:", error);
    return NextResponse.json(
      { success: false, error: "خطا در حذف آگهی" },
      { status: 500 }
    );
  }
}
