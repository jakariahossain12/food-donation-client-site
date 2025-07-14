import { useQuery } from "@tanstack/react-query";

import { FaHandHoldingHeart } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const LatestCharityRequests = () => {
    const axiosSecure = useAxiosSecure();
    

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["latestCharityRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/charity-requests/latest");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading latest requests...</div>;
  }

  return (
    <section className="py-10 px-4 md:px-8 bg-[#f6fefc]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#00705c] mb-6 flex items-center gap-2">
          <FaHandHoldingHeart className="text-pink-600" /> Latest Charity
          Requests
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {requests.map((request) => (
            <div
              key={request._id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={request.image || "https://via.placeholder.com/50"}
                  alt={request.name}
                  className="w-12 h-12 rounded-full border"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {request.name}
                  </h4>
                  <p className="text-sm text-gray-500">{request.email}</p>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                <strong>Organization:</strong> {request.organization}
              </p>
              <p className="text-sm text-[#00705c] font-medium">
                <strong>Requested mission:</strong> {request.mission}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestCharityRequests;
