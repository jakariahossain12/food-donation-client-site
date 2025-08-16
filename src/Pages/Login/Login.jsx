import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

import { Link, useLocation, useNavigate } from "react-router";
import GoogleButton from "../../Share/GoogleButton";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Navbar from "../../Component/Navbar/Navbar";

const Login = () => {
  const { userLogin } = useAuth(); // You can use this to redirect if already logged in
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // use tanstack query for post data
  const mutation = useMutation({
    mutationFn: async (userData) => {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_API}/user`,
        userData
      );
      return res.data;
    },
  });

  const onSubmit = async ({ email, password }) => {
    userLogin(email, password)
      .then(() => {
        toast.success('login successfully')
        navigate(location?.state || "/");
        mutation.mutate({email})
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="h-screen bg-base-200 flex items-center justify-center">
        <div className="w-md mx-auto mt-10 p-6 space-y-3  rounded shadow">
          <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full p-2 border rounded"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block font-medium">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full p-2 border rounded"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#00705C] hover:bg-[#005e4e] text-white py-2 rounded"
            >
              Login
            </button>
          </form>
          <GoogleButton></GoogleButton>
          <p>
            You have don't an account Please{" "}
            <Link
              state={location?.state}
              className="text-blue-500 font-medium"
              to={"/register"}
            >
              Sign Up
            </Link>
          </p>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
