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
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-lg bg-sky-50 text-[#0194f3] font-bold text-xs uppercase border border-sky-200">
              Module 1: Passport & Hub
            </span>
            <span className="text-amber-600 text-xs font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> 63 Tỉnh Thành Độc Bản
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            HỘ CHIẾU SỐ & BẢN ĐỒ VIỆT NAM TƯƠNG TÁC
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Khám phá tiến độ mở khóa 63 tỉnh thành, ngắm nhìn các con tem số lấp lánh và theo dõi hành trình lữ khách của bạn.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs shadow-inner">
            <button
              onClick={() => setViewMode("map")}
              className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
                viewMode === "map"
                  ? "bg-gradient-to-r from-[#0194f3] to-[#0264c8] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Bản Đồ 63 Tỉnh</span>
            </button>
            <button
              onClick={() => setViewMode("passport")}
              className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
                viewMode === "passport"
                  ? "bg-gradient-to-r from-[#0194f3] to-[#0264c8] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Sổ Hộ Chiếu & Tem ({user.collectedStamps.length})</span>
            </button>
          </div>

          <button
            onClick={() => openActivationModal()}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ff5e1f] to-[#f97316] hover:from-[#f44a07] hover:to-[#ea580c] text-white font-bold text-xs shadow-md shadow-orange-500/20 transition flex items-center gap-1.5 active:scale-95"
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
