import React from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Component/Loading/Loading";

const RestaurantRoute = ({ children }) => {
  const { user, loading, userSignOut } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["userRestaurant",user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user?.email}`);
      return res.data;
    },
  });
  if (loading || isLoading) {
    return <Loading></Loading>;
  }
  if (data.role !== "restaurant") {
    userSignOut()
      .then(() => {})
      .catch(() => {});
  }

  return <div>{children}</div>;
};

export default RestaurantRoute;
