import React, { useEffect } from "react";
import { useUsersStore } from "../../store/users.store";
import { ArchiveBoxXMarkIcon, PencilIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Badge from "../../components/common/Badge";
import { Link } from "react-router-dom";

export default function UsersPage() {
    const { users, loading, getUsers, deleteUser } = useUsersStore((state) => state);
    useEffect(() => {
        getUsers();
    }, []);
    return (
        <>
            <div className="rounded-lg py-1 border border-gray-200">
                <div className="flex items-center justify-between px-4 py-2">
                    <div className="relative">
                        <label htmlFor="Search" className="sr-only">
                            {" "}
                            Search{" "}
                        </label>

                        <input type="text" id="Search" placeholder="Search for..." className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm" />

                        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                            <button type="button" className="text-gray-600 hover:text-gray-700">
                                <span className="sr-only">Search</span>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </button>
                        </span>
                    </div>
                    <Link
                        to="/admin/magiclinks"
                        className="group inline-block rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
                    >
                        <span className="flex items-center gap-2 rounded-sm bg-white px-4 py-2.5 text-sm font-medium group-hover:bg-transparent">
                            {" "}
                            <SparklesIcon className="size-4" /> Magic Link{" "}
                        </span>
                    </Link>
                </div>

                <div className="overflow-x-auto rounded-t-lg">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="text-left">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">ID</th>
                                <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">Name</th>
                                <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">Email</th>
                                <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">Department</th>
                                <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">Role</th>
                                <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">Status</th>
                                <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-900"></th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{user.id}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{`${user.firstName} ${user.lastName}`}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.email}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.department || "-"}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.role}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        {user.active ? <Badge className="bg-green-100 text-green-700">Active</Badge> : <Badge className="bg-red-100 text-red-700">Block</Badge>}
                                    </td>
                                    <td className="flex items-center whitespace-nowrap px-4 py-2 justify-center gap-2">
                                        {/* <button className="text-indigo-500 p-1 hover:text-indigo-600  border-blue-400 bg-indigo-100 rounded-md">
                                            <PencilIcon className="size-4" />
                                        </button> */}
                                        <button
                                            onClick={async () => {
                                                await deleteUser(user.id);
                                            }}
                                            className="text-red-500 p-1 hover:text-red-600  border-red-400 bg-red-100 rounded-md"
                                        >
                                            <ArchiveBoxXMarkIcon className=" size-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
