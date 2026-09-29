import "./admindashboard.css";

import AdminLayout from "../../layouts/adminlayout";
import OverviewCards from "../../components/overviewcards/overviewcards";
import RecentApplications from "../../components/recentapplications/recentapplications";

function AdminDashboard() {
  return (
    <AdminLayout>

      <OverviewCards />

      <RecentApplications />

    </AdminLayout>
  );
}

export default AdminDashboard;
