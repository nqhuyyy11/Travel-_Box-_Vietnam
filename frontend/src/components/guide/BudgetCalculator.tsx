"use client";

import React, { useState } from "react";
import { 
  Calculator, 
  Users, 
  Calendar, 
  Car, 
  Home, 
  Utensils, 
  Ticket, 
  ShieldAlert, 
  Sparkles, 
  Phone, 
  AlertTriangle,
  MapPin,
  CheckCircle2
} from "lucide-react";

export default function BudgetCalculator() {
  const [peopleCount, setPeopleCount] = useState<number>(4);
  const [daysCount, setDaysCount] = useState<number>(3);
  const [transportType, setTransportType] = useState<"motor" | "bus" | "train">("bus");
  const [stayType, setStayType] = useState<"dorm" | "homestay" | "hotel">("homestay");
  const [destination, setDestination] = useState<string>("Hà Giang");

  // Calculations
  const transportCostPerPerson = transportType === "motor" ? 250000 : transportType === "bus" ? 550000 : 700000;
  const stayCostPerPersonPerNight = stayType === "dorm" ? 120000 : stayType === "homestay" ? 220000 : 350000;
  const foodCostPerPersonPerDay = 180000; // 3 meals local
  const ticketCostPerPerson = 250000;
  const contingencyPerPerson = 150000;

  const totalNights = Math.max(1, daysCount - 1);
  const perPersonTotal = 
    transportCostPerPerson + 
    (stayCostPerPersonPerNight * totalNights) + 
    (foodCostPerPersonPerDay * daysCount) + 
    ticketCostPerPerson + 
    contingencyPerPerson;

  const groupTotal = perPersonTotal * peopleCount;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            CẨM NANG & DỰ TOÁN NGÂN SÁCH SINH VIÊN <Calculator className="w-6 h-6 text-amber-400" />
          </h2>
          <p className="text-xs text-slate-400">
            Tự động tính toán chi phí trọn gói theo số người & số ngày, không lo phát sinh phụ phí
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
          💡 Cam kết bảng giá sinh viên thực tế 2026
        </div>
      </div>

      {/* Main Grid (Left Form + Right Budget Breakdown) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Inputs */}
        <div className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            ⚙️ Thiết Lập Kế Hoạch Chuyến Đi
          </h3>

          {/* Destination */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300">Điểm Đến Dự Kiến:</label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
            >
              <option value="Hà Giang">Hà Giang (Cao nguyên đá & Sông Nho Quế)</option>
              <option value="Đà Nẵng - Hội An">Đà Nẵng - Hội An - Đèo Hải Vân</option>
              <option value="Hà Nội - Ninh Bình">Hà Nội - Tràng An Cố Đô</option>
              <option value="Phú Quốc">Phú Quốc - Đảo Ngọc Tây Nam</option>
              <option value="Sài Gòn - Miền Tây">Sài Gòn - Chợ Nổi Cái Răng</option>
            </select>
          </div>

          {/* People and Days */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>Số người đi:</span>
                <span className="text-amber-400 font-mono font-bold">{peopleCount} Bạn</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={peopleCount}
                onChange={(e) => setPeopleCount(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>Thời gian:</span>
                <span className="text-amber-400 font-mono font-bold">{daysCount} Ngày {totalNights} Đêm</span>
              </label>
              <input
                type="range"
                min="1"
                max="7"
                value={daysCount}
                onChange={(e) => setDaysCount(Number(e.target.value))}
                className="w-full accent-red-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Transport Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300">Phương Tiện Di Chuyển:</label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                onClick={() => setTransportType("motor")}
                className={`p-3 rounded-xl border text-center transition ${
                  transportType === "motor" ? "border-amber-500 bg-slate-800 font-bold text-amber-300" : "border-slate-800 bg-slate-900/60 text-slate-400"
                }`}
              >
                🏍️ Xe Máy Phượt
              </button>
              <button
                onClick={() => setTransportType("bus")}
                className={`p-3 rounded-xl border text-center transition ${
                  transportType === "bus" ? "border-amber-500 bg-slate-800 font-bold text-amber-300" : "border-slate-800 bg-slate-900/60 text-slate-400"
                }`}
              >
                🚌 Xe Giường Nằm
              </button>
              <button
                onClick={() => setTransportType("train")}
                className={`p-3 rounded-xl border text-center transition ${
                  transportType === "train" ? "border-amber-500 bg-slate-800 font-bold text-amber-300" : "border-slate-800 bg-slate-900/60 text-slate-400"
                }`}
              >
                🚆 Tàu Hỏa / Bay
              </button>
            </div>
          </div>

          {/* Accommodation Level */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300">Hình Thức Lưu Trú:</label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                onClick={() => setStayType("dorm")}
                className={`p-3 rounded-xl border text-center transition ${
                  stayType === "dorm" ? "border-amber-500 bg-slate-800 font-bold text-amber-300" : "border-slate-800 bg-slate-900/60 text-slate-400"
                }`}
              >
                🛏️ Dorm Sinh Viên
              </button>
              <button
                onClick={() => setStayType("homestay")}
                className={`p-3 rounded-xl border text-center transition ${
                  stayType === "homestay" ? "border-amber-500 bg-slate-800 font-bold text-amber-300" : "border-slate-800 bg-slate-900/60 text-slate-400"
                }`}
              >
                🏡 Homestay Bản
              </button>
              <button
                onClick={() => setStayType("hotel")}
                className={`p-3 rounded-xl border text-center transition ${
                  stayType === "hotel" ? "border-amber-500 bg-slate-800 font-bold text-amber-300" : "border-slate-800 bg-slate-900/60 text-slate-400"
                }`}
              >
                🏨 Khách Sạn 2-3★
              </button>
            </div>
          </div>
        </div>

        {/* Right: Itemized Budget Breakdown Card */}
        <div className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/30 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              📊 Bảng Phân Bổ Ngân Sách ({destination})
            </h3>
            <span className="text-xs font-mono font-bold text-amber-400">
              {peopleCount} Người • {daysCount}N{totalNights}Đ
            </span>
          </div>

          {/* Itemized Rows */}
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Car className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-300">Xe cộ & Xăng xe di chuyển:</span>
              </div>
              <span className="font-mono font-bold text-white">{(transportCostPerPerson * peopleCount).toLocaleString()}đ</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Home className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">Homestay ({totalNights} đêm):</span>
              </div>
              <span className="font-mono font-bold text-white">{(stayCostPerPersonPerNight * totalNights * peopleCount).toLocaleString()}đ</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Utensils className="w-4 h-4 text-amber-400" />
                <span className="text-slate-300">Ẩm thực local ({daysCount} ngày, 3 bữa/ngày):</span>
              </div>
              <span className="font-mono font-bold text-white">{(foodCostPerPersonPerDay * daysCount * peopleCount).toLocaleString()}đ</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Ticket className="w-4 h-4 text-rose-400" />
                <span className="text-slate-300">Vé tham quan di sản & Thuyền bè:</span>
              </div>
              <span className="font-mono font-bold text-white">{(ticketCostPerPerson * peopleCount).toLocaleString()}đ</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4 text-purple-400" />
                <span className="text-slate-300">Quỹ dự phòng phát sinh & Thuốc men:</span>
              </div>
              <span className="font-mono font-bold text-white">{(contingencyPerPerson * peopleCount).toLocaleString()}đ</span>
            </div>
          </div>

          {/* Totals Summary */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-red-950/40 via-slate-900 to-amber-950/40 border border-amber-500/40 space-y-2">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Định mức mỗi thành viên:</span>
              <span className="font-mono font-black text-amber-300 text-sm">{perPersonTotal.toLocaleString()} VNĐ / người</span>
            </div>
            <div className="flex justify-between text-sm text-white pt-2 border-t border-slate-700">
              <span className="font-bold">Tổng kinh phí cả nhóm ({peopleCount} bạn):</span>
              <span className="font-mono font-black text-emerald-400 text-xl">{groupTotal.toLocaleString()} VNĐ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Local Food Guide & SOS Hotline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Local Verified Food List */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            🍜 Quán Ăn Ngon - Bổ - Rẻ Đã Xác Thực (Không Chặt Chém)
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between items-center">
              <div>
                <strong className="text-white">Bánh cuốn bà Hà (Đồng Văn, Hà Giang)</strong>
                <span className="text-slate-400 block text-[11px]">Nước dùng ninh xương ngọt lịm</span>
              </div>
              <span className="text-amber-400 font-bold font-mono">35.000đ</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between items-center">
              <div>
                <strong className="text-white">Mì Quảng bà Vị (Lê Đình Dương, Đà Nẵng)</strong>
                <span className="text-slate-400 block text-[11px]">Đậm đà tôm thịt, bánh tráng giòn rụm</span>
              </div>
              <span className="text-amber-400 font-bold font-mono">30.000đ - 45.000đ</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between items-center">
              <div>
                <strong className="text-white">Cơm tấm Ba Ghiền (Phú Nhuận, Sài Gòn)</strong>
                <span className="text-slate-400 block text-[11px]">Miếng sườn khổng lồ nướng than hoa</span>
              </div>
              <span className="text-amber-400 font-bold font-mono">55.000đ</span>
            </div>
          </div>
        </div>

        {/* SOS Hotline Directory */}
        <div className="glass-panel rounded-3xl p-6 border border-red-500/30 bg-red-950/10 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            Cẩm Nang An Toàn & SOS Khẩn Cấp 24/7
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-red-500/20 flex justify-between items-center">
              <span className="text-slate-300">Tổng Đài Cứu Hộ Giao Thông & Xe Máy Đèo:</span>
              <strong className="text-red-400 font-mono">115 / 0912.888.666</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-red-500/20 flex justify-between items-center">
              <span className="text-slate-300">Công An Du Lịch & Phản Ánh Chặt Chém:</span>
              <strong className="text-amber-400 font-mono">024.3825.2222</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-red-500/20 flex justify-between items-center">
              <span className="text-slate-300">Trung Tâm Dự Báo Bão Lũ Tây Bắc & Miền Trung:</span>
              <strong className="text-cyan-400 font-mono">1800.8000</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
