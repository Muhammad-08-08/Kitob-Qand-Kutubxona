"use client";

import React from "react";
import { FaTelegramPlane } from "react-icons/fa";
import useMyStore from "@/store/my-store";
import Image from "next/image";
import logo from "../../images/kitob_qand_logo.svg";

const Manzil: React.FC = () => {
  const { isDarkMode } = useMyStore();
  const telegramUrl = "https://t.me/mehr_kutubxonasi/1559";

  return (
    <div
      className={`flex items-center justify-center h-screen px-4 sm:px-0 transition-colors duration-300 container mx-auto ${
        isDarkMode
          ? "bg-[#1E1E1E] text-[#EDEDED]"
          : "bg-[#fff] text-[#5B2C25]"
      }`}
    >
      <div
        className={`max-w-md w-full shadow-lg rounded-xl border p-5 transition-colors duration-300 ${
          isDarkMode
            ? "bg-[#1E1E1E] border-gray-700 text-[#EDEDED]"
            : "bg-[#FDF7F5] border-gray-200 text-[#5B2C25]"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={logo}
              alt="Channel Avatar"
              width={40}
              height={40}
              className={isDarkMode ? "invert brightness-0" : ""}
            />
            <h3 className="ml-3 text-lg font-semibold">Mehr kutubxonasi</h3>
          </div>
          <FaTelegramPlane className="text-blue-500 text-2xl" />
        </div>
        <p className="mt-3 text-sm sm:text-base">
          Please open Telegram to view this post
        </p>
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center mt-4 px-4 py-2 text-blue-500 border border-blue-500 rounded-md font-semibold hover:bg-blue-500 hover:text-white transition"
        >
          VIEW IN TELEGRAM
        </a>
        <div className="flex flex-col sm:flex-row items-center justify-between text-sm mt-4">
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            t.me/mehr_kutubxonasi/1559
          </a>
          <span className="mt-2 sm:mt-0">72.4K 👁</span>
        </div>
      </div>
    </div>
  );
};

export default Manzil;
