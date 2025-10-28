import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid credentials. Try again.");
      } else {
        // Store token or handle redirect
        localStorage.setItem("token", data.token);
        window.location.href = "/dashboard"; // redirect after success
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4e54c8] to-[#8f94fb] p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md animate-fadeIn">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg   focus:ring-indigo-400 focus:border-indigo-400 outline-none text-sm transition"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg   focus:ring-indigo-400 focus:border-indigo-400 outline-none text-sm transition"
              placeholder="Enter your password"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              cursor: loading ? "not-allowed" : "pointer",
            }}
            className={`w-full py-2 text-white font-semibold rounded-lg transition-all ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-indigo-400 hover:shadow-lg hover:-translate-y-0.5"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* <p className="text-center text-gray-500 text-xs mt-4">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-indigo-500 hover:underline font-medium"
          >
            Register
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
