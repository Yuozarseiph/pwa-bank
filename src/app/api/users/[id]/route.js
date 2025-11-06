import { NextResponse } from "next/server";

let users = [
  {
    id: 1,
    name: "علی محمدی",
    phone: "09123456789",
    email: "ali.mohammadi@example.com",
    role: "user",
    createdAt: "2024-01-15T10:30:00.000Z",
    profile: {
      avatar: "/avatars/user1.jpg",
      location: "تهران",
      bio: "علاقه‌مند به سرمایه‌گذاری و امور مالی",
    },
  },
  {
    id: 2,
    name: "فاطمه احمدی",
    phone: "09129876543",
    email: "fateme.ahmadi@example.com",
    role: "admin",
    createdAt: "2024-01-10T14:20:00.000Z",
    profile: {
      avatar: "/avatars/user2.jpg",
      location: "مشهد",
      bio: "متخصص امور بانکی و مالی",
    },
  },
  {
    id: 3,
    name: "محمد رضایی",
    phone: "09151234567",
    email: "mohammad.rezaei@example.com",
    role: "user",
    createdAt: "2024-01-20T09:15:00.000Z",
    profile: {
      avatar: "/avatars/user3.jpg",
      location: "اصفهان",
      bio: "کارشناس امور وام و تسهیلات",
    },
  },
  {
    id: 4,
    name: "زهرا کریمی",
    phone: "09167654321",
    email: "zahra.karimi@example.com",
    role: "user",
    createdAt: "2024-01-25T16:45:00.000Z",
    profile: {
      avatar: "/avatars/user4.jpg",
      location: "شیراز",
      bio: "مشاور مالی و سرمایه‌گذاری",
    },
  },
  {
    id: 5,
    name: "حسین نجفی",
    phone: "09158765432",
    email: "hossein.najafi@example.com",
    role: "agent",
    createdAt: "2024-01-18T11:30:00.000Z",
    profile: {
      avatar: "/avatars/user5.jpg",
      location: "تبریز",
      bio: "نماینده رسمی بانک‌های مختلف",
    },
  },
];
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const user = users.find((user) => user.id === parseInt(id));

    if (!user) {
      return NextResponse.json(
        { success: false, error: "کاربر یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "خطا در دریافت اطلاعات کاربر" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const userIndex = users.findIndex((user) => user.id === parseInt(id));

    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, error: "کاربر یافت نشد" },
        { status: 404 }
      );
    }

    // Check if phone or email already exists (excluding current user)
    const existingUser = users.find(
      (user) =>
        (user.phone === body.phone || user.email === body.email) &&
        user.id !== parseInt(id)
    );

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "شماره تلفن یا ایمیل قبلاً ثبت شده است" },
        { status: 400 }
      );
    }

    // Update user
    users[userIndex] = {
      ...users[userIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: users[userIndex],
      message: "اطلاعات کاربر با موفقیت به‌روزرسانی شد",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "خطا در به‌روزرسانی کاربر" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const userIndex = users.findIndex((user) => user.id === parseInt(id));

    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, error: "کاربر یافت نشد" },
        { status: 404 }
      );
    }

    const deletedUser = users.splice(userIndex, 1);

    return NextResponse.json({
      success: true,
      data: deletedUser[0],
      message: "کاربر با موفقیت حذف شد",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "خطا در حذف کاربر" },
      { status: 500 }
    );
  }
}
