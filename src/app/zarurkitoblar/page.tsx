"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ConfigProvider, Card } from "antd";
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
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#5B2C25",
          colorBgBase: isDarkMode ? "#1E1E1E" : "#FDF7F5",
          colorTextBase: isDarkMode ? "#EDEDED" : "#5B2C25",
        },
      }}
    >
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {zarurkitoblar.map((item, index) => (
            <Card
              key={index}
              style={{
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                padding: "16px",
                backgroundColor: isDarkMode ? "#252525" : "white",
                color: isDarkMode ? "#EDEDED" : "black",
                border: isDarkMode ? "1px solid #444" : "1px solid #ccc",
              }}
            >
              <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                {index + 1}. {item.name}
              </p>
              <p>📖 Umumiy: {item.total} ta</p>
              <p>🔒 Band: {item.busies} ta</p>
            </Card>
          ))}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default ZarurKitoblar;
