import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://veggie-vibes-backend.vercel.app/admin/getusers');
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch users.');
                setLoading(false);
            }
        };

        fetchUsers();
    }, [users]);

    const handleEdit = async (userId, newUsername, newEmail) => {
        try {
            const response = await axios.put(`https://veggie-vibes-backend.vercel.app/admin/update/${userId}`, { username: newUsername, email: newEmail });
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user._id === userId ? { ...user, username: newUsername, email: newEmail } : user
                )
            );
        } catch (err) {
            setError('Failed to update user.');
        }
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`https://veggie-vibes-backend.vercel.app/admin/delete/${userId}`);
            setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
        } catch (err) {
            setError('Failed to delete user.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Users</h2>

                <button onClick={() => navigate('/admin/adduser')} className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <span className="text-xl">+</span>
                <span className="ml-2">Add User</span>
                </button>
            </div>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="border-b bg-gray-100">
                        <th className="py-2 px-4 border-r text-center">Sr No</th>
                        <th className="py-2 px-4 border-r text-center">Username</th>
                        <th className="py-2 px-4 border-r text-center">Email</th>
                        <th className="py-2 px-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id} className="border-b">
                            <td className="py-2 px-4 border-r text-center">{index + 1}</td>
                            <td className="py-2 px-4 border-r text-center">{user.username}</td>
                            <td className="py-2 px-4 border-r text-center">{user.email}</td>
                            <td className="py-2 px-4 text-center">
                                <button 
                                    onClick={() => {
                                        const newUsername = prompt('Enter new username:', user.username);
                                        const newEmail = prompt('Enter new email:', user.email);
                                        if (newUsername && newEmail) {
                                            handleEdit(user._id, newUsername, newEmail);
                                        }
                                    }}
                                    className="py-1 px-3 text-white font-semibold rounded bg-blue-500 mr-2"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(user._id)}
                                    className="py-1 px-3 text-white font-semibold rounded bg-red-500"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
