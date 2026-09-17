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
          ? "glass-panel bg-slate-950/85 shadow-lg border-b border-amber-500/20 py-2.5"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-heritage-red to-amber-600 flex items-center justify-center shadow-stamp shadow-red-600/30 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 text-white animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-wider text-white">TRAVEL BOX</span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded">VIETNAM</span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block tracking-wider">HỘ CHIẾU SỐ & DU LỊCH DI SẢN O2O</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-900/60 p-1 rounded-full border border-slate-800/80 backdrop-blur-md">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
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
                className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all text-xs"
              >
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span>{user.travelCoins.toLocaleString("vi-VN")}</span>
                  <span className="text-[10px] text-slate-400 font-normal">Xu</span>
                </div>
                <div className="h-3 w-px bg-slate-700" />
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Award className="w-4 h-4" />
                  <span>{user.unlockedProvinces.length}/63 Tỉnh</span>
                </div>
              </Link>
            )}

            {/* Quick QR Activation Button */}
            <button
              onClick={() => openActivationModal()}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-bold text-xs sm:text-sm shadow-stamp shadow-red-900/40 hover:shadow-gold-glow transition-all active:scale-95"
            >
              <QrCode className="w-4 h-4 animate-pulse" />
              <span className="hidden xs:inline">Quét Mã Nắp Hộp</span>
              <span className="xs:hidden">Nhập Mã</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 backdrop-blur-xl animate-in slide-in-from-top duration-200">
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
                      ? "bg-gradient-to-r from-red-600 to-amber-600 text-white"
                      : "bg-slate-900/60 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300 px-2">
            <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 hover:text-amber-400">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Hồ sơ: {user.name}</span>
            </Link>
            <span className="text-amber-400 font-bold">{user.travelCoins} Xu</span>
          </div>
        </div>
      )}
    </header>
  );
}
