"use client";
import { ModalContext } from "@/app/context/modelContext";
import { OrderContext } from "@/app/context/orderContext";
import React, { useContext, useEffect, useState } from "react";

const OrderModelContent = () => {
  const { createOrder } = useContext(OrderContext);
  const { setIsModal, setIsLoader } = useContext(ModalContext);
  const [inputData, setInputData] = useState({ status: "pending" });

  const inputHandler = ({ name, value }) => {
    setInputData({ ...inputData, [name]: value });
  };

  return (
    <div className="flex flex-col gap-4 p-8 pt-16 w-[300px]">
      <div className="flex justify-between">
        <p>Amount</p>
        <input
          className="border-2 rounded-md p-2 w-[150px]"
          name="amount"
          onChange={(e) => {
            inputHandler({ name: e.target.name, value: e.target.value });
          }}
        />
      </div>
      <div className="flex justify-between">
        <p>Total</p>
        <input
          className="border-2 rounded-md p-2 w-[150px]"
          name="total"
          onChange={(e) => {
            inputHandler({ name: e.target.name, value: e.target.value });
          }}
        />
      </div>
      <div className="flex justify-between">
        <p>Status</p>
        <select
          className="border-2 rounded-md p-2 w-[150px]"
          name="status"
          onChange={(e) => {
            inputHandler({ name: e.target.name, value: e.target.value });
          }}
        >
          <option value="pending">pending</option>
          <option value="paid">paid</option>
        </select>
      </div>
      <div className="flex justify-between">
        <p>Product</p>
        <select
          className="border-2 rounded-md p-2 w-[150px]"
          name="product_id"
          onChange={(e) => {
            inputHandler({ name: e.target.name, value: e.target.value });
          }}
        >
          <option value="">ChooseProduct</option>
        </select>
      </div>
      <button
        className="bg-primary-light rounded-lg p-2 text-white"
        onClick={async () => {
          if (!inputData.amount || !inputData.total) {
            alert("Error");
          } else {
            setIsLoader(true);
            const response = await createOrder({ data: inputData });
            console.log(response);
            setIsLoader(false);
            setIsModal(false);
          }
        }}
      >
        Create Invoice
      </button>
    </div>
  );
};

export default OrderModelContent;
