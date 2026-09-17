"use client";

import React, { useState } from "react";
import { MOCK_BUDDIES } from "@/lib/mockData";
import { TravelBuddyPost } from "@/types";
import { 
  Users, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Plus, 
  Tag, 
  GraduationCap, 
  MessageSquare,
  Sparkles
} from "lucide-react";

export default function BuddyFinder() {
  const [buddies, setBuddies] = useState<TravelBuddyPost[]>(MOCK_BUDDIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDest, setNewDest] = useState("");
  const [newDates, setNewDates] = useState("");
  const [newCost, setNewCost] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const handleCreateBuddy = () => {
    if (!newDest || !newDates || !newDesc) return;
    const post: TravelBuddyPost = {
      id: `buddy_${Date.now()}`,
      authorName: "Nguyễn Minh Khang (Bạn)",
      authorUniversity: "ĐH Bách Khoa Hà Nội",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
      destination: newDest,
      dates: newDates,
      estimatedCost: newCost || "1.500.000đ / người",
      seekingCount: 2,
      currentMembers: 1,
      description: newDesc,
      tags: ["Bách Khoa", "Ghép xe máy", "Tiết kiệm"],
      createdAt: "Vừa xong"
    };

    setBuddies([post, ...buddies]);
    setIsModalOpen(false);
    setNewDest("");
    setNewDates("");
    setNewCost("");
    setNewDesc("");
  };

  return (
    <div className="space-y-6">
      {/* Header & Post Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            GHÉP BẠN ĐỒNG HÀNH PHƯỢT <Users className="w-5 h-5 text-amber-400" />
          </h3>
          <p className="text-xs text-slate-400">
            Tìm bạn cùng trường ĐH đi phượt, share tiền phòng homestay và cùng khám phá 63 tỉnh thành
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs shadow-stamp transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Đăng Tin Tìm Bạn Phượt</span>
        </button>
      </div>

      {/* Buddies Post List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {buddies.map((buddy) => (
          <div key={buddy.id} className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={buddy.avatar}
                  alt={buddy.authorName}
                  className="w-11 h-11 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <h4 className="font-bold text-white text-xs sm:text-sm">{buddy.authorName}</h4>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                    {buddy.authorUniversity}
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
                Tìm thêm {buddy.seekingCount} bạn
              </span>
            </div>

            {/* Destination & Meta */}
            <div className="space-y-2">
              <h5 className="font-extrabold text-white text-sm text-amber-300">
                📍 {buddy.destination}
              </h5>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-red-400" />
                  <span className="truncate">{buddy.dates}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="truncate font-mono">{buddy.estimatedCost}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 leading-relaxed">
              {buddy.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {buddy.tags.map((t, idx) => (
                <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  #{t}
                </span>
              ))}
            </div>

            {/* Bottom Connect */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">{buddy.createdAt}</span>
              <button
                onClick={() => alert(`Đã gửi yêu cầu ghép nhóm tới ${buddy.authorName}!`)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs transition flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Nhắn Ghép Team</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-amber-500/40 rounded-3xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-400" />
              ĐĂNG TIN TÌM BẠN ĐỒNG HÀNH
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-bold">Điểm đến:</label>
                <input
                  type="text"
                  value={newDest}
                  onChange={(e) => setNewDest(e.target.value)}
                  placeholder="VD: Hà Giang - Đèo Mã Pí Lèng"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white mt-1"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold">Thời gian:</label>
                <input
                  type="text"
                  value={newDates}
                  onChange={(e) => setNewDates(e.target.value)}
                  placeholder="VD: 15/11 - 18/11/2026 (3N2Đ)"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white mt-1"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold">Dự toán ngân sách / người:</label>
                <input
                  type="text"
                  value={newCost}
                  onChange={(e) => setNewCost(e.target.value)}
                  placeholder="VD: 1.800.000đ"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white mt-1"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold">Nội dung chi tiết & tìm bao nhiêu bạn:</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Mô tả kế hoạch xe, phòng homestay, sở thích..."
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white mt-1"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleCreateBuddy}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-xs"
              >
                Đăng Tin
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
