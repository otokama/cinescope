import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

// all pages have a navbar
const Layout = () => {
  return (
    <>
      <Navbar />
      <div id="main">
        <Box paddingTop={16}>
          <Outlet />
        </Box>
      </div>
    </>
  );
};

export default Layout;
