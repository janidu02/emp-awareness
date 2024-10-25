import React, { useEffect } from "react";
import { usequizzestore } from "../../store/quiz.store";
import { useParams } from "react-router-dom";
import { useUsersStore } from "../../store/users.store";
import { ArchiveBoxXMarkIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

function QuizIdPage() {
    const params = useParams();
    const { quiz, getQuiz, deleteQuiz, updateQuiz, createQuiz } = usequizzestore((state) => state);
    const { users, getUsers } = useUsersStore((state) => state);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [questions, setQuestions] = React.useState([]);

    const updateQuizHandler = () => {
        updateQuiz(params.id, { title, description, questions });
    };

    const createQuizHandler = () => {
        createQuiz({ title, description, questions });
    };

    const getInitialData = async () => {
        const quiz = await getQuiz(params.id);
        setTitle(quiz.title);
        setDescription(quiz.description);
        setQuestions(quiz.questions);
        getUsers();
    };

    useEffect(() => {
        if (params.id === "create") {
            setQuestions([{ question: "", type: "single_choice", options: [], order: 0 }]);
            return;
        } else {
            getInitialData();
        }
    }, []);
    return (
        <div className="flex flex-col h-screen ">
            <div className="flex items-center justify-between px-4 py-2 ">
                <h2 className="text-lg font-medium">Quiz</h2>
                <div className="flex items-center gap-2">
                    {/* Base */}
                    {params.id === "create" ? (
                        <button
                            onClick={createQuizHandler}
                            className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                        >
                            Create
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={updateQuizHandler}
                                className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                            >
                                Save
                            </button>

                            {/* Border */}

                            <button
                                onClick={() => {
                                    deleteQuiz(params.id);
                                }}
                                className="inline-block rounded border border-red-600 px-12 py-3 text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring active:bg-red-500"
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div className="h-[1px] bg-gray-100 my-4"></div>

            <div className="grid grid-cols-5 flex-grow h-full overflow-y-scroll">
                <div className=" col-span-2 border-r px-2">
                    {/* <div>
                    <label htmlFor="UserEmail" className="block text-xs font-medium text-gray-700">
                        {" "}
                        Email{" "}
                    </label>

                    <input type="email" id="UserEmail" placeholder="john@rhcp.com" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" />
                </div> */}
                    <div className="grid grid-cols-3 items-start gap-4 py-6 px-3 ">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                            Title
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                            <input
                                id="title"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder=""
                                className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={""}
                            />
                        </div>
                    </div>
                    <hr />
                    <div className="grid grid-cols-3 items-start gap-4 py-6 px-3">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                            Description
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                            <textarea
                                id="about"
                                name="about"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder=""
                                rows={3}
                                className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-span-3 px-5 overflow-y-scroll h-full pb-40">
                    <h4 className="text-lg">Questions</h4>
                    <div className="mt-10 flex flex-col gap-y-2">
                        {questions.map((question, idx) => (
                            <div key={idx} className="flex items-start gap-2 bg-gray-100 p-5 rounded-lg">
                                <div className="flex-grow pr-4 ">
                                    <div className="w-full flex items-center gap-3">
                                        <input
                                            id="about"
                                            name="about"
                                            value={question.question}
                                            placeholder={`Question ${idx + 1}`}
                                            onChange={(e) => {
                                                setQuestions((prev) => {
                                                    const newQuestions = [...prev];
                                                    newQuestions[idx].question = e.target.value;
                                                    return newQuestions;
                                                });
                                            }}
                                            className="block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <div className="min-w-40">
                                            <select
                                                name="type"
                                                id="type"
                                                // value={question.type}
                                                defaultValue={question.type}
                                                onChange={(e) => {
                                                    setQuestions((prev) => {
                                                        const newQuestions = [...prev];
                                                        newQuestions[idx].type = e.target.value;
                                                        return newQuestions;
                                                    });
                                                }}
                                                className=" w-full rounded-lg py-1.5 border-gray-300 text-gray-700 sm:text-sm"
                                            >
                                                {[
                                                    { value: "single_choice", label: "Single Choice" },
                                                    { value: "multiple_choice", label: "Multiple Choice" },
                                                ].map((item, idx) => (
                                                    <option key={idx} value={item.value}>
                                                        {item.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => {
                                                    setQuestions((prev) => prev.filter((_, i) => i !== idx));
                                                }}
                                                className="text-red-500 p-1.5 hover:text-red-600  border-red-400 bg-red-100 rounded-md"
                                            >
                                                <ArchiveBoxXMarkIcon className=" size-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-5 grid grid-cols-1 gap-4 w-11/12 ">
                                        {question.options.map((option, i) => (
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    className="size-6 rounded border-gray-300"
                                                    id={`Option${i}`}
                                                    checked={question.options[i].isCorrect}
                                                    onChange={(e) => {
                                                        setQuestions((prev) => {
                                                            if (question.type === "single_choice") {
                                                                const newQuestions = [...prev];
                                                                newQuestions[idx].options = newQuestions[idx].options.map((option, j) => {
                                                                    return { ...option, isCorrect: i === j };
                                                                });
                                                                return newQuestions;
                                                            }
                                                            const newQuestions = [...prev];
                                                            newQuestions[idx].options[i].isCorrect = e.target.checked;
                                                            return newQuestions;
                                                        });
                                                    }}
                                                />
                                                <input
                                                    type="text"
                                                    value={question.options[i].option}
                                                    onChange={(e) => {
                                                        setQuestions((prev) => {
                                                            const newQuestions = [...prev];
                                                            newQuestions[idx].options[i].option = e.target.value;
                                                            return newQuestions;
                                                        });
                                                    }}
                                                    placeholder={`Option ${i + 1}`}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <button
                                                    onClick={() => {
                                                        let newQuestions = [...questions];
                                                        newQuestions[idx].options = newQuestions[idx].options.filter((_, j) => j !== i);
                                                        setQuestions(newQuestions);
                                                    }}
                                                    className="text-gray-400  "
                                                >
                                                    <XMarkIcon className=" size-7" />
                                                </button>
                                            </div>
                                        ))}
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                let newOptions = [...question.options];
                                                newOptions.push({ option: e.target.option_input.value, isCorrect: false });
                                                setQuestions((prev) => {
                                                    const newQuestions = [...prev];
                                                    newQuestions[idx].options = newOptions;
                                                    return newQuestions;
                                                });
                                                // clear the form
                                                e.target.option_input.value = "";
                                            }}
                                            className="flex items-center gap-3"
                                        >
                                            {/* <input type="checkbox" className="size-6 rounded border-gray-300" id="option_checkbox" disabled /> */}
                                            <input
                                                type="text"
                                                id="option_input"
                                                placeholder={`Option ${question.options.length + 1}`}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <button type="submit" className="text-indigo-500 p-1.5 hover:text-indigo-600  border-indigo-400 bg-indigo-100 rounded-md">
                                                <PlusIcon className=" size-5" />
                                            </button>
                                        </form>
                                    </div>
                                    {/* <p className="text-xs text-gray-500">{question.type}</p> */}
                                </div>
                            </div>
                        ))}
                        <div className="relative flex items-center justify-center ">
                            <div className="absolute inset-0 h-[1px] flex z-0 items-center bg-gray-200 top-1/2" />
                            <button
                                onClick={() => {
                                    setQuestions((prev) => [...prev, { question: "", type: "single_choice", options: [], order: prev.length }]);
                                }}
                                className="flex items-center z-10 gap-2 py-2 px-5 border border-transparent hover:border-gray-200 rounded-md bg-white "
                            >
                                <PlusIcon className=" size-6" />
                                <span>Add Question</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuizIdPage;
