"use client";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { BASE_URL } from "@/variables";
import axios from "axios";

export const OrderContext = createContext({});

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const instance = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 50000,
  });

  useEffect(() => {
    const fetchdata = async () => {
      const orders = await getOrders();
      setOrders(orders);
    };
    fetchdata();
  }, []);

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
        customer_id: "41be0d01-66e6-45ad-9b5f-18289d6a2ef3",
      });

      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    } finally {
      const orders = await getOrders();
      setOrders(orders);
    }
  };

  const editOrder = async ({ data }) => {
    try {
      const response = await instance.put("/api/order", {
        order_id: data.id,
        updatedData: {
          ...data,
        },
      });

      return response;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    } finally {
      const orders = await getOrders();
      setOrders(orders);
    }
  };

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
        editOrder,
        setOrders,
        orders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
