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
    }, [navigate]);

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
                    items && items.map((item)=>(
                        <CardRecipe item={item} key={item._id}/>
                    ))
                }
            </ul>
        </div>
    </div>
        
    </div>
    );
}

export default YourRecipe;
