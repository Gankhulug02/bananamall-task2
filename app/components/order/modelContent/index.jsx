"use client";
import { ModalContext } from "@/app/context/modelContext";
import { OrderContext } from "@/app/context/orderContext";
import { ProductContext } from "@/app/context/productContext";
import React, { useContext, useEffect, useState } from "react";

const OrderModelContent = ({ data }) => {
  const { createOrder, editOrder } = useContext(OrderContext);
  const { products } = useContext(ProductContext);
  const { setIsModal, setIsLoader } = useContext(ModalContext);
  const [inputData, setInputData] = useState(
    data?.edit === true
      ? { ...data }
      : { status: "pending", amount: 0, total: 0 }
  );

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
          disabled
          readOnly
          value={inputData?.amount}
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
          type="number"
          value={inputData?.total}
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
          value={inputData?.status}
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
          value={inputData.product_id}
          onChange={(e) => {
            products.map((product) => {
              if (e.target.value == product.id) {
                setInputData({
                  ...inputData,
                  amount: product.Price,
                  product_id: product.id,
                });
              }
            });
          }}
        >
          <option value="">Choose Product</option>
          {products.map((product) => (
            <option value={product.id} key={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      <button
        className="bg-primary-light rounded-lg p-2 text-white"
        onClick={async () => {
          if (!inputData.amount || !inputData.total || !inputData.product_id) {
            alert("Error");
          } else {
            setIsLoader(true);

            if (data?.edit === true) {
              const response = await editOrder({
                data: {
                  id: data.id,
                  status: inputData.status,
                  amount: inputData.amount,
                  total: inputData.total,
                  product_id: inputData.product_id,
                },
              });

              console.log(response);

              setIsLoader(false);
              setIsModal(false);
            } else {
              const response = await createOrder({
                data: {
                  status: inputData.status,
                  amount: inputData.amount,
                  total: inputData.total,
                  product_id: inputData.product_id,
                },
              });
              setIsLoader(false);
              setIsModal(false);
            }
          }
        }}
      >
        {data?.edit === true ? "Edit Invoice" : "Create Invoice"}
      </button>
    </div>
  );
};

export default OrderModelContent;
