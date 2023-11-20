import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import logo from '../assets/images/logo.png'

import { fetchMovies } from "../store/actions/actionCreator";
import { useDispatch } from "react-redux";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirectToHome = () => {
    navigate("/");
    dispatch(fetchMovies());
  };
  return (
    <>
      <nav className="fixed top-0 w-full z-[99] h-16 bg-black">
        <div className="mx-14 sm:px-6 lg:px-8 h-full">
          {/* Navbar */}
          <div className="relative flex h-full items-center justify-between">
            {/* Left Side */}
            <div className="flex flex-shrink-0 items-center justify-center w-[150px] sm:w-[200px]">
              <img
                onClick={redirectToHome}
                src={logo}
                alt="netflix logo"
                className="h-8 w-auto cursor-pointer"
              />
            </div>
            {/* Right Side */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 items-center justify-center">
                <a
                  onClick={redirectToHome}
                  className={` hover:bg-[#E61B1F] text-white rounded-md px-3 py-2 font-medium transition-all duration-300`}
                >
                  Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
