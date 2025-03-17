"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";
import useMyStore from "@/store/my-store";

const API_URL = "https://library.softly.uz/api/app/stats";

type Book = {
  count: string;
  name: string;
};

interface TopBooksProps {
  books?: Book[];
}

export default function TopBooks({ books }: TopBooksProps) {
  const { isDarkMode } = useMyStore();
  const [showAllBooks, setShowAllBooks] = useState(false);
  const [topBooks, setTopBooks] = useState<Book[]>(books || []);

  useEffect(() => {
    if (!books) {
      axios.get(API_URL).then((response) => {
        setTopBooks(response.data.top_books);
      });
    }
  }, [books]);

  const displayedBooks = showAllBooks ? topBooks : topBooks.slice(0, 5);

  return (
    <Card
      className={`w-full shadow-md transition-colors duration-300 rounded-xl p-4 ${
        isDarkMode
          ? "bg-[#1E1E1E] text-[#EDEDED] border border-gray-700"
          : "bg-[#FDF7F5] text-[#5B2C25]"
      }`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg sm:text-xl">🏆 Top Kitoblar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {displayedBooks.map((book, index) => (
            <div
              key={book.name}
              className={`flex items-center justify-between p-2 rounded-lg transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-800 text-gray-300"
                  : "bg-[#f5ebe8] text-[#5B2C25]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-5 h-5 flex items-center justify-center rounded-full text-xs font-semibold ${
                    isDarkMode
                      ? "bg-gray-700 text-gray-300"
                      : "bg-slate-200 text-gray-800"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="font-medium text-sm sm:text-base">
                  {book.name}
                </span>
              </div>
              <span className="font-semibold text-sm sm:text-base">
                {book.count}
              </span>
            </div>
          ))}
          {topBooks.length > 5 && (
            <button
              onClick={() => setShowAllBooks(!showAllBooks)}
              className="w-full mt-2 flex items-center justify-center gap-1 text-sm sm:text-base transition-colors duration-300"
            >
              {showAllBooks ? (
                <>
                  <ChevronUp size={14} />
                  <span>{"Kamroq ko'rsatish"}</span>
                </>
              ) : (
                <>
                  <ChevronDown size={14} />
                  <span>{"Ko'proq ko'rsatish"}</span>
                </>
              )}
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
