const express = require("express");
const { generateToken } = require("../utils/token");
const MagicLink = require("../models/MagicLink");
const User = require("../models/User");
const { authorization } = require("../middleware/access_conrol.middleware");

const router = express.Router();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.get("/", async (req, res) => {
    // get all magiclinks in db
    const magiclinks = await MagicLink.find();
    return res.json({ magiclinks });
});

router.post("/", async (req, res) => {
    const { email, role, pathway, department } = req.body;
    console.log(req.body);
    let expiresIn = req.body.expire || 1;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    if (!["employee", "manager"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
    }
    // create exp
    const one_hour = 1000 * 60 * 60;
    let expiresAt = new Date(Date.now() + one_hour);
    // chat

    if (expiresIn) {
        expiresAt = new Date(Date.now() + one_hour * expiresIn);
    }

    let query = { email, role, expiresAt, department };
    if (pathway) {
        query.pathwayId = pathway;
    }

    console.log("magiclink query: ", query);

    if (await MagicLink.findOne({ email })) return res.status(400).json({ message: "Magiclink already exist with this email" });
    if (await User.findOne({ email })) return res.status(400).json({ message: "User already exist with this email" });
    const magiclink = new MagicLink(query);
    await magiclink.save();
    // generate token and rturn in response
    const token = generateToken({ _id: magiclink._id, expiresAt: magiclink.expiresAt }, `${expiresIn}h`);

    return res.json({ message: "Magic link created", token, magiclink });
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const magiclink = await MagicLink.findByIdAndDelete(id);
        return res.json({ message: "Magiclink deleted", magiclink });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
