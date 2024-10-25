import React, { useEffect } from "react";

import { useAuthStore } from "../../store/auth.store";
import MaterialList from "../../components/employee/MaterialList";
import { usePathwayStore } from "../../store/pathways.store";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Navbar from "../../components/employee/Navbar";
import TakeQuiz from "../../components/employee/TakeQuiz";
import PDFViewer from "../../components/employee/PDFViewer";

function HomePage() {
    const { user, identify } = useAuthStore((state) => state);
    const { pathways, getPathways, markAsDoneMaterial } = usePathwayStore((state) => state);
    const [pathway, setPathway] = React.useState(null);
    const [current, setCurrent] = React.useState(0);
    const [userEnrolledData, setUserEnrolledData] = React.useState(null);
    console.log(user);
    useEffect(() => {
        if (!user) identify();
        if (!user) return;
        if (pathways.length === 0) getPathways();
    }, [user, pathway]);
    useEffect(() => {
        if (pathways.length > 0) {
            setPathway(pathways[0]);
            setUserEnrolledData(pathways[0]?.enrolled[0]);

            // let current = 0;
            // userEnrolledData?.progressDetails.map((item, idx) => {
            //     console.log("item: ", item);

            //     if (item.materialId === pathway?.materials[current]?._id && idx === userEnrolledData?.progressDetails.length) {
            //         current++;
            //         console.log("current: ", current);
            //     }
            // });
            // setCurrent(current);
        }
    }, [pathways]);

    // console.log("materieals: ", pathway?.materials[current]?.source);
    // return <div>HomePage: {user?.firstName + " " + user?.lastName}</div>;
    return (
        <main className=" max-w-7xl mx-auto p-5 pt-0  h-screen">
            <Navbar />
            <MaterialList materials={pathway?.materials} progressDetails={userEnrolledData?.progressDetails} current={current} setCurrent={setCurrent} />

            <div className=" mt-10 ">
                <div className="flex flex-col h-full">
                    <div className="py-3 flex items-center justify-between p-5 ">
                        <div className="">
                            <h2 className="text-2xl font-bold">{pathway?.materials[current]?.title}</h2>
                            <p className="text-gray-500">{pathway?.materials[current]?.type}</p>
                        </div>
                        <div className="">
                            {pathway?.materials[current]?.type !== "quiz" && (
                                <button
                                    className="bg-green-400 mx-auto hover:bg-green-500 text-white font-bold py-2 px-5 rounded flex items-center gap-2.5"
                                    onClick={async () => {
                                        await markAsDoneMaterial(pathway?._id, pathway?.materials[current]?._id);
                                        await getPathways();
                                        // setCurrent(current + 1);
                                    }}
                                >
                                    <CheckCircleIcon className="size-5" />
                                    Mark as complete
                                </button>
                            )}
                        </div>
                    </div>
                    <div
                        className={`${
                            pathway?.materials[current]?.type === "embed" ? "aspect-video" : " aspect-square overflow-y-scroll"
                        }  lg:aspect-video flex-1 size-full rounded-lg border-2 border-gray-200`}
                    >
                        {pathway?.materials[current]?.type === "embed" ? (
                            <iframe
                                className="w-full h-full   rounded-lg border-2 border-gray-200 "
                                src={pathway?.materials[current]?.source}
                                title="Embedded youtube"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        ) : pathway?.materials[current]?.type === "video" ? (
                            <video className="w-full h-full">
                                <source src={pathway?.materials[current]?.source} type="video/mp4" />
                            </video>
                        ) : pathway?.materials[current]?.type === "pdf" ? (
                            <PDFViewer src={pathway?.materials[current]?.source} className="w-full h-full" />
                        ) : pathway?.materials[current]?.type === "quiz" ? (
                            <TakeQuiz
                                quizId={pathway?.materials[current]?.source}
                                materialId={pathway?.materials[current]?._id}
                                pathwayId={pathway?._id}
                                onSubmit={async () => {
                                    markAsDoneMaterial(pathway?._id, pathway?.materials[current]?._id);
                                    await getPathways();
                                    // setCurrent(current + 1);
                                }}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-5 pb-10"></div>
        </main>
    );
}

export default HomePage;
