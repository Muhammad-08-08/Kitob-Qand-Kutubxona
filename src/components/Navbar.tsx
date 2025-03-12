"use client";

import { useEffect, useState } from "react";
import { Drawer, Switch, ConfigProvider } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import useMyStore from "../store/my-store";
import Image from "next/image";
import Link from "next/link";
import logo from "../images/kitob_qand_logo.svg";

const Navbar: React.FC = () => {
  const { isDarkMode, toggleDarkMode, initDarkMode } = useMyStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    initDarkMode(); // LocalStorage'dan oldingi holatni olish
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#5B2C25",
          colorBgBase: isDarkMode ? "#1E1E1E" : "#FDF7F5",
          colorTextBase: isDarkMode ? "#EDEDED" : "#5B2C25",
        },
      }}
    >
      <header
        className={`shadow-md container mx-auto ${
          isDarkMode
            ? "bg-[#1E1E1E] text-[#EDEDED]"
            : "bg-[#FDF7F5] text-[#5B2C25]"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center py-3 px-4">
          <Link href="/">
            <div className="flex items-center gap-3">
              <Image
                src={logo}
                alt="Kitob Qand logo"
                width={48}
                height={48}
                priority
                className={isDarkMode ? "invert brightness-0" : ""}
              />
              <span className="text-xl font-bold">Kitob Qand</span>
            </div>
          </Link>

          <div className="flex gap-5 items-center">
            <nav className="hidden xl:flex gap-6 text-lg font-medium">
              <Link href="/manzil">
                <p className="hover:text-[#A06A5A] cursor-pointer">Manzil</p>
              </Link>
              <Link href="/hissaqoshish">
                <p className="hover:text-[#A06A5A] cursor-pointer">
                  Hissa qo'shish
                </p>
              </Link>
              <Link href="/zarurkitoblar">
                <p className="hover:text-[#A06A5A] cursor-pointer">
                  Zarur kitoblar
                </p>
              </Link>
              <Link href="/statistika">
                <p className="hover:text-[#A06A5A] cursor-pointer">
                  Statistika
                </p>
              </Link>
            </nav>

            <div className="hidden xl:block">
              <Switch
                checked={isDarkMode}
                onChange={toggleDarkMode}
                checkedChildren="🌙"
                unCheckedChildren="☀️"
              />
            </div>

            <button
              className="xl:hidden text-2xl"
              onClick={() => setIsDrawerOpen(true)}
            >
              <MenuOutlined />
            </button>
          </div>
        </div>

        <Drawer
          title="Menyu"
          placement="right"
          closable
          onClose={() => setIsDrawerOpen(false)}
          open={isDrawerOpen}
          closeIcon={<CloseOutlined />}
          getContainer={false}
          className={
            isDarkMode
              ? "bg-[#1E1E1E] text-[#EDEDED]"
              : "bg-[#FDF7F5] text-[#5B2C25]"
          }
        >
          <nav className="flex flex-col gap-6 text-lg font-medium">
            <Link href="/manzil">
              <p className="hover:text-[#A06A5A] cursor-pointer">Manzil</p>
            </Link>
            <Link href="/hissaqoshish">
              <p className="hover:text-[#A06A5A] cursor-pointer">
                Hissa qo'shish
              </p>
            </Link>
            <Link href="/zarurkitoblar">
              <p className="hover:text-[#A06A5A] cursor-pointer">
                Zarur kitoblar
              </p>
            </Link>
            <Link href="/statistika">
              <p className="hover:text-[#A06A5A] cursor-pointer">Statistika</p>
            </Link>
          </nav>

          <div className="mt-6 flex items-center gap-2">
            <span>{isDarkMode ? "Yorug'lik rejimi" : "Qorong'u rejim"}</span>
            <Switch
              checked={isDarkMode}
              onChange={toggleDarkMode}
              checkedChildren="🌙"
              unCheckedChildren="☀️"
            />
          </div>
        </Drawer>
      </header>
    </ConfigProvider>
  );
};

export default Navbar;
