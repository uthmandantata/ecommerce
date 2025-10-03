import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const myprofile = async (req, res) => {
    try {
        const user = req.user;
        const safeUser = {
            _id: user._id,
            username: user.username,
            email: user.email
        }
        return res.status(200).json({
            success: true,
            user: safeUser
        })

    } catch (error) {
        console.log("Error in myProfile controller", error);
        return res.status(500).json({
            success: false,
            message: "Error in myProfile controller"
        })
    }
}


export const updateProfile = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const myProfile = await User.findById(req.user._id)
        if (username) myProfile.username = username;
        if (email) myProfile.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10)
            myProfile.password = hashedPassword
        }

        await myProfile.save()
        return res.status(200).json({
            success: true,
            message: "Profile Updated!",
            user: {
                username: myProfile.username,
                email: myProfile.email,
            }
        })

    } catch (error) {
        console.log("Error in myProfile controller", error);
        return res.status(500).json({
            success: false,
            message: "Error in myProfile controller"
        })
    }
}


export const deleteProfile = async (req, res) => {
    try {

    } catch (error) {
        console.log("Error in myProfile controller", error);
        return res.status(500).json({
            success: false,
            message: "Error in myProfile controller"
        })
    }
}