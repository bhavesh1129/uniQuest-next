import Answer from "@/models/answerModel";
import { dbConnect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

dbConnect();

export const GET = async (request, { params }) => {
    const slug = params.slug;
    try {
        const answers = await Answer.find({ qnsId: slug }).sort({ createdAt: 'desc' });
        return NextResponse.json(answers);
    } catch (error) {
        console.log(error);
        throw new Error(`Failed to fetch Answer with ${slug}!`);
    }
};

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

// export async function DELETE(request, { params }) {
//     const slug = params.slug;
//     try {
//         const Answer = await Answer.findOne({ slug });
//         if (!Answer) {
//             return NextResponse.json({ error: "Answer not found", status: 404 });
//         }
//         const deletedAnswer = await Answer.findByIdAndDelete(Answer._id);
//         if (!deletedAnswer) {
//             return NextResponse.json({ error: "Answer not found", status: 404 });
//         }
//         return NextResponse.json({ message: "Answer deleted successfully", status: 200 });
//     } catch (error) {
//         return NextResponse.json({ error: "Error deleting Answer: " + error.message, status: 500 });
//     }
// };
