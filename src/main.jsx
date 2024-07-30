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
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Otp from './pages/signup/Otp.jsx';
import ForgotPassword from './pages/signin/ForgotPassword.jsx';
import OtpLogin from './pages/signin/OtpLogin.jsx';
import ChangePassword from './pages/signin/ChangePassword.jsx';


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
        loader: ({params}) => fetch(`http://localhost:5000/api/items/${params.id}`)
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
    path: "/dashboard",
    element: <Dashboard/>
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
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
