import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faCheck,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const Row = () => {
  const data = [
    {
      customer: {
        id: "",
        name: "Delba de Oliveria",
        email: "delba@oliveria.com",
        image_url:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      amount: 89.45,
      date: "Oct 4, 2023",
      status: "paid",
    },
    {
      customer: {
        id: "",
        name: "Steven Tey",
        email: "steven@tey.com",
        image_url:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
      },
      amount: 89.45,
      date: "Oct 4, 2023",
      status: "pending",
    },
    {
      customer: {
        id: "",
        name: "Lee Robinson",
        email: "lee@robinson.com",
        image_url:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
      },
      amount: 89.45,
      date: "Oct 4, 2023",
      status: "pending",
    },
    {
      customer: {
        id: "",
        name: "Evil Rabbit",
        email: "evil@rabbit.com",
        image_url:
          "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
      },
      amount: 89.45,
      date: "Oct 4, 2023",
      status: "paid",
    },
  ];
  return (
    <div className="bg-white overflow-hidden rounded-lg">
      {data.map((e, index) => {
        return (
          <div
            className="flex justify-between p-3 text-sm border-b-[1px]"
            key={index}
          >
            {/* Customer */}
            <div className="flex gap-2 items-center w-[25%]">
              <div className=" w-[30px] aspect-square rounded-full border-[1px] overflow-hidden">
                <Image
                  className="w-full h-full object-cover"
                  src={e.customer.image_url || ""}
                  href={e.customer.image_url || ""}
                  width="30"
                  height="30"
                />
              </div>
              <p className="truncate">{e.customer.name}</p>
            </div>
            {/* Email */}
            <div className="w-[25%] flex items-center ">
              <span className="truncate">{e.customer.email}</span>
            </div>
            {/* Amount */}
            <div className="w-[15%] flex items-center ">
              <span className="truncate">${e.amount}</span>
            </div>
            {/* Date */}
            <div className="w-[10%] flex items-center ">
              <span className="truncate">${e.date}</span>
            </div>
            {/* Status */}
            <div className="w-[15%]">
              {e.status === "paid" ? (
                <div className="flex gap-2 p-2 rounded-xl bg-green-500 text-white w-fit">
                  <p>Paid</p>
                  <div className="flex items-center w-3">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 p-2 rounded-xl bg-[#e7e7e7] text-[#696969] w-fit">
                  <p>Pending</p>
                  <div className="flex items-center w-3">
                    <FontAwesomeIcon icon={faClock} />
                  </div>
                </div>
              )}
            </div>
            {/* Edit Delete Button */}
            <div className="w-[10%] flex justify-end items-center gap-2 ">
              <button className="px-2 h-full aspect-square  rounded-md border-2">
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button className="px-2 h-full aspect-square  rounded-md border-2">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Row;
