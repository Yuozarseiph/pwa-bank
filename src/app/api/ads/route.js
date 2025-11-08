// src/app/api/ads/route.js

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DETAILS_PATH = path.join(
  process.cwd(),
  "src",
  "app",
  "data",
  "details.json"
);

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const ADS_PATH = path.join(process.cwd(), "src", "app", "data", "ads.json");

async function readAds() {
  const raw = await fs.readFile(ADS_PATH, "utf-8");
  const json = JSON.parse(raw);
  return Array.isArray(json.ads) ? json.ads : [];
}

async function readDetails() {
  const raw = await fs.readFile(DETAILS_PATH, "utf-8");
  const json = JSON.parse(raw);
  const detailsObj =
    json && typeof json === "object" ? json.details : undefined;
  return detailsObj && typeof detailsObj === "object" ? detailsObj : {};
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

function validatePayload(payload) {
  const required = [
    "title",
    "bank",
    "price",
    "currency",
    "description",
    "fullDescription",
    "contact",
    "type",
    "location",
  ];

  const missing = required.filter((k) => !(k in payload));
  if (missing.length) {
    return {
      ok: false,
      error: `مقادیر ارسالی ناقص است: ${missing.join(", ")}`,
    };
  }

  if (!payload.bank || typeof payload.bank !== "object" || !payload.bank.name) {
    return { ok: false, error: "bank باید آبجکت معتبر با فیلد name باشد." };
  }

  if (!payload.contact || typeof payload.contact !== "object") {
    return { ok: false, error: "contact باید آبجکت معتبر باشد." };
  }

  return { ok: true };
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const v = validatePayload(payload);
    if (!v.ok) {
      return NextResponse.json(
        { success: false, error: v.error },
        { status: 400 }
      );
    }

    // Read current data
    const [adsArr, detailsObj] = await Promise.all([readAds(), readDetails()]);

    // Generate new id
    const maxId = adsArr.length
      ? Math.max(...adsArr.map((a) => Number(a.id) || 0))
      : 0;
    const newId = maxId + 1;

    // Build records
    const nowISO = new Date().toISOString();

    // Default stats if not provided
    const stats = payload.stats || {
      views: 0,
      likes: 0,
      shares: 0,
    };

    // Record for ads.json (list item)
    const newAdsItem = {
      id: newId,
      title: payload.title,
      bank: payload.bank,
      price: payload.price,
      currency: payload.currency,
      description: payload.description,
      fullDescription: payload.fullDescription,
      contact: payload.contact,
      stats: stats,
      type: payload.type,
      location: payload.location,
      createdAt: nowISO,
    };

    // Record for details.json (full detail under string key)
    const newDetailItem = {
      id: newId,
      title: payload.title,
      bank: payload.bank,
      price: payload.price,
      currency: payload.currency,
      description: payload.description,
      fullDescription: payload.fullDescription,
      details:
        payload.details && Array.isArray(payload.details)
          ? payload.details
          : [],
      contact: payload.contact,
      stats: stats,
      safetyTips: Array.isArray(payload.safetyTips) ? payload.safetyTips : [],
      type: payload.type,
      location: payload.location,
    };

    // Mutate in-memory structures
    const updatedAds = { ads: [...adsArr, newAdsItem] };
    const updatedDetails = {
      details: {
        ...detailsObj,
        [String(newId)]: newDetailItem,
      },
    };

    // Persist both files
    await Promise.all([
      fs.writeFile(
        ADS_PATH,
        JSON.stringify(updatedAds, null, 2) + "\n",
        "utf-8"
      ),
      fs.writeFile(
        DETAILS_PATH,
        JSON.stringify(updatedDetails, null, 2) + "\n",
        "utf-8"
      ),
    ]);

    // Respond
    return NextResponse.json(
      { success: true, id: newId, data: newAdsItem },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error in POST /api/ads:", err);
    return NextResponse.json(
      { success: false, error: "خطا در پردازش درخواست یا نوشتن فایلها." },
      { status: 500 }
    );
  }
}
