import React from "react";

const Header = () => {
  const tableColumn = [
    {
      width: "25%",
      headerContent: "Customer",
    },
    { width: "25%", headerContent: "Email" },
    { width: "15%", headerContent: "Amount" },
    { width: "10%", headerContent: "Date" },
    { width: "15%", headerContent: "Status" },
    { width: "10%", headerContent: "" },
  ];
  return (
    <div className="flex justify-between p-3 text-sm font-semibold ">
      {tableColumn.map((e) => {
        return (
          <div style={{ width: e.width }} key={e.headerContent}>
            <span>{e.headerContent}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Header;
