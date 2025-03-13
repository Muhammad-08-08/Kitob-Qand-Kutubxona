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
      console.log(response.data.few_books);

      const oddiyArray = Array.isArray(response.data.few_books[0])
        ? response.data.few_books.flat()
        : response.data.few_books;

      setZarurkitoblar(oddiyArray);
    });
  }, []);

  return (
    <div
      className={`container mx-auto xl:px-10 p-4 ${
        isDarkMode
          ? "bg-[#1E1E1E] text-[#EDEDED]"
          : "bg-[#FDF7F5] text-[#5B2C25]"
      }`}
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        📚 Zarur (yetishmayotgan) kitoblar
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {zarurkitoblar.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 shadow-md p-3"
          >
            <p className="font-bold text-lg">
              {index + 1}. {item.name}
            </p>
            <div className="flex justify-between mt-2">
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
