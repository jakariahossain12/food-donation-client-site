import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Component/Loading/Loading";
import DonationCard from "../../Component/DonationCard/DonationCard";

const AllDonation = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: donations = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allVerifyDonations", searchTerm],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-verify-donations?search=${searchTerm}`
      );
      return res.data;
    },
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    refetch(); // fetch new data based on search
  };

  return (
    <div className=" bg-gray-50">
      {/* Always show the header */}
      <div className="text-center py-8 w-11/12 mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#00705c]">
          🥗 Explore Verified Food Donations
        </h2>
        <p className="text-gray-500 mt-2 px-2">
          Browse food donations shared by restaurant partners.
        </p>
      </div>

      {/* Always show search input */}
      <div className="flex justify-center my-6 w-11/12 mx-auto px-4 ">
        <input
          type="text"
          placeholder="🔍 Search by location (e.g., Bangladesh City)"
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00705c] transition"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Loading State */}
      {isLoading ? (
        <Loading />
      ) : donations.length === 0 ? (
        // No donations found
        <div className="w-11/12 mx-auto px-4  text-center text-gray-500 py-10">
          <h2 className="text-2xl font-semibold">
            No matching donations found
          </h2>
          <p>Try searching with a different location.</p>
        </div>
      ) : (
        // Show donations grid
        <div className="w-11/12 mx-auto px-4 min-h-screen   grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
          {donations.map((donation) => (
            <DonationCard key={donation._id} donation={donation} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDonation;
