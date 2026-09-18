"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTravelStore } from "@/store/travelStore";
import { 
  Compass, 
  MapPin, 
  Headphones, 
  Target, 
  ShoppingBag, 
  BookOpen, 
  Users, 
  Sparkles, 
  Coins, 
  QrCode, 
  Menu, 
  X,
  Award
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { user, openActivationModal } = useTravelStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Trang Chủ", icon: Compass },
    { href: "/passport", label: "Hộ Chiếu & Bản Đồ", icon: MapPin },
    { href: "/audio", label: "Trạm Audio", icon: Headphones },
    { href: "/quests", label: "Nhiệm Vụ GPS", icon: Target },
    { href: "/shop", label: "Tự Mix Hộp Quà", icon: ShoppingBag },
    { href: "/guide", label: "Cẩm Nang Sinh Viên", icon: BookOpen },
    { href: "/community", label: "Cộng Đồng & Đổi Thưởng", icon: Users },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/90 py-2.5"
          : "bg-white/90 backdrop-blur-sm border-b border-slate-200/60 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0194f3] to-[#0264c8] flex items-center justify-center shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg sm:text-xl tracking-wider text-slate-900">TRAVEL BOX</span>
                <span className="px-1.5 py-0.5 text-[10px] font-extrabold bg-sky-50 text-[#0194f3] border border-sky-200 rounded">VIETNAM</span>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold hidden sm:block tracking-wider">HỘ CHIẾU SỐ & DU LỊCH DI SẢN O2O</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-100/90 p-1 rounded-full border border-slate-200/80 shadow-inner">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[#0264c8] to-[#0194f3] text-white shadow-sm font-bold"
                      : "text-slate-600 hover:text-[#0194f3] hover:bg-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Widgets */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* User Level & Coins Badge */}
            {mounted && (
              <Link
                href="/profile"
                className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-amber-50/90 border border-amber-200/80 hover:border-amber-300 hover:bg-amber-100/60 transition-all text-xs shadow-xs"
              >
                <div className="flex items-center gap-1.5 text-amber-800 font-bold">
                  <Coins className="w-4 h-4 text-amber-600" />
                  <span>{user.travelCoins.toLocaleString("vi-VN")}</span>
                  <span className="text-[10px] text-amber-700 font-normal">Xu</span>
                </div>
                <div className="h-3 w-px bg-amber-200" />
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>{user.unlockedProvinces.length}/63 Tỉnh</span>
                </div>
              </Link>
            )}

            {/* Quick QR Activation Button */}
            <button
              onClick={() => openActivationModal()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff5e1f] via-[#ff6a2f] to-[#f97316] hover:from-[#f44a07] hover:to-[#ea580c] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-orange-500/25 transition-all active:scale-95"
            >
              <QrCode className="w-4 h-4" />
              <span className="hidden xs:inline">Quét Mã Nắp Hộp</span>
              <span className="xs:hidden">Nhập Mã</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition border border-slate-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/98 border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 backdrop-blur-xl shadow-lg animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                    isActive
                      ? "bg-gradient-to-r from-[#0264c8] to-[#0194f3] text-white shadow-sm"
                      : "bg-slate-50 text-slate-700 hover:bg-sky-50 hover:text-[#0194f3] border border-slate-200/60"
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-500" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-700 px-2">
            <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 hover:text-[#0194f3] font-medium">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Hồ sơ: {user.name}</span>
            </Link>
            <span className="text-amber-700 font-bold">{user.travelCoins} Xu</span>
          </div>
        </div>
      )}
    </header>
  );
}
