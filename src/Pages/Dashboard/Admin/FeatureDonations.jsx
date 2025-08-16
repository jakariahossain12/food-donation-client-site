import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Loading from "../../../Component/Loading/Loading";

const FeatureDonations = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch verified donations
  const {
    data: donations = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["verifiedDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations/verified");
      return res.data;
    },
  });

  // Handle feature action (adjust this logic as needed)
  const featureDonation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/donations/feature/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Donation marked as featured!");
      refetch();
    },
    onError: () => {
      toast.error("Failed to feature donation.");
    },
  });

  if (isLoading)
    return <div className="h-screen flex justify-center items-center"><Loading/></div>;

  if (donations.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        <h2 className="text-xl font-semibold">
          No verified donations available.
        </h2>
      </div>
    );
  }

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-[#00705c]">
        Feature Donations
      </h2>
      <table className="table table-zebra rounded-xl shadow border border-base-100">
        <thead className="bg-[#00705c] text-white">
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Title</th>
            <th>Type</th>
            <th>Restaurant</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation, index) => (
            <tr key={donation._id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={donation.image}
                  alt="Donation"
                  className="w-16 h-16 object-cover rounded-md"
                />
              </td>
              <td className="font-medium">{donation.title}</td>
              <td>{donation.type}</td>
              <td>{donation.name}</td>
              <td>
                <button
                  onClick={() => featureDonation.mutate(donation._id)}
                  className="btn btn-sm bg-[#00705c]  text-white"
                >
                  Feature
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeatureDonations;
