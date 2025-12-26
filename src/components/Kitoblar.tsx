"use client";

import useMyStore from "@/store/my-store";
import { useState } from "react";
import { useBooks } from "../../hooks/useBooks";
import CardPage from "./CardPage";
import KardDrawer from "./KardModal";
import CardSkeleton from "./library/CardSkeleton";
import { TopMenuType } from "./Type.User";

const Kitoblar: React.FC<{ initialData: TopMenuType }> = ({ initialData }) => {
  const { isDarkMode } = useMyStore();

  const [inputSearchValue, setInputSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | undefined>();
  const [busy, setBusy] = useState<boolean | null>(null);

  const headers = {
    library: "16",
  };

  /** 🔹 React Query */
  const { data, isLoading, isFetching } = useBooks({
    page: currentPage,
    q: inputSearchValue,
    busy,
    headers,
  });

  const books: TopMenuType = data ?? initialData;

  /** 🔹 Pagination hisoblari */
  const totalItems = books?.totalCount ?? 0;
  const limit = 20;
  const totalPages = Math.ceil(totalItems / limit);

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

        {/* FILTER + SEARCH */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Barchasi", value: null },
              { label: "Bo'sh", value: false },
              { label: "Band", value: true },
            ].map((filter) => (
              <button
                key={filter.label}
                className={`px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base transition-all duration-300 cursor-pointer ${
                  busy === filter.value
                    ? "bg-[#773000] text-white"
                    : isDarkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => {
                  setBusy(filter.value);
                  setCurrentPage(1);
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setCurrentPage(1);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="search"
              value={inputSearchValue}
              onChange={(e) => setInputSearchValue(e.currentTarget.value)}
              placeholder="Kitob qidirish..."
              className={`w-full px-4 py-2 rounded-md border ${
                isDarkMode
                  ? "bg-gray-800 text-gray-200 border-gray-700"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
            />

            <button
              type="submit"
              disabled={isFetching}
              className={`px-4 py-2 rounded-md font-medium ${
                isFetching ? "opacity-50" : ""
              } bg-[#5B2C25] text-white`}
            >
              {isFetching ? "..." : "Qidirish"}
            </button>
          </form>
        </div>

        {/* BOOKS */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading || isFetching
            ? Array.from({ length: 20 }).map((_, i) => <CardSkeleton key={i} />)
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

        {/* EMPTY */}
        {books?.items?.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            Hech qanday kitob topilmadi
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 border rounded cursor-pointer"
            >
              Oldingi
            </button>

            <span>
              {currentPage} / {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 border rounded cursor-pointer"
            >
              Keyingi
            </button>
          </div>
        )}
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
