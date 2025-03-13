"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import useMyStore from "../store/my-store";
import Image from "next/image";
import teacherIcon from "../images/man-teacher.png";
import booksIcon from "../images/books.png";
import checkIcon from "../images/check-mark.png";
import bookIcon from "../images/open-book.png";
import { StatisticsData } from "./Type.User";

const Statistics: React.FC = () => {
  const [statistics, setStatistics] = useState<StatisticsData>();
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useMyStore();

  useEffect(() => {
    axios
      .get("https://library.softly.uz/api/app/stats")
      .then((response) => setStatistics(response.data))
      .catch(() => console.error("Xatolik yuz berdi"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-10">Yuklanmoqda...</div>;
  }

  if (!statistics) {
    return <div className="text-center py-10">Statistika mavjud emas</div>;
  }

  const statItems = [
    {
      image: teacherIcon,
      label: "Kitobxonlar",
      value: statistics.librarians_count,
    },
    {
      image: bookIcon,
      label: "O'qilayotgan kitoblar",
      value: statistics.reading_books_count,
    },
    {
      image: checkIcon,
      label: "O'qilgan kitoblar",
      value: statistics.rents_count,
    },
    {
      image: booksIcon,
      label: "Barcha kitoblar",
      value: statistics.books_count,
    },
  ];

  return (
    <section
      className={`container mx-auto py-8 px-4 sm:px-8 lg:px-16 ${
        isDarkMode
          ? "bg-[#1E1E1E] text-[#FDF7F5]"
          : "bg-[#FDF7F5] text-[#5B2C25]"
      }`}
    >
      <div className="text-left xl:text-center">
        <h2 className="text-3xl font-bold">Kutubxona statistikasi</h2>
        <p className="mt-2 text-lg font-mono cursor-pointer hover:text-[#A06A5A]">
          To'liq ko'rish
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {statItems.map((item, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-md text-center ${
              isDarkMode
                ? "bg-[#252525] text-[#FDF7F5]"
                : "bg-[#F0EAE8] text-[#5B2C25]"
            }`}
          >
            <div className="mb-3 flex justify-center">
              <Image src={item.image} alt={item.label} width={50} height={50} />
            </div>
            <h4 className="text-2xl font-bold">
              {item.value.toLocaleString("ru")}
            </h4>
            <p className="mt-1 text-lg">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;
