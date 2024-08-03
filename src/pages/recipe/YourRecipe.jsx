import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardRecipe from '../../components/CardRecipe';

const YourRecipe = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getYourItems = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    const response = await axios.get("https://veggie-vibes-backend.vercel.app/api/your-items", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.data.error) {
                        navigate("/login");
                    }

                    setItems(response.data);
                } else {
                    navigate("/login");
                }
            } catch (error) {
                setError("Failed to load items.");
                console.log("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        getYourItems();
    }, [items]);

    const handleUpdate = (recipe) => {
        navigate(`/update-recipe/${recipe._id}`, { state: { recipe } });
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('accessToken');
            await axios.delete(`https://veggie-vibes-backend.vercel.app/api/your-items/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Remove the deleted item from the state
            setItems(items.filter(item => item._id !== id));
            toast.success('Recipe deleted successfully!', {
                autoClose: 1000
            });
        } catch (error) {
            toast.error('Failed to delete the recipe.', {
                autoClose: 1000
            });
            console.log("Error:", error);
        }
    };

    if (loading) return <div>Loading...</div>;

    if (error) return <div>{error}</div>;

    return (
        <div className='container mx-auto'>
            <div className='px-5 xl:px-10 py-16'>
                <h2 className='text-3xl mb-8 font-semibold text-secondary sm:text-5xl sm:leading-relaxed'>
                    Your Recipes
                </h2>
                <div>
                    <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                        {
                            items && items.map((item) => (
                                <li key={item._id} className='border p-4 rounded-md shadow-lg'>
                                    <CardRecipe item={item} />
                                    <div className='mt-4 flex justify-between'>
                                        <button
                                            onClick={() => handleUpdate(item)}
                                            className='bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600'
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default YourRecipe;
