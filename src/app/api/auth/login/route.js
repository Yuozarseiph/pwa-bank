// src/app/api/auth/login/route.js

import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const USERS_PATH = path.join(process.cwd(), 'src', 'app', 'data', 'users.json');

const toEnDigits = (v) => String(v ?? '').replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

async function readUsers() {
  const raw = await fs.readFile(USERS_PATH, 'utf-8');
  const json = JSON.parse(raw);
  return Array.isArray(json.users) ? json.users : [];
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { phone, password } = body;

    if (!phone || !password) {
      return NextResponse.json(
        { success: false, error: 'شماره تلفن و رمز عبور الزامی است' },
        { status: 400 }
      );
    }

    const users = await readUsers();
    const phoneNorm = toEnDigits(phone);
    const user = users.find(u => toEnDigits(u.phone) === phoneNorm);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'کاربر یافت نشد' },
        { status: 404 }
      );
    }

    if (user.password !== password) {
      return NextResponse.json(
        { success: false, error: 'رمز عبور اشتباه است' },
        { status: 401 }
      );
    }

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      success: true,
      data: userWithoutPassword,
      message: 'ورود موفقیت‌آمیز بود'
    });

  } catch {
    return NextResponse.json(
      { success: false, error: 'خطا در ورود' },
      { status: 500 }
    );
  }
}
