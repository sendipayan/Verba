import mongoose from "mongoose";
import { connectionSrt } from "@/app/lib/db";
import { Questionnaire } from "@/app/lib/model/questionnaire";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3000",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function POST(request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return new Response("Missing userId", {
        status: 400,
        headers: corsHeaders,
      });
    }

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(connectionSrt);
    }

    const question = await Questionnaire.findOne({ userId });

    if (!question) {
      return new Response("No question found", {
        status: 404,
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify(question), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Questionnaire fetch error:", error);
    return new Response("Internal Server Error", {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}
