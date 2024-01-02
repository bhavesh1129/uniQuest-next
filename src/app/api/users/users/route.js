import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

dbConnect();

export async function GET(request) {
    try {
        const users = await User.find();
        if (!users) {
            return NextResponse.json({ error: "Users not found", status: 404 })
        }
        return NextResponse.json({ message: "Users found", status: 200, data: users });

    } catch (error) {
        return NextResponse.json({ error: "errrrr " + error.message, status: 500 })
    }
}