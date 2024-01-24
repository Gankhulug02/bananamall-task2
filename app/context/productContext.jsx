"use client";
import React, { useState } from "react";
import { createContext } from "react";
import { BASE_URL } from "@/variables";
import axios from "axios";

export const ProductContext = createContext({});

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const instance = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 5000,
  });

  const createProduct = async ({ price, name }) => {
    try {
      const response = await instance.post("/api/products", {
        price: parseInt(price),
        name,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  };

  const getProducts = async ({ name }) => {
    console.log();
    try {
      const response = await instance.post("/api/product", {
        name,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  };

  return (
    <ProductContext.Provider
      value={{ createProduct, getProducts, products, setProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
