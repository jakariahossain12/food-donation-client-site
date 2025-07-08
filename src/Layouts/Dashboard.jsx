import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  MdLocalShipping,
  MdPayment,
  MdTrackChanges,
  MdSettings,
  MdHelpOutline,
  MdPeopleOutline,
  MdPendingActions,
} from "react-icons/md";

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page Content Area */}
      <div className="drawer-content flex flex-col">
        {/* Navbar - shown only on small screens */}
        <div className="navbar bg-base-300 px-4 lg:hidden">
          {/* Hamburger */}
          <div className="flex-none">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>

          {/* Title (optional, remove if not needed) */}
          <div className="flex-1 text-lg font-medium pl-2">Dashboard</div>
        </div>

        {/* Main content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar items */}
          <h1>
            <Link to={"/"}>FoodShare</Link>
          </h1>

         <li>profile</li>
        
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
