import React, { useState, useEffect } from "react";

import {
  createUserWithEmailAndPassword,
  deleteUser,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";


import { auth } from "../Firebase/firebase.config";
import { AuthContext } from "../Context/Context";
import axios from "axios";


const AuthProvider = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const userSignUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userSignUpWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userUpdateProfile = (upDateInfo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, upDateInfo);
  };

  const userSignOut = () => {
    setLoading(true);
    localStorage.removeItem("token");
    return signOut(auth);
  };

  const deleteUserFirebase = () => {
    setLoading(true)
    return deleteUser(auth.currentUser)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload();
        setUser(currentUser);
        
        axios
          .post(`${import.meta.env.VITE_SERVER_BASE_API}/jwt-token`, {
            email: currentUser?.email,
          })
          .then((res) => {
            const token = res.data.token;
            localStorage.setItem("token", token);
          })
          .catch(() => {});
       
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const userInfo = {
    user,
    loading,
    userSignUp,
    userLogin,
    userUpdateProfile,
    userSignOut,
    deleteUserFirebase,
    userSignUpWithGoogle,
  };

  return <AuthContext value={userInfo}> {children} </AuthContext>;
};

export default AuthProvider;
