import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Component/Loading/Loading";
import DonationCard from "../../Component/DonationCard/DonationCard";

const AllDonation = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 8;

  const {
    data,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allVerifyDonations", searchTerm, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation/public?search=${searchTerm}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // reset to first page on search
    refetch();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const { donations = [], totalPages = 1 } = data || {};

  return (
    <div className="bg-base-200 min-h-screen">
      {window.scroll(0, 0)}
      <div className="text-center py-8 w-11/12 mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#00705c]">
          🥗 Explore Verified Food Donations
        </h2>
        <p className="text-gray-500 mt-2 px-2">
          Browse food donations shared by restaurant partners.
        </p>
      </div>

      <div className="flex justify-center my-6 w-11/12 mx-auto px-4">
        <input
          type="text"
          placeholder="🔍 Search by location (e.g., Bangladesh City)"
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00705c] transition"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {isLoading ? (
        <Loading />
      ) : donations.length === 0 ? (
        <div className="w-11/12 mx-auto px-4 text-center text-gray-500 py-10">
          <h2 className="text-2xl font-semibold">No matching donations found</h2>
          <p>Try searching with a different location.</p>
        </div>
      ) : (
        <>
          <div className="w-11/12 mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-4">
            {donations.map((donation) => (
              <DonationCard key={donation._id} donation={donation} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center text-base-100 items-center gap-2 py-6 flex-wrap">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 cursor-pointer rounded-full text-gray-600 bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
            >
               Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded-full ${
                  page === i + 1
                    ? "bg-[#00705c] text-white"
                    : "bg-white border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 cursor-pointer text-gray-600 rounded-full bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllDonation;