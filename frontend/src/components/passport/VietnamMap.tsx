"use client";

import React, { useState } from "react";
import { Province } from "@/types";
import { useTravelStore } from "@/store/travelStore";
import { MapPin, Sparkles, Compass, CheckCircle2, Lock, Volume2, ArrowRight } from "lucide-react";
import Link from "next/link";

interface VietnamMapProps {
  provinces: Province[];
  onSelectProvince?: (province: Province) => void;
}

export default function VietnamMap({ provinces, onSelectProvince }: VietnamMapProps) {
  const { user, openActivationModal } = useTravelStore();
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(provinces[0] || null);
  const [activeRegionFilter, setActiveRegionFilter] = useState<"Tất cả" | "Bắc" | "Trung" | "Nam">("Tất cả");

  const filteredProvinces = activeRegionFilter === "Tất cả" 
    ? provinces 
    : provinces.filter(p => p.region === activeRegionFilter);

  const handleProvinceClick = (province: Province) => {
    setSelectedProvince(province);
    if (onSelectProvince) onSelectProvince(province);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left / Center: Interactive SVG Map of Vietnam */}
      <div className="lg:col-span-7 glass-panel rounded-3xl p-6 relative overflow-hidden border border-slate-800">
        {/* Map Header and Region Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-400" />
              BẢN ĐỒ DU LỊCH DI SẢN 63 TỈNH THÀNH
            </h3>
            <p className="text-xs text-slate-400">
              Đã mở khóa <span className="text-amber-400 font-bold">{user.unlockedProvinces.length}</span> / 63 Tỉnh thành
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
            {(["Tất cả", "Bắc", "Trung", "Nam"] as const).map((reg) => (
              <button
                key={reg}
                onClick={() => setActiveRegionFilter(reg)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  activeRegionFilter === reg
                    ? "bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {reg === "Tất cả" ? "Toàn Quốc" : `Miền ${reg}`}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Map Canvas Representation */}
        <div className="relative w-full h-[520px] bg-slate-950/60 rounded-2xl border border-slate-800/80 flex items-center justify-center p-4 overflow-hidden">
          {/* Background Map Grid & Compass Rose */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]" />
          
          <div className="absolute top-4 right-4 text-center pointer-events-none opacity-40">
            <div className="w-16 h-16 rounded-full border border-dashed border-amber-400 flex items-center justify-center animate-spin-slow">
              <Compass className="w-8 h-8 text-amber-400" />
            </div>
            <span className="text-[9px] font-mono text-amber-300 mt-1 block">BẮC ↑</span>
          </div>

          {/* Vietnam S-Shape SVG Map Schematic */}
          <svg
            viewBox="0 0 500 700"
            className="w-full h-full max-h-[500px] drop-shadow-2xl"
          >
            {/* Vietnam Country Silhouette Path (Artistic S-Curve Shape) */}
            <path
              d="M 210,40 
                 C 250,30 310,60 300,110 
                 C 290,140 240,150 220,180 
                 C 200,210 240,240 250,290 
                 C 260,340 310,380 320,430 
                 C 330,480 300,530 260,570 
                 C 230,600 180,640 150,620 
                 C 130,600 150,560 180,540 
                 C 210,510 230,460 210,410 
                 C 190,370 170,320 180,260 
                 C 190,200 160,160 150,110 
                 C 140,70 180,50 210,40 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="3"
              className="transition-all hover:stroke-amber-500/40"
            />

            {/* Sea Waves / Biển Đông Indicator */}
            <text x="340" y="300" fill="#0284c7" fontSize="13" fontWeight="bold" opacity="0.4" letterSpacing="3">
              BIỂN ĐÔNG
            </text>

            {/* Paracel Islands (Quần đảo Hoàng Sa) */}
            <g className="cursor-pointer group">
              <circle cx="410" cy="310" r="14" fill="#0284c7" fillOpacity="0.2" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3,3" />
              <circle cx="408" cy="308" r="3" fill="#f59e0b" />
              <circle cx="415" cy="314" r="2.5" fill="#f59e0b" />
              <text x="360" y="340" fill="#38bdf8" fontSize="10" fontWeight="bold">
                Q.Đ HOÀNG SA (VN)
              </text>
            </g>

            {/* Spratly Islands (Quần đảo Trường Sa) */}
            <g className="cursor-pointer group">
              <circle cx="390" cy="530" r="18" fill="#0284c7" fillOpacity="0.2" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3,3" />
              <circle cx="385" cy="525" r="3" fill="#f59e0b" />
              <circle cx="395" cy="535" r="3.5" fill="#f59e0b" />
              <circle cx="380" cy="542" r="2" fill="#f59e0b" />
              <text x="340" y="565" fill="#38bdf8" fontSize="10" fontWeight="bold">
                Q.Đ TRƯỜNG SA (VN)
              </text>
            </g>

            {/* Phú Quốc Island */}
            <g className="cursor-pointer group">
              <circle cx="115" cy="595" r="8" fill="#0d9488" fillOpacity="0.3" stroke="#14b8a6" strokeWidth="1.5" />
              <circle cx="115" cy="595" r="4" fill="#f59e0b" />
              <text x="60" y="618" fill="#2dd4bf" fontSize="10" fontWeight="bold">
                Đảo Phú Quốc
              </text>
            </g>

            {/* Province Interactive Nodes */}
            {provinces.map((prov) => {
              const isUnlocked = user.unlockedProvinces.includes(prov.code);
              const isSelected = selectedProvince?.code === prov.code;

              // Coordinates map to SVG space
              let svgX = 230;
              let svgY = 150;

              if (prov.code === "HG") { svgX = 205; svgY = 60; }
              else if (prov.code === "HN") { svgX = 225; svgY = 135; }
              else if (prov.code === "NB") { svgX = 235; svgY = 185; }
              else if (prov.code === "DN") { svgX = 285; svgY = 320; }
              else if (prov.code === "SG") { svgX = 200; svgY = 560; }
              else if (prov.code === "PQ") { svgX = 115; svgY = 595; }

              return (
                <g
                  key={prov.code}
                  onClick={() => handleProvinceClick(prov)}
                  className="cursor-pointer transition-transform hover:scale-110"
                >
                  {/* Glowing ring if unlocked */}
                  {isUnlocked && (
                    <circle
                      cx={svgX}
                      cy={svgY}
                      r={isSelected ? "18" : "12"}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      className="animate-ping opacity-60"
                    />
                  )}

                  {/* Outer circle */}
                  <circle
                    cx={svgX}
                    cy={svgY}
                    r={isSelected ? "14" : "10"}
                    fill={isUnlocked ? (isSelected ? "#dc2626" : "#f59e0b") : "#334155"}
                    stroke={isSelected ? "#ffffff" : isUnlocked ? "#fef08a" : "#475569"}
                    strokeWidth="2"
                    className="shadow-lg transition-all"
                  />

                  {/* Center Dot or Icon */}
                  <circle
                    cx={svgX}
                    cy={svgY}
                    r="4"
                    fill={isUnlocked ? "#ffffff" : "#94a3b8"}
                  />

                  {/* Province Label Tag */}
                  <g transform={`translate(${svgX + 14}, ${svgY + 4})`}>
                    <rect
                      x="0"
                      y="-12"
                      width={prov.name.length * 7 + 16}
                      height="18"
                      rx="4"
                      fill={isSelected ? "#dc2626" : "#0f172a"}
                      fillOpacity={isSelected ? "0.95" : "0.85"}
                      stroke={isUnlocked ? "#f59e0b" : "#475569"}
                      strokeWidth="1"
                    />
                    <text
                      x="6"
                      y="1"
                      fill={isSelected ? "#ffffff" : isUnlocked ? "#fef08a" : "#cbd5e1"}
                      fontSize="9.5"
                      fontWeight="bold"
                    >
                      {prov.name} {isUnlocked ? "★" : ""}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>

          {/* Bottom legend */}
          <div className="absolute bottom-3 left-4 flex items-center gap-4 text-[11px] bg-slate-900/90 py-1.5 px-3 rounded-xl border border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500 border border-amber-300 shadow-sm shadow-amber-500/50" />
              <span className="text-slate-300">Đã mở khóa</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-600 border border-slate-500" />
              <span className="text-slate-400">Chưa kích hoạt</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Selected Province Detail Card & Stamp Preview */}
      <div className="lg:col-span-5 space-y-4">
        {selectedProvince ? (
          <div className="glass-panel rounded-3xl p-6 border border-amber-500/30 space-y-5 animate-in fade-in duration-200">
            {/* Province Header with Hero Background */}
            <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-700">
              <img
                src={selectedProvince.bgImage}
                alt={selectedProvince.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="absolute top-3 right-3">
                {user.unlockedProvinces.includes(selectedProvince.code) ? (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-white font-bold text-xs flex items-center gap-1 shadow-lg backdrop-blur-md">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Đã Mở Khóa
                  </span>
                ) : (
                  <button
                    onClick={() => openActivationModal()}
                    className="px-3 py-1 rounded-full bg-red-600/90 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1 shadow-lg backdrop-blur-md transition"
                  >
                    <Lock className="w-3.5 h-3.5" /> Mở Khóa Ngay
                  </button>
                )}
              </div>

              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/90 text-slate-950 uppercase tracking-wider">
                  Miền {selectedProvince.region}
                </span>
                <h4 className="text-2xl font-black text-white mt-1">{selectedProvince.name}</h4>
                <p className="text-xs text-amber-200 line-clamp-1">{selectedProvince.tagline}</p>
              </div>
            </div>

            {/* Digital Stamp Showcase */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedProvince.stamp.hologramColor} flex items-center justify-center text-2xl shadow-stamp shrink-0 ${user.unlockedProvinces.includes(selectedProvince.code) ? "animate-pulse-slow" : "opacity-40 grayscale"}`}>
                {selectedProvince.stamp.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-bold uppercase text-amber-400">
                    Tem Số Hộ Chiếu ({selectedProvince.stamp.rarity})
                  </span>
                  {user.unlockedProvinces.includes(selectedProvince.code) && (
                    <span className="text-[10px] text-emerald-400 font-semibold">Đã đóng dấu</span>
                  )}
                </div>
                <h5 className="font-extrabold text-white text-sm truncate">
                  "{selectedProvince.stamp.title}"
                </h5>
                <p className="text-xs text-slate-400 line-clamp-1">
                  {selectedProvince.stamp.description}
                </p>
              </div>
            </div>

            {/* Attractions */}
            <div>
              <h5 className="text-xs font-bold uppercase text-slate-300 mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                Danh Thắng Tiêu Biểu:
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {selectedProvince.attractions.map((att, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/60"
                  >
                    {att}
                  </span>
                ))}
              </div>
            </div>

            {/* Signature Local Foods */}
            <div>
              <h5 className="text-xs font-bold uppercase text-slate-300 mb-2">
                🍜 Ẩm Thực Sinh Viên Đề Xuất:
              </h5>
              <div className="space-y-1.5">
                {selectedProvince.signatureFoods.map((food, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-800/40 border border-slate-800"
                  >
                    <div>
                      <span className="font-bold text-white">{food.name}</span>
                      <span className="text-slate-400 text-[11px] block">{food.address}</span>
                    </div>
                    <span className="text-amber-400 font-semibold font-mono">{food.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Soundscape Preview */}
            <div className="p-3 rounded-xl bg-teal-950/40 border border-teal-500/30 flex items-center justify-between text-xs text-teal-300">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-teal-400 animate-pulse" />
                <span className="truncate">{selectedProvince.soundscapeTrack}</span>
              </div>
              <Link
                href="/audio"
                className="font-bold text-teal-400 hover:text-teal-200 underline shrink-0 ml-2"
              >
                Nghe Ngay
              </Link>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex gap-2">
              <Link
                href={`/shop`}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 shadow-stamp transition"
              >
                <span>Xem Hộp Quà {selectedProvince.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/quests"
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
              >
                Nhiệm Vụ
              </Link>
            </div>
          </div>
        ) : (
          <div className="glass-panel rounded-3xl p-8 text-center text-slate-400">
            Chọn một tỉnh trên bản đồ để khám phá chi tiết
          </div>
        )}
      </div>
    </div>
  );
}
