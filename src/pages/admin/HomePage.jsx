import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    }, []);

    const toggleLock = async (userId) => {
        try {
            const user = users.find(user => user._id === userId);
            const newLockStatus = !user.isLocked;
            const response = await axios.put(`https://veggie-vibes-backend.vercel.app/admin/${userId}`, { isLocked: newLockStatus }); // Replace with your API endpoint
            setUsers(prevUsers => 
                prevUsers.map(user =>
                    user._id === userId ? { ...user, isLocked: newLockStatus } : user
                )
            );
        } catch (err) {
            setError('Failed to update user status.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Lock/Unlock User Profile</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="border-b bg-gray-100">
                        <th className="py-2 px-4 border-r text-center">Sr No</th>
                        <th className="py-2 px-4 border-r text-center">Username</th>
                        <th className="py-2 px-4 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id} className="border-b">
                            <td className="py-2 px-4 border-r text-center">{index + 1}</td>
                            <td className="py-2 px-4 border-r text-center">{user.username}</td>
                            <td className="py-2 px-4 text-center">
                                <button 
                                    onClick={() => toggleLock(user._id)}
                                    className={`py-1 px-3 text-white font-semibold rounded ${
                                        user.isLocked ? 'bg-red-500' : 'bg-green-500'
                                    }`}
                                >
                                    {user.isLocked ? 'Unlock' : 'Lock'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HomePage;
