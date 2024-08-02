import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserCircle } from 'react-icons/fa';

const DesktopNav = ({ menuItems }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { welcomeMessage } = location.state || {}
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

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
                        // toast.error("Session expired. Please log in again.");
                        console.log("no token");
                    } else {
                        setUser(response.data.user);
                    //     if(welcomeMessage){
                    //         toast.success(`${welcomeMessage} ${response.data.user.username}!`, {
                    //             autoClose: 1000
                    //         });
                    //     }else{
                    //     toast.success(`Welcome back, ${response.data.user.username}!`, {
                    //         autoClose: 1000
                    //     });
                    // }
                    }
                } else {
                    console.log("no token");
                }
            } catch (error) {
                toast.error("An error occurred while fetching user data.");
                console.log("Error:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setUser(null);
        toast.info("Logged out successfully.");
        navigate('/login');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className='h-16 flex justify-between items-center px-6 lg:px-12'>
            <Link to="/" >
                <h1 className='font-bold text-2xl text-btnColor'>Veggie-Recipe-Vibes</h1>
                <ToastContainer/>
            </Link>
            
            

            
                {user ? (
                    <>
                    <ul className='flex gap-7 mr-28'>
                {menuItems?.map((menu, index) => (
                    <li key={index}>
                        <Link to={menu === "home" ? "/" : menu} className='font-medium capitalize text-secondary'>{menu}</Link>
                    </li>
                ))}
            </ul>

            <ul className='flex items-center gap-4 font-medium'>
                    <li className='relative'>
                        <button onClick={toggleDropdown} className='flex items-center text-secondary focus:outline-none ml-7'>
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-white font-bold">
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                        </button>
                        {dropdownOpen && (
                            <div className='absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10'>
                                <div className='block px-4 py-2 text-gray-800 font-bold'>{user.username}</div>
                                <Link to="/create-recipe" onClick={toggleDropdown} className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>Create Recipe</Link>
                                <Link to="/your-recipe" onClick={toggleDropdown} className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>Your Recipe</Link>
                                <button onClick={handleLogout} className='block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200'>Logout</button>
                            </div>
                        )}
                    </li>
                    </ul>
                    </>
                ) : (
                    <>
                    <ul className='flex gap-7'>
                {menuItems?.map((menu, index) => (
                    <li key={index}>
                        <Link to={menu === "home" ? "/" : menu} className='font-medium capitalize text-secondary'>{menu}</Link>
                    </li>
                ))}
            </ul>

            <ul className='flex items-center gap-4 font-medium'>
                        <li>
                            <Link to="/login" className='text-secondary px-4 py-2 rounded border border-black bg-slate-100 hover:bg-black hover:text-white active:bg-slate-700'>Log In</Link>
                        </li>
                        <li>
                            <Link to="/signup" className='text-secondary px-4 py-2 rounded border border-black bg-slate-100 hover:bg-black hover:text-white active:bg-slate-700'>Sign Up</Link>
                        </li>
                        </ul>
                    </>
                )}
            
        </div>
    );
};

export default DesktopNav;
