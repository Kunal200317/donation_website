import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDb = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            return mongoose.connection;
        }
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        // Do not exit the process in serverless environment
        throw new Error("Database connection failed");
    }
}

export default connectDb;