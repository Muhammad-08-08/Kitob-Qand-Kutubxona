"use client";

import useMyStore from "@/store/my-store";
import axios from "axios";
import { useEffect, useState } from "react";
import CardPage from "./CardPage";
import { TopMenuType } from "./Type.User";
import KardModal from "./KardModal";

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
  const [busy, setBusy] = useState<boolean | null>(null);

  useEffect(() => {
    const delay = setTimeout(() => {
      setSearchQuery(inputSearchValue);
    }, 1000);

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
          busy: busy,
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
  }, [currentPage, searchQuery, busy]);

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
      <div className="w-full h-screen py-10 text-center flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500"></div>
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
        <h2 className="text-2xl font-bold mb-5 text-center">Kitoblar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 mb-6 gap-4">
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded ${
                busy === null
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={() => setBusy(null)}
            >
              Barchasi
            </button>
            <button
              className={`px-4 py-2 rounded ${
                busy === false
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={() => setBusy(false)}
            >
              Bo'sh
            </button>
            <button
              className={`px-4 py-2 rounded ${
                busy === true
                  ? "bg-red-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={() => setBusy(true)}
            >
              Band
            </button>
          </div>
          <div className="w-[250px] sm:w-auto">
            <input
              type="text"
              value={inputSearchValue}
              onChange={(e) => setInputSearchValue(e.currentTarget.value)}
              placeholder="Kitob qidirish..."
              className="w-full px-4 py-2 border rounded"
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {books.items.map((item) => (
            <div key={item.id} onClick={() => openModal(item.id)}>
              <CardPage item={item} />
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-5">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            ← Oldingi
          </button>
          <span className="px-4 py-2">{currentPage}</span>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded"
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Keyingi →
          </button>
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
