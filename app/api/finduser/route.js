import mongoose from "mongoose";
import { connectionSrt } from "@/app/lib/db";
import { Questionnaire } from "@/app/lib/model/questionnaire";

export const POST = async (req) => {
  const { userId } = await req.json();

  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(connectionSrt);
    }

    const exists = await Questionnaire.findOne({ userId });

    if (!exists) {
      return new Response(
        JSON.stringify({ success: false, message: "No questionnaire found" }),
        { status: 404 }
      );
    }

    // ✅ Return the existing questionnaire
    return new Response(
      JSON.stringify({ success: true, data: exists }),
      { status: 200 }
    );

  } catch (error) {
    console.error("User Find Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to find questionnaire" }),
      { status: 500 }
    );
  }
};
