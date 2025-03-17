"use client";

import { useEffect, useState } from "react";
import useMyStore from "../store/my-store";
import { FiMoon, FiSun, FiX } from "react-icons/fi";
import Link from "next/link";
import logoImage from "../images/kitob_qand_logo.svg";
import Image from "next/image";

const Navbar: React.FC = () => {
  const { isDarkMode, toggleDarkMode, initDarkMode } = useMyStore();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    initDarkMode();
  }, [isDarkMode, initDarkMode]);

  return (
    <header className="container mx-auto w-full transition-colors duration-300 relative z-50 bg-[#fff] text-[#5B2C25] dark:bg-[#1E1E1E] dark:text-[#EDEDED]">
      <div className="flex justify-between items-center py-3 px-4">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <Image
              src={logoImage}
              alt="Kitob Qand logo"
              width={48}
              height={48}
              className="dark:invert dark:brightness-0"
            />
            <span className="text-xl font-bold">Kitob Qand</span>
          </div>
        </Link>

        <div className="hidden xl:flex items-center gap-6 text-lg font-medium">
          <Link
            href="/manzil"
            className="hover:text-[#A06A5A] dark:hover:text-[#EDEDED]"
          >
            Manzil
          </Link>
          <Link
            href="/hissaqoshish"
            className="hover:text-[#A06A5A] dark:hover:text-[#EDEDED]"
          >
           {"Hissa qo'shish"}
          </Link>
          <Link
            href="/zarurkitoblar"
            className="hover:text-[#A06A5A] dark:hover:text-[#EDEDED]"
          >
            Zarur kitoblar
          </Link>
          <Link
            href="/statistika"
            className="hover:text-[#A06A5A] dark:hover:text-[#EDEDED]"
          >
            Statistika
          </Link>
          <div
            onClick={toggleDarkMode}
            className="flex gap-2 items-center cursor-pointer"
          >
            {isDarkMode ? <FiMoon size={34} /> : <FiSun size={34} />}
          </div>
        </div>

        <button
          className="xl:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-end">
          <div className="w-72 min-w-[250px] h-full shadow-lg p-5 flex flex-col gap-6 transition-all duration-300 rounded-l-lg bg-white text-gray-900 dark:bg-[#1E1E1E] dark:text-[#EDEDED]">
            <button
              className="self-end text-3xl mb-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiX />
            </button>
            <nav className="flex flex-col gap-4 text-lg font-medium">
              <Link
                href="/manzil"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-[#A06A5A] dark:hover:text-[#EDEDED]"
              >
                Manzil
              </Link>
              <Link
                href="/hissaqoshish"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-[#A06A5A] dark:hover:text-[#EDEDED]"
              >
                {"Hissa qo'shish"}
              </Link>
              <Link
                href="/zarurkitoblar"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-[#A06A5A] dark:hover:text-[#EDEDED]"
              >
                Zarur kitoblar
              </Link>
              <Link
                href="/statistika"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-[#A06A5A] dark:hover:text-[#EDEDED]"
              >
                Statistika
              </Link>
            </nav>
            <div
              onClick={toggleDarkMode}
              className="flex gap-2 items-center cursor-pointer"
            >
              {isDarkMode ? <FiMoon size={24} /> : <FiSun size={24} />}
              <span className="text-lg">
                {isDarkMode ? "Tungi rejim" : "Kunduzgi rejim"}
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
