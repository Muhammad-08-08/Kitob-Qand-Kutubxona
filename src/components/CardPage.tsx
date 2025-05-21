"use client";

import Image from "next/image";
import { CardPageType } from "./Type.User";
import useMyStore from "@/store/my-store";
import { Skeleton } from "./ui/skeleton";

const CardPage: React.FC<CardPageType> = ({ item, isLoading }) => {
  const isDarkMode = useMyStore((state) => state.isDarkMode);

  if (isLoading) {
    return (
      <div
        className={`w-full sm:max-w-[250px] p-3 rounded-lg border shadow-md ${
          isDarkMode
            ? "bg-[#1E1E1E] border-gray-800"
            : "bg-[#FDF7F5] border-[#A06A5A]"
        }`}
      >
        <Skeleton className="w-full h-[150px] sm:h-[200px] rounded-md" />
        <div className="mt-3 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-8 w-full mt-4" />
        </div>
      </div>
    );
  }

  const allBusy = item.stocks.every((stock) => stock.busy);

  return (
    <div
      className={`w-full sm:max-w-[250px] p-3 rounded-lg border shadow-md transition-all duration-300 hover:shadow-lg ${
        isDarkMode
          ? "bg-[#1E1E1E] text-[#FDF7F5] border-gray-800 hover:border-gray-700"
          : "border-[#A06A5A] bg-[#FDF7F5] text-[#5B2C25] hover:bg-[#f8efec]"
      }`}
    >
      <div className="w-full h-[150px] sm:h-[200px] flex justify-center items-center overflow-hidden bg-white rounded-md">
        <Image
          src={
            item.image && item.image !== ""
              ? item.image
              : "https://telegra.ph/file/ee79afc5d58364c4ff64f.jpg"
          }
          alt={item.name || "Book cover"}
          width={200}
          height={300}
          className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <h3
          className={`text-base sm:text-lg font-bold truncate md:h-8 ${
            isDarkMode ? "text-[#FDF7F5]" : "text-[#5B2C25]"
          }`}
        >
          {item.name}
        </h3>
        <p
          className={`text-xs truncate sm:text-sm md:h-8 md:mb-2 ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {item.author?.name}
        </p>

        <button
          className={`px-6 sm:px-10 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-300 ${
            isDarkMode
              ? allBusy
                ? "bg-red-900/50 text-red-100"
                : "bg-green-900/50 text-green-100"
              : allBusy
              ? "bg-[#773000] text-white"
              : "bg-[#f1c1a0] hover:bg-[#e9b191]"
          }`}
          aria-label={allBusy ? "Kitob band" : "Kitob bo'sh"}
        >
          {allBusy ? "Band" : "Bo'sh"}
        </button>
      </div>
    </div>
  );
};

export default CardPage;
