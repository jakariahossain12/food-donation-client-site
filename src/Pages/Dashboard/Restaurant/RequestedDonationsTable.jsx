import { useMutation, useQuery } from "@tanstack/react-query";

import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RequestedDonationsTable = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["donationRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests?email=${user?.email}`);
      return res.data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/donation-requests/${id}`, {
        status,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Status updated");
      refetch();
    },
    onError: () => toast.error("Failed to update status"),
  });

  const handleStatusChange = (id, status) => {
    updateStatus.mutate({ id, status });
  };

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold text-[#00705c] mb-4">
        Requested Donations
      </h2>

      <table className="table table-zebra shadow-md rounded-lg bg-white">
        <thead className="bg-[#00705c] text-white">
          <tr>
            <th>#</th>
            <th>Donation Title</th>
            <th>Food Type</th>
            <th>Charity Name</th>
            <th>Charity Email</th>
            <th>Description</th>
            <th>Pickup Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={request._id}>
              <td>{index + 1}</td>
              <td>{request.donationTitle}</td>
              <td>{request.type || "N/A"}</td>
              <td>{request.charityName}</td>
              <td>{request.charityEmail}</td>
              <td>{request.description}</td>
              <td>{request.pickupTime}</td>
              <td>
                <span
                  className={`badge ${
                    request.status === "Accepted"
                      ? "badge-success"
                      : request.status === "Rejected"
                      ? "badge-error"
                      : "badge-warning"
                  }`}
                >
                  {request.status}
                </span>
              </td>
              <td className="flex gap-2 items-center justify-center">
                <button
                  className="btn btn-xs btn-success"
                  disabled={request.status !== "Pending"}
                  onClick={() => handleStatusChange(request._id, "Accepted")}
                >
                  Accept
                </button>
                <button
                  className="btn btn-xs btn-error"
                  disabled={request.status !== "Pending"}
                  onClick={() => handleStatusChange(request._id, "Rejected")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {requests.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No requests yet.</p>
      )}
    </div>
  );
};

export default RequestedDonationsTable;
