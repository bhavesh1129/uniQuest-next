import Question from "@/models/questionModel";
import { dbConnect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

dbConnect();

export const GET = async (request, { params }) => {
    const slug = params.slug;
    try {
        const question = await Question.findOne({ slug });
        return NextResponse.json(question);
    } catch (error) {
        console.log(error);
        throw new Error(`Failed to fetch Question with ${slug}!`);
    }
};

export async function DELETE(request, { params }) {
    const slug = params.slug;
    try {
        const Question = await Question.findOne({ slug });
        if (!Question) {
            return NextResponse.json({ error: "Question not found", status: 404 });
        }
        const deletedQuestion = await Question.findByIdAndDelete(Question._id);
        if (!deletedQuestion) {
            return NextResponse.json({ error: "Question not found", status: 404 });
        }
        return NextResponse.json({ message: "Question deleted successfully", status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error deleting Question: " + error.message, status: 500 });
    }
};
