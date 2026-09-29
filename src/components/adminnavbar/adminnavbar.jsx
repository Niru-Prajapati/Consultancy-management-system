import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import "./adminnavbar.css";

function AdminNavbar() {
  return (
    <div className="admin-navbar">

      <h2 className="admin-title">Admin Panel</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search overall platform"
        />

        <FaSearch className="search-icon" />
      </div>

      <div className="navbar-right">

        <button className="notification-btn">
          <FaBell />
        </button>

        <div className="admin-profile">
          <FaUserCircle />
          <span>Admin</span>
        </div>

      </div>

    </div>
  );
}

export default AdminNavbar;
