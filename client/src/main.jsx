import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";
import { Toaster } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
// get token from local storage and set in axios cookies

if (import.meta.env.VITE_API_BASE_URL?.includes("localhost")) {
    const token = localStorage.getItem("auth_token");
    if (token) {
        axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
}

const toastOptions = {
    duration: 5000,
    position: "top-right",
    // style: {
    //     color: "#fff",
    //     background: "#333",
    // },
    success: {
        style: {
            background: "#fff",
            border: "2px solid #61d345",
        },
    },
    error: {
        style: {
            background: "#fff",
            border: "2px solid #ef4444",
        },
    },
};
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Toaster position="top-center" reverseOrder={false} toastOptions={toastOptions} />
        <App />
    </StrictMode>
);
