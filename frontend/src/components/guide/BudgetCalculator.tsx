"use client";

import React, { useState } from "react";
import { 
  Calculator, 
  Car, 
  Home, 
  Utensils, 
  Ticket, 
  ShieldAlert, 
  AlertTriangle 
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
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0194f3]">
            MODULE 5: TRAVEL GUIDE & BUDGET ESTIMATOR
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
            CẨM NANG & DỰ TOÁN NGÂN SÁCH SINH VIÊN <Calculator className="w-6 h-6 text-[#0194f3]" />
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tự động tính toán chi phí trọn gói theo số người & số ngày, không lo phát sinh phụ phí
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold shadow-xs">
          💡 Cam kết bảng giá sinh viên thực tế 2026
        </div>
      </div>

      {/* Main Grid (Left Form + Right Budget Breakdown) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Inputs */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <h3 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
            ⚙️ Thiết Lập Kế Hoạch Chuyến Đi
          </h3>

          {/* Destination */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Điểm Đến Dự Kiến:</label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-[#0194f3]"
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
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Số người đi:</span>
                <span className="text-[#0194f3] font-mono font-bold">{peopleCount} Bạn</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={peopleCount}
                onChange={(e) => setPeopleCount(Number(e.target.value))}
                className="w-full accent-[#0194f3] bg-slate-200 h-2 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Thời gian:</span>
                <span className="text-[#ff5e1f] font-mono font-bold">{daysCount} Ngày {totalNights} Đêm</span>
              </label>
              <input
                type="range"
                min="1"
                max="7"
                value={daysCount}
                onChange={(e) => setDaysCount(Number(e.target.value))}
                className="w-full accent-[#ff5e1f] bg-slate-200 h-2 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Transport Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Phương Tiện Di Chuyển:</label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                onClick={() => setTransportType("motor")}
                className={`p-3 rounded-xl border text-center transition ${
                  transportType === "motor" ? "border-[#0194f3] bg-sky-50 font-bold text-[#0194f3] shadow-xs" : "border-slate-200 bg-slate-50 text-slate-600"
                }`}
              >
                🏍️ Xe Máy Phượt
              </button>
              <button
                onClick={() => setTransportType("bus")}
                className={`p-3 rounded-xl border text-center transition ${
                  transportType === "bus" ? "border-[#0194f3] bg-sky-50 font-bold text-[#0194f3] shadow-xs" : "border-slate-200 bg-slate-50 text-slate-600"
                }`}
              >
                🚌 Xe Giường Nằm
              </button>
              <button
                onClick={() => setTransportType("train")}
                className={`p-3 rounded-xl border text-center transition ${
                  transportType === "train" ? "border-[#0194f3] bg-sky-50 font-bold text-[#0194f3] shadow-xs" : "border-slate-200 bg-slate-50 text-slate-600"
                }`}
              >
                🚆 Tàu Hỏa / Bay
              </button>
            </div>
          </div>

          {/* Accommodation Level */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Hình Thức Lưu Trú:</label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                onClick={() => setStayType("dorm")}
                className={`p-3 rounded-xl border text-center transition ${
                  stayType === "dorm" ? "border-[#0194f3] bg-sky-50 font-bold text-[#0194f3] shadow-xs" : "border-slate-200 bg-slate-50 text-slate-600"
                }`}
              >
                🛏️ Dorm Sinh Viên
              </button>
              <button
                onClick={() => setStayType("homestay")}
                className={`p-3 rounded-xl border text-center transition ${
                  stayType === "homestay" ? "border-[#0194f3] bg-sky-50 font-bold text-[#0194f3] shadow-xs" : "border-slate-200 bg-slate-50 text-slate-600"
                }`}
              >
                🏡 Homestay Bản
              </button>
              <button
                onClick={() => setStayType("hotel")}
                className={`p-3 rounded-xl border text-center transition ${
                  stayType === "hotel" ? "border-[#0194f3] bg-sky-50 font-bold text-[#0194f3] shadow-xs" : "border-slate-200 bg-slate-50 text-slate-600"
                }`}
              >
                🏨 Khách Sạn 2-3★
              </button>
            </div>
          </div>
        </div>

        {/* Right: Itemized Budget Breakdown Card */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              📊 Bảng Phân Bổ Ngân Sách ({destination})
            </h3>
            <span className="text-xs font-mono font-bold text-[#0194f3]">
              {peopleCount} Người • {daysCount}N{totalNights}Đ
            </span>
          </div>

          {/* Itemized Rows */}
          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Car className="w-4 h-4 text-[#0194f3]" />
                <span className="text-slate-700 font-medium">Xe cộ & Xăng xe di chuyển:</span>
              </div>
              <span className="font-mono font-bold text-slate-900">{(transportCostPerPerson * peopleCount).toLocaleString()}đ</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Home className="w-4 h-4 text-emerald-600" />
                <span className="text-slate-700 font-medium">Homestay ({totalNights} đêm):</span>
              </div>
              <span className="font-mono font-bold text-slate-900">{(stayCostPerPersonPerNight * totalNights * peopleCount).toLocaleString()}đ</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Utensils className="w-4 h-4 text-amber-600" />
                <span className="text-slate-700 font-medium">Ẩm thực local ({daysCount} ngày, 3 bữa/ngày):</span>
              </div>
              <span className="font-mono font-bold text-slate-900">{(foodCostPerPersonPerDay * daysCount * peopleCount).toLocaleString()}đ</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Ticket className="w-4 h-4 text-rose-500" />
                <span className="text-slate-700 font-medium">Vé tham quan di sản & Thuyền bè:</span>
              </div>
              <span className="font-mono font-bold text-slate-900">{(ticketCostPerPerson * peopleCount).toLocaleString()}đ</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4 text-purple-600" />
                <span className="text-slate-700 font-medium">Quỹ dự phòng phát sinh & Thuốc men:</span>
              </div>
              <span className="font-mono font-bold text-slate-900">{(contingencyPerPerson * peopleCount).toLocaleString()}đ</span>
            </div>
          </div>

          {/* Totals Summary */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50 via-white to-amber-50 border border-sky-200 space-y-2 shadow-xs">
            <div className="flex justify-between text-xs text-slate-600">
              <span>Định mức mỗi thành viên:</span>
              <span className="font-mono font-black text-[#ff5e1f] text-sm">{perPersonTotal.toLocaleString()} VNĐ / người</span>
            </div>
            <div className="flex justify-between text-sm text-slate-900 pt-2 border-t border-slate-200">
              <span className="font-extrabold">Tổng kinh phí cả nhóm ({peopleCount} bạn):</span>
              <span className="font-mono font-black text-emerald-700 text-xl">{groupTotal.toLocaleString()} VNĐ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Local Food Guide & SOS Hotline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Local Verified Food List */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
            🍜 Quán Ăn Ngon - Bổ - Rẻ Đã Xác Thực (Không Chặt Chém)
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
              <div>
                <strong className="text-slate-900 font-bold">Bánh cuốn bà Hà (Đồng Văn, Hà Giang)</strong>
                <span className="text-slate-500 block text-[11px]">Nước dùng ninh xương ngọt lịm</span>
              </div>
              <span className="text-[#ff5e1f] font-bold font-mono">35.000đ</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
              <div>
                <strong className="text-slate-900 font-bold">Mì Quảng bà Vị (Lê Đình Dương, Đà Nẵng)</strong>
                <span className="text-slate-500 block text-[11px]">Đậm đà tôm thịt, bánh tráng giòn rụm</span>
              </div>
              <span className="text-[#ff5e1f] font-bold font-mono">30.000đ - 45.000đ</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
              <div>
                <strong className="text-slate-900 font-bold">Cơm tấm Ba Ghiền (Phú Nhuận, Sài Gòn)</strong>
                <span className="text-slate-500 block text-[11px]">Miếng sườn khổng lồ nướng than hoa</span>
              </div>
              <span className="text-[#ff5e1f] font-bold font-mono">55.000đ</span>
            </div>
          </div>
        </div>

        {/* SOS Hotline Directory */}
        <div className="bg-white rounded-3xl p-6 border border-red-200/80 bg-red-50/20 shadow-sm space-y-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            Cẩm Nang An Toàn & SOS Khẩn Cấp 24/7
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-white border border-red-100 flex justify-between items-center shadow-xs">
              <span className="text-slate-700">Tổng Đài Cứu Hộ Giao Thông & Xe Máy Đèo:</span>
              <strong className="text-red-600 font-mono font-bold">115 / 0912.888.666</strong>
            </div>
            <div className="p-3 rounded-xl bg-white border border-red-100 flex justify-between items-center shadow-xs">
              <span className="text-slate-700">Công An Du Lịch & Phản Ánh Chặt Chém:</span>
              <strong className="text-amber-700 font-mono font-bold">024.3825.2222</strong>
            </div>
            <div className="p-3 rounded-xl bg-white border border-red-100 flex justify-between items-center shadow-xs">
              <span className="text-slate-700">Trung Tâm Dự Báo Bão Lũ Tây Bắc & Miền Trung:</span>
              <strong className="text-[#0194f3] font-mono font-bold">1800.8000</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
