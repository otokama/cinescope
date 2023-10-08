import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import MovieDetailPage from "./pages/MovieDetailPage";
import SearchResultPage from "./pages/SearchResultPage";
import TVDetailPage from "./pages/TVDetailPage";
import SessionAuthPage from "./pages/SessionAuthPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "movie/:id", element: <MovieDetailPage /> },
      { path: "tv/:id", element: <TVDetailPage /> },
      { path: "search", element: <SearchResultPage /> },
      { path: "session/tmdb-approved", element: <SessionAuthPage />}
    ],
  },
]);

export default router;
