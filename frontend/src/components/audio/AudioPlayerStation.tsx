"use client";

import React, { useState, useRef, useEffect } from "react";
import { AudioStory } from "@/types";
import { MOCK_AUDIO_STORIES } from "@/lib/mockData";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  Sliders, 
  Headphones, 
  Sparkles, 
  Image as ImageIcon,
  Share2,
  Radio
} from "lucide-react";

export default function AudioPlayerStation() {
  const [stories, setStories] = useState<AudioStory[]>(MOCK_AUDIO_STORIES);
  const [currentStory, setCurrentStory] = useState<AudioStory>(MOCK_AUDIO_STORIES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(42);
  const [totalDuration, setTotalDuration] = useState(275);
  const [voiceVolume, setVoiceVolume] = useState(85);
  const [soundscapeVolume, setSoundscapeVolume] = useState(60);
  const [selectedPostcard, setSelectedPostcard] = useState<string | null>(null);

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
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            TRẠM KỂ CHUYỆN AUDIO GUIDE <Headphones className="w-6 h-6 text-amber-400" />
          </h2>
          <p className="text-xs text-slate-400">
            Trải nghiệm thuyết minh di sản độc quyền kết hợp bộ trộn âm thanh thực cảnh (Soundscape Mixer)
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold flex items-center gap-2">
          <Radio className="w-4 h-4 text-teal-400 animate-pulse" />
          <span>Âm Thanh 3D Không Gian (Binaural Audio)</span>
        </div>
      </div>

      {/* Main Player & Soundscape Mixer Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Active Story Player & Postcard Visualizer */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/30 space-y-6">
          {/* Postcard Graphic & Story Metadata */}
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl group">
            <img
              src={currentStory.postcardImage}
              alt={currentStory.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-red-600/90 text-white font-bold text-xs backdrop-blur-md uppercase">
                {currentStory.provinceName}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/80 text-slate-950 font-bold text-xs backdrop-blur-md">
                {currentStory.category}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {currentStory.title}
              </h3>
              <p className="text-xs text-slate-300 flex items-center gap-2">
                <span>🎙️ Giọng đọc: <strong className="text-amber-300">{currentStory.speaker}</strong></span>
                <span>•</span>
                <span>⏱️ Thời lượng: {currentStory.duration}</span>
              </p>
            </div>
          </div>

          {/* Player Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span className="text-amber-400 font-bold">{formatTime(currentTime)}</span>
              <span>{formatTime(totalDuration)}</span>
            </div>
            <div
              className="w-full h-2.5 bg-slate-800 rounded-full cursor-pointer overflow-hidden relative"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                setCurrentTime(Math.floor(pos * totalDuration));
              }}
            >
              <div
                className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-teal-400 rounded-full"
                style={{ width: `${(currentTime / totalDuration) * 100}%` }}
              />
            </div>
          </div>

          {/* Main Controls (Play / Pause / Prev / Next) */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentTime(0)}
              className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Phát lại từ đầu"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white flex items-center justify-center shadow-stamp shadow-red-900/50 hover:scale-105 active:scale-95 transition"
            >
              {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
            </button>

            <button
              onClick={() => setSelectedPostcard(currentStory.postcardImage)}
              className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-400 transition flex items-center gap-1.5 text-xs font-bold"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Xem Bưu Thiếp</span>
            </button>
          </div>

          {/* Dual Channel Soundscape Mixer Console */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase text-slate-300 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                Bộ Trộn Âm Thanh Thực Cảnh (Soundscape Mixer)
              </span>
              <span className="text-[10px] text-amber-400 font-mono">2 CHANNELS ACTIVE</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Channel 1: Voice Narration */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    🗣️ Voice Thuyết Minh
                  </span>
                  <span className="font-mono text-amber-400">{voiceVolume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={voiceVolume}
                  onChange={(e) => setVoiceVolume(Number(e.target.value))}
                  className="w-full accent-red-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Channel 2: Indigenous Soundscape (Waves, Temple bells...) */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-teal-300 font-semibold flex items-center gap-1.5">
                    🌊 Âm Nền Bản Địa
                  </span>
                  <span className="font-mono text-teal-400">{soundscapeVolume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={soundscapeVolume}
                  onChange={(e) => setSoundscapeVolume(Number(e.target.value))}
                  className="w-full accent-teal-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Story Narrative Excerpt */}
          <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-2 text-xs leading-relaxed text-slate-300">
            <span className="font-bold text-amber-400 block uppercase text-[10px]">
              Trích Đoạn Kể Chuyện:
            </span>
            <p className="italic">
              "{currentStory.storyContent}"
            </p>
          </div>
        </div>

        {/* Right: Playlist of All Audio Stories */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Headphones className="w-4 h-4 text-amber-400" />
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
                        ? "bg-slate-800/90 border-amber-500/50 shadow-gold-glow"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50"
                    }`}
                  >
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-700">
                      <img
                        src={story.postcardImage}
                        alt={story.title}
                        className="w-full h-full object-cover"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-red-600/70 flex items-center justify-center text-white">
                          <Play className="w-5 h-5 fill-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                          {story.provinceName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{story.duration}</span>
                      </div>
                      <h4 className="font-bold text-white text-xs truncate">
                        {story.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate">
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
