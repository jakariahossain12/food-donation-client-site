import React from 'react';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const GoogleButton = () => {
  const { userSignUpWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleSubmit = () => {
    userSignUpWithGoogle()
      .then((res) => {
        toast.success("account create successfully");
        navigate(location?.state||"/");
        const userData = {
          name: res.user.displayName,
          email: res.user.email,
          imageUrl: res.user.photoURL,
          uid: res?.user?.uid,
          role: "user",
          create_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        };

        mutation.mutate(userData);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div>
      <button
        onClick={handleSubmit}
        className="btn w-full bg-white text-black border-[#e5e5e5]"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default GoogleButton;