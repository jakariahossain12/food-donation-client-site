import axios from "axios";
import React from "react";
import useAuth from "./useAuth";
import Loading from "../Component/Loading/Loading";

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_API,
});

const useAxiosSecure =  () => {
  const { user, userSignOut, loading } = useAuth();
  if (loading) {
    return <Loading></Loading>
  }
  
  axiosSecure.interceptors.request.use((config) => {
    
    if (user) {
      const token = localStorage.getItem("token");
      config.headers.authorization = `Bearer ${token}`;
    }

    return config
  })

  axiosSecure.interceptors.response.use(res => res, error => {
    if (error.status === 401 || error.status === 403) {
      userSignOut()
        .then(() => {
          localStorage.removeItem('token')
          console.log(`Your logOut because of an error with ${error.status} code`);
        }).catch((error) => { 
        console.log(error);
      })
    }
    return Promise.reject(error)
  })

  return axiosSecure;
};

export default useAxiosSecure;
