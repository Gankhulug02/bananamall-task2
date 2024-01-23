"use client";
import { ModalContext } from "@/app/context/modelContext";
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import OneProduct from "../product/product";

const Modal = () => {
  const { setIsModal, width, height, content } = useContext(ModalContext);

  const boxStyle = {
    position: "fixed",
    maxWidth: width,
    maxHeight: height,
    minWidth: "50px",
    minHeight: "50px",
    boxShadow: "0px 3px 28px 1px rgba(100,100,100,0.74)",
    borderRadius: "10px",
    backgroundColor: "white",
    overflow: "hidden",
  };

  return (
    <div className="flex items-center justify-center absolute w-full h-screen top-0 left-0">
      <div style={boxStyle}>
        <button
          onClick={() => {
            setIsModal(false);
          }}
          style={{ position: "absolute", right: "15px", top: "10px" }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        {content}
      </div>
    </div>
  );
};

export default Modal;
