import User from '../models/User.js';
import bcrypt from "bcryptjs"
import { generateTokenAndCookies } from '../utils/generateTokenAndCookie.js';

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields should be filled!"
            })
        };
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exisits!"
            })
        };
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });

        // Jwt Token
        generateTokenAndCookies(res, newUser._id)

        await newUser.save();
        return res.status(201).json({
            success: true,
            message: "Registration Successful! ",
            user: { id: newUser._id, username: newUser.username, email: newUser.email }
        })

    } catch (error) {
        console.log("Error in register controller: ", error);
        return res.status(500).json({
            success: false,
            message: "Error in register controller: "
        })
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(401).json({ success: false, message: "All fields are required!" })
        }
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" })

        // token
        generateTokenAndCookies(res, user._id)

        return res.status(201).json({
            success: true,
            message: `Welcome back ${user.username}!`
        })
    } catch (error) {
        console.log("Error in login controller: ", error)
        return res.status(500).json({
            success: false,
            message: "Error in login controller"
        });
    }
}