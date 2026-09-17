"use client";

import React, { useState } from "react";
import { MOCK_CUSTOM_BOX_OPTIONS } from "@/lib/mockData";
import { useTravelStore } from "@/store/travelStore";
import { 
  ShoppingBag, 
  Sparkles, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  GraduationCap, 
  Gift, 
  Layers, 
  MessageSquare, 
  CheckCircle2 
} from "lucide-react";
import VietQRModal from "./VietQRModal";

export default function CustomBoxBuilder() {
  const { user } = useTravelStore();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string>("HN");
  const [selectedModelId, setSelectedModelId] = useState<string>("mod_thaprua");
  const [selectedSnackIds, setSelectedSnackIds] = useState<string[]>(["snack_omai", "snack_trasen"]);
  const [selectedPostcardId, setSelectedPostcardId] = useState<string>("pc_1");
  const [customGreeting, setCustomGreeting] = useState<string>("Chúc bạn có một chuyến hành trình rực rỡ khắp mọi miền Việt Nam!");
  const [packType, setPackType] = useState<"Solo" | "Combo3" | "Combo5">("Solo");
  const [isStudentDiscount, setIsStudentDiscount] = useState<boolean>(true);
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);

  const options = MOCK_CUSTOM_BOX_OPTIONS;

  // Toggle snack selection (max 3)
  const toggleSnack = (snackId: string) => {
    if (selectedSnackIds.includes(snackId)) {
      setSelectedSnackIds(selectedSnackIds.filter(id => id !== snackId));
    } else {
      if (selectedSnackIds.length >= 3) {
        alert("Bạn chỉ được chọn tối đa 3 gói đặc sản cho một hộp quà!");
        return;
      }
      setSelectedSnackIds([...selectedSnackIds, snackId]);
    }
  };

  // Pricing calculations
  const baseBoxPrice = 289000;
  let packMultiplier = 1;
  let packDiscountRate = 0;

  if (packType === "Combo3") {
    packMultiplier = 3;
    packDiscountRate = 0.10; // -10%
  } else if (packType === "Combo5") {
    packMultiplier = 5;
    packDiscountRate = 0.15; // -15%
  }

  const rawTotal = baseBoxPrice * packMultiplier * (1 - packDiscountRate);
  const studentDiscountRate = isStudentDiscount ? 0.20 : 0;
  const finalTotal = Math.round(rawTotal * (1 - studentDiscountRate));
  const totalSaved = Math.round((baseBoxPrice * packMultiplier) - finalTotal);

  const selectedProvince = options.provinces.find(p => p.code === selectedProvinceCode);
  const selectedModel = options.models3D.find(m => m.id === selectedModelId);
  const selectedPostcard = options.postcards.find(p => p.id === selectedPostcardId);
  const selectedSnackObjects = options.snacks.filter(s => selectedSnackIds.includes(s.id));

  const steps = [
    { num: 1, title: "Chọn Tỉnh", icon: Layers },
    { num: 2, title: "Mô Hình 3D", icon: Sparkles },
    { num: 3, title: "3 Món OCOP", icon: Gift },
    { num: 4, title: "Lời Chúc & Thiệp", icon: MessageSquare },
    { num: 5, title: "Xác Nhận & VietQR", icon: ShoppingBag }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            XƯỞNG "TỰ MIX HỘP QUÀ" OCOP <Sparkles className="w-6 h-6 text-amber-400" />
          </h2>
          <p className="text-xs text-slate-400">
            Tự tay cá nhân hóa Travel Box theo phong cách riêng của bạn & Nhận ưu đãi 20% thẻ sinh viên
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold">
          <GraduationCap className="w-4 h-4" />
          <span>Sinh Viên: Giảm Trực Tiếp 20%</span>
        </div>
      </div>

      {/* 5-Step Process Bar */}
      <div className="grid grid-cols-5 gap-2 bg-slate-900/90 p-2 rounded-2xl border border-slate-800">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.num;
          const isDone = currentStep > step.num;

          return (
            <button
              key={step.num}
              onClick={() => setCurrentStep(step.num)}
              className={`py-2 px-2 rounded-xl text-center flex flex-col sm:flex-row items-center justify-center gap-1.5 transition ${
                isActive
                  ? "bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-stamp font-bold"
                  : isDone
                  ? "bg-slate-800/80 text-amber-300 font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] bg-black/30">
                {isDone ? <Check className="w-3 h-3" /> : step.num}
              </div>
              <span className="text-[11px] hidden md:inline truncate">{step.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Studio View (Left Options + Right Box Preview) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step Content Area (8 Cols) */}
        <div className="lg:col-span-8 glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          {/* STEP 1: Choose Province */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white">Bước 1: Chọn Tỉnh Thành Làm Chủ Đề Hộp</h3>
                <p className="text-xs text-slate-400">Hộp quà sẽ được đóng gói theo tông màu & di sản địa phương</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {options.provinces.map((prov) => {
                  const isSelected = selectedProvinceCode === prov.code;
                  return (
                    <div
                      key={prov.code}
                      onClick={() => setSelectedProvinceCode(prov.code)}
                      className={`relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all group ${
                        isSelected ? "border-amber-500 shadow-gold-glow scale-[1.02]" : "border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="h-28 overflow-hidden">
                        <img
                          src={prov.image}
                          alt={prov.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                        <span className="font-extrabold text-white text-sm">{prov.name}</span>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-400 fill-amber-400 text-slate-950" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Choose 3D Landmark Model */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white">Bước 2: Chọn Mô Hình 3D Lắp Ghép</h3>
                <p className="text-xs text-slate-400">Vật phẩm biểu tượng chế tác thủ công tinh xảo đặt trên bàn học</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {options.models3D.map((mod) => {
                  const isSelected = selectedModelId === mod.id;
                  return (
                    <div
                      key={mod.id}
                      onClick={() => setSelectedModelId(mod.id)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                        isSelected ? "bg-slate-800/90 border-amber-500 shadow-gold-glow" : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-700">
                        <img src={mod.image} alt={mod.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-xs leading-snug">{mod.name}</h4>
                        <span className="text-[10px] text-amber-400 font-mono mt-1 block">Giá trị: {mod.price.toLocaleString()}đ</span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Choose 3 Snacks OCOP */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Bước 3: Chọn 3 Gói Đặc Sản OCOP</h3>
                  <p className="text-xs text-slate-400">Đặc sản nông sản đạt chuẩn OCOP 4-5 sao đóng gói hút chân không</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-mono font-bold text-xs">
                  {selectedSnackIds.length}/3 Món
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {options.snacks.map((snack) => {
                  const isSelected = selectedSnackIds.includes(snack.id);
                  return (
                    <div
                      key={snack.id}
                      onClick={() => toggleSnack(snack.id)}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                        isSelected ? "bg-amber-950/20 border-amber-500 shadow-sm" : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-700">
                        <img src={snack.image} alt={snack.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-amber-300 font-bold">⭐ {snack.ocopStar} Sao OCOP</span>
                          <span className="text-[10px] text-slate-400">({snack.weight})</span>
                        </div>
                        <h4 className="font-bold text-white text-xs truncate mt-0.5">{snack.name}</h4>
                      </div>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        isSelected ? "bg-amber-500 border-amber-500 text-slate-950" : "border-slate-700 bg-slate-800"
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Postcard & Greeting */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-bold text-white">Bước 4: Soạn Lời Chúc & Chọn Bưu Thiếp Nghệ Thuật</h3>
                <p className="text-xs text-slate-400">Bưu thiếp độc bản vẽ tay bởi các họa sĩ trẻ Việt Nam</p>
              </div>

              {/* Choose Postcard */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {options.postcards.map((pc) => {
                  const isSelected = selectedPostcardId === pc.id;
                  return (
                    <div
                      key={pc.id}
                      onClick={() => setSelectedPostcardId(pc.id)}
                      className={`rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                        isSelected ? "border-amber-500 shadow-gold-glow scale-[1.02]" : "border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="h-28 overflow-hidden">
                        <img src={pc.image} alt={pc.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-2 bg-slate-900 text-center">
                        <p className="text-[11px] font-bold text-white truncate">{pc.name}</p>
                        <p className="text-[9px] text-slate-400 truncate">{pc.artist}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Text Greeting */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Lời Chúc In Kèm Hộp Quà:</label>
                <textarea
                  rows={3}
                  value={customGreeting}
                  onChange={(e) => setCustomGreeting(e.target.value)}
                  placeholder="Nhập lời chúc dành tặng bạn bè hoặc chính bạn..."
                  className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          )}

          {/* STEP 5: Combo Package & Confirmation */}
          {currentStep === 5 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-bold text-white">Bước 5: Chọn Gói Hộp & Ưu Đãi Thẻ Sinh Viên</h3>
                <p className="text-xs text-slate-400">Mua theo nhóm từ 3 đến 5 hộp để nhận thêm chiết khấu siêu hấp dẫn</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  onClick={() => setPackType("Solo")}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition text-center space-y-1 ${
                    packType === "Solo" ? "border-amber-500 bg-slate-800" : "border-slate-800 bg-slate-900/60"
                  }`}
                >
                  <span className="font-bold text-white text-sm">Hộp Đơn (Solo)</span>
                  <p className="text-[11px] text-slate-400">1 Hộp quà cá nhân hóa</p>
                  <span className="text-xs font-mono font-bold text-amber-400 block pt-1">289.000đ</span>
                </div>

                <div
                  onClick={() => setPackType("Combo3")}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition text-center space-y-1 ${
                    packType === "Combo3" ? "border-amber-500 bg-slate-800" : "border-slate-800 bg-slate-900/60"
                  }`}
                >
                  <span className="font-bold text-white text-sm">Combo Nhóm (3 Hộp)</span>
                  <p className="text-[11px] text-emerald-400 font-bold">Giảm thêm 10%</p>
                  <span className="text-xs font-mono font-bold text-amber-400 block pt-1">780.000đ</span>
                </div>

                <div
                  onClick={() => setPackType("Combo5")}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition text-center space-y-1 ${
                    packType === "Combo5" ? "border-amber-500 bg-slate-800" : "border-slate-800 bg-slate-900/60"
                  }`}
                >
                  <span className="font-bold text-white text-sm">Combo Phượt (5 Hộp)</span>
                  <p className="text-[11px] text-emerald-400 font-bold">Giảm thêm 15%</p>
                  <span className="text-xs font-mono font-bold text-amber-400 block pt-1">1.228.000đ</span>
                </div>
              </div>

              {/* Student ID discount check */}
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs">Áp Dụng Ưu Đãi Sinh Viên Toàn Quốc (-20%)</h5>
                    <p className="text-[11px] text-slate-400">Đã tự động liên kết thẻ SV: {user.studentId} ({user.university})</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isStudentDiscount}
                  onChange={(e) => setIsStudentDiscount(e.target.checked)}
                  className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {currentStep > 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay Lại</span>
              </button>
            ) : <div />}

            {currentStep < 5 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs shadow-stamp transition flex items-center gap-1.5"
              >
                <span>Tiếp Theo: {steps[currentStep].title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setIsQrModalOpen(true)}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm shadow-teal-glow transition flex items-center gap-2 animate-bounce"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Thanh Toán VietQR ({finalTotal.toLocaleString()}đ)</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Summary Box Visualizer (4 Cols) */}
        <div className="lg:col-span-4 glass-panel rounded-3xl p-6 border border-amber-500/30 space-y-5 sticky top-24">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="font-black text-white text-sm uppercase tracking-wider flex items-center gap-1.5">
              📦 Xem Trước Hộp Quà
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-600/30 text-red-300">
              {packType}
            </span>
          </div>

          {/* Box Item Checklist */}
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase">Chủ đề tỉnh:</span>
              <div className="font-bold text-amber-300">{selectedProvince?.name}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase">Mô hình 3D:</span>
              <div className="font-bold text-white">{selectedModel?.name}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase">3 Đặc sản OCOP:</span>
              <ul className="space-y-0.5 mt-1">
                {selectedSnackObjects.map((s) => (
                  <li key={s.id} className="text-slate-300 flex items-center gap-1">
                    <span className="text-amber-400">✔</span> {s.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase">Bưu thiếp nghệ thuật:</span>
              <div className="font-bold text-white">{selectedPostcard?.name}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase">Tặng kèm đặc quyền:</span>
              <div className="text-emerald-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Mã QR Nắp Hộp + Thuyết Minh Audio
              </div>
            </div>
          </div>

          {/* Pricing summary */}
          <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Giá niêm yết:</span>
              <span className="line-through">{(baseBoxPrice * packMultiplier).toLocaleString()}đ</span>
            </div>
            {totalSaved > 0 && (
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Tiết kiệm (Combo + SV):</span>
                <span>-{totalSaved.toLocaleString()}đ</span>
              </div>
            )}
            <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
              <span>Tổng thanh toán:</span>
              <span className="text-amber-400 font-mono">{finalTotal.toLocaleString()}đ</span>
            </div>
          </div>

          <button
            onClick={() => setIsQrModalOpen(true)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs shadow-stamp transition text-center"
          >
            Đặt Mua & Sinh Mã VietQR
          </button>
        </div>
      </div>

      {/* VietQR Payment Modal */}
      <VietQRModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        orderInfo={{
          title: `Custom Travel Box ${selectedProvince?.name} (${packType})`,
          totalPrice: finalTotal,
          originalPrice: baseBoxPrice * packMultiplier,
          discountAmount: totalSaved,
          orderCode: `TBV-CUSTOM-${Math.floor(100000 + Math.random() * 900000)}`,
          studentName: user.name
        }}
      />
    </div>
  );
}
