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

A score from 1 to 10 for each of the following:
   - Clarity of communication
   - Fluency and word choice
   - Confidence and tone
   - Structure and coherence


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
          "X-Title": "Verba", // replace with your actual app name
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1-distill-qwen-14b:free",
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

    const feedback = data.choices[0].message
      ? data.choices[0].message.content
      : data.choices[0].text;

    return NextResponse.json({ feedback: feedback.trim() });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
