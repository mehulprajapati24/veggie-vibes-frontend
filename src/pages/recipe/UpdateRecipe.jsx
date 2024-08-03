import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateRecipe = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { recipe } = location.state;
  const [formData, setFormData] = useState(recipe);
  const [isVideoUploaded, setIsVideoUploaded] = useState(false);
  const [cloudName, setCloudName] = useState("djbbpvqxu");


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
      setFormData((prevData) => ({
        ...prevData,
        image: fileInfo.cdnUrl || 'noimage',
      }));
    }
  };

  const handleVideoUpload = async (event) => {
    const videoFile = event.target.files[0];
    
    if (!videoFile) {
      console.error("No video file selected.");
      return;
    }
  
    const formData = new FormData();
    formData.append('file', videoFile);
    formData.append('upload_preset', 'video_preset'); // Replace with your Cloudinary upload preset
  
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
        formData
      );
      const videoUrl = response.data.secure_url;
      console.log("Video URL:", videoUrl);

      setFormData((prevData) => ({
        ...prevData,
        video: videoUrl,
      }));
      setIsVideoUploaded(true);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isVideoUploaded) {
      alert('Please wait for the video to upload.');
      return;
    }

    

    
    try {

        const token = localStorage.getItem('accessToken');
        if(token){
            const response = await axios.put(
                `https://veggie-vibes-backend.vercel.app/api/update-recipe/${formData._id}`, // Use the appropriate endpoint
                formData,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
              );

              if (response.data.error) {
                console.log("No token");
                navigate("/login");
            } else {
        
              toast.success(response.data.message, {
                autoClose: 1000
              });
        
              setTimeout(() => {
                navigate("/your-recipe");
              }, 1000);
            }
        }
        else
        {
            navigate("/login");
        }
      
    } catch (error) {
      console.error("Error submitting recipe:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mb-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Edit Recipe</h2>
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
            pubkey="b78767dac796fc43c744"
            accept='image/*'
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Upload Video:</label>
          <input
            type="file"
            accept='video/*'
            name="video"
            onChange={handleVideoUpload}
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
          <label className="block text-gray-700">About the Dish/Drink:</label>
          <textarea
            name="aboutDish"
            value={formData.aboutDish}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Update Recipe
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateRecipe;
