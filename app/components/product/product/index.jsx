import Image from "next/image";
import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenAlt } from "@fortawesome/free-solid-svg-icons";
import { ProductContext } from "@/app/context/productContext";
import { ModalContext } from "@/app/context/modelContext";
import ModalContent from "../modalContent";

const OneProduct = ({ image_url, name, price, index, productId }) => {
  const { setProducts, products, deleteProduct } = useContext(ProductContext);
  const { setIsLoader, setIsModal, setContent } = useContext(ModalContext);

  return (
    <div
      className="w-[250px] h-[280px] overflow-hidden rounded-md hover:shadow-[0_0px_20px_0px_rgba(100,100,100,0.75)]"
      key={index}
    >
      {/* deed zuragtai heseg */}
      <div className="w-full h-[70%] rounded-md overflow-hidden">
        <Image
          width="250"
          height="200"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          src={
            image_url ||
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={image_url || "alt"}
        />
      </div>
      {/* dood taliin tailbar heseg */}
      <div className="flex flex-col h-[30%] gap-3 text-sm font-medium p-2">
        <div className="flex justify-between">
          <p className="truncate">{name}</p>
          <button
            className="text-gray-600"
            onClick={() => {
              setIsModal(true);
              setContent(
                <ModalContent data={{ name, price, productId, edit: true }} />
              );
            }}
          >
            <FontAwesomeIcon icon={faPenAlt} />
          </button>
        </div>
        <div className="flex justify-between">
          <p className="text-[#545454] font-bold">${price}</p>
          <button
            className="text-red-500"
            onClick={async () => {
              setIsLoader(true);
              try {
                const response = await deleteProduct({ productId: productId });
                if (response.code === 200) {
                  alert("Амжилттай устлаа");
                }
              } catch (error) {
                console.error("Error fetching products:", error);
              } finally {
                setIsLoader(false);
              }
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OneProduct;
