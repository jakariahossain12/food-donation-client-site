import React from 'react';
import Home from '../Pages/Home/Home';
import { Outlet } from 'react-router';
import Navbar from '../Component/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';


const MainLayout = () => {
    return (
      <div>
        <Navbar></Navbar>
        <Outlet></Outlet>

        <ToastContainer position="top-center" />
      </div>
    );
};

export default MainLayout;