"use client";

import React, { useState } from "react";
import { 
  X, 
  CheckCircle2, 
  Copy, 
  QrCode, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  GraduationCap
} from "lucide-react";
import confetti from "canvas-confetti";

interface VietQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderInfo: {
    title: string;
    totalPrice: number;
    originalPrice: number;
    discountAmount: number;
    orderCode: string;
    studentName?: string;
  };
}

export default function VietQRModal({ isOpen, onClose, orderInfo }: VietQRModalProps) {
  const [copied, setCopied] = useState(false);
  const [paid, setPaid] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatePaid = () => {
    setPaid(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const qrImageUrl = `https://api.vietqr.io/image/970422-0988686868-t3l2L7D.jpg?accountName=TRAVEL%20BOX%20VIETNAM&amount=${orderInfo.totalPrice}&addInfo=${encodeURIComponent(orderInfo.orderCode)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {paid ? (
          /* Payment Success Confirmation */
          <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border border-emerald-200 shadow-md">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">THANH TOÁN THÀNH CÔNG!</h3>
              <p className="text-xs text-slate-600">
                Đơn hàng <strong className="text-[#ff5e1f] font-mono">{orderInfo.orderCode}</strong> đã được ghi nhận. Chúng tôi sẽ đóng gói và chuyển hộp quà tới bạn trong vòng 24 - 48h!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Sản phẩm:</span>
                <span className="font-bold text-slate-900">{orderInfo.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tổng tiền đã thanh toán:</span>
                <span className="font-bold text-emerald-700 font-mono">{orderInfo.totalPrice.toLocaleString("vi-VN")}đ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Ưu đãi sinh viên áp dụng:</span>
                <span className="font-bold text-[#ff5e1f]">-{orderInfo.discountAmount.toLocaleString("vi-VN")}đ</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff5e1f] to-[#f97316] hover:from-[#f44a07] hover:to-[#ea580c] text-white font-bold text-sm shadow-md shadow-orange-500/20 transition"
            >
              Hoàn Tất & Tiếp Tục Khám Phá
            </button>
          </div>
        ) : (
          /* VietQR Payment Screen */
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0194f3] to-[#0264c8] flex items-center justify-center text-white shadow-md shadow-sky-500/20">
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  CỔNG THANH TOÁN VIETQR <Sparkles className="w-4 h-4 text-amber-500" />
                </h3>
                <p className="text-xs text-slate-500">
                  Quét mã qua ứng dụng ngân hàng hoặc ví MoMo / ZaloPay
                </p>
              </div>
            </div>

            {/* QR Card */}
            <div className="p-5 rounded-2xl bg-slate-50 text-slate-900 text-center space-y-3 border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-xs font-bold text-slate-700">
                <span className="text-red-600">VIETQR CHUYỂN KHOẢN 24/7</span>
                <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[10px]">Tự động duyệt</span>
              </div>

              {/* QR Image Simulation */}
              <div className="w-52 h-52 mx-auto bg-white rounded-xl p-2 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden shadow-xs">
                <img
                  src={qrImageUrl}
                  alt="VietQR Code"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <div className="text-center">
                <div className="text-xs text-slate-500 font-medium">Số tiền thanh toán:</div>
                <div className="text-2xl font-black text-red-600 font-mono">
                  {orderInfo.totalPrice.toLocaleString("vi-VN")} VNĐ
                </div>
                {orderInfo.discountAmount > 0 && (
                  <div className="text-[11px] text-emerald-700 font-bold flex items-center justify-center gap-1 mt-0.5">
                    <GraduationCap className="w-3.5 h-3.5 text-[#ff5e1f]" />
                    Đã giảm {orderInfo.discountAmount.toLocaleString("vi-VN")}đ với Thẻ SV
                  </div>
                )}
              </div>
            </div>

            {/* Transfer Details with Copy */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Ngân hàng:</span>
                <span className="font-bold text-slate-900">MB Bank (Ngân hàng Quân Đội)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Chủ tài khoản:</span>
                <span className="font-bold text-slate-900 uppercase">CONG TY TRAVEL BOX VIETNAM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Số tài khoản:</span>
                <button
                  onClick={() => handleCopy("0988686868")}
                  className="font-mono font-bold text-[#0194f3] hover:text-[#0264c8] flex items-center gap-1"
                >
                  <span>0988686868</span>
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Nội dung chuyển khoản:</span>
                <button
                  onClick={() => handleCopy(orderInfo.orderCode)}
                  className="font-mono font-bold text-[#ff5e1f] hover:text-[#ea580c] flex items-center gap-1"
                >
                  <span>{orderInfo.orderCode}</span>
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Copy Feedback */}
            {copied && (
              <div className="text-center text-xs text-emerald-700 font-semibold animate-pulse">
                ✓ Đã sao chép thông tin vào bộ nhớ tạm!
              </div>
            )}

            {/* Simulate button */}
            <button
              onClick={handleSimulatePaid}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0194f3] to-[#0264c8] hover:from-[#0087df] hover:to-[#0154a9] text-white font-bold text-sm shadow-xs transition flex items-center justify-center gap-2"
            >
              <span>Mô Phỏng Đã Quét Xong & Xác Nhận</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
