import { NextResponse } from 'next/server';

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
    description: "ارائه وام قرض الحسنه با شرایط ویژه برای بازنشستگان و کارمندان دولت.",
    fullDescription: "این وام با بهترین شرایط و کمترین نرخ سود در بازار ارائه می‌شود...",
    contact: {
      phone: "۰۹۱۲۳۴۵۶۷۸۹",
      email: "loan@sepah-bank.ir",
      address: "مشهد، بلوار وکیل‌آباد، نبش خیابان ۱۵، بانک سپه",
    },
    stats: {
      views: 1247,
      time: "۱ ساعت پیش",
    }
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
    fullDescription: "وام مسکن ویژه برای خانواده‌های جوان...",
    contact: {
      phone: "۰۹۱۲۸۸۸۷۷۷۶",
      email: "housing@bmi.ir",
      address: "تهران، میدان ولیعصر، بانک ملی مرکزی",
    },
    stats: {
      views: 2134,
      time: "۲ ساعت پیش",
    }
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
    fullDescription: "وام خودرو با شرایط مناسب برای خرید خودروهای صفر و کارکرده...",
    contact: {
      phone: "۰۹۱۲۷۷۷۶۶۶۵",
      email: "car@bankmellat.ir",
      address: "اصفهان، میدان امام حسین، بانک ملت",
    },
    stats: {
      views: 892,
      time: "۳ ساعت پیش",
    }
  }
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const bank = searchParams.get('bank');
    const type = searchParams.get('type');

    let ads = Object.values(allAdsData);

    // Filter by bank
    if (bank) {
      ads = ads.filter(ad => ad.bank.name.includes(bank));
    }

    // Filter by type
    if (type) {
      ads = ads.filter(ad => ad.title.includes(type));
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedAds = ads.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: paginatedAds,
      pagination: {
        page,
        limit,
        total: ads.length,
        totalPages: Math.ceil(ads.length / limit)
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'خطا در دریافت آگهی‌ها' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'price', 'bank'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `فیلدهای اجباری پر نشده: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    const newAdId = Math.max(...Object.keys(allAdsData).map(Number)) + 1;

    const newAd = {
      id: newAdId,
      title: body.title,
      bank: body.bank,
      price: body.price,
      currency: body.currency || "تومان",
      description: body.description,
      fullDescription: body.fullDescription || body.description,
      contact: body.contact || {
        phone: "",
        email: "",
        address: ""
      },
      stats: {
        views: 0,
        time: "همین الان"
      },
      createdAt: new Date().toISOString()
    };

    allAdsData[newAdId] = newAd;

    return NextResponse.json({
      success: true,
      data: newAd,
      message: 'آگهی با موفقیت ایجاد شد'
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'خطا در ایجاد آگهی' },
      { status: 500 }
    );
  }
}