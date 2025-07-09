import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import GoogleButton from "../../Share/GoogleButton";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import { uploadToImgbb } from "../../Utils/Utils";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { userSignUp, userUpdateProfile } = useAuth();
  const [imageUrl, setImageUrl] = useState(null);

// use tanstack query for post data 
  const mutation = useMutation({
    mutationFn:async (userData) => {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_BASE_API}/user`, userData);
      console.log(res.data);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    const { name, email, password } = data;

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

    userSignUp(email, password)
      .then(async(res) => {
        const upDateInfo = {
          displayName: name,
          photoURL: imageUrl,
        };
        console.log(res);
        userUpdateProfile(upDateInfo)
          .then(() => {})
          .catch(() => {});
        toast.success("account create successfully");
        const userData = {
          name,
          email,
          imageUrl,
          role:'user',
          create_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        };
        mutation.mutate(userData);
        reset()
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handelImage = async (e) => {
    const imageFile = e.target.files[0];
    const image = await uploadToImgbb(imageFile);
    setImageUrl(image);
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
              required
              onChange={handelImage}
              className="w-full p-2 border rounded"
            />
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
      <ToastContainer />
    </div>
  );
};

export default Register;
