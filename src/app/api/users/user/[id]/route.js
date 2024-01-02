import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

dbConnect();

export async function DELETE(request, { params }) {
    const id = params.id;
    try {
        const deletedUser = await User.findByIdAndDelete({ _id: id });
        if (deletedUser.deletedCount === 0) {
            return NextResponse.json({ error: "User not found", status: 404 });
        }
        return NextResponse.json({ message: "User deleted successfully", status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error deleting user: " + error.message, status: 500 });
    }
};
