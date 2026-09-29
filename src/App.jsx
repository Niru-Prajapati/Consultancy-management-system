import { Routes, Route } from "react-router-dom";

import PublicWebsite from "./publicWebsite/PublicWebsite";

import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";

import Client from "./pages/clientdashboard/clientdashboard";
import Booking from "./pages/clientdashboard/booking/booking";
import Services from "./pages/clientdashboard/services/services";
import Support from "./pages/clientdashboard/support/support";
import Settings from "./pages/clientdashboard/setting/setting";

import AdminDashboard from "./pages/admindashboard/admindashboard";
import Applications from "./pages/admindashboard/applications/applications";
import AdminLogin from "./pages/adminlogin/adminlogin";
import AdminAppointment from "./pages/admindashboard/adminappointment/adminappointment";
import AdminClients from "./pages/admindashboard/adminclients/adminclients";
import AdminSettings from "./pages/admindashboard/adminsettings/adminsettings";
import ProtectedRoute from "./components/protectedroutes/protectedroutes";

function App() {
  return (
    <Routes>
      {/* Public Website */}
      <Route path="/*" element={<PublicWebsite />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Client Dashboard */}
     <Route
  path="/client/dashboard"
  element={
    <ProtectedRoute>
      <Client />
    </ProtectedRoute>
  }
/>

<Route
  path="/client/booking"
  element={
    <ProtectedRoute>
      <Booking />
    </ProtectedRoute>
  }
/>

<Route
  path="/client/services"
  element={
    <ProtectedRoute>
      <Services />
    </ProtectedRoute>
  }
/>

<Route
  path="/client/support"
  element={
    <ProtectedRoute>
      <Support />
    </ProtectedRoute>
  }
/>

<Route
  path="/client/setting"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/applications" element={<Applications />} />
      <Route path="/admin/appointments" element={<AdminAppointment />} />
      <Route path="/admin/clients" element={<AdminClients />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
    </Routes>
  );
}

export default App;
