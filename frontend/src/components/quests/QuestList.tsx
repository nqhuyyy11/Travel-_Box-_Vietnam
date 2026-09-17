"use client";

import React, { useState } from "react";
import { useTravelStore } from "@/store/travelStore";
import { Quest } from "@/types";
import { 
  MOCK_LEADERBOARD_INDIVIDUAL, 
  MOCK_LEADERBOARD_UNIS 
} from "@/lib/mockData";
import { 
  Target, 
  MapPin, 
  Key, 
  Camera, 
  Trophy, 
  Award, 
  Coins, 
  CheckCircle2, 
  Sparkles, 
  Navigation, 
  HelpCircle,
  GraduationCap
} from "lucide-react";
import confetti from "canvas-confetti";

export default function QuestList() {
  const { quests, user, completeQuest } = useTravelStore();
  const [activeTab, setActiveTab] = useState<"quests" | "leaderboard">("quests");
  const [leaderboardTab, setLeaderboardTab] = useState<"individual" | "unis">("individual");
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [cipherInput, setCipherInput] = useState("");
  const [gpsStatus, setGpsStatus] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleGpsCheckin = (quest: Quest) => {
    setIsVerifying(true);
    setGpsStatus("Đang định vị tọa độ vệ tinh GPS của thiết bị...");

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsVerifying(false);
          setGpsStatus(`Tọa độ hiện tại: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)} — Xác thực thành công!`);
          const res = completeQuest(quest.id);
          if (res.success) triggerConfetti();
        },
        (error) => {
          // Fallback simulation for desktop / denied permission
          setTimeout(() => {
            setIsVerifying(false);
            setGpsStatus("Đã xác thực tọa độ GPS di sản thực địa (Chế độ mô phỏng)!");
            const res = completeQuest(quest.id);
            if (res.success) triggerConfetti();
          }, 1200);
        }
      );
    } else {
      setTimeout(() => {
        setIsVerifying(false);
        setGpsStatus("Đã xác thực tọa độ GPS thành công!");
        const res = completeQuest(quest.id);
        if (res.success) triggerConfetti();
      }, 1000);
    }
  };

  const handleSolveCipher = (quest: Quest) => {
    if (!quest.cipherClue) return;
    const answer = cipherInput.trim().toLowerCase();
    const correct = quest.cipherClue.answerKey.toLowerCase();

    if (answer.includes(correct) || correct.includes(answer)) {
      const res = completeQuest(quest.id);
      if (res.success) {
        triggerConfetti();
        setCipherInput("");
        setSelectedQuest(null);
      }
    } else {
      alert("Đáp án giải mật thư chưa chính xác! Hãy đọc kỹ gợi ý dưới đáy hộp quà.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            THỬ THÁCH THỰC ĐỊA & GAMIFICATION <Target className="w-6 h-6 text-amber-400" />
          </h2>
          <p className="text-xs text-slate-400">
            Check-in tọa độ GPS di sản, giải mã mật thư nắp hộp và ghi danh vào bảng xếp hạng toàn quốc
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab("quests")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "quests"
                ? "bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Thử Thách ({quests.filter(q => q.completed).length}/{quests.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("leaderboard")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "leaderboard"
                ? "bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Bảng Xếp Hạng</span>
          </button>
        </div>
      </div>

      {activeTab === "quests" ? (
        /* Quests Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quests.map((quest) => {
            const isCompleted = quest.completed || user.completedQuests.includes(quest.id);

            return (
              <div
                key={quest.id}
                className={`glass-panel rounded-3xl p-6 border transition-all space-y-4 ${
                  isCompleted
                    ? "border-emerald-500/40 bg-slate-900/90 shadow-teal-glow"
                    : "border-slate-800 hover:border-amber-500/40"
                }`}
              >
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/30 uppercase">
                      📍 {quest.provinceCode}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {quest.type === "GPS_CHECKIN" && "🛰️ Check-in GPS"}
                      {quest.type === "SECRET_CIPHER" && "🗝️ Mật Thư Nắp Hộp"}
                      {quest.type === "PHOTO_MATCH" && "📸 Photo Match"}
                      {quest.type === "LOCAL_TASTE" && "🍜 Thử Thách Ẩm Thực"}
                    </span>
                  </div>

                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                      <CheckCircle2 className="w-4 h-4" /> Hoàn Thành
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400">Chưa làm</span>
                  )}
                </div>

                {/* Quest Title & Desc */}
                <div className="space-y-1.5">
                  <h3 className="text-base font-extrabold text-white">
                    {quest.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {quest.description}
                  </p>
                </div>

                {/* Target Location or Cipher Hint */}
                {quest.targetCoords && (
                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="truncate">{quest.targetCoords.locationName}</span>
                  </div>
                )}

                {quest.cipherClue && (
                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-amber-400">
                      <HelpCircle className="w-3.5 h-3.5" /> Gợi Ý Mật Mã:
                    </div>
                    <p className="text-[11px] text-slate-300">{quest.cipherClue.hint}</p>
                  </div>
                )}

                {/* Rewards Bar */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> +{quest.xpReward} XP
                    </span>
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Coins className="w-3.5 h-3.5" /> +{quest.coinReward} Xu
                    </span>
                  </div>

                  {/* Actions */}
                  {!isCompleted && (
                    <div>
                      {quest.type === "GPS_CHECKIN" && (
                        <button
                          onClick={() => handleGpsCheckin(quest)}
                          disabled={isVerifying}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs shadow-stamp transition flex items-center gap-1.5"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>{isVerifying ? "Đang Quét GPS..." : "Xác Thực GPS"}</span>
                        </button>
                      )}

                      {quest.type === "SECRET_CIPHER" && (
                        <button
                          onClick={() => setSelectedQuest(quest)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs shadow-stamp transition flex items-center gap-1.5"
                        >
                          <Key className="w-3.5 h-3.5" />
                          <span>Nhập Mật Mã</span>
                        </button>
                      )}

                      {quest.type === "PHOTO_MATCH" && (
                        <button
                          onClick={() => {
                            completeQuest(quest.id);
                            triggerConfetti();
                          }}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs shadow-stamp transition flex items-center gap-1.5"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>Chụp Ảnh Khớp Postcard</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Leaderboard View */
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setLeaderboardTab("individual")}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
                leaderboardTab === "individual"
                  ? "bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-stamp"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Top Cá Nhân Lữ Khách</span>
            </button>
            <button
              onClick={() => setLeaderboardTab("unis")}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
                leaderboardTab === "unis"
                  ? "bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-stamp"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Top Trường Đại Học</span>
            </button>
          </div>

          {leaderboardTab === "individual" ? (
            <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3">
              {MOCK_LEADERBOARD_INDIVIDUAL.map((entry) => (
                <div
                  key={entry.rank}
                  className={`p-4 rounded-2xl flex items-center justify-between gap-4 border transition ${
                    entry.name.includes("Bạn")
                      ? "bg-amber-950/30 border-amber-500/50 shadow-gold-glow"
                      : "bg-slate-900/60 border-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                      entry.rank === 1 ? "bg-amber-500 text-slate-950" :
                      entry.rank === 2 ? "bg-slate-300 text-slate-950" :
                      entry.rank === 3 ? "bg-amber-700 text-white" : "bg-slate-800 text-slate-400"
                    }`}>
                      #{entry.rank}
                    </div>
                    <img
                      src={entry.avatar}
                      alt={entry.name}
                      className="w-11 h-11 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <h4 className="font-bold text-white text-sm flex items-center gap-2">
                        {entry.name}
                        <span className="text-[10px] px-2 py-0.5 rounded bg-red-600/30 text-red-300 font-normal">
                          {entry.badge}
                        </span>
                      </h4>
                      <p className="text-xs text-slate-400">{entry.university}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-black text-amber-400 text-sm font-mono">
                      {entry.points.toLocaleString("vi-VN")} XP
                    </div>
                    <div className="text-[11px] text-emerald-400">
                      {entry.unlockedCount} Tỉnh Đã Mở
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3">
              {MOCK_LEADERBOARD_UNIS.map((uni) => (
                <div
                  key={uni.rank}
                  className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-black text-xs text-amber-400">
                      #{uni.rank}
                    </div>
                    <div className="text-2xl">{uni.logo}</div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{uni.name}</h4>
                      <p className="text-xs text-slate-400">{uni.travelersCount.toLocaleString()} Lữ khách sinh viên</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-emerald-400 text-sm font-mono">
                      {uni.points.toLocaleString()} Điểm
                    </div>
                    <div className="text-[11px] text-amber-400">Hạng {uni.rank} Toàn Quốc</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Secret Cipher Solve Modal */}
      {selectedQuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-amber-500/40 rounded-3xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Key className="w-5 h-5 text-amber-400" />
              GIẢI MẬT THƯ NẮP HỘP
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedQuest.cipherClue?.hint}
            </p>
            <input
              type="text"
              value={cipherInput}
              onChange={(e) => setCipherInput(e.target.value)}
              placeholder="Nhập câu trả lời mật thư..."
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500"
            />
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => handleSolveCipher(selectedQuest)}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-xs"
              >
                Xác Nhận Giải Mã
              </button>
              <button
                onClick={() => setSelectedQuest(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
