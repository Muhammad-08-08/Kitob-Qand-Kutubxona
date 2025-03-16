"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import useMyStore from "@/store/my-store";

interface ChartData {
  date: string;
  borrowed: number;
  returned: number;
}

interface BorrowingChartProps {
  data: ChartData[];
}

export default function BorrowingChart({ data }: BorrowingChartProps) {
  const { isDarkMode } = useMyStore();

  return (
    <Card
      className={`w-full shadow-md transition-colors duration-300 rounded-xl ${
        isDarkMode
          ? "bg-[#1E1E1E] text-[#EDEDED] border border-gray-700"
          : "bg-[#FDF7F5] text-[#5B2C25]"
      }`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg sm:text-xl">
          📈 Kitob Olish/Qaytarish
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <XAxis
              dataKey="date"
              stroke={isDarkMode ? "#EDEDED" : "#5B2C25"}
              fontSize={12}
            />
            <YAxis stroke={isDarkMode ? "#EDEDED" : "#5B2C25"} fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? "#333" : "#FDF7F5",
                borderRadius: "8px",
                color: isDarkMode ? "#EDEDED" : "#5B2C25",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "14px" }} />
            <Line
              type="monotone"
              dataKey="borrowed"
              stroke={isDarkMode ? "#14b8a6" : "#D2691E"}
              strokeWidth={2}
              name="Olingan"
            />
            <Line
              type="monotone"
              dataKey="returned"
              stroke={isDarkMode ? "#60a5fa" : "#8B0000"}
              strokeWidth={2}
              name="Qaytarilgan"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
