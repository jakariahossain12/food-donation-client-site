import React from 'react';
import Home from '../Pages/Home/Home';
import { Outlet } from 'react-router';
import Navbar from '../Component/Navbar/Navbar';


const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;