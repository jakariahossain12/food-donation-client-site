
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router";
import './Navbar.css'
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, userSignOut } = useAuth();


  const link = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to={"/donations"}>All Donations</NavLink>
        </li>
      )}
      {user && (
        <li>
          <NavLink to={"/dashboard"}>Dashboard</NavLink>
        </li>
      )}
    </>
  ); 

  const handleSignOut = () => {
    userSignOut()
      .then(() => {
      }).catch((error) => {
      console.log(error);
    })
  }
 

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + Name */}
        <div className="flex gap-1">
          <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center">
            <div className="bg-green-600 w-5 h-5 rounded-full" />
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-extrabold"
            style={{ color: "#00705c" }}
          >
            FoodShare
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 font-medium items-center">
          {link}
          {user ? (
            <button
              onClick={handleSignOut}
              className="btn bg-primary text-white"
            >
              Sign Out
            </button>
          ) : (
            <Link to={"/login"} className="btn bg-primary text-white">
              Login
            </Link>
          )}
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
        <div className="md:hidden px-4 pb-4  ">
          <ul className="space-y-2  w-1/2 right-0 ">
            {link}{" "}
            {user ? (
              <button
                onClick={handleSignOut}
                className="btn bg-primary text-white"
              >
                Sign Out
              </button>
            ) : (
              <Link to={"/login"} className="btn bg-primary text-white">
                Login
              </Link>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
