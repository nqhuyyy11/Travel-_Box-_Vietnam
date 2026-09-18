"use client";

import React, { useState } from "react";
import { useTravelStore } from "@/store/travelStore";
import { MOCK_PROVINCES } from "@/lib/mockData";
import { 
  Sparkles, 
  Award, 
  Coins, 
  CheckCircle2, 
  Lock, 
  QrCode, 
  GraduationCap, 
  Calendar,
  Share2
} from "lucide-react";

export default function PassportBook() {
  const { user, openActivationModal } = useTravelStore();
  const [activeTab, setActiveTab] = useState<"passport" | "stamps">("passport");

  const progressPercent = Math.min(100, Math.round((user.xp / user.nextLevelXp) * 100));

  return (
    <div className="space-y-6">
      {/* Top Controls & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            HỘ CHIẾU SỐ LỮ KHÁCH <Sparkles className="w-5 h-5 text-amber-500" />
          </h2>
          <p className="text-xs text-slate-500">
            Sổ thông hành điện tử công nhận hành trình khám phá 63 tỉnh thành Việt Nam
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
          <button
            onClick={() => setActiveTab("passport")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === "passport"
                ? "bg-gradient-to-r from-[#0194f3] to-[#0264c8] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Trang Định Danh & Thẻ SV
          </button>
          <button
            onClick={() => setActiveTab("stamps")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === "stamps"
                ? "bg-gradient-to-r from-[#0194f3] to-[#0264c8] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Bộ Sưu Tập Tem Số ({user.collectedStamps.length}/63)
          </button>
        </div>
      </div>

      {activeTab === "passport" ? (
        /* Passport Booklet UI View */
        <div className="max-w-4xl mx-auto parchment-bg rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-amber-900/30 text-stone-900 relative overflow-hidden">
          {/* Subtle Watermark Emblems */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-8 border-amber-900/5 flex items-center justify-center pointer-events-none">
            <span className="text-8xl opacity-10">🇻🇳</span>
          </div>

          {/* Header of Passport */}
          <div className="border-b-2 border-amber-900/20 pb-6 mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-700 flex items-center justify-center text-amber-300 font-serif font-black text-xl shadow-md border-2 border-amber-400">
                ★
              </div>
              <div>
                <h3 className="font-serif font-black text-xl tracking-wider text-red-950 uppercase">
                  HỘ CHIẾU DU LỊCH DI SẢN VIỆT NAM
                </h3>
                <p className="text-[11px] font-mono tracking-widest text-stone-600">
                  VIETNAM HERITAGE TRAVEL PASSPORT — NO. TBV-{user.id.toUpperCase()}
                </p>
              </div>
            </div>

            {/* Red Official Heritage Stamp Seal */}
            <div className="stamp-seal w-24 h-24 border-red-700 text-red-700 rotate-6 p-2 text-center flex flex-col items-center justify-center">
              <span className="text-[8px] tracking-tighter">TRAVEL BOX VN</span>
              <span className="text-[10px] font-black border-y border-red-700 py-0.5 my-0.5">XÁC THỰC</span>
              <span className="text-[7px]">2026-GENZ</span>
            </div>
          </div>

          {/* Identification Body (Left Photo + Right Info) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Photo & QR */}
            <div className="md:col-span-4 flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-40 h-48 rounded-2xl overflow-hidden border-4 border-amber-900/40 shadow-xl bg-stone-300">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 p-2 rounded-full bg-red-700 text-amber-300 shadow-lg border-2 border-white">
                  <Award className="w-5 h-5" />
                </div>
              </div>

              <div className="text-center">
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 border border-red-300 text-xs font-bold">
                  {user.levelTitle}
                </span>
              </div>
            </div>

            {/* Right Information Grid */}
            <div className="md:col-span-8 space-y-4 font-mono text-xs">
              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-stone-300">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase block font-sans">Họ và tên / Full Name:</span>
                  <span className="text-base font-serif font-black text-stone-900">{user.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 uppercase block font-sans">Mã Lữ Khách / Passport ID:</span>
                  <span className="text-sm font-bold text-red-900">VN-GENZ-2026-899</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-stone-300">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase block font-sans">Trường Đại học / University:</span>
                  <span className="text-xs font-bold text-stone-900 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
                    {user.university}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 uppercase block font-sans">Mã Thẻ Sinh Viên / Student ID:</span>
                  <span className="text-xs font-bold text-stone-900">{user.studentId} (Ưu đãi -20%)</span>
                </div>
              </div>

              {/* XP Progress Bar */}
              <div className="space-y-1.5 pb-2">
                <div className="flex justify-between text-[11px] font-sans">
                  <span className="font-bold text-stone-800">Điểm Kinh Nghiệm (XP):</span>
                  <span className="font-bold text-red-700">{user.xp} / {user.nextLevelXp} XP ({progressPercent}%)</span>
                </div>
                <div className="w-full h-3 bg-stone-300 rounded-full overflow-hidden border border-stone-400">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Stats Counters */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-2.5 rounded-xl bg-amber-900/5 border border-amber-900/20 text-center">
                  <span className="text-[10px] text-stone-600 uppercase block font-sans">Tỉnh Đã Mở</span>
                  <span className="text-lg font-black text-red-800">{user.unlockedProvinces.length} / 63</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-900/5 border border-amber-900/20 text-center">
                  <span className="text-[10px] text-stone-600 uppercase block font-sans">Tem Sưu Tập</span>
                  <span className="text-lg font-black text-amber-800">{user.collectedStamps.length} Con Tem</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-900/5 border border-amber-900/20 text-center">
                  <span className="text-[10px] text-stone-600 uppercase block font-sans">Travel Coins</span>
                  <span className="text-lg font-black text-emerald-800">{user.travelCoins} Xu</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer of Passport */}
          <div className="mt-8 pt-4 border-t border-amber-900/20 flex flex-wrap items-center justify-between gap-3 text-[11px] text-stone-600 font-sans">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Có giá trị trọn đời trên toàn lãnh thổ Việt Nam
            </span>
            <button
              onClick={() => openActivationModal()}
              className="px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
            >
              <QrCode className="w-3.5 h-3.5" /> Quét Thêm Hộp Quà Để Đóng Dấu Mới
            </button>
          </div>
        </div>
      ) : (
        /* Stamps Collection Showcase */
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_PROVINCES.map((prov) => {
              const userStamp = user.collectedStamps.find((s) => s.provinceCode === prov.code);
              const isUnlocked = !!userStamp;

              return (
                <div
                  key={prov.code}
                  className={`p-5 rounded-3xl border transition-all ${
                    isUnlocked
                      ? "bg-white border-amber-300 shadow-md"
                      : "bg-slate-50 border-slate-200/90 opacity-70 hover:opacity-95"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                        {prov.name}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-bold border border-amber-200">
                        {prov.stamp.rarity}
                      </span>
                    </div>

                    {isUnlocked ? (
                      <span className="p-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="p-1 rounded-full bg-slate-100 text-slate-400">
                        <Lock className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  {/* Stamp Graphic Preview */}
                  <div className="flex items-center gap-4 py-2">
                    <div
                      className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl shadow-md shrink-0 transition-transform ${
                        isUnlocked
                          ? `bg-gradient-to-br ${prov.stamp.hologramColor} animate-stamp-drop`
                          : "bg-slate-100 border-2 border-dashed border-slate-300 grayscale"
                      }`}
                    >
                      {prov.stamp.icon}
                    </div>

                    <div className="space-y-1 min-w-0">
                      <h4 className="font-black text-slate-900 text-sm truncate">
                        "{prov.stamp.title}"
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {prov.stamp.description}
                      </p>
                      {isUnlocked && userStamp?.unlockedAt && (
                        <div className="text-[10px] text-amber-700 font-mono font-bold pt-1">
                          Đóng dấu ngày: {userStamp.unlockedAt}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-medium">
                      {isUnlocked ? "Đã lưu vào Hộ chiếu" : "Cần mã kích hoạt hộp"}
                    </span>
                    {!isUnlocked && (
                      <button
                        onClick={() => openActivationModal()}
                        className="text-xs font-bold text-[#0194f3] hover:text-[#0264c8]"
                      >
                        Mở khóa →
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
