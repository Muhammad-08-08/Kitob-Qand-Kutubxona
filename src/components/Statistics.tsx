"use client";

import axios from "axios";
import useMyStore from "../store/my-store";
import Image from "next/image";
import teacherIcon from "../images/man-teacher.png";
import booksIcon from "../images/books.png";
import checkIcon from "../images/check-mark.png";
import bookIcon from "../images/open-book.png";
import { StatisticsData } from "./Type.User";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    return <div className="text-center py-10 text-lg">⏳ Yuklanmoqda...</div>;
  }

  if (!statistics) {
    return (
      <div className="text-center py-10 text-lg">❌ Statistika mavjud emas</div>
    );
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
      className={`w-full container mx-auto py-8 px-4 sm:px-8 md:px-16 transition-colors duration-300 ${
        isDarkMode ? "bg-[#1E1E1E] text-[#FDF7F5]" : "bg-[#fff] text-[#5B2C25]"
      }`}
    >
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
          📊 Kutubxona statistikasi
        </h2>
        <Link href="/statistika">
          <p className="mt-2 text-lg font-mono cursor-pointer hover:text-[#A06A5A] transition-colors duration-200">
            {"➡️ To'liq ko'rish"}
          </p>
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
        {statItems.map((item, index) => (
          <Link key={index} href="/statistika">
            <div
              className={`p-4 sm:p-5 rounded-lg shadow-lg hover:shadow-xl text-center transition-all duration-300 transform hover:scale-105 ${
                isDarkMode
                  ? "bg-[#252525] text-[#FDF7F5]"
                  : "bg-[#F0EAE8] text-[#5B2C25]"
              }  flex flex-col items-center justify-center h-[140px] sm:h-[180px]`}
            >
              <div className="mb-3 flex justify-center">
                <Image
                  src={item.image}
                  alt={item.label}
                  width={0}
                  height={0}
                  className="opacity-90 h-12 w-12 md:h-16 md:w-16"
                />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold">
                {item.value.toLocaleString("ru")}
              </h4>
              <p className="mt-1 text-base sm:text-lg font-bold">
                {item.label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Statistics;
