"use client";

import useMyStore from "@/store/my-store";
import axios from "axios";
import { useEffect, useState } from "react";
import CardPage from "./CardPage";
import { TopMenuType } from "./Type.User";
import KardModal from "./KardModal";
import { Pagination } from "./ui/pagination";

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

  const handleFilter = (filter: boolean | null) => {
    setBusy(filter);
  };

  const openModal = (id: number) => {
    console.log("Tanlangan kitob ID:", id);
    setSelectedBookId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedBookId(undefined);
  };

  return (
    <div
      className={`min-h-screen p-5 ${
        isDarkMode ? "bg-[#1E1E1E] text-[#FDF7F5]" : "bg-[#fff] text-[#5B2C25]"
      }`}
    >
      <div className="max-w-full lg:max-w-[1100px] mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-5 text-center">
          Kitoblar
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 sm:px-4 py-2 rounded text-sm sm:text-base ${
                busy === null
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={() => handleFilter(null)}
            >
              Barchasi
            </button>
            <button
              className={`px-3 sm:px-4 py-2 rounded text-sm sm:text-base ${
                busy === false
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={() => handleFilter(false)}
            >
              {"Bo'sh"}
            </button>
            <button
              className={`px-3 sm:px-4 py-2 rounded text-sm sm:text-base ${
                busy === true
                  ? "bg-red-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={() => handleFilter(true)}
            >
              Band
            </button>
          </div>
          <div className="w-full sm:w-auto">
            <input
              type="text"
              value={inputSearchValue}
              onChange={(e) => setInputSearchValue(e.currentTarget.value)}
              placeholder="Kitob qidirish..."
              className="w-full px-4 py-2 border rounded text-sm sm:text-base"
            />
          </div>
        </div>
        {loading ? (
          <div className="w-full flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500"></div>
          </div>
        ) : books?.items.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.items.map((item) => (
              <div key={item.id} onClick={() => openModal(item.id)}>
                <CardPage item={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-lg font-semibold text-gray-500">
              Hech qanday kitob topilmadi
            </p>
          </div>
        )}
        {!loading && (
          <Pagination
            page={currentPage}
            totalPages={books ? Math.ceil(books.totalCount / 20) : 1}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
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
