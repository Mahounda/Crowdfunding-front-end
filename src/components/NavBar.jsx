import { Link } from "react-router-dom";
import "../components/NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        2gethR
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/fundraisers/create">Create Fundraiser</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}

export default NavBar;