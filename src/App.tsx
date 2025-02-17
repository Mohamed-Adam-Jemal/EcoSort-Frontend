import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom"; // Import Navigate
import AppLayout from "./layout/AppLayout";
import AuthLayout from "./layout/AuthLayout";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import Blank from "./pages/Blank";
import Calendar from "./pages/Calendar";
import Ecommerce from "./pages/Dashboard/ECommerce";
import FormElements from "./pages/Forms/FormElements";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import WasteTable from "./pages/Forms/WasteTable";
import UserTable from "./pages/Forms/UserTable";
import SmartBinTable from "./pages/Forms/SmartBinTable";
import WasteBotTable from "./pages/Forms/WasteBotTable";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Redirect root path to /signin */}
          <Route path="/" element={<Navigate to="/signin" />} />

          {/* Dashboard Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Ecommerce />} />
              <Route path="/waste-table" element={<WasteTable />} />
              <Route path="/user-table" element={<UserTable />} />
              <Route path="/smartbin-table" element={<SmartBinTable />} />
              <Route path="/wastebot-table" element={<WasteBotTable />} />
            </Route>
          </Route>

          {/* Auth Layout */}
          <Route element={<AuthLayout />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}