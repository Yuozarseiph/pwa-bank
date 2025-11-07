// src/app/api/users/[id]/route.js
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

export async function GET(_req, { params }) {
  try {
    const { id } = await params;
    const numericId = Number(toEnDigits(id));
    const users = await readUsers();
    const user = users.find(u => Number(u.id) === numericId);
    if (!user) return NextResponse.json({ success: false, error: 'کاربر یافت نشد' }, { status: 404 });
    return NextResponse.json({ success: true, data: user });
  } catch {
    return NextResponse.json({ success: false, error: 'خطا در خواندن users.json' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const numericId = Number(toEnDigits(id));
    const body = await request.json();

    const users = await readUsers();
    const idx = users.findIndex(u => Number(u.id) === numericId);
    if (idx === -1) return NextResponse.json({ success: false, error: 'کاربر یافت نشد' }, { status: 404 });

    // جلوگیری از تکرار ایمیل/تلفن
    const phoneNorm = body.phone ? toEnDigits(body.phone) : null;
    const conflict = users.find(u =>
      Number(u.id) !== numericId &&
      ((phoneNorm && toEnDigits(u.phone) === phoneNorm) || (body.email && u.email === body.email))
    );
    if (conflict) {
      return NextResponse.json(
        { success: false, error: 'شماره تلفن یا ایمیل قبلاً ثبت شده است' },
        { status: 400 }
      );
    }

    users[idx] = { ...users[idx], ...body, updatedAt: new Date().toISOString() };
    await writeUsers(users);

    return NextResponse.json({ success: true, data: users[idx], message: 'اطلاعات کاربر با موفقیت به‌روزرسانی شد' });
  } catch {
    return NextResponse.json({ success: false, error: 'خطا در به‌روزرسانی کاربر' }, { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  try {
    const { id } = await params;
    const numericId = Number(toEnDigits(id));
    const users = await readUsers();
    const idx = users.findIndex(u => Number(u.id) === numericId);
    if (idx === -1) return NextResponse.json({ success: false, error: 'کاربر یافت نشد' }, { status: 404 });

    const [deleted] = users.splice(idx, 1);
    await writeUsers(users);

    return NextResponse.json({ success: true, data: deleted, message: 'کاربر با موفقیت حذف شد' });
  } catch {
    return NextResponse.json({ success: false, error: 'خطا در حذف کاربر' }, { status: 500 });
  }
}
