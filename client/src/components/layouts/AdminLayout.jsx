import React, { useEffect } from "react";
import SideBar from "../admin/AdminSideBar";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { useUsersStore } from "../../store/users.store";

export default function AdminLayout() {
    const { user } = useAuthStore((state) => state);
    const { users, getUsers } = useUsersStore((state) => state);
    useEffect(() => {
        if (!user) {
            window.location.href = "/#/login";
        }
        if (user?.role !== "admin" && user?.role !== "manager") {
            window.location.href = "/";
        }
        getUsers();
    }, [user]);
    return (
        <main className="flex overflow-y-hidden">
            <SideBar />
            <div className="max-h-screen p-10 flex-1 overflow-y-scroll">
                <Outlet />
            </div>
        </main>
    );
}
