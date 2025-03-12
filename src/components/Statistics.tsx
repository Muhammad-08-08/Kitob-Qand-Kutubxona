"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import useMyStore from "../store/my-store";
import { message } from "antd";
import { StatisticsData } from "./Type.User";

const Statistics: React.FC = () => {
  const [statistics, setStatistics] = useState<StatisticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const isDarkMode = useMyStore((state) => state.isDarkMode);

  useEffect(() => {
    axios
      .get<StatisticsData>("https://library.softly.uz/api/app/stats")
      .then((response) => {
        setStatistics(response.data);
      })
      .catch(() => {
        message.error("Xatolik");
      })
      .finally(() => setLoading(false));
  }, []);

  const lightBg = "bg-[#FDF7F5]";
  const darkBg = "bg-[#1E1E1E]";
  const lightText = "text-[#5B2C25]";
  const darkText = "text-[#FDF7F5]";
  const hoverText = "hover:text-[#A06A5A]";
  const darkHoverText = "hover:text-[#D4A59A]";

  if (loading) {
    return <div className="text-center py-10">Yuklanmoqda...</div>;
  }

  if (!statistics) {
    return <div className="text-center py-10">Statistika mavjud emas</div>;
  }

  const statItems = [
    { image: "👥", label: "Kitobxonlar", value: statistics.librarians_count },
    {
      image: "📖",
      label: "O'qilayotgan kitoblar",
      value: statistics.reading_books_count,
    },
    { image: "✅", label: "O'qilgan kitoblar", value: statistics.rents_count },
    { image: "📚", label: "Barcha kitoblar", value: statistics.books_count },
  ];

  return (
    <section
      className={`py-8 px-4 sm:px-8 lg:px-16 ${isDarkMode ? darkBg : lightBg}`}
    >
      <div className="text-left xl:text-center">
        <h2
          className={`text-3xl font-bold ${isDarkMode ? darkText : lightText}`}
        >
          Kutubxona statistikasi
        </h2>
        <p
          className={`mt-2 text-lg font-mono cursor-pointer inline-block ${
            isDarkMode ? darkHoverText : hoverText
          }`}
        >
          To'liq ko'rish
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {statItems.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: isDarkMode ? "#252525" : "#F0EAE8",
              color: isDarkMode ? "#FDF7F5" : "#5B2C25",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <div style={{ marginBottom: "12px" }}>
              <span style={{ fontSize: "36px" }}>{item.image}</span>
            </div>
            <h4 style={{ fontSize: "24px", fontWeight: "bold" }}>
              {item.value.toLocaleString("ru")}
            </h4>
            <p style={{ marginTop: "4px", fontSize: "18px" }}>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;
