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
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://library.softly.uz/api/app/stats")
      .then((response) => {
        const oddiyArray = Array.isArray(response.data.few_books[0])
          ? response.data.few_books.flat()
          : response.data.few_books;
        setZarurkitoblar(oddiyArray);
      })
      .catch((error) => {
        console.error("Zarur kitoblarni yuklashda xato:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const search = zarurkitoblar.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div
      className={`relative z-0 container mx-auto xl:px-24 p-4 transition-colors duration-300 ${
        isDarkMode ? "bg-[#1E1E1E] text-[#EDEDED]" : "bg-[#fff] text-[#5B2C25]"
      }`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 items-center">
        <h2 className="text-xl md:text-2xl font-bold">📚 Zarur Kitoblar</h2>
        <div className="w-full sm:w-auto">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
            placeholder="Kitob qidirish..."
            className={`w-full px-4 py-2 rounded text-sm sm:text-base border transition-all duration-300 focus:ring-2 ${
              isDarkMode
                ? "bg-gray-800 text-gray-200 border-gray-600 focus:ring-[#EDEDED]"
                : "bg-white text-gray-800 border-gray-300 focus:ring-[#5B2C25]"
            }`}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500"></div>
        </div>
      ) : search.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {search.map((item, index) => (
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
              <div className="flex flex-wrap justify-between text-xs md:text-sm">
                <span>📖 Umumiy: {item.total} ta</span>
                <span>🔒 Band: {item.busies} ta</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center py-10">
          <p className="text-lg font-semibold text-gray-500">
            {"Ma'lumot topilmadi"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ZarurKitoblar;
