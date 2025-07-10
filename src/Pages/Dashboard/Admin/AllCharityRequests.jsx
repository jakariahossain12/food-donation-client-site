import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "../../../Component/Loading/Loading";
import { toast } from "react-toastify";

const AllCharityRequests = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  // get requests data
  const {
    isLoading,
    data: requests,
    refetch,
  } = useQuery({
    queryKey: ["allCharityRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/charity-request-status`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (userData) => {
      console.log(userData);
      const res = await axiosSecure.patch(`/updata-user-role`, userData);
      console.log(res.data);
      refetch();
      return res.data;
    },
  });

  if (isLoading || loading) {
    return <Loading></Loading>;
  }

  const handleUpdateStatus = async (id, newStatus) => {
    const email = user?.email;
    const role = "charity";
    mutation.mutate({ id, newStatus, role, email });
    newStatus === "Approved"
      ? toast.success(newStatus)
      : toast.error(newStatus);
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-center text-[#00705c] mb-6">
        All Charity Role Requests
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full table-auto border border-gray-200 bg-white">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm">Name</th>
              <th className="px-4 py-3 text-left text-sm">Email</th>
              <th className="px-4 py-3 text-left text-sm">Organization</th>
              <th className="px-4 py-3 text-left text-sm">Mission</th>
              <th className="px-4 py-3 text-left text-sm">Transaction ID</th>
              <th className="px-4 py-3 text-left text-sm">Status</th>
              <th className="px-4 py-3 text-left text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {requests.map((req) => (
              <tr key={req._id}>
                <td className="px-4 py-3 font-medium">{req.name}</td>
                <td className="px-4 py-3">{req.email}</td>
                <td className="px-4 py-3">{req.organization}</td>
                <td className="px-4 py-3 italic max-w-sm truncate">
                  {req.mission}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-gray-600">
                  {req.transactionId}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      req.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : req.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                {req.status === "Pending" && (
                  <td className="px-4 py-3 space-x-2 flex">
                    <button
                      onClick={() => handleUpdateStatus(req._id, "Approved")}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs"
                      disabled={req.status !== "Pending"}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(req._id, "Rejected")}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs"
                      disabled={req.status !== "Pending"}
                    >
                      Reject
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
                  No charity role requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCharityRequests;
