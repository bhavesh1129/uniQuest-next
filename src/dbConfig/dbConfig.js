import mongoose from "mongoose";

export async function dbConnect() {
    try {
        const mongodbUri = process.env.MONGODB_URI;
        if (!mongodbUri) {
            throw new Error("MONGODB_URI is not defined");
        }
        await mongoose.connect(mongodbUri);
        const connection = mongoose.connection;
        
        connection.on('connected', () => {
            console.log("Database connected successfully");
        });

        connection.on('error', (error) => {
            console.log("Error while connecting to database ", error);
            process.exit(1);
        });

    } catch (error) {
        console.log("Error while connecting to database ", error);
    }
}