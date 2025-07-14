import { useQuery, useMutation } from "@tanstack/react-query";

import { format } from "date-fns";
import { toast } from "react-toastify";
import { FaTrashAlt, FaStar } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: reviews = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myAllReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${user?.email}`);
      return res.data;
    },
  });

  const deleteReview = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/reviews/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Review deleted");
      refetch();
    },
    onError: () => toast.error("Failed to delete review"),
  });

  if (isLoading)
    return <div className="text-center py-12">Loading reviews...</div>;

  if (reviews.length === 0) {
    return (
      <div className="text-center mt-12">
        <h2 className="text-xl font-semibold text-gray-500">
          You have no reviews yet.
        </h2>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-[#00705c] mb-6">My Reviews</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 p-6 space-y-3 relative"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">
                {review.donationTitle}
              </h3>
              <button
                onClick={() => deleteReview.mutate(review._id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <FaTrashAlt className="text-lg" />
              </button>
            </div>

            <p className="text-gray-600 text-sm">
              <strong>Restaurant:</strong> {review.restaurantName}
            </p>
            <p className="text-gray-500 text-sm">
              <strong>Reviewed On:</strong>{" "}
              {review.date
                ? format(new Date(review.date), "PPpp")
                : "Unknown"}
            </p>
            <p className="text-gray-700 mt-2">{review.reviewText}</p>

            {review.rating && (
              <div className="flex items-center gap-1 text-yellow-500 text-sm">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
