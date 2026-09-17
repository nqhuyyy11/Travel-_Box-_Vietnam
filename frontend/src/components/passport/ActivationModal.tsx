"use client";

import React, { useState, useEffect } from "react";
import { useTravelStore } from "@/store/travelStore";
import confetti from "canvas-confetti";
import { 
  X, 
  QrCode, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Camera, 
  Award, 
  Coins, 
  ArrowRight,
  Zap,
  Gift
} from "lucide-react";
import Link from "next/link";

const SAMPLE_CODES = [
  { code: "HANOI-GENZ-2026", province: "Hà Nội", title: "Thánh Ăn Sập Phố Cổ", tag: "Hot", bg: "from-amber-600 to-red-600" },
  { code: "DANANG-PHUOT-2026", province: "Đà Nẵng", title: "Chiến Thần Đèo Hải Vân", tag: "Biển", bg: "from-cyan-600 to-teal-600" },
  { code: "SAIGON-FOOD-2026", province: "TP. Hồ Chí Minh", title: "Chúa Tể Hẻm Sài Gòn", tag: "Gen Z", bg: "from-rose-600 to-orange-600" },
  { code: "HAGIANG-TREK-2026", province: "Hà Giang", title: "Kẻ Chinh Phục Cột Cờ", tag: "Cực Bắc", bg: "from-emerald-600 to-teal-700" },
  { code: "PHUQUOC-ISLAND-2026", province: "Phú Quốc", title: "Chúa Đảo Phú Quốc", tag: "Đảo Ngọc", bg: "from-sky-600 to-blue-700" },
  { code: "NINHBINH-HERITAGE-2026", province: "Ninh Bình", title: "Chúa Tể Đỉnh Ngoạ Long", tag: "Di Sản", bg: "from-amber-600 to-emerald-700" },
];

export default function ActivationModal() {
  const {
    isActivationModalOpen,
    closeActivationModal,
    activeActivationCode,
    activateBoxCode,
    lastActivatedResult
  } = useTravelStore();

  const [inputCode, setInputCode] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeActivationCode) {
      setInputCode(activeActivationCode);
    }
  }, [activeActivationCode]);

  if (!isActivationModalOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#DC2626", "#F59E0B", "#10B981", "#3B82F6", "#EC4899"]
    });
  };

  const handleActivate = (codeToRun?: string) => {
    const target = codeToRun || inputCode;
    if (!target.trim()) return;

    setLoading(true);
    setTimeout(() => {
      const res = activateBoxCode(target);
      setLoading(false);
      if (res.success) {
        triggerConfetti();
      }
    }, 400);
  };

  const simulateCameraScan = (code: string) => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setInputCode(code);
      handleActivate(code);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={closeActivationModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center shadow-stamp text-white">
            <QrCode className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              KÍCH HOẠT HỘP QUÀ <Sparkles className="w-4 h-4 text-amber-400" />
            </h3>
            <p className="text-xs text-slate-400">
              Quét mã QR dưới nắp hộp Travel Box hoặc nhập mã bảo mật 16 ký tự
            </p>
          </div>
        </div>

        {/* Result Message or Input View */}
        {lastActivatedResult && lastActivatedResult.success ? (
          <div className="space-y-6 py-2 animate-in zoom-in-95 duration-300">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-red-950/60 to-slate-900 border border-red-500/40 text-center space-y-3">
              <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 mb-1">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h4 className="text-lg font-bold text-white">MỞ KHÓA THÀNH CÔNG!</h4>
              <p className="text-sm text-slate-300">{lastActivatedResult.message}</p>
              
              {lastActivatedResult.boxTitle && (
                <div className="text-xs font-semibold text-amber-400 bg-amber-500/10 py-1.5 px-3 rounded-lg border border-amber-500/20 inline-block">
                  📦 {lastActivatedResult.boxTitle}
                </div>
              )}
            </div>

            {/* Stamp Showcase */}
            {lastActivatedResult.stamp && (
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-amber-500/30 flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${lastActivatedResult.stamp.hologramColor} flex items-center justify-center text-3xl shadow-stamp animate-stamp-drop`}>
                  {lastActivatedResult.stamp.icon}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-600/30 text-red-400 border border-red-500/40 uppercase">
                      Tem Số Di Sản ({lastActivatedResult.stamp.rarity})
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      📍 {lastActivatedResult.stamp.provinceName}
                    </span>
                  </div>
                  <h5 className="font-extrabold text-white text-base">
                    "{lastActivatedResult.stamp.title}"
                  </h5>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {lastActivatedResult.stamp.description}
                  </p>
                </div>
              </div>
            )}

            {/* XP and Coins gained */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm">
                <Award className="w-5 h-5" />
                <span>+{lastActivatedResult.xpGained} XP</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center gap-2 text-amber-400 font-bold text-sm">
                <Coins className="w-5 h-5" />
                <span>+{lastActivatedResult.coinsGained} Coins</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              <Link
                href="/passport"
                onClick={closeActivationModal}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-sm text-center flex items-center justify-center gap-2 shadow-stamp transition"
              >
                <span>Xem Ngay Trong Sổ Hộ Chiếu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => {
                  setInputCode("");
                  useTravelStore.setState({ lastActivatedResult: null });
                }}
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition"
              >
                Nhập Mã Khác
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {lastActivatedResult && !lastActivatedResult.success && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{lastActivatedResult.message}</span>
              </div>
            )}

            {/* Input code form */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Nhập Mã Kích Hoạt In Dưới Nắp Hộp:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                  placeholder="VD: HANOI-GENZ-2026"
                  className="flex-1 px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white font-mono text-sm tracking-wider focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 placeholder:text-slate-500"
                />
                <button
                  onClick={() => handleActivate()}
                  disabled={loading || !inputCode.trim()}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-sm shadow-stamp disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-1.5"
                >
                  <Zap className="w-4 h-4" />
                  <span>{loading ? "Đang xử lý..." : "Mở Khóa"}</span>
                </button>
              </div>
            </div>

            {/* Camera QR scan Simulator */}
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-700/60 text-amber-400">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Quét Trực Tiếp Bằng Camera</div>
                  <div className="text-[11px] text-slate-400">Tự động nhận diện mã QR in nổi trên hộp</div>
                </div>
              </div>
              <button
                onClick={() => simulateCameraScan("HAGIANG-TREK-2026")}
                disabled={isScanning}
                className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-bold transition"
              >
                {isScanning ? "Đang Quét..." : "Mô Phỏng Quét"}
              </button>
            </div>

            {/* Quick Sample Test Codes */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-amber-400" />
                  Mã Mẫu Thử Nghiệm Nhanh (Click để thử):
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SAMPLE_CODES.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setInputCode(item.code);
                      handleActivate(item.code);
                    }}
                    className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700/80 hover:border-amber-500/50 text-left transition-all group hover:bg-slate-700/80"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-red-600/30 text-red-300">
                        {item.tag}
                      </span>
                      <span className="text-[10px] text-slate-400">{item.province}</span>
                    </div>
                    <div className="text-xs font-mono font-bold text-amber-300 group-hover:text-amber-200 truncate">
                      {item.code}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">
                      {item.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
