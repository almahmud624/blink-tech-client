import React, { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  // create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sign in
  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // update user profile
  const userProfileUpdate = (userProfile) => {
    return updateProfile(auth.currentUser, userProfile);
  };

  // user sign out
  const userSignOut = () => {
    localStorage.removeItem("blink-token");
    return signOut(auth);
  };

  // google sign in
  const userGoogleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // facebook sign in
  const userFacebookSignIn = () => {
    return signInWithPopup(auth, facebookProvider);
  };
  useEffect(() => {
    const unSubscriber = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscriber();
  }, []);
  const authInfo = {
    user,
    setUser,
    createUser,
    userLogin,
    userGoogleSignIn,
    userFacebookSignIn,
    userProfileUpdate,
    userSignOut,
    loading,
    setLoading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
