"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { User } from "lucide-react";
import useMyStore from "@/store/my-store";

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
      className={`shadow-lg h-full transition-colors duration-300 rounded-xl p-4 ${
        isDarkMode
          ? "bg-[#1E1E1E] text-[#EDEDED]"
          : "bg-[#FDF7F5] text-[#5B2C25]"
      }`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">🏅 Top Kitobxonlar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {topReaders.map((reader, index) => (
            <div
              key={reader.lastName}
              className={`p-4 rounded-xl shadow-md flex items-center gap-3 transition-colors duration-300 cursor-pointer hover:scale-105 ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
                  : "bg-[#EDE3DC] hover:bg-[#E4D4C8] text-[#5B2C25]"
              }`}
            >
              <span className="text-4xl text-gray-500">
                <User />
              </span>
              <div className="text-left">
                <span className="text-2xl font-bold block">{reader.count}</span>
                <span className="text-sm text-gray-400">{reader.lastName}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
