import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import "../components/NavBar.css";
function Layout() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <footer>ByMahoundaPoinsonnet</footer>
    </div>
  );
}

export default Layout;
