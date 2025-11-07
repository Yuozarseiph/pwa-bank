// src/app/api/loan/[id]/route.js
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const LOANS_PATH = path.join(process.cwd(), 'src', 'app', 'data', 'loans.json');

const toEnDigits = (v) => String(v).replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

async function readLoans() {
  const raw = await fs.readFile(LOANS_PATH, 'utf-8');
  const json = JSON.parse(raw);
  return Array.isArray(json.loans) ? json.loans : [];
}

export async function GET(_req, { params }) {
  try {
    const { id } = await params; // سازگار با الگوی جدید شما
    const numericId = Number(toEnDigits(id));
    const loans = await readLoans();
    const loan = loans.find((l) => Number(l.id) === numericId);

    if (!loan) return NextResponse.json({ success: false, error: 'وام یافت نشد' }, { status: 404 });
    return NextResponse.json({ success: true, data: loan });
  } catch {
    return NextResponse.json({ success: false, error: 'خطا در خواندن loans.json' }, { status: 500 });
  }
}
