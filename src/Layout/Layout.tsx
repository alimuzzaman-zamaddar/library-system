
import {  Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";

const Layout = () => {
  return (
    <>
      <Navbar/>
      <Outlet />
          <Footer/>
    </>
  );
};

export default Layout;
