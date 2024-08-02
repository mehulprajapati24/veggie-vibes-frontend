import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Card from '../../components/Card'
import CategoryWrapper from '../category/CategoryWrapper';
import CardRecipe from '../../components/CardRecipe';


const Recipes = () => {

    const [items, setItems] = useState([]);

    useEffect(()=>{
        const getAllItems = async () =>{
            const response = await axios.get("http://localhost:5000/api/all-items");
            setItems(response.data);
        }
        getAllItems();
    }, []);


  return (
    <div className='px-6 lg:px-12 py-10'>
        <h2 className='text-center text-3xl mb-4 font-semibold text-secondary sm:text-5xl sm:leading-relaxed'>
            All Recipes
        </h2>

        <CategoryWrapper/>

        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10'>
                {
                    items && items.map((item)=>(
                        <CardRecipe item={item} key={item._id}/>
                    ))
                }
        </ul>
    </div>
  )
}

export default Recipes