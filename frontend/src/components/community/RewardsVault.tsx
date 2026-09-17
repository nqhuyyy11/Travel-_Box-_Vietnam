"use client";

import React, { useState } from "react";
import { useTravelStore } from "@/store/travelStore";
import { RewardVoucher } from "@/types";
import { 
  Gift, 
  Coins, 
  CheckCircle2, 
  Copy, 
  Sparkles, 
  Tag, 
  Calendar,
  Lock,
  ArrowRight
} from "lucide-react";
import confetti from "canvas-confetti";

export default function RewardsVault() {
  const { user, vouchers, claimVoucher } = useTravelStore();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleClaim = (voucher: RewardVoucher) => {
    const res = claimVoucher(voucher.id);
    if (res.success) {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      alert(res.message);
    }
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header & Balance Display */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-red-950/40 border border-amber-500/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Gift className="w-6 h-6 text-amber-400" />
            <h3 className="text-xl font-black text-white">KHO ĐỔI THƯỞNG TRAVEL COINS</h3>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Đổi Travel Coins kiếm được từ việc kích hoạt hộp và làm nhiệm vụ lấy vé xe, homestay & voucher
          </p>
        </div>

        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-800/90 border border-amber-500/30">
          <Coins className="w-6 h-6 text-amber-400 animate-spin-slow" />
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Số dư ví của bạn:</div>
            <div className="text-lg font-black text-amber-400 font-mono">
              {user.travelCoins.toLocaleString()} Xu
            </div>
          </div>
        </div>
      </div>

      {/* Vouchers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vouchers.map((voucher) => {
          const isClaimed = voucher.claimed || user.claimedVouchers.includes(voucher.id);
          const canAfford = user.travelCoins >= voucher.coinsCost;

          return (
            <div
              key={voucher.id}
              className={`glass-panel rounded-3xl p-6 border transition-all space-y-4 ${
                isClaimed
                  ? "border-emerald-500/40 bg-slate-900/90"
                  : "border-slate-800 hover:border-amber-500/40"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl border border-slate-700">
                    {voucher.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                      {voucher.category}
                    </span>
                    <h4 className="font-extrabold text-white text-sm mt-1">{voucher.title}</h4>
                    <p className="text-xs text-slate-400">{voucher.brand}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-amber-400 flex items-center justify-end gap-1">
                    <Coins className="w-3.5 h-3.5" />
                    <span>{voucher.coinsCost} Xu</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">HSD: {voucher.expiryDate}</span>
                </div>
              </div>

              {/* Action or Claimed Code View */}
              {isClaimed ? (
                <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-emerald-400 font-bold block">MÃ ƯU ĐÃI CỦA BẠN:</span>
                    <span className="font-mono font-black text-white text-sm">{voucher.code}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(voucher.code)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold transition flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedCode === voucher.code ? "Đã chép!" : "Sao Chép"}</span>
                  </button>
                </div>
              ) : (
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {canAfford ? "Đủ xu đổi quà" : `Cần thêm ${voucher.coinsCost - user.travelCoins} xu`}
                  </span>

                  <button
                    onClick={() => handleClaim(voucher)}
                    disabled={!canAfford}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs shadow-stamp disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-1.5"
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>Đổi Mã ({voucher.coinsCost} Xu)</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
