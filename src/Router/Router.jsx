import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
 export const router = createBrowserRouter([
  {
    path: "/",
         Component: MainLayout,
         children: [
             { index: true, Component: Home },
             {path:'login',Component:Login}
    ]
  },
]);