import { NextResponse } from "next/server";
import { connectionSrt } from "@/app/lib/db";
import mongoose from "mongoose";
import { User } from "@/app/lib/model/user";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3000", // update for production
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function POST(request) {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ message: "Missing fields" }, {
        status: 400,
        headers: corsHeaders,
      });
    }

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(connectionSrt);
    }

    await User.create({ name, email });

    return NextResponse.json(
      { message: "User Registered" },
      { status: 201, headers: corsHeaders }
    );
  } catch (err) {
    console.error("User creation error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(connectionSrt);
    }

    const data = await User.find();

    return NextResponse.json(data, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    console.error("User fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// For preflight CORS check
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}
