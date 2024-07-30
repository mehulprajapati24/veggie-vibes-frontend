import React, { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'

const SingleProduct = () => {
    const item = useLoaderData();

    useEffect(()=>{
        window.scrollTo(0,0);
    })

    const extractNumber = (timeString) => {
        let timeArray = timeString.split(" ");
        return parseInt(timeArray[0]);
    }

    let prepTimeMinutes = extractNumber(item.more.prep_time);
    let cookTimeMinutes = extractNumber(item.more.cook_time);

  return (
    <section className='min-h-dvh md:flex justify-center items-center md:bg-eggshell'>
        <article>
            <div className='bg-white md:my-[1rem] md:py-8 pb-8 md:rounded-xl'>
                <picture>
                    <img src={item.thumbnail_image} alt="thumbnail_image" className='md:max-w-[90%] w-full md:h-[570px] md:rounded-xl mx-auto'/>
                </picture>

                <div className='px-8'>
                    <h1 className='text-xl md:text-3xl mt-12 text-secondary'>{item.name}</h1>
                    <p className='mt-6'>An easy and quick dish, perfect for any meal. This classic omelette combines beaten eggs cooked to perfection, optionally filled with your choice of cheese, vegetables, or meats.</p>

                    <article className='bg-rose-50 mt-6 p-5 rounded-xl'>
                        <h3 className='text-xl font-semibold ml-2'>Preparation time</h3>
                        <ul className='list-disc mt-3 ml-8 text-lg marker:text-orange-300'>
                            <li className='pl-3'>
                                <p>
                                    <span>Total:</span> <span>{prepTimeMinutes+cookTimeMinutes} minutes</span>
                                </p>
                            </li>

                            <li className='pl-3 mt-3'>
                                <p>
                                    <span>Preparation:</span> <span>{item.more.prep_time}</span>
                                </p>
                            </li>

                            <li className='pl-3 mt-3'>
                                <p>
                                    <span>Cooking:</span> <span>{item.more.cook_time}</span>
                                </p>
                            </li>
                        </ul>
                    </article>

                    <div className='mt-5'>
                        <h3 className='text-xl font-semibold ml-2'>Ingredients</h3>
                        <ul className='list-disc marker:text-blue-500 mt-4 ml-6 text-secondary marker:align-middle'>
                            {
                                item.ingredients.map((ingredient, index)=>(
                                    <li key={index} className='pl-4 mt-2'>
                                        <span>{ingredient.name}</span>
                                        <span>{ingredient.quantity}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div className='mt-5'>
                        <h3 className='text-xl font-semibold ml-2'>Instructions</h3>
                        <h2 className='ml-2 mt-2'>{item.instructions}</h2>
                    </div>

                    <div className='mt-5'>
                        <h3 className='text-xl font-semibold ml-2'>Tags</h3>
                        <div className='flex flex-col md:flex-row'>
                        {
                            item.tags.map((tag, index)=>(
                                <h2 className='ml-2 mt-2'>#{tag}</h2>
                            ))
                        }
                        </div>
                    </div>


                    <div className='mt-5'>
                        <h3 className='text-xl font-semibold ml-2'>Comments</h3>
                        <div className='ml-2 mt-2'>
                            {
                                item.comments.map((comment, index)=>(
                                    <h1 className='mb-3'><span className='bg-slate-200 py-1 px-1 rounded-xl'>{comment.user}</span> - {comment.comment}</h1>
                                ))
                            }

                            <input type="text" placeholder='Add Comment' name='comment' className='border rounded-xl py-2 px-4 w-48 md:w-1/3'/>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </section>
  )
}

export default SingleProduct