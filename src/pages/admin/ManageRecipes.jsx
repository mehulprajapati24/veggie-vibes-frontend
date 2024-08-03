import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserPlus } from 'react-icons/fa';

const ManageRecipes = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('https://veggie-vibes-backend.vercel.app/admin/getrecipes');
        setRecipes(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch recipes.');
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [recipes]);

  const handleEdit = (recipe) => {
    navigate(`/admin/edit-recipe/${recipe._id}`, { state: { recipe } });
  };

  const handleDelete = async (recipeId) => {
    try {
      await axios.delete(`https://veggie-vibes-backend.vercel.app/admin/delete-recipe/${recipeId}`);
      setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== recipeId));
      toast.success('Recipe deleted successfully', {
        autoClose: 1000,
      });
    } catch (err) {
      setError('Failed to delete recipe.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Recipes</h2>
      <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Recipes</h2>
                <button onClick={() => navigate('/admin/create-recipe')} className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <span className="text-xl">+</span>
                <span className="ml-2">Add Recipe</span>
                </button>
            </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="py-2 px-4 border-r text-center">Recipe Name</th>
            <th className="py-2 px-4 border-r text-center">Category</th>
            <th className="py-2 px-4 border-r text-center">Preparation Time</th>
            <th className="py-2 px-4 border-r text-center">Cook Time</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe._id} className="border-b">
              <td className="py-2 px-4 border-r text-center">{recipe.recipeName}</td>
              <td className="py-2 px-4 border-r text-center">{recipe.category}</td>
              <td className="py-2 px-4 border-r text-center">{recipe.preparationTime}</td>
              <td className="py-2 px-4 border-r text-center">{recipe.cookTime}</td>
              <td className="py-2 px-4 text-center">
                <button
                  onClick={() => handleEdit(recipe)}
                  className="py-1 px-3 text-white font-semibold rounded bg-blue-500 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="py-1 px-3 text-white font-semibold rounded bg-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default ManageRecipes;
