import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import GoogleButton from "../../Share/GoogleButton";
import { Link } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, image, email, password } = data;

    // Password validation
    const capitalRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (!capitalRegex.test(password)) {
      toast.error("Password must include at least one capital letter.");
      return;
    }

    if (!specialCharRegex.test(password)) {
      toast.error("Password must include at least one special character.");
      return;
    }

    console.log(data);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-md mx-auto mt-10 p-6   rounded shadow space-y-3">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-medium">Image URL</label>
            <input
              type="file"
              {...register("image", { required: "Image URL is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>

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
          You have already an account Please{" "}
          <Link className="text-blue-500 font-medium" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
