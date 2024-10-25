import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";
import DashboardPage from "./pages/admin/DashboardPage";
import LoginPage from "./pages/auth/LoginPage";
import Registerpage from "./pages/auth/Registerpage";
import { useAuthStore } from "./store/auth.store";
import AdminLayout from "./components/layouts/AdminLayout";
import UsersPage from "./pages/admin/UsersPage";
import { useEffect } from "react";
import PathwaysPage from "./pages/admin/PathwaysPage";
import HomePage from "./pages/home/HomePage";
import PathwaysIdPage from "./pages/admin/PathwaysIdPage";
import CreatePathwayPage from "./pages/admin/createPathwayPage";
import QuizzesPage from "./pages/admin/QuizzesPage";
import QuizIdPage from "./pages/admin/QuizIdPage";
import MagicLinksPage from "./pages/admin/MagicLinksPage";
import MagicLinkModel from "./components/admin/MagicLinkModel";
import PathwayResultsPage from "./pages/admin/PathwayResultsPage";
import FloatModal from "./components/admin/FloatModal";
import TakeQuiz from "./components/employee/TakeQuiz";

export default function App() {
    const { user, identify } = useAuthStore((state) => state);

    useEffect(() => {
        // if (!user) identify();
        // check user login status and if not redirect to login page
    }, [user]);
    const router = createHashRouter([
        {
            path: "/",
            element: <HomePage />,
        },
        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            path: "/register",
            element: <Registerpage />,
        },
        // redirect if path /admin to /admin/dashboard
        // {
        //     path: "/admin/",
        //     element: <Navigate to="/admin/" replace={true} />,
        // },
        {
            path: "/admin",
            element: <AdminLayout />,
            children: [
                {
                    path: "",
                    element: <DashboardPage />,
                },
                {
                    path: "users",
                    element: <UsersPage />,
                },
                {
                    path: "magiclinks",
                    element: <MagicLinksPage />,
                    children: [{ path: "create", element: <MagicLinkModel /> }],
                },
                {
                    path: "pathways",
                    element: <PathwaysPage />,
                },
                {
                    path: "pathways/create",
                    element: <CreatePathwayPage />,
                },
                {
                    path: "pathways/:id",
                    element: <PathwaysIdPage />,
                },
                {
                    path: "pathways/:id/results",
                    element: <PathwayResultsPage />,
                    // children: [
                    //     {
                    //         path: ":quizId",
                    //         element: (
                    //             <FloatModal onClose={()=>{}}>
                    //                 <TakeQuiz />
                    //             </FloatModal>
                    //         ),
                    //     },
                    // ],
                },

                {
                    path: "quizzes",
                    element: <QuizzesPage />,
                },
                {
                    path: "quizzes/:id",
                    element: <QuizIdPage />,
                },
            ],
        },
        // {
        //     path: "/admin/users",
        //     element: <Dashboard />,
        // },
        // {
        //     path: "/admin/pathways",
        //     element: <Dashboard />,
        // },
        // {
        //     path: "/admin/quizzes",
        //     element: <Dashboard />,
        // },
        // {
        //     path: "/admin/account",
        //     element: <Dashboard />,
        // },
    ]);
    return <RouterProvider router={router} />;
}
