const mongoose = require("mongoose");

const PathwaySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        description: String,
        materials: [
            {
                _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
                title: { type: String, required: true },
                type: {
                    type: String,
                    enums: ["quiz", "video", "embed", "pdf"],
                    required: true,
                },
                source: { type: String, required: true },
                order: Number,
            },
        ],
        enrolled: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                progress: { type: Number, default: 0 },
                completed: { type: Boolean, default: false },
                progressDetails: [
                    {
                        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
                        materialId: { type: mongoose.Schema.Types.ObjectId },
                        status: {
                            type: String,
                            enum: ["not started", "in progress", "completed"],
                            default: "not started",
                        },
                        completedAt: Date, // Timestamp for completion
                    },
                ],
                quizResults: [
                    {
                        quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
                        score: Number,
                        maxScore: Number,
                        results: [
                            {
                                questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz.questions" },
                                correct: Boolean,
                                userAnswer: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz.questions.options" }],
                                correctAnswer: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz.questions.options" }],
                                partialScore: Number,
                            },
                        ],
                        completedAt: Date,
                    },
                ],
            },
        ],
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

// add material order when saving
PathwaySchema.pre("save", function (next) {
    this.materials.forEach((material, index) => {
        material.order = index;
    });

    next();
});

const Model = mongoose.model("Pathway", PathwaySchema);

module.exports = Model;
