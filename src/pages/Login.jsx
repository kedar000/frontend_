import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const Login = () => {
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

      // Backend returns token string OR JSON?
      const token =
        typeof response.data === "string"
          ? response.data
          : response.data.token;

      // Decode role from token
      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

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
    <div className="h-screen flex items-center justify-center bg-background">
      <div className="bg-white shadow-lg rounded-xl p-10 w-[400px] transition-all duration-200">
        
        <h2 className="text-2xl font-bold text-primary text-center mb-6">
          File Validation Portal
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-borderLight p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-borderLight p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-md hover:bg-secondary transition-all duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-secondary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;