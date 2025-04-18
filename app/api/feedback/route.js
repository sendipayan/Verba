// app/api/feedback/route.ts

import { NextResponse } from "next/server";

export async function POST(req) {
  const { transcript } = await req.json();

  if (!transcript) {
    return NextResponse.json({ error: "No transcript provided." }, { status: 400 });
  }

  const prompt = `
You are an expert public speaking coach. Analyze the following speech transcript and provide detailed feedback on:
- Clarity of communication
- Fluency and word choice
- Confidence and tone
- Structure and coherence

Also include suggestions to improve it.

Transcript:
"${transcript}"
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    return NextResponse.json({ feedback: data.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ error: "Server error while fetching feedback." }, { status: 500 });
  }
}
