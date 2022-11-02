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
} from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const googleProvider = new GoogleAuthProvider();
  // create user
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sign in
  const userLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // update user profile
  const userProfileUpdate = (userProfile) => {
    return updateProfile(auth.currentUser, userProfile);
  };

  // user sign out
  const userSignOut = () => {
    return signOut(auth);
  };

  // google sign in
  const userGoogleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };
  useEffect(() => {
    const unSubscriber = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unSubscriber();
  }, []);
  const authInfo = {
    user,
    setUser,
    createUser,
    userLogin,
    userGoogleSignIn,
    userProfileUpdate,
    userSignOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
