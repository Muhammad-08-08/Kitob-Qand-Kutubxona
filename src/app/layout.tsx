import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Kitob Qand - Bepul Kutubxona",
  description:
    "Kitob Qand - Bepul kutubxona. Kutubxonaga kelib o'zingizga kerakli kitobni kelishilgan muddatga o'qib turish uchun olib ketishingiz mumkin.",
  keywords: "kitob, kutubxona, bepul, o'qish, kitoblar",
  authors: [{ name: "Kitob Qand" }],
  openGraph: {
    title: "Kitob Qand - Bepul Kutubxona",
    description:
      "Kitob Qand - Bepul kutubxona. Kutubxonaga kelib o'zingizga kerakli kitobni kelishilgan muddatga o'qib turish uchun olib ketishingiz mumkin.",
    url: "https://kitobqand.uz",
    siteName: "Kitob Qand",
    locale: "uz_UZ",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  icons: {
    icon: "http://localhost:3000/_next/static/media/kitob_qand_logo.1b39a42f.svg",
    shortcut:
      "http://localhost:3000/_next/static/media/kitob_qand_logo.1b39a42f.svg", // brauzer yorliqlarida ishlatilishi mumkin
    apple:
      "http://localhost:3000/_next/static/media/kitob_qand_logo.1b39a42f.svg", // Apple qurilmalari uchun
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className="antialiased xl:px-24.5">
        <Navbar />
        <main>
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
