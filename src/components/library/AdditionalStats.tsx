"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useMyStore from "@/store/my-store";

type TotalStats = {
  leased_books_count_of_last_month: string;
  leased_books_count_of_last_week: string;
  new_users_count_last_24_hours: number;
  reading_books_count: string;
};

type TotalStatsType = {
  totalStats: TotalStats;
};

export default function AdditionalStats({ totalStats }: TotalStatsType) {
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
        <CardTitle className="text-xl">🕰️ Qo'shimcha Ma'lumotlar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            {
              label: "Oxirgi Oy",
              value: totalStats.leased_books_count_of_last_month,
              emoji: "📆",
            },
            {
              label: "Oxirgi Hafta",
              value: totalStats.leased_books_count_of_last_week,
              emoji: "🗓️",
            },
            {
              label: "Oxirgi 24 Soat",
              value: totalStats.new_users_count_last_24_hours,
              emoji: "⏰",
            },
            {
              label: "Kutilayotgan",
              value: totalStats.reading_books_count,
              emoji: "⏳",
            },
            {
              label: "Kunlik O'rtacha",
              value: totalStats.reading_books_count,
              emoji: "📊",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`text-center p-3 rounded-lg shadow-md transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
                  : "bg-[#f5ebe8] hover:bg-[#e7d8d3] text-[#5B2C25]"
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
