import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "axios";
import { toQueryString } from "../utils";

export const usePathwayStore = create((set) => ({
    pathways: [],
    pathway: null,
    loading: false,
    pathwayResults: [],
    // setUser: (user) => set({ user }),
    getPathways: async (filter = {}) => {
        set({ loading: true });

        try {
            console.log(toQueryString(filter));
            const { data } = await axios.get(`/api/pathways?${toQueryString(filter)}`);
            set({ pathways: data.pathways });
            return data.pathways;

            // toast.success("Login successful.");
        } catch (error) {
            toast.error(error?.response?.data?.message ? error.response.data.message : "Failed to fetch data.");
        }
        set({ loading: false });
    },
    getPathway: async (id) => {
        set({ loading: true });
        try {
            const { data } = await axios.get(`/api/pathways/${id}`);
            set({ pathway: data.pathway, loading: false });
            return data.pathway;
            // toast.success("Login successful.");
        } catch (error) {
            toast.error(error?.response?.data?.message ? error.response.data.message : "Failed to fetch data.");
        }
        set({ loading: false });
    },
    updatePathway: async (id, data) => {
        set({ loading: true });
        try {
            const { data: res } = await axios.put(`/api/pathways/${id}`, data);
            set({ pathway: res.pathway });

            toast.success("Pathway updated.");
        } catch (error) {
            toast.error(error?.response?.data?.message ? error.response.data.message : "Failed to update pathway.");
        }
        set({ loading: false });
    },
    createPathway: async (data) => {
        set({ loading: true });
        try {
            const { data: res } = await axios.post(`/api/pathways`, data);
            set({ pathway: res.pathway });

            toast.success("Pathway created.");
            window.location.href = `/#/admin/pathways/${res.id}`;
        } catch (error) {
            toast.error(error?.response?.data?.message ? error.response.data.message : "Failed to create pathway.");
        }
        set({ loading: false });
    },
    deletePathway: async (id) => {
        set({ loading: true });
        try {
            const { data } = await axios.delete(`/api/pathways/${id}`);
            set({ pathway: null });

            toast.success("Pathway deleted.");
            window.location.href = `/#/admin/pathways`;
        } catch (error) {
            toast.error(error?.response?.data?.message ? error.response.data.message : "Failed to delete pathway.");
        }
        set({ loading: false });
    },
    markAsDoneMaterial: async (pathwayId, materialId) => {
        set({ loading: true });
        try {
            const { data } = await axios.put(`/api/pathways/${pathwayId}/materials/${materialId}/progress`, { status: "completed" });
            set({ pathway: data.pathway, loading: false });
            toast.success("Material marked as done.");
            return data;
        } catch (error) {
            toast.error(error?.response?.data?.message ? error.response.data.message : "Failed to mark material as done.");
        }
        set({ loading: false });
    },
    getPathwayResults: async (pathwayId) => {
        set({ loading: true, pathwayResults: [] });
        try {
            const { data } = await axios.get(`/api/pathways/${pathwayId}/results`);
            set({ pathwayResults: data, loading: false });
            return data;
        } catch (error) {
            toast.error(error?.response?.data?.message ? error.response.data.message : "Failed to fetch pathway results.");
        }
        set({ loading: false });
    },
}));
