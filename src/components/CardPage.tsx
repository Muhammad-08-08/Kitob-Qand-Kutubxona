"use client";

import { Button, Card } from "antd";
import Image from "next/image";
import useMyStore from "@/store/my-store";
import { CardPageType } from "./Type.User";

const CardPage: React.FC<CardPageType> = ({ item }) => {
  const isDarkMode = useMyStore((state) => state.isDarkMode);
  const lightText = "text-[#5B2C25]";
  const darkText = "text-[#FDF7F5]";

  const allBusy = item.stocks.every((stock) => stock.busy);

  return (
    <Card
      hoverable
      style={{
        maxWidth: "250px",
        padding: "12px",
        borderRadius: "8px",
        border: `1px solid ${isDarkMode ? "#1E1E1E" : "#A06A5A"}`,
        backgroundColor: isDarkMode ? "#1E1E1E" : "#FDF7F5",
        boxShadow: isDarkMode
          ? "0 4px 12px rgba(0,0,0,0.2)"
          : "0 4px 12px rgba(160, 106, 90, 0.3)",
      }}
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

        <Button
          style={{
            marginTop: "12px",
            width: "100%",
            backgroundColor: isDarkMode
              ? "#252525"
              : allBusy
              ? "orange"
              : "#A06A5A",
            color: isDarkMode ? "#FDF7F5" : "#FFFFFF",
            border: "none",
            padding: "10px 0",
            fontSize: "16px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {allBusy ? "Band" : "Bo'sh"}
        </Button>
      </div>
    </Card>
  );
};

export default CardPage;
