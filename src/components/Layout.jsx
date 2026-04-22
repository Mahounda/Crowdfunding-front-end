import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import "../components/NavBar.css";
function Layout() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <footer className="cf-footer">
        © 2026 2gethR Crowdfunding — Built by Mahounda Poinsonnet
      </footer>
    </div>
  );
}

export default Layout;
