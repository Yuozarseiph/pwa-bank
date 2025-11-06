import { NextResponse } from 'next/server';

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
      bio: "علاقه‌مند به سرمایه‌گذاری و امور مالی"
    }
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
      bio: "متخصص امور بانکی و مالی"
    }
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
      bio: "کارشناس امور وام و تسهیلات"
    }
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
      bio: "مشاور مالی و سرمایه‌گذاری"
    }
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
      bio: "نماینده رسمی بانک‌های مختلف"
    }
  }
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const role = searchParams.get('role');
    const search = searchParams.get('search');

    let filteredUsers = users;

    // Filter by role
    if (role) {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }

    // Search by name or email
    if (search) {
      filteredUsers = filteredUsers.filter(user => 
        user.name.includes(search) || 
        user.email.includes(search) ||
        user.phone.includes(search)
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: paginatedUsers,
      pagination: {
        page,
        limit,
        total: filteredUsers.length,
        totalPages: Math.ceil(filteredUsers.length / limit)
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'خطا در دریافت کاربران' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'phone', 'email'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `فیلدهای اجباری پر نشده: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Check if phone or email already exists
    const existingUser = users.find(user => 
      user.phone === body.phone || user.email === body.email
    );

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'شماره تلفن یا ایمیل قبلاً ثبت شده است' },
        { status: 400 }
      );
    }

    const newUser = {
      id: users.length + 1,
      name: body.name,
      phone: body.phone,
      email: body.email,
      role: body.role || "user",
      createdAt: new Date().toISOString(),
      profile: body.profile || {
        avatar: "/avatars/default.jpg",
        location: "",
        bio: ""
      }
    };

    users.push(newUser);

    return NextResponse.json({
      success: true,
      data: newUser,
      message: 'کاربر با موفقیت ایجاد شد'
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'خطا در ایجاد کاربر' },
      { status: 500 }
    );
  }
}