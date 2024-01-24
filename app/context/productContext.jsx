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

  const getProducts = async ({ name }) => {
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
    } finally {
      const products = await getProducts({ name: "" });
      setProducts(products);
    }
  };

  const editProduct = async ({ price, name, productId }) => {
    try {
      const response = await instance.put("/api/product", {
        productId,
        updatedData: {
          Price: parseInt(price),
          name,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    } finally {
      const products = await getProducts({ name: "" });
      setProducts(products);
    }
  };

  const deleteProduct = async ({ productId }) => {
    try {
      const response = await fetch("/api/product", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers if needed
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error(`Error deleting product: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    } finally {
      const products = await getProducts({ name: "" });
      setProducts(products);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        createProduct,
        editProduct,
        getProducts,
        products,
        setProducts,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
