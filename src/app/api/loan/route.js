import { NextResponse } from 'next/server';

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

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const bankSlug = searchParams.get('bankSlug');
    const percent = searchParams.get('percent');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    let filteredLoans = loanBank;

    // Filter by bank slug
    if (bankSlug) {
      filteredLoans = filteredLoans.filter(loan => loan.bankSlug === bankSlug);
    }

    // Filter by percent
    if (percent) {
      filteredLoans = filteredLoans.filter(loan => loan.percent === parseInt(percent));
    }

    // Filter by price range
    if (minPrice) {
      filteredLoans = filteredLoans.filter(loan => loan.price >= parseInt(minPrice));
    }

    if (maxPrice) {
      filteredLoans = filteredLoans.filter(loan => loan.price <= parseInt(maxPrice));
    }

    return NextResponse.json({
      success: true,
      data: filteredLoans,
      total: filteredLoans.length
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'خطا در دریافت اطلاعات وام‌ها' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['bank', 'bankSlug', 'percent', 'price', 'description'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `فیلدهای اجباری پر نشده: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    const newLoan = {
      id: loanBank.length + 1,
      icon: body.icon || "/banks/default-bank.png",
      bank: body.bank,
      bankSlug: body.bankSlug,
      percent: body.percent,
      price: body.price,
      description: body.description,
      createdAt: new Date().toISOString()
    };

    loanBank.push(newLoan);

    return NextResponse.json({
      success: true,
      data: newLoan,
      message: 'وام با موفقیت ایجاد شد'
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'خطا در ایجاد وام' },
      { status: 500 }
    );
  }
}