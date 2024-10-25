import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMagicLinkStore } from "../../store/magiclink.store";

function MagicLinkModel() {
    const location = useLocation();
    const navigate = useNavigate();
    const { magiclinks, createMagicLink } = useMagicLinkStore((state) => state);
    const [open, setOpen] = React.useState(true);
    const [generatedLink, setGeneratedLink] = React.useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const role = formData.get("role") || "employee";
        const department = formData.get("department") || "Management";
        console.log("role selected: ", role);
        const expire = formData.get("expire");
        const pathway = formData.get("pathway");

        let magiclink = await createMagicLink({ email, role, expire, pathway, department });
        let host = window.location.hostname;
        if (magiclink === null) return;
        setGeneratedLink(`${host}/#/register?token=${magiclink}`);
    };

    useEffect(() => {
        if (location.pathname === "/admin/magiclinks/create") {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [location.pathname]);

    return (
        <div
            className={`${
                open ? "" : "hidden"
            } overflow-y-auto bg-black bg-opacity-30 backdrop-blur overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full`}
        >
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow max-w-[90%] lg:max-w-[75%] xl:max-w-[40%] mx-auto mt-20">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-lg font-semibold text-gray-900">Generate Magic Link</h3>
                    <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                        onClick={() => navigate("/admin/magiclinks")}
                    >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                {/* Modal body */}

                <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                    {generatedLink && (
                        <div>
                            <label htmlFor="link" className="block mb-2 text-sm font-medium text-gray-900">
                                Magic Link
                            </label>
                            <textarea id="link" value={generatedLink} rows="4" className="p-2.5 text-xs bg-green-50 border-2 w-full border-green-300 rounded-lg" />
                        </div>
                    )}

                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="email address"
                                required=""
                            />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900">
                                Department
                            </label>
                            <select
                                id="department"
                                name="department"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            >
                                <option value="Management">Management</option>
                                <option value="Human Resource">Human Resource</option>
                                <option value="Development">Development</option>
                                <option value="Quality Assurance">Quality Assurance</option>
                            </select>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900">
                                Role
                            </label>
                            <select
                                id="role"
                                name="role"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            >
                                <option value="employee">Employee</option>
                                <option value="manager">Manager</option>
                            </select>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="expire" className="block mb-2 text-sm font-medium text-gray-900">
                                Expires In(hours)
                            </label>
                            <input
                                type="number"
                                name="expire"
                                id="expire"
                                defaultValue={1}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="1h"
                                required=""
                            />
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="pathway" className="block mb-2 text-sm font-medium text-gray-900">
                                Pathway ID
                            </label>
                            <input
                                type="text"
                                name="pathway"
                                id="pathway"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder=" pathway id"
                                required=""
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="text-white inline-flex items-center bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Generate
                    </button>
                </form>
            </div>
        </div>
    );
}

export default MagicLinkModel;
