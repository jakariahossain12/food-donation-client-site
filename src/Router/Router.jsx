import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";

import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Dashboard from "../Layouts/Dashboard";
import NotFound from "../Pages/NotFound/NotFound";
import AllDonation from "../Pages/All-Donation/AllDonation";
import MyProfile from "../Pages/MyProfile/MyProfile";
import RequestCharityRole from "../Pages/Dashboard/User/RequestCharityRole";
import PymentElements from "../Pages/Dashboard/User/PymentElements";
import CharityTransactionHistory from "../Pages/Dashboard/User/CharityTransactionHistory";
import AllCharityRequests from "../Pages/Dashboard/Admin/AllCharityRequests";
import AddDonation from "../Pages/Dashboard/Restaurant/AddDonation";
import MyDonations from "../Pages/Dashboard/Restaurant/MyDonations";
import UpDateDonation from "../Pages/Dashboard/Restaurant/UpDateDonation";
import ManageUsersTable from "../Pages/Dashboard/Admin/ManageUsersTable";
import ManageDonations from "../Pages/Dashboard/Admin/ManageDonations";
import DonationDetails from "../Pages/All-Donation/DonationDetails";
import MyFavorites from "../Pages/Dashboard/User/MyFavorites";
import RequestedDonationsTable from "../Pages/Dashboard/Restaurant/RequestedDonationsTable";
import MyRequests from "../Pages/Dashboard/Charity/MyRequests";
import MyPickups from "../Pages/Dashboard/Charity/MyPickups";
import ReceivedDonations from "../Pages/Dashboard/Charity/ReceivedDonations";
import ManageRequests from "../Pages/Dashboard/Admin/ManageRequests";
 export const router = createBrowserRouter([
   {
     path: "/",
     Component: MainLayout,
     children: [
       { index: true, Component: Home },
       { path: "donations", Component: AllDonation },
       { path: "donations/:id", element: <DonationDetails></DonationDetails> },
     ],
   },
   {
     path: "register",
     Component: Register,
   },
   {
     path: "login",
     Component: Login,
   },
   {
     path: "dashboard",
     Component: Dashboard,
     children: [
       { index: true, path: "my-profile", element: <MyProfile></MyProfile> },
       {
         path: "request-charity",
         element: <RequestCharityRole></RequestCharityRole>,
       },
       {
         path: "payment",
         element: <PymentElements></PymentElements>,
       },
       {
         path: "transaction-history",
         element: <CharityTransactionHistory></CharityTransactionHistory>,
       },
       {
         path: "favorites",
         element: <MyFavorites></MyFavorites>,
       },
       {
         path: "manage-role-requests",
         element: <AllCharityRequests></AllCharityRequests>,
       },
       {
         path: "manage-users",
         element: <ManageUsersTable></ManageUsersTable>,
       },
       {
         path: "manage-donations",
         element: <ManageDonations></ManageDonations>,
       },
       {
         path: "manage-requests",
         element: <ManageRequests></ManageRequests>,
       },
       {
         path: "add-donation",
         element: <AddDonation></AddDonation>,
       },
       {
         path: "requested-donations",
         element: <RequestedDonationsTable></RequestedDonationsTable>,
       },
       {
         path: "my-donations",
         element: <MyDonations></MyDonations>,
       },
       {
         path: "upDate-donations/:id",
         element: <UpDateDonation></UpDateDonation>,
       },

       //  cherity

       {
         path: "my-requests",
         element: <MyRequests></MyRequests>,
       },
       {
         path: "my-pickups",
         element: <MyPickups></MyPickups>,
       },
       {
         path: "my-received-donations",
         element: <ReceivedDonations></ReceivedDonations>,
       },
     ],
   },
   {
     path: "*",
     Component: NotFound,
   },
 ]);