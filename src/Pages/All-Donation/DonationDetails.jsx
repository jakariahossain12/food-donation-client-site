import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router";
import Rating from "react-rating-stars-component"; // Optional star rating lib

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [description, setDescription] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [rating, setRating] = useState(0);

  const { data: donation, isLoading } = useQuery({
    queryKey: ["donationDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation?id=${id}`);
      return res.data;
    },
  });

  const { data: reviews = [], refetch: refetchReviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?donationId=${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const handleRequestSubmit = async () => {
    const requestData = {
      donationId: donation._id,
      donationTitle: donation.title,
      restaurantName: donation.name,
      charityName: user.displayName,
      charityEmail: user.email,
      description,
      pickupTime,
      status: "Pending",
      requestedAt: new Date(),
    };

    try {
      await axiosSecure.post("/donation-request", requestData);
      toast.success("Donation request sent!");
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to request donation.");
    }
  };

  const handleAddReview = async () => {
    const reviewData = {
      donationId: id,
      reviewer: user.displayName,
      reviewerEmail: user.email,
      description: reviewDescription,
      rating,
      createdAt: new Date(),
    };
    try {
      await axiosSecure.post("/reviews", reviewData);
      toast.success("Review added!");
      setIsReviewModalOpen(false);
      setReviewDescription("");
      setRating(0);
      refetchReviews();
    } catch (err) {
      toast.error("Failed to add review");
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6 z-50">
      <img
        src={donation.image}
        alt={donation.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h2 className="text-3xl font-bold text-[#00705c] mb-2">
        {donation.title}
      </h2>

      {/* Donation info */}
      <p className="text-gray-700 mb-2">
        <strong>Food Type:</strong> {donation.type}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Restaurant:</strong> {donation.name} - {donation.location}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Status:</strong> {donation.status}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Quantity:</strong> {donation.quantity}
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Pickup Time:</strong> {donation.pickupStart} -{" "}
        {donation.pickupEnd}
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => toast.success("Saved to favorites!")}
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded"
        >
          Save to Favorites
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-[#005c4a] text-white px-4 py-2 rounded"
        >
          Request Donation
        </button>
        <button
          onClick={() => setIsReviewModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Review
        </button>
      </div>

      {/* Review Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-[#00705c] mb-2">📝 Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500 italic">
            No reviews yet. Be the first to review!
          </p>
        ) : (
          <div className="space-y-4">
            {reviews.map((rev) => (
              <div key={rev._id} className="border rounded-lg p-4 shadow-sm">
                <p className="font-semibold text-[#00705c]">{rev.reviewer}</p>
                <p className="text-sm text-gray-600">{rev.description}</p>
                <p className="text-yellow-500 text-sm">⭐ {rev.rating} / 5</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 space-y-4 shadow-lg relative w-full max-w-lg">
            <h2 className="text-xl font-bold text-[#00705c]">
              Request Donation
            </h2>
            <p>
              <strong>Donation:</strong> {donation.title}
            </p>
            <p>
              <strong>Restaurant:</strong> {donation.name}
            </p>
            <p>
              <strong>Your Name:</strong> {user.displayName}
            </p>
            <p>
              <strong>Your Email:</strong> {user.email}
            </p>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Why do you need this donation?"
              className="w-full border px-3 py-2 rounded-md"
              rows="3"
            />
            <input
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={handleRequestSubmit}
                className="bg-[#00705c] text-white px-4 py-2 rounded hover:bg-[#005c4a]"
              >
                Submit Request
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 space-y-4 shadow-lg relative w-full max-w-lg">
            <h2 className="text-xl font-bold text-[#00705c]">Add Review</h2>

            <p>
              <strong>Your Name:</strong> {user.displayName}
            </p>

            <textarea
              value={reviewDescription}
              onChange={(e) => setReviewDescription(e.target.value)}
              placeholder="Your review..."
              className="w-full border px-3 py-2 rounded-md"
              rows="3"
            />

            <label className="block text-sm font-medium text-gray-700">
              Rating (1–5):
            </label>
            <input
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={handleAddReview}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Submit Review
              </button>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="text-gray-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationDetails;
