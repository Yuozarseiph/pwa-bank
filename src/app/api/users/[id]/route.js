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

    if (!user) {
      return NextResponse.json({ success: false, error: 'کاربر یافت نشد' }, { status: 404 });
    }

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
    const userIndex = users.findIndex(u => Number(u.id) === numericId);

    if (userIndex === -1) {
      return NextResponse.json({ success: false, error: 'کاربر یافت نشد' }, { status: 404 });
    }

    // Update only allowed fields
    const updatedUser = {
      ...users[userIndex],
      ...(body.name && { name: body.name }),
      ...(body.phone && { phone: body.phone }),
      ...(body.password && { password: body.password }),
      ...(body.adsCount !== undefined && { adsCount: body.adsCount }),
    };

    users[userIndex] = updatedUser;
    await writeUsers(users);

    return NextResponse.json({ success: true, data: updatedUser, message: 'کاربر با موفقیت به‌روزرسانی شد' });
  } catch {
    return NextResponse.json({ success: false, error: 'خطا در به‌روزرسانی کاربر' }, { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  try {
    const { id } = await params;
    const numericId = Number(toEnDigits(id));
    const users = await readUsers();
    const filtered = users.filter(u => Number(u.id) !== numericId);

    if (filtered.length === users.length) {
      return NextResponse.json({ success: false, error: 'کاربر یافت نشد' }, { status: 404 });
    }

    await writeUsers(filtered);
    return NextResponse.json({ success: true, message: 'کاربر با موفقیت حذف شد' });
  } catch {
    return NextResponse.json({ success: false, error: 'خطا در حذف کاربر' }, { status: 500 });
  }
}
