import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function Navbar() {
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    window.addEventListener("storage", checkUser);
    checkUser();

    return () => {
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);

    navigate("/Sign");
  };

  const navLinkClass = ({ isActive }) =>
    `relative text-lg font-medium transition duration-300 
    ${isActive ? "text-yellow-300" : "text-white"} hover:text-yellow-300`;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-4 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "bg-purple-900/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      {/* LOGO */}
      <div
        className="text-2xl md:text-3xl font-bold cursor-pointer
        bg-linear-to-r from-purple-300 via-pink-300 to-indigo-300
        bg-clip-text text-transparent
        transition-all duration-300
        hover:scale-110 hover:brightness-125"
      >
        FileShare
      </div>

      {/* DESKTOP LINKS */}
      <ul className="hidden md:flex items-center gap-8">
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>

        <NavLink to="/Features" className={navLinkClass}>
          Features
        </NavLink>

        <NavLink to="/Pricing" className={navLinkClass}>
          Pricing
        </NavLink>

        <NavLink to="/Help" className={navLinkClass}>
          Help
        </NavLink>

       {/*  {user && user.role === "admin" && (
          <NavLink to="/admin" className={navLinkClass}>
            Admin Panel
          </NavLink>
        )} */}
      </ul>

      {/* RIGHT SIDE */}
      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <>
            {/* USER CARD */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl shadow-lg">
              {/* AVATAR */}
              <div className="w-9 h-9 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                {user.username?.charAt(0).toUpperCase()}
              </div>

              {/* USER INFO */}
              <div className="flex flex-col">
                <span className="text-white font-medium leading-none">
                  {user.username}
                </span>

                <span className="text-gray-300 text-xs">{user.role}</span>
              </div>
            </div>

            {/* LOGOUT */}
            <button
              onClick={logout}
              className="px-5 py-2 rounded-lg bg-red-500 text-white font-medium 
              hover:bg-red-600 transition duration-300 hover:scale-105"
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink
            to="/Sign"
            className="px-5 py-2 rounded-lg 
            bg-linear-to-r from-purple-500 to-indigo-500 
            text-white font-semibold 
            shadow-lg shadow-purple-500/30
            transition-all duration-300 
            hover:scale-105 hover:shadow-purple-500/50 
            hover:brightness-110"
          >
            Sign In
          </NavLink>
        )}
      </div>

      {/* MOBILE MENU BUTTON */}
      <div
        className="md:hidden text-3xl text-white cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✕" : "☰"}
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          className="absolute top-full left-0 w-full 
          bg-purple-900/95 backdrop-blur-lg
          flex flex-col items-center gap-5 py-8 md:hidden shadow-2xl"
        >
          <NavLink
            to="/"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/Features"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Features
          </NavLink>

          <NavLink
            to="/Pricing"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Pricing
          </NavLink>

          <NavLink
            to="/Help"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Help
          </NavLink>

          {user && user.role === "admin" && (
            <NavLink
              to="/admin"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              Admin Panel
            </NavLink>
          )}

          {/* MOBILE AUTH */}
          {user ? (
            <>
              <div className="flex items-center gap-3 mt-2">
                <div className="w-9 h-9 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                  {user.username?.charAt(0).toUpperCase()}
                </div>

                <div className="flex flex-col">
                  <span className="text-white font-semibold">
                    {user.username}
                  </span>

                  <span className="text-gray-300 text-xs">{user.role}</span>
                </div>
              </div>

              <button
                onClick={logout}
                className="bg-red-500 px-5 py-2 rounded-lg text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/Sign"
              onClick={() => setMenuOpen(false)}
              className="px-5 py-2 rounded-lg 
              bg-linear-to-r from-purple-500 to-indigo-500 
              text-white font-semibold 
              hover:scale-105 transition"
            >
              Sign In
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
}
