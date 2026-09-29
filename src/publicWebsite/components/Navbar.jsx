import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../images/logo.png";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        <img src={logo} alt="Logo" />
        <h2>Study Abroad</h2>
      </div>

      <ul className="nav-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/services">Services</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>

      </ul>

      <div className="buttons">
        <Link to="/login" className="login-btn">
          Login
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;
