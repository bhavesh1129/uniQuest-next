import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { getDataFromToken } from "@/utils/getDataFromToken";

dbConnect();

export async function GET(request) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");
        if (!user) {
            return NextResponse.json({ error: "User not found", status: 404 })
        }
        return NextResponse.json({ message: "User found", status: 200, data: user });

    } catch (error) {
        return NextResponse.json({ error: "errrrr " + error.message, status: 500 })
    }
}