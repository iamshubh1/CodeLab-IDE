import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { MdLightMode } from "react-icons/md";
import { BsGridFill } from "react-icons/bs";
import { api_base_url } from "../helper";

const Navbar = ({ isGridLayout, setIsGridLayout }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    fetch(api_base_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: localStorage.getItem("userId") }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setData(data.user);
        else setError(data.message);
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  };

  return (
    <>
      <div className="navbar flex items-center justify-between px-[100px] h-[80px] bg-[#101010] border-b border-gray-800 shadow-lg shadow-black/40">
        {/* Logo */}
        <div className="logo">
          <img
            onClick={() => navigate("/")}
            className="w-[150px] cursor-pointer hover:scale-105 transition-transform duration-200"
            src={logo}
            alt="logo"
          />
        </div>

        {/* Links */}
        <div className="links flex items-center gap-6 text-gray-300 font-medium">
          <Link
            to="/"
            className="hover:text-white transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:transition-all after:duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-white transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:transition-all after:duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-white transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:transition-all after:duration-300"
          >
            Contact
          </Link>
          <Link
            to="/services"
            className="hover:text-white transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:transition-all after:duration-300"
          >
            Services
          </Link>

          <button
            onClick={logout}
            className="ml-3 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 text-white hover:opacity-90 shadow-md shadow-red-900/40 transition-all duration-200"
          >
            Logout
          </button>

          <Avatar
            onClick={() => setShowMenu(!showMenu)}
            name={data ? data.name : ""}
            size="42"
            round="50%"
            className="cursor-pointer ml-3"
          />
        </div>
      </div>

      {/* Dropdown */}
      {showMenu && (
        <div className="absolute right-[60px] top-[85px] shadow-xl shadow-black/50 p-4 rounded-xl bg-[#1c1c1c] w-[180px] border border-gray-700 animate-fadeIn">
          <div className="pb-2 border-b border-gray-600 mb-2">
            <h3 className="text-[16px] text-gray-100 font-semibold">
              {data ? data.name : "User"}
            </h3>
          </div>

          <button
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-200 w-full text-left py-1"
          >
            <MdLightMode className="text-[20px]" /> Light Mode
          </button>

          <button
            onClick={() => setIsGridLayout(!isGridLayout)}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-200 w-full text-left py-1"
          >
            <BsGridFill className="text-[20px]" />{" "}
            {isGridLayout ? "List Layout" : "Grid Layout"}
          </button>

          <button
            onClick={logout}
            className="mt-2 w-full px-2 py-1 rounded-md bg-gradient-to-r from-red-500 to-pink-600 text-white hover:opacity-90 transition-all text-sm"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
