import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth"; // your auth hook
import { uploadToImgbb } from "../../../Utils/Utils";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import Loading from "../../../Component/Loading/Loading";

const UpDateDonation = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const {
    isLoading,
    data: donation = [],refetch
  } = useQuery({
    queryKey: ["Donation", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation?id=${id}`);
      return res.data;
    },
  });
  refetch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  const mutation = useMutation({
    mutationFn: async (donationData) => {
      const res = await axiosSecure.put(
        `/upDate-donation/${donation._id}`,
        donationData
      );
      queryClient.invalidateQueries(["myDonation"]);
      toast.success(" donation Update successfully");
      return res.data;
    },
  });
  useEffect(() => {
    setImagePreview(donation?.image);
  }, [donation]);

  if (isLoading || loading) {
    return <Loading></Loading>;
  }

  const handleImage = async (image) => {
    const imageUrl = await uploadToImgbb(image);
    setImagePreview(imageUrl);
  };

  const onSubmit = async (data) => {
    data.image = imagePreview;
    data.status = "Pending";
    data.upDate = new Date().toISOString();
    mutation.mutate(data);
    
    navigate("/dashboard/my-donations");
  };

  return (
    <div className="max-w-2xl mx-auto bg-base-100 shadow-xl rounded-xl mt-10 p-8">
      <h2 className="text-3xl font-bold text-center text-[#00705c] mb-6">
        Update Surplus Food Donation
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-base-content">
            Donation Title
          </label>
          <input
            {...register("title", { required: true })}
            defaultValue={donation?.title}
            type="text"
            placeholder="e.g. Surplus Pastries"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00705c]"
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">Title is required</p>
          )}
        </div>

        {/* Food Type */}
        <div>
          <label className="block text-sm font-medium text-base-content">
            Food Type
          </label>
          <input
            {...register("type", { required: true })}
            defaultValue={donation?.type}
            type="text"
            placeholder="e.g. Bakery, Produce"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00705c]"
          />
          {errors.type && (
            <p className="text-sm text-red-500 mt-1">Food type is required</p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-base-content">
            Quantity (kg or portions)
          </label>
          <input
            {...register("quantity", { required: true })}
            defaultValue={donation?.quantity}
            type="text"
            placeholder="e.g. 10kg or 20 portions"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00705c]"
          />
          {errors.quantity && (
            <p className="text-sm text-red-500 mt-1">Quantity is required</p>
          )}
        </div>

        {/* Pickup Time */}
        <div>
          <label>Pickup Time </label>
          <div className="flex gap-2">
            <input
              {...register("pickupStart", { required: true })}
              type="time"
              name="pickupStart"
              defaultValue={donation?.pickupStart}
              required
            />
            <span>to</span>
            <input
              {...register("pickupEnd", { required: true })}
              type="time"
              name="pickupEnd"
              defaultValue={donation?.pickupEnd}
              required
            />
          </div>

          {errors.pickupEnd ||
            (errors.pickupStart && (
              <p className="text-sm text-red-500 mt-1">
                Pickup time window is required
              </p>
            ))}
        </div>

        {/* Restaurant Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-base-content">
              Restaurant Name
            </label>
            <input
              value={user?.displayName || ""}
              {...register("name", { required: true })}
              defaultValue={donation?.name}
              readOnly
              className="w-full mt-1 px-4 py-2 border bg-base-100 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-base-content">
              Restaurant Email
            </label>
            <input
              value={user?.email || ""}
              {...register("email", { required: true })}
              readOnly
              className="w-full mt-1 px-4 py-2 border bg-base-100 rounded-lg"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-base-content">
            Location (Address or Coordinates)
          </label>
          <input
            {...register("location", { required: true })}
            defaultValue={donation?.location}
            type="text"
            placeholder="e.g. 123 Main St or 24.9207, 91.8312"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00705c]"
          />
          {errors.location && (
            <p className="text-sm text-red-500 mt-1">Location is required</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-base-content mb-1">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full text-sm file:py-2 file:px-4 file:border file:rounded-lg file:bg-[#00705c] file:text-white file:cursor-pointer"
            onChange={(e) => handleImage(e.target.files[0])}
          />
          {errors.image && (
            <p className="text-sm text-red-500 mt-1">Image is required</p>
          )}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-3 w-40 h-32 object-cover rounded-lg border"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#00705c] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#005e4e] transition duration-200"
        >
          Update Donation
        </button>
      </form>
    </div>
  );
};

export default UpDateDonation;
