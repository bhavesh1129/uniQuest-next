import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import jwt from 'jsonwebtoken';

dbConnect();

export async function GET(request) {
    try {
        const token = request.cookies.token;
        if (!token) {
            return NextResponse.json({ error: "Token not found in cookies", status: 401 });
        }
        const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodeToken.id;
        const user = await User.findOne({ _id: userId }).select("-password");
        if (!user) {
            return NextResponse.json({ error: "User not found", status: 404 });
        }
        return NextResponse.json({ message: "User found", status: 200, data: user });
    } catch (error) {
        return NextResponse.json({ error: "Error: " + error.message, status: 500 });
    }
}
