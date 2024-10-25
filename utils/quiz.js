const mongoose = require("mongoose");
const Quiz = require("../models/Quiz");

async function checkQuizAnswers(quizId, options) {
    try {
        // Fetch the quiz and its questions
        const quiz = await Quiz.findById(quizId).select("questions").lean();
        // console.log("quiz: ", quiz);
        let score = 0;

        if (!quiz) {
            return { error: "Quiz not found" };
        }

        const results = await Promise.all(
            options.map(async (userAnswer) => {
                // console.log("userAnswer: ", userAnswer);
                const question = quiz.questions.find((question) => question._id.equals(new mongoose.Types.ObjectId(userAnswer.questionId)));
                // console.log("question: ", question);

                if (!question) {
                    return {
                        questionId: userAnswer.questionId,
                        correct: false,
                        message: "Question not found",
                        userAnswer: [],
                    };
                }
                if (!userAnswer?.selectedAnswerId || userAnswer?.selectedAnswerId?.length === 0) {
                    return {
                        questionId: userAnswer.questionId,
                        correct: false,
                        message: "Answer not provided",
                        userAnswer: [],
                    };
                }
                // Check for single_choice or multiple_choice
                if (question.type === "single_choice") {
                    const correctOption = question.options.find((option) => option.isCorrect);
                    const isCorrect = correctOption && correctOption._id.equals(userAnswer.selectedAnswerId);

                    if (isCorrect) {
                        score += 1;
                    }

                    return {
                        questionId: new mongoose.Types.ObjectId(userAnswer.questionId),
                        userAnswer: [new mongoose.Types.ObjectId(userAnswer.selectedAnswerId)],
                        correct: isCorrect,
                        correctAnswer: [correctOption._id],
                        partialScore: isCorrect ? 1 : 0,
                    };
                } else if (question.type === "multiple_choice") {
                    // Check multiple choices
                    const correctOptions = question.options.filter((option) => option.isCorrect).map((option) => option._id.toString());
                    const selectedAnswers = userAnswer.selectedAnswerId.map((id) => id.toString());

                    const correctCount = correctOptions.filter((id) => selectedAnswers.includes(id)).length;
                    const isCorrect = arraysEqual(selectedAnswers, correctOptions);

                    // Calculate score for multiple choice
                    const partialScore = correctCount / correctOptions.length;
                    score += partialScore;

                    return {
                        questionId: new mongoose.Types.ObjectId(userAnswer.questionId),
                        userAnswer: userAnswer.selectedAnswerId.map((id) => new mongoose.Types.ObjectId(id)),
                        correct: isCorrect,
                        correctAnswer: correctOptions,
                        partialScore: partialScore,
                    };
                } else {
                    return {
                        questionId: userAnswer.questionId,
                        correct: false,
                        userAnswer: userAnswer.selectedAnswerId,
                        correctAnswer: null,
                        message: "Invalid question type",
                    };
                }
            })
        );

        // console.log("score: ", score);
        // console.log("results: ", results);
        return { score, results };
    } catch (error) {
        console.error("Error checking quiz answers:", error);
        return { error: "Internal server error" };
    }
}

// Helper function to compare two arrays (ignores order)
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    arr1.sort();
    arr2.sort();
    return arr1.every((value, index) => value === arr2[index]);
}

// Example usage:
// const quizId = "66f2e9fa8bb97c204f16c0db"; // Quiz ID
// const options = [
//     {
//         questionId: "66f2e9fa8bb97c204f16c0db",
//         selectedAnswerId: "66f2e9fa8bb97c204f16c0de",
//     },
//     {
//         questionId: "66f2e9fa8bb97c204f16c0e0",
//         selectedAnswerId: ["66f2e9fa8bb97c204f16c0e1", "66f2e9fa8bb97c204f16aCb1"],
//     },
// ];

// Check the answers
// checkQuizAnswers(quizId, options).then((result) => console.log(result));

module.exports = { checkQuizAnswers };
