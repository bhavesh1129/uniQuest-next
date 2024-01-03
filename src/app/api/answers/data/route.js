import Answer from "@/models/questionModel";
import { dbConnect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

dbConnect();

// export const GET = async (request) => {
//     try {
//         const answers = await Answer.find();
//         return NextResponse.json(answers);
//     } catch (error) {
//         console.log(error);
//         throw new Error("Failed to fetch answers!");
//     }
// };

export const POST = async (request) => {
    try {
        const reqBody = await request.json();

        const newAnswer = await Answer.create(reqBody);
        return NextResponse.json(newAnswer);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to add Answer!");
    }
};

