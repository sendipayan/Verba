import { NextResponse } from "next/server";
import { connectionSrt } from "@/app/lib/db";
import mongoose from "mongoose";
import { User } from "@/app/lib/model/user";

export async function POST(request){

    const {name,email}=await request.json();
    mongoose.connect(connectionSrt)
    await User.create({name,email});
    return NextResponse.json({message: "User Registered"},{status: 201});
}

export async function GET(){
    mongoose.connect(connectionSrt)
    const data = await User.find();

    return NextResponse.json(data)
}