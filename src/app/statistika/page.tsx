"use client";

import AdditionalStats from "@/components/library/AdditionalStats";
import BorrowingChart from "@/components/library/BorrowingChart";
import MainStats, { Stats } from "@/components/library/MainStats";
import TopBooks from "@/components/library/TopBooks";
import TopReaders from "@/components/library/TopReaders";
import { LibraryData } from "@/components/Type.User";
import axios from "axios";
import { useEffect, useState } from "react";
import useMyStore from "@/store/my-store";

const LibraryStatistics: React.FC = () => {
  const [data, setData] = useState<LibraryData | null>(null);
  const { isDarkMode } = useMyStore();

  useEffect(() => {
    axios
      .get("https://library.softly.uz/api/app/stats")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("API dan ma'lumot olishda xatolik:", error);
      });
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 dark:text-gray-300">Yuklanmoqda...</p>
      </div>
    );
  }

  const totalStats = {
    leased_books_count_of_last_month:
      data.leased_books_count_of_last_month || "0",
    leased_books_count_of_last_week:
      data.leased_books_count_of_last_week || "0",
    new_users_count_last_24_hours: data.new_users_count_last_24_hours || 0,
    reading_books_count: data.reading_books_count || "0",
  };

  const mainStats: Stats = {
    books_count: data.books_count.toString(),
    librarians_count: data.librarians_count.toString(),
    rents_count: data.rents_count,
    gender: {
      male: data.gender.male.toString(),
      female: data.gender.female.toString(),
    },
    reading_books_count: data.reading_books_count.toString(),
  };

  const graphData = data.one_month_leased_rents_by_day.map((item) => ({
    date: item.day.split("T")[0].slice(-5),
    borrowed: parseInt(item.count.toString()),
    returned: parseInt(
      data.one_month_returned_rents_by_day
        .find((r) => r.day === item.day)
        ?.count.toString() || "0"
    ),
  }));

  const topBooks = data.top_books.map((book) => ({
    name: book.name,
    count: book.count,
  }));

  const topReaders = data.top_librarians.map((librarian, index) => ({
    lastName: librarian.lastName,
    count: librarian.count,
    user_id: index % 2 === 0 ? "👩‍🎓" : "👨‍💻",
  }));

  return (
    <div
      className={`min-h-screen py-6 p-2 md:px-4 transition-all duration-300 ${
        isDarkMode
          ? "bg-[#1E1E1E] text-[#EDEDED]"
          : "bg-[#fff] text-[#5B2C25]"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Kutubxona Statistikasi
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="w-full lg:col-span-6">
            <MainStats totalStats={mainStats} />
          </div>

          <div className="w-full lg:col-span-6">
            <AdditionalStats totalStats={totalStats} />
          </div>

          <div className="w-full lg:col-span-12">
            <BorrowingChart data={graphData} />
          </div>

          <div className="w-full lg:col-span-4">
            <TopBooks books={topBooks} />
          </div>

          <div className="w-full lg:col-span-8">
            <TopReaders readers={topReaders} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryStatistics;
