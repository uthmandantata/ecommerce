import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.router.js'
import userRoutes from './routes/user.router.js'
import productRoutes from './routes/product.router.js'
import categoryRoutes from './routes/category.router.js'
import orderRoutes from './routes/order.router.js'
import cartRoutes from './routes/cart.router.js'
import adminRoutes from './routes/admin.router.js'




dotenv.config();
const app = express();
app.use(cookieParser());
const PORT = process.env.PORT;


// Middleware
app.use(express.json());

// Router
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);


// Run app

app.listen(PORT, () => {
    dbConnect();
    console.log(`Server running on port: ${PORT}`)
})