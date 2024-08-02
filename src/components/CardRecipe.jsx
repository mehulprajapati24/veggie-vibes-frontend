import React from 'react';
import { Link } from 'react-router-dom';
import { GoClock } from "react-icons/go";

const CardRecipe = ({ item }) => {
  const categoryStyles = {
    Entrees: {
      backgroundColor: "#f0f5c4",
      color: "#59871f"
    },
    Breakfast: {
      backgroundColor: "#efedfa",
      color: "#3c3a8f"
    },
    Lunch: {
      backgroundColor: "#e5f7f3",
      color: "#1f8787"
    },
    Desserts: {
      backgroundColor: "#e8f5fa",
      color: "#397a9e"
    },
    Sides: {
      backgroundColor: "#feefc9",
      color: "#d16400"
    },
    Drinks: {
      backgroundColor: "#ffeae3",
      color: "#f0493e"
    },
    default: {
      backgroundColor: "#fff",
      color: "#000"
    }
  };

  const getCategoryStyle = (category) => {
    return categoryStyles[category] || categoryStyles.default;
  };

  const categoryStyle = getCategoryStyle(item?.category);

  return (
    <div className="container mx-auto flex justify-center md:justify-start">
      <div className="max-w-sm">
        <div className="bg-white relative shadow-lg hover:shadow-xl transition duration-500 rounded-lg">
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            <img
              src={item?.image}
              alt="thumbnail_image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="py-3 px-5 bg-white">
            <Link to={`/items/${item._id}`}>
              <h1 className="text-gray-700 font-bold text-xl mb-8 hover:text-gray-900 hover:cursor-pointer">
                {item?.recipeName}
              </h1>
            </Link>

            <div className="flex justify-between items-center flex-wrap">
              <button
                className={`mt-1 py-2 px-4 font-medium rounded-lg shadow-md hover:shadow-lg transition duration-300`}
                style={categoryStyle}
              >
                {item?.category}
              </button>

              <div className="flex items-center py-2">
                <GoClock />
                <span className="ml-1">{item?.preparationTime}</span>
              </div>
            </div>
          </div>

          <div className="absolute top-2 right-2 py-2 px-4 bg-white rounded">
            <span className="font-medium">{item?.difficulty}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardRecipe;
