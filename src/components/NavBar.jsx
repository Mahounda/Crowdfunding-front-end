import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/fundraiser/create">Create Fundraiser</Link>
      </nav>
    </div>
  );
}

export default NavBar;
