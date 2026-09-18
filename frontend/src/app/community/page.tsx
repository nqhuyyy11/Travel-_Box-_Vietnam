"use client";

import React, { useState } from "react";
import TravelFeed from "@/components/community/TravelFeed";
import BuddyFinder from "@/components/community/BuddyFinder";
import RewardsVault from "@/components/community/RewardsVault";
import { Users, MessageSquare, Gift, Sparkles } from "lucide-react";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<"feed" | "buddies" | "rewards">("feed");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header & Sub-nav */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-travel-card">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
            MODULE 6: CỘNG ĐỒNG XÊ DỊCH & KHO ĐỔI THƯỞNG
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            CỘNG ĐỒNG GEN Z & ĐỔI QUÀ VÉ XE
          </h1>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab("feed")}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === "feed"
                ? "bg-[#0194f3] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Travel Feed</span>
          </button>

          <button
            onClick={() => setActiveTab("buddies")}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === "buddies"
                ? "bg-[#0194f3] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Ghép Bạn Phượt</span>
          </button>

          <button
            onClick={() => setActiveTab("rewards")}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === "rewards"
                ? "bg-[#0194f3] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>Kho Đổi Thưởng</span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === "feed" && <TravelFeed />}
      {activeTab === "buddies" && <BuddyFinder />}
      {activeTab === "rewards" && <RewardsVault />}
    </div>
  );
}
