import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all charity requests
  const {
    data: requests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allCharityRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donation-requests");
      return res.data;
    },
  });

  // Mutation to delete a request
  const deleteRequest = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/donation-request/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Request deleted successfully.");
      refetch();
    },
    onError: () => {
      toast.error("Failed to delete request.");
    },
  });

  if (isLoading)
    return <div className="text-center py-10">Loading requests...</div>;

  if (requests.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        <h2 className="text-xl font-semibold">No charity requests found.</h2>
      </div>
    );
  }

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-[#00705c]">
        Manage Charity Requests
      </h2>
      <table className="table table-zebra border rounded-xl shadow-md">
        <thead className="bg-[#00705c] text-white">
          <tr>
            <th>#</th>
            <th>Donation Title</th>
            <th>Charity Name</th>
            <th>Email</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, index) => (
            <tr key={req._id}>
              <td>{index + 1}</td>
              <td className="font-medium">{req.donationTitle}</td>
              <td>{req.charityName}</td>
              <td>{req.charityEmail}</td>
              <td>{req.description}</td>
              <td>
                <button
                  onClick={() => deleteRequest.mutate(req._id)}
                  className="btn btn-sm btn-error text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRequests;
