import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  MdPerson,
  MdVolunteerActivism,
  MdFavorite,
  MdRateReview,
  MdHistory,
  MdDashboard,
  MdPeople,
  MdAssignmentInd,
  MdListAlt,
  MdStar,
  MdAssignment,
  MdLocalShipping,
  MdCardGiftcard,
 
} from "react-icons/md";

import './dashboard.css'
import { ToastContainer } from "react-toastify";

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
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content font-bold">
          {/* Sidebar items */}
          <h1 className="mb-10">
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-extrabold"
              style={{ color: "#00705c" }}
            >
              FoodShare
            </Link>
          </h1>

          {/* user nav link */}
          <li>
            <NavLink
              to={"/dashboard/my-profile"}
              className="flex items-center gap-2"
            >
              <MdPerson /> My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/request-charity"}
              className="flex items-center gap-2"
            >
              <MdVolunteerActivism /> Request Charity Role
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/favorites"}
              className="flex items-center gap-2"
            >
              <MdFavorite /> Favorites
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/my-reviews"}
              className="flex items-center gap-2"
            >
              <MdRateReview /> My Reviews
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/transaction-history"}
              className="flex items-center gap-2"
            >
              <MdHistory /> Transaction History
            </NavLink>
          </li>
          {/* admin */}
          <li>admin</li>
          <li>
            <NavLink
              to={"/dashboard/manage-donations"}
              className="flex items-center gap-2"
            >
              <MdDashboard /> Manage Donations
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/manage-users"}
              className="flex items-center gap-2"
            >
              <MdPeople /> Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/manage-role-requests"}
              className="flex items-center gap-2"
            >
              <MdAssignmentInd /> Manage Role Requests
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/manage-requests"}
              className="flex items-center gap-2"
            >
              <MdListAlt /> Manage Requests
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/feature-donations"}
              className="flex items-center gap-2"
            >
              <MdStar /> Feature Donations
            </NavLink>
          </li>
          {/* charity */}
          <li>charity</li>
          <li>
            <NavLink
              to={"/dashboard/my-requests"}
              className="flex items-center gap-2"
            >
              <MdAssignment /> My Requests
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/my-pickups"}
              className="flex items-center gap-2"
            >
              <MdLocalShipping /> My Pickups
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/received-donations"}
              className="flex items-center gap-2"
            >
              <MdCardGiftcard /> Received Donations
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/transaction-history"}
              className="flex items-center gap-2"
            >
              <MdHistory /> Transaction History
            </NavLink>
          </li>
        </ul>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Dashboard;
