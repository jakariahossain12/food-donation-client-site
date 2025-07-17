import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MyDonationCard from "./MyDonationCard";
import Loading from "../../../Component/Loading/Loading";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

// import emptyImg from "../../../assets/empty-box.png"; // You can use your own image

const MyDonations = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: donations = [],refetch } = useQuery({
    queryKey: ["myDonation", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-donation?email=${user?.email}`);
      return res.data;
    },
  });
  refetch()
  

  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/delete-donation?id=${id}`);
      refetch();
      toast.success('delete successfully')
      return res.data
    }

  })



  if (isLoading || loading) {
    return <Loading />;
  }

  const handleDelete = async(id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this donation!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00705c",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async(result) => {
      if (result.isConfirmed) {
        
         mutation.mutate(id)
      }
    });
  };

  if (donations.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] px-4">
        <div className="bg-white shadow-lg rounded-xl p-10 max-w-md w-full text-center">
          
          <h2 className="text-2xl font-bold text-gray-700">No Donations Yet</h2>
          <p className="text-gray-500 mt-2">
            It looks like you haven’t added any food donations. Help reduce food
            waste and make a difference today.
          </p>
          <Link
            to="/dashboard/add-donation"
            className="inline-block mt-6 px-6 py-2 bg-[#00705c] hover:bg-[#005c4a] text-white rounded-md transition duration-300"
          >
            Add Your First Donation
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {donations.length > 0 && (
        <h2 className="text-3xl font-bold text-center text-[#00705c] mb-8">
          🍽️ Your Active Donations
        </h2>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donations.map((donation) => (
          <MyDonationCard key={donation._id} donation={donation} handleDelete={handleDelete} />
        ))}
      </div>
    </>
  );
};

export default MyDonations;
