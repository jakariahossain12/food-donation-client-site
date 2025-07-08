import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";

import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Dashboard from "../Layouts/Dashboard";
import NotFound from "../Pages/NotFound/NotFound";
 export const router = createBrowserRouter([
  {
    path: "/",
         Component: MainLayout,
         children: [
             { index: true, Component: Home },
             
    ]
   },
   {
     path:'register',Component:Register
   },
   {
     path:'login',Component:Login
   },
   {
     path:'dashboard',Component:Dashboard
   },
   {
     path: '*',
     Component:NotFound
   }
]);