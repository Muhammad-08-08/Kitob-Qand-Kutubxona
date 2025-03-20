"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-6">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <DialogTitle>Kitob tafsilotlari</DialogTitle>
          </div>
        </DialogHeader>

        {loading || !productPage ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <Image
                src={productPage.image}
                alt={productPage.name}
                width={200}
                height={280}
                className="rounded-lg shadow-md mx-auto"
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
                    {qaytishi.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between p-2 border rounded-md"
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
        )}
      </DialogContent>
    </Dialog>
  );
};

export default KardModal;
