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
  const [, setGpsStatus] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#0194F3", "#FF5E1F", "#10B981", "#F59E0B"]
    });
  };

  const handleGpsCheckin = (quest: Quest) => {
    setIsVerifying(true);
    setGpsStatus("Đang định vị tọa độ vệ tinh GPS của thiết bị...");

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsVerifying(false);
          setGpsStatus(`Tọa độ: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)} — Thành công!`);
          const res = completeQuest(quest.id);
          if (res.success) triggerConfetti();
        },
        () => {
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
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff5e1f]">
            MODULE 3: GAMIFICATION & CHECK-IN GPS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
            THỬ THÁCH THỰC ĐỊA & GAMIFICATION <Target className="w-6 h-6 text-[#ff5e1f]" />
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Check-in tọa độ GPS di sản, giải mã mật thư nắp hộp và ghi danh vào bảng xếp hạng toàn quốc
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
          <button
            onClick={() => setActiveTab("quests")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "quests"
                ? "bg-gradient-to-r from-[#0194f3] to-[#0264c8] text-white shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Thử Thách ({quests.filter(q => q.completed).length}/{quests.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("leaderboard")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "leaderboard"
                ? "bg-gradient-to-r from-[#0194f3] to-[#0264c8] text-white shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-300" />
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
                className={`bg-white rounded-3xl p-6 border transition-all space-y-4 shadow-sm hover:shadow-lg ${
                  isCompleted
                    ? "border-emerald-300 bg-emerald-50/20"
                    : "border-slate-200/90 hover:border-sky-300"
                }`}
              >
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-sky-50 text-[#0194f3] border border-sky-200 uppercase">
                      📍 {quest.provinceCode}
                    </span>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                      {quest.type === "GPS_CHECKIN" && "🛰️ Check-in GPS"}
                      {quest.type === "SECRET_CIPHER" && "🗝️ Mật Thư Nắp Hộp"}
                      {quest.type === "PHOTO_MATCH" && "📸 Photo Match"}
                      {quest.type === "LOCAL_TASTE" && "🍜 Thử Thách Ẩm Thực"}
                    </span>
                  </div>

                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4" /> Hoàn Thành
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400">Chưa làm</span>
                  )}
                </div>

                {/* Quest Title & Desc */}
                <div className="space-y-1.5">
                  <h3 className="text-base font-black text-slate-900">
                    {quest.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {quest.description}
                  </p>
                </div>

                {/* Target Location or Cipher Hint */}
                {quest.targetCoords && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-[#0194f3] shrink-0" />
                    <span className="truncate font-medium">{quest.targetCoords.locationName}</span>
                  </div>
                )}

                {quest.cipherClue && (
                  <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-amber-800">
                      <HelpCircle className="w-3.5 h-3.5 text-amber-600" /> Gợi Ý Mật Mã:
                    </div>
                    <p className="text-[11px] text-slate-600">{quest.cipherClue.hint}</p>
                  </div>
                )}

                {/* Rewards Bar */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-emerald-600" /> +{quest.xpReward} XP
                    </span>
                    <span className="text-amber-700 font-bold flex items-center gap-1">
                      <Coins className="w-3.5 h-3.5 text-amber-500" /> +{quest.coinReward} Xu
                    </span>
                  </div>

                  {/* Actions */}
                  {!isCompleted && (
                    <div>
                      {quest.type === "GPS_CHECKIN" && (
                        <button
                          onClick={() => handleGpsCheckin(quest)}
                          disabled={isVerifying}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff5e1f] to-[#f97316] hover:from-[#f44a07] hover:to-[#ea580c] text-white font-bold text-xs shadow-md shadow-orange-500/20 transition flex items-center gap-1.5"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>{isVerifying ? "Đang Quét GPS..." : "Xác Thực GPS"}</span>
                        </button>
                      )}

                      {quest.type === "SECRET_CIPHER" && (
                        <button
                          onClick={() => setSelectedQuest(quest)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff5e1f] to-[#f97316] hover:from-[#f44a07] hover:to-[#ea580c] text-white font-bold text-xs shadow-md shadow-orange-500/20 transition flex items-center gap-1.5"
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
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff5e1f] to-[#f97316] hover:from-[#f44a07] hover:to-[#ea580c] text-white font-bold text-xs shadow-md shadow-orange-500/20 transition flex items-center gap-1.5"
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
                  ? "bg-gradient-to-r from-[#0194f3] to-[#0264c8] text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Top Cá Nhân Lữ Khách</span>
            </button>
            <button
              onClick={() => setLeaderboardTab("unis")}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
                leaderboardTab === "unis"
                  ? "bg-gradient-to-r from-[#0194f3] to-[#0264c8] text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
              }`}
            >
              <GraduationCap className="w-4 h-4 text-amber-500" />
              <span>Top Trường Đại Học</span>
            </button>
          </div>

          {leaderboardTab === "individual" ? (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
              {MOCK_LEADERBOARD_INDIVIDUAL.map((entry) => (
                <div
                  key={entry.rank}
                  className={`p-4 rounded-2xl flex items-center justify-between gap-4 border transition ${
                    entry.name.includes("Bạn")
                      ? "bg-sky-50/80 border-[#0194f3] shadow-xs"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                      entry.rank === 1 ? "bg-amber-400 text-slate-950 font-bold" :
                      entry.rank === 2 ? "bg-slate-200 text-slate-800 font-bold" :
                      entry.rank === 3 ? "bg-amber-600 text-white font-bold" : "bg-slate-100 text-slate-600"
                    }`}>
                      #{entry.rank}
                    </div>
                    <img
                      src={entry.avatar}
                      alt={entry.name}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        {entry.name}
                        <span className="text-[10px] px-2 py-0.5 rounded bg-sky-50 text-[#0194f3] border border-sky-200 font-medium">
                          {entry.badge}
                        </span>
                      </h4>
                      <p className="text-xs text-slate-500">{entry.university}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-black text-[#ff5e1f] text-sm font-mono">
                      {entry.points.toLocaleString("vi-VN")} XP
                    </div>
                    <div className="text-[11px] text-emerald-700 font-semibold">
                      {entry.unlockedCount} Tỉnh Đã Mở
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
              {MOCK_LEADERBOARD_UNIS.map((uni) => (
                <div
                  key={uni.rank}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-black text-xs text-slate-800">
                      #{uni.rank}
                    </div>
                    <div className="text-2xl">{uni.logo}</div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{uni.name}</h4>
                      <p className="text-xs text-slate-500">{uni.travelersCount.toLocaleString()} Lữ khách sinh viên</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-[#0194f3] text-sm font-mono">
                      {uni.points.toLocaleString()} Điểm
                    </div>
                    <div className="text-[11px] text-amber-700 font-semibold">Hạng {uni.rank} Toàn Quốc</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Secret Cipher Solve Modal */}
      {selectedQuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Key className="w-5 h-5 text-[#ff5e1f]" />
              GIẢI MẬT THƯ NẮP HỘP
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedQuest.cipherClue?.hint}
            </p>
            <input
              type="text"
              value={cipherInput}
              onChange={(e) => setCipherInput(e.target.value)}
              placeholder="Nhập câu trả lời mật thư..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#0194f3]"
            />
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => handleSolveCipher(selectedQuest)}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#ff5e1f] to-[#f97316] hover:from-[#f44a07] hover:to-[#ea580c] text-white font-bold text-xs shadow-md shadow-orange-500/20 transition"
              >
                Xác Nhận Giải Mã
              </button>
              <button
                onClick={() => setSelectedQuest(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition"
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
