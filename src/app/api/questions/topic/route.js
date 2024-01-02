import Topic from "@/models/topicModel";
import { dbConnect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

dbConnect();

export const GET = async (request) => {
    try {
        const topics = await Topic.find();
        return NextResponse.json(topics);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch topics!");
    }
};

export const POST = async (request) => {
    try { 
        const reqBody = await request.json();
        const newTopic = await Topic.create(reqBody);
        return NextResponse.json(newTopic);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to add Topic!");
    }
};

