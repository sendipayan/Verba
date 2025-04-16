import mongoose from "mongoose";
import { connectionSrt } from "@/app/lib/db";
import { Questionnaire } from "@/app/lib/model/questionnaire";

export default async function POST(request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return new Response("Missing userId", { status: 400 });
    }

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(connectionSrt, {
        dbName: "public_speaking",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    const question = await Questionnaire.findOne({ userId });

    if (!question) {
      return new Response("No question found", { status: 404 });
    }

    return new Response(JSON.stringify(question), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Questionnaire fetch error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
