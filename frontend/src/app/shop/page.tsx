"use client";

import React, { useState } from "react";
import CustomBoxBuilder from "@/components/shop/CustomBoxBuilder";
import { MOCK_TRAVEL_BOXES } from "@/lib/mockData";
import { ShoppingBag, Sparkles } from "lucide-react";
import VietQRModal from "@/components/shop/VietQRModal";
import { useTravelStore } from "@/store/travelStore";

export default function ShopPage() {
  const { user } = useTravelStore();
  const [activeTab, setActiveTab] = useState<"custom" | "catalog">("custom");
  const [selectedBoxForBuy, setSelectedBoxForBuy] = useState<any | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff5e1f]">
            MODULE 4: E-COMMERCE & CÁ NHÂN HÓA
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            CỬA HÀNG DU LỊCH & XƯỞNG TỰ MIX QUÀ
          </h1>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
          <button
            onClick={() => setActiveTab("custom")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "custom"
                ? "bg-gradient-to-r from-[#0194f3] to-[#0264c8] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Xưởng "Tự Mix Quà" (5 Bước)</span>
          </button>

          <button
            onClick={() => setActiveTab("catalog")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "catalog"
                ? "bg-gradient-to-r from-[#0194f3] to-[#0264c8] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
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
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-sky-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img src={box.image} alt={box.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#ff5e1f] text-white font-bold text-[10px] uppercase shadow-xs">
                      {box.tag}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-bold text-[#0194f3] uppercase tracking-wider">
                      📍 {box.provinceName}
                    </span>
                    <h3 className="font-black text-slate-900 text-base leading-snug group-hover:text-[#0194f3] transition-colors">
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
                      <span className="text-[10px] text-slate-400 line-through block">
                        {box.originalPrice.toLocaleString()}đ
                      </span>
                      <span className="text-base font-black text-[#ff5e1f] font-mono">
                        {box.studentPrice.toLocaleString()}đ
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      -20% Thẻ SV
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedBoxForBuy(box)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#0194f3] to-[#0264c8] hover:from-[#0087df] hover:to-[#0154a9] text-white font-bold text-xs shadow-xs transition"
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
