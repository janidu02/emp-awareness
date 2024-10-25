const express = require("express");
const User = require("../models/User");
const Pathway = require("../models/Pathway");
const router = express.Router();
const { authorization } = require("../middleware/access_conrol.middleware");

const DEFAULT_USER_SELECT = {
    firstName: 1,
    lastName: 1,
    email: 1,
    phoneNo: 1,
    department: 1,
    role: 1,
    id: 1,
    profileImage: 1,
    active: 1,
    address: 1,
};

router.get("/", async (req, res) => {
    try {
        const users = await User.find().select(DEFAULT_USER_SELECT);
        return res.json({ users });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).select(DEFAULT_USER_SELECT);
        return res.json({ user });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(req.user.role);
    if (!id) {
        return res.status(400).json({ message: "Invalid request" });
    }
    if (id === req.user.id) {
        return res.status(400).json({ message: "You cannot delete yourself" });
    }

    // if (req.user.role !== "admin" || req.user.role !== "manager") {
    //     return res.status(400).json({ message: "You do not have permission to delete users" });
    // }
    // prevent deletion of admin

    const user = await User.findOne({ id }).select({ _id: 1, role: 1 });
    if (user?.role === "admin") {
        return res.status(400).json({ message: "Admin cannot be deleted" });
    }
    if (user?.role === "manager" && req.user.role !== "admin") {
        return res.status(400).json({ message: "You do not have permission to delete manager" });
    }

    try {
        await User.findOneAndDelete({ id });
        // // delete user from pathway.enrolled array [user:ObjectId]
        await Pathway.updateMany({ enrolled: user._id }, { $pull: { enrolled: user._id } });

        return res.json({ message: "User deleted" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
