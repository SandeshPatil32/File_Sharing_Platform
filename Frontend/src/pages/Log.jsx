import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Log() {
  const navigate = useNavigate();

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const [warning, setWarning] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    setWarning("");
    setError("");

    try {
      if (!username || !password) {
        setWarning("Please enter both username and password");

        return;
      }

      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          username,
          password,
        },
      );


      localStorage.setItem("token", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data));

      // CLEAR INPUTS
      setusername("");
      setpassword("");
      // REDIRECT
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log("Error Found", error);

      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={submit}>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-900 via-purple-700 to-indigo-600 px-4">
        {/* CARD */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-md">
          {/* TITLE */}
          <h1 className="text-3xl font-bold text-center text-white mb-2">
            Welcome Back
          </h1>

          <p className="text-center text-gray-300 mb-6">Login to continue</p>

          {/* USERNAME */}
          <div className="mb-4">
            <label className="text-sm text-gray-300">Username</label>

            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-2">
            <label className="text-sm text-gray-300">Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
          </div>

          {/* WARNING */}
          {warning && (
            <div className="mb-4 flex items-center gap-2 bg-red-500/20 border border-red-400 text-red-300 px-4 py-2 rounded-lg backdrop-blur-sm">
              <span className="text-xl">⚠️</span>

              <p className="text-sm font-medium">{warning}</p>
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="mb-4 flex items-center gap-2 bg-red-500/20 border border-red-400 text-red-300 px-4 py-2 rounded-lg backdrop-blur-sm">
              <span className="text-xl">⚠️</span>

              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition duration-300 hover:cursor-pointer"
          >
            Log In
          </button>

          {/* FOOTER */}
          <p className="text-sm text-center mt-4 text-gray-300">
            Don't have an account?{" "}
            <NavLink to="/Sign">
              <span className="text-purple-300 hover:underline cursor-pointer">
                Sign Up
              </span>
            </NavLink>
          </p>
        </div>
      </div>
    </form>
  );
}
