// src/app/api/ads/route.js
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const ADS_PATH = path.join(process.cwd(), "src", "app", "data", "ads.json");

async function readAds() {
  const raw = await fs.readFile(ADS_PATH, "utf-8");
  const json = JSON.parse(raw);
  return Array.isArray(json.ads) ? json.ads : [];
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const bank = searchParams.get("bank");
    const type = searchParams.get("type");

    let data = await readAds();

    if (bank) data = data.filter((a) => a?.bank?.name?.includes(bank));
    if (type)
      data = data.filter(
        (a) => a?.type?.includes(type) || a?.title?.includes(type)
      );

    const start = (page - 1) * limit;

    return NextResponse.json({
      success: true,
      data: data.slice(start, start + limit),
      pagination: {
        page,
        limit,
        total: data.length,
        totalPages: Math.ceil(data.length / limit),
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "خطا در خواندن ads.json" },
      { status: 500 }
    );
  }
}
