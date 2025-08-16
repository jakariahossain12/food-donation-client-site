import { useForm } from "react-hook-form";

import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Component/Loading/Loading";
import useAuth from "../../hooks/useAuth";

const MyProfile = () => {
  const [editing, setEditing] = useState(false);

  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["user", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user?.email}`);
      return res.data;
    },
  });

  const { name, image, role } = data;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: name || "",
      image: image || "",
    },
  });

  if (loading || isLoading) {
    return <Loading></Loading>;
  }

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    reset({ name, image });
    setEditing(false);
  };

  const onSubmit = (data) => {
    setEditing(false);
  };

  const showRole = role && role !== "iooo";

  return (
    <div className="w-11/12 mx-auto mt-10 bg-base-100 shadow-lg rounded-2xl p-6">
      <div className="flex flex-col items-center text-center">
        <div className="relative w-28 h-28 mb-4">
          <img
            src={user?.photoURL}
            alt={name}
            className="w-full h-full object-cover rounded-full border-4 border-[#00705c] shadow-md"
          />
        </div>

        {!editing ? (
          <>
            <h2 className="text-2xl font-bold text-[#00705c]">{name}</h2>

            {showRole && (
              <span className="mt-2 inline-block bg-[#fdd65b] text-[#00705c] text-sm font-semibold px-4 py-1 rounded-full shadow-sm">
                {role.charAt(0).toUpperCase() + role.slice(1)} Role
              </span>
            )}

            <button
              onClick={handleEdit}
              className="mt-4 bg-[#fdd65b] hover:bg-yellow-400 text-[#00705c] font-medium px-4 py-1 rounded shadow-sm"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full mt-4 space-y-4"
          >
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-[#00705c]"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="text"
                {...register("image", {
                  required: "Image URL is required",
                  pattern: {
                    value: /^https?:\/\/.+/i,
                    message: "Must be a valid URL",
                  },
                })}
                className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-[#00705c]"
              />
              {errors.image && (
                <p className="text-red-500 text-xs">{errors.image.message}</p>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#00705c] hover:bg-[#005e4e] text-white px-4 py-1 rounded"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
