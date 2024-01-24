"use client";
import React, { useContext } from "react";
import Table from "../components/order/table";
import { ModalContext } from "../context/modelContext";
import Modal from "../components/modal";
import Loader from "../components/loader";
import OrderTopSection from "../components/order/orderTopSection";
import Dashboard from "../components/order/dashboard";

const Order = () => {
  const { isModal, isLoader, setIsLoader } = useContext(ModalContext);

  return (
    <div className="flex flex-col items-center gap-2 min-w-[1100px] min-h-screen  p-8">
      <OrderTopSection />
      <Table />
      <Dashboard />
      {isModal === true ? <Modal /> : <></>}
      {isLoader === true ? <Loader /> : <></>}
    </div>
  );
};

export default Order;
