import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

// all pages have a navbar
const Layout = () => {
  return (
    <>
      <Navbar onSearch={() => {}} />
      <div id="main">
        <Box paddingTop={24}>
        <Outlet />
        </Box>
      </div>
    </>
  );
};

export default Layout;
