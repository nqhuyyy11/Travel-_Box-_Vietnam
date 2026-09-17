import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserProfile, DigitalStamp, Quest, RewardVoucher, CustomBoxOrder } from "@/types";
import { INITIAL_USER, TEST_ACTIVATION_CODES, MOCK_QUESTS, MOCK_REWARDS } from "@/lib/mockData";

interface TravelStoreState {
  user: UserProfile;
  quests: Quest[];
  vouchers: RewardVoucher[];
  isActivationModalOpen: boolean;
  activeActivationCode: string;
  lastActivatedResult: {
    success: boolean;
    message: string;
    stamp?: DigitalStamp;
    xpGained?: number;
    coinsGained?: number;
    boxTitle?: string;
  } | null;

  // Actions
  openActivationModal: (prefillCode?: string) => void;
  closeActivationModal: () => void;
  activateBoxCode: (code: string) => { success: boolean; message: string; stamp?: DigitalStamp };
  completeQuest: (questId: string) => { success: boolean; message: string };
  claimVoucher: (voucherId: string) => { success: boolean; message: string };
  updateProfile: (updated: Partial<UserProfile>) => void;
  resetProgress: () => void;
}

export const useTravelStore = create<TravelStoreState>()(
  persist(
    (set, get) => ({
      user: INITIAL_USER,
      quests: MOCK_QUESTS,
      vouchers: MOCK_REWARDS,
      isActivationModalOpen: false,
      activeActivationCode: "",
      lastActivatedResult: null,

      openActivationModal: (prefillCode = "") => {
        set({
          isActivationModalOpen: true,
          activeActivationCode: prefillCode,
          lastActivatedResult: null
        });
      },

      closeActivationModal: () => {
        set({ isActivationModalOpen: false });
      },

      activateBoxCode: (rawCode: string) => {
        const code = rawCode.trim().toUpperCase();
        const codeData = TEST_ACTIVATION_CODES[code];

        if (!codeData) {
          const result = {
            success: false,
            message: "Mã nắp hộp không hợp lệ hoặc chưa được đăng ký trong hệ thống!"
          };
          set({ lastActivatedResult: result });
          return result;
        }

        const currentUser = get().user;
        const alreadyUnlocked = currentUser.unlockedProvinces.includes(codeData.provinceCode);

        if (alreadyUnlocked) {
          const result = {
            success: false,
            message: `Bạn đã mở khóa tỉnh ${codeData.stamp.provinceName} trước đó rồi!`
          };
          set({ lastActivatedResult: result });
          return result;
        }

        const newStamp: DigitalStamp = {
          ...codeData.stamp,
          unlockedAt: new Date().toISOString().split("T")[0]
        };

        const newXp = currentUser.xp + codeData.xp;
        const newCoins = currentUser.travelCoins + codeData.coins;
        const newUnlocked = [...currentUser.unlockedProvinces, codeData.provinceCode];
        const newStamps = [...currentUser.collectedStamps, newStamp];

        let newLevel = currentUser.levelTitle;
        if (newUnlocked.length >= 5) {
          newLevel = "Đại Sứ Văn Hóa Di Sản";
        } else if (newUnlocked.length >= 3) {
          newLevel = "Thánh Phượt 63 Tỉnh";
        } else if (newUnlocked.length >= 1) {
          newLevel = "Lữ Khách Tinh Anh";
        }

        const updatedUser: UserProfile = {
          ...currentUser,
          xp: newXp,
          travelCoins: newCoins,
          levelTitle: newLevel,
          unlockedProvinces: newUnlocked,
          collectedStamps: newStamps
        };

        const result = {
          success: true,
          message: `Kích hoạt thành công Travel Box! Chào mừng bạn đến với ${codeData.stamp.provinceName}!`,
          stamp: newStamp,
          xpGained: codeData.xp,
          coinsGained: codeData.coins,
          boxTitle: codeData.boxTitle
        };

        set({
          user: updatedUser,
          lastActivatedResult: result
        });

        return result;
      },

      completeQuest: (questId: string) => {
        const state = get();
        const quest = state.quests.find((q) => q.id === questId);
        if (!quest) return { success: false, message: "Không tìm thấy nhiệm vụ!" };
        if (quest.completed || state.user.completedQuests.includes(questId)) {
          return { success: false, message: "Nhiệm vụ này bạn đã hoàn thành rồi!" };
        }

        const updatedQuests = state.quests.map((q) => (q.id === questId ? { ...q, completed: true } : q));
        const updatedUser: UserProfile = {
          ...state.user,
          xp: state.user.xp + quest.xpReward,
          travelCoins: state.user.travelCoins + quest.coinReward,
          completedQuests: [...state.user.completedQuests, questId]
        };

        set({
          quests: updatedQuests,
          user: updatedUser
        });

        return {
          success: true,
          message: `Nhiệm vụ hoàn tất! Bạn nhận được +${quest.xpReward} XP và +${quest.coinReward} Coins!`
        };
      },

      claimVoucher: (voucherId: string) => {
        const state = get();
        const voucher = state.vouchers.find((v) => v.id === voucherId);
        if (!voucher) return { success: false, message: "Không tìm thấy voucher!" };
        if (voucher.claimed || state.user.claimedVouchers.includes(voucherId)) {
          return { success: false, message: "Voucher này đã được bạn đổi rồi!" };
        }
        if (state.user.travelCoins < voucher.coinsCost) {
          return { success: false, message: `Bạn cần thêm ${voucher.coinsCost - state.user.travelCoins} Travel Coins để đổi voucher này!` };
        }

        const updatedVouchers = state.vouchers.map((v) => (v.id === voucherId ? { ...v, claimed: true } : v));
        const updatedUser: UserProfile = {
          ...state.user,
          travelCoins: state.user.travelCoins - voucher.coinsCost,
          claimedVouchers: [...state.user.claimedVouchers, voucherId]
        };

        set({
          vouchers: updatedVouchers,
          user: updatedUser
        });

        return {
          success: true,
          message: `Đổi voucher thành công! Mã ưu đãi của bạn: ${voucher.code}`
        };
      },

      updateProfile: (updated) => {
        set((state) => ({
          user: { ...state.user, ...updated }
        }));
      },

      resetProgress: () => {
        set({
          user: INITIAL_USER,
          quests: MOCK_QUESTS,
          vouchers: MOCK_REWARDS,
          lastActivatedResult: null
        });
      }
    }),
    {
      name: "travel_box_vn_storage"
    }
  )
);
