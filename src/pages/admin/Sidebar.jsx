// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-800 text-white">
            <div className="p-4">
                <h2 className="text-2xl font-semibold">Admin Panel</h2>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to="/admin" className="block py-2.5 px-4 hover:bg-gray-700">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/admin/manage-users" className="block py-2.5 px-4 hover:bg-gray-700">Manage Users</Link>
                    </li>
                    <li>
                        <Link to="/admin/manage-recipes" className="block py-2.5 px-4 hover:bg-gray-700">Manage Recipes</Link>
                    </li>
                    <li>
                        <button 
                            className="block w-full text-left py-2.5 px-4 hover:bg-gray-700"
                            onClick={() => {
                                localStorage.removeItem('accessToken');
                                window.location.href = '/admin/login'; // Use window.location for redirect
                            }}
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
