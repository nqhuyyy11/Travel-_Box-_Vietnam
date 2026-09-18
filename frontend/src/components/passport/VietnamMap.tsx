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
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 relative overflow-hidden border border-slate-200/90 shadow-sm">
        {/* Map Header and Region Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#0194f3]" />
              BẢN ĐỒ DU LỊCH DI SẢN 63 TỈNH THÀNH
            </h3>
            <p className="text-xs text-slate-500">
              Đã mở khóa <span className="text-[#0194f3] font-black">{user.unlockedProvinces.length}</span> / 63 Tỉnh thành
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs shadow-inner">
            {(["Tất cả", "Bắc", "Trung", "Nam"] as const).map((reg) => (
              <button
                key={reg}
                onClick={() => setActiveRegionFilter(reg)}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  activeRegionFilter === reg
                    ? "bg-gradient-to-r from-[#0194f3] to-[#0264c8] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {reg === "Tất cả" ? "Toàn Quốc" : `Miền ${reg}`}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Map Canvas Representation */}
        <div className="relative w-full h-[520px] bg-sky-50/50 rounded-2xl border border-sky-100 flex items-center justify-center p-4 overflow-hidden">
          {/* Background Map Grid & Compass Rose */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px]" />
          
          <div className="absolute top-4 right-4 text-center pointer-events-none opacity-60">
            <div className="w-16 h-16 rounded-full border border-dashed border-sky-400 flex items-center justify-center animate-spin-slow">
              <Compass className="w-8 h-8 text-[#0194f3]" />
            </div>
            <span className="text-[9px] font-mono font-bold text-sky-600 mt-1 block">BẮC ↑</span>
          </div>

          {/* Vietnam S-Shape SVG Map Schematic */}
          <svg
            viewBox="0 0 500 700"
            className="w-full h-full max-h-[500px] drop-shadow-md"
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
              fill="#e0f2fe"
              stroke="#0284c7"
              strokeWidth="2.5"
              className="transition-all hover:fill-sky-100"
            />

            {/* Sea Waves / Biển Đông Indicator */}
            <text x="340" y="300" fill="#0284c7" fontSize="13" fontWeight="bold" opacity="0.6" letterSpacing="3">
              BIỂN ĐÔNG
            </text>

            {/* Paracel Islands (Quần đảo Hoàng Sa) */}
            <g className="cursor-pointer group">
              <circle cx="410" cy="310" r="14" fill="#0284c7" fillOpacity="0.15" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3,3" />
              <circle cx="408" cy="308" r="3.5" fill="#ff5e1f" />
              <circle cx="415" cy="314" r="3" fill="#ff5e1f" />
              <text x="355" y="340" fill="#0369a1" fontSize="10" fontWeight="bold">
                Q.Đ HOÀNG SA (VN)
              </text>
            </g>

            {/* Spratly Islands (Quần đảo Trường Sa) */}
            <g className="cursor-pointer group">
              <circle cx="390" cy="530" r="18" fill="#0284c7" fillOpacity="0.15" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3,3" />
              <circle cx="385" cy="525" r="3.5" fill="#ff5e1f" />
              <circle cx="395" cy="535" r="4" fill="#ff5e1f" />
              <circle cx="380" cy="542" r="3" fill="#ff5e1f" />
              <text x="335" y="565" fill="#0369a1" fontSize="10" fontWeight="bold">
                Q.Đ TRƯỜNG SA (VN)
              </text>
            </g>

            {/* Phú Quốc Island */}
            <g className="cursor-pointer group">
              <circle cx="115" cy="595" r="9" fill="#0d9488" fillOpacity="0.25" stroke="#0d9488" strokeWidth="1.5" />
              <circle cx="115" cy="595" r="4.5" fill="#ff5e1f" />
              <text x="55" y="618" fill="#0f766e" fontSize="10" fontWeight="bold">
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
                      stroke="#ff5e1f"
                      strokeWidth="2"
                      className="animate-ping opacity-60"
                    />
                  )}

                  {/* Outer circle */}
                  <circle
                    cx={svgX}
                    cy={svgY}
                    r={isSelected ? "14" : "10"}
                    fill={isUnlocked ? (isSelected ? "#ff5e1f" : "#0194f3") : "#94a3b8"}
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    className="shadow-md transition-all"
                  />

                  {/* Center Dot */}
                  <circle
                    cx={svgX}
                    cy={svgY}
                    r="4"
                    fill="#ffffff"
                  />

                  {/* Province Label Tag */}
                  <g transform={`translate(${svgX + 14}, ${svgY + 4})`}>
                    <rect
                      x="0"
                      y="-12"
                      width={prov.name.length * 7 + 16}
                      height="18"
                      rx="4"
                      fill={isSelected ? "#ff5e1f" : "#ffffff"}
                      stroke={isUnlocked ? "#0194f3" : "#cbd5e1"}
                      strokeWidth="1.5"
                      className="shadow-sm"
                    />
                    <text
                      x="6"
                      y="1"
                      fill={isSelected ? "#ffffff" : "#0f172a"}
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
          <div className="absolute bottom-3 left-4 flex items-center gap-4 text-[11px] bg-white/95 py-1.5 px-3.5 rounded-xl border border-slate-200/90 shadow-sm">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#0194f3] border border-sky-300 shadow-xs" />
              <span className="text-slate-700 font-semibold">Đã mở khóa</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-400 border border-slate-300" />
              <span className="text-slate-500">Chưa kích hoạt</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Selected Province Detail Card & Stamp Preview */}
      <div className="lg:col-span-5 space-y-4">
        {selectedProvince ? (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-5 animate-in fade-in duration-200">
            {/* Province Header with Hero Background */}
            <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
              <img
                src={selectedProvince.bgImage}
                alt={selectedProvince.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
              
              <div className="absolute top-3 right-3">
                {user.unlockedProvinces.includes(selectedProvince.code) ? (
                  <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 shadow-md">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Đã Mở Khóa
                  </span>
                ) : (
                  <button
                    onClick={() => openActivationModal()}
                    className="px-3 py-1 rounded-full bg-[#ff5e1f] hover:bg-[#ea580c] text-white font-bold text-xs flex items-center gap-1 shadow-md transition"
                  >
                    <Lock className="w-3.5 h-3.5" /> Mở Khóa Ngay
                  </button>
                )}
              </div>

              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950 uppercase tracking-wider">
                  Miền {selectedProvince.region}
                </span>
                <h4 className="text-2xl font-black text-white mt-1 drop-shadow-md">{selectedProvince.name}</h4>
                <p className="text-xs text-sky-100 line-clamp-1">{selectedProvince.tagline}</p>
              </div>
            </div>

            {/* Digital Stamp Showcase */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedProvince.stamp.hologramColor} flex items-center justify-center text-2xl shadow-md shrink-0 ${user.unlockedProvinces.includes(selectedProvince.code) ? "animate-pulse-slow" : "opacity-40 grayscale"}`}>
                {selectedProvince.stamp.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-bold uppercase text-[#0194f3]">
                    Tem Số Hộ Chiếu ({selectedProvince.stamp.rarity})
                  </span>
                  {user.unlockedProvinces.includes(selectedProvince.code) && (
                    <span className="text-[10px] text-emerald-600 font-bold">Đã đóng dấu</span>
                  )}
                </div>
                <h5 className="font-black text-slate-900 text-sm truncate">
                  "{selectedProvince.stamp.title}"
                </h5>
                <p className="text-xs text-slate-500 line-clamp-1">
                  {selectedProvince.stamp.description}
                </p>
              </div>
            </div>

            {/* Attractions */}
            <div>
              <h5 className="text-xs font-bold uppercase text-slate-700 mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                Danh Thắng Tiêu Biểu:
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {selectedProvince.attractions.map((att, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                  >
                    {att}
                  </span>
                ))}
              </div>
            </div>

            {/* Signature Local Foods */}
            <div>
              <h5 className="text-xs font-bold uppercase text-slate-700 mb-2">
                🍜 Ẩm Thực Sinh Viên Đề Xuất:
              </h5>
              <div className="space-y-1.5">
                {selectedProvince.signatureFoods.map((food, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-200"
                  >
                    <div>
                      <span className="font-bold text-slate-900">{food.name}</span>
                      <span className="text-slate-500 text-[11px] block">{food.address}</span>
                    </div>
                    <span className="text-[#ff5e1f] font-bold font-mono">{food.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Soundscape Preview */}
            <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between text-xs text-sky-800">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[#0194f3] animate-pulse" />
                <span className="truncate font-medium">{selectedProvince.soundscapeTrack}</span>
              </div>
              <Link
                href="/audio"
                className="font-bold text-[#0194f3] hover:text-[#0264c8] underline shrink-0 ml-2"
              >
                Nghe Ngay
              </Link>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex gap-2">
              <Link
                href={`/shop`}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#ff5e1f] to-[#f97316] hover:from-[#f44a07] hover:to-[#ea580c] text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20 transition"
              >
                <span>Xem Hộp Quà {selectedProvince.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/quests"
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-bold text-xs transition"
              >
                Nhiệm Vụ
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center text-slate-500 border border-slate-200">
            Chọn một tỉnh trên bản đồ để khám phá chi tiết
          </div>
        )}
      </div>
    </div>
  );
}
