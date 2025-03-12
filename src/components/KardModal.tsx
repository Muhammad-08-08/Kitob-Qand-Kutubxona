"use client";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { message, Spin, Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import useMyStore from "../store/my-store";
import Image from "next/image";

interface ProductPageProps {
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

const KardModal: React.FC<ProductPageProps> = ({ id, isOpen, onClose }) => {
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
        message.error("Xatolik yuzaga keldi");
      });

    axios
      .get(
        `https://library.softly.uz/api/app/books/${id}/statuses?locationId=1`
      )
      .then((res) => {
        setQaytishi(res.data);
      })
      .catch(() => {
        message.error("Xatolik yuzaga keldi");
      })
      .finally(() => setLoading(false));
  }, [id, isOpen]);

  const boshKitoblar = productPage?.stocks.filter((i) => !i.busy).length || 0;

  return (
    <Modal open={isOpen} onCancel={onClose} footer={null} width={700}>
      {loading || !productPage || !qaytishi ? (
        <div className="w-full flex justify-center items-center py-10">
          <Spin size="large" />
        </div>
      ) : (
        <div
          className={`shadow-md py-5 px-5 ${
            isDarkMode
              ? "bg-[#1E1E1E] text-[#EDEDED]"
              : "bg-[#FDF7F5] text-[#5B2C25]"
          }`}
        >
          <div className="flex gap-3 items-center border-b border-gray-400 dark:border-gray-600 mb-4 pb-2">
            <ArrowLeftOutlined onClick={onClose} className="cursor-pointer" />
            <h3 className="text-xl font-medium">Kitob</h3>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Image
                src={productPage.image}
                alt={productPage.name}
                width={48}
                height={48}
                className="w-full md:w-48 h-auto rounded-lg shadow"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3">{productPage.name}</h2>
              <h4 className="text-lg font-medium mb-2">
                Muallif: {productPage.author.name}
              </h4>
              <p className="mb-3">
                Kitobni kutubxonamizdan bepul vaqtinchalik o'qib turish uchun
                olishingiz mumkin.
              </p>
              <div className="space-y-2">
                <h4 className="text-md font-medium">
                  Umumiy kitoblar soni: {productPage.stocks.length}
                </h4>
                <h4 className="text-md font-medium">
                  Bo'sh kitoblar: {boshKitoblar}
                </h4>
              </div>
              <div className="mt-4">
                <h4 className="text-md font-semibold mb-2">
                  📅 Bo'shash muddatlari:
                </h4>
                <div className="space-y-2">
                  {qaytishi.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 p-2 rounded-md shadow-sm border border-gray-300 dark:border-gray-700"
                    >
                      <p className="font-medium">1 ta</p>
                      <span className="flex-1 border-b border-dashed border-gray-400 dark:border-gray-600"></span>
                      <p>
                        {new Date(item.returningDate).toLocaleString("ru", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default KardModal;
