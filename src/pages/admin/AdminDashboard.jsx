// AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    const response = await axios.get("https://veggie-vibes-backend.vercel.app/admin/dashboard", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.data.error) {
                        console.log("No token");
                        navigate("/admin/login");
                    } else {
                        setAdmin(response.data.admin);
                    }
                } else {
                    navigate("/admin/login");
                }
            } catch (error) {
                toast.error("An error occurred while fetching user data.");
                console.log("Error:", error);
            }
        };

        fetchAdminData();
    }, [navigate]);

    return (
        <div className="flex h-screen">
            <div className="w-64 h-full bg-gray-800 text-white">
                <Sidebar />
            </div>
            <div className="flex-1 p-10">
                <Outlet /> {/* Render nested routes here */}
            </div>
        </div>
    );
}

export default AdminDashboard;
