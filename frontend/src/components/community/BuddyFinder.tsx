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
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            GHÉP BẠN ĐỒNG HÀNH PHƯỢT <Users className="w-5 h-5 text-[#0194f3]" />
          </h3>
          <p className="text-xs text-slate-500">
            Tìm bạn cùng trường ĐH đi phượt, share tiền phòng homestay và cùng khám phá 63 tỉnh thành
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[#ff5e1f] hover:bg-[#e04f16] text-white font-bold text-xs shadow-travel-cta transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Đăng Tin Tìm Bạn Phượt</span>
        </button>
      </div>

      {/* Buddies Post List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {buddies.map((buddy) => (
          <div key={buddy.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-travel-card hover:shadow-travel-float transition space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={buddy.avatar}
                  alt={buddy.authorName}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{buddy.authorName}</h4>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                    {buddy.authorUniversity}
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold">
                Tìm thêm {buddy.seekingCount} bạn
              </span>
            </div>

            {/* Destination & Meta */}
            <div className="space-y-2">
              <h5 className="font-extrabold text-[#0194f3] text-sm">
                📍 {buddy.destination}
              </h5>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-red-500" />
                  <span className="truncate">{buddy.dates}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="truncate font-mono font-semibold">{buddy.estimatedCost}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 leading-relaxed">
              {buddy.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {buddy.tags.map((t, idx) => (
                <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  #{t}
                </span>
              ))}
            </div>

            {/* Bottom Connect */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">{buddy.createdAt}</span>
              <button
                onClick={() => alert(`Đã gửi yêu cầu ghép nhóm tới ${buddy.authorName}!`)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-[#0194f3] hover:text-white text-slate-700 font-bold text-xs transition flex items-center gap-1.5"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#0194f3]" />
              ĐĂNG TIN TÌM BẠN ĐỒNG HÀNH
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 font-bold">Điểm đến:</label>
                <input
                  type="text"
                  value={newDest}
                  onChange={(e) => setNewDest(e.target.value)}
                  placeholder="VD: Hà Giang - Đèo Mã Pí Lèng"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 mt-1 focus:bg-white focus:outline-none focus:border-[#0194f3]"
                />
              </div>

              <div>
                <label className="text-slate-700 font-bold">Thời gian:</label>
                <input
                  type="text"
                  value={newDates}
                  onChange={(e) => setNewDates(e.target.value)}
                  placeholder="VD: 15/11 - 18/11/2026 (3N2Đ)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 mt-1 focus:bg-white focus:outline-none focus:border-[#0194f3]"
                />
              </div>

              <div>
                <label className="text-slate-700 font-bold">Dự toán ngân sách / người:</label>
                <input
                  type="text"
                  value={newCost}
                  onChange={(e) => setNewCost(e.target.value)}
                  placeholder="VD: 1.800.000đ"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 mt-1 focus:bg-white focus:outline-none focus:border-[#0194f3]"
                />
              </div>

              <div>
                <label className="text-slate-700 font-bold">Nội dung chi tiết & tìm bao nhiêu bạn:</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Mô tả kế hoạch xe, phòng homestay, sở thích..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 mt-1 focus:bg-white focus:outline-none focus:border-[#0194f3]"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleCreateBuddy}
                className="flex-1 py-2.5 rounded-xl bg-[#ff5e1f] hover:bg-[#e04f16] text-white font-bold text-xs shadow-travel-cta transition"
              >
                Đăng Tin
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
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
