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
  MdAddBox,
  MdInventory,
  MdMoveToInbox,
  MdInsights,
} from "react-icons/md";

import "./dashboard.css";
import { ToastContainer } from "react-toastify";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Component/Loading/Loading";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user.email}`);
      return res.data;
    },
  });

  if (loading || isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center mt-10">Failed to load user data</p>
    );
  }

  const role = data?.role || "guest";

  // Helper function for NavLink styling
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "active flex items-center gap-3 px-3 py-2"
      : "flex items-center gap-3 px-3 py-2";

  return (
    <div className="drawer  lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="navbar bg-base-300 px-4 lg:hidden shadow-md">
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
          <div className="flex-1 text-lg font-semibold pl-2">Dashboard</div>
        </div>

        {/* Main content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side ">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 p-4 w-80 min-h-full  text-base-content font-medium shadow-xl rounded-r-2xl">
          {/* Logo */}
          <div className="flex gap-2 mb-10 items-center px-2">
            <div className="bg-amber-400 w-10 h-10 rounded-full flex items-center justify-center shadow-md">
              <div className="bg-teal-600 w-6 h-6 rounded-full" />
            </div>
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-extrabold"
              style={{ color: "#00705c" }}
            >
              FoodShare
            </Link>
          </div>

          {/* DashboardOverview */}
          <li>
            <NavLink to="/dashboard">
              <MdDashboard size={20} /> DashboardOverview
            </NavLink>
          </li>

          {/* Profile */}
          <li>
            <NavLink to="/dashboard/profile">
              <MdPerson size={20} /> My Profile
            </NavLink>
          </li>

          {/* User + Charity */}
          {["user", "charity"].includes(role) && (
            <>
              <li>
                <NavLink
                  to="/dashboard/request-charity"
                  className={navLinkClass}
                >
                  <MdVolunteerActivism size={20} /> Request Charity Role
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/favorites" className={navLinkClass}>
                  <MdFavorite size={20} /> Favorites
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/transaction-history"
                  className={navLinkClass}
                >
                  <MdHistory size={20} /> Transaction History
                </NavLink>
              </li>
            </>
          )}

          {/* User + Restaurant */}
          {["restaurant", "user"].includes(role) && (
            <li>
              <NavLink to="/dashboard/my-reviews" className={navLinkClass}>
                <MdRateReview size={20} /> My Reviews
              </NavLink>
            </li>
          )}

          {/* Admin */}
          {role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/manage-donations"
                  className={navLinkClass}
                >
                  <MdDashboard size={20} /> Manage Donations
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-users" className={navLinkClass}>
                  <MdPeople size={20} /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manage-role-requests"
                  className={navLinkClass}
                >
                  <MdAssignmentInd size={20} /> Manage Role Requests
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manage-requests"
                  className={navLinkClass}
                >
                  <MdListAlt size={20} /> Manage Requests
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/feature-donations"
                  className={navLinkClass}
                >
                  <MdStar size={20} /> Feature Donations
                </NavLink>
              </li>
            </>
          )}

          {/* Charity */}
          {role === "charity" && (
            <>
              <li>
                <NavLink to="/dashboard/my-requests" className={navLinkClass}>
                  <MdAssignment size={20} /> My Requests
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-pickups" className={navLinkClass}>
                  <MdLocalShipping size={20} /> My Pickups
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/my-received-donations"
                  className={navLinkClass}
                >
                  <MdCardGiftcard size={20} /> Received Donations
                </NavLink>
              </li>
            </>
          )}

          {/* Restaurant */}
          {role === "restaurant" && (
            <>
              <li>
                <NavLink to="/dashboard/add-donation" className={navLinkClass}>
                  <MdAddBox size={20} /> Add Donation
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-donations" className={navLinkClass}>
                  <MdInventory size={20} /> My Donations
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/requested-donations"
                  className={navLinkClass}
                >
                  <MdMoveToInbox size={20} /> Requested Donations
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/donation-statistics"
                  className={navLinkClass}
                >
                  <MdInsights size={20} /> Donation Statistics
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
