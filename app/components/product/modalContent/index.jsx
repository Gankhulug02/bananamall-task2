"use clients";
import React, { useContext, useState } from "react";
import OneProduct from "../product";
import { ProductContext } from "@/app/context/productContext";
import { ModalContext } from "@/app/context/modelContext";

const ModalContent = () => {
  const [name, setName] = useState("Бүтээгдэхүүний тайлбар");
  const [price, setPrice] = useState(0);
  const { createProduct } = useContext(ProductContext);
  const { setIsModal } = useContext(ModalContext);

  return (
    <div className="flex flex-col gap-10 items-center p-5 h-full w-full">
      <OneProduct img="" name={name} price={price} />
      <div className="flex flex-col gap-4 ">
        {/* title input */}
        <div className="flex gap-4 justify-between">
          <span>Тайлбар:</span>
          <input
            placeholder="Бүтээгдэхүүний тайлбар"
            className="border-2 rounded-sm ps-2"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        {/* price input */}
        <div className="flex gap-4 justify-between">
          <span>Үнэ:</span>
          <input
            placeholder="0"
            type="number"
            className="border-2 rounded-sm ps-2"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        {/* create button */}
        <button
          className="bg-primary-light text-white p-2 rounded-lg"
          onClick={async () => {
            if (!name || !price) {
              alert("Тайлбар болон үнэ заавал оруулна уу!!!");
            } else {
              const response = await createProduct({ price, name });
              if (response.status === 201) {
                alert("Succesfully created");
                setIsModal(false);
              } else {
                alert("error");
              }
            }
          }}
        >
          Create product
        </button>
      </div>
    </div>
  );
};

export default ModalContent;
