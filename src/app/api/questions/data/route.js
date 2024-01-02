import Question from "@/models/questionModel";
import { dbConnect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

dbConnect();

export const GET = async (request) => {
    try {
        const questions = await Question.find();
        return NextResponse.json(questions);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch questions!");
    }
};

export const POST = async (request) => {
    try {
        const reqBody = await request.json();
        // const { name, title, topic, description, userId, slug  } = reqBody;
        
        const newQuestion = await Question.create(reqBody);
        return NextResponse.json(newQuestion);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to add Question!");
    }
};

