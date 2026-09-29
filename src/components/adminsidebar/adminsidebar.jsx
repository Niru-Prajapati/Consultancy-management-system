import { NavLink } from "react-router-dom";
import {
  FaFileAlt,
  FaHome,
  FaUsers,
  FaConciergeBell,
  FaCalendarAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import logo from "../../assets/images/logo.png";
import "./adminsidebar.css";

function AdminSidebar() {
  return (
    <div className="admin-sidebar">

      <div className="admin-logo">
        <img src={logo} alt="Logo" />
      </div>

      <nav className="admin-menu">

        <NavLink to="/admin/applications" className="admin-link">
          <FaFileAlt />
          <span>Applications</span>
        </NavLink>

        <NavLink to="/admin/dashboard" className="admin-link">
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/clients" className="admin-link">
          <FaUsers />
          <span>Clients</span>
        </NavLink>

       

        <NavLink to="/admin/appointments" className="admin-link">
          <FaCalendarAlt />
          <span>Appointment</span>
        </NavLink>

        <NavLink to="/admin/settings" className="admin-link">
          <FaCog />
          <span>Settings</span>
        </NavLink>

      </nav>

      <button className="admin-logout">
        <FaSignOutAlt />
        <span>Logout</span>
      </button>

    </div>
  );
}

export default AdminSidebar;
