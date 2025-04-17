import mongoose from "mongoose";
import { connectionSrt } from "@/app/lib/db";
import { Questionnaire } from "@/app/lib/model/questionnaire";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3000", // adjust if needed
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const POST = async (req) => {
  try {
    const { Q1, Q2, Q3, Q4, Q5, userId } = await req.json();

    if (![Q1, Q2, Q3, Q4, Q5, userId].every(Boolean)) {
      return new Response("Missing required fields", {
        status: 400,
        headers: corsHeaders,
      });
    }

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(connectionSrt);
    }

    const exists = await Questionnaire.findOne({ userId });
    if (exists) {
      return new Response(
        JSON.stringify({ success: false, message: "Questionnaire already submitted" }),
        {
          status: 409,
          headers: corsHeaders,
        }
      );
    }

    const questionnaire = await Questionnaire.create({
      Q1, Q2, Q3, Q4, Q5, userId,
    });

    return new Response(
      JSON.stringify({ success: true, data: questionnaire }),
      {
        status: 201,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );

  } catch (error) {
    console.error("Questionnaire Save Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to save questionnaire" }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
};

export const OPTIONS = async () => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
};
