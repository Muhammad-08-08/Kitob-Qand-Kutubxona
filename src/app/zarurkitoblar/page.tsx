"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import useMyStore from "@/store/my-store";

const ZarurKitoblar: React.FC = () => {
  type ZarurKitob = {
    busies: number;
    name: string;
    total: number;
  };

  const { isDarkMode } = useMyStore();
  const [zarurkitoblar, setZarurkitoblar] = useState<ZarurKitob[]>([]);

  useEffect(() => {
    axios.get("https://library.softly.uz/api/app/stats").then((response) => {
      const oddiyArray = Array.isArray(response.data.few_books[0])
        ? response.data.few_books.flat()
        : response.data.few_books;

      setZarurkitoblar(oddiyArray);
    });
  }, []);

  return (
    <div
      className={`relative z-0 container mx-auto xl:px-24 p-4 transition-colors duration-300 ${
        isDarkMode
          ? "bg-[#1E1E1E] text-[#EDEDED]"
          : "bg-[#fff] text-[#5B2C25]"
      }`}
    >
      <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
        📚 Zarur Kitoblar
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {zarurkitoblar.map((item, index) => (
          <div
            key={index}
            className={`p-3 md:p-4 rounded-xl shadow-md transition-all duration-300 cursor-pointer transform hover:scale-105 ${
              isDarkMode
                ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                : "bg-[#f0e7e4] text-[#5B2C25] hover:bg-[#ebddd9]"
            }`}
          >
            <p className="font-bold text-sm md:text-lg mb-2">
              {index + 1}. {item.name}
            </p>
            <div className="flex justify-between text-xs md:text-sm">
              <span>📖 Umumiy: {item.total} ta</span>
              <span>🔒 Band: {item.busies} ta</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ZarurKitoblar;
