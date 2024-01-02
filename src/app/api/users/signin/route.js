import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Check for existing user
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({
                error: "User don't exists",
            }, { status: 400 });
        }

        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }

        //create token data
        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email
        }

        //create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "SignIn successful",
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

    } catch (error) {
        console.error("Error while signing the user ", error);
        return NextResponse.json({
            error: "Failed to signin",
        }, { status: 500 });
    }
}
