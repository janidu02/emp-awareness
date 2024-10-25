import React, { useEffect } from "react";
import { usequizzestore } from "../../store/quiz.store";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathwayStore } from "../../store/pathways.store";
import Loader from "../common/Loader";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useParams } from "react-router-dom";

function TakeQuiz({ quizId, pathwayId, materialId, userId }) {
    const params = useParams;
    const { quiz, getQuiz, loading, submitQuiz, submit_loading, getQuizResults } = usequizzestore((state) => state);
    const { getPathways, markAsDoneMaterial } = usePathwayStore((state) => state);

    const [currentState, setCurrentState] = React.useState("start");
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [questions, setQuestions] = React.useState([]);
    const [showNavigation, setShowNavigation] = React.useState(true);
    const [results, setResults] = React.useState(null);

    const getResults = async () => {
        let u_Id = userId || "user";
        console.log("u_Id", u_Id);
        let results = await getQuizResults(pathwayId, quizId, u_Id);
        console.log("results", results);
        if (results) {
            setCurrentState("results");
            setResults(results);
        }
    };
    const submitQuizhandler = async () => {
        setCurrentState("submitting");
        let data = {
            quizId,
            options: questions.map((question) => {
                return {
                    questionId: question._id,
                    selectedAnswerId:
                        question.type === "single_choice" ? question.options.find((option) => option.result)?._id : question.options.filter((option) => option.result).map((option) => option._id),
                };
            }),
        };
        console.log(data);
        const submit_results = await submitQuiz(pathwayId, materialId, data);
        if (submit_results) {
            await markAsDoneMaterial(pathwayId, materialId);
            setCurrentState("submitted");
            getPathways();

            // getResults();
        }
    };

    const getInitialData = async () => {
        setResults(null);
        setCurrentState("start");
        setCurrentQuestion(0);
        if (quizId) {
            let quiz = await getQuiz(quizId);
            setQuestions(quiz.questions);
            getResults();
        }
    };

    useEffect(() => {
        getInitialData();
    }, [quizId, pathwayId]);

    return (
        <div className="h-full w-full bg-gray-50 relative overflow-hidden">
            {loading ? (
                <div className="flex flex-col justify-center items-center h-full py-10 text-indigo-500">
                    <Loader className="size-10 " />
                </div>
            ) : (
                <>
                    {currentState === "start" ? (
                        <div className="start-screen w-full h-full flex justify-center items-center flex-col">
                            <div className="w-1/2 py-10">
                                <div className="w-full flex justify-between items-center py-2 border-gray-400 border-b ">
                                    <div>
                                        <h2 className="text-sm mt-0.5 text-gray-400">Quiz</h2>
                                        <h1 className="text-3xl">{quiz?.title}</h1>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setCurrentState("in_quiz");
                                            // setStartTime(new Date());
                                        }}
                                        className="start-button border-blue-400 border px-4 py-1 rounded"
                                    >
                                        Start
                                    </button>
                                </div>
                                <div className="mt-3">{/* Duration: <span className="text-gray-400">{quiz.quiz_duration} minutes</span> */}</div>
                                <div className="mt-2">
                                    <h3>Instructions</h3>
                                    <ul className="text-gray-700 pl-5 pt-2 list-disc">
                                        <li>Click on the option to select it.</li>
                                        <li>Click on the Next button to go to the next question.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ) : currentState === "in_quiz" ? (
                        <div className="w-full h-full flex flex-col">
                            <div className="py-3 px-5 text-xl bg-gray-100 flex justify-between items-center">
                                <h4>
                                    Question {currentQuestion + 1} of {questions?.length}
                                </h4>
                                <button
                                    onClick={() => {
                                        if (currentQuestion === questions.length - 1) {
                                            submitQuizhandler();
                                        }
                                        setCurrentQuestion(currentQuestion + 1);
                                    }}
                                    className="inline-block rounded border border-indigo-600 px-5 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                                >
                                    {submit_loading ? (
                                        <span className="px-2">
                                            <svg className="animate-spin  h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                        </span>
                                    ) : currentQuestion === questions.length - 1 ? (
                                        "Submit"
                                    ) : (
                                        "Next"
                                    )}
                                </button>
                            </div>
                            <div className="flex-grow bg-gray-50 p-10">
                                <Question
                                    question={questions[currentQuestion]}
                                    onAnswer={(id) => {
                                        console.log("onAnswer", id);
                                        let newQuestions = [...questions];
                                        newQuestions[currentQuestion].options = newQuestions[currentQuestion].options.map((option) => {
                                            if (newQuestions[currentQuestion].type === "single_choice") {
                                                if (option._id === id) {
                                                    option.result = true;
                                                } else {
                                                    option.result = false;
                                                }
                                            } else {
                                                if (option._id === id) {
                                                    option.result = !option.result;
                                                }
                                            }
                                            return option;
                                        });
                                        setQuestions(newQuestions);
                                        // currentQuestion < questions.length - 1 && setCurrentQuestion(currentQuestion + 1);
                                    }}
                                    clear={() => {
                                        let newQuestions = [...questions];
                                        newQuestions[currentQuestion].options = newQuestions[currentQuestion].options.map((option) => {
                                            option.result = false;
                                            return option;
                                        });
                                        setQuestions(newQuestions);
                                    }}
                                />
                                <div className={`w-full absolute left-0 bottom-0 transition-all duration-300  ${showNavigation ? " " : "translate-y-full"}`}>
                                    <div className="relative w-full h-full py-3 bg-gray-100 border-t">
                                        <button
                                            className="absolute top-0 left-1/2 -translate-y-full bg-gray-100 py-1 px-3 border rounded-t-md "
                                            onClick={() => {
                                                setShowNavigation(!showNavigation);
                                            }}
                                        >
                                            <ChevronDownIcon className={`size-3 ${showNavigation ? " " : "rotate-180"}`} />
                                        </button>
                                        <div className={` grid grid-cols-10  mx-auto w-1/2 gap-2`}>
                                            {questions.map((question, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`bg-gray-300 border  flex justify-center items-center ${currentQuestion === idx ? "border-gray-500" : "border-gray-200 "} ${
                                                        question.options.find((option) => option.result)?.result && "bg-gray-400 text-gray-200"
                                                    }`}
                                                    onClick={() => {
                                                        setCurrentQuestion(idx);
                                                    }}
                                                >
                                                    {idx + 1}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : currentState === "submitting" ? (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                            <h2>Submitting...</h2>
                        </div>
                    ) : currentState === "submitted" ? (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                            <h2>Quiz Submitted</h2>
                            {/* <button
                                onClick={() => {
                                    getResults();
                                }}
                                className="border border-blue-400 px-4 py-2 rounded mt-5"
                            >
                                View Results
                            </button> */}
                        </div>
                    ) : currentState === "results" ? (
                        <div className="w-full h-full flex flex-col">
                            <div className="py-3 px-5 text-xl bg-gray-100 flex justify-between items-center">
                                <h4>
                                    {results && "Results:"} Question {currentQuestion + 1} of {questions?.length}
                                </h4>

                                <div className="flex gap-1">
                                    <span>{results?.score}</span>
                                    <span>/</span>
                                    <span>{results?.maxScore}</span>
                                </div>
                            </div>
                            <div className="flex-grow bg-gray-50 p-10 pb-20">
                                <Question question={questions[currentQuestion]} result={results.results[currentQuestion]} />
                                <div className={`w-full absolute left-0 bottom-0 transition-all duration-300  ${showNavigation ? " " : "translate-y-full"}`}>
                                    <div className="relative w-full h-full py-3 bg-gray-100 border-t">
                                        <button
                                            className="absolute top-0 left-1/2 -translate-y-full bg-gray-100 py-1 px-3 border rounded-t-md "
                                            onClick={() => {
                                                setShowNavigation(!showNavigation);
                                            }}
                                        >
                                            <ChevronDownIcon className={`size-3 ${showNavigation ? " " : "rotate-180"}`} />
                                        </button>
                                        <div className={` grid grid-cols-10 mx-auto w-2/3 gap-2`}>
                                            {questions.map((question, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`bg-gray-300 border  flex justify-center items-center ${currentQuestion === idx ? "border-gray-500" : "border-gray-200 "} ${
                                                        question.options.find((option) => option.result)?.result && "bg-gray-400 text-gray-200"
                                                    }`}
                                                    onClick={() => {
                                                        setCurrentQuestion(idx);
                                                    }}
                                                >
                                                    {idx + 1}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </>
            )}
        </div>
    );
}

const Question = ({ question, clear, onAnswer, result }) => {
    console.log("questions: ", question);
    const onOptionClick = (id) => {
        // if (question.type === "single_choice") {
        onAnswer(id);
        // } else {
    };
    return (
        <>
            <p className="">{question.question}</p>
            <div className="mt-8 px-4 space-y-2">
                {/* <>
                    <label htmlFor="Option1" className="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-indigo-50">
                        <div className="flex items-center">
                            &#8203;
                            <input type="checkbox" className="size-4 rounded border-gray-300" id="Option1" />
                        </div>

                        <div>
                            <strong className="font-medium text-gray-900"> John Clapton </strong>
                        </div>
                    </label>
                </> */}
                {question.options?.map((option, idx) => (
                    <button
                        key={idx}
                        htmlFor={option._id}
                        onClick={() => {
                            onOptionClick(option._id);
                        }}
                        disabled={result}
                        className={`w-full flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition disabled:pointer-events-none   ${
                            option?.result ? "bg-gray-200 text-gray-600" : ""
                        } 
                            ${result && result.correctAnswer.find((ans) => ans === option._id) === option._id ? "bg-green-200 text-green-600" : ""}
                        `}
                    >
                        {/* <button
                                onClick={() => {
                                    onOptionClick(option._id);
                                }}
                                className={"w-full border border-transparent  hover:border-gray-300 rounded p-2 text-left" + (option?.result ? " bg-gray-200 text-gray-600" : "")}
                            > */}
                        {!result ? (
                            <>
                                {question.type === "multiple_choice" ? (
                                    <div className="flex items-center">
                                        &#8203;
                                        <input type="checkbox" className="size-5 rounded border-gray-300" id={option._id} onChange={() => {}} checked={option.result} />
                                    </div>
                                ) : (
                                    <span className="text-gray-400">{idx + 1}. </span>
                                )}
                            </>
                        ) : (
                            <>
                                {result.userAnswer.includes(result.correctAnswer.find((ans) => ans === option._id)) ? (
                                    <span className="text-green-500">
                                        <CheckCircleIcon className="size-6" />
                                    </span>
                                ) : result.userAnswer.includes(option._id) ? (
                                    <span className="text-red-500">
                                        <XCircleIcon className="size-6" />
                                    </span>
                                ) : (
                                    <div className="size-6"></div>
                                )}
                            </>
                        )}
                        <div>
                            <strong className="font-medium text-gray-900">{option.option} </strong>
                        </div>
                        {/* </button> */}
                    </button>
                ))}
                {!result &&
                    // check if the question is answered
                    question.options?.find((option) => option.result) && (
                        <button
                            onClick={() => {
                                clear();
                            }}
                            className=" flex items-center mt-5 text-sm hove disabled:pointer-events-none  text-gray-400 cursor-pointer"
                        >
                            <span>
                                <XMarkIcon className="w-5 h-5" />
                            </span>
                            Clear Selection
                        </button>
                    )}
            </div>
        </>
    );
};

export default TakeQuiz;
