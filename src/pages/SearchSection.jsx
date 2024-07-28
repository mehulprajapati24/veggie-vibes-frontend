import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SearchSection = () => {

    const searchText = useParams();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const params = new URLSearchParams(window.location.search);
        const queryParam = params.get('query');
        if(queryParam){
            setQuery(queryParam);
        }
    }, []);

    useEffect(()=>{
        const fetchItems = async () =>{
            setLoading(true);
            try{
                const response = await axios.get(`http://localhost:5000/api/items`, {
                    params: {
                        q: query
                        }
                });
                setResults(response.data);
            }catch(error){
                setError(error.message || "Error fetching data");
            }finally{
                setLoading(false);
            }
        }
        fetchItems();
    }, [query]);


  return (
    <div className='px-6 lg:px-12 py-10'>
        <h1 className='text-center text-3xl py-5 font-semibold text-secondary sm:text-6xl sm:leading-relaxed capitalize'>Search</h1>

        <div className='bg-white md:max-w-3xl m-auto p-4 rounded relative flex items-center'>
            <IoSearchOutline className='w-5 h-5 mr-2 text-neutral-300'/>
            <input className='outline-none w-full placeholder:text-[#6b8086]' type="search" name="query" onChange={(e)=>setQuery(e.target.value)} placeholder='Search for a recipe' id='search' required />
        </div>

        <ul>
            {
                results && results.map((item)=>(
                    <li key={item._id}>{item.name}</li>
                ))
            }
        </ul>
    </div>
  )
}

export default SearchSection