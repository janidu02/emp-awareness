import { CheckBadgeIcon, CheckCircleIcon, PlayCircleIcon, QuestionMarkCircleIcon, QueueListIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function MaterialList({ materials, progress = 0, progressDetails = [], current, setCurrent }) {
    materials = materials?.sort((a, b) => a.order - b.order);
    const [completedList, setCompletedList] = React.useState([]);

    React.useEffect(() => {
        let list = progressDetails?.filter((item) => item.status === "completed");
        setCompletedList(
            list.map((item) => {
                return { id: item.materialId, status: item.status };
            })
        );
    }, [progressDetails]);

    return (
        <>
            <div className="mt-10">
                <h2 className="sr-only">Steps</h2>

                <div>
                    <div className="grid grid-cols-1 divide-x divide-gray-300 overflow-hidden rounded-lg  text-sm text-gray-500 sm:grid-cols-5">
                        {materials?.map((material, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrent(idx)}
                                disabled={progress > idx}
                                className={`relative text-left flex items-center justify-start pl-14 gap-2   text-current p-4 ${
                                    completedList?.find((item) => item.id === material._id) ? "bg-green-300" : current == idx ? "bg-gray-200" : "bg-gray-100"
                                }  disabled:cursor-not-allowed`}

                                //  ? "bg-green-300" : progress == idx ? "" : "bg-gray-100"
                            >
                                <span
                                    className={`absolute size-6 right-0 hidden  rotate-45 z-10  translate-x-1/2 border-t border-r border border-gray-300 sm:block border-b-0 border-s-0 ${
                                        completedList?.find((item) => item.id === material._id) ? "bg-green-300" : current == idx ? "bg-gray-200" : "bg-gray-100"
                                    }`}
                                ></span>

                                {/* <svg className="size-7 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                                    />
                                </svg> */}
                                <TypeIcon type={material.type} done={completedList?.find((item) => item.id === material._id)} />

                                <p className="leading-none ">
                                    <strong className="block font-medium"> {material.title} </strong>
                                    {console.log(
                                        "filter",
                                        completedList?.find((item) => item.id !== material._id)
                                    )}
                                    <small className="mt-1 ">
                                        {material.type === "embed" ? "embed video" : material.type}
                                        {/* &middot;{" "}{!completedList?.find((item) => item.id === material._id) ? (current === idx ? "" : "locked") : ""}{" "} */}
                                    </small>
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

const TypeIcon = ({ type, done }) => {
    if (done) {
        return <CheckCircleIcon className="size-7 shrink-0" strokeWidth={2} />;
    }
    if (type === "video") {
        return <PlayCircleIcon className="size-7 shrink-0" strokeWidth={2} />;
    }
    if (type === "quiz") {
        return <QuestionMarkCircleIcon className="size-7 shrink-0" strokeWidth={2} />;
    }
    if (type === "embed") {
        return <PlayCircleIcon className="size-7 shrink-0" strokeWidth={2} />;
    }
};
