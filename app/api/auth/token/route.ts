import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (!process.env.HUGGINGFACE_API_KEY) {
      return NextResponse.json(
        { error: "Missing Hugging Face API key" },
        { status: 500 }
      );
    }

    // Return the API key directly as we'll use it for Hugging Face endpoints
    return NextResponse.json({ accessToken: process.env.HUGGINGFACE_API_KEY });
  } catch (error) {
    console.error("Token retrieval error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 