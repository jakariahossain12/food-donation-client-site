import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router";
import DonationCard from "../../Component/DonationCard/DonationCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Component/Loading/Loading";



const AllDonation = () => {

  const axiosSecure = useAxiosSecure();

  const {
    data: donations = [],
    isLoading,
  } = useQuery({
    queryKey: ["allVerifyDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-verify-donations");
      return res.data;
    },
  });





 if (isLoading) return <Loading />;





  if (!donations || donations.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center text-gray-500 space-y-2">
          <h2 className="text-2xl font-bold">
            No Verified Donations Available
          </h2>
          <p>Check back later or encourage restaurants to add donations.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center my-8">
        <h2 className="text-4xl font-bold text-[#00705c]">
          🥗 Explore Verified Food Donations
        </h2>
        <p className="text-gray-500 mt-2 px-2">
          Browse available food donations shared by our restaurant partners.
        </p>
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-2 py-4">
        {donations.map((donation) => (
          <DonationCard key={donation._id} donation={donation}></DonationCard>
        ))}
      </div>
    </div>
  );
};

export default AllDonation;
