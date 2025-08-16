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
import FeatureDonations from "../Pages/Dashboard/Admin/FeatureDonations";
import PrivateRoute from "../Private/PrivateRoute";
import RestaurantRoute from "../Private/RestaurantRoute";
import MyReviews from "../Pages/Dashboard/User/MyReviews";
import CharityRoute from "../Private/CharityRoute";
import AdminRoute from "../Private/AdminRoute";
import DonationStatistics from "../Pages/Dashboard/Restaurant/DonationStatistics";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      {
        path: "donations",
        element: (
          <PrivateRoute>
            <AllDonation />
          </PrivateRoute>
        ),
      },
      {
        path: "donations-details/:id",
        element: (
          <PrivateRoute>
            <DonationDetails />
          </PrivateRoute>
        ),
      },
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
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // User
      {
        index: true,
        
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "request-charity",
        element: (
          <PrivateRoute>
            <RequestCharityRole />
          </PrivateRoute>
        ),
      },

      {
        path: "my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <PymentElements />
          </PrivateRoute>
        ),
      },
      {
        path: "transaction-history",
        element: (
          <PrivateRoute>
            <CharityTransactionHistory />
          </PrivateRoute>
        ),
      },
      {
        path: "favorites",
        element: (
          <PrivateRoute>
            <MyFavorites />
          </PrivateRoute>
        ),
      },

      // Admin
      {
        path: "manage-role-requests",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllCharityRequests />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsersTable />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-donations",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageDonations />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-requests",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageRequests />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "feature-donations",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <FeatureDonations />
            </AdminRoute>
          </PrivateRoute>
        ),
      },

      // Restaurant
      {
        path: "add-donation",
        element: (
          <PrivateRoute>
            <RestaurantRoute>
              <AddDonation />
            </RestaurantRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "requested-donations",
        element: (
          <PrivateRoute>
            <RestaurantRoute>
              <RequestedDonationsTable />
            </RestaurantRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-donations",
        element: (
          <PrivateRoute>
            <RestaurantRoute>
              <MyDonations />
            </RestaurantRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "upDate-donations/:id",
        element: (
          <PrivateRoute>
            <RestaurantRoute>
              <UpDateDonation />
            </RestaurantRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "donation-statistics",
        element: (
          <PrivateRoute>
            <RestaurantRoute>
              <DonationStatistics />
            </RestaurantRoute>
          </PrivateRoute>
        ),
      },

      // Charity
      {
        path: "my-requests",
        element: (
          <PrivateRoute>
            <CharityRoute>
              <MyRequests />
            </CharityRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-pickups",
        element: (
          <PrivateRoute>
            <CharityRoute>
              <MyPickups />
            </CharityRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-received-donations",
        element: (
          <PrivateRoute>
            <CharityRoute>
              <ReceivedDonations />
            </CharityRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
