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
  Users
} from "lucide-react";
import UnboxingSimulator from "@/components/home/UnboxingSimulator";
import { useTravelStore } from "@/store/travelStore";
import { MOCK_TRAVEL_BOXES, MOCK_PROVINCES } from "@/lib/mockData";

export default function HomePage() {
  const { openActivationModal } = useTravelStore();
  const [activeHeroTab, setActiveHeroTab] = useState<"passport" | "shop" | "quests" | "audio">("passport");
  const [searchProvince, setSearchProvince] = useState("");

  const filteredBoxes = searchProvince
    ? MOCK_TRAVEL_BOXES.filter(b => b.provinceName.toLowerCase().includes(searchProvince.toLowerCase()))
    : MOCK_TRAVEL_BOXES;

  const [heroBg, setHeroBg] = useState<"vietnam" | "hanoi">("vietnam");

  return (
    <div className="space-y-16 pb-12">
      {/* 1. Hero Section: Gamma AI Presentation Backdrop with Vietnam Heritage Montage */}
      <section className="relative overflow-hidden rounded-3xl mx-3 sm:mx-6 lg:mx-8 text-white pt-10 pb-16 px-4 sm:px-8 shadow-2xl shadow-sky-950/20 border border-white/20">
        {/* Background Wallpaper with Crossfade */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={heroBg === "vietnam" ? "/images/hero-vietnam-landmarks.jpg" : "/images/hero-hanoi.jpg"}
            alt={heroBg === "vietnam" ? "Vietnam Landmarks Montage" : "Hanoi Heritage Hoan Kiem"}
            className="w-full h-full object-cover object-center scale-105 transition-all duration-1000 ease-out filter brightness-[0.92] contrast-[1.05]"
          />
          {/* Gamma AI Cinematic Backdrop Tint: Preserves landmarks & prism aura while maximizing contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#031d42]/85 via-[#022b62]/65 to-[#021836]/90 mix-blend-multiply" />
          
          {/* Luminous Holographic / Iridescent Prismatic Glow Overlay (Gamma AI signature style) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-purple-500/15 to-amber-300/20 mix-blend-screen" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px] opacity-10" />

          {/* Ambient Glowing Orbs */}
          <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-cyan-400/25 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 right-1/3 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl" />
        </div>

        {/* Top Control Bar: Background Switcher (Gamma AI Presentation Controls Style) */}
        <div className="relative z-10 flex justify-between items-center mb-6 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/30 text-white text-xs sm:text-sm font-bold shadow-lg backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>HỆ SINH THÁI DU LỊCH O2O ĐẦU TIÊN TẠI VIỆT NAM</span>
          </div>

          {/* Gamma AI Style Wallpaper Selector */}
          <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-black/35 backdrop-blur-xl border border-white/20 shadow-xl">
            <button
              onClick={() => setHeroBg("vietnam")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                heroBg === "vietnam"
                  ? "bg-white text-slate-900 shadow-md scale-100"
                  : "text-white/80 hover:text-white hover:bg-white/15"
              }`}
              title="Toàn cảnh Việt Nam (Hà Nội, Hạ Long, Cầu Vàng, Sapa)"
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
              title="Hà Nội Di Sản (Hồ Gươm, Tháp Rùa, Văn Miếu)"
            >
              <span>🏛️</span>
              <span className="hidden sm:inline">Hà Nội Di Sản</span>
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          {/* Main Hero Headline with Gamma AI slide typography */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.2] drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
            MỞ HỘP DI SẢN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffe066] via-[#ffd000] to-[#f59e0b] drop-shadow-md">
              ĐÓNG DẤU HỘ CHIẾU SỐ
            </span> <br />
            <span className="text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
              63 TỈNH THÀNH VIỆT NAM
            </span>
          </h1>

          {/* Subtitle with high readability */}
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-sky-100/95 leading-relaxed font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Kết nối vật phẩm hữu hình từ chiếc hộp quà <strong>Travel Box</strong> với cuốn Hộ chiếu số game hóa. Thuyết minh đa phương tiện 3D soundscape, săn nhiệm vụ GPS thực địa và ưu đãi 20% thẻ sinh viên toàn quốc.
          </p>

          {/* Gamma AI Floating Slide Card: Search & Filter Bar */}
          <div className="max-w-4xl mx-auto pt-2 text-left">
            {/* Tab Pills with Frosted Glass */}
            <div className="flex items-center gap-2 pb-2.5 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveHeroTab("passport")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
                  activeHeroTab === "passport"
                    ? "bg-white text-[#0194f3] shadow-lg shadow-black/20"
                    : "bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/20"
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Hộ Chiếu & 63 Tỉnh</span>
              </button>

              <button
                onClick={() => setActiveHeroTab("shop")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
                  activeHeroTab === "shop"
                    ? "bg-white text-[#0194f3] shadow-lg shadow-black/20"
                    : "bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/20"
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Đặt Hộp Quà OCOP</span>
              </button>

              <button
                onClick={() => setActiveHeroTab("quests")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
                  activeHeroTab === "quests"
                    ? "bg-white text-[#0194f3] shadow-lg shadow-black/20"
                    : "bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/20"
                }`}
              >
                <Target className="w-4 h-4" />
                <span>Săn Nhiệm Vụ GPS</span>
              </button>

              <button
                onClick={() => setActiveHeroTab("audio")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
                  activeHeroTab === "audio"
                    ? "bg-white text-[#0194f3] shadow-lg shadow-black/20"
                    : "bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/20"
                }`}
              >
                <Headphones className="w-4 h-4" />
                <span>Trạm Audio Guide 3D</span>
              </button>
            </div>

            {/* Main Floating Slide Card */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/80 text-slate-800 ring-1 ring-black/5">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                {/* Search Province Input */}
                <div className="md:col-span-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-[#0194f3] transition">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Điểm đến / Tỉnh thành
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4 text-[#0194f3] shrink-0" />
                    <input
                      type="text"
                      placeholder="VD: Hà Nội, Đà Nẵng, Hà Giang..."
                      value={searchProvince}
                      onChange={(e) => setSearchProvince(e.target.value)}
                      className="bg-transparent text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none w-full"
                    />
                  </div>
                </div>

                {/* Traveler Target */}
                <div className="md:col-span-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Đối tượng du khách
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <GraduationCap className="w-4 h-4 text-[#ff5e1f] shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-slate-700">
                      Sinh viên & Gen Z (-20%)
                    </span>
                  </div>
                </div>

                {/* Experience mode */}
                <div className="md:col-span-2 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Hình thức
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-slate-700">
                      Hộp O2O + Tem Số
                    </span>
                  </div>
                </div>

                {/* Big Search Action CTA */}
                <div className="md:col-span-3 flex gap-2">
                  <Link
                    href={activeHeroTab === "passport" ? "/passport" : activeHeroTab === "shop" ? "/shop" : activeHeroTab === "quests" ? "/quests" : "/audio"}
                    className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#ff5e1f] to-[#f97316] hover:from-[#f44a07] hover:to-[#ea580c] text-white font-black text-xs sm:text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition active:scale-95 text-center"
                  >
                    <Search className="w-4 h-4" />
                    <span>Khám Phá Ngay</span>
                  </Link>
                </div>
              </div>

              {/* Quick Suggestion Pills */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 text-[11px] font-semibold">Tỉnh thành gợi ý:</span>
                {["Hà Nội", "Đà Nẵng", "Hà Giang", "TP. Hồ Chí Minh", "Ninh Bình"].map((prov) => (
                  <button
                    key={prov}
                    onClick={() => setSearchProvince(prov)}
                    className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-[#0194f3] text-slate-600 text-[11px] font-medium transition"
                  >
                    {prov}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Perks Bar in Crisp Floating Slide Pills (Gamma AI floating cards) */}
          <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-xs font-semibold text-slate-800">
            <div className="p-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-white/80 flex items-center justify-center gap-2 hover:-translate-y-0.5 transition">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Đặc Sản OCOP 4-5★</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-white/80 flex items-center justify-center gap-2 hover:-translate-y-0.5 transition">
              <GraduationCap className="w-4 h-4 text-[#ff5e1f]" />
              <span>Giảm 20% Thẻ Sinh Viên</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-white/80 flex items-center justify-center gap-2 hover:-translate-y-0.5 transition">
              <Headphones className="w-4 h-4 text-[#0194f3]" />
              <span>Audio Guide 3D Độc Bản</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-white/80 flex items-center justify-center gap-2 hover:-translate-y-0.5 transition">
              <Zap className="w-4 h-4 text-rose-500" />
              <span>Check-in GPS Thực Địa</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. O2O Mechanism Infographic */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-black uppercase text-[#ff5e1f] tracking-wider">
            CƠ CHẾ VẬN HÀNH O2O
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Từ Hộp Quà Vật Lý Đến Vũ Trụ Số
          </h2>
          <p className="text-xs text-slate-500">
            Trải nghiệm du lịch tương tác 4 bước tiên phong kết nối đời thực và không gian số
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-sky-300 transition-all space-y-3 relative group">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-black text-lg border border-red-200">
              01
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Nhận Travel Box</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mở hộp quà chứa mô hình 3D địa danh, 3 gói đặc sản OCOP và bưu thiếp nghệ thuật vẽ tay.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-sky-300 transition-all space-y-3 relative group">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-lg border border-amber-200">
              02
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Quét QR Dưới Nắp</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Nhập mã định danh duy nhất in dập nổi dưới nắp hộp để kích hoạt tỉnh thành trên bản đồ số.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-sky-300 transition-all space-y-3 relative group">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-black text-lg border border-teal-200">
              03
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Đóng Tem Số & Nghe Audio</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Cuốn Hộ Chiếu Số tự động đóng mộc đỏ nghệ thuật. Mở trạm phát audio guide soundscape địa phương.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-sky-300 transition-all space-y-3 relative group">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0194f3] flex items-center justify-center font-black text-lg border border-sky-200">
              04
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Làm Nhiệm Vụ & Đổi Thưởng</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Check-in GPS tại di sản thật, tích lũy Coins đổi voucher vé xe khách, homestay và ưu đãi phượt.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Unboxing 3D Simulator Interactive Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <UnboxingSimulator />
      </section>

      {/* 4. Featured Travel Boxes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
              BỘ SƯU TẬP TRAVEL BOX NỔI BẬT <Sparkles className="w-5 h-5 text-amber-500" />
            </h2>
            <p className="text-xs text-slate-500">
              Chọn hộp quà tỉnh thành bạn yêu thích để bắt đầu cuộc hành trình khám phá di sản
            </p>
          </div>

          <Link
            href="/shop"
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-sky-50 text-[#0194f3] border border-slate-200 text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <span>Xem Toàn Bộ Cửa Hàng & Xưởng Tự Mix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBoxes.map((box) => (
            <div
              key={box.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={box.image}
                    alt={box.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-[#ff5e1f] text-white font-bold text-[10px] uppercase shadow-sm">
                      {box.tag}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-white/95 text-amber-700 font-bold text-[10px] shadow-sm border border-slate-200/60">
                      ⭐ {box.rating} ({box.reviewsCount})
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <span className="text-[10px] font-bold text-[#0194f3] uppercase tracking-wider">
                    📍 {box.provinceName}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-[#0194f3] transition-colors">
                    {box.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {box.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-3">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 line-through block">
                      {box.originalPrice.toLocaleString()}đ
                    </span>
                    <span className="text-base font-black text-[#ff5e1f] font-mono">
                      {box.studentPrice.toLocaleString()}đ
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Thẻ SV -{box.discountPercent}%
                  </span>
                </div>

                <Link
                  href="/shop"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#0194f3] to-[#0264c8] hover:from-[#0087df] hover:to-[#0154a9] text-white font-bold text-xs text-center block shadow-sm transition"
                >
                  Tự Mix & Đặt Hộp Ngay
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
