"use client";

import React, { useState } from "react";
import CustomBoxBuilder from "@/components/shop/CustomBoxBuilder";
import { MOCK_TRAVEL_BOXES } from "@/lib/mockData";
import { ShoppingBag, Sparkles, Sliders, ShieldCheck, GraduationCap } from "lucide-react";
import VietQRModal from "@/components/shop/VietQRModal";
import { useTravelStore } from "@/store/travelStore";

export default function ShopPage() {
  const { user } = useTravelStore();
  const [activeTab, setActiveTab] = useState<"custom" | "catalog">("custom");
  const [selectedBoxForBuy, setSelectedBoxForBuy] = useState<any | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/90 border border-slate-800">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
            MODULE 4: E-COMMERCE & CÁ NHÂN HÓA
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            CỬA HÀNG DU LỊCH & XƯỞNG TỰ MIX QUÀ
          </h1>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab("custom")}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "custom"
                ? "bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-stamp"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Xưởng "Tự Mix Quà" (5 Bước)</span>
          </button>

          <button
            onClick={() => setActiveTab("catalog")}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "catalog"
                ? "bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-stamp"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Hộp Quà Có Sẵn Theo Tỉnh</span>
          </button>
        </div>
      </div>

      {activeTab === "custom" ? (
        <CustomBoxBuilder />
      ) : (
        /* Ready Boxes Catalog */
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_TRAVEL_BOXES.map((box) => (
              <div
                key={box.id}
                className="glass-panel rounded-3xl overflow-hidden border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img src={box.image} alt={box.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-red-600 text-white font-bold text-[10px] uppercase">
                      {box.tag}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-bold text-amber-400 uppercase">
                      📍 {box.provinceName}
                    </span>
                    <h3 className="font-extrabold text-white text-base leading-snug">
                      {box.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2">
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
                      -20% Thẻ SV
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedBoxForBuy(box)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs shadow-stamp transition"
                  >
                    Mua Ngay & Nhận Mã VietQR
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout QR Modal for Catalog Item */}
          {selectedBoxForBuy && (
            <VietQRModal
              isOpen={!!selectedBoxForBuy}
              onClose={() => setSelectedBoxForBuy(null)}
              orderInfo={{
                title: selectedBoxForBuy.title,
                totalPrice: selectedBoxForBuy.studentPrice,
                originalPrice: selectedBoxForBuy.originalPrice,
                discountAmount: selectedBoxForBuy.originalPrice - selectedBoxForBuy.studentPrice,
                orderCode: `TBV-BOX-${Math.floor(100000 + Math.random() * 900000)}`,
                studentName: user.name
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
