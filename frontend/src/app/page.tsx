"use client";

import React from "react";
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
  Package,
  Gift
} from "lucide-react";
import UnboxingSimulator from "@/components/home/UnboxingSimulator";
import { useTravelStore } from "@/store/travelStore";
import { MOCK_TRAVEL_BOXES } from "@/lib/mockData";

export default function HomePage() {
  const { openActivationModal } = useTravelStore();

  return (
    <div className="space-y-20 pb-12">
      {/* 1. Hero Section: Cultural & Gen Z Adventure */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient Gradient Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[400px] bg-gradient-to-r from-red-600/20 via-amber-500/20 to-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-bold shadow-gold-glow backdrop-blur-md animate-bounce">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>HỆ SINH THÁI DU LỊCH O2O ĐẦU TIÊN TẠI VIỆT NAM</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.15]">
            MỞ HỘP DI SẢN <br />
            <span className="gold-gradient-text">ĐÓNG DẤU HỘ CHIẾU SỐ</span> <br />
            <span className="red-gradient-text">63 TỈNH THÀNH VIỆT NAM</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed">
            Kết nối vật phẩm hữu hình từ chiếc hộp quà <strong>Travel Box</strong> với cuốn Hộ chiếu số game hóa. Thuyết minh đa phương tiện, săn nhiệm vụ GPS thực địa và nhận ưu đãi 20% thẻ sinh viên.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => openActivationModal()}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-extrabold text-sm sm:text-base shadow-stamp shadow-red-900/50 hover:scale-105 active:scale-95 transition flex items-center gap-2"
            >
              <QrCode className="w-5 h-5 animate-pulse" />
              <span>Quét Mã Nắp Hộp Kích Hoạt</span>
            </button>

            <Link
              href="/passport"
              className="px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-sm sm:text-base border border-slate-700 hover:border-amber-500/40 transition flex items-center gap-2"
            >
              <MapPin className="w-5 h-5 text-amber-400" />
              <span>Khám Phá Bản Đồ 63 Tỉnh</span>
            </Link>
          </div>

          {/* Perks Bar */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-xs text-slate-300">
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Đặc Sản OCOP 4-5★</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-center gap-2">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Giảm 20% Thẻ Sinh Viên</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-center gap-2">
              <Headphones className="w-4 h-4 text-teal-400" />
              <span>Audio Guide 3D Độc Bản</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-rose-400" />
              <span>Check-in GPS Thực Địa</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. O2O Mechanism Infographic */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase text-amber-400 tracking-wider">CƠ CHẾ VẬN HÀNH O2O</span>
          <h2 className="text-3xl font-black text-white">Từ Hộp Quà Vật Lý Đến Vũ Trụ Số</h2>
          <p className="text-xs text-slate-400">Trải nghiệm du lịch tương tác 4 bước chưa từng có</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-3 relative group">
            <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-400 flex items-center justify-center font-black text-lg border border-red-500/30">
              01
            </div>
            <h3 className="font-bold text-white text-base">Nhận Travel Box</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mở hộp quà chứa mô hình 3D địa danh, 3 gói đặc sản OCOP và bưu thiếp nghệ thuật.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-3 relative group">
            <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-black text-lg border border-amber-500/30">
              02
            </div>
            <h3 className="font-bold text-white text-base">Quét QR Dưới Nắp</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Nhập mã định danh duy nhất in dập nổi dưới nắp hộp để kích hoạt tỉnh thành trên bản đồ.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-3 relative group">
            <div className="w-12 h-12 rounded-2xl bg-teal-600/20 text-teal-400 flex items-center justify-center font-black text-lg border border-teal-500/30">
              03
            </div>
            <h3 className="font-bold text-white text-base">Đóng Tem Số & Nghe Audio</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cuốn Hộ Chiếu Số tự động đóng mộc đỏ nghệ thuật. Mở trạm phát audio guide soundscape.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-3 relative group">
            <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center font-black text-lg border border-cyan-500/30">
              04
            </div>
            <h3 className="font-bold text-white text-base">Làm Nhiệm Vụ & Đổi Thưởng</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Check-in GPS tại di sản thật, giải mật thư nắp hộp, tích lũy Coins đổi voucher vé xe khách & homestay.
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
            <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              BỘ SƯU TẬP TRAVEL BOX NỔI BẬT <Sparkles className="w-5 h-5 text-amber-400" />
            </h2>
            <p className="text-xs text-slate-400">
              Chọn hộp quà tỉnh thành bạn yêu thích để bắt đầu cuộc hành trình
            </p>
          </div>

          <Link
            href="/shop"
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 text-xs font-bold transition flex items-center gap-1.5"
          >
            <span>Xem Toàn Bộ Cửa Hàng & Xưởng Tự Mix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_TRAVEL_BOXES.map((box) => (
            <div
              key={box.id}
              className="glass-panel rounded-3xl overflow-hidden border border-slate-800 hover:border-amber-500/40 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={box.image}
                    alt={box.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-red-600 text-white font-bold text-[10px] uppercase shadow-md">
                      {box.tag}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-slate-950/80 text-amber-300 font-bold text-[10px] backdrop-blur-md">
                      ⭐ {box.rating} ({box.reviewsCount})
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                    📍 {box.provinceName}
                  </span>
                  <h3 className="font-extrabold text-white text-base leading-snug">
                    {box.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {box.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-3">
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 line-through block">
                      {box.originalPrice.toLocaleString()}đ
                    </span>
                    <span className="text-base font-black text-amber-400 font-mono">
                      {box.studentPrice.toLocaleString()}đ
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Thẻ SV -{box.discountPercent}%
                  </span>
                </div>

                <Link
                  href="/shop"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs text-center block shadow-stamp transition"
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
