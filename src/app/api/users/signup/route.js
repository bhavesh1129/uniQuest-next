import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "../../../../utils/mailer";

dbConnect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { name, email, password, image } = reqBody;

        // Check for existing user
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({
                error: "User already exists",
            }, { status: 422 });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword, image: image });
        const savedUser = await newUser.save();

        //verify email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        return NextResponse.json({
            message: "User created successfully",
            user: savedUser,
        }, { status: 201 });
    } catch (error) {
        console.error("Error while creating user ", error);
        return NextResponse.json({
            error: "Failed to create user",
        }, { status: 500 });
    }
}
