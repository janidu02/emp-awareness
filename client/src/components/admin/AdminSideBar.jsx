import React, { useEffect } from "react";
import { CheckCircleIcon, HomeIcon, ListBulletIcon, PowerIcon, PresentationChartLineIcon, UserIcon, UsersIcon } from "@heroicons/react/24/solid";
import { useAuthStore } from "../../store/auth.store";
import { useLocation, Link, NavLink } from "react-router-dom";

const active_class = "text-indigo-700 border-blue-500 bg-indigo-50  flex items-center gap-2 border-s-[3px]   px-4 py-3";
const inactive_class = "border-transparent hover:bg-gray-50 text-gray-500 hover:border-gray-100  hover:text-gray-700 flex items-center gap-2 border-s-[3px]   px-4 py-3";

export default function SideBar() {
    const { pathname } = useLocation();
    console.log(pathname);
    const { user, logout, identify } = useAuthStore((state) => state);
    console.log(user);

    useEffect(() => {
        if (!user) {
            identify();
        }
    }, []);

    return (
        <>
            <div className="flex h-screen flex-col max-w-52 justify-between border-e bg-white">
                <div>
                    <div className="sticky inset-x-0 bottom-0  border-gray-100 ">
                        <Link to="/admin" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
                            <div className="size-10 flex items-center justify-center bg-indigo-100 rounded-full">{user?.firstName.substring(0, 1)}</div>
                            {/* <img
                                alt=""
                                src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                className="size-10 rounded-full object-cover"
                            /> */}

                            <div className="max-w-[75%] overflow-hidden">
                                <div className="text-xs">
                                    <strong className="block font-medium">{`${user?.firstName} ${user?.lastName}`}</strong>

                                    <span className="block  truncate"> {user?.email} </span>
                                    <span className="block  truncate"> {user?.role} </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="py-2 border-t">
                        {/* <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">Logo</span> */}

                        <ul>
                            <li>
                                <NavLink
                                    to="/admin"
                                    end
                                    // className={`${({ isActive, isPending }) => {
                                    //     return isActive
                                    //         ? "text-indigo-700 border-blue-500 bg-indigo-50 pointer-events-none"
                                    //         : "border-transparent hover:bg-gray-50 text-gray-500 hover:border-gray-100  hover:text-gray-700";
                                    // }} flex items-center gap-2 border-s-[3px]   px-4 py-3`}
                                    className={({ isActive }) => (isActive ? active_class : inactive_class)}

                                    // className={`flex items-center gap-2 border-s-[3px]   px-4 py-3  ${
                                    //     pathname === "/admin"
                                    //         ? "text-indigo-700 border-blue-500 bg-indigo-50 pointer-events-none"
                                    //         : "border-transparent hover:bg-gray-50 text-gray-500 hover:border-gray-100  hover:text-gray-700"
                                    // }`}
                                >
                                    <HomeIcon className="size-5" />

                                    <span className="text-sm font-medium"> Dashboard </span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/admin/users" className={({ isActive }) => (isActive ? active_class : inactive_class)}>
                                    <UsersIcon className="size-5" />

                                    <span className="text-sm font-medium"> Users </span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/admin/pathways" className={({ isActive }) => (isActive ? active_class : inactive_class)}>
                                    <PresentationChartLineIcon className="size-5" />

                                    <span className="text-sm font-medium"> Pathways </span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/admin/quizzes" className={({ isActive }) => (isActive ? active_class : inactive_class)}>
                                    <ListBulletIcon className="size-5" />

                                    <span className="text-sm font-medium"> Quizzes </span>
                                </NavLink>
                            </li>

                            {/* <li>
                                <NavLink to="/admin/account" className={({ isActive }) => (isActive ? active_class : inactive_class)}>
                                    {" "}
                                    <UserIcon className="size-5" />
                                    <span className="text-sm font-medium"> Account </span>
                                </NavLink>
                            </li> */}
                        </ul>
                    </div>
                </div>
                <button className=" group flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-gray-500 border-t" onClick={logout}>
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-indigo-200 ">
                        <PowerIcon className="size-5" />
                    </div>

                    <div className=" gap-x-2">Log out</div>
                </button>
            </div>
        </>
    );
}
