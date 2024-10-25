import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "axios";

export const useAuthStore = create((set) => ({
    user: null,
    loading: false,
    setUser: (user) => set({ user }),
    login: async (email, password) => {
        set({ loading: true });
        try {
            const { data } = await axios.post("/api/auth/login", { email, password });
            set({ user: data.user });
            if (data.user.role === "admin" || data.user.role === "manager") {
                window.location.href = "/#/admin";
                toast("🎉 Welcome Admin");
            }
            if (data.user.role === "employee") {
                window.location.href = "/";
                toast("🎉 Welcome Employee");
            }
            localStorage.setItem("auth_token", data?.auth_token);
            toast.success("Login successful.");
        } catch (error) {
            toast.error(error?.response?.data?.message ? error.response.data.message : "Login failed.");
        }
        set({ loading: false });
    },
    logout: async () => {
        set({ loading: true });
        try {
            const { data } = await axios.get("/api/auth/logout");
        } catch (error) {
            toast.error(error?.response?.data?.message ? error.response.data.message : "Logout failed.");
        }
        set({ user: null });
        toast.success("Logout successful.");
        localStorage.removeItem("auth_token");
        window.location.href = "/#/login";
        set({ loading: false });
    },
    register: async (email, password, firstName, lastName, token) => {
        set({ loading: true });
        try {
            let url = "/api/auth/register";

            const { data } = await axios.post(url, { email, password, firstName, lastName, token });
            set({ user: data.user });

            toast.success("Registration successful.");
            window.location.href = "/#/login";
        } catch (error) {
            // console.log(error);
            toast.error(error?.response?.data?.message ? error.response.data.message : "Registration failed.");
        }
        set({ loading: false });
    },
    identify: async () => {
        set({ loading: true });
        try {
            const { data } = await axios.get("/api/auth/identify");
            set({ user: data.user });
            if ((data.user.role === "admin" || data.user.role === "manager") && window.location.href.indexOf("/admin") === -1) {
                window.location.href = "/#/admin";
                return data.user;
            }
            if (data.user.role === "employee" && window.location.href.indexOf("/") === -1) {
                window.location.href = "/";
                return data.user;
            }
        } catch (error) {
            // console.log(error);

            toast.error(error?.response?.data?.message ? error.response.data.message : "Failed to identify user.");
            if (error?.response?.status === 401) {
                window.location.href = "/#/login";
            }
        }
        set({ loading: false });
    },
}));
