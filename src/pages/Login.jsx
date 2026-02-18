import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const token =
        typeof response.data === "string"
          ? response.data
          : response.data.token;

      const payload = JSON.parse(atob(token.split(".")[1]));

      localStorage.setItem("token", token);
      localStorage.setItem("role", payload.role);

      if (payload.role === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex">

      {/* Left Panel */}
      <div className="w-1/2 bg-gradient-to-br from-[#003865] to-[#0055a4] text-white flex flex-col justify-center items-center p-12">

        <h1 className="text-4xl font-bold mb-4">
          File Validation System
        </h1>

        <p className="text-lg text-blue-200 text-center max-w-md">
          Securely validate and manage Excel uploads with enterprise-grade reliability.
        </p>

      </div>

      {/* Right Panel */}
      <div className="w-1/2 flex justify-center items-center bg-gray-50">

        <div className="bg-white p-10 rounded-2xl shadow-xl w-[400px] transition-all duration-300">

          <h2 className="text-2xl font-semibold text-[#003865] mb-6">
            Login
          </h2>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">

            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#009de0] transition-all duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#009de0] transition-all duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-[#003865] hover:bg-[#0055a4] text-white py-3 rounded-lg transition-all duration-300"
            >
              Login
            </button>

          </form>

          <p className="mt-4 text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#009de0] hover:underline">
              Sign up
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;