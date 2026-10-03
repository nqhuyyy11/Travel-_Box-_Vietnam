"use client";

import React, { useState } from "react";
import { 
  X, 
  ShoppingBag, 
  Sparkles, 
  GraduationCap, 
  CheckCircle2, 
  Copy, 
  QrCode, 
  ShieldCheck, 
  ArrowRight,
  PackageCheck
} from "lucide-react";
import confetti from "canvas-confetti";
import { MOCK_TRAVEL_BOXES } from "@/lib/mockData";

interface QuickOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultBoxId?: string;
}

export default function QuickOrderModal({ isOpen, onClose, defaultBoxId }: QuickOrderModalProps) {
  const [selectedBoxId, setSelectedBoxId] = useState(defaultBoxId || MOCK_TRAVEL_BOXES[0].id);
  const [studentId, setStudentId] = useState("");
  const [hasStudentId, setHasStudentId] = useState(true);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentBox = MOCK_TRAVEL_BOXES.find((b) => b.id === selectedBoxId) || MOCK_TRAVEL_BOXES[0];
  const finalPrice = hasStudentId ? currentBox.studentPrice : currentBox.originalPrice;
  const discountAmount = currentBox.originalPrice - currentBox.studentPrice;

  const qrUrl = `https://img.vietqr.io/image/MB-0987654321-compact2.png?amount=${finalPrice}&addInfo=TRAVELBOX%20${currentBox.provinceCode}%20${customerPhone || "HOTEN"}&accountName=TRAVEL%20BOX%20VIETNAM`;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText("0987654321");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#ff5e1f] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ĐẶT HỘP QUÀ TRAVEL BOX CHÍNH HÃNG</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                Đặt Hàng Nhanh & Nhận Ưu Đãi Sinh Viên
              </h3>
              <p className="text-xs text-slate-500">
                Giao hàng toàn quốc trong 2-3 ngày. Nhập mã thẻ sinh viên để nhận ngay chiết khấu 20%.
              </p>
            </div>

            {/* Select Box Grid */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                1. Chọn Tỉnh Thành Hộp Quà:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {MOCK_TRAVEL_BOXES.map((box) => (
                  <button
                    key={box.id}
                    type="button"
                    onClick={() => setSelectedBoxId(box.id)}
                    className={`p-2.5 rounded-2xl border text-left transition flex items-center gap-2.5 ${
                      selectedBoxId === box.id
                        ? "border-[#0194f3] bg-sky-50/80 ring-2 ring-[#0194f3]/20"
                        : "border-slate-200 hover:border-slate-300 bg-slate-50/60"
                    }`}
                  >
                    <img
                      src={box.image}
                      alt={box.provinceName}
                      className="w-10 h-10 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-xs font-black text-slate-900 block truncate">
                        {box.provinceName}
                      </span>
                      <span className="text-[10px] text-[#ff5e1f] font-bold font-mono">
                        {box.studentPrice.toLocaleString()}đ
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleConfirmOrder} className="space-y-4">
              {/* Student verification toggle */}
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#ff5e1f]" />
                    <span className="text-xs font-bold text-slate-800">
                      Áp dụng ưu đãi Thẻ Sinh Viên (-20%)
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasStudentId}
                    onChange={(e) => setHasStudentId(e.target.checked)}
                    className="w-4 h-4 rounded text-[#ff5e1f] accent-[#ff5e1f] cursor-pointer"
                  />
                </div>
                {hasStudentId && (
                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Nhập Mã số Sinh viên (VD: 20210899)..."
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-xl border border-amber-300 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#ff5e1f]"
                    />
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1.5 rounded-xl shrink-0 flex items-center">
                      Đã giảm {discountAmount.toLocaleString()}đ
                    </span>
                  </div>
                )}
              </div>

              {/* Delivery Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 block">
                    Họ và tên người nhận *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0194f3]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 block">
                    Số điện thoại nhận hàng *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0912 345 678"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0194f3]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 block">
                  Địa chỉ giao hàng (hoặc Tên Ký Túc Xá / Trường ĐH) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ký túc xá ĐH Bách Khoa, Tạ Quang Bửu, Hai Bà Trưng, Hà Nội..."
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0194f3]"
                />
              </div>

              {/* VietQR Payment Preview */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
                <div className="bg-white p-2 rounded-xl shadow-xs border border-slate-200 shrink-0 text-center">
                  <img
                    src={qrUrl}
                    alt="VietQR Chuyển Khoản"
                    className="w-32 h-32 object-contain mx-auto"
                  />
                  <span className="text-[10px] text-slate-400 font-bold block mt-1">
                    Quét VietQR Tự Động
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 w-full">
                  <div className="flex justify-between items-center pb-1.5 border-b border-slate-200">
                    <span className="font-medium">Tổng thanh toán:</span>
                    <span className="text-base font-black text-[#ff5e1f] font-mono">
                      {finalPrice.toLocaleString()}đ
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span>Ngân hàng:</span>
                    <span className="font-bold text-slate-800">MB Bank (Quân Đội)</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span>Số tài khoản:</span>
                    <button
                      type="button"
                      onClick={handleCopyAccount}
                      className="font-mono font-bold text-[#0194f3] flex items-center gap-1 hover:underline"
                    >
                      <span>0987654321</span>
                      <Copy className="w-3 h-3" />
                      {isCopied && <span className="text-[10px] text-emerald-600 font-bold">Đã sao chép!</span>}
                    </button>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span>Chủ tài khoản:</span>
                    <span className="font-bold text-slate-800">TRAVEL BOX VIETNAM</span>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ff5e1f] via-[#ff6a2f] to-[#f97316] hover:from-[#f44a07] hover:to-[#ea580c] text-white font-black text-sm shadow-lg shadow-orange-500/25 transition active:scale-98 flex items-center justify-center gap-2"
              >
                <PackageCheck className="w-4 h-4" />
                <span>Xác Nhận Đặt Hộp ({finalPrice.toLocaleString()}đ)</span>
              </button>
            </form>
          </div>
        ) : (
          /* Order Confirmed Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <span className="text-xs font-extrabold uppercase text-emerald-600 tracking-wider">
                ĐẶT HÀNG THÀNH CÔNG!
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                Chúc mừng bạn đã sở hữu {currentBox.title}!
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Đơn hàng của bạn đang được xưởng đóng gói cẩn thận. Bạn sẽ nhận được cuộc gọi xác nhận từ đội ngũ Travel Box trong vòng 15 phút.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left space-y-2 max-w-md mx-auto">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Phần Quà Tặng Kèm Đã Được Thêm Vào:</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1 pl-6 list-disc">
                <li>Bộ 5 bưu thiếp nghệ thuật vẽ tay độc bản</li>
                <li>Mã QR độc nhất dưới nắp kích hoạt Hộ Chiếu Số</li>
                <li>Tặng +300 Travel Coins vào tài khoản thành viên</li>
              </ul>
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition"
            >
              Đóng và Tiếp Tục Khám Phá
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
