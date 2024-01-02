import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
    topicName: {
        type: String,
        required: [true, 'Please enter the topic'],
        unique: true,
    },
    userId: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Topic = mongoose.models.topics || mongoose.model("topics", topicSchema);

export default Topic;