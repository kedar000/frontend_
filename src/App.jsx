import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import Admin from "./pages/Admin";
// import ProtectedRoutes from "./components/ProtectedRoutes";
// import SidebarLayout from "./components/SidebarLayout";
import Login from "./pages/Login"
import Signup from "./pages/Singup";
import Dashboard from "./pages/Dashboard"
import Admin from "./pages/Admin";
import ProtectedRoutes from "./components/ProtectedRoute"
import SidebarLayout from "./pages/SidebarLayout";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<SidebarLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;