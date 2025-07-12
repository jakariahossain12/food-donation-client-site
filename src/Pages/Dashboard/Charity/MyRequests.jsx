import { useQuery, useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { FaTimesCircle } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myRequests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-requests?email=${user?.email}`
      );
      return res.data;
    },
  });

  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/donation-requests/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Request canceled");
      refetch();
    },
    onError: () => {
      toast.error("Failed to cancel request");
    },
  });

  const handleCancel = (id) => {
    cancelMutation.mutate(id);
  };

    if (isLoading) return <div className="text-center py-10">Loading...</div>;
    


    if (requests.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No requests"
            className="w-24 h-24 opacity-50 mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-500">
            You haven't made any requests yet.
          </h2>
          <p className="text-gray-400">
            Browse donations and request food when you're ready.
          </p>
        </div>
      );
    }


  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#00705c]">
        📋 My Donation Requests
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {requests.map((req) => (
          <div
            key={req._id}
            className="bg-white shadow-lg rounded-xl p-5 border-l-4"
            style={{
              borderColor:
                req.status === "Accepted"
                  ? "#22c55e"
                  : req.status === "Rejected"
                  ? "#ef4444"
                  : "#facc15",
            }}
          >
            <h3 className="text-xl font-semibold text-[#00705c]">
              {req.donationTitle}
            </h3>
            <p className="text-gray-600">
              <strong>Restaurant:</strong> {req.restaurantName}
            </p>
            <p className="text-gray-600">
              <strong>Food Type:</strong> {req.type || "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Quantity:</strong> {req.quantity || "N/A"}
            </p>

            <p className="mt-3">
              <span className="font-semibold">Status: </span>
              <span
                className={`badge ${
                  req.status === "Pending"
                    ? "badge-warning"
                    : req.status === "Accepted"
                    ? "badge-success"
                    : "badge-error"
                }`}
              >
                {req.status}
              </span>
            </p>

            <button
              onClick={() => handleCancel(req._id)}
              className="btn btn-outline btn-error mt-4 flex items-center gap-2"
              disabled={req.status !== "Pending"}
            >
              <FaTimesCircle />
              Cancel Request
                </button>
                
                
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRequests;
