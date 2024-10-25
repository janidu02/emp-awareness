import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "axios";
import { toQueryString } from "../utils";

export const usequizzestore = create((set) => ({
    quizzes: [],
    quiz: null,
    submit_loading: false,
    loading: false,
    // setUser: (user) => set({ user }),
    getQuizzes: async (filter = {}) => {
        set({ loading: true });

        try {
            console.log(toQueryString(filter));
            const { data } = await axios.get(`/api/quizzes?${toQueryString(filter)}`);
            set({ quizzes: data.quizzes });
            return data.quizzes;

            // toast.success("Login successful.");
        } catch (error) {
            toast.error(error?.response?.data?.message ? error.response.data.message : "Failed to fetch data.");
        }
        set({ loading: false });
    },
    getQuiz: async (id) => {
        set({ loading: true });
        try {
            const { data } = await axios.get(`/api/quizzes/${id}`);
            set({ quiz: data.quiz, loading: false });

            return data.quiz;

            // toast.success("Login successful.");
        } catch (error) {
            toast.error(error?.response?.data?.message ? error.response.data.message : "Failed to fetch data.");
        }
        set({ loading: false });
    },
    updateQuiz: async (id, data) => {
        set({ loading: true });
        try {
            const { data: res } = await axios.put(`/api/quizzes/${id}`, data);
            set({ quiz: res.quiz });

            toast.success("Quiz updated.");
        } catch (error) {
            toast.error(error?.response?.data?.message ? error.response.data.message : "Failed to update quiz.");
        }
        set({ loading: false });
    },
    createQuiz: async (data) => {
        set({ loading: true });
        try {
            const { data: res } = await axios.post(`/api/quizzes`, data);
            set({ quiz: res.quiz });

            toast.success("Quiz created.");
            window.location.href = `/#/admin/quizzes/${res.id}`;
        } catch (error) {
            toast.error(error?.response?.data?.message ? error.response.data.message : "Failed to create quiz.");
        }
        set({ loading: false });
    },
    deleteQuiz: async (id) => {
        set({ loading: true });
        try {
            const { data } = await axios.delete(`/api/quizzes/${id}`);
            set({ quiz: null });

            toast.success("Quiz deleted.");
            window.location.href = `/#/admin/quizzes`;
        } catch (error) {
            toast.error(error?.response?.data?.message ? error.response.data.message : "Failed to delete quiz.");
        }
        set({ loading: false });
    },
    submitQuiz: async (pathwayId, materialId, data) => {
        set({ submit_loading: true });
        try {
            const { data: res } = await axios.put(`/api/pathways/${pathwayId}/materials/${materialId}/quiz`, data);
            // /pathways/:pathwayId/materials/:materialId/quiz

            toast.success("Quiz submitted.");
            set({ submit_loading: false });
            return res;
        } catch (error) {
            toast.error(error?.response?.data?.message ? error.response.data.message : "Failed to submit quiz.");
            set({ submit_loading: false });
            return null;
        }
    },
    getQuizResults: async (pathwayId, quizId, userId = "user") => {
        set({ loading: true });
        try {
            const { data } = await axios.get(`/api/pathways/${pathwayId}/quizzes/${quizId}/results/${userId}`);
            set({ results: data });
            set({ loading: false });
            return data;
        } catch (error) {
            // toast.error(error?.response?.data?.message ? error.response.data.message : "Failed to fetch quiz results.");
            console.log(error?.response?.data?.message ? error.response.data.message : "Failed to fetch quiz results.");
        }
        set({ loading: false });
    },
}));
