"use client";
import React, { useState } from "react";
import SignIn from "./signIn";
import SignUp from "./signUp";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  return (
    <div className="flex justify-center items-center w-full h-screen bg-blue-100">
      <div className="w-[450px]">
        {isSignIn ? (
          <SignIn setIsSignIn={setIsSignIn} />
        ) : (
          <SignUp setIsSignIn={setIsSignIn} />
        )}
      </div>
    </div>
  );
};

export default Login;
