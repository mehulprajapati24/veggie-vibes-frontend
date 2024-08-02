import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [key, setKey] = useState('');
  const [formData, setFormData] = useState({
    recipeName: '',
    image: '',
    category: '',
    instructions: '',
    ingredients: '',
    preparationTime: '',
    cookTime: '',
    difficulty: '',
    aboutDish: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const response = await axios.get("https://veggie-vibes-backend.vercel.app/user/dashboard", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.error) {
            navigate("/login");
          } else {
            setUser(response.data.user);
            setKey(response.data.upload_care_key);
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (fileList) => {
    if (fileList && fileList.allEntries.length > 0) {
      const fileInfo = fileList.allEntries[0];
      console.log('File uploaded:', fileInfo);
      setFormData((prevData) => ({
        ...prevData,
        image: fileInfo.cdnUrl || 'noimage',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.recipeName || !formData.image || !formData.category || !formData.instructions || !formData.ingredients || !formData.preparationTime || !formData.cookTime || !formData.difficulty || !formData.aboutDish) {
      alert('Please fill in all required fields.');
      return;
    }

    const token = localStorage.getItem('accessToken');
    
    const response = await axios.post("https://veggie-vibes-backend.vercel.app/user/create-recipe", {
      recipeName: formData.recipeName,
      image: formData.image,
      category: formData.category,
      instructions: formData.instructions,
      ingredients: formData.ingredients,
      preparationTime: formData.preparationTime,
      cookTime: formData.cookTime,
      difficulty: formData.difficulty,
      aboutDish: formData.aboutDish
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success(response.data.message, {
      autoClose: 1000
  });

  setFormData({
    recipeName: '',
    image: '',
    category: '',
    instructions: '',
    ingredients: '',
    preparationTime: '',
    cookTime: '',
    difficulty: '',
    aboutDish: ''
  });

  };

  return (
    <div className="max-w-lg mx-auto mb-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Create Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Recipe Name:</label>
          <input
            type="text"
            name="recipeName"
            value={formData.recipeName}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Upload Image:</label>
          <FileUploaderRegular
            onChange={handleFileChange}
            pubkey={key}
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            <option value="Entrees">Entrees</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Desserts">Desserts</option>
            <option value="Sides">Sides</option>
            <option value="Drinks">Drinks</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Instructions:</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Ingredients:</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Preparation Time:</label>
          <input
            type="text"
            name="preparationTime"
            value={formData.preparationTime}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Cook Time:</label>
          <input
            type="text"
            name="cookTime"
            value={formData.cookTime}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Difficulty:</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">About the Dish:</label>
          <textarea
            name="aboutDish"
            value={formData.aboutDish}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button type="submit" className="w-full p-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
