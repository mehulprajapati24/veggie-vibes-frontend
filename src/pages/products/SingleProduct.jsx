import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SingleProduct = () => {
    const navigate = useNavigate();
    const item = useLoaderData();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(item.comments || []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('accessToken');

            const response = await axios.post('https://veggie-vibes-backend.vercel.app/api/comment', { comment, itemId: item._id },{
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            }
            );

            if(response.data.error){
                navigate("/login");
            }
            if (response.data.success) {
                setComments([...comments, response.data.comment]);
                setComment('');
            } else {
                console.error('Error adding comment:');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <section className='min-h-dvh md:flex justify-center items-center md:bg-eggshell'>
            <article>
                <div className='bg-white md:my-[1rem] md:py-8 pb-8 md:rounded-xl'>
                    <picture>
                        <img src={item.image} alt="thumbnail_image" className='md:max-w-[90%] w-full md:h-[570px] md:rounded-xl mx-auto' />
                    </picture>

                    <div className='px-8'>
                        <h1 className='text-xl md:text-3xl mt-12 text-secondary'>{item.recipeName}</h1>
                        <p className='mt-6'>{item.aboutDish}</p>

                        <article className='bg-rose-50 mt-6 p-5 rounded-xl'>
                            <h3 className='text-xl font-semibold ml-2'>Total time</h3>
                            <ul className='list-disc mt-3 ml-8 text-lg marker:text-orange-300'>
                                <li className='pl-3 mt-3'>
                                    <p>
                                        <span>Preparation:</span> <span>{item.preparationTime}</span>
                                    </p>
                                </li>
                                <li className='pl-3 mt-3'>
                                    <p>
                                        <span>Cooking:</span> <span>{item.cookTime}</span>
                                    </p>
                                </li>
                            </ul>
                        </article>

                        <div className='mt-5'>
                            <h3 className='text-xl font-semibold ml-2'>Ingredients</h3>
                            {item.ingredients.split('\n').map((line, index) => (
                                <p key={index} className='ml-2 mt-2'>{line}</p>
                            ))}
                        </div>

                        <div className='mt-5'>
                            <h3 className='text-xl font-semibold ml-2'>Instructions</h3>
                            {item.instructions.split('\n').map((line, index) => (
                                <p key={index} className='ml-2 mt-2'>{line}</p>
                            ))}
                        </div>

                        <div className='mt-5'>
                            <h3 className='text-xl font-semibold ml-2'>Comments</h3>
                            <div className='ml-2 mt-2'>
                                {comments.map((comment, index) => (
                                    <h1 key={index} className='mb-3'><span className='bg-slate-200 py-1 px-1 rounded-xl'>{comment.username}</span> - {comment.comment}</h1>
                                ))}

                                <form onSubmit={handleCommentSubmit} className='mt-4'>
                                    <input
                                        type="text"
                                        placeholder='Add Comment'
                                        name='comment'
                                        value={comment}
                                        onChange={handleCommentChange}
                                        className='border rounded-xl py-2 px-4 w-48 md:w-1/3'
                                    />
                                    <button type='submit' className='ml-2 py-2 px-4 bg-blue-500 text-white rounded-xl'>
                                        Add
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </section>
    );
}

export default SingleProduct;
