"use client";

import Image from "next/image";
import useMyStore from "@/store/my-store";
import { CardPageType } from "./Type.User";

const CardPage: React.FC<CardPageType> = ({ item }) => {
  const isDarkMode = useMyStore((state) => state.isDarkMode);
  const lightText = "text-[#5B2C25]";
  const darkText = "text-[#FDF7F5]";

  const allBusy = item.stocks.every((stock) => stock.busy);

  return (
    <div
      className={`max-w-[250px] p-3 rounded-lg border shadow-md ${
        isDarkMode
          ? "border-[#1E1E1E] bg-[#1E1E1E] text-[#FDF7F5]"
          : "border-[#A06A5A] bg-[#FDF7F5] text-[#5B2C25]"
      }`}
    >
      <div className="w-full h-[150px] flex justify-center items-center overflow-hidden bg-white rounded-md">
        <Image
          src={item.image}
          alt={item.name}
          width={200}
          height={200}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <h3
          className={`text-lg font-bold h-10 mb-2 ${
            isDarkMode ? darkText : lightText
          }`}
        >
          {item.name.slice(0, 20)}...
        </h3>
        <p
          className={`text-sm h-10 ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {item.author?.name}
        </p>

        <button
          className={`mt-3 w-full py-2 text-lg rounded-md font-semibold ${
            isDarkMode
              ? "bg-[#252525] text-[#FDF7F5]"
              : allBusy
              ? "bg-orange-500 text-white"
              : "bg-[#A06A5A] text-white"
          }`}
        >
          {allBusy ? "Band" : "Bo'sh"}
        </button>
      </div>
    </div>
  );
};

export default CardPage;
