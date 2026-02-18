import { NavLink, Outlet, useNavigate } from "react-router-dom";

function SidebarLayout() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-50">

      {/* Sidebar */}
      <div className="w-64 bg-[#003865] text-white flex flex-col">

        <div className="p-6 text-xl font-semibold border-b border-blue-800">
          Validation Portal
        </div>

        <nav className="flex-1 p-4 space-y-2">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-500"
                  : "hover:bg-blue-700"
              }`
            }
          >
            Dashboard
          </NavLink>

          {role === "ROLE_ADMIN" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-500"
                    : "hover:bg-blue-700"
                }`
              }
            >
              Admin Panel
            </NavLink>
          )}

        </nav>

        <div className="p-4 border-t border-blue-800">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-10">
        <Outlet />
      </div>

    </div>
  );
}

export default SidebarLayout;