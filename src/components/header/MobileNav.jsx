import React, { useState, useEffect } from 'react';
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { RiCloseCircleLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MobileNav = ({menuItems, onClose, onOpen, hideLeft}) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const response = await axios.get("https://veggie-vibes-backend.vercel.app/user/dashboard", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.error) {
            console.log("Session expired. Please log in again.");
          } else {
            setUser(response.data.user);
          }
        } else {
          console.log("No token found");
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    navigate('/login');
    // Optionally, navigate to the login page or show a toast message
  };

  return (
    <div className='h-16 flex justify-between items-center px-6 lg:px-12'>
      <Link to="/" className='font-bold text-xl text-btnColor'>
        Veggie-Recipe-Vibes
      </Link>

      <button onClick={onOpen}>
        <HiMiniBars3BottomRight className='w-7 h-7' />
      </button>

      <div className={`transition-all w-full h-full fixed bg-primary z-50 top-0 ${hideLeft} flex justify-center items-center`}>
        <button className='absolute right-8 top-24' onClick={onClose}>
          <RiCloseCircleLine className='w-7 h-7' />
        </button>

        <div>
          <ul className='flex flex-col gap-8'>
            {menuItems?.map((menu, index) => (
              <li key={index}>
                <Link onClick={onClose} to={menu === "home" ? "/" : menu} className='font-medium capitalize text-secondary text-xl'>{menu}</Link>
              </li>
            ))}
          </ul>

          {user && (
            <div className='mt-8'>
              <ul className='flex flex-col gap-8 font-medium'>
                <li>
                  <Link to="/create-recipe" onClick={onClose} className='text-secondary px-4 py-2 rounded border border-black bg-slate-100 hover:bg-black hover:text-white active:bg-slate-700'>
                    Create Recipe
                  </Link>
                </li>
                <li>
                  <Link to="/your-recipe" onClick={onClose} className='text-secondary px-4 py-2 rounded border border-black bg-slate-100 hover:bg-black hover:text-white active:bg-slate-700'>
                    Your Recipe
                  </Link>
                </li>
                <li>
                  <button onClick={() => { handleLogout(); onClose(); }} className='text-secondary px-4 py-2 rounded border border-black bg-slate-100 hover:bg-black hover:text-white active:bg-slate-700'>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}

          {!user && (
            <div className='mt-8'>
              <ul className='flex flex-col gap-8 font-medium'>
                <li>
                  <Link to="/login" onClick={onClose} className='text-secondary px-4 py-2 rounded border border-black bg-slate-100 hover:bg-black hover:text-white active:bg-slate-700'>
                    Log In
                  </Link>
                </li>
                <li>
                  <Link to="/signup" onClick={onClose} className='text-secondary px-4 py-2 rounded border border-black bg-slate-100 hover:bg-black hover:text-white active:bg-slate-700'>
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
