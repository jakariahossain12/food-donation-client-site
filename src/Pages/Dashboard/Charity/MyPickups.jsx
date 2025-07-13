import { useQuery, useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { PackageCheck, Truck, AlarmClock } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyPickups = () => {
  const { user , loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: pickups = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myPickups"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-request/pickups?email=${user?.email}`
      );
      return res.data;
    },
  });

  const confirmPickup = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/donation-request/pickup/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Pickup confirmed!");
      refetch();
    },
    onError: () => {
      toast.error("Failed to confirm pickup.");
    },
  });

  if (isLoading || loading) {
    return (
      <div className="text-center py-16 text-lg font-medium">
        Loading pickups...
      </div>
    );
  }

  if (pickups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4 text-gray-500">
        <Truck className="w-16 h-16 text-gray-400" />
        <h2 className="text-xl font-semibold">No pickups assigned yet.</h2>
        <p>You'll see your assigned pickups here once available.</p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-10 py-6">
      <h2 className="text-2xl font-bold text-center text-[#00705c] mb-8">
        My Pickups
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pickups.map((pickup) => (
          <div
            key={pickup._id}
            className="bg-white rounded-2xl shadow-md border p-5 flex flex-col justify-between space-y-3 hover:shadow-lg transition"
          >
            <div>
              <h3 className="text-xl font-bold text-[#004d40] mb-2 flex items-center gap-2">
                <PackageCheck className="w-5 h-5" /> {pickup.donationTitle}
              </h3>
              <p>
                <strong>Restaurant:</strong> {pickup.restaurantName},{" "}
                {pickup.location}
              </p>
              <p>
                <strong>Type:</strong> {pickup.type}
              </p>
              <p>
                <strong>Quantity:</strong> {pickup.quantity}
              </p>
              <p className="flex items-center gap-2">
                <AlarmClock className="w-4 h-4 text-gray-500" />
                <span>
                  <strong>Pickup Time:</strong> {pickup.pickupTime}
                </span>
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                    pickup.status === "Picked Up"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {pickup.status}
                </span>
              </p>
            </div>

            {pickup.status === "Accepted" && (
              <button
                onClick={() => confirmPickup.mutate(pickup._id)}
                className="mt-4 btn btn-sm bg-green-600 hover:bg-green-700 text-white"
              >
                Confirm Pickup
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPickups;
