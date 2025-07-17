import { useQuery, useMutation } from "@tanstack/react-query";


import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";

const MyFavorites = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch user's favorite donations
  const {
    data: favorites = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites?email=${user.email}`);
      return res.data;
    },
  });

  // Delete favorite mutation
  const { mutate: removeFavorite } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/favorites/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Removed from favorites");
      refetch();
    },
    onError: () => {
      toast.error("Failed to remove");
    },
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading favorites...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-[#00705c] mb-6">
        ❤️ My Favorite Donations
      </h2>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">No favorites found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <div
              key={fav._id}
              className="card bg-white shadow-lg rounded-lg overflow-hidden border"
            >
              <figure>
                <img
                  src={fav.image}
                  alt={fav.title}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-[#00705c]">{fav.title}</h2>
                <p className="text-sm">
                  <strong>Restaurant:</strong> {fav.name}
                </p>
                <p className="text-sm">
                  <strong>Location:</strong> {fav.location}
                </p>
                <p className="text-sm">
                  <strong>Status:</strong> {fav.status}
                </p>
                <p className="text-sm">
                  <strong>Quantity:</strong> {fav.quantity}
                </p>

                <div className="card-actions justify-between mt-4">
                  <Link
                    to={`/donations/${fav.donationId}`}
                    className="btn btn-success btn-sm"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => removeFavorite(fav._id)}
                    className="btn btn-error btn-sm flex items-center gap-1"
                  >
                    <FaTrashAlt /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFavorites;
