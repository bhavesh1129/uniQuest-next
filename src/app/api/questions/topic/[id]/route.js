import Topic from "@/models/topicModel";
import { dbConnect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

dbConnect();

export const GET = async (request, { params }) => {
    const id = params.id;
    if (!id) {
        return NextResponse.error("Topic ID is not provided");
    }
    try {
        const topic = await Topic.findOne({ _id: id });
        if (!topic) {
            return NextResponse.error("Topic not found");
        }
        return NextResponse.json(topic);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch topics!");
    }
};

