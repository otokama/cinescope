import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import FavoriteMoviesModal from "../components/movie/FavoriteMoviesModal";

// all pages have a navbar
const Layout = () => {
  return (
    <>
      <Navbar />
      <FavoriteMoviesModal />

      <div id="main">
        <Box paddingTop={16}>
          <Outlet />
        </Box>
      </div>
    </>
  );
};

export default Layout;
