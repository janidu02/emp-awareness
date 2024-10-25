const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        questions: [
            {
                _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
                question: {
                    type: String,
                    required: true,
                },
                type: {
                    type: String,
                    required: true,
                    enum: ["single_choice", "multiple_choice"],
                },
                options: [
                    {
                        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
                        option: {
                            type: String,
                            required: true,
                        },
                        isCorrect: {
                            type: Boolean,
                            required: true,
                        },
                    },
                ],
                order: {
                    type: Number,
                    required: true,
                },
            },
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

QuizSchema.pre("save", function (next) {
    if (!(this.questions[0].order === 0)) {
        this.questions.forEach((question, index) => {
            question.order = index;
        });
    }
    next();
});

module.exports = mongoose.model("Quiz", QuizSchema);
