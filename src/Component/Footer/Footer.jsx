import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link} from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-100 text-yellow-400 py-10 px-5">
      <div className="max-w-6xl mx-auto text-center space-y-6">
        {/* Logo and title */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center">
              <div className="bg-green-600 w-5 h-5 rounded-full" />
            </div>
            <h1 className="text-2xl font-bold text-yellow-400">
              <Link
                to="/"
                className="flex items-center gap-2 text-2xl font-extrabold"
                style={{ color: "#00705c" }}
              >
                FoodShare
              </Link>
            </h1>
          </div>
        </div>

        {/* Nav links */}
        <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-300">
          <li className="text-yellow-400">
            <Link to={"/"}>Home</Link>
          </li>
          <li>About</li>
          <li>Services</li>
          <li>Donations</li>
          <li>Events</li>
          <li>Blog</li>
          <li>Contact</li>
        </ul>

        {/* Horizontal line */}
        <div className="border-t border-gray-600 w-full my-4" />

        {/* Social media icons */}
        <div className="flex justify-center gap-4 text-lg">
          <a
            href="https://www.facebook.com/jakaria.khan.1848816"
            target="_blank"
            className="text-gray-300 hover:text-yellow-400"
          >
            <FaFacebookF />
          </a>
          <a href="#" className="text-gray-300 hover:text-yellow-400">
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com/md_jakariakhan/"
            target="_blank"
            className="text-gray-300 hover:text-yellow-400"
          >
            <FaInstagram />
          </a>
          <a href="#" className="text-gray-300 hover:text-yellow-400">
            <FaYoutube />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-400 pt-4">
          © Copyright 2022 - Stitch Non-profit Charity
        </p>
      </div>
    </footer>
  );
};

export default Footer;
