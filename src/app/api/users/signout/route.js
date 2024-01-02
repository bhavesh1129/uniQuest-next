import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Signout successful",
            success: true,
        });
        response.cookies.set("token", "", {
            httpOnly: true, expires: new Date(0)
        });
        return response;
    } catch (error) {
        console.error("Error while logging out the user ", error);
        return NextResponse.json({
            error: "Failed to Signout",
        }, { status: 500 });
    }
}