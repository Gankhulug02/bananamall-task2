"use client";
import React, { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faCheck,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { OrderContext } from "@/app/context/orderContext";
import { ModalContext } from "@/app/context/modelContext";
import OrderModelContent from "../modelContent";

const Row = () => {
  const { orders, getOrders, setOrders, deleteOrder } =
    useContext(OrderContext);
  const { setIsLoader, setIsModal, setContent } = useContext(ModalContext);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoader(true);
      const orders = await getOrders();
      setOrders(orders);
      setIsLoader(false);
    };
    fetchData();
  }, []);
  return (
    <div className="bg-white overflow-hidden rounded-lg">
      {orders
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((e, index) => {
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
                    alt={e.customer.image_url || ""}
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
                <span className="truncate">{e.date}</span>
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
                <button
                  className="px-2 h-full aspect-square  rounded-md border-2"
                  onClick={() => {
                    setIsModal(true);
                    console.log(e);
                    setContent(
                      <OrderModelContent data={{ ...e, edit: true }} />
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button
                  className="px-2 h-full aspect-square  rounded-md border-2"
                  onClick={async () => {
                    setIsLoader(true);
                    try {
                      const response = await deleteOrder({ order_id: e.id });
                      if (response.code === 200) {
                        alert("Амжилттай устлаа");
                      } else {
                        alert("Error");
                      }
                    } catch (error) {
                      console.error("Error deleting order:", error);
                    } finally {
                      setIsLoader(false);
                    }
                  }}
                >
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
