import { NextResponse } from "next/server";

export async function POST(req) {
  const { transcript } = await req.json();

  if (!transcript || transcript.trim().length < 10) {
    return NextResponse.json(
      { feedback: "Please speak a bit more to receive feedback." },
      { status: 400 }
    );
  }

  const prompt = `
You are an expert public speaking coach. Analyze the following speech transcript and provide:

1. A score from 1 to 10 for each of the following:
   - Clarity of communication
   - Fluency and word choice
   - Confidence and tone
   - Structure and coherence

2. A paragraph of feedback explaining each score in one line.

3. Suggestions to improve the speech very briefly but with key points.

Transcript:
${transcript}
  `;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 9000); // 9 seconds

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "HTTP-Referer": "https://verba-dip.vercel.app", // required
          "X-Title": "Verba", // replace with your actual app name
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat:free",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    const feedback = data.choices[0].message
      ? data.choices[0].message.content
      : data.choices[0].text;

    return NextResponse.json({ feedback: feedback.trim() });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    const errorMessage =
      error.name === "AbortError"
        ? "The feedback request timed out. Please try again."
        : "Server error while fetching feedback.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
