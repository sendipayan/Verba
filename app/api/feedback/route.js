import { NextResponse } from "next/server";


export async function POST(req) {
  const { transcript } = await req.json();

  if (!transcript) {
    return NextResponse.json(
      { error: "No transcript provided." },
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

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000", // required
          "X-Title": "YourAppName", // required
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat:free", // or "mistralai/mixtral-8x7b-instruct"
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    // Check the response format (ensure the structure is compatible with the OpenAI version you're using)
    const feedback = data.choices[0].message
      ? data.choices[0].message.content
      : data.choices[0].text;

      
    return NextResponse.json({ feedback });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return NextResponse.json(
      { error: "Server error while fetching feedback." },
      { status: 500 }
    );
  }
}
