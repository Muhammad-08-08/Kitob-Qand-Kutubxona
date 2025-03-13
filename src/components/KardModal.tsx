"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import useMyStore from "@/store/my-store";
import Image from "next/image";

interface KardModalProps {
  id: number;
  isOpen: boolean;
  onClose: () => void;
}

interface Stock {
  id: number;
  busy: boolean;
}

interface Book {
  id: number;
  name: string;
  image: string;
  author: {
    name: string;
  };
  stocks: Stock[];
}

interface Status {
  id: number;
  returningDate: string;
}

const KardModal: React.FC<KardModalProps> = ({ id, isOpen, onClose }) => {
  const { isDarkMode } = useMyStore();
  const [productPage, setProductPage] = useState<Book | null>(null);
  const [qaytishi, setQaytishi] = useState<Status[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!id || !isOpen) return;

    setLoading(true);
    axios
      .get(`https://library.softly.uz/api/app/books/${id}`)
      .then((response) => {
        setProductPage(response.data);
      })
      .catch(() => {
        console.error("Xatolik yuzaga keldi");
      });

    axios
      .get(
        `https://library.softly.uz/api/app/books/${id}/statuses?locationId=1`
      )
      .then((res) => {
        setQaytishi(res.data);
      })
      .catch(() => {
        console.error("Xatolik yuzaga keldi");
      })
      .finally(() => setLoading(false));
  }, [id, isOpen]);

  const boshKitoblar = productPage?.stocks.filter((i) => !i.busy).length || 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`w-full max-w-lg bg-white dark:bg-[#1E1E1E] rounded-lg shadow-lg p-5 relative`}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-lg text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={onClose}
            >
              ✖
            </button>

            {loading || !productPage || !qaytishi ? (
              <div className="w-full flex justify-center items-center py-10">
                <p>Yuklanmoqda...</p>
              </div>
            ) : (
              <div className="text-center">
                <Image
                  src={productPage.image}
                  alt={productPage.name}
                  width={100}
                  height={150}
                  className="mx-auto rounded-lg shadow-md"
                />
                <h2 className="text-2xl font-bold mt-3">{productPage.name}</h2>
                <h4 className="text-lg font-medium mt-1">
                  Muallif: {productPage.author.name}
                </h4>

                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Kutubxonadan vaqtinchalik o‘qish uchun olish mumkin.
                </p>

                <div className="mt-4 space-y-2">
                  <p>📚 Umumiy kitoblar soni: {productPage.stocks.length}</p>
                  <p>✅ Bo'sh kitoblar: {boshKitoblar}</p>
                </div>

                <h4 className="mt-4 font-semibold">📅 Bo‘shash muddatlari:</h4>
                <div className="mt-2 space-y-2">
                  {qaytishi.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center p-2 rounded-md border border-gray-300 dark:border-gray-700"
                    >
                      <p className="font-medium">1 ta</p>
                      <p>
                        {new Date(item.returningDate).toLocaleDateString("ru")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KardModal;
