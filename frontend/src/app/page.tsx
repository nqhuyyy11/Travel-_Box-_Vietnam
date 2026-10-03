"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Compass, 
  MapPin, 
  Headphones, 
  Target, 
  ShoppingBag, 
  QrCode, 
  Sparkles, 
  Award, 
  ArrowRight, 
  ShieldCheck, 
  GraduationCap, 
  Zap, 
  Search,
  CheckCircle2, 
  Calendar,
  Users,
  ChevronDown,
  Gift,
  HelpCircle,
  Package,
  Layers,
  Heart,
  Truck,
  RotateCcw,
  Star,
  ExternalLink,
  Flame,
  Check,
  Calculator,
  Compass as CompassIcon,
  BookOpen
} from "lucide-react";

// Interactive Components
import UnboxingSimulator from "@/components/home/UnboxingSimulator";
import SoundscapePlayerDemo from "@/components/home/SoundscapePlayerDemo";
import QuickOrderModal from "@/components/home/QuickOrderModal";
import LandingNavTracker from "@/components/home/LandingNavTracker";

// Deep Experience Modules Embedded Into Single-Page
import VietnamMap from "@/components/passport/VietnamMap";
import PassportBook from "@/components/passport/PassportBook";
import CustomBoxBuilder from "@/components/shop/CustomBoxBuilder";
import QuestList from "@/components/quests/QuestList";
import BudgetCalculator from "@/components/guide/BudgetCalculator";

import { useTravelStore } from "@/store/travelStore";
import { 
  MOCK_TRAVEL_BOXES, 
  MOCK_PROVINCES, 
  MOCK_LEADERBOARD_UNIS, 
  MOCK_FEED 
} from "@/lib/mockData";

