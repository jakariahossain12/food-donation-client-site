import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";



const FeaturedDonations = () => {
  const axiosSecure = useAxiosSecure();

  const { data: dummyDonations = [] } = useQuery({
    queryKey: ["featuredDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/featured-donations");
      return res.data;
    },
  });
    
    

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Featured Donations
        </h2>
        <p className="text-gray-500">
          Explore highlighted donations from verified restaurants
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-6 gap-8 max-w-7xl mx-auto">
        {dummyDonations.map((donation) => (
          <div
            key={donation._id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
          >
            <img
              src={donation.image}
              alt={donation.type}
              className="h-48 w-full object-cover"
            />
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                  {donation.type}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    donation.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {donation.status}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-800">
                {donation.restaurant}
              </h3>
              <p className="text-sm text-gray-500">{donation.location}</p>
              <Link to={`donations/${donation._id}`}>
                <button className="mt-2 w-full bg-yellow-400 hover:bg-yellow-500 transition text-white font-medium py-2 rounded-lg">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedDonations;
