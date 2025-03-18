"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
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
      .then((response) => setProductPage(response.data))
      .catch(() => console.error("Xatolik yuzaga keldi"));

    axios
      .get(
        `https://library.softly.uz/api/app/books/${id}/statuses?locationId=1`
      )
      .then((res) => setQaytishi(res.data.length > 0 ? res.data : null))
      .catch(() => console.error("Xatolik yuzaga keldi"))
      .finally(() => setLoading(false));
  }, [id, isOpen]);

  const boshKitoblar = productPage?.stocks.filter((i) => !i.busy).length || 0;

  return (
    <div
      className={`fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-end transition-opacity ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={onClose}
    >
      <div
        className={`w-full max-w-[1000px] h-[80vh] overflow-y-auto ${
          isDarkMode
            ? "bg-[#1E1E1E] text-[#EDEDED]"
            : "bg-[#FDF7F5] text-[#5B2C25]"
        } p-5 rounded-t-2xl shadow-lg transition-transform transform ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {loading || !productPage ? (
          <div className="w-full flex justify-center items-center py-10">
            Yuklanmoqda...
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 border-b pb-3 mb-4">
              <ArrowLeft className="cursor-pointer" onClick={onClose} />
              <h3 className="text-xl font-medium">Kitob</h3>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full h-[60vh] md:w-[250px] flex justify-center">
                <Image
                  src={productPage.image}
                  alt={productPage.name}
                  width={250}
                  height={250}
                  className="rounded-lg shadow"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{productPage.name}</h2>
                <h4 className="text-lg font-medium">
                  Muallif: {productPage.author.name}
                </h4>
                <p className="mt-2">
                  Kutubxonamizdan vaqtincha olib o&#39;qishingiz mumkin.
                </p>
                <div className="mt-4 space-y-2">
                  <p>📚 Umumiy kitoblar: {productPage.stocks.length}</p>
                  <p>📖 Bo&#39;sh kitoblar: {boshKitoblar}</p>
                </div>
                {qaytishi && (
                  <div className="mt-4">
                    <h4 className="font-semibold">📅 Bo&#39;sh muddatlar:</h4>
                    <div className="space-y-2 mt-2">
                      {qaytishi.map((item) => (
                        <div
                          key={item.id}
                          className={`flex justify-between p-2 border rounded-md ${
                            isDarkMode ? "border-gray-700" : "border-gray-300"
                          }`}
                        >
                          <p>1 ta</p>
                          <p>
                            {new Date(item.returningDate).toLocaleDateString(
                              "ru"
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KardModal;
