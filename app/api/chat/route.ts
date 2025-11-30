// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

const LMSTUDIO_API_BASE = process.env.LMSTUDIO_API_BASE!;
const LMSTUDIO_MODEL = process.env.LMSTUDIO_MODEL!;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const res = await fetch(`${LMSTUDIO_API_BASE}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: LMSTUDIO_MODEL,
        messages,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("LM Studio error:", text);
      return NextResponse.json(
        { error: "LM Studio request failed" },
        { status: 500 },
      );
    }

    const data = await res.json();
    const content =
      data.choices?.[0]?.message?.content ?? "No response from model.";

    return NextResponse.json({ content });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 },
    );
  }
}
