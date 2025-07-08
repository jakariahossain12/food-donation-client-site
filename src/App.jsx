import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Donations", path: "/donations" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Login", path: "/login" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + Name */}
        {/* <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold"
          style={{ color: "#00705c" }}
        >
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
          FoodShare
        </Link> */}

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold border-b-2 pb-1"
                    : "hover:text-yellow-500 transition-colors"
                }
                style={({ isActive }) => ({
                  color: isActive ? "#00705c" : "#333",
                  borderColor: isActive ? "#fdd65b" : "transparent",
                })}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "font-semibold" : "text-gray-700"
                  }
                  style={({ isActive }) => ({
                    color: isActive ? "#00705c" : "#333",
                  })}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
