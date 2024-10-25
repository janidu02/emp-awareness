import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { PowerIcon } from "@heroicons/react/24/outline";

function Navbar() {
    const { user, logout } = useAuthStore((state) => state);
    return (
        <nav className="bg-gray-100 rounded-b-lg flex items-center py-4 px-10 justify-between">
            {/* <div className="font-bold text-2xl">CreaTec ✨</div> */}
            <Link to="/" className="">
                <img src="/static/logo.png" alt="logo" className="h-10" />
            </Link>

            <button className="flex items-center gap-2 text-right  px-4 group" onClick={logout}>
                <div className="">
                    {user?.firstName && (
                        <p className="text-xs">
                            <strong className="block font-medium">{`${user?.firstName} ${user?.lastName}`}</strong>

                            <span> {user?.email} </span>
                            <small className="block">
                                <span className="pr-1">{user?.role}</span>
                                <span className=" underline text-indigo-500">logout</span>
                            </small>
                        </p>
                    )}
                </div>
                <div className="size-10 text-lg  bg-indigo-100 rounded-full  overflow-hidden transition-all duration-300">
                    <div className="w-full h-full flex items-center justify-center group-hover:-translate-y-full transition-all duration-300">{user?.firstName.substring(0, 1)}</div>
                    <div className="w-full h-full flex items-center justify-center group-hover:-translate-y-full transition-all duration-300">
                        <PowerIcon className="size-5" />
                    </div>
                </div>
                {/* <img
                                alt=""
                                src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                className="size-10 rounded-full object-cover"
                            /> */}
            </button>
        </nav>
    );
}

export default Navbar;
