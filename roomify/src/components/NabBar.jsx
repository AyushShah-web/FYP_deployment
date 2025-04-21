import React, { useState } from "react";
import logo from "../images/Roomify.png";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for menu toggle
import SummaryApi from "../api/api";
import { useSelector, useDispatch } from "react-redux";
import { userUnAuthorized } from "../store/userSlice";
import axios from "axios";

const NavBar = () => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle Menu for mobile
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Logout
  const logout = async () => {
    dispatch(userUnAuthorized());
    try {
      await axios.get(SummaryApi.logout.url, { withCredentials: true });
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <nav className="bg-white border-b-2 shadow-md text-primary">
      <div className="container mx-auto px-6 md:px-10 flex justify-between items-center py-4">
        {/* Logo */}
        <div className="flex items-center overflow-hidden">
          <Link to={"/"}>
            <img
              src={logo}
              className="w-10 object-cover scale-[290%] relative top-8"
              alt="Logo"
            />
          </Link>
        </div>
        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8 font-medium">
          <Link to="/" className="hover:text-primary/80 transition-colors">
            Home
          </Link>
          <Link
            to="/category/rooms"
            className="hover:text-primary/80 transition-colors"
          >
            Rooms
          </Link>
          <Link
            to="/experiences"
            className="hover:text-primary/80 transition-colors"
          >
            Experiences
          </Link>
          <Link
            to="/aboutUs"
            className="hover:text-primary/80 transition-colors"
          >
            About Us
          </Link>
          {Object.keys(userData).length > 0 ? (
            <Link
              to="/dashboard/profile"
              className="flex items-center gap-2 hover:text-primary/80 transition-colors"
            >
              <CgProfile size={22} />
              <h6>{userData.name}</h6>
            </Link>
          ) : (
            <>
              <Link
                to="/signup"
                className="hover:text-primary/80 transition-colors"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="hover:text-primary/80 transition-colors"
              >
                Login
              </Link>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-2xl hover:text-primary/80 transition-colors"
          onClick={toggleMenu}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <ul className="lg:hidden flex flex-col bg-white border-t p-4 space-y-4">
          <Link
            to="/"
            onClick={toggleMenu}
            className="hover:text-primary/80 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/category/rooms"
            onClick={toggleMenu}
            className="hover:text-primary/80 transition-colors"
          >
            Rooms
          </Link>
          <Link
            to="/experiences"
            onClick={toggleMenu}
            className="hover:text-primary/80 transition-colors"
          >
            Experiences
          </Link>
          <Link
            to="/aboutUs"
            onClick={toggleMenu}
            className="hover:text-primary/80 transition-colors"
          >
            About Us
          </Link>
          {Object.keys(userData).length > 0 ? (
            <Link
              to="/dashboard/profile"
              onClick={toggleMenu}
              className="flex items-center gap-2 hover:text-primary/80 transition-colors"
            >
              {userData.image ? (
                <img
                  src={userData.image}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <CgProfile size={22} />
              )}
              <h6>{userData.name}</h6>
            </Link>
          ) : (
            <>
              <Link
                to="/signup"
                onClick={toggleMenu}
                className="hover:text-primary/80 transition-colors"
              >
                Register
              </Link>
              <Link
                to="/login"
                onClick={toggleMenu}
                className="hover:text-primary/80 transition-colors"
              >
                Login
              </Link>
            </>
          )}
          : (
          <>
            <Link
              to="/signup"
              onClick={toggleMenu}
              className="hover:text-primary/80 transition-colors"
            >
              Register
            </Link>
            <Link
              to="/login"
              onClick={toggleMenu}
              className="hover:text-primary/80 transition-colors"
            >
              Login
            </Link>
          </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
