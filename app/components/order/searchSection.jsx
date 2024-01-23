"use client";
import React, { useEffect, useState } from "react";

const SearchSection = () => {
  const [searchInv, setSearchInv] = useState("");

  useEffect(() => {}, [searchInv]);
  return (
    <div className="flex justify-between w-full ">
      <input
        placeholder="Search invoices"
        className="w-[84%] p-2 border-2 rounded-lg border-[#bfbfbf]"
        onChange={(e) => {
          setSearchInv(e.target.value);
        }}
      />
      <button className="w-[15%]  bg-primary-light text-white rounded-lg ">
        Create invoices +
      </button>
    </div>
  );
};

export default SearchSection;
