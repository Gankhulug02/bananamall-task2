"use client";
import React, { useState } from "react";
import { createContext } from "react";
import { BASE_URL } from "@/variables";
import axios from "axios";

export const OrderContext = createContext({});

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const instance = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 5000,
  });

  const getOrders = async () => {
    try {
      const response = await instance.get("/api/order");
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  };

  const createOrder = async ({ data }) => {
    try {
      const response = await instance.post("/api/order", {
        ...data,
        customer_id: "03ab7eea-953f-4787-8ef8-c85abb72793e",
        product_id: "06bbd4fc-26d5-49c6-a922-66942217da39",
      });

      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    } finally {
      const orders = await getOrders();
      setOrders(orders);
    }
  };

  //   const editProduct = async ({ price, name, productId }) => {
  //     try {
  //       const response = await instance.put("/api/product", {
  //         productId,
  //         updatedData: {
  //           Price: parseInt(price),
  //           name,
  //         },
  //       });

  //       return response.data;
  //     } catch (error) {
  //       console.error("Error creating product:", error);
  //       throw error;
  //     } finally {
  //       const products = await getProducts({ name: "" });
  //       setProducts(products);
  //     }
  //   };

  const deleteOrder = async ({ order_id }) => {
    try {
      const response = await fetch("/api/order", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order_id }),
      });

      if (!response.ok) {
        throw new Error(`Error deleting order: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    } finally {
      const orders = await getOrders();
      setOrders(orders);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        createOrder,
        deleteOrder,
        getOrders,
        orders,
        setOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
