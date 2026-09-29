import "./navbar.css";
import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar({ title, username }) {
  return (
    <header className="navbar">

      <h2 className="page-title">{title}</h2>

      <div className="navbar-right">

        <button className="notification-btn">
          <FaBell />
        </button>

        <div className="profile">
          <FaUserCircle className="profile-icon" />

          <div>
            <h4>{username}</h4>
            <p>Student</p>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;
