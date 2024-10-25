import { ArrowTrendingUpIcon, PlusCircleIcon, QueueListIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { usePathwayStore } from "../../store/pathways.store";
import { Link } from "react-router-dom";
import { useUsersStore } from "../../store/users.store";

function PathwaysPage() {
    const { pathways, loading, getPathways } = usePathwayStore((state) => state);
    const { users, getUsers } = useUsersStore((state) => state);

    useEffect(() => {
        getPathways();
        // getUsers();
    }, []);

    return (
        <>
            <div className="rounded-lg py-1 border border-gray-200">
                <div className="flex items-center justify-between px-8 pt-4">
                    <form
                        className="relative"
                        onSubmit={(e) => {
                            e.preventDefault();
                            const filter = { title: e.target.Search.value };
                            getPathways(filter);
                        }}
                    >
                        <label htmlFor="Search" className="sr-only">
                            {" "}
                            Search{" "}
                        </label>

                        <input
                            type="text"
                            id="Search"
                            placeholder="Search by title..."
                            className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
                            // onChange={(e) => {
                            //     const filter = { title: e.target.value };
                            //     getPathways(filter);
                            // }}
                        />

                        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                            <button type="submit" className="text-gray-600 hover:text-gray-700">
                                <span className="sr-only">Search</span>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </button>
                        </span>
                    </form>
                    {/* <button className="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500">
                        Create
                    </button> */}
                </div>

                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5 p-8">
                    {pathways.map((pathway, idx) => (
                        <article key={idx} className="rounded-xl bg-white p-4 ring ring-indigo-100 sm:p-6 lg:p-8">
                            <div className="flex items-start sm:gap-8">
                                <div className="hidden sm:grid sm:size-20 sm:shrink-0 sm:place-content-center text-indigo-500 sm:rounded-full sm:border-2 sm:border-indigo-500" aria-hidden="true">
                                    <ArrowTrendingUpIcon className="size-10 rounded-full object-cover" />
                                </div>

                                <div>
                                    <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">Pathway </strong>

                                    <h3 className="mt-4 text-lg font-medium sm:text-xl">
                                        <Link to={pathway._id} className="hover:underline">
                                            {pathway.title}
                                        </Link>
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-700">{pathway.description}</p>

                                    <div className="mt-4 sm:flex sm:items-center sm:gap-2">
                                        <div className="flex items-center gap-1 text-gray-500">
                                            <QueueListIcon className="size-4" />

                                            <p className="text-xs font-medium">{pathway.materials_count} Materials</p>
                                        </div>

                                        <span className="hidden sm:block" aria-hidden="true">
                                            &middot;
                                        </span>

                                        <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
                                            Created by <span className="text-gray-700">{users.find((user) => user._id === pathway.createdBy)?.firstName}</span>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <button className="">
                                            <Link
                                                to={`${pathway._id}/results`}
                                                className="inline-block rounded border border-indigo-600 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                                            >
                                                View Results
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}

                    <Link to="create" className="rounded-xl bg-white p-4 ring hover:bg-indigo-50 hover:ring-indigo-300  ring-indigo-100 sm:p-6 lg:p-8 flex gap-1 flex-col items-center justify-center">
                        {/* <div className="hidden sm:grid sm:size-20 sm:shrink-0 sm:place-content-center text-indigo-500 sm:rounded-full sm:border-2 sm:border-indigo-500" aria-hidden="true"> */}
                        <PlusCircleIcon className="size-24 text-indigo-300 rounded-full object-cover" />
                        <span className=" font-semibold text-lg text-indigo-300">New Pathway</span>

                        {/* </div> */}
                    </Link>
                </div>
            </div>
        </>
    );
}

export default PathwaysPage;
