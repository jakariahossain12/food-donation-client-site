import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import Loading from "../../Component/Loading/Loading";

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [description, setDescription] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ================= Donation Details =================
  const {
    data: donation = {},
    isLoading,
  } = useQuery({
    queryKey: ["donationDetails", id],
    enabled: !loading && !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation?id=${id}`);
      return res.data;
    },
  });

  // ================= User Data =================
  const { data = {} } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user.email}`);
      return res.data;
    },
  });

  // ================= Reviews =================
  const {
    data: reviews = [],
    refetch,
  } = useQuery({
    queryKey: ["review", id],
    enabled: !loading && !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?id=${id}`);
      return res.data;
    },
  });

  // ================= Save Favorite =================
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const favorite = {
        donationId: id,
        userEmail: user?.email,
        savedAt: new Date(),
      };

      const res = await axiosSecure.post("/favorites", favorite);
      return res.data;
    },

    onSuccess: () => {
      toast.success("Saved to favorites!");
    },

    onError: () => {
      toast.error("You’ve already saved this donation.");
    },
  });

  // ================= Handle Save =================
  const handleSave = () => {
    if (!user) {
      toast.warning("Please log in to save donations.");
      return;
    }

    mutate();
  };

  // ================= Request Donation =================
  const requestDonation = useMutation({
    mutationFn: async (requestData) => {
      const res = await axiosSecure.post(
        "/donation-requests",
        requestData
      );

      return res.data;
    },

    onSuccess: () => {
      toast.success("Donation request sent!");
    },

    onError: () => {
      toast.error("You’ve already sent Donation request.");
    },
  });

  // ================= Open Request Modal =================
  const modelOpen = () => {
    if (!user) {
      toast.warning("Please log in to Request donations.");
      return;
    }

    setIsModalOpen(true);
  };

  // ================= Submit Donation Request =================
  const handleRequestSubmit = async () => {
    if (data?.role !== "charity") {
      return toast.warning("You're not charity");
    }

    const requestData = {
      donationId: donation._id,
      donationTitle: donation.title,
      restaurantName: donation.name,
      restaurantEmail: donation?.email,
      quantity: donation.quantity,
      type: donation.type,
      charityName: user?.displayName,
      charityEmail: user?.email,
      description,
      pickupTime,
      status: "Pending",
      requestedAt: new Date(),
    };

    requestDonation.mutate(requestData);

    setIsModalOpen(false);
  };

  // ================= Review Modal =================
  const modelReview = () => {
    if (!user) {
      toast.warning("Please log in to review donation.");
      return;
    }

    setReviewModal(true);
  };

  // ================= Add Review =================
  const donationReview = useMutation({
    mutationFn: async (reviewData) => {
      const res = await axiosSecure.post(
        "/reviews/donation-review",
        reviewData
      );

      return res.data;
    },

    onSuccess: () => {
      refetch();
      setReviewModal(false);
      setReviewText("");
      setRating(5);
    },
  });

  // ================= Handle Add Review =================
  const handleAddReview = async () => {
    const reviewData = {
      donationId: donation._id,
      donationTitle: donation.title,
      restaurantName: donation.name,
      restaurantEmail: donation.email,
      reviewerName: user?.displayName,
      reviewerEmail: user?.email,
      rating,
      reviewText,
      date: new Date(),
    };

    donationReview.mutate(reviewData);
  };

  // ================= Loading =================
  if (isLoading || loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="max-w-3xl bg-base-100 mx-auto p-6 rounded-lg shadow-md relative z-10">

        {/* Donation Image */}
        <img
          src={donation.image}
          alt={donation.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />

        {/* Donation Title */}
        <h2 className="text-3xl font-bold text-[#00705c] mb-2">
          {donation.title}
        </h2>

        {/* Food Type */}
        <p className="text-base-content">
          <strong>Food Type:</strong> {donation.type}
        </p>

        {/* Restaurant */}
        <p className="text-base-content">
          <strong>Restaurant:</strong> {donation.name} -{" "}
          {donation.location}
        </p>

        {/* Status */}
        <p className="text-base-content">
          <strong>Status:</strong> {donation.status}
        </p>

        {/* Quantity */}
        <p className="text-base-content">
          <strong>Quantity:</strong> {donation.quantity}
        </p>

        {/* Pickup Time */}
        <p className="text-base-content mb-4">
          <strong>Pickup Time:</strong> {donation.pickupStart} -{" "}
          {donation.pickupEnd}
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mb-6">

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={isPending}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-md flex items-center gap-2 transition duration-300"
          >
            <FaHeart />
            {isPending ? "Saving..." : "Save to Favorites"}
          </button>

          {/* Request Donation */}
          <button
            onClick={modelOpen}
            className="btn btn-success"
          >
            Request Donation
          </button>

          {/* Add Review */}
          <button
            onClick={modelReview}
            className="btn btn-warning"
          >
            Add Review
          </button>
        </div>

        {/* ================= Reviews ================= */}
        <div className="mt-6">

          <h3 className="text-xl font-semibold mb-2 text-[#00705c]">
            📝 Reviews
          </h3>

          {reviews?.length > 0 ? (
            <div className="space-y-4">

              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="p-3 rounded-md shadow"
                >
                  <p className="font-bold">
                    {review.reviewerName}
                  </p>

                  <p className="text-sm text-gray-600">
                    Rating: {review.rating}/5
                  </p>

                  <p>{review.reviewText}</p>
                </div>
              ))}

            </div>
          ) : (
            <p className="text-gray-500">
              No reviews yet for this donation.
            </p>
          )}
        </div>

        {/* ================= Review Modal ================= */}
        {reviewModal && (
          <dialog
            id="review_modal"
            className="modal modal-open"
          >
            <div className="modal-box">

              <h3 className="font-bold text-lg text-[#00705c]">
                Add Your Review
              </h3>

              <textarea
                className="textarea textarea-bordered w-full mt-3"
                placeholder="Write your review"
                value={reviewText}
                onChange={(e) =>
                  setReviewText(e.target.value)
                }
              ></textarea>

              <input
                type="number"
                min={1}
                max={5}
                value={rating}
                onChange={(e) =>
                  setRating(Number(e.target.value))
                }
                className="input input-bordered w-full mt-3"
                placeholder="Rating (1 to 5)"
              />

              <div className="modal-action">

                <button
                  type="button"
                  className="btn btn-success mr-2"
                  onClick={handleAddReview}
                  disabled={donationReview.isPending}
                >
                  {donationReview.isPending
                    ? "Submitting..."
                    : "Submit"}
                </button>

                <button
                  type="button"
                  className="btn"
                  onClick={() =>
                    setReviewModal(false)
                  }
                >
                  Close
                </button>

              </div>
            </div>
          </dialog>
        )}

        {/* ================= Donation Request Modal ================= */}
        {isModalOpen && (
          <dialog
            id="request_modal"
            className="modal modal-open"
          >
            <div className="modal-box space-y-3">

              <h3 className="text-xl font-bold text-[#00705c]">
                Request Donation
              </h3>

              <p>
                <strong>Donation:</strong>{" "}
                {donation.title}
              </p>

              <p>
                <strong>Restaurant:</strong>{" "}
                {donation.name}
              </p>

              <p>
                <strong>Your Name:</strong>{" "}
                {user?.displayName}
              </p>

              <p>
                <strong>Your Email:</strong>{" "}
                {user?.email}
              </p>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Why do you need this donation?"
                className="textarea textarea-bordered w-full"
                rows="3"
              />

              <input
                type="time"
                value={pickupTime}
                onChange={(e) =>
                  setPickupTime(e.target.value)
                }
                className="input input-bordered w-full"
              />

              <div className="modal-action">

                <button
                  onClick={handleRequestSubmit}
                  className="btn bg-[#00705c]"
                  disabled={requestDonation.isPending}
                >
                  {requestDonation.isPending
                    ? "Submitting..."
                    : "Submit"}
                </button>

                <button
                  type="button"
                  className="btn"
                  onClick={() =>
                    setIsModalOpen(false)
                  }
                >
                  Cancel
                </button>

              </div>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default DonationDetails;