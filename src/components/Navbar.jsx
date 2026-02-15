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
    <div className="bg-white border-b border-borderLight px-8 py-4 flex justify-between items-center">

      <h1
        className="text-primary font-bold text-lg cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        Validation Portal
      </h1>

      <div className="flex items-center gap-6">

        <button
          className="text-gray-700 hover:text-secondary transition"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>

        {role === "ROLE_ADMIN" && (
          <button
            className="text-gray-700 hover:text-secondary transition"
            onClick={() => navigate("/admin")}
          >
            Admin Panel
          </button>
        )}

        <button
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Navbar;