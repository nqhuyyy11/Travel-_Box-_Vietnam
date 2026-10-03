"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, RotateCcw, Box, Eye, CheckCircle2, ChevronRight, Flame } from "lucide-react";
import confetti from "canvas-confetti";
import { useTravelStore } from "@/store/travelStore";

interface ThemeOption {
  id: string;
  name: string;
  province: string;
  boxColor: number;
  ribbonColor: number;
  accentColor: string;
  heritageTitle: string;
  heritageDesc: string;
}

const BOX_THEMES: ThemeOption[] = [
  {
    id: "hanoi",
    name: "Sơn Mài Thăng Long",
    province: "Hà Nội",
    boxColor: 0x991b1b, // Deep Lacquer Red
    ribbonColor: 0xf59e0b, // Gold
    accentColor: "from-red-600 to-amber-600",
    heritageTitle: "Mô Hình Gỗ Tháp Rùa 3D",
    heritageDesc: "Kèm 3 gói OCOP: Ô mai sấu gừng, Trà sen Tây Hồ, Bánh cốm Làng Vòng"
  },
  {
    id: "danang",
    name: "Biển Bạc Sơn Trà",
    province: "Đà Nẵng",
    boxColor: 0x0284c7, // Ocean Blue
    ribbonColor: 0xfcd34d, // Champagne Gold
    accentColor: "from-sky-600 to-blue-700",
    heritageTitle: "Mô Hình Kim Loại Cầu Rồng Mạ Vàng",
    heritageDesc: "Kèm 3 gói OCOP: Mực rim me, Bánh khô mè Cẩm Lệ, Bò khô Cầu Mống"
  },
  {
    id: "hagiang",
    name: "Lục Bảo Cao Nguyên",
    province: "Hà Giang",
    boxColor: 0x047857, // Emerald Green
    ribbonColor: 0xfbbf24, // Amber
    accentColor: "from-emerald-600 to-teal-700",
    heritageTitle: "Mô Hình Cột Cờ Lũng Cú & Mã Pí Lèng",
    heritageDesc: "Kèm 3 gói OCOP: Thịt trâu gác bếp, Bánh tam giác mạch, Trà Shan Tuyết"
  },
  {
    id: "saigon",
    name: "Hoàng Hôn Gia Định",
    province: "TP. Hồ Chí Minh",
    boxColor: 0x6d28d9, // Royal Purple
    ribbonColor: 0xf59e0b, // Gold
    accentColor: "from-purple-600 to-pink-600",
    heritageTitle: "Mô Hình Tháp Đồng Hồ Chợ Bến Thành",
    heritageDesc: "Kèm 3 gói OCOP: Cơm cháy chà bông, Hạt sen sấy, Cà phê phin vợt"
  }
];

export default function ThreeBoxCanvas() {
  const { openActivationModal } = useTravelStore();
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedThemeIndex, setSelectedThemeIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  // References to Three.js objects that we update in state changes
  const lidPivotRef = useRef<THREE.Group | null>(null);
  const treasureGroupRef = useRef<THREE.Group | null>(null);
  const insideLightRef = useRef<THREE.PointLight | null>(null);
  const boxMaterialsRef = useRef<{ box: THREE.MeshStandardMaterial; ribbon: THREE.MeshStandardMaterial } | null>(null);
  const isOpenRef = useRef(false);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const currentTheme = BOX_THEMES[selectedThemeIndex];

  // Initialize Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 450;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2.8, 6.2);
    camera.lookAt(0, 0.2, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 0.85);
    scene.add(ambientLight);

    const mainSpot = new THREE.SpotLight(0xffffff, 2.5);
    mainSpot.position.set(5, 8, 6);
    mainSpot.angle = Math.PI / 4;
    mainSpot.penumbra = 0.5;
    scene.add(mainSpot);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    rimLight.position.set(-6, 3, -5);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xffedd5, 0.9);
    fillLight.position.set(0, -4, 4);
    scene.add(fillLight);

    const insideLight = new THREE.PointLight(0xffd700, 0.1, 6);
    insideLight.position.set(0, 0.8, 0);
    scene.add(insideLight);
    insideLightRef.current = insideLight;

    // 5. Materials
    const boxMat = new THREE.MeshStandardMaterial({
      color: currentTheme.boxColor,
      roughness: 0.22,
      metalness: 0.2,
    });

    const ribbonMat = new THREE.MeshStandardMaterial({
      color: currentTheme.ribbonColor,
      roughness: 0.25,
      metalness: 0.85,
    });

    const goldTrimMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.18,
      metalness: 0.92,
    });

    boxMaterialsRef.current = { box: boxMat, ribbon: ribbonMat };

    // 6. Build the 3D Gift Box
    const boxGroup = new THREE.Group();
    scene.add(boxGroup);

    // (A) Box Base (width 2.6, height 1.8, depth 2.6)
    const baseGeo = new THREE.BoxGeometry(2.6, 1.8, 2.6);
    const baseMesh = new THREE.Mesh(baseGeo, boxMat);
    baseMesh.position.y = 0;
    boxGroup.add(baseMesh);

    // Gold Corner Trims
    const cornerGeo = new THREE.BoxGeometry(0.12, 1.82, 0.12);
    const corners = [
      [-1.25, 0, -1.25],
      [1.25, 0, -1.25],
      [-1.25, 0, 1.25],
      [1.25, 0, 1.25],
    ];
    corners.forEach(([cx, cy, cz]) => {
      const cMesh = new THREE.Mesh(cornerGeo, goldTrimMat);
      cMesh.position.set(cx, cy, cz);
      boxGroup.add(cMesh);
    });

    // Base Ribbons (Cross)
    const ribbonHGeo = new THREE.BoxGeometry(2.62, 1.81, 0.42);
    const ribbonH = new THREE.Mesh(ribbonHGeo, ribbonMat);
    boxGroup.add(ribbonH);

    const ribbonVGeo = new THREE.BoxGeometry(0.42, 1.81, 2.62);
    const ribbonV = new THREE.Mesh(ribbonVGeo, ribbonMat);
    boxGroup.add(ribbonV);

    // (B) Box Lid with Pivot (Pivot at top-back edge: y = 0.9, z = -1.3)
    const lidPivot = new THREE.Group();
    lidPivot.position.set(0, 0.9, -1.3);
    boxGroup.add(lidPivot);
    lidPivotRef.current = lidPivot;

    // Lid geometry (width 2.72, height 0.36, depth 2.72)
    // Offset lid so it rests naturally on the box
    const lidGeo = new THREE.BoxGeometry(2.72, 0.36, 2.72);
    const lidMesh = new THREE.Mesh(lidGeo, boxMat);
    lidMesh.position.set(0, 0.18, 1.3);
    lidPivot.add(lidMesh);

    // Lid Cross Ribbons
    const lidRibbonX = new THREE.Mesh(new THREE.BoxGeometry(2.74, 0.38, 0.44), ribbonMat);
    lidRibbonX.position.set(0, 0.18, 1.3);
    lidPivot.add(lidRibbonX);

    const lidRibbonZ = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.38, 2.74), ribbonMat);
    lidRibbonZ.position.set(0, 0.18, 1.3);
    lidPivot.add(lidRibbonZ);

    // 3D Golden Bow on top of lid
    const bowKnot = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), ribbonMat);
    bowKnot.position.set(0, 0.42, 1.3);
    lidPivot.add(bowKnot);

    const bowLoopGeo = new THREE.TorusGeometry(0.26, 0.08, 12, 24);
    const bowLoopL = new THREE.Mesh(bowLoopGeo, ribbonMat);
    bowLoopL.rotation.y = Math.PI / 4;
    bowLoopL.position.set(-0.25, 0.46, 1.3);
    lidPivot.add(bowLoopL);

    const bowLoopR = new THREE.Mesh(bowLoopGeo, ribbonMat);
    bowLoopR.rotation.y = -Math.PI / 4;
    bowLoopR.position.set(0.25, 0.46, 1.3);
    lidPivot.add(bowLoopR);

    // (C) Inside Treasure Group (Trồi lên khi mở nắp)
    const treasureGroup = new THREE.Group();
    treasureGroup.position.set(0, -0.2, 0);
    treasureGroup.scale.set(0.1, 0.1, 0.1);
    boxGroup.add(treasureGroup);
    treasureGroupRef.current = treasureGroup;

    // Stylized Heritage Landmark: 3D Golden Tower / Stupa
    const towerTier1 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.3, 0.9), goldTrimMat);
    towerTier1.position.y = 0.15;
    treasureGroup.add(towerTier1);

    const towerTier2 = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.4, 0.65), goldTrimMat);
    towerTier2.position.y = 0.5;
    treasureGroup.add(towerTier2);

    const towerRoof = new THREE.Mesh(new THREE.ConeGeometry(0.55, 0.6, 4), ribbonMat);
    towerRoof.position.y = 1.0;
    towerRoof.rotation.y = Math.PI / 4;
    treasureGroup.add(towerRoof);

    // Glowing Star on top
    const starGlow = new THREE.Mesh(new THREE.OctahedronGeometry(0.18), new THREE.MeshBasicMaterial({ color: 0xfffbeb }));
    starGlow.position.y = 1.45;
    treasureGroup.add(starGlow);

    // (D) Floating Golden Sparkle Particles
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 7;
      particlePositions[i * 3 + 1] = Math.random() * 4 - 1;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 7;
      particleSpeeds[i] = 0.005 + Math.random() * 0.01;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.06,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Mouse Drag / Touch Controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = 0.55;
    let targetRotX = 0.22;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotY += deltaX * 0.008;
      targetRotX += deltaY * 0.006;
      targetRotX = Math.max(-0.4, Math.min(0.7, targetRotX));
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const canvasDom = renderer.domElement;
    canvasDom.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Gentle auto-rotation when not dragging
      if (!isDragging && autoRotate) {
        targetRotY += 0.004;
      }

      // Smooth Box Rotation
      boxGroup.rotation.y += (targetRotY - boxGroup.rotation.y) * 0.08;
      boxGroup.rotation.x += (targetRotX - boxGroup.rotation.x) * 0.08;

      // Floating gentle bobbing
      boxGroup.position.y = Math.sin(time * 1.5) * 0.08;

      // Lid Open / Close Animation (Target angle: -1.35 rad ~ -77 deg)
      const targetLidAngle = isOpenRef.current ? -1.35 : 0;
      if (lidPivot) {
        lidPivot.rotation.x += (targetLidAngle - lidPivot.rotation.x) * 0.1;
      }

      // Treasure Rising & Glowing
      if (treasureGroup && insideLight) {
        if (isOpenRef.current) {
          treasureGroup.position.y += (1.45 - treasureGroup.position.y) * 0.08;
          treasureGroup.scale.lerp(new THREE.Vector3(1, 1, 1), 0.08);
          treasureGroup.rotation.y += 0.015;
          insideLight.intensity += (4.0 - insideLight.intensity) * 0.08;
        } else {
          treasureGroup.position.y += (-0.2 - treasureGroup.position.y) * 0.12;
          treasureGroup.scale.lerp(new THREE.Vector3(0.01, 0.01, 0.01), 0.12);
          insideLight.intensity += (0.1 - insideLight.intensity) * 0.1;
        }
      }

      // Star Glow Pulsing
      starGlow.rotation.y += 0.03;
      starGlow.rotation.x += 0.02;

      // Particles orbit
      particles.rotation.y = time * 0.04;
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(time + i) * 0.002;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 450;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvasDom.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      renderer.dispose();
      baseGeo.dispose();
      lidGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      boxMat.dispose();
      ribbonMat.dispose();
      goldTrimMat.dispose();
    };
  }, []);

  // Update Theme Colors dynamically in the active scene
  useEffect(() => {
    if (boxMaterialsRef.current) {
      boxMaterialsRef.current.box.color.setHex(currentTheme.boxColor);
      boxMaterialsRef.current.ribbon.color.setHex(currentTheme.ribbonColor);
    }
  }, [selectedThemeIndex, currentTheme]);

  const toggleOpen = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden space-y-6">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0194f3]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6 relative z-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span>CÔNG NGHỆ 3D THREE.JS WEBGL RENDERER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            Khui Nắp Hộp Quà 3D Tương Tác 360°
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Dùng chuột hoặc ngón tay để kéo xoay chiếc hộp 3D tự do, bấm nút để bật mở nắp hộp và chiêm ngưỡng báu vật di sản phát sáng bên trong.
          </p>
        </div>

        {/* Theme Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800">
          {BOX_THEMES.map((theme, idx) => (
            <button
              key={theme.id}
              onClick={() => setSelectedThemeIndex(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                selectedThemeIndex === idx
                  ? "bg-white text-slate-900 shadow-md scale-105"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>{theme.province}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main 3D Stage & Interactive Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
        {/* Left: 3D Canvas Viewport */}
        <div className="lg:col-span-8 bg-gradient-to-b from-slate-900/90 to-slate-950/90 rounded-3xl border border-slate-800/80 overflow-hidden relative shadow-inner group">
          {/* Canvas Container */}
          <div
            ref={mountRef}
            className="w-full h-[400px] sm:h-[480px] cursor-grab active:cursor-grabbing flex items-center justify-center"
            title="Kéo chuột để xoay 360 độ hộp quà"
          />

          {/* Floating Canvas Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-xs font-bold text-slate-300 flex items-center gap-1.5 shadow-md">
              <Box className="w-3.5 h-3.5 text-cyan-400" />
              <span>Chế độ 3D Real-time</span>
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border shadow-md ${
              isOpen
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                : "bg-slate-800/80 text-slate-400 border-slate-700"
            }`}>
              {isOpen ? "✨ Nắp Hộp Đã Mở" : "🔒 Nắp Hộp Đang Đóng"}
            </span>
          </div>

          {/* Interactive Hint Bottom Center */}
          <div className="absolute bottom-4 inset-x-0 flex justify-center items-center gap-2 pointer-events-none text-[11px] text-slate-400 font-medium">
            <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              💡 Giữ chuột & kéo để xoay 360° | Cuộn để quan sát góc cạnh
            </span>
          </div>
        </div>

        {/* Right: Controller & Unboxed Treasures Details */}
        <div className="lg:col-span-4 space-y-4">
          {/* Box Status Card */}
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-400">
                PHIÊN BẢN ĐẶC QUYỀN
              </span>
              <h3 className="text-lg font-black text-white">
                {currentTheme.name}
              </h3>
              <p className="text-xs text-slate-400">
                Tỉnh thành: <strong className="text-white">{currentTheme.province}</strong>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={toggleOpen}
                className={`w-full py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 ${
                  isOpen
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-amber-500/25"
                    : "bg-gradient-to-r from-[#ff5e1f] via-[#ff6a2f] to-[#f97316] text-white shadow-orange-500/35"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>{isOpen ? "Đóng Nắp Hộp 3D" : "Bấm Khui Mở Nắp 3D Ngay!"}</span>
              </button>

              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-bold text-xs transition border border-slate-700/60 flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{autoRotate ? "Tắt Tự Xoay" : "Bật Tự Xoay 360°"}</span>
              </button>
            </div>
          </div>

          {/* Dynamic Unboxed Treasure Reveal */}
          <div className={`p-5 rounded-3xl border transition-all duration-500 space-y-3 ${
            isOpen
              ? "bg-gradient-to-br from-amber-500/15 to-slate-900 border-amber-500/40 shadow-xl shadow-amber-500/10"
              : "bg-slate-900/40 border-slate-800 opacity-60"
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Vật Phẩm Phát Sáng Bên Trong</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {isOpen ? "ĐÃ MỞ KHÓA" : "ĐANG KHÓA"}
              </span>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-sm font-extrabold text-white">
                {currentTheme.heritageTitle}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {currentTheme.heritageDesc}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Unique Code:</span>
              <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                {currentTheme.id.toUpperCase()}-GENZ-2026
              </span>
            </div>

            <button
              onClick={() => openActivationModal()}
              className="w-full mt-2 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold border border-amber-500/30 transition flex items-center justify-center gap-1.5"
            >
              <span>Nhập Mã Để Đóng Dấu Tem Số</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
