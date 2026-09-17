export type Region = "Bắc" | "Trung" | "Nam";

export interface DigitalStamp {
  id: string;
  code: string;
  title: string;
  provinceName: string;
  provinceCode: string;
  icon: string;
  description: string;
  unlockedAt?: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  hologramColor: string;
}

export interface Province {
  id: string;
  code: string; // e.g. "HN", "DN", "SG", "HG", "NB", "PQ"
  name: string;
  region: Region;
  tagline: string;
  description: string;
  attractions: string[];
  signatureFoods: { name: string; price: string; address: string }[];
  soundscapeTrack: string;
  bgImage: string;
  stamp: DigitalStamp;
  coordinates: { lat: number; lng: number };
}

export interface ActivationCode {
  code: string;
  provinceCode: string;
  boxTitle: string;
  xpReward: number;
  coinReward: number;
  badgeId: string;
}

export interface Quest {
  id: string;
  provinceCode: string;
  title: string;
  type: "GPS_CHECKIN" | "SECRET_CIPHER" | "PHOTO_MATCH" | "LOCAL_TASTE";
  description: string;
  targetCoords?: { lat: number; lng: number; radiusMeters: number; locationName: string };
  cipherClue?: { hint: string; answerKey: string };
  xpReward: number;
  coinReward: number;
  completed: boolean;
}

export interface AudioStory {
  id: string;
  provinceCode: string;
  provinceName: string;
  title: string;
  speaker: string;
  duration: string;
  category: "Giai Thoại Lịch Sử" | "Ẩm Thực Ngõ Hẻm" | "Chuyện Ma Dân Gian" | "Bí Kíp Săn Ảnh";
  audioUrl: string;
  soundscapeUrl: string;
  postcardImage: string;
  storyContent: string;
}

export interface TravelBox {
  id: string;
  slug: string;
  title: string;
  provinceCode: string;
  provinceName: string;
  originalPrice: number;
  studentPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  image: string;
  contents: {
    model3D: string;
    snacks: string[];
    postcardCount: number;
    hasActivationCode: boolean;
    hasAudioGuide: boolean;
  };
  description: string;
  tag: string;
}

export interface CustomBoxOption {
  provinces: { code: string; name: string; image: string }[];
  models3D: { id: string; name: string; provinceCode: string; image: string; price: number }[];
  snacks: { id: string; name: string; provinceCode: string; ocopStar: number; image: string; weight: string }[];
  postcards: { id: string; name: string; artist: string; image: string }[];
}

export interface CustomBoxOrder {
  selectedProvince: string;
  selectedModel: string;
  selectedSnacks: string[];
  selectedPostcard: string;
  customGreeting: string;
  isStudentDiscount: boolean;
  studentIdCard?: string;
  packType: "Solo" | "Combo3" | "Combo5";
  totalPrice: number;
}

export interface TravelBuddyPost {
  id: string;
  authorName: string;
  authorUniversity: string;
  avatar: string;
  destination: string;
  dates: string;
  estimatedCost: string;
  seekingCount: number;
  currentMembers: number;
  description: string;
  tags: string[];
  createdAt: string;
}

export interface CommunityFeedPost {
  id: string;
  authorName: string;
  authorUniversity: string;
  avatar: string;
  province: string;
  boxTitle: string;
  caption: string;
  images: string[];
  likesCount: number;
  liked: boolean;
  commentsCount: number;
  timestamp: string;
}

export interface RewardVoucher {
  id: string;
  title: string;
  brand: string;
  category: "Xe Khách" | "Homestay" | "Travel Box" | "Vé Tham Quan";
  coinsCost: number;
  discountValue: string;
  expiryDate: string;
  code: string;
  claimed: boolean;
  icon: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  university?: string;
  points: number;
  unlockedCount: number;
  avatar: string;
  badge: string;
}

export interface UserProfile {
  id: string;
  name: string;
  university: string;
  studentId: string;
  avatar: string;
  levelTitle: "Tân Thủ Lữ Hành" | "Lữ Khách Tinh Anh" | "Thánh Phượt 63 Tỉnh" | "Đại Sứ Văn Hóa Di Sản";
  xp: number;
  nextLevelXp: number;
  travelCoins: number;
  unlockedProvinces: string[]; // province codes
  collectedStamps: DigitalStamp[];
  completedQuests: string[];
  claimedVouchers: string[];
}
