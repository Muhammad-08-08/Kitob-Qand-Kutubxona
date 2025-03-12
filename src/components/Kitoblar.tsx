"use client";

import useMyStore from "@/store/my-store";
import { Button, Input, Pagination, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import CardPage from "./CardPage";
import { TopMenuType } from "./Type.User";
import KardModal from "./KardModal";

const { Search } = Input;

const Kitoblar: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isDarkMode } = useMyStore();
  const [inputSearchValue, setInputSearchValue] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [books, setBooks] = useState<TopMenuType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedBookId, setSelectedBookId] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    const delay = setTimeout(() => {
      setSearchQuery(inputSearchValue);
    }, 1500);

    return () => clearTimeout(delay);
  }, [inputSearchValue]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://library.softly.uz/api/app/books", {
        params: {
          size: 20,
          page: currentPage,
          order: "DESC",
          q: searchQuery,
        },
      })
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Kitoblarni yuklashda xato:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, searchQuery]);

  const openModal = (id: number) => {
    console.log("Tanlangan kitob ID:", id);
    setSelectedBookId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedBookId(undefined);
  };

  if (!books || loading) {
    return (
      <div className="w-full h-screen py-10 text-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-5 ${
        isDarkMode
          ? "bg-[#1E1E1E] text-[#FDF7F5]"
          : "bg-[#FDF7F5] text-[#5B2C25]"
      }`}
    >
      <div className="w-max mx-auto">
        <h2 className="text-2xl font-bold mb-5">Kitoblar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 mb-6 gap-4">
          <div className="flex gap-2 justify-start sm:justify-start">
            <Button>Barchasi</Button>
            <Button>Bo'sh</Button>
            <Button>Band</Button>
          </div>

          <div className="w-[250px] sm:w-auto">
            <Search
              value={inputSearchValue}
              onChange={(e) => setInputSearchValue(e.currentTarget.value)}
              placeholder="Kitob qidirish..."
              enterButton
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {books.items.map((item) => (
            <div key={item.id} onClick={() => openModal(item.id)}>
              <CardPage item={item} />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-5">
          <Pagination
            current={currentPage}
            pageSize={20}
            total={books.totalCount}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      </div>

      {selectedBookId !== undefined && (
        <KardModal
          id={selectedBookId}
          isOpen={modalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Kitoblar;
