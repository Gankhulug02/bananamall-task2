"use client";
import React from "react";

const SignUp = ({ setIsSignIn }) => {
  return (
    <div className="w-full flex flex-col gap-4 bg-white rounded-xl p-5">
      {/* title */}
      <div className="flex justify-between ">
        <p className="font-semibold text-2xl text-[#383838]">Sign Up</p>
      </div>
      {/* input section */}
      <div className="flex flex-col gap-3">
        <input
          className="w-full p-2 ps-4 border-2 rounded-lg "
          placeholder="Name"
          name="name"
          onClick={() => {}}
        />
        <input
          className="w-full p-2 ps-4 border-2 rounded-lg "
          placeholder="Email"
          name="email"
          onClick={() => {}}
        />
        <input
          className="w-full p-2 ps-4 border-2 rounded-lg "
          placeholder="Password"
          name="password"
          onClick={() => {}}
        />

        <input
          className="w-full p-2 ps-4 border-2 rounded-lg "
          placeholder="Confirm Password"
          name="re-Password"
          onClick={() => {}}
        />
      </div>
      {/*Sign In Button */}
      <button className="rounded-lg bg-primary-light p-2 text-white">
        Sign Up
      </button>
      <div className="flex justify-center gap-2">
        <span>Already a member?</span>
        <button
          className="text-primary-light"
          onClick={() => {
            setIsSignIn(true);
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignUp;
