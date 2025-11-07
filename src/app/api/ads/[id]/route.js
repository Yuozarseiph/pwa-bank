// src/app/api/ads/[id]/route.js
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const ADS_PATH = path.join(process.cwd(), 'src', 'app', 'data', 'ads.json');
const DETAILS_PATH = path.join(process.cwd(), 'src', 'app', 'data', 'details.json');

const toEnDigits = (v) => String(v).replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw);
}

export async function GET(_req, { params }) {
  try {
    const { id } = await params;
    const numericId = Number(toEnDigits(id));
    const idKey = String(numericId);

    const [adsJson, detailsJson] = await Promise.all([
      readJson(ADS_PATH),
      readJson(DETAILS_PATH),
    ]);

    const ads = Array.isArray(adsJson.ads) ? adsJson.ads : [];
    const base = ads.find(a => Number(a?.id) === numericId);

    const detailsMap = detailsJson?.details || {};
    const detail = detailsMap[idKey];

    if (!base && !detail) {
      return NextResponse.json({ success: false, error: 'آگهی یافت نشد' }, { status: 404 });
    }

    const merged = { ...(base || {}), ...(detail || {}) };
    if (merged?.stats?.views != null) {
      merged.stats = { ...merged.stats, views: Number(merged.stats.views) + 1 };
    }

    return NextResponse.json({ success: true, data: merged });
  } catch {
    return NextResponse.json({ success: false, error: 'خطا در خواندن details.json' }, { status: 500 });
  }
}
