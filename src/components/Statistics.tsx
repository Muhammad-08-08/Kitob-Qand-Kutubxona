"use client";

import Image from "next/image";
import useMyStore from "../store/my-store";
import teacherIcon from "../images/man-teacher.png";
import booksIcon from "../images/books.png";
import checkIcon from "../images/check-mark.png";
import bookIcon from "../images/open-book.png";
import { StatisticsData } from "./Type.User";
import Link from "next/link";

interface StatisticsProps {
  initialData: StatisticsData;
}

const Statistics: React.FC<StatisticsProps> = ({ initialData }) => {
  const { isDarkMode } = useMyStore();

  const statItems = [
    {
      image: teacherIcon,
      label: "Kitobxonlar",
      value: initialData.librarians_count,
    },
    {
      image: bookIcon,
      label: "O'qilayotgan kitoblar",
      value: initialData.reading_books_count,
    },
    {
      image: checkIcon,
      label: "O'qilgan kitoblar",
      value: initialData.rents_count,
    },
    {
      image: booksIcon,
      label: "Barcha kitoblar",
      value: initialData.books_count,
    },
  ];

  return (
    <section
      className={`w-full container mx-auto py-8 px-4 sm:px-8 md:px-16 transition-colors duration-300 ${
        isDarkMode ? "bg-[#1E1E1E] text-[#FDF7F5]" : "bg-[#fff] text-[#5B2C25]"
      }`}
    >
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
          📊 Kutubxona statistikasi
        </h1>
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
                  width={48}
                  height={48}
                  className="opacity-90"
                  priority={index < 2}
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold">
                {item.value.toLocaleString("ru")}
              </h2>
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