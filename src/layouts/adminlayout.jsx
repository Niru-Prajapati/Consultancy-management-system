import AdminSidebar from "../components/adminsidebar/adminsidebar";
import AdminNavbar from "../components/adminnavbar/adminnavbar";

function AdminLayout({ children }) {
  return (
    <div className="admin-dashboard">

      <AdminSidebar />

      <div className="admin-main">

        <AdminNavbar />

        <div className="admin-content">
          {children}
        </div>

      </div>

    </div>
  );
}

export default AdminLayout;
