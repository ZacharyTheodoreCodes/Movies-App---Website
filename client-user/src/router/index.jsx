import { createBrowserRouter } from "react-router-dom";

import Layout from "../layout/Layout";
import HomePage from "../pages/HomePage";
import MovieDetail from "../pages/MovieDetail";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/movies/:slug",
        element: <MovieDetail />,
      },
    ],
  },
]);

export default router;
