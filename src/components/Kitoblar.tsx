"use client";

import useMyStore from "@/store/my-store";
import { useState } from "react";
import CardPage from "./CardPage";
import KardDrawer from "./KardModal";
import { TopMenuType } from "./Type.User";
import { Pagination } from "./ui/pagination";

interface KitoblarProps {
  initialData: TopMenuType;
}

const Kitoblar: React.FC<KitoblarProps> = ({ initialData }) => {
  const { isDarkMode } = useMyStore();
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [books, setBooks] = useState<TopMenuType>(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | undefined>();
  const [busy, setBusy] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://library.softly.uz/api/app/books?size=20&page=${currentPage}&q=${inputSearchValue.trim()}${
          busy !== null ? `&busy=${busy}` : ""
        }`
      );
      const data = await res.json();
      setBooks(data);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (filter: boolean | null) => {
    setBusy(filter);
    setCurrentPage(1);
    setLoading(true);
    try {
      const res = await fetch(
        `https://library.softly.uz/api/app/books?size=20&page=1&q=${inputSearchValue.trim()}${
          filter !== null ? `&busy=${filter}` : ""
        }`
      );
      const data = await res.json();
      setBooks(data);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (id: number) => {
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

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="search"
              value={inputSearchValue}
              onChange={(e) => setInputSearchValue(e.currentTarget.value)}
              placeholder="Kitob qidirish..."
              className={`w-full px-4 py-2 rounded-md border transition-all duration-300 focus:ring-2 ${
                isDarkMode
                  ? "bg-gray-800 text-gray-200 border-gray-700 focus:ring-[#EDEDED]"
                  : "bg-white text-gray-800 border-gray-300 focus:ring-[#5B2C25]"
              }`}
            />
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                isDarkMode
                  ? "bg-[#5B2C25] text-white hover:bg-[#773000]"
                  : "bg-[#5B2C25] text-white hover:bg-[#773000]"
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <svg
                  className="w-5 h-5 animate-spin mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                "Qidirish"
              )}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books?.items?.map((item) => (
            <div
              key={item.id}
              onClick={() => openModal(item.id)}
              className="cursor-pointer"
            >
              <CardPage item={item} isLoading={false} />
            </div>
          ))}
        </div>

        {books?.items?.length === 0 && (
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

        <Pagination
          page={currentPage}
          totalPages={Math.ceil((books?.totalCount || 0) / 20)}
          onPageChange={setCurrentPage}
        />
      </div>

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
