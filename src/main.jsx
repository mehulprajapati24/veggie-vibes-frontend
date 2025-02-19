import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/home/Home.jsx'
import ErrorPage from './pages/error/ErrorPage.jsx';
import CategoryPage from './pages/category/CategoryPage.jsx';
import SearchSection from './pages/SearchSection.jsx';
import SingleProduct from './pages/products/SingleProduct.jsx';
import Recipes from './pages/products/Recipes.jsx';
import About from './pages/about/About.jsx';
import Contact from './pages/contact/Contact.jsx';
import Signup from './pages/signup/Signup.jsx';
import Login from './pages/signin/Login.jsx';
import Otp from './pages/signup/Otp.jsx';
import ForgotPassword from './pages/signin/ForgotPassword.jsx';
import OtpLogin from './pages/signin/OtpLogin.jsx';
import ChangePassword from './pages/signin/ChangePassword.jsx';
import CreateRecipe from './pages/recipe/CreateRecipe.jsx';
import YourRecipe from './pages/recipe/YourRecipe.jsx';
import AdminLogin from './pages/signin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import Sidebar from './pages/admin/Sidebar.jsx';
import HomePage from './pages/admin/HomePage.jsx';
import ManageUsers from './pages/admin/ManageUsers.jsx';
import ManageRecipes from './pages/admin/ManageRecipes.jsx';
import AddUser from './pages/admin/AddUser.jsx';
import CreateRecipeAdmin from './pages/admin/CreateRecipeAdmin.jsx';
import EditRecipe from './pages/admin/EditRecipe.jsx';
import UpdateRecipe from './pages/recipe/UpdateRecipe.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/categories/:category",
        element: <CategoryPage/>
      },
      {
        path: "/search",
        element: <SearchSection/>
      },
      {
        path: "/items/:id",
        element: <SingleProduct/>,
        loader: ({params}) => fetch(`https://veggie-vibes-backend.vercel.app/api/items/${params.id}`)
      },
      {
        path: "/recipes",
        element: <Recipes/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/contact",
        element: <Contact/>
      },
      {
        path: "/create-recipe",
        element: <CreateRecipe/>
      },
      {
        path: "/your-recipe",
        element: <YourRecipe/>
      },
      {
        path: "/update-recipe/:id",
        element: <UpdateRecipe/>
      }
    ]
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/enter-otp",
    element: <Otp/>
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword/>
  },
  {
    path: "/forgot-password/otp",
    element: <OtpLogin/>
  },
  {
    path: "/change-password",
    element: <ChangePassword/>
  },
  {
    path: "/admin/login",
    element: <AdminLogin/>
  },
  {
    path: "/admin",
    element: <AdminDashboard/>,
    children: [
      {
        path: "/admin",
        element: <HomePage/>
      },
      {
        path: "/admin/manage-users",
        element: <ManageUsers/>
      },
      {
        path: "/admin/manage-recipes",
        element: <ManageRecipes/>
      },
      {
        path: "/admin/adduser",
        element: <AddUser/>
      },
      {
        path: "/admin/edit-recipe/:id",
        element: <EditRecipe/>
      },
      {
        path: "/admin/create-recipe",
        element: <CreateRecipeAdmin/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
