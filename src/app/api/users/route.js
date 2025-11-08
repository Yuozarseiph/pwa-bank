// src/app/api/users/route.js

import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const USERS_PATH = path.join(process.cwd(), 'src', 'app', 'data', 'users.json');

const toEnDigits = (v) => String(v ?? '').replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

async function readUsers() {
  const raw = await fs.readFile(USERS_PATH, 'utf-8');
  const json = JSON.parse(raw);
  return Array.isArray(json.users) ? json.users : [];
}

async function writeUsers(users) {
  await fs.writeFile(USERS_PATH, JSON.stringify({ users }, null, 2), 'utf-8');
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const role = searchParams.get('role');
    const search = searchParams.get('search');

    let users = await readUsers();

    if (role) users = users.filter(u => u.role === role);

    if (search) {
      const q = toEnDigits(search);
      users = users.filter(u =>
        (u.name || '').includes(search) ||
        (u.email || '').includes(search) ||
        toEnDigits(u.phone || '').includes(q)
      );
    }

    const start = (page - 1) * limit;
    const data = users.slice(start, start + limit);

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total: users.length,
        totalPages: Math.ceil(users.length / limit),
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: 'خطا در خواندن users.json' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const required = ['name', 'phone', 'email'];
    const missing = required.filter(f => !body[f]);

    if (missing.length) {
      return NextResponse.json(
        { success: false, error: `فیلدهای اجباری پر نشده: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    const users = await readUsers();
    const phoneNorm = toEnDigits(body.phone);
    const exists = users.find(u => toEnDigits(u.phone) === phoneNorm || (u.email || '') === body.email);

    if (exists) {
      return NextResponse.json(
        { success: false, error: 'شماره تلفن یا ایمیل قبلاً ثبت شده است' },
        { status: 400 }
      );
    }

    const nextId = (users.reduce((m, u) => Math.max(m, Number(u.id) || 0), 0) + 1);
    
    const newUser = {
      id: nextId,
      name: body.name,
      phone: body.phone,
      email: body.email,
      password: body.password || '123456', // Default password
      role: body.role || 'user',
      createdAt: new Date().toISOString(),
      profile: body.profile || { avatar: '/avatars/default.jpg', location: '', bio: '' },
    };

    users.push(newUser);
    await writeUsers(users);

    return NextResponse.json({ success: true, data: newUser, message: 'کاربر با موفقیت ایجاد شد' }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'خطا در ایجاد کاربر' }, { status: 500 });
  }
}
