// index.jsx ama main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Users/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import SignUp from "./Components/Users/SignUp";
import AuthorsMain from "./Components/Authors/AuthorsMain";
import BookMain from "./Components/Books/BookMain";
import ProtectedRoute from "./Components/ProtectedRoute";
import ProtectedLoginRoute from "./Components/ProtectedLoginRoute";

const routerProvider = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedLoginRoute>
            <Login />
          </ProtectedLoginRoute>
        ),
        index: true,
      },
      {
        path: "SignUp",
        element: <SignUp />,
        index: true,
      },
      {
        path: "/Dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        index: true,
      },
      {
        path: "/Authormain",
        element: (
          <ProtectedRoute>
            <AuthorsMain/>
          </ProtectedRoute>
        ),
        index: true,
      },
      {
        path: "/BooksMain",
        element: (
          <ProtectedRoute>
            <BookMain/>
          </ProtectedRoute>
        ),
        index: true,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routerProvider} />
  </StrictMode>
);
