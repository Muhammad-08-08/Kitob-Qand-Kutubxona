"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useMyStore from "@/store/my-store";

export type Stats = {
  books_count: string;
  librarians_count: string;
  rents_count: number;
  gender: {
    male: string;
    female: string;
  };
  reading_books_count: string;
};

type MainStatsProps = {
  totalStats: Stats;
};

export default function MainStats({ totalStats }: MainStatsProps) {
  const { isDarkMode } = useMyStore();

  return (
    <Card
      className={`h-full shadow-md transition-colors duration-300 rounded-xl p-4 ${
        isDarkMode
          ? "bg-[#1E1E1E] text-[#EDEDED] border border-gray-700"
          : "bg-[#FDF7F5] text-[#5B2C25]"
      }`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">📊 Umumiy Statistika</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            {
              label: "Jami Kitoblar",
              value: totalStats.books_count,
              emoji: "📚",
            },
            {
              label: "Kitobxonlar",
              value: totalStats.librarians_count,
              emoji: "👥",
            },
            {
              label: "O'qish Uchun",
              value: totalStats.rents_count,
              emoji: "🔖",
            },
            { label: "Erkaklar", value: totalStats.gender.male, emoji: "👨" },
            { label: "Ayollar", value: totalStats.gender.female, emoji: "👩" },
            {
              label: "Joriy O'qish",
              value: totalStats.reading_books_count,
              emoji: "📖",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`text-center p-3 rounded-lg shadow-md transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                  : "bg-[#FAE3D9] hover:bg-[#F2C2A2] text-[#5B2C25]"
              }`}
            >
              <span className="text-4xl block mb-2">{stat.emoji}</span>
              <span className="text-2xl font-bold block">{stat.value}</span>
              <span className="text-sm mt-1 block">{stat.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
