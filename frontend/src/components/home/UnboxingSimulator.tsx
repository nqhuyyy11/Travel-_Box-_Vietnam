"use client";

import React, { useState } from "react";
import { useTravelStore } from "@/store/travelStore";
import { 
  Gift, 
  Sparkles, 
  RotateCcw, 
  QrCode, 
  CheckCircle2, 
  ArrowRight,
  Package,
  Layers
} from "lucide-react";
import confetti from "canvas-confetti";

export default function UnboxingSimulator() {
  const { openActivationModal } = useTravelStore();
  const [isOpen, setIsOpen] = useState(false);
  const [currentBoxIndex, setCurrentBoxIndex] = useState(0);

  const sampleUnboxings = [
    {
      province: "Hà Nội",
      title: "Travel Box Hà Nội: Tinh Hoa 36 Phố Phường",
      code: "HANOI-GENZ-2026",
      model: "Mô hình Gỗ Lắp Ghép Tháp Rùa 3D",
      snacks: ["Ô Mai Sấu Xào Gừng", "Trà Sen Tây Hồ", "Bánh Cốm Làng Vòng"],
      postcard: "Bưu Thiếp Hoàng Hôn Cầu Long Biên",
      color: "from-amber-600 via-rose-600 to-red-700"
    },
    {
      province: "Đà Nẵng",
      title: "Travel Box Đà Nẵng: Hùng Quan Biển Bạc",
      code: "DANANG-PHUOT-2026",
      model: "Mô hình Kim Loại Cầu Rồng Mạ Vàng",
      snacks: ["Mực Rim Me Sơn Trà", "Bánh Khô Mè Cẩm Lệ", "Bò Khô Cầu Mống"],
      postcard: "Bưu Thiếp Hải Vân Quan",
      color: "from-cyan-600 via-teal-600 to-blue-700"
    },
    {
      province: "Hà Giang",
      title: "Travel Box Hà Giang: Hoa Nở Trên Đá",
      code: "HAGIANG-TREK-2026",
      model: "Mô hình Cột Cờ Lũng Cú & Vách Mã Pí Lèng",
      snacks: ["Thịt Trâu Gác Bếp Đồng Văn", "Bánh Tam Giác Mạch", "Trà Shan Tuyết"],
      postcard: "Bưu Thiếp Hẻm Tu Sản",
      color: "from-emerald-600 via-teal-600 to-sky-700"
    }
  ];

  const current = sampleUnboxings[currentBoxIndex];

  const handleOpenBox = () => {
    setIsOpen(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleReset = () => {
    setIsOpen(false);
    setCurrentBoxIndex((prev) => (prev + 1) % sampleUnboxings.length);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-amber-500/30 relative overflow-hidden space-y-8">
      {/* Background Ambient Glow */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
          <span>TRẢI NGHIỆM UNBOXING SIMULATOR 3D</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Khui Hộp Quà Vật Lý & Kích Hoạt Bản Đồ Số
        </h2>
        <p className="text-xs text-slate-400">
          Khám phá trọn bộ 5 vật phẩm hữu hình bên trong chiếc hộp Travel Box độc bản
        </p>
      </div>

      {/* Box Visualizer Stage */}
      <div className="max-w-3xl mx-auto">
        {!isOpen ? (
          /* Sealed Box State */
          <div className="text-center py-10 space-y-6">
            <div className="relative inline-block group cursor-pointer" onClick={handleOpenBox}>
              <div className={`w-64 h-64 sm:w-80 sm:h-80 mx-auto rounded-3xl bg-gradient-to-br ${current.color} p-1 shadow-2xl shadow-red-950/80 group-hover:scale-105 transition-all duration-300 flex items-center justify-center relative overflow-hidden border-2 border-amber-400/40 animate-float`}>
                {/* Gold Ribbon Overlay */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 bg-amber-400/80 border-y border-amber-200 shadow-md backdrop-blur-sm" />
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 bg-amber-400/80 border-x border-amber-200 shadow-md backdrop-blur-sm" />

                <div className="relative z-10 text-center text-white space-y-2 p-6">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-black/40 backdrop-blur-md flex items-center justify-center border border-amber-300/40 shadow-lg">
                    <Gift className="w-8 h-8 text-amber-300 animate-pulse" />
                  </div>
                  <h3 className="font-extrabold text-lg sm:text-xl tracking-wider text-amber-100">
                    {current.province}
                  </h3>
                  <span className="text-[11px] font-mono text-amber-200 px-2 py-0.5 rounded bg-black/40 border border-amber-300/30">
                    Click để mở nắp hộp
                  </span>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={handleOpenBox}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-extrabold text-sm shadow-stamp shadow-red-900/50 hover:scale-105 transition active:scale-95 inline-flex items-center gap-2"
              >
                <Package className="w-5 h-5" />
                <span>Mở Nắp Hộp Quà {current.province} Ngay</span>
              </button>
            </div>
          </div>
        ) : (
          /* Unboxed Items Showcase */
          <div className="space-y-6 animate-in zoom-in-95 duration-500">
            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{current.title}</h4>
                  <p className="text-xs text-amber-200">Đã mở nắp hộp thành công! Khám phá vật phẩm bên trong:</p>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Khui Hộp Khác
              </button>
            </div>

            {/* Revealed 5 Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Item 1: 3D Model */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-600/30 text-red-300">
                  Mô Hình Di Sản 3D
                </span>
                <h5 className="font-bold text-white text-xs">{current.model}</h5>
                <p className="text-[11px] text-slate-400">Gỗ ép công nghệ CNC tinh xảo</p>
              </div>

              {/* Item 2: OCOP Snacks */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/30 text-amber-300">
                  3 Món Đặc Sản OCOP
                </span>
                <ul className="text-xs text-slate-300 space-y-1">
                  {current.snacks.map((snack, idx) => (
                    <li key={idx} className="flex items-center gap-1 text-[11px]">
                      <span className="text-amber-400">✔</span> {snack}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Item 3: Postcard */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-600/30 text-cyan-300">
                  Bưu Thiếp Nghệ Thuật
                </span>
                <h5 className="font-bold text-white text-xs">{current.postcard}</h5>
                <p className="text-[11px] text-slate-400">Kèm câu chuyện audio guide độc quyền</p>
              </div>
            </div>

            {/* Unique Activation Code In Underlid */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-red-950/60 via-slate-900 to-amber-950/60 border border-amber-500/40 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs text-amber-400 font-bold flex items-center gap-1.5">
                  <QrCode className="w-4 h-4" /> Mã Bảo Mật Dưới Nắp Hộp:
                </div>
                <div className="text-xl font-mono font-black text-white tracking-widest">
                  {current.code}
                </div>
                <p className="text-[11px] text-slate-400">
                  Quét mã này để kích hoạt {current.province} trên bản đồ và nhận tem số
                </p>
              </div>

              <button
                onClick={() => openActivationModal(current.code)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs shadow-stamp transition flex items-center gap-2"
              >
                <span>Kích Hoạt Mã Này Ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
