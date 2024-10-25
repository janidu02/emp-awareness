const express = require("express");
const Pathway = require("../models/Pathway");
const mongoose = require("mongoose");
const { checkQuizAnswers } = require("../utils/quiz");
const { authorization } = require("../middleware/access_conrol.middleware");

const router = express.Router();

router.get("/", async (req, res) => {
    const { title } = req.query;
    let query = {};
    if (title) {
        query = { title: { $regex: title, $options: "i" } };
    }
    let select = {
        title: 1,
        description: 1,
        materials_count: { $size: "$materials" },
        createdBy: 1,

        materials: 1,
    };
    if (req.user.role === "admin" || req.user.role === "manager") {
        select.enrolled = 1;
    }
    if (req.user.role === "employee") {
        query.enrolled = { $elemMatch: { user: new mongoose.Types.ObjectId(req.user._id) } };
        select = {
            ...select,
            // enrolled: 1,
            // get only the user that is enrolled
            "enrolled.$": 1,
        };
    }
    console.log(query);

    // query for pathways if included req.user._id in enrolled

    try {
        const pathways = await Pathway.find(query).select(select);
        // console.log("pathways: ", pathways);
        return res.json({ pathways });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/:id", [authorization(["admin", "manager"])], async (req, res) => {
    const { id } = req.params;
    try {
        const pathway = await Pathway.findById(id).select({
            title: 1,
            description: 1,
            materials: {
                _id: 1,
                title: 1,
                type: 1,
                source: 1,
                order: 1,
            },
            enrolled: 1,
            createdBy: 1,
        });
        return res.json({ pathway });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/", [authorization(["admin", "manager"])], async (req, res) => {
    try {
        const { title, description, materials } = req.body;
        const pathway = new Pathway({ title, description, materials, createdBy: req.user._id });
        await pathway.save();
        // return pathway id
        return res.json({ message: "Pathway created", id: pathway._id });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/:id", [authorization(["admin", "manager"])], async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, materials, enrolledUsers } = req.body;
        console.log(req.body);
        let query = { title, description, materials };
        let enrolled = [];
        if (enrolledUsers) {
            enrolled = enrolledUsers.map((user) => {
                return {
                    user: user._id,
                };
            });
            query.enrolled = enrolled;
        }
        await Pathway.findByIdAndUpdate(id, query);
        return res.json({ message: "Pathway updated" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/:id", [authorization(["admin", "manager"])], async (req, res) => {
    const { id } = req.params;
    try {
        await Pathway.findByIdAndDelete(id);
        return res.json({ message: "Pathway deleted" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/:pathwayId/results", [authorization(["admin", "manager"])], async (req, res) => {
    const { pathwayId } = req.params;

    try {
        // Fetch the pathway along with all enrolled users and their details
        const pathway = await Pathway.findById(pathwayId)
            .populate("enrolled.user", "name email id firstName lastName") // Populate user details
            .populate({
                path: "enrolled.quizResults.quiz", // Populate the quiz field within quizResults
                model: "Quiz",
                select: "title", // Only select the title field from Quiz
            });

        if (!pathway) {
            return res.status(404).json({ message: "Pathway not found" });
        }

        // Structure the response to include all necessary information
        const enrolledData = pathway.enrolled.map((enrolledUser) => ({
            userId: enrolledUser?.user?._id,
            name: enrolledUser?.user?.firstName ? enrolledUser?.user?.firstName + " " + enrolledUser?.user?.lastName : "Deleted User",
            employeeId: enrolledUser?.user?.id,
            email: enrolledUser?.user?.email,
            progress: enrolledUser.progress,
            completed: enrolledUser.completed,
            quizResults: enrolledUser.quizResults.map((quizResult) => ({
                quizId: quizResult.quiz._id,
                title: quizResult.quiz.title, // Include the quiz title in the response
                score: quizResult.score,
                maxScore: quizResult.maxScore,
                results: quizResult.results,
                completedAt: quizResult.completedAt,
            })),
            progressDetails: enrolledUser.progressDetails.map((progressDetail) => ({
                materialId: progressDetail.materialId,
                status: progressDetail.status,
                completedAt: progressDetail.completedAt,
            })),
        }));

        return res.json({ pathwayId: pathway._id, pathwayTitle: pathway.title, enrolled: enrolledData });
    } catch (error) {
        console.error("Error fetching enrolled data: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/:pathwayId/materials/:materialId/progress", [authorization("employee")], async (req, res) => {
    const { pathwayId, materialId } = req.params;
    const { status } = req.body; // status can be 'in progress' or 'completed'

    if (!["not started", "in progress", "completed"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }

    try {
        // Step 1: Find the pathway and check if progressDetails exists for the material
        let pathway = await Pathway.findOne({
            _id: pathwayId,
            "enrolled.user": req.user._id,
        });

        if (!pathway) {
            return res.status(404).json({ message: "Pathway not found or user not enrolled" });
        }

        // Find the enrolled user
        const enrolledUser = pathway.enrolled.find((e) => e.user.equals(req.user._id));
        if (!enrolledUser) {
            return res.status(404).json({ message: "User is not enrolled in this pathway" });
        }

        // Step 2: Check if the material progress already exists in progressDetails
        let progressDetail = enrolledUser.progressDetails.find((pd) => pd.materialId.equals(materialId));

        // Step 3: If it doesn't exist, push a new progress detail entry
        if (!progressDetail) {
            enrolledUser.progressDetails.push({
                materialId: materialId,
                status: status,
                completedAt: status === "completed" ? new Date() : null,
            });
        } else {
            // If it exists, update the status and completedAt
            progressDetail.status = status;
            progressDetail.completedAt = status === "completed" ? new Date() : null;
        }

        // Step 4: Save the document

        // if material is completed, check if all materials are completed
        // if (status === "completed") {
        //     const allMaterialsCompleted = enrolledUser.progressDetails.every((pd) => pd.status === "completed");
        //     if (allMaterialsCompleted) {
        //         enrolledUser.completed = true;
        //     }
        // }

        await pathway.save();

        return res.json({ message: "Progress updated successfully", pathway });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/:pathwayId/materials/:materialId/quiz", [authorization("employee")], async (req, res) => {
    const { pathwayId, materialId } = req.params;
    const { quizId, options } = req.body;

    try {
        // Check if user is already enrolled in the pathway
        let pathway = await Pathway.findOne({
            _id: pathwayId,
            "enrolled.user": req.user._id,
        });

        if (!pathway) {
            return res.status(404).json({ message: "Pathway not found or user not enrolled" });
        }

        // Find the enrolled user in the pathway
        const enrolledUser = pathway.enrolled.find((e) => e.user.equals(req.user._id));
        if (!enrolledUser) {
            return res.status(404).json({ message: "User is not enrolled in this pathway" });
        }

        // Check if the quiz has already been completed by this user
        const existingQuizResult = enrolledUser.quizResults.find((qr) => qr.quiz.equals(quizId));
        if (existingQuizResult) {
            return res.status(400).json({ message: "Quiz already completed" });
        }

        // Calculate quiz score using a helper function (assuming checkQuizAnswers is defined)
        const { score, results } = await checkQuizAnswers(quizId, options);

        // Push the new quiz result to the enrolled user's quizResults array
        enrolledUser.quizResults.push({
            quiz: quizId,
            score,
            maxScore: results.length,
            results,
            completedAt: new Date(),
        });

        // Save the updated pathway document
        await pathway.save();

        return res.json({ message: "Quiz results updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/:pathwayId/quizzes/:quizId/results/:userId", async (req, res) => {
    const { pathwayId, quizId, userId } = req.params;

    try {
        // get the quiz results in the pathway. find the quiz id using material id and user id
        let newUserId = userId;
        let query = {
            _id: pathwayId,
            "enrolled.user": req.user._id,
            "enrolled.quizResults.quiz": quizId,
        };
        if (req.user.role === "employee") {
            newUserId = req.user._id;
        }

        if (req.user.role === "admin" || req.user.role === "manager") {
            query = {
                _id: pathwayId,
                "enrolled.user": userId,
                "enrolled.quizResults.quiz": quizId,
            };
        }
        console.log("results_query: ", query);
        const pathway = await Pathway.findOne(query);

        if (!pathway) {
            return res.status(404).json({ message: "Pathway or quiz not found" });
        }

        // find the enrolled user
        const enrolledUser = pathway.enrolled.find((e) => e.user.equals(newUserId));
        if (!enrolledUser) {
            return res.status(404).json({ message: "User is not enrolled in this pathway" });
        }
        // find the quiz result
        const quizResult = enrolledUser.quizResults.find((qr) => qr.quiz.equals(quizId));
        if (!quizResult) {
            return res.status(404).json({ message: "Quiz result not found" });
        }

        return res.json(quizResult);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
