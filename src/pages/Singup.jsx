import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint = isAdmin
        ? "/auth/register-admin"
        : "/auth/register";

      await api.post(endpoint, form);
      navigate("/");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="h-screen flex">

      {/* Left Panel */}
      <div className="w-1/2 bg-gradient-to-br from-[#003865] to-[#0055a4] text-white flex flex-col justify-center items-center p-12">

        <h1 className="text-4xl font-bold mb-4">
          Join the Platform
        </h1>

        <p className="text-lg text-blue-200 text-center max-w-md">
          Create your account to start validating and managing Excel submissions.
        </p>

      </div>

      {/* Right Panel */}
      <div className="w-1/2 flex justify-center items-center bg-gray-50">

        <div className="bg-white p-10 rounded-2xl shadow-xl w-[400px]">

          <h2 className="text-2xl font-semibold text-[#003865] mb-6">
            Register
          </h2>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">

            <input
              type="text"
              placeholder="Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#009de0] transition-all duration-200"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#009de0] transition-all duration-200"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#009de0] transition-all duration-200"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />

            <div className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
              />
              <span>Register as Admin</span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#003865] hover:bg-[#0055a4] text-white py-3 rounded-lg transition-all duration-300"
            >
              Register
            </button>

          </form>

          <p className="mt-4 text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/" className="text-[#009de0] hover:underline">
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;