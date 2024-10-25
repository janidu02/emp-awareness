import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "axios";

export const useMagicLinkStore = create((set) => ({
    magiclink: null,
    magiclinks: [],
    loading: false,
    getMagicLinks: async () => {
        set({ loading: true });
        try {
            const { data } = await axios.get("/api/magiclinks");
            set({ magiclinks: data.magiclinks });
        } catch (error) {
            toast.error(error?.response?.data?.message ? error.response.data.message : "Failed to fetch magiclinks");
        } finally {
            set({ loading: false });
        }
    },
    createMagicLink: async (magiclink) => {
        try {
            const { data } = await axios.post("/api/magiclinks", magiclink);
            set((state) => ({ magiclinks: [...state.magiclinks, data.magiclink] }));
            toast.success("Magic link created successfully");
            return data.token;
        } catch (error) {
            toast.error(error?.response?.data?.message ? error.response.data.message : "Failed to create magic link");
            return null;
        }
    },
    deleteMagicLink: async (id) => {
        try {
            await axios.delete(`/api/magiclinks/${id}`);
            set((state) => ({ magiclinks: state.magiclinks.filter((link) => link.id !== id) }));
            toast.success("Magic link deleted successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message ? error.response.data.message : "Failed to delete magic link");
        }
    },
}));
