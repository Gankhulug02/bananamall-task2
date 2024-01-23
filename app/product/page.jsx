"use client";
import React, { useContext } from "react";
import OneProduct from "../components/product/product";
import Modal from "../components/modal";
import { ModalContext } from "../context/modelContext";
import TopSection from "../components/product/topSection";

const Product = () => {
  const array = [1, 2, 3, 4];
  const { isModal, setIsModal } = useContext(ModalContext);

  return (
    <div className="flex flex-col items-center gap-10 min-w-[1100px] min-h-screen p-8">
      <TopSection />
      <div className="flex flex-wrap justify-center gap-6">
        {array.map((e, index) => (
          <div key={index}>
            <OneProduct index={index} />
          </div>
        ))}
      </div>
      {isModal === true ? <Modal /> : <></>}
    </div>
  );
};

export default Product;
