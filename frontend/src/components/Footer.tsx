"use client";

import React from "react";
import Link from "next/link";
import { Compass, Heart, ShieldCheck, Sparkles, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-12 pb-8 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800/60">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center shadow-stamp">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-wider">
                TRAVEL BOX <span className="text-amber-400">VIETNAM</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed pr-6">
              Hệ sinh thái du lịch O2O (Offline-to-Online) tiên phong kết hợp hộp quà di sản thực tế và Hộ chiếu số game hóa dành cho thế hệ trẻ Gen Z & Sinh viên Việt Nam.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Chuẩn OCOP & Di Sản Quốc Gia
              </span>
              <span className="px-2.5 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/30">
                -20% Ưu Đãi Thẻ SV
              </span>
            </div>
          </div>

          {/* Col 3: 7 Module */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Khám Phá Nền Tảng</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/passport" className="hover:text-amber-400 transition">Hộ Chiếu Số 63 Tỉnh</Link></li>
              <li><Link href="/audio" className="hover:text-amber-400 transition">Trạm Audio Guide Soundscape</Link></li>
              <li><Link href="/quests" className="hover:text-amber-400 transition">Nhiệm Vụ Thực Địa GPS</Link></li>
              <li><Link href="/shop" className="hover:text-amber-400 transition">Xưởng Tự Mix Hộp Quà</Link></li>
              <li><Link href="/guide" className="hover:text-amber-400 transition">Dự Toán Chi Phí Du Lịch</Link></li>
              <li><Link href="/community" className="hover:text-amber-400 transition">Ghép Bạn Phượt & Đổi Thưởng</Link></li>
            </ul>
          </div>

          {/* Col 4: Top Tỉnh Thành */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Box Tỉnh Thành Nổi Bật</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/shop" className="hover:text-amber-400 transition">Hà Nội: 36 Phố Phường</Link></li>
              <li><Link href="/shop" className="hover:text-amber-400 transition">Đà Nẵng: Hùng Quan Biển Bạc</Link></li>
              <li><Link href="/shop" className="hover:text-amber-400 transition">Hà Giang: Hoa Nở Trên Đá</Link></li>
              <li><Link href="/shop" className="hover:text-amber-400 transition">Sài Gòn: Phố Hẻm Không Ngủ</Link></li>
              <li><Link href="/shop" className="hover:text-amber-400 transition">Ninh Bình: Kỳ Quan Non Nước</Link></li>
            </ul>
          </div>

          {/* Col 5: Hotline & Hỗ trợ SV */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Hỗ Trợ & SOS Du Lịch</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Hotline: 1900 6868 (24/7)</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>support@travelbox.vn</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>Hà Nội & TP. Hồ Chí Minh</span>
              </li>
              <li className="pt-1 text-[11px] text-slate-400">
                Đồng hành cùng 50+ CLB Du Lịch & Đoàn Thanh Niên các trường Đại học toàn quốc.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Travel Box Vietnam. Bản quyền thuộc về Hệ sinh thái Du lịch Di sản O2O.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Thiết kế bởi tình yêu non sông gấm vóc Việt Nam</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
}
