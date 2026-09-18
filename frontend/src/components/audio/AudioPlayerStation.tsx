"use client";

import React, { useState, useEffect } from "react";
import { AudioStory } from "@/types";
import { MOCK_AUDIO_STORIES } from "@/lib/mockData";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  Sliders, 
  Headphones, 
  Image as ImageIcon,
  Radio
} from "lucide-react";

export default function AudioPlayerStation() {
  const [stories] = useState<AudioStory[]>(MOCK_AUDIO_STORIES);
  const [currentStory, setCurrentStory] = useState<AudioStory>(MOCK_AUDIO_STORIES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(42);
  const [totalDuration] = useState(275);
  const [voiceVolume, setVoiceVolume] = useState(85);
  const [soundscapeVolume, setSoundscapeVolume] = useState(60);

  // Play / pause toggle simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => (prev >= totalDuration ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalDuration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0194f3]">
            MODULE 2: MULTIMEDIA SOUNDSCAPE
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
            TRẠM KỂ CHUYỆN AUDIO GUIDE <Headphones className="w-6 h-6 text-[#0194f3]" />
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Trải nghiệm thuyết minh di sản độc quyền kết hợp bộ trộn âm thanh thực cảnh (Soundscape Mixer)
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-[#0194f3] text-xs font-bold flex items-center gap-2 shadow-xs">
          <Radio className="w-4 h-4 text-[#0194f3] animate-pulse" />
          <span>Âm Thanh 3D Không Gian (Binaural Audio)</span>
        </div>
      </div>

      {/* Main Player & Soundscape Mixer Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Active Story Player & Postcard Visualizer */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          {/* Postcard Graphic & Story Metadata */}
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-md group">
            <img
              src={currentStory.postcardImage}
              alt={currentStory.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#ff5e1f] text-white font-bold text-xs backdrop-blur-md uppercase shadow-xs">
                {currentStory.provinceName}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/90 text-slate-800 font-bold text-xs backdrop-blur-md shadow-xs border border-slate-200/60">
                {currentStory.category}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-md">
                {currentStory.title}
              </h3>
              <p className="text-xs text-sky-100 flex items-center gap-2">
                <span>🎙️ Giọng đọc: <strong className="text-amber-300">{currentStory.speaker}</strong></span>
                <span>•</span>
                <span>⏱️ Thời lượng: {currentStory.duration}</span>
              </p>
            </div>
          </div>

          {/* Player Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-500">
              <span className="text-[#0194f3] font-black">{formatTime(currentTime)}</span>
              <span>{formatTime(totalDuration)}</span>
            </div>
            <div
              className="w-full h-3 bg-slate-100 border border-slate-200 rounded-full cursor-pointer overflow-hidden relative shadow-inner"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                setCurrentTime(Math.floor(pos * totalDuration));
              }}
            >
              <div
                className="h-full bg-gradient-to-r from-[#0194f3] via-[#ff6f36] to-[#ff5e1f] rounded-full transition-all"
                style={{ width: `${(currentTime / totalDuration) * 100}%` }}
              />
            </div>
          </div>

          {/* Main Controls (Play / Pause / Prev / Next) */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentTime(0)}
              className="p-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition border border-slate-200"
              title="Phát lại từ đầu"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-[#ff5e1f] to-[#f97316] hover:from-[#f44a07] hover:to-[#ea580c] text-white flex items-center justify-center shadow-md shadow-orange-500/25 hover:scale-105 active:scale-95 transition"
            >
              {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
            </button>

            <div className="p-3.5 rounded-2xl bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5 text-xs font-bold">
              <ImageIcon className="w-4 h-4 text-[#0194f3]" />
              <span>Bưu Thiếp Số</span>
            </div>
          </div>

          {/* Dual Channel Soundscape Mixer Console */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-bold uppercase text-slate-700 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#0194f3]" />
                Bộ Trộn Âm Thanh Thực Cảnh (Soundscape Mixer)
              </span>
              <span className="text-[10px] text-[#0194f3] font-mono font-bold">2 KÊNH HOẠT ĐỘNG</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Channel 1: Voice Narration */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-700 font-bold flex items-center gap-1.5">
                    🗣️ Voice Thuyết Minh
                  </span>
                  <span className="font-mono font-bold text-[#ff5e1f]">{voiceVolume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={voiceVolume}
                  onChange={(e) => setVoiceVolume(Number(e.target.value))}
                  className="w-full accent-[#ff5e1f] bg-slate-200 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Channel 2: Indigenous Soundscape */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-700 font-bold flex items-center gap-1.5">
                    🌊 Âm Nền Bản Địa (Sóng, Chuông chùa...)
                  </span>
                  <span className="font-mono font-bold text-[#0194f3]">{soundscapeVolume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={soundscapeVolume}
                  onChange={(e) => setSoundscapeVolume(Number(e.target.value))}
                  className="w-full accent-[#0194f3] bg-slate-200 h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Story Narrative Excerpt */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs leading-relaxed text-slate-700">
            <span className="font-black text-[#0194f3] block uppercase text-[10px] tracking-wider">
              Trích Đoạn Kể Chuyện:
            </span>
            <p className="italic">
              "{currentStory.storyContent}"
            </p>
          </div>
        </div>

        {/* Right: Playlist of All Audio Stories */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Headphones className="w-4 h-4 text-[#0194f3]" />
              Danh Sách Câu Chuyện Di Sản
            </h3>

            <div className="space-y-3">
              {stories.map((story) => {
                const isActive = currentStory.id === story.id;
                return (
                  <div
                    key={story.id}
                    onClick={() => {
                      setCurrentStory(story);
                      setIsPlaying(true);
                      setCurrentTime(0);
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
                      isActive
                        ? "bg-sky-50/80 border-[#0194f3] shadow-xs"
                        : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70"
                    }`}
                  >
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-xs">
                      <img
                        src={story.postcardImage}
                        alt={story.title}
                        className="w-full h-full object-cover"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-[#0194f3]/70 flex items-center justify-center text-white">
                          <Play className="w-5 h-5 fill-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-[#0194f3] border border-sky-200">
                          {story.provinceName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono font-medium">{story.duration}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs truncate">
                        {story.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate">
                        {story.speaker}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
