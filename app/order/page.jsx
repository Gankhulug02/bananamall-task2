import React from "react";
import SearchSection from "../components/order/searchSection";
import Table from "../components/order/table";

const Order = () => {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[1100px] min-h-screen  p-8">
      <SearchSection />
      <Table />
    </div>
  );
};

export default Order;
