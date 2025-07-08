import axios from 'axios';
import React from 'react';

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_API
});

const useAxiosSecure = () => {

    return axiosSecure
};

export default useAxiosSecure;