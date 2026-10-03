"use client";

import React, { useState, useRef, useEffect } from "react";
import { Headphones, Play, Pause, Volume2, Sparkles, Radio, Music2, CheckCircle2 } from "lucide-react";

interface SoundTrack {
  id: string;
  province: string;
  title: string;
  speaker: string;
  tag: string;
  audioUrl: string;
  bgGradient: string;
  soundscapeDescription: string;
  quote: string;
}

const DEMO_TRACKS: SoundTrack[] = [
  {
    id: "hn",
    province: "Hà Nội",
    title: "Tiếng Chuông Chùa & Ký Ức 36 Phố Phường",
    speaker: "MC Minh Châu (Gen Z Radio)",
    tag: "Ẩm Thực & Hoài Niệm",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    bgGradient: "from-amber-500/20 via-rose-500/15 to-red-500/20",
    soundscapeDescription: "Hòa âm chuông chùa Trấn Quốc ngân nga cùng tiếng còi tàu Long Biên và tiếng rao sớm mai.",
    quote: "Hà Nội không chỉ để ngắm nhìn, mà là để nhắm mắt lại và lắng nghe từng nhịp thở ngàn năm..."
  },
  {
    id: "dn",
    province: "Đà Nẵng",
    title: "Sóng Biển Mỹ Khê & Huyền Tích Hải Vân Quan",
    speaker: "Hoàng Long (Phượt thủ Đà Nẵng)",
    tag: "Biển Bạc & Hùng Quan",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    bgGradient: "from-cyan-500/20 via-sky-500/15 to-blue-500/20",
    soundscapeDescription: "Âm thanh sóng vỗ bờ cát trắng mịn quyện tiếng gió rít đỉnh đèo Hải Vân kỳ vĩ.",
    quote: "Đứng giữa ranh giới trời và biển, nghe tiếng sóng vỗ ngàn năm vào chân núi..."
  },
  {
    id: "hg",
    province: "Hà Giang",
    title: "Tiếng Khèn Mông Trên Vách Đá Mã Pí Lèng",
    speaker: "Vàng Thị Hoa (Thổ địa Đồng Văn)",
    tag: "Kỳ Vĩ Cực Bắc",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    bgGradient: "from-emerald-500/20 via-teal-500/15 to-cyan-500/20",
    soundscapeDescription: "Giai điệu khèn Mông vút cao giữa hẻm vực Tu Sản sâu hun hút và dòng Nho Quế màu ngọc bích.",
    quote: "Gió đại ngàn thổi qua triền đá tai mèo, chỉ có tiếng khèn dẫn lối người lữ khách..."
  }
];

export default function SoundscapePlayerDemo() {
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(25);
  const [volume, setVolume] = useState(80);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const current = DEMO_TRACKS[selectedTrackIndex];

  // Simulated progress timer for demo feel
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Fallback for browsers with autoplay restrictions
            setIsPlaying(true);
          });
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleSelectTrack = (index: number) => {
    setSelectedTrackIndex(index);
    setProgress(0);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0194f3]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={current.audioUrl}
        onEnded={() => setIsPlaying(false)}
        preload="none"
      />

      <div className="relative z-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>CÔNG NGHỆ 3D BINAURAL SOUNDSCAPE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Nghe Thử Âm Thanh Bản Địa 3D
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Đeo tai nghe để trải nghiệm không gian âm thanh vòm chân thực: tiếng thiên nhiên, chợ phố và giọng kể di sản độc bản.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5 bg-amber-400/10 px-3 py-1.5 rounded-xl border border-amber-400/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Có sẵn trong mỗi Travel Box</span>
            </span>
          </div>
        </div>

        {/* Interactive Player Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Province Selector Tabs */}
          <div className="lg:col-span-5 space-y-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block px-1">
              Chọn điểm đến để nghe thử:
            </span>
            {DEMO_TRACKS.map((track, idx) => {
              const isSelected = idx === selectedTrackIndex;
              return (
                <button
                  key={track.id}
                  onClick={() => handleSelectTrack(idx)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 border flex items-center justify-between ${
                    isSelected
                      ? "bg-slate-800/90 border-cyan-500/60 shadow-lg shadow-cyan-500/10 translate-x-1"
                      : "bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/70 hover:border-slate-600"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-cyan-400 uppercase tracking-wide">
                        📍 {track.province}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700/80 text-slate-300">
                        {track.tag}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white line-clamp-1">
                      {track.title}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Giọng đọc: {track.speaker}
                    </p>
                  </div>

                  <div className="shrink-0 ml-3">
                    {isSelected && isPlaying ? (
                      <div className="flex items-end gap-1 h-5">
                        <span className="w-1 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s] h-5" />
                        <span className="w-1 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s] h-3" />
                        <span className="w-1 bg-cyan-400 rounded-full animate-bounce h-4" />
                      </div>
                    ) : (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isSelected ? "bg-cyan-500 text-slate-900" : "bg-slate-700 text-slate-300"}`}>
                        <Play className="w-3.5 h-3.5 ml-0.5" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Live Player Dashboard */}
          <div className="lg:col-span-7 bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/70 rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden backdrop-blur-xl">
            {/* Visual Equalizer Banner */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Headphones className="w-5 h-5 text-cyan-400 animate-pulse" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Trạm Phát Di Sản 3D • {current.province}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-mono">
                <Music2 className="w-3.5 h-3.5" />
                <span>2 Kênh (Voice + Soundscape)</span>
              </div>
            </div>

            {/* Current Track Quote */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-1.5">
              <p className="text-xs sm:text-sm text-cyan-100 italic leading-relaxed">
                &ldquo;{current.quote}&rdquo;
              </p>
              <p className="text-[11px] text-slate-400 font-medium">
                🎧 {current.soundscapeDescription}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full bg-slate-700/60 h-2 rounded-full overflow-hidden cursor-pointer relative">
                <div
                  className="bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>01:15</span>
                <span className="text-cyan-400">Nghe thử 30s chất lượng cao</span>
                <span>04:30</span>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-[#0194f3] hover:from-cyan-300 hover:to-sky-400 text-slate-900 flex items-center justify-center font-bold shadow-lg shadow-cyan-500/30 transition-all hover:scale-105 active:scale-95"
                  aria-label={isPlaying ? "Dừng" : "Phát"}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )}
                </button>
                <div>
                  <span className="text-xs font-bold text-white block">
                    {isPlaying ? "Đang phát âm thanh..." : "Bấm để nghe thử"}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Âm thanh chuẩn Stereo Binaural
                  </span>
                </div>
              </div>

              {/* Volume Slider */}
              <div className="hidden sm:flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-slate-400" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-20 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
