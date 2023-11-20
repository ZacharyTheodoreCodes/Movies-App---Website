import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "../layout/Layout";

import MoviesPage from "../pages/MoviesPage";
import AddMovie from "../pages/AddMovie";
import EditMovie from "../pages/EditMovie";
import MovieDetail from "../pages/MovieDetail";

import GenresPage from "../pages/GenresPage";
import AddGenre from "../pages/AddGenre";
import EditGenre from "../pages/EditGenre";

import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MoviesPage />,
        children: [
          {
            path: "movies/add",
            element: <AddMovie />,
          },
          {
            path: "movies/:id",
            element: <MovieDetail />,
          },
          {
            path: "movies/:id/edit",
            element: <EditMovie />,
          },
        ],
      },
      {
        path: "/genres",
        element: <GenresPage />,
        children: [
          {
            path: "add",
            element: <AddGenre />,
          },
          {
            path: ":id/edit",
            element: <EditGenre />,
          },
        ],
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
  },
 
]);

export default router;
