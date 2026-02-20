import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="bg-[#033967] px-8 py-4 flex justify-between items-center shadow-sm">

      {/* Logo / Title */}
      <h1
        className="text-white font-semibold text-lg tracking-wide cursor-pointer hover:opacity-90 transition"
        onClick={() => navigate("/dashboard")}
      >
        Validation Portal
      </h1>

      {/* Right Side Navigation */}
      <div className="flex items-center gap-8">

        <button
          className="text-white/90 hover:text-white transition text-sm font-medium"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>

        {role === "ROLE_ADMIN" && (
          <button
            className="text-white/90 hover:text-white transition text-sm font-medium"
            onClick={() => navigate("/admin")}
          >
            Admin Panel
          </button>
        )}

        <button
          className="bg-white text-[#033967] px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Navbar;