import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    qnsId: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: [true, 'Please enter the answer'],
    },
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Answer = mongoose.models.answers || mongoose.model("answers", answerSchema);

export default Answer;