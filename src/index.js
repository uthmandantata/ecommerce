import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.router.js'




dotenv.config();
const app = express();
app.use(cookieParser());
const PORT = process.env.PORT;


// Middleware
app.use(express.json());

// Router
app.use("/api/auth", authRoutes)


// Run app

app.listen(PORT, () => {
    dbConnect();
    console.log(`Server running on port: ${PORT}`)
})