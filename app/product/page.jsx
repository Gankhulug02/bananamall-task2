"use client";
import React, { useContext, useEffect, useState } from "react";
import OneProduct from "../components/product/product";
import Modal from "../components/modal";
import { ModalContext } from "../context/modelContext";
import TopSection from "../components/product/topSection";
import { BASE_URL } from "@/variables";
import { ProductContext } from "../context/productContext";

const Product = () => {
  const { isModal } = useContext(ModalContext);
  const { setProducts, products } = useContext(ProductContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col items-center gap-10 min-w-[1100px] min-h-screen p-8">
      <TopSection />
      <div className="flex flex-wrap justify-center gap-6">
        {products.map((e, index) => {
          return (
            <div key={index}>
              <OneProduct
                index={index}
                name={e.name}
                image_url={e.image_url}
                price={e.Price}
              />
            </div>
          );
        })}
      </div>
      {isModal === true ? <Modal /> : <></>}
    </div>
  );
};

export default Product;
