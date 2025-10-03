import User from '../models/User.js';
import bcrypt from "bcryptjs"

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