import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Components/Home.jsx';
import Main from './Layout/Main.jsx';
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';
import Signup from './Components/Signup.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main> ,
    children: [
      {
        path: '/' ,
        element: <Home></Home>
      },
      {
        path: '/login' ,
        element: <Login></Login>
      },
      {
        path: '/register' ,
        element: <Register></Register>
      },
      {
        path: '/signup' ,
        element: <Signup></Signup>
      },
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
