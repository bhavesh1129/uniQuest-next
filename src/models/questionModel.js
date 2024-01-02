import mongoose from "mongoose";
import slugify from "slugify";

const questionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the name'],
    },
    title: {
        type: String,
        required: [true, 'Please enter the title'],
    },
    topicName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'topics',
        required: [true, 'Please choose the topic'],
    },
    description: {
        type: String,
        required: [true, 'Please enter the description'],
    },
    userId: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });


questionSchema.pre('save', function (next) {
    if (this.isModified('title') && !this.slug) {
        this.slug = slugify(this.title, { lower: true });
    }
    next();
});

const Question = mongoose.models.questions || mongoose.model("questions", questionSchema);

export default Question;