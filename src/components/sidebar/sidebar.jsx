import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaServicestack,
  FaHeadset,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import logo from "../../assets/images/logo.png";
import "./sidebar.css";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  navigate("/login");
};

  const menuItems = [
    {
      name: "Dashboard",
      path: "/client/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Booking",
      path: "/client/booking",
      icon: <FaCalendarAlt />,
    },
    {
      name: "Services",
      path: "/client/services",
      icon: <FaServicestack />,
    },
    {
      name: "Support",
      path: "/client/support",
      icon: <FaHeadset />,
    },
    {
      name: "Settings",
      path: "/client/setting",
      icon: <FaCog />,
    },
  ];

 return (
  <aside className="sidebar">

    <div>

      <div className="sidebar-logo">
        <img src={logo} alt="Logo" />
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={
              location.pathname === item.path
                ? "menu-item active"
                : "menu-item"
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

    </div>

   <button className="logout-btn" onClick={handleLogout}>
  <FaSignOutAlt />
  Logout
</button>

  </aside>

  );
}

export default Sidebar;
