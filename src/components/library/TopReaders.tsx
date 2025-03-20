"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useMyStore from "@/store/my-store";
import axios from "axios";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

const API_URL = "https://library.softly.uz/api/app/stats";

type Reader = {
  lastName: string;
  count: string;
};

interface TopReadersProps {
  readers?: Reader[];
}

export default function TopReaders({ readers }: TopReadersProps) {
  const { isDarkMode } = useMyStore();
  const [topReaders, setTopReaders] = useState<Reader[]>(readers || []);

  useEffect(() => {
    if (!readers) {
      axios.get(API_URL).then((response) => {
        setTopReaders(response.data.top_librarians);
      });
    }
  }, [readers]);

  return (
    <Card
      className={`w-full h-[420px] shadow-md transition-colors duration-300 rounded-xl p-4 overflow-y-auto ${
        isDarkMode
          ? "bg-[#1E1E1E] text-[#EDEDED] border border-gray-700"
          : "bg-[#FDF7F5] text-[#5B2C25]"
      }`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg sm:text-xl">🏅 Top Kitobxonlar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {topReaders.map((reader) => (
            <div
              key={reader.lastName}
              className={`p-3 rounded-lg shadow-md hover:shadow-lg flex items-center gap-3 transition-all duration-300 cursor-pointer hover:scale-105 ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
                  : "bg-[#f5ebe8] hover:bg-[#e7d8d3] text-[#5B2C25]"
              }`}
            >
              <span className="text-3xl sm:text-4xl text-gray-400 sm:text-gray-500">
                <User />
              </span>
              <div className="text-left">
                <span className="text-xl sm:text-2xl font-bold block">
                  {reader.count}
                </span>
                <span className="text-xs sm:text-sm text-gray-500">
                  {reader.lastName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
