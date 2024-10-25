import React, { useEffect } from "react";
import { Link, Outlet, Route, Routes, useParams } from "react-router-dom";
import { usePathwayStore } from "../../store/pathways.store";
import FloatModal from "../../components/admin/FloatModal";
import TakeQuiz from "../../components/employee/TakeQuiz";

function PathwayResultsPage() {
    const params = useParams();
    const { pathwayResults: pathway, getPathway, updatePathway, deletePathway, getPathwayResults } = usePathwayStore((state) => state);
    const [selectedQuiz, setSelectedQuiz] = React.useState(null);
    useEffect(() => {
        if (params.id) {
            getPathwayResults(params.id);
        }
    }, [params.id]);
    return (
        <>
            <div className=" h-full flex flex-col ">
                <div className="">
                    <div className="flex items-center justify-between px-4 py-2">
                        <h2 className="text-2xl font-semibold">
                            Pathway: <span className=" font-medium">{pathway?.pathwayTitle}</span>
                        </h2>
                    </div>
                    <div className="mt-5">
                        <div className="overflow-x-auto">
                            {pathway?.enrolled && (
                                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                    <thead className="text-left">
                                        <tr>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ID</th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
                                            {pathway?.enrolled[0].quizResults.map((quiz, index) => (
                                                <th key={index} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                    {quiz?.title}
                                                </th>
                                            ))}

                                            {/* <th className="px-4 py-2"></th> */}
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200">
                                        {pathway?.enrolled.map((enrolled, index) => (
                                            <tr key={index}>
                                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{enrolled?.employeeId}</td>
                                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{enrolled?.name}</td>
                                                {enrolled?.quizResults?.map((quiz, index) => (
                                                    <td key={index} className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                        {/* {quiz.score}/{quiz.maxScore} */}
                                                        {((quiz?.score / quiz?.maxScore) * 100).toFixed(2)}%
                                                        <button
                                                            onClick={() => {
                                                                setSelectedQuiz({ quizId: quiz.quizId, userId: enrolled.userId });
                                                            }}
                                                            className="ml-5 inline-block rounded border text-indigo-700 border-indigo-600 px-4 py-1 text-xs font-medium  hover:bg-indigo-700"
                                                        >
                                                            Results
                                                        </button>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {selectedQuiz && (
                <FloatModal title="Quiz Results" onClose={() => setSelectedQuiz(null)}>
                    {console.log(selectedQuiz)}
                    <TakeQuiz pathwayId={params.id} quizId={selectedQuiz.quizId} userId={selectedQuiz.userId} />
                </FloatModal>
            )}
        </>
    );
}

export default PathwayResultsPage;
