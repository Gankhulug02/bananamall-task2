"use clients";
import React, { useContext, useState } from "react";
import OneProduct from "../product";
import { ProductContext } from "@/app/context/productContext";
import { ModalContext } from "@/app/context/modelContext";

const ModalContent = ({ data }) => {
  const [name, setName] = useState(data?.name || "");
  const [price, setPrice] = useState(data?.price || 0);
  const { createProduct, editProduct } = useContext(ProductContext);
  const { setIsModal, setIsLoader } = useContext(ModalContext);

  return (
    <div className="flex flex-col gap-10 items-center p-5 h-full w-full">
      <OneProduct img="" name={name} price={price} />
      <div className="flex flex-col gap-4 ">
        {/* title input */}
        <div className="flex gap-4 justify-between">
          <span>Тайлбар:</span>
          <input
            className="border-2 rounded-sm ps-2"
            placeholder="Бүтээгдэхүүний тайлбар"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        {/* price input */}
        <div className="flex gap-4 justify-between">
          <span>Үнэ:</span>
          <input
            className="border-2 rounded-sm ps-2"
            placeholder="0"
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        {/* create button */}
        {data?.edit === false ? (
          <button
            className="bg-primary-light text-white p-2 rounded-lg"
            onClick={async () => {
              if (!name || !price) {
                alert("Тайлбар болон үнэ заавал оруулна уу!!!");
              } else {
                setIsLoader(true);
                const response = await createProduct({ price, name });
                if (response.status === 201) {
                  alert("Succesfully created");
                  setIsModal(false);
                } else {
                  alert("error");
                }
                setIsLoader(false);
              }
            }}
          >
            Create product
          </button>
        ) : (
          <button
            className="bg-primary-light text-white p-2 rounded-lg"
            onClick={async () => {
              if (!name || !price) {
                alert("Тайлбар болон үнэ заавал оруулна уу!!!");
              } else {
                setIsLoader(true);
                const response = await editProduct({
                  price,
                  name,
                  productId: data?.productId,
                });
                if (response?.id) {
                  alert("Succesfully Edited");
                  setIsModal(false);
                } else {
                  alert("error");
                }
                setIsLoader(false);
              }
            }}
          >
            Edit product
          </button>
        )}
      </div>
    </div>
  );
};

export default ModalContent;
