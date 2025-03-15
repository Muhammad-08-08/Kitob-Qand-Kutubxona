import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased xl:px-24.5">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
