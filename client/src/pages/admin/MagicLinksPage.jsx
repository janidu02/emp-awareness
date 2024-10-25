import React, { useEffect } from "react";
import { useUsersStore } from "../../store/users.store";
import { ArchiveBoxXMarkIcon, PencilIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Badge from "../../components/common/Badge";
import { Link, Outlet } from "react-router-dom";
import { useMagicLinkStore } from "../../store/magiclink.store";

export default function MagicLinksPage() {
    const { magiclinks, getMagicLinks, deleteMagicLink } = useMagicLinkStore((state) => state);
    useEffect(() => {
        getMagicLinks();
    }, []);
    return (
        <>
            <Outlet />
            <div className="rounded-lg py-1 border border-gray-200">
                <div className="flex items-center justify-between px-4 py-2">
                    <h3 className="text-xl font-semibold">Magic Links</h3>
                    <Link
                        className="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                        to="create"
                    >
                        Create
                    </Link>
                </div>

                <div className="overflow-x-auto rounded-t-lg">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="text-left">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">Email</th>
                                <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">Role</th>
                                <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">Department</th>
                                <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">Expires In</th>
                                <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">Used</th>
                                <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-900"></th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {magiclinks.map((magiclink) => (
                                <tr>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{magiclink.email}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{magiclink.role}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{magiclink.department || "-"}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{magiclink.expiresAt}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{magiclink.used ? "Used" : "Available"}</td>

                                    <td className="flex items-center whitespace-nowrap px-4 py-2 justify-center gap-2">
                                        <button
                                            onClick={async () => {
                                                await deleteMagicLink(magiclink._id);
                                                await getMagicLinks();
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
