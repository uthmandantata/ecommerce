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
        const user = req.user
        const { username, email, password } = req.body;
        if (user !== req.params.id) {
            return res.status(400).json({
                success: true,
                message: "You are not authorized to take this action!!"
            })
        }
        const myProfile = await User.findById(user._id)
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
        const userId = req.user.id
        if (userId !== req.params.id) return res.status(400).json({ success: false, message: "You are not authorized to do this!" });

        await User.findByIdAndDelete(userId)

        res.clearCookie("token", req.cookies.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: '/'
        });
        return res.status(200).json({
            success: true,
            message: "User profile deleted!"
        })

    } catch (error) {
        console.log("Error in myProfile controller", error);
        return res.status(500).json({
            success: false,
            message: "Error in myProfile controller"
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (userId === req.user.id) return res.status(400).json({ success: false, message: "Admin cannot remove himself/hersefl!" })
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User does not Exisit!" });


        await User.findByIdAndDelete(userId)


        return res.status(200).json({
            success: true,
            message: "User deleted!"
        })

    } catch (error) {
        console.log("Error in deleteUser controller", error);
        return res.status(500).json({
            success: false,
            message: "Error in deleteUser controller"
        })
    }
}