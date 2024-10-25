const express = require("express");
const Quiz = require("../models/Quiz");
const { authorization } = require("../middleware/access_conrol.middleware");

const router = express.Router();

router.get("/", [authorization(["admin", "manager"])], async (req, res) => {
    try {
        const quizzes = await Quiz.find().select({
            title: 1,
            description: 1,
            createdBy: 1,
            questionsCount: { $size: "$questions" },
            active: 1,
        });
        return res.json({ quizzes });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        let select = {
            _id: 1,
            title: 1,
            description: 1,
            questions: {
                _id: 1,
                question: 1,
                type: 1,
                options: {
                    _id: 1,
                    option: 1,
                },
                order: 1,
            },
        };

        let quiz = null;
        if (req.user.role === "admin" || req.user.role === "manager") {
            quiz = await Quiz.findById(id);
        } else {
            quiz = await Quiz.findById(id).select(select);
        }

        return res.json({ quiz });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/", [authorization(["admin", "manager"])], async (req, res) => {
    const { title, order, description, questions } = req.body;
    console.log(req);
    const createdBy = req.user._id;
    const quiz = new Quiz({ title, order, description, questions, createdBy });
    try {
        await quiz.save();
        return res.json({ message: "Quiz created", id: quiz._id });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/:id", [authorization(["admin", "manager"])], async (req, res) => {
    const { id } = req.params;
    const { title, order, description, questions } = req.body;
    try {
        await Quiz.findByIdAndUpdate(id, { title, order, description, questions });
        return res.json({ message: "Quiz updated" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/:id", [authorization(["admin", "manager"])], async (req, res) => {
    const { id } = req.params;
    try {
        await Quiz.findByIdAndDelete(id);
        return res.json({ message: "Quiz deleted" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
