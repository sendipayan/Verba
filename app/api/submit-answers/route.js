import mongoose from "mongoose";
import { connectionSrt } from "@/app/lib/db";
import { Questionnaire } from "@/app/lib/model/questionnaire";

export const POST = async (req) => {
  try {
    const { Q1, Q2, Q3, Q4, Q5, userId } = await req.json();

    if (![Q1, Q2, Q3, Q4, Q5, userId].every(Boolean)) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Ensure DB is connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(connectionSrt);
    }
    const exits = await Questionnaire.findOne({ userId });
    if (!exits) {
      const questionnaire = await Questionnaire.create({
        Q1,
        Q2,
        Q3,
        Q4,
        Q5,
        userId,
      });

      return new Response(
        JSON.stringify({ success: true, data: questionnaire }),
        {
          status: 201,
        }
      );
    }
  } catch (error) {
    console.error("Questionnaire Save Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to save questionnaire" }),
      {
        status: 500,
      }
    );
  }
};
