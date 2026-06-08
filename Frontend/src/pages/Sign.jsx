import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Sign() {
  const navigate = useNavigate();

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [warning, setWarning] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    setWarning("");
    setError("");

    try {
      if (!username || !email || !password) {
        setWarning("Please fill all information");

        return;
      }

      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        {
          username,
          email,
          password,
        },
      );

      console.log("Register Success", response.data);

      // STORE TOKEN
      localStorage.setItem("token", response.data.token);

      // STORE USER
      localStorage.setItem("user", JSON.stringify(response.data));

      // CLEAR INPUTS
      setusername("");
      setemail("");
      setpassword("");

      // REDIRECT
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error found", error);
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={submit}>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-900 via-purple-700 to-indigo-600 px-4">
        {/* CARD */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-md">
          {/* HEADING */}
          <h1 className="text-3xl font-bold text-center text-white mb-2">
            Create Account
          </h1>

          <p className="text-center text-gray-300 mb-6">
            Join FileShare securely
          </p>

          {/* USERNAME */}
          <div className="mb-4">
            <label className="text-sm text-gray-300">Username</label>

            <input
              type="text"
              placeholder="Enter your username"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="text-sm text-gray-300">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <label className="text-sm text-gray-300">Password</label>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
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

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition duration-300 hover:cursor-pointer"
          >
            Sign Up
          </button>

          {/* FOOTER */}
          <p className="text-sm text-center mt-4 text-gray-300">
            Already have an account?{" "}
            <NavLink to="/Log">
              <span className="text-purple-300 hover:underline cursor-pointer">
                Log In
              </span>
            </NavLink>
          </p>
        </div>
      </div>
    </form>
  );
}
