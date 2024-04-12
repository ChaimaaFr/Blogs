import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { jwtDecode } from 'jwt-decode';
import { FaUser } from 'react-icons/fa';

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      if (decodedToken.exp < currentTime) {
        console.log('Token expired');
        return false;
      }
      // Token valid, user is logged in
      return true;
    } else {
      console.log('Login first');
      return false;
    }
  };

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    // kan7ydo biha token mn local
    localStorage.removeItem('token');
    // Redirect to the login 
    navigate('/login');
    console.log('Logged out');
  };

  return (
    <nav className="bg-gray-100 border-gray-200 dark:bg-gray-900 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/blog" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"> BlogApp</span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {isLoggedIn() ? (
            <div className="relative inline-block text-left">
              <button onClick={handleMenuToggle} className="text-white bg-[#7E6363] hover:bg-[#A87C7C] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <FaUser className="inline-block mr-2" /> Me
              </button>
              {showMenu && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button" tabIndex="-1">
                  <div className="py-1" role="none">
                    <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem" tabIndex="-1">
                      Logout
                    </button>
                    <Link to="/">
                      <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem" tabIndex="-1">
                        My Posts
                      </button>
                    </Link>
                    {/* <Link to="/profile">
                      <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem" tabIndex="-1">
                        Profile
                      </button>
                    </Link> */}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button type="button" className="text-white bg-[#7E6363] hover:bg-[#A87C7C] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Login
              </button>
            </Link>
          )}
          {!isLoggedIn() && ( // Conditionally render Register button if not logged in
            <Link to="/register">
              <button type="button" className="text-white bg-[#A87C7C] hover:bg-[#7E6363] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-5">
                Register
              </button>
            </Link>
          )}
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-100 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="/blog" className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-[#7E6363] md:dark:text-blue-500" aria-current="page">Home</a>
            </li>
            <li>
              <a href="/about" className="block py-2 px-3 md:p-0 text-[#3E3232] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#7E6363] md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
            </li>
            <li>
              <a href="/contact" className="block py-2 px-3 md:p-0 text-[#3E3232] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#7E6363] md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
