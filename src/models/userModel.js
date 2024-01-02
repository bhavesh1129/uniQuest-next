import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
    },
    image: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/168/168726.png'
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgetPasswordToken: { type: String },
    forgetPasswordTokenExpiry: { type: Date },
    verifyToken: { type: String },
    verifyTokenExpiry: { type: Date }
}, { timestamps: true });

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;