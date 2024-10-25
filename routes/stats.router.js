const express = require("express");
const { authorization } = require("../middleware/access_conrol.middleware");
const User = require("../models/User");
const Pathway = require("../models/Pathway");
const Quiz = require("../models/Quiz");

const router = express.Router();

router.get("/", authorization(["admin", "manager"]), async (req, res) => {
    let stats = {
        counts: {
            employees: { title: "Registered Employees", value: 0 },
            managers: { title: "Managers", value: 0 },
            pathways: { title: "Pathways", value: 0 },
            quizzes: { title: "Quizzes", value: 0 },
        },
    };

    // get all users
    stats.counts.employees.value = await User.find({ role: "employee" }).countDocuments();
    stats.counts.managers.value = await User.find({ role: "manager" }).countDocuments();
    stats.counts.pathways.value = await Pathway.find().countDocuments();
    stats.counts.quizzes.value = await Quiz.find().countDocuments();

    // get all stats
    return res.json(stats);
});

module.exports = router;
