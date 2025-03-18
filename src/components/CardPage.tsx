"use client";

import Image from "next/image";
import { CardPageType } from "./Type.User";
import useMyStore from "@/store/my-store";

const CardPage: React.FC<CardPageType> = ({ item }) => {
  const isDarkMode = useMyStore((state) => state.isDarkMode);
  const lightText = "text-[#5B2C25]";
  const darkText = "text-[#FDF7F5]";

  const allBusy = item.stocks.every((stock) => stock.busy);

  return (
    <div
      className={`w-full sm:max-w-[250px] p-3 rounded-lg border shadow-md transition-all duration-300 ${
        isDarkMode
          ? "bg-[#1E1E1E] text-[#FDF7F5] border border-gray-800"
          : "border-[#A06A5A] bg-[#FDF7F5] text-[#5B2C25]"
      }`}
    >
      <div className="w-full h-[150px] sm:h-[200px] flex justify-center items-center overflow-hidden bg-white rounded-md">
        <Image
          src={item.image || "no image"}
          alt={item.name || "no image"}
          width={0}
          height={0}
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <h3
          className={`text-base sm:text-lg font-bold truncate h-8 ${
            isDarkMode ? darkText : lightText
          }`}
        >
          {item.name}
        </h3>
        <p
          className={`text-xs sm:text-sm h-8 mb-2 ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {item.author?.name}
        </p>

        <button
          className={`px-6 sm:px-10 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-300 ${
            isDarkMode
              ? "bg-[#252525] text-[#FDF7F5]"
              : allBusy
              ? "bg-[#773000] text-white"
              : "bg-[#f1c1a0]"
          }`}
        >
          {allBusy ? "Band" : "Bo'sh"}
        </button>
      </div>
    </div>
  );
};

export default CardPage;