export default function HomePage() {
  const { openActivationModal } = useTravelStore();
  const [heroBg, setHeroBg] = useState<"vietnam" | "hanoi">("vietnam");
  const [passportView, setPassportView] = useState<"map" | "book">("map");
  const [regionFilter, setRegionFilter] = useState<"all" | "bac" | "trung" | "nam">("all");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedBoxIdForOrder, setSelectedBoxIdForOrder] = useState<string | undefined>(undefined);

  // Filter boxes by region
  const filteredBoxes = MOCK_TRAVEL_BOXES.filter((box) => {
    if (regionFilter === "all") return true;
    const prov = MOCK_PROVINCES.find((p) => p.code === box.provinceCode);
    if (!prov) return true;
    if (regionFilter === "bac") return prov.region === "Bắc";
    if (regionFilter === "trung") return prov.region === "Trung";
    if (regionFilter === "nam") return prov.region === "Nam";
    return true;
  });

  const handleOpenOrder = (boxId?: string) => {
    setSelectedBoxIdForOrder(boxId);
    setOrderModalOpen(true);
  };

  const faqs = [
    {
      q: "Chiếc hộp Travel Box bên trong gồm có những gì?",
      a: "Mỗi chiếc hộp Travel Box là một gói trải nghiệm văn hóa trọn vẹn gồm 5 món: (1) Mô hình 3D địa danh biểu tượng bằng gỗ hoặc kim loại tự lắp ghép; (2) Bộ 3 đặc sản OCOP chuẩn 4-5 sao truy xuất nguồn gốc; (3) Bộ bưu thiếp nghệ thuật vẽ tay độc bản; (4) Mã QR độc nhất in dập nổi dưới nắp hộp để kích hoạt Hộ Chiếu Số; (5) Trạm thuyết minh Audio Guide 3D Soundscape địa phương."
    },
    {
      q: "Chính sách ưu đãi giảm 20% cho sinh viên áp dụng như thế nào?",
      a: "Chỉ cần bạn đang là học sinh/sinh viên các trường Đại học, Cao đẳng, Học viện trên toàn quốc. Khi đặt hàng, bạn chỉ cần nhập Mã số sinh viên (hoặc đính kèm ảnh thẻ sinh viên), hệ thống sẽ tự động trừ 20% trực tiếp vào hóa đơn và miễn phí vận chuyển tận phòng Ký túc xá."
    },
    {
      q: "Mã nắp hộp kích hoạt Hộ Chiếu Số có bị giới hạn thời gian không?",
      a: "Mã định danh Unique QR in dưới nắp hộp có giá trị kích hoạt vĩnh viễn. Khi quét mã, bạn sẽ mở khóa vĩnh viễn tỉnh thành đó trên Cuốn Hộ Chiếu Số của mình, nhận con tem Hologram đóng dấu di sản, cộng điểm XP và tích lũy Travel Coins trọn đời."
    },
    {
      q: "Đặc sản OCOP bên trong có đảm bảo an toàn vệ sinh thực phẩm không?",
      a: "100% đặc sản trong Travel Box đều đạt chứng nhận OCOP 4 sao đến 5 sao cấp tỉnh/quốc gia, có tem kiểm định vệ sinh an toàn thực phẩm và mã vạch truy xuất nguồn gốc rõ ràng từ các hợp tác xã làng nghề truyền thống uy tín."
    },
    {
      q: "Travel Coins tích lũy được dùng để đổi những phần quà gì?",
      a: "Xu Travel Coins nhận được khi kích hoạt hộp quà và hoàn thành nhiệm vụ GPS thực địa có thể quy đổi trực tiếp tại 'Kho Đổi Thưởng' lấy: Voucher giảm giá vé xe khách FUTA Phương Trang, voucher giảm tiền phòng Homestay, vé tham quan danh thắng và mã giảm giá khi mua các hộp Travel Box kế tiếp."
    },
    {
      q: "Tôi có thể tự tay phối hộp quà (Custom Box) theo ý thích được không?",
      a: "Hoàn toàn được! Bạn có thể lướt tới khu vực 'Xưởng Tự Mix Quà 5 Bước' ngay trên trang này để tự chọn tỉnh thành, chọn mô hình 3D bạn thích, tự gắp 3 món đặc sản OCOP trong danh mục và tự soạn lời chúc thiệp gửi đến bạn bè, người yêu hoặc gia đình."
    }
  ];

  return (
    <div className="space-y-28 pb-24">
      {/* ================= 1. HERO SECTION ================= */}
      <section id="hero" className="relative overflow-hidden rounded-3xl mx-3 sm:mx-6 lg:mx-8 text-white pt-10 pb-20 px-4 sm:px-8 shadow-2xl shadow-sky-950/25 border border-white/20">
        {/* Background Wallpaper with Crossfade */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={heroBg === "vietnam" ? "/images/hero-vietnam-landmarks.jpg" : "/images/hero-hanoi.jpg"}
            alt="Travel Box Vietnam Background"
            className="w-full h-full object-cover object-center scale-105 transition-all duration-1000 ease-out filter brightness-[0.92] contrast-[1.05]"
          />
          {/* Deep Cinematic Blue Tint & Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#031d42]/85 via-[#022b62]/70 to-[#021836]/95 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-purple-500/15 to-amber-300/20 mix-blend-screen" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px] opacity-10" />

          {/* Glowing Orbs */}
          <div className="absolute -top-24 -right-24 w-[30rem] h-[30rem] bg-cyan-400/25 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 right-1/3 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl" />
        </div>

        {/* Top Control Bar */}
        <div className="relative z-10 flex flex-wrap justify-between items-center gap-3 mb-8 max-w-5xl mx-auto">
          {/* Slogan Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/30 text-white text-xs sm:text-sm font-bold shadow-lg backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>HỆ SINH THÁI DU LỊCH DI SẢN O2O ĐẦU TIÊN TẠI VIỆT NAM</span>
          </div>

          {/* Wallpaper Toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/20 shadow-xl">
            <button
              onClick={() => setHeroBg("vietnam")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                heroBg === "vietnam"
                  ? "bg-white text-slate-900 shadow-md scale-100"
                  : "text-white/80 hover:text-white hover:bg-white/15"
              }`}
            >
              <span>🇻🇳</span>
              <span className="hidden sm:inline">Toàn Cảnh VN</span>
            </button>
            <button
              onClick={() => setHeroBg("hanoi")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                heroBg === "hanoi"
                  ? "bg-white text-slate-900 shadow-md scale-100"
                  : "text-white/80 hover:text-white hover:bg-white/15"
              }`}
            >
              <span>🏛️</span>
              <span className="hidden sm:inline">Hà Nội Di Sản</span>
            </button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="max-w-5xl mx-auto text-center space-y-7 relative z-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.18] drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
            MỞ HỘP DI SẢN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffe066] via-[#ffd000] to-[#f59e0b] drop-shadow-md">
              ĐÓNG DẤU HỘ CHIẾU SỐ
            </span> <br />
            <span className="text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
              63 TỈNH THÀNH VIỆT NAM
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-sm sm:text-base text-sky-100/95 leading-relaxed font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Cầu nối tiên phong kết nối <strong>vật phẩm hộp quà hữu hình</strong> (mô hình 3D, đặc sản OCOP 4-5 sao) với <strong>Cuốn Hộ Chiếu Số game hóa</strong>. Thuyết minh đa phương tiện 3D soundscape, săn thử thách GPS thực địa và độc quyền <strong>giảm 20% thẻ sinh viên</strong> toàn quốc.
          </p>

          {/* Interactive CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => handleOpenOrder()}
              className="py-4 px-8 rounded-2xl bg-gradient-to-r from-[#ff5e1f] via-[#ff6a2f] to-[#f97316] hover:from-[#f44a07] hover:to-[#ea580c] text-white font-black text-sm sm:text-base shadow-xl shadow-orange-500/35 flex items-center justify-center gap-2.5 transition-all hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Đặt Hộp Quà Ngay (-20% Thẻ SV)</span>
            </button>

            <a
              href="#unboxing"
              className="py-4 px-6 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm sm:text-base border border-white/30 backdrop-blur-md shadow-lg flex items-center justify-center gap-2 transition hover:scale-105"
            >
              <Package className="w-5 h-5 text-amber-300" />
              <span>Thử Đập Hộp 3D Ảo</span>
            </a>

            <button
              onClick={() => openActivationModal()}
              className="py-4 px-6 rounded-2xl bg-slate-900/80 hover:bg-slate-900 text-amber-300 font-bold text-sm sm:text-base border border-amber-300/40 backdrop-blur-md shadow-lg flex items-center justify-center gap-2 transition hover:scale-105"
            >
              <QrCode className="w-5 h-5" />
              <span>Nhập Mã Kích Hoạt Nắp Hộp</span>
            </button>
          </div>

          {/* Key Stats Bar */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-xs font-semibold text-slate-800">
            <div className="p-3.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-white/80 flex flex-col items-center justify-center text-center hover:-translate-y-0.5 transition">
              <span className="text-xl sm:text-2xl font-black text-[#0194f3] font-mono">63 Tỉnh</span>
              <span className="text-[11px] text-slate-500">Số hóa tem & âm thanh</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-white/80 flex flex-col items-center justify-center text-center hover:-translate-y-0.5 transition">
              <span className="text-xl sm:text-2xl font-black text-[#ff5e1f] font-mono">15.000+</span>
              <span className="text-[11px] text-slate-500">Gen Z đã sở hữu Box</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-white/80 flex flex-col items-center justify-center text-center hover:-translate-y-0.5 transition">
              <span className="text-xl sm:text-2xl font-black text-amber-600 font-mono">25+ Trường ĐH</span>
              <span className="text-[11px] text-slate-500">HUST, FTU, NEU, FPT...</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-white/80 flex flex-col items-center justify-center text-center hover:-translate-y-0.5 transition">
              <span className="text-xl sm:text-2xl font-black text-emerald-600 font-mono">100% OCOP</span>
              <span className="text-[11px] text-slate-500">Chuẩn 4-5 sao chính gốc</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. PROBLEM & SOLUTION SECTION ================= */}
      <section id="o2o-story" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase text-[#ff5e1f] tracking-wider bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
            TẠI SAO LẠI LÀ TRAVEL BOX?
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
            Giải Quyết Nỗi Đau Du Lịch Thế Hệ Trẻ Bằng Mô Hình O2O Đột Phá
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Du lịch không chỉ là lướt qua vài bức ảnh check-in sống ảo vội vã. Đó là hành trình chạm tay vào di sản và lưu giữ ký ức thanh xuân trọn vẹn.
          </p>
        </div>

        {/* Contrast Grid: Old Way vs. Travel Box O2O */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* The Old Way */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200/80 shadow-sm relative overflow-hidden space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-black text-xl border border-rose-200">
                ❌
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">Du Lịch Truyền Thống</h3>
                <p className="text-xs text-slate-400">Cách đi dễ quên và tốn kém</p>
              </div>
            </div>

            <ul className="space-y-4 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">✕</span>
                <span><strong>Check-in hời hợt:</strong> Chụp vài tấm ảnh đăng mạng xã hội rồi về, không hiểu câu chuyện ngõ hẻm hay linh hồn mảnh đất.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">✕</span>
                <span><strong>Quà lưu niệm đại trà:</strong> Hàng quán chặt chém, quà lưu niệm không rõ nguồn gốc, dễ vứt xó sau chuyến đi.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">✕</span>
                <span><strong>Chi phí đắt đỏ:</strong> Sinh viên không biết chỗ ăn ngon - bổ - rẻ, thiếu công cụ dự toán ngân sách thông minh.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">✕</span>
                <span><strong>Ký ức nhạt nhòa:</strong> Không có cuốn sổ ghi chép hay kỷ vật hữu hình để khoe cùng bạn bè sau này.</span>
              </li>
            </ul>
          </div>

          {/* The Travel Box O2O Way */}
          <div className="bg-gradient-to-br from-sky-50 via-white to-amber-50 rounded-3xl p-6 sm:p-8 border-2 border-[#0194f3]/40 shadow-xl shadow-sky-500/10 relative overflow-hidden space-y-6">
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full bg-[#0194f3] text-white text-[11px] font-black uppercase tracking-wider shadow-sm">
                ĐỘT PHÁ O2O
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0194f3] text-white flex items-center justify-center font-black text-xl shadow-md shadow-sky-500/25">
                ✨
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">Kỷ Nguyên Travel Box</h3>
                <p className="text-xs text-[#0194f3] font-semibold">Kết nối Đời Thực & Không Gian Số</p>
              </div>
            </div>

            <ul className="space-y-4 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">✓</span>
                <span><strong>Vật phẩm thật trong tay (Offline):</strong> Mô hình 3D tự ráp, 3 món đặc sản OCOP 4-5 sao ăn ngon chuẩn vị và bưu thiếp nghệ thuật vẽ tay.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">✓</span>
                <span><strong>Hộ Chiếu Số Game Hóa (Online):</strong> Quét mã nắp hộp mở khóa bản đồ 63 tỉnh, đóng mộc đỏ tem di sản Hologram rực rỡ.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">✓</span>
                <span><strong>Thuyết minh 3D Soundscape:</strong> Bộ trộn 2 kênh âm thanh độc bản (tiếng sóng, tiếng khèn, chuông chùa) nghe chill mọi lúc mọi nơi.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">✓</span>
                <span><strong>Đặc quyền Thẻ Sinh Viên:</strong> Giảm 20% trọn đời, tích xu đổi voucher vé xe khách Phương Trang và phòng homestay.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= 3. UNBOXING SIMULATOR 3D ================= */}
      <section id="unboxing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <UnboxingSimulator />
      </section>

      {/* ================= 4. MAP & PASSPORT INTERACTIVE SHOWCASE ================= */}
      <section id="map-passport" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase text-[#0194f3] tracking-wider bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
            TRẢI NGHIỆM ĐỒNG BỘ 63 TỈNH THÀNH
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Bản Đồ Di Sản & Cuốn Hộ Chiếu Số Game Hóa
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Khám phá 63 tỉnh thành Việt Nam, tương tác trực tiếp trên bản đồ SVG và lật cuốn hộ chiếu đóng mộc tem đỏ
          </p>

          {/* Toggle Tab between Map and Passport Book */}
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 shadow-inner mt-2">
            <button
              onClick={() => setPassportView("map")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                passportView === "map"
                  ? "bg-gradient-to-r from-[#0194f3] to-[#0264c8] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <CompassIcon className="w-4 h-4" />
              <span>Bản Đồ SVG 63 Tỉnh Thành</span>
            </button>
            <button
              onClick={() => setPassportView("book")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                passportView === "book"
                  ? "bg-gradient-to-r from-[#0194f3] to-[#0264c8] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Cuốn Hộ Chiếu & Bộ Tem Số</span>
            </button>
          </div>
        </div>

        {/* Embedded Interactive Container */}
        <div className="bg-slate-50/70 p-4 sm:p-8 rounded-3xl border border-slate-200/80">
          {passportView === "map" ? (
            <VietnamMap provinces={MOCK_PROVINCES} />
          ) : (
            <PassportBook />
          )}
        </div>
      </section>

      {/* ================= 5. LIVE SOUNDSCAPE TEASER ================= */}
      <section id="soundscape" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SoundscapePlayerDemo />
      </section>

      {/* ================= 6. CUSTOM BOX STUDIO (XƯỞNG TỰ MIX QUÀ) ================= */}
      <section id="custom-studio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase text-[#ff5e1f] tracking-wider bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
            TỰ DO PHỐI QUÀ THEO Ý BẠN
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Xưởng Tự Mix Hộp Quà 5 Bước (Custom Studio)
          </h2>
          <p className="text-xs text-slate-500">
            Chọn tỉnh ➔ Chọn mô hình 3D ➔ Chọn 3 đặc sản OCOP ➔ Soạn thiệp chúc ➔ Quét mã VietQR nhận hộp quà độc bản
          </p>
        </div>

        {/* Embedded Custom Box Builder */}
        <div className="bg-slate-50/70 p-4 sm:p-8 rounded-3xl border border-slate-200/80">
          <CustomBoxBuilder />
        </div>
      </section>

      {/* ================= 7. GPS QUESTS & MISSIONS ================= */}
      <section id="quests" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase text-emerald-600 tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            GAMIFICATION DI SẢN THỰC ĐỊA
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Săn Nhiệm Vụ GPS & Đua Top Trường Đại Học
          </h2>
          <p className="text-xs text-slate-500">
            Đến tận nơi di sản thật, check-in tọa độ vệ tinh GPS và giải mật thư dưới nắp hộp để tích lũy XP
          </p>
        </div>

        {/* Embedded Quests Component */}
        <div className="bg-slate-50/70 p-4 sm:p-8 rounded-3xl border border-slate-200/80">
          <QuestList />
        </div>
      </section>

      {/* ================= 8. BUDGET ESTIMATOR ================= */}
      <section id="budget-calc" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase text-[#0194f3] tracking-wider bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
            CÔNG CỤ THÔNG MINH CHO PHƯỢT THỦ
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Máy Tính Dự Toán Ngân Sách Sinh Viên
          </h2>
          <p className="text-xs text-slate-500">
            Kéo thả số người & số ngày đi để tự động dự toán chi phí trọn gói (xe khách, homestay, ăn uống) không lo bị chặt chém
          </p>
        </div>

        {/* Embedded Budget Calculator */}
        <div className="bg-slate-50/70 p-4 sm:p-8 rounded-3xl border border-slate-200/80">
          <BudgetCalculator />
        </div>
      </section>

      {/* ================= 9. FEATURED COLLECTION ================= */}
      <section id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#ff5e1f] text-xs font-bold">
              <Flame className="w-3.5 h-3.5" />
              <span>BỘ SƯU TẬP ĐỘC QUYỀN TRAVEL BOX</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Chọn Tỉnh Thành Để Bắt Đầu Hành Trình
            </h2>
            <p className="text-xs text-slate-500">
              Mỗi hộp quà đều gồm mô hình 3D, đặc sản OCOP chính gốc, bưu thiếp và mã kích hoạt Hộ Chiếu Số
            </p>
          </div>

          {/* Region Tabs */}
          <div className="inline-flex items-center p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setRegionFilter("all")}
              className={`px-3 py-1.5 rounded-xl transition ${regionFilter === "all" ? "bg-white text-[#0194f3] shadow-xs" : "text-slate-600 hover:text-slate-900"}`}
            >
              Tất Cả
            </button>
            <button
              onClick={() => setRegionFilter("bac")}
              className={`px-3 py-1.5 rounded-xl transition ${regionFilter === "bac" ? "bg-white text-[#0194f3] shadow-xs" : "text-slate-600 hover:text-slate-900"}`}
            >
              Miền Bắc
            </button>
            <button
              onClick={() => setRegionFilter("trung")}
              className={`px-3 py-1.5 rounded-xl transition ${regionFilter === "trung" ? "bg-white text-[#0194f3] shadow-xs" : "text-slate-600 hover:text-slate-900"}`}
            >
              Miền Trung
            </button>
            <button
              onClick={() => setRegionFilter("nam")}
              className={`px-3 py-1.5 rounded-xl transition ${regionFilter === "nam" ? "bg-white text-[#0194f3] shadow-xs" : "text-slate-600 hover:text-slate-900"}`}
            >
              Miền Nam
            </button>
          </div>
        </div>

        {/* Boxes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBoxes.map((box) => (
            <div
              key={box.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={box.image}
                    alt={box.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#ff5e1f] text-white font-bold text-[10px] uppercase shadow-sm">
                      {box.tag}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white font-bold text-[10px] shadow-sm">
                      OCOP 4-5★
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-white/95 text-amber-700 font-bold text-[10px] shadow-sm border border-slate-200/60">
                      ⭐ {box.rating} ({box.reviewsCount})
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-[#0194f3] uppercase tracking-wider">
                      📍 {box.provinceName}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-[#0194f3] transition-colors mt-0.5">
                      {box.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {box.description}
                  </p>

                  {/* Highlights list */}
                  <div className="bg-slate-50 rounded-xl p-3 space-y-1.5 text-[11px] text-slate-600 border border-slate-100">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Package className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="truncate">{box.contents.model3D}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">{box.contents.snacks.join(" • ")}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-3">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 line-through block">
                      {box.originalPrice.toLocaleString()}đ
                    </span>
                    <span className="text-lg font-black text-[#ff5e1f] font-mono">
                      {box.studentPrice.toLocaleString()}đ
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Thẻ SV -{box.discountPercent}%</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleOpenOrder(box.id)}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#ff5e1f] to-[#f97316] hover:from-[#f44a07] hover:to-[#ea580c] text-white font-extrabold text-xs text-center shadow-xs transition active:scale-95"
                  >
                    Đặt Nhanh VietQR
                  </button>

                  <a
                    href="#custom-studio"
                    className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-[#0194f3] font-bold text-xs text-center border border-slate-200 transition"
                  >
                    Tự Phối Lại Box
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 10. PRICING & STUDENT PERKS ================= */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase text-[#ff5e1f] tracking-wider">
            BẢNG GIÁ & ĐẶC QUYỀN SINH VIÊN
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Chi Phí Tối Ưu Cho Mọi Phượt Thủ Gen Z
          </h2>
          <p className="text-xs text-slate-500">
            Cam kết giá minh bạch, giảm 20% thẻ sinh viên toàn quốc và miễn phí giao hàng ký túc xá
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Package 1 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                GÓI KHÁM PHÁ THỬ
              </span>
              <h3 className="text-xl font-black text-slate-900">Solo Explorer</h3>
              <p className="text-xs text-slate-500">
                Lựa chọn lý tưởng cho chuyến đi đầu tiên hoặc quà tặng lưu niệm 1 tỉnh thành.
              </p>

              <div className="pt-2">
                <span className="text-xs text-slate-400 line-through block">289.000đ</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900 font-mono">239.000đ</span>
                  <span className="text-xs text-slate-500 font-normal">/ 1 Hộp</span>
                </div>
                <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Thẻ SV giảm -50.000đ
                </span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600 pt-4 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>01 Hộp quà Travel Box tự chọn</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>01 Mô hình 3D gỗ/kim loại tự ráp</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>03 Đặc sản OCOP 4-5 sao chính gốc</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Mã QR nắp hộp mở khóa Hộ Chiếu Số</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Tặng +250 Travel Coins tích lũy</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleOpenOrder()}
              className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition"
            >
              Chọn Gói Solo (239k)
            </button>
          </div>

          {/* Package 2 (Best Seller) */}
          <div className="bg-gradient-to-b from-[#0194f3]/5 via-white to-amber-500/5 rounded-3xl p-6 sm:p-8 border-2 border-[#ff5e1f] shadow-xl shadow-orange-500/10 flex flex-col justify-between space-y-6 relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-[#ff5e1f] to-[#f97316] text-white text-[11px] font-black uppercase tracking-wider shadow-md">
                COMBO ĐƯỢC CHỌN NHIỀU NHẤT ⭐
              </span>
            </div>

            <div className="space-y-4 pt-2">
              <span className="text-xs font-bold text-[#ff5e1f] uppercase tracking-wider block">
                GÓI PHƯỢT THỦ XUYÊN VIỆT
              </span>
              <h3 className="text-xl font-black text-slate-900">Combo 3 Tỉnh Thành</h3>
              <p className="text-xs text-slate-500">
                Dành cho hội bạn thân hoặc những ai đam mê cắm cờ xuyên 3 miền Bắc - Trung - Nam.
              </p>

              <div className="pt-2">
                <span className="text-xs text-slate-400 line-through block">869.000đ</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-[#ff5e1f] font-mono">649.000đ</span>
                  <span className="text-xs text-slate-500 font-normal">/ 3 Hộp</span>
                </div>
                <span className="inline-block mt-1 text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded border border-orange-200">
                  Tiết kiệm ngay 220.000đ (Thẻ SV)
                </span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 pt-4 border-t border-slate-200/60 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>03 Hộp quà Travel Box</strong> tùy chọn 3 miền</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Tặng Túi Tote Canvas Di Sản</strong> phiên bản giới hạn</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Bộ 15 bưu thiếp nghệ thuật vẽ tay</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>03 Mã QR độc nhất mở 3 tỉnh trên Bản Đồ Số</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Tặng +1.000 Travel Coins</strong> đổi vé xe Phương Trang</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Miễn phí vận chuyển hỏa tốc toàn quốc</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleOpenOrder()}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ff5e1f] via-[#ff6a2f] to-[#f97316] hover:from-[#f44a07] hover:to-[#ea580c] text-white font-black text-xs sm:text-sm shadow-md shadow-orange-500/25 transition active:scale-95"
            >
              Đặt Combo 3 Hộp (649k)
            </button>
          </div>

          {/* Package 3 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                GÓI CÁ NHÂN HÓA 100%
              </span>
              <h3 className="text-xl font-black text-slate-900">Xưởng Tự Mix Quà</h3>
              <p className="text-xs text-slate-500">
                Tự tay chọn từng chi tiết để tạo nên chiếc hộp độc bản mang dấu ấn riêng.
              </p>

              <div className="pt-2">
                <span className="text-xs text-slate-400 block font-medium">Giá tính theo vật phẩm</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900 font-mono">Từ 219k</span>
                  <span className="text-xs text-slate-500 font-normal">/ Hộp tự mix</span>
                </div>
                <span className="inline-block mt-1 text-[10px] font-bold text-blue-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                  Vẫn giảm 20% khi có Thẻ SV
                </span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600 pt-4 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Tự chọn tỉnh thành yêu thích</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Tự gắp 1 mô hình 3D trong bộ sưu tập</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Tự chọn 3 đặc sản OCOP hợp khẩu vị</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Tự soạn thiệp chúc & thư tay riêng</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Kèm mã nắp hộp kích hoạt số trọn đời</span>
                </li>
              </ul>
            </div>

            <a
              href="#custom-studio"
              className="w-full py-3 rounded-xl bg-slate-100 hover:bg-sky-50 text-[#0194f3] hover:text-[#0264c8] font-bold text-xs transition text-center block"
            >
              Vào Xưởng Tự Phối Ngay
            </a>
          </div>
        </div>
      </section>

      {/* ================= 11. LEADERBOARD & SOCIAL PROOF ================= */}
      <section id="community" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase text-[#ff5e1f] tracking-wider">
            CỘNG ĐỒNG & BẢNG XẾP HẠNG
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Hơn 25 Trường Đại Học Đang Tranh Đua Điểm Di Sản
          </h2>
          <p className="text-xs text-slate-500">
            Mỗi hộp quà được kích hoạt sẽ cộng điểm trực tiếp vào bảng vàng danh dự của trường bạn
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Top Universities Table */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-slate-900 text-sm">Top Trường Đại Học Dẫn Đầu</h3>
              </div>
              <span className="text-[11px] font-bold text-slate-400">Mùa Giải 2026</span>
            </div>

            <div className="space-y-2.5">
              {MOCK_LEADERBOARD_UNIS.map((uni) => (
                <div
                  key={uni.rank}
                  className={`p-3 rounded-2xl flex items-center justify-between transition ${
                    uni.rank === 1
                      ? "bg-amber-50/80 border border-amber-200"
                      : "bg-slate-50 hover:bg-slate-100/80 border border-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs ${
                        uni.rank === 1
                          ? "bg-amber-400 text-amber-950 shadow-xs"
                          : uni.rank === 2
                          ? "bg-slate-300 text-slate-800"
                          : uni.rank === 3
                          ? "bg-amber-700 text-white"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {uni.rank}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 block line-clamp-1">
                        {uni.name}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {uni.travelersCount} phượt thủ sinh viên
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-black text-[#0194f3] font-mono">
                    {uni.points.toLocaleString()} XP
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Real Reviews & Feedbacks */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-base">
                Sinh Viên Cả Nước Nói Gì Về Travel Box?
              </h3>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>4.9 / 5.0 (1.200+ đánh giá)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MOCK_FEED.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.avatar}
                        alt={post.authorName}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <span className="text-xs font-black text-slate-900 block">
                          {post.authorName}
                        </span>
                        <span className="text-[10px] text-[#ff5e1f] font-semibold">
                          {post.authorUniversity}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed italic line-clamp-4">
                      &ldquo;{post.caption}&rdquo;
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-bold text-[#0194f3]">📍 {post.province}</span>
                    <span>Đã xác thực thẻ SV</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 12. FAQ ACCORDION ================= */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase text-[#ff5e1f] tracking-wider">
            GIẢI ĐÁP THẮC MẮC
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Những Câu Hỏi Thường Gặp
          </h2>
          <p className="text-xs text-slate-500">
            Tất cả những gì bạn cần biết về trải nghiệm hộp quà Travel Box Vietnam
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-[#0194f3] transition"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#ff5e1f] shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100/80 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= 13. FINAL CALL TO ACTION ================= */}
      <section id="cta-final" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#021836] via-[#022b62] to-[#01142e] text-white p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl border border-white/20 space-y-6">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="px-3.5 py-1.5 rounded-full bg-white/15 border border-white/30 text-amber-300 text-xs font-bold inline-block backdrop-blur-md">
              ⚡ ƯU ĐÃI ĐẦU MÙA DU LỊCH 2026
            </span>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Bạn Đã Sẵn Sàng Mở Hộp Di Sản Đầu Tiên?
            </h2>

            <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed font-medium">
              Cùng hơn 15.000 sinh viên cả nước cắm cờ và đóng dấu đủ 63 tỉnh thành Việt Nam. Nhận ngay chiết khấu 20% thẻ sinh viên và quà tặng giới hạn hôm nay!
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => handleOpenOrder()}
                className="py-4 px-8 rounded-2xl bg-gradient-to-r from-[#ff5e1f] via-[#ff6a2f] to-[#f97316] hover:from-[#f44a07] hover:to-[#ea580c] text-white font-black text-sm sm:text-base shadow-xl shadow-orange-500/35 transition hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Đặt Mua Travel Box Ngay (-20%)</span>
              </button>

              <a
                href="#custom-studio"
                className="py-4 px-6 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm sm:text-base border border-white/30 backdrop-blur-md transition hover:scale-105"
              >
                <span>Xưởng Tự Phối Quà Riêng</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Bottom Navigation Tracker */}
      <LandingNavTracker />

      {/* Quick Order Modal */}
      <QuickOrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        defaultBoxId={selectedBoxIdForOrder}
      />
    </div>
  );
}
