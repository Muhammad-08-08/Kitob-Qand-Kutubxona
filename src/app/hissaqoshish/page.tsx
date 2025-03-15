"use client";

import { BsTelegram } from "react-icons/bs";
import { useState } from "react";
import Link from "next/link";
import useMyStore from "@/store/my-store";

const HissaQoshish: React.FC = () => {
  const cardNumber = "9860 0901 0651 4061";
  const [copied, setCopied] = useState<boolean>(false);
  const { isDarkMode } = useMyStore();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cardNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`container mx-auto p-5 ${
        isDarkMode
          ? "bg-[#1E1E1E] text-[#FDF7F5]"
          : "bg-[#FDF7F5] text-[#5B2C25]"
      }`}
    >
      <div
        className={`rounded-lg shadow-md p-6 border max-w-2xl mx-auto ${
          isDarkMode
            ? "bg-[#1E1E1E] text-[#EDEDED] border-gray-700"
            : "bg-[#FFF6F0] text-[#4A1E17] border-gray-300"
        }`}
      >
        <div className="text-center">
          <a
            href="https://t.me/kutubxona_hissadorlari"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 text-lg font-semibold flex justify-center items-center gap-2"
          >
            Kutubxona hissadorlari <BsTelegram size={24} />
          </a>
        </div>

        <h3 className="text-xl font-bold mt-4 text-center">
          Бепул кутубхонага ҳисса қўшиш
        </h3>

        <div className="mt-4 text-center">
          <h4 className="text-lg font-semibold">Карта:</h4>
          <p className="text-lg font-mono">{cardNumber}</p>
          <button
            onClick={copyToClipboard}
            className="mt-2 px-3 py-1 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          >
            {copied ? "Nusxalandi!" : "Nusxalash"}
          </button>
          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            (Мирхошимов. И.)
          </p>
        </div>

        <p
          className={`mt-4 text-center ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Картага пул юборсангиз
          <a
            href="https://t.me/kutubxona_hissadorlari"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 font-medium"
          >
            @kutubxona_hissadorlari
          </a>
          &nbsp;каналида дарҳол кўринади. Текшириб олишингиз мумкин.
        </p>

        <div className="mt-6 text-center">
          <p className="font-medium">
            - Айни вақтда кутубхонадан олиб ўқилган китоблар сони 32 мингдан
            ошди!
          </p>
          <p className="font-medium">
            - Айни вақтда 1300 дан кўп китоб ўқилмоқда (05.06.2024)
          </p>
          <Link href="/statistika">
            <p className="text-blue-500 underline mt-2 block">(Батафсил)</p>
          </Link>
        </div>

        <div
          className={`mt-6 text-center p-4 rounded-lg ${
            isDarkMode
              ? "bg-[#2D2D2D] text-gray-300"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          <h4 className="text-lg font-semibold">Мақсадимиз:</h4>
          <p>
            Илмли инсонларни кўпайтириш, тўғри диний илимни инсонларга етказиб,
            шу билан Аллоҳ розилигига етиш.
          </p>
        </div>

        <div
          className={`mt-6 text-center p-4 rounded-lg ${
            isDarkMode ? "bg-[#333] text-gray-300" : "bg-gray-200 text-gray-800"
          }`}
        >
          <h4 className="text-lg font-semibold">Қуръони Каримдан оят:</h4>
          <p>
            &lsquo;Молларини кечасию кундузи яширин ва ошкора нафақа
            қиладиганларнинг ажрлари Робблари ҳузуридадир. Уларга хавф йўқ ва
            улар маҳзун ҳам бўлмаслар.&lsquo;
          </p>
          <p className="mt-2">
            (Бақара сураси, 274-оят) — &laquo;Тафсири ҳилол&raquo; китобидан
          </p>
        </div>

        <div className="mt-6 text-center">
          <h4 className="text-lg font-semibold">Ҳомийлик:</h4>
          <a
            href="https://t.me/ibrohim_mirxoshimov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 font-medium"
          >
            @ibrohim_mirxoshimov
          </a>
        </div>

        <p
          className={`text-center mt-4 ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Эҳсон ҳисоботларини
          <a
            href="https://t.me/kutubxona_hissadorlari"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 font-medium"
          >
            @kutubxona_hissadorlari
          </a>
          &nbsp;каналида бериб борамиз.
        </p>
      </div>
    </div>
  );
};

export default HissaQoshish;
