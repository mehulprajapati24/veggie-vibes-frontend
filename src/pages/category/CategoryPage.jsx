import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CategoryWrapper from './CategoryWrapper';
import axios from 'axios';
import Card from '../../components/Card';
import CardRecipe from '../../components/CardRecipe';

const CategoryPage = () => {
    const {category} = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(()=>{
      const fetchCategoryData = async (req, res)=>{
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:5000/api/categories/${category}`);
          setItems(response.data);
          if(response.data.message){
            setMessage(response.data.message);
          }
        } catch (error) {
          setError(error.message || "Error loading category")
        }
      }
      fetchCategoryData();
    }, [category]);

  return (
    <div className='px-6 lg:px-12 py-10'>
        <h1 className='text-center text-3xl py-5 font-semibold text-secondary sm:text-6xl sm:leading-relaxed capitalize'>{category}</h1>
        <CategoryWrapper/>

        {items.length > 0 ? (
        <ul className='mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {
            items && items?.map(item=> (
              <CardRecipe item={item} key={item._id}/>
            ))
          }
        </ul>
        ) :  (
          <div className="text-center mt-20 text-lg text-gray-500">{message || "No items found in this category."}</div>
      )}
    </div>
  )
}

export default CategoryPage