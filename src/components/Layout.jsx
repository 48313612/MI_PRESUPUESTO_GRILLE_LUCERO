import Header from "./Header";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <div className="content">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;