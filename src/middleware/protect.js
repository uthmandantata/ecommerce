import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const protect = async (req, res, next) => {
    try {
        let token;
        if (req.cookies.token && req.cookies) {
            token = req.cookies.token
        }
        if (!token) return res.status(401).json({ success: false, message: "Not Authorized to access this page!" });

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decode.userId).select("-password")

        if (!req.user) return res.status(404).json({ success: false, message: "User not found!" });

        next();
    } catch (error) {
        console.log("Error in protect middleware:", error);
        return res.status(401).json({
            success: false,
            message: "Not authorized, token failed"
        });

    }
};


export const isLoggedIn = async (req, res, next) => {
    try {
        let token;
        if (req.cookies.token && req.cookies) {
            token = req.cookies.token
        }
        if (!token) {
            return next();
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decode.userId).select("-password")

        if (req.user) {
            // If a user is found = already logged in
            return res.status(400).json({
                success: false,
                message: "User already logged in! Please log out first."
            });
        }

        next();
    } catch (error) {
        console.log("Error in isLoggedIn middleware:", error);
        return res.status(401).json({
            success: false,
            message: "Not authorized, token failed"
        });

    }
};
