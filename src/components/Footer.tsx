"use client";

import Image from "next/image";
import useMyStore from "@/store/my-store";
import logo from "../images/kitob_qand_logo.svg";
import Link from "next/link";

const Footer: React.FC = () => {
  const { isDarkMode } = useMyStore();

  return (
    <div
      className={`container mx-auto px-4 ${
        isDarkMode ? "bg-[#1E1E1E] text-white" : "bg-[#FDF7F5] text-[#5B2C25]"
      }`}
    >
      <div className="border-b-2 border-gray-600 mb-5">
        <h2
          className={`text-2xl font-semibold ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Mehr kutubxonasi - Bepul kutubxona
        </h2>
        <p
          className={`mt-3 text-lg ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Bepul kutubxona. Kutubxonaga kelib o&apos;zingizga kerakli kitobni
          kelishilgan muddatga o&apos;qib turish uchun olib ketishingiz mumkin.
          Bu mutlaqo bepul. Alloh roziligi uchun. Kutubxonaga ehson qilib pul
          bilan yoki kitob bilan savob manbaini hosil qilishingiz mumkin. Har
          bir o&apos;qilgan kitobda sizga savob borib turadi inshaAlloh.
          Sadaqai Joriyaining afzali ilmga qilinganidir.
        </p>
        <div className="flex flex-col sm:flex-row justify-around my-10 mx-auto">
          <Link href={"/"}>
            <div className="flex items-center gap-3 mb-4 sm:mb-0 w-full sm:w-auto justify-center sm:justify-start">
              <Image
                src={logo}
                alt="Kitob Qand logo"
                width={64}
                height={64}
                className={`sm:h-20 ${isDarkMode ? "invert brightness-0" : ""}`}
              />
              <span
                className={`text-2xl sm:text-3xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Kitob Qand
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-start">
            <Image
              src="/images/telegramm.png"
              alt="Telegram kanal"
              width={80}
              height={80}
              className="w-16 sm:w-20"
            />
            <div>
              <h4
                className={`font-bold text-2xl sm:text-3xl ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Biz Telegramda
              </h4>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://t.me/mehr_kutubxonasi"
                className="text-blue-500 hover:text-blue-700 text-2xl sm:text-3xl font-medium"
              >
                @mehr_kutubxonasi
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`py-4 text-center ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}
      >
        <h3>Kitob Qand kutubxonasi</h3>
      </div>
    </div>
  );
};

export default Footer;
