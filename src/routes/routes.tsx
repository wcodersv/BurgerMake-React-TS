import { createBrowserRouter } from "react-router-dom";
import App from "../app/App";
import ErrorPage from "../pages/ErrorPage";
import MakeBurgerPage from "../pages/MakeBurgerPage";
import HomePage from "../pages/HomePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "make-burger", element: <MakeBurgerPage /> },
        ]
    },

]);