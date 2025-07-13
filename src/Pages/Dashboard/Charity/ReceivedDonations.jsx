import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { format } from "date-fns";
import { Dialog } from "@headlessui/react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Component/Loading/Loading";

const ReceivedDonations = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  // Fetch picked-up donations
  const {
    data: received = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["receivedDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-request/received?email=${user?.email}`
      );
      return res.data;
    },
  });

  // Mutation to submit review
  const reviewMutation = useMutation({
    mutationFn: async ({ donationId, review }) => {
      const res = await axiosSecure.post("/reviews", { donationId, ...review });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Review submitted!");
      setSelectedDonation(null);
      setReviewText("");
      setRating(0);
    },
    onError: () => {
      toast.error("Failed to submit review.");
    },
  });

  if (isLoading || loading) return <Loading></Loading>;

  if (received.length === 0) {
    return (
      <div className="text-center mt-12">
        <h2 className="text-xl font-semibold text-gray-500">
          No received donations yet.
        </h2>
      </div>
    );
  }

  console.log(received[0]);
  console.log("Is valid:", !isNaN(new Date(received[0].pickedUpAt)));

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {received.map((donation) => (
          <div
            key={donation._id}
            className="bg-white rounded-2xl shadow-md border p-5 space-y-3 relative"
          >
            <h2 className="text-xl font-bold text-[#00705c]">
              {donation.donationTitle}
            </h2>
            <p>
              <strong>Restaurant:</strong> {donation.restaurantName}
            </p>
            <p>
              <strong>Type:</strong> {donation.type}
            </p>
            <p>
              <strong>Quantity:</strong> {donation.quantity}
            </p>
            <p>
              <strong>Pickup Date:</strong>{" "}
              {format(new Date(donation.pickedUpAt), "PPP p")}
              {donation.pickedUpAt}
            </p>
            <button
              onClick={() => setSelectedDonation(donation)}
              className="btn btn-sm bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Review
            </button>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      <Dialog
        open={!!selectedDonation}
        onClose={() => setSelectedDonation(null)}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen bg-black/50 p-4">
          <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
            <Dialog.Title className="text-lg font-bold">
              Leave a Review
            </Dialog.Title>
            <p>
              <strong>{selectedDonation?.donationTitle}</strong>
            </p>

            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer text-2xl ${
                    star <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              rows={4}
              className="w-full border rounded-lg p-2 focus:outline-emerald-500"
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedDonation(null)}
                className="btn btn-sm btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  reviewMutation.mutate({
                    donationId: selectedDonation._id,
                    review: {
                      reviewerName: user?.displayName,
                      reviewerEmail: user?.email,
                      rating,
                      reviewText,
                      date: new Date(),
                    },
                  })
                }
                className="btn btn-sm bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Submit Review
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default ReceivedDonations;
