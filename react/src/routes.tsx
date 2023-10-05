import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import MovieDetailPage from "./pages/MovieDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "movie/:id", element: <MovieDetailPage /> }
    
    ],
  },
]);

export default router;