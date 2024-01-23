import React from "react";
import SearchSection from "../components/order/searchSection";

const Order = () => {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[1100px] min-h-screen  p-8">
      <SearchSection />
    </div>
  );
};

export default Order;
