import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router";
import GoogleButton from "../../Share/GoogleButton";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { userLogin } = useAuth(); // You can use this to redirect if already logged in
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    console.log(email, password);
    userLogin(email, password)
      .then(() => {
        toast.success("login successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="h-screen flex items-center justify-center">
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
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-[#005e4e] text-white py-2 rounded"
          >
            Register
          </button>
        </form>
        <GoogleButton></GoogleButton>
        <p>
          You have don't an account Please{" "}
          <Link className="text-blue-500 font-medium" to={"/register"}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
