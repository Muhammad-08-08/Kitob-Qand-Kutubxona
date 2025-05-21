"use client";

import { useState } from "react";
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

  const fetchBookDetails = async () => {
    if (!id || !isOpen) return;

    setLoading(true);
    try {
      const [bookResponse, statusResponse] = await Promise.all([
        fetch(`https://library.softly.uz/api/app/books/${id}`),
        fetch(`https://library.softly.uz/api/app/books/${id}/statuses?locationId=1`)
      ]);

      const bookData = await bookResponse.json();
      const statusData = await statusResponse.json();

      setProductPage(bookData);

      const groupedDates = statusData.reduce(
        (acc: Record<string, number>, item: Status) => {
          const date = new Date(item.returningDate).toLocaleDateString("ru");
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        },
        {}
      );
      setQaytishi(Object.keys(groupedDates).length > 0 ? groupedDates : null);
    } catch (error) {
      console.error("Ma'lumotlarni yuklashda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  useState(() => {
    fetchBookDetails();
  });

  const boshKitoblar = productPage?.stocks.filter((i) => !i.busy).length || 0;

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="w-full h-full mx-auto px-6 rounded-t-2xl shadow-lg">
        <DrawerHeader className="mb-0 p-0">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="cursor-pointer"
              aria-label="Yopish"
            >
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
            <div className="w-full h-[50vh] md:w-1/3 md:h-[65vh] flex justify-center">
              <Image
                src={productPage.image || "/fallback-image.jpg"}
                alt={productPage.name}
                width={340}
                height={440}
                className="rounded-lg shadow-md"
                priority
              />
            </div>
            <div className="flex-1 space-y-3">
              <h2 className="text-2xl font-bold">{productPage.name}</h2>
              <h4 className="text-lg font-medium">
                Muallif: {productPage.author.name}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Kutubxonamizdan vaqtincha olib o'qishingiz mumkin.
              </p>
              <div className="mt-4 space-y-2">
                <p>📚 Umumiy kitoblar: {productPage.stocks.length}</p>
                <p>📖 Bo'sh kitoblar: {boshKitoblar}</p>
              </div>
              {qaytishi && (
                <div className="mt-4">
                  <h4 className="font-semibold">📅 Bo'sh muddatlar:</h4>
                  <div className="space-y-2 mt-2 md:w-[35%]">
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