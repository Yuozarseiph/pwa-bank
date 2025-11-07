// src/app/api/loan/route.js
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

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const bankSlug = searchParams.get('bankSlug');
    const percent = searchParams.get('percent');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    let loans = await readLoans();

    if (bankSlug) loans = loans.filter(l => l.bankSlug === bankSlug);
    if (percent) loans = loans.filter(l => Number(l.percent) === Number(toEnDigits(percent)));
    if (minPrice) loans = loans.filter(l => Number(l.price) >= Number(toEnDigits(minPrice)));
    if (maxPrice) loans = loans.filter(l => Number(l.price) <= Number(toEnDigits(maxPrice)));

    return NextResponse.json({ success: true, data: loans, total: loans.length });
  } catch {
    return NextResponse.json({ success: false, error: 'خطا در خواندن loans.json' }, { status: 500 });
  }
}
