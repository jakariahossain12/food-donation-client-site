import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Component/Loading/Loading";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { useState } from "react";

const statusColor = {
  Verified: "text-green-600 font-semibold",
  Rejected: "text-red-500 font-semibold",
  Pending: "text-yellow-500 font-medium",
};

const ManageDonations = () => {
  const axiosSecure = useAxiosSecure();

 const [page, setPage] = useState(1);

const { data, isLoading, refetch } = useQuery({
  queryKey: ["allDonationsAdmin", page],
  queryFn: async () => {
    const res = await axiosSecure.get(`/donation/all?page=${page}&limit=5`);
    
    return res.data;
  },
});

const donations = Array.isArray(data) ? data : (data?.data || data?.donations || []);
const totalPages = data?.totalPages;

const updateStatusMutation = useMutation({
  mutationFn: async ({ id, status }) => {
    const res = await axiosSecure.patch(`/donation/status/${id}`, {
      status,
    });
    return res.data;
  },
  onSuccess: (data, variables) => {
    toast.success(`Status updated successfully to ${variables.status}`);
    refetch(); // Refetches current page data
  },
  onError: (error) => {
    console.error("Mutation Error:", error);
    toast.error(error?.response?.data?.message || "Failed to update status");
  },
});

const handleStatusUpdate = (id, status) => {
  updateStatusMutation.mutate({ id, status });
};

    if (isLoading) return <Loading />;

    
    
    if (donations.length === 0) {
      return <div className="flex justify-center items-center min-h-[60vh] px-4">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-700">No Donations </h2>
        <p className="text-gray-500 mt-2">
          It looks like there are no food donations at the moment..
        </p>
      </div>
    </div>
    }


  return (
    <div className="px-4 overflow-x-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#00705c]">
        📦 Manage Donations
      </h2>
      <table className="table table-zebra rounded-xl shadow overflow-hidden border">
        <thead className="bg-[#00705c] text-white text-sm uppercase text-left">
          <tr>
            <th className="py-3 px-4">Title</th>
            <th className="py-3 px-4">Type</th>
            <th className="py-3 px-4">Restaurant</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Quantity</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="">
          {donations?.map((donation) => (
            <tr
              key={donation._id}
              className="border-t hover:bg-base-200 transition"
            >
              <td className="py-3 px-4">{donation.title}</td>
              <td className="py-3 px-4">{donation.type}</td>
              <td className="py-3 px-4">{donation.name}</td>
              <td className="py-3 px-4">{donation.email}</td>
              <td className="py-3 px-4">{donation.quantity}</td>
              <td className={`py-3 px-4 ${statusColor[donation.status]}`}>
                {donation.status}
              </td>
              <td className="py-3 px-4 space-x-2 flex">
                {donation.status === "Pending" ? (
                  <>
                    <button
                      onClick={() =>
                        handleStatusUpdate(donation._id, "Verified")
                      }
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                    >
                      <FaCheck /> Verify
                    </button>
                    <button
                      onClick={() =>
                        handleStatusUpdate(donation._id, "Rejected")
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                    >
                      <FaTimes /> Reject
                    </button>
                  </>
                ) : (
                  <span className="text-gray-400 italic">No actions</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-6 gap-3">
  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="btn btn-outline btn-sm"
  >
    Prev
  </button>

 {[...Array(totalPages)].map((_, i) => (
  <button
    key={i}
    onClick={() => setPage(i + 1)}
    className="btn btn-sm"
    style={{
      backgroundColor: page === i + 1 ? "#00705c" : "transparent",
      border: "1px solid #00705c",
      color: page === i + 1 ? "white" : "#00705c"
    }}
  >
    {i + 1}
  </button>
))}


  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
    className="btn btn-outline btn-sm"
  >
    Next
  </button>
</div>

    </div>
  );
};

export default ManageDonations;
