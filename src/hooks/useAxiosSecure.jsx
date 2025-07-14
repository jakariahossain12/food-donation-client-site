import axios from "axios";
import React from "react";
import useAuth from "./useAuth";

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_API,
});

const useAxiosSecure = () => {
  const { userSignOut } = useAuth();
  const token = localStorage.getItem("token");
  
  axiosSecure.interceptors.request.use((config) => {
    
    config.headers.Authorization= `Bearer ${token}`

    return config
  })

  axiosSecure.interceptors.response.use(res => res, error => {
    if (error.status === 401 || error.status === 403) {
      userSignOut()
        .then(() => {
        console.log(`Your logOut because of an error with ${error.status} code`);
        }).catch(() => {
        
      })
    }
    return Promise.reject(error)
  })

  return axiosSecure;
};

export default useAxiosSecure;
