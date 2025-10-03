import express from "express";
import mongoose from "mongoose";


export const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected ${connect.connection.name}`)
    } catch (error) {
        console.log("Database was not connected because: ", error);
        process.exit(1)
    }

}