import { NextRequest, NextResponse } from "next/server";
import { isLocale, LOCALE_COOKIE } from "@/i18n/config";

// Mirrors the old `GET /set-lang/:lng` behaviour from the Express app,
// but as a Next.js Route Handler owned by the frontend.
export async function POST(request: NextRequest) {
  const { locale } = await request.json().catch(() => ({ locale: null }));

  if (!isLocale(locale)) {
    return NextResponse.json({ error: "Unsupported language" }, { status: 400 });
  }

  const response = NextResponse.json({ locale });
  response.cookies.set(LOCALE_COOKIE, locale, {
    maxAge: 31536000, // 1 year, same as before
    httpOnly: false,
    sameSite: "lax",
  });

  return response;
}
