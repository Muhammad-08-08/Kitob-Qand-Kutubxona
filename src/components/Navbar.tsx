"use client";

import { useEffect, useState } from "react";
import useMyStore from "../store/my-store";
import { FiMoon, FiSun } from "react-icons/fi";
import Link from "next/link";
import logoImage from "../images/kitob_qand_logo.svg";
import Image from "next/image";

const Navbar: React.FC = () => {
  const { isDarkMode, toggleDarkMode, initDarkMode } = useMyStore();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = "#1E1E1E";
      document.body.style.color = "#EDEDED";
    } else {
      document.body.style.backgroundColor = "#FDF7F5";
      document.body.style.color = "#5B2C25";
    }
    initDarkMode();
  }, [isDarkMode, initDarkMode]);

  return (
    <header
      className={`container mx-auto w-full transition-colors duration-300 ${
        isDarkMode
          ? "bg-[#1E1E1E] text-[#EDEDED]"
          : "bg-[#FDF7F5] text-[#5B2C25]"
      }`}
    >
      <div className="flex justify-between items-center py-3 px-4">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <Image
              src={logoImage}
              alt="Kitob Qand logo"
              width={48}
              height={48}
              className={isDarkMode ? "invert brightness-0" : ""}
            />
            <span className="text-xl font-bold">Kitob Qand</span>
          </div>
        </Link>

        <div className="flex gap-8 items-center">
          <nav className="hidden xl:flex gap-6 text-lg font-medium">
            <Link href="/manzil" className="hover:text-[#A06A5A]">
              Manzil
            </Link>
            <Link href="/hissaqoshish" className="hover:text-[#A06A5A]">
              Hissa qo"shish
            </Link>
            <Link href="/zarurkitoblar" className="hover:text-[#A06A5A]">
              Zarur kitoblar
            </Link>
            <Link href="/statistika" className="hover:text-[#A06A5A]">
              Statistika
            </Link>
          </nav>

          <div className="flex gap-4 items-center">
            <div
              onClick={toggleDarkMode}
              className="cursor-pointer flex items-center p-2 rounded-lg"
              style={{ width: "70px", height: "40px" }}
            >
              {isDarkMode ? (
                <FiMoon size={30} className="transition-all" />
              ) : (
                <FiSun size={30} className="transition-all" />
              )}
            </div>

            <button
              className="xl:hidden text-2xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex justify-end">
          <div
            className={`w-64 h-full shadow-lg p-5 flex flex-col gap-6 transition-colors duration-300 ${
              isDarkMode
                ? "bg-[#1E1E1E] text-[#EDEDED]"
                : "bg-white text-gray-900"
            }`}
          >
            <button
              className="self-end text-2xl"
              onClick={() => setIsMenuOpen(false)}
            >
              ✖
            </button>
            <Link href="/manzil" className="hover:text-[#A06A5A]">
              Manzil
            </Link>
            <Link href="/hissaqoshish" className="hover:text-[#A06A5A]">
              Hissa qo"shish
            </Link>
            <Link href="/zarurkitoblar" className="hover:text-[#A06A5A]">
              Zarur kitoblar
            </Link>
            <Link href="/statistika" className="hover:text-[#A06A5A]">
              Statistika
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
