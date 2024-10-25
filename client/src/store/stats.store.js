import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "axios";

export const useStatsStore = create((set) => ({
    stats: {},
    loading: false,
    getStats: async (filter = {}) => {
        set({ loading: true });

        try {
            const { data } = await axios.get(`/api/stats`);
            set({ stats: data });
            console.log(data);
            return data;
        } catch (error) {
            toast.error(error?.response?.data?.message ? error.response.data.message : "Failed to fetch data.");
        }
        set({ loading: false });
    },
}));
