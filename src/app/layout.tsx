import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import Providers from "./providers";
import "nprogress/nprogress.css";
import "./globals.css";
import RouteProgress from "@/components/RouteProgress";
import Script from "next/script";

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
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico", // favicon faylingiz shu joyda bo'lishi kerak
    },
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png", // Apple qurilmalari uchun
      sizes: "180x180",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
        (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
        })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=106041016', 'ym');

        ym(106041016, 'init', {ssr:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
      `,
          }}
        />
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/106041016"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </head>
      <body className="antialiased xl:px-24.5">
        <Navbar />
        <main>
          <RouteProgress />
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
