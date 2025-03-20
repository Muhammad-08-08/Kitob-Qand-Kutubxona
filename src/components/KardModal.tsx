"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
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

const KardDrawer: React.FC<KardModalProps> = ({ id, isOpen, onClose }) => {
  const { isDarkMode } = useMyStore();
  const [productPage, setProductPage] = useState<Book | null>(null);
  const [qaytishi, setQaytishi] = useState<Record<string, number> | null>(null);
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
      .then((res) => {
        const groupedDates = res.data.reduce(
          (acc: Record<string, number>, item: Status) => {
            const date = new Date(item.returningDate).toLocaleDateString("ru");
            acc[date] = (acc[date] || 0) + 1;
            return acc;
          },
          {}
        );
        setQaytishi(Object.keys(groupedDates).length > 0 ? groupedDates : null);
      })
      .catch(() => console.error("Xatolik yuzaga keldi"))
      .finally(() => setLoading(false));
  }, [id, isOpen]);

  const boshKitoblar = productPage?.stocks.filter((i) => !i.busy).length || 0;

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[95vh] max-w-3xl w-full mx-auto px-6 rounded-t-2xl shadow-lg ">
        <DrawerHeader>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <DrawerTitle>Kitob tafsilotlari</DrawerTitle>
          </div>
        </DrawerHeader>

        {loading || !productPage ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6 py-4 overflow-y-auto">
            <div className="w-full h-[50vh] md:w-1/3 flex justify-center">
              <Image
                src={productPage.image}
                alt={productPage.name}
                width={240}
                height={340}
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="flex-1 space-y-3">
              <h2 className="text-2xl font-bold">{productPage.name}</h2>
              <h4 className="text-lg font-medium">
                Muallif: {productPage.author.name}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Kutubxonamizdan vaqtincha olib o‘qishingiz mumkin.
              </p>
              <div className="mt-4 space-y-2">
                <p>📚 Umumiy kitoblar: {productPage.stocks.length}</p>
                <p>📖 Bo‘sh kitoblar: {boshKitoblar}</p>
              </div>
              {qaytishi && (
                <div className="mt-4">
                  <h4 className="font-semibold">📅 Bo‘sh muddatlar:</h4>
                  <div className="space-y-2 mt-2">
                    {Object.entries(qaytishi).map(([date, count]) => (
                      <div
                        key={date}
                        className={`flex justify-between p-2 border rounded-md ${
                          isDarkMode ? "border-gray-700" : "border-gray-300"
                        }`}
                      >
                        <p>{count} ta</p>
                        <p>{date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default KardDrawer;
