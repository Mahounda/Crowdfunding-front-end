import { Link } from "react-router-dom";
import "../components/NavBar.css";
function NavBar() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/fundraiser/create">Create Fundraiser</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
      </nav>
    </div>
  );
}

export default NavBar;
