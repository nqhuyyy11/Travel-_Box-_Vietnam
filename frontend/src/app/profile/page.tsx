"use client";

import React, { useState } from "react";
import { useTravelStore } from "@/store/travelStore";
import { 
  User, 
  GraduationCap, 
  Award, 
  Coins, 
  MapPin, 
  CheckCircle2, 
  QrCode, 
  Sparkles, 
  RotateCcw,
  ShieldCheck,
  Edit2
} from "lucide-react";

export default function ProfilePage() {
  const { user, openActivationModal, resetProgress, updateProfile } = useTravelStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editUni, setEditUni] = useState(user.university);
  const [editStudentId, setEditStudentId] = useState(user.studentId);

  const handleSave = () => {
    updateProfile({
      name: editName,
      university: editUni,
      studentId: editStudentId
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-travel-card relative overflow-hidden space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-2 border-[#0194f3] shadow-md">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-[#ff5e1f] text-white shadow-md border-2 border-white">
                <Award className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 font-bold text-xs uppercase">
                {user.levelTitle}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{user.name}</h1>
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-amber-600" />
                {user.university} • Mã SV: <strong className="text-amber-700">{user.studentId}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openActivationModal()}
              className="px-5 py-2.5 rounded-xl bg-[#ff5e1f] hover:bg-[#e04f16] text-white font-bold text-xs shadow-travel-cta transition flex items-center gap-1.5"
            >
              <QrCode className="w-4 h-4" />
              <span>Nhập Mã Hộp</span>
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition"
              title="Chỉnh sửa thông tin"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in text-xs">
            <h4 className="font-bold text-slate-900 uppercase">Cập Nhật Thông Tin Thẻ Sinh Viên:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Họ và tên"
                className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900"
              />
              <input
                type="text"
                value={editUni}
                onChange={(e) => setEditUni(e.target.value)}
                placeholder="Trường Đại học"
                className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900"
              />
              <input
                type="text"
                value={editStudentId}
                onChange={(e) => setEditStudentId(e.target.value)}
                placeholder="Mã số sinh viên"
                className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900"
              />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition"
              >
                Lưu Thay Đổi
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-300 transition"
              >
                Hủy
              </button>
            </div>
          </div>
        )}

        {/* Progress & Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[10px] uppercase text-slate-500 block font-bold">Điểm Kinh Nghiệm</span>
            <span className="text-xl font-black text-amber-600 font-mono mt-1 block">
              {user.xp.toLocaleString()} XP
            </span>
            <span className="text-[10px] text-slate-400">Mục tiêu: {user.nextLevelXp} XP</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[10px] uppercase text-slate-500 block font-bold">Travel Coins</span>
            <span className="text-xl font-black text-emerald-600 font-mono mt-1 block">
              {user.travelCoins.toLocaleString()} Xu
            </span>
            <span className="text-[10px] text-emerald-600">Khả dụng đổi quà</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[10px] uppercase text-slate-500 block font-bold">Tỉnh Đã Mở Khóa</span>
            <span className="text-xl font-black text-slate-900 font-mono mt-1 block">
              {user.unlockedProvinces.length} / 63
            </span>
            <span className="text-[10px] text-red-600">Đạt {Math.round((user.unlockedProvinces.length / 63) * 100)}%</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[10px] uppercase text-slate-500 block font-bold">Tem Đã Đóng Dấu</span>
            <span className="text-xl font-black text-[#0194f3] font-mono mt-1 block">
              {user.collectedStamps.length} Con Tem
            </span>
            <span className="text-[10px] text-slate-400">Bản quyền số</span>
          </div>
        </div>
      </div>

      {/* Unlocked Stamps Showcase */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-travel-card space-y-4">
        <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          Bộ Sưu Tập Tem Số Đã Mở Khóa ({user.collectedStamps.length})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.collectedStamps.map((stamp) => (
            <div
              key={stamp.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4 shadow-sm"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stamp.hologramColor} flex items-center justify-center text-2xl shadow-stamp shrink-0 animate-stamp-drop`}>
                {stamp.icon}
              </div>
              <div className="min-w-0 space-y-0.5">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-50 border border-red-200 text-red-600">
                  {stamp.provinceName}
                </span>
                <h4 className="font-bold text-slate-900 text-xs truncate">
                  "{stamp.title}"
                </h4>
                <p className="text-[10px] text-slate-400 font-mono">
                  Mở khóa: {stamp.unlockedAt || "2026"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reset & Dev settings */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <span>Dữ liệu được lưu trữ tự động trên Trình duyệt & Bộ nhớ LocalStorage</span>
        <button
          onClick={() => {
            if (confirm("Bạn có chắc chắn muốn đặt lại toàn bộ dữ liệu trải nghiệm về mặc định không?")) {
              resetProgress();
            }
          }}
          className="flex items-center gap-1 text-red-600 hover:text-red-700 font-bold transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Tiến Trình Thử Nghiệm</span>
        </button>
      </div>
    </div>
  );
}
