import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Component/Loading/Loading";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const ManageUsersTable = () => {
  const [selectedRole, setSelectedRole] = useState({});
  const axiosSecure = useAxiosSecure();
  const { loading, user } = useAuth();
  
  

  const {
    isLoading,
    data: users = [],
    refetch,
  } = useQuery({
    queryKey: ["allUsers",user.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-user");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (updata) => {
      const res = await axiosSecure.patch(`/user`, updata);
      refetch();
      return res.data;
    },
  });

  const mutationDelete = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/user?id=${id}`);
      refetch();
      toast.success("User deleted successfully");
      return res.data;
    },
  });

  const mutationDeleteFirebaseUser = useMutation({
    mutationFn: async (uid) => {
      const res = await axiosSecure.delete(`/delete-user/${uid}`);
      return res.data;
    },
  });

  if (isLoading || loading) {
    return <Loading></Loading>;
  }

  const handleUpdateRole = (id, value) => {
    if (value === "charity" || value === "restaurant" || value === "admin") {
      mutation.mutate({ id, value });
      toast.success(`user role update successfully,${value}`);
    } else {
      toast.warning("select role");
    }
  };

  const handleDelete = async (id, uid) => {
    
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00705c",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete user!",
    });

    if (result.isConfirmed) {
      mutationDelete.mutate(id);
      mutationDeleteFirebaseUser.mutate(uid)
    }
  };

  const handleSelectChange = (id, value) => {
    setSelectedRole((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra rounded-lg shadow-md border">
        <thead className="bg-[#00705c] text-white">
          <tr className=" text-left">
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Role</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr
              key={user._id}
              className="border-t hover:bg-base-200 transition duration-200"
            >
              <td className="py-3 px-4">{user?.name}</td>
              <td className="py-3 px-4">{user?.email}</td>
              <td className="py-3 px-4 capitalize text-sm font-semibold">
                {user?.role}
              </td>
              <td className="py-3 px-4 flex flex-col md:flex-row gap-2 items-start md:items-center">
                <select
                  value={selectedRole[user._id] || ""}
                  onChange={(e) => handleSelectChange(user._id, e.target.value)}
                  className="border bg-base-200 rounded px-2 py-1 text-sm"
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="charity">Charity</option>
                </select>

                <button
                  onClick={() =>
                    handleUpdateRole(user?._id, selectedRole[user?._id])
                  }
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm rounded flex items-center gap-1"
                >
                  <FaUserShield />
                  Update role
                </button>

                <button
                  onClick={() => handleDelete(user?._id, user?.uid)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded flex items-center gap-1"
                >
                  <FaTrashAlt />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsersTable;
