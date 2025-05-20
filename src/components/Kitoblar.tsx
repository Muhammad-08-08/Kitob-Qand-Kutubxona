"use client";

import useMyStore from "@/store/my-store";
import axios from "axios";
import { useEffect, useState } from "react";
import CardPage from "./CardPage";
import KardDrawer from "./KardModal";
import { TopMenuType } from "./Type.User";
import { Pagination } from "./ui/pagination";

const Kitoblar: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useMyStore();
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<TopMenuType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | undefined>();
  const [busy, setBusy] = useState<boolean | null>(null);

  // Debounced search input
  useEffect(() => {
    const delay = setTimeout(() => {
      setSearchQuery(inputSearchValue);
    }, 500);
    return () => clearTimeout(delay);
  }, [inputSearchValue]);

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://library.softly.uz/api/app/books",
          {
            params: {
              size: 20,
              page: currentPage,
              order: "DESC",
              q: searchQuery,
              busy,
            },
          }
        );
        setBooks(response.data);
      } catch (error) {
        console.error("Kitoblarni yuklashda xato:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [currentPage, searchQuery, busy]);

  const handleFilter = (filter: boolean | null) => {
    setBusy(filter);
    setCurrentPage(1);
  };

  const openModal = (id: number) => {
    setSelectedBookId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedBookId(undefined);
  };

  const renderSkeletons = () =>
    Array.from({ length: 8 }).map((_, index) => (
      <CardPage
        key={`skeleton-${index}`}
        item={{
          id: 0,
          name: "",
          image: "",
          sale_price: 0,
          author: { name: "" },
          stocks: [],
        }}
        isLoading
      />
    ));

  return (
    <div
      className={`min-h-screen p-5 ${
        isDarkMode ? "bg-[#1E1E1E] text-[#FDF7F5]" : "bg-white text-[#5B2C25]"
      }`}
    >
      <div className="max-w-full lg:max-w-[1100px] mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-5 text-center">
          📚 Kitoblar
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Barchasi", value: null },
              { label: "Bo'sh", value: false },
              { label: "Band", value: true },
            ].map((filter) => (
              <button
                key={filter.label}
                className={`px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base transition-all duration-300 ${
                  busy === filter.value
                    ? "bg-[#773000] text-white"
                    : isDarkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => handleFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={inputSearchValue}
            onChange={(e) => setInputSearchValue(e.currentTarget.value)}
            placeholder="Kitob qidirish..."
            className={`w-full px-4 py-2 rounded-md border transition-all duration-300 focus:ring-2 ${
              isDarkMode
                ? "bg-gray-800 text-gray-200 border-gray-700 focus:ring-[#EDEDED]"
                : "bg-white text-gray-800 border-gray-300 focus:ring-[#5B2C25]"
            }`}
          />
        </div>

        {/* Kitoblar grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? renderSkeletons()
            : books?.items?.map((item) => (
                <div
                  key={item.id}
                  onClick={() => openModal(item.id)}
                  className="cursor-pointer"
                >
                  <CardPage item={item} isLoading={false} />
                </div>
              ))}
        </div>

        {/* No results */}
        {!loading && books?.items?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10">
            <p
              className={`text-lg font-semibold ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Hech qanday kitob topilmadi
            </p>
          </div>
        )}

        {/* Pagination */}
        {!loading && (
          <Pagination
            page={currentPage}
            totalPages={Math.ceil((books?.totalCount || 0) / 20)}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* Modal */}
      {selectedBookId != null && (
        <KardDrawer
          id={selectedBookId}
          isOpen={modalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Kitoblar;
