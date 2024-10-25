import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "axios";

export const useUsersStore = create((set) => ({
    users: [],
    loading: false,
    // setUser: (user) => set({ user }),
    getUsers: async (filter) => {
        set({ loading: true });
        try {
            const { data } = await axios.get("/api/users");
            set({ users: data.users });

            // toast.success("Login successful.");
        } catch (error) {
            toast.error(error?.response?.data?.message ? error.response.data.message : "Failed to fetch data.");
        }
        set({ loading: false });
    },
    deleteUser: async (id) => {
        set({ loading: true });
        try {
            await axios.delete(`/api/users/${id}`);
            // await getUsers();
            
            toast.success("User deleted successfully.");
        } catch (error) {
            toast.error(error?.response?.data?.message ? error.response.data.message : "Failed to delete user.");
        }
        set({ loading: false });
    },
}));
