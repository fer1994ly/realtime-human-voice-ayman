import { fetchAccessToken } from "hume";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Log environment variables (excluding sensitive parts)
    console.log("API Key length:", process.env.HUME_API_KEY?.length);
    console.log("Secret Key length:", process.env.HUME_SECRET_KEY?.length);

    if (!process.env.HUME_API_KEY || !process.env.HUME_SECRET_KEY) {
      return NextResponse.json(
        { error: "Missing API credentials" },
        { status: 500 }
      );
    }

    const accessToken = await fetchAccessToken({
      apiKey: process.env.HUME_API_KEY,
      secretKey: process.env.HUME_SECRET_KEY,
    });

    if (!accessToken) {
      return NextResponse.json(
        { error: "Token generation returned null - please check your API credentials" },
        { status: 500 }
      );
    }

    return NextResponse.json({ accessToken });
  } catch (error) {
    console.error("Token generation error details:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 