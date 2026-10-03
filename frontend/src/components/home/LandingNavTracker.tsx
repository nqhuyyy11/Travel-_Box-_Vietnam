"use client";

import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Package, 
  Headphones, 
  MapPin, 
  ShoppingBag, 
  GraduationCap, 
  Users, 
  HelpCircle,
  ArrowUp,
  Target,
  Calculator
} from "lucide-react";

export default function LandingNavTracker() {
  const [activeSection, setActiveSection] = useState("hero");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const sections = [
    { id: "hero", label: "Tổng Quan", icon: Sparkles },
    { id: "unboxing", label: "Mở Hộp 3D", icon: Package },
    { id: "map-passport", label: "Bản Đồ & Tem Số", icon: MapPin },
    { id: "soundscape", label: "Âm Thanh 3D", icon: Headphones },
    { id: "custom-studio", label: "Xưởng Mix Quà", icon: ShoppingBag },
    { id: "quests", label: "Nhiệm Vụ GPS", icon: Target },
    { id: "budget-calc", label: "Dự Toán Phượt", icon: Calculator },
    { id: "pricing", label: "Ưu Đãi SV", icon: GraduationCap },
    { id: "community", label: "Cộng Đồng", icon: Users },
    { id: "faq", label: "FAQ", icon: HelpCircle },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sectionElements = sections.map((s) => ({
        id: s.id,
        el: document.getElementById(s.id),
      }));

      const scrollPosition = window.scrollY + 250;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el && item.el.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Floating Bottom Center Anchor Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden xl:block">
        <div className="flex items-center gap-1 p-1.5 rounded-full bg-slate-900/95 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/50 text-xs">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[#0194f3] to-[#0264c8] text-white shadow-md scale-105"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="text-[11px] whitespace-nowrap">{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#ff5e1f] hover:bg-[#ea580c] text-white shadow-xl shadow-orange-500/30 flex items-center justify-center transition-all hover:scale-110 active:scale-95 border-2 border-white/40"
          aria-label="Cuộn lên đầu trang"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}
