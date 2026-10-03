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
  Calculator, 
  Users, 
  Sparkles, 
  Coins, 
  QrCode, 
  Menu, 
  X,
  Award,
  Package,
  GraduationCap
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
    { href: "#hero", label: "Tổng Quan", icon: Compass },
    { href: "#unboxing", label: "Mở Hộp 3D", icon: Package },
    { href: "#map-passport", label: "Hộ Chiếu & Bản Đồ", icon: MapPin },
    { href: "#soundscape", label: "Âm Thanh 3D", icon: Headphones },
    { href: "#custom-studio", label: "Xưởng Tự Mix", icon: ShoppingBag },
    { href: "#quests", label: "Nhiệm Vụ GPS", icon: Target },
    { href: "#budget-calc", label: "Dự Toán Phượt", icon: Calculator },
    { href: "#pricing", label: "Bảng Giá SV", icon: GraduationCap },
    { href: "#community", label: "Cộng Đồng", icon: Users },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === "/") {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else if (href === "#hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setMobileMenuOpen(false);
    }
  };

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
          <Link 
            href="/#hero" 
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0194f3] to-[#0264c8] flex items-center justify-center shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg sm:text-xl tracking-wider text-slate-900">TRAVEL BOX</span>
                <span className="px-1.5 py-0.5 text-[10px] font-extrabold bg-sky-50 text-[#0194f3] border border-sky-200 rounded">VIETNAM</span>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold hidden sm:block tracking-wider">HỆ SINH THÁI DU LỊCH O2O CHO GEN Z</p>
            </div>
          </Link>

          {/* Desktop Nav Links (Smooth Scroll Anchors) */}
          <nav className="hidden 2xl:flex items-center gap-1 bg-slate-100/90 p-1 rounded-full border border-slate-200/80 shadow-inner">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={pathname === "/" ? link.href : `/${link.href}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-[#0194f3] hover:bg-white transition-all cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0194f3]" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Widgets */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* User Level & Coins Badge */}
            {mounted && (
              <a
                href="#community"
                onClick={(e) => handleNavClick(e, "#community")}
                className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-amber-50/90 border border-amber-200/80 hover:border-amber-300 hover:bg-amber-100/60 transition-all text-xs shadow-xs cursor-pointer"
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
              </a>
            )}

            {/* Quick QR Activation Button */}
            <button
              onClick={() => openActivationModal()}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff5e1f] via-[#ff6a2f] to-[#f97316] hover:from-[#f44a07] hover:to-[#ea580c] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-orange-500/25 transition-all active:scale-95"
            >
              <QrCode className="w-4 h-4" />
              <span className="hidden xs:inline">Quét Mã Nắp Hộp</span>
              <span className="xs:hidden">Nhập Mã</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="2xl:hidden p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition border border-slate-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="2xl:hidden bg-white/98 border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 backdrop-blur-xl shadow-lg animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={pathname === "/" ? link.href : `/${link.href}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 text-slate-700 hover:bg-sky-50 hover:text-[#0194f3] border border-slate-200/60 transition"
                >
                  <Icon className="w-4 h-4 text-amber-500" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-700 px-2">
            <span className="flex items-center gap-2 font-medium">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Hồ sơ: {user.name}</span>
            </span>
            <span className="text-amber-700 font-bold">{user.travelCoins} Xu</span>
          </div>
        </div>
      )}
    </header>
  );
}
