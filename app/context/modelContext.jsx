"use client";
import React, { useState } from "react";
import { createContext } from "react";

export const ModalContext = createContext({});

const ModalProvider = ({ children }) => {
  const [isModal, setIsModal] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [width, setWidth] = useState("fitContent");
  const [height, setHeight] = useState("fitContent");
  const [content, setContent] = useState(<></>);

  return (
    <ModalContext.Provider
      value={{
        isModal,
        setIsModal,
        isLoader,
        setIsLoader,
        height,
        setHeight,
        width,
        setWidth,
        content,
        setContent,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
