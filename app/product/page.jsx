"use client";
import React, { useContext, useEffect, useState } from "react";
import OneProduct from "../components/product/product";
import Modal from "../components/modal";
import { ModalContext } from "../context/modelContext";
import TopSection from "../components/product/topSection";
import { BASE_URL } from "@/variables";
import { ProductContext } from "../context/productContext";
import Loader from "../components/loader";

const Product = () => {
  const { isModal, isLoader, setIsLoader } = useContext(ModalContext);
  const { setProducts, products } = useContext(ProductContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoader(true);
      try {
        const response = await fetch(`${BASE_URL}/api/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoader(false);
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
                productId={e.id}
                image_url={e.image_url}
                price={e.Price}
              />
            </div>
          );
        })}
      </div>
      {isModal === true ? <Modal /> : <></>}
      {isLoader === true ? <Loader /> : <></>}
    </div>
  );
};

export default Product;
