"use client";

import React, { useState } from "react";
import VietnamMap from "@/components/passport/VietnamMap";
import PassportBook from "@/components/passport/PassportBook";
import { MOCK_PROVINCES } from "@/lib/mockData";
import { MapPin, BookOpen, Sparkles, QrCode } from "lucide-react";
import { useTravelStore } from "@/store/travelStore";

export default function PassportPage() {
  const { openActivationModal, user } = useTravelStore();
  const [viewMode, setViewMode] = useState<"map" | "passport">("map");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-950/60 via-slate-900 to-amber-950/60 border border-amber-500/40 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-red-600/30 text-red-300 font-bold text-xs uppercase border border-red-500/40">
              Module 1: Passport & Hub
            </span>
            <span className="text-amber-400 text-xs font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> 63 Tỉnh Thành Độc Bản
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            HỘ CHIẾU SỐ & BẢN ĐỒ VIỆT NAM TƯƠNG TÁC
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Khám phá tiến độ mở khóa 63 tỉnh thành, ngắm nhìn các con tem số lấp lánh và theo dõi hành trình lữ khách của bạn.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 text-xs">
            <button
              onClick={() => setViewMode("map")}
              className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
                viewMode === "map"
                  ? "bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-stamp"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Bản Đồ 63 Tỉnh</span>
            </button>
            <button
              onClick={() => setViewMode("passport")}
              className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
                viewMode === "passport"
                  ? "bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-stamp"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Sổ Hộ Chiếu & Tem ({user.collectedStamps.length})</span>
            </button>
          </div>

          <button
            onClick={() => openActivationModal()}
            className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-stamp transition flex items-center gap-1.5"
          >
            <QrCode className="w-4 h-4" />
            <span className="hidden sm:inline">Kích Hoạt Hộp Mới</span>
          </button>
        </div>
      </div>

      {/* Main Content: Map or Passport View */}
      {viewMode === "map" ? (
        <VietnamMap provinces={MOCK_PROVINCES} />
      ) : (
        <PassportBook />
      )}
    </div>
  );
}
