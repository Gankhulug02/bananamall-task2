import Link from "next/link";
import React from "react";

const Navbar = () => {
  const items = [
    { href: "/", content: "Нүүр" },
    { href: "order", content: "Захиалга" },
    { href: "product", content: "Бүтээгдэхүүн" },
  ];
  return (
    <div className="flex gap-4 w-full h-[50px] px-4 py-2 border-b-2">
      {items.map((e) => {
        return (
          <Link key={e.content} href={e.href}>
            <span className="font-semibold hover:text-[#aaaaaa]">
              {e.content}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default Navbar;
