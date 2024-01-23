import Image from "next/image";
import React from "react";

const OneProduct = ({ img, name, price, index }) => {
  return (
    <div
      className="w-[250px] h-[280px] overflow-hidden rounded-md hover:shadow-[0_0px_20px_0px_rgba(100,100,100,0.75)]"
      key={index}
    >
      {/* deed zuragtai heseg */}
      <div className="w-full h-[70%] bg-green-600 rounded-md overflow-hidden">
        <Image
          width="250"
          height="200"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          src={
            img ||
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={
            img ||
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
      </div>
      {/* dood taliin tailbar heseg */}
      <div className="flex flex-col h-[30%] gap-3 text-sm font-medium p-2">
        <p className="truncate">{name}</p>
        <p className="text-[#545454] font-bold">${price}</p>
      </div>
    </div>
  );
};

export default OneProduct;
