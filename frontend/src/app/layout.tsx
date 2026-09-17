import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ActivationModal from "@/components/passport/ActivationModal";

export const metadata: Metadata = {
  title: "Travel Box Vietnam - Hộ Chiếu Số & Du Lịch Văn Hóa O2O Cho Gen Z",
  description: "Hệ sinh thái du lịch O2O tiên phong kết hợp vật phẩm hộp quà hữu hình và trải nghiệm số game hóa 63 tỉnh thành Việt Nam dành cho Gen Z và sinh viên.",
  keywords: ["Travel Box Vietnam", "Hộ Chiếu Số", "Du Lịch Di Sản", "O2O Vietnam", "Gen Z Phượt", "Du lịch sinh viên"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="dark scroll-smooth">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
        <Navbar />
        <main className="flex-1 pt-20 pb-16">
          {children}
        </main>
        <Footer />
        <ActivationModal />
      </body>
    </html>
  );
}
