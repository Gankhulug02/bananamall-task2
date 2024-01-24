"use client";
import { ModalContext } from "@/app/context/modelContext";
import React, { useContext, useEffect, useState } from "react";
import ModalContent from "./modalContent";
import { ProductContext } from "@/app/context/productContext";

const TopSection = () => {
  const { setIsModal, setContent } = useContext(ModalContext);
  const { getProducts, setProducts } = useContext(ProductContext);
  const [searchProd, setSearchProd] = useState("");

  const createProductFunction = async () => {
    setIsModal(true);
    setContent(<ModalContent />);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts({ name: searchProd });
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [searchProd]);

  return (
    <div className="flex justify-between w-full ">
      <input
        placeholder="Search Product"
        className="w-[84%] p-2 border-2 rounded-lg border-[#bfbfbf]"
        onChange={(e) => {
          setSearchProd(e.target.value);
        }}
      />
      <button
        className="w-[15%]  bg-primary-light text-white rounded-lg "
        onClick={createProductFunction}
      >
        Create Product +
      </button>
    </div>
  );
};

export default TopSection;
