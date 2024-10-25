const express = require("express");
const User = require("../models/User");
const { generateToken, verifyToken } = require("../utils/token");
const MagicLink = require("../models/MagicLink");
const Pathway = require("../models/Pathway");

const router = express.Router();

const cookieoptions = {
    maxAge: 1000 * 60 * 60 * 1, // 1 hour
    httpOnly: true,
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const scriptRegex = /<script>|<\/script>|<sql>|<\/sql>/;

router.post("/register", async (req, res) => {
    try {
        const { email, password, firstName, lastName, token } = req.body;

        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // check email format and password length using regex

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number",
            });
        }
        const nameRegex = /^[a-zA-Z]+$/;
        if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
            return res.status(400).json({ message: "Invalid name format" });
        }

        // check if user already exists
        let user = await User.findOne({ email }).select("email").lean();

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        let query = { firstName, lastName, email, password };

        if ((await User.find().countDocuments()) === 0) {
            query.role = "admin";
            query.department = "Admin";
        }
        // if (["manager", "employee"].includes(reqBodyRole) && ["admin", "manager"].includes(req.user.role)) {
        //     query.role = reqBodyRole;
        // }
        let magiclink = {};
        if (token) {
            const magiclinkInfo = verifyToken(token);
            magiclink = await MagicLink.findById(magiclinkInfo._id);
            console.log(magiclink);
            if (magiclink) {
                query.role = magiclink.role;
                query.department = magiclink.department;
            }
        } else if (query.role === "admin") {
            console.log("admin");
        } else {
            if (token) {
                return res.status(400).json({ message: "Invalid token" });
            }
            return res.status(400).json({ message: "Only Magic Link registration allowed" });
        }

        user = new User(query);
        await user.save();

        // add user to pathway if pathway in magiclink
        if (magiclink.pathwayId) {
            // add user to pathway
            const pathway = await Pathway.findByIdAndUpdate(
                magiclink.pathwayId,
                {
                    $push: {
                        enrolled: {
                            user: user._id,
                        },
                    },
                },
                { new: true }
            );
            console.log(pathway);
        }
        // mark magiclink as used
        if (magiclink) {
            magiclink.used = true;
            await magiclink.save();
        }

        return res.json({
            message: "User created",
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                id: user.id,
                profileImage: user.profileImage,
                active: user.active,
                address: user.address,
            },
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "User not created" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body);
    // check if email and password is provided
    if (!email && !password) {
        return res.status(400).json({ message: "Email and password required" });
    }
    // check email format is valid
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    // check password format is valid
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "User not found." });
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
        return res.status(400).json({
            message: "Invalid password",
        });
    }
    const token = generateToken(user);
    res.cookie("auth_token", token, cookieoptions);
    return res.json({
        message: "Login success",
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            id: user.id,
            profileImage: user.profileImage,
            active: user.active,
            address: user.address,
        },
        auth_token: token,
    });
});

router.get("/logout", async (req, res) => {
    if (!req.cookies.auth_token) {
        return res.status(400).json({ message: "User not logged in" });
    }
    res.clearCookie("auth_token");
    return res.json({ message: "Logout success" });
});

router.get("/identify", async (req, res) => {
    if (req.user) {
        const user = await User.findById(req.user._id).select({
            firstName: 1,
            lastName: 1,
            email: 1,
            role: 1,
            id: 1,
            profileImage: 1,
            active: 1,
            address: 1,
        });
        // console.log(req.user);
        return res.json({
            message: "User logged in",
            user,
        });
    }
    return res.json({ message: "User not logged in" });
});

module.exports = router;
