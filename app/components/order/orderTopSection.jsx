"use client";
import { ModalContext } from "@/app/context/modelContext";
import React, { useContext, useEffect, useState } from "react";
import OrderModelContent from "./modelContent";

const OrderTopSection = () => {
  const [searchInv, setSearchInv] = useState("");
  const { setIsModal, setContent } = useContext(ModalContext);

  return (
    <div className="flex justify-between w-full ">
      <input
        placeholder="Search invoices"
        className="w-[84%] p-2 border-2 rounded-lg border-[#bfbfbf]"
        onChange={(e) => {
          setSearchInv(e.target.value);
        }}
      />
      <button
        className="w-[15%]  bg-primary-light text-white rounded-lg"
        onClick={() => {
          setIsModal(true);
          setContent(<OrderModelContent />);
        }}
      >
        Create invoices +
      </button>
    </div>
  );
};

export default OrderTopSection;
