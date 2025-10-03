import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/db.js";
import authRoutes from './routes/auth.router.js'



dotenv.config();
const app = express();
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