import {
  Province,
  TravelBox,
  Quest,
  AudioStory,
  RewardVoucher,
  TravelBuddyPost,
  CommunityFeedPost,
  LeaderboardEntry,
  UserProfile,
  CustomBoxOption
} from "@/types";

export const INITIAL_USER: UserProfile = {
  id: "user_genz_01",
  name: "Nguyễn Minh Khang (Khang Đi Phượt)",
  university: "ĐH Bách Khoa Hà Nội - K66",
  studentId: "20210899",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  levelTitle: "Lữ Khách Tinh Anh",
  xp: 1450,
  nextLevelXp: 3000,
  travelCoins: 850,
  unlockedProvinces: ["HN", "DN"],
  collectedStamps: [
    {
      id: "stamp_hn",
      code: "HN",
      title: "Thánh Ăn Sập Phố Cổ",
      provinceName: "Hà Nội",
      provinceCode: "HN",
      icon: "🏛️",
      description: "Đã khám phá 36 phố phường và nếm trọn 10 món ăn kinh kỳ chuẩn vị.",
      unlockedAt: "2026-08-15",
      rarity: "Rare",
      hologramColor: "from-amber-400 via-rose-500 to-red-600"
    },
    {
      id: "stamp_dn",
      code: "DN",
      title: "Chiến Thần Đèo Hải Vân",
      provinceName: "Đà Nẵng",
      provinceCode: "DN",
      icon: "🌉",
      description: "Chinh phục đỉnh đèo Hải Vân và săn rồng phun lửa cầu Rồng lúc 21h.",
      unlockedAt: "2026-09-02",
      rarity: "Epic",
      hologramColor: "from-cyan-400 via-teal-500 to-emerald-600"
    }
  ],
  completedQuests: ["quest_hn_1", "quest_dn_1"],
  claimedVouchers: ["vouch_01"]
};

export const MOCK_PROVINCES: Province[] = [
  {
    id: "p_hn",
    code: "HN",
    name: "Hà Nội",
    region: "Bắc",
    tagline: "Nghìn năm văn hiến & Tinh hoa 36 phố phường",
    description: "Trái tim của đất nước với những mái ngói rêu phong, hương hoa sữa nồng nàn và văn hóa ẩm thực hè phố đậm chất thi vị.",
    attractions: ["Hồ Hoàn Kiếm & Tháp Rùa", "Hoàng Thành Thăng Long", "Văn Miếu Quốc Tử Giám", "Cầu Long Biên", "Lăng Bác"],
    signatureFoods: [
      { name: "Phở Bò Gốc Cây", price: "40.000đ - 55.000đ", address: "Hàng Trống, Hoàn Kiếm" },
      { name: "Bún Chả Cửa Đông", price: "45.000đ", address: "Cửa Đông, Ba Đình" },
      { name: "Cà Phê Trứng Giảng", price: "35.000đ", address: "39 Nguyễn Hữu Huân" }
    ],
    soundscapeTrack: "Tiếng chuông chùa Một Cột & Tiếng rao ngõ nhỏ sớm mai",
    bgImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80",
    stamp: {
      id: "stamp_hn",
      code: "HN",
      title: "Thánh Ăn Sập Phố Cổ",
      provinceName: "Hà Nội",
      provinceCode: "HN",
      icon: "🏛️",
      description: "Mở khóa trọn bộ ẩm thực và ngõ ngách thủ đô nghìn năm.",
      rarity: "Rare",
      hologramColor: "from-amber-400 via-rose-500 to-red-600"
    },
    coordinates: { lat: 21.0285, lng: 105.8542 }
  },
  {
    id: "p_dn",
    code: "DN",
    name: "Đà Nẵng",
    region: "Trung",
    tagline: "Thành phố đáng sống & Biển bạc Mỹ Khê",
    description: "Cửa ngõ miền Trung năng động nối liền di sản Hội An - Mỹ Sơn, nơi có bãi cát trắng mịn và những cây cầu huyền thoại.",
    attractions: ["Cầu Rồng Phun Lửa", "Đèo Hải Vân", "Bán Đảo Sơn Trà & Chùa Linh Ứng", "Bà Nà Hills", "Bãi Biển Mỹ Khê"],
    signatureFoods: [
      { name: "Mì Quảng Ếch Trang", price: "35.000đ - 50.000đ", address: "Lê Đình Dương, Hải Châu" },
      { name: "Bánh Tráng Cuốn Thịt Heo", price: "55.000đ", address: "Châu Thị Vĩnh Tế" },
      { name: "Bún Chả Cá Hòn", price: "30.000đ", address: "Hùng Vương, Thanh Khê" }
    ],
    soundscapeTrack: "Tiếng sóng biển Mỹ Khê & Gió đỉnh đèo Hải Vân",
    bgImage: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&auto=format&fit=crop&q=80",
    stamp: {
      id: "stamp_dn",
      code: "DN",
      title: "Chiến Thần Đèo Hải Vân",
      provinceName: "Đà Nẵng",
      provinceCode: "DN",
      icon: "🌉",
      description: "Chinh phục 'Thiên hạ đệ nhất hùng quan' ngắm trọn vịnh Đà Nẵng.",
      rarity: "Epic",
      hologramColor: "from-cyan-400 via-teal-500 to-emerald-600"
    },
    coordinates: { lat: 16.0544, lng: 108.2022 }
  },
  {
    id: "p_sg",
    code: "SG",
    name: "TP. Hồ Chí Minh",
    region: "Nam",
    tagline: "Hòn ngọc Viễn Đông không ngủ & Nhịp sống Gen Z",
    description: "Đô thị sôi động bậc nhất Việt Nam, nơi giao thoa của kiến trúc cổ kính Đông Dương và dòng chảy văn hóa trẻ rực rỡ sắc màu.",
    attractions: ["Nhà Thờ Đức Bà & Bưu Điện TP", "Phố Đi Bộ Nguyễn Huệ", "Bến Bạch Đằng Waterbus", "Chợ Bến Thành", "Dinh Độc Lập"],
    signatureFoods: [
      { name: "Cơm Tấm Ba Ghiền", price: "55.000đ - 75.000đ", address: "Đặng Văn Ngữ, Phú Nhuận" },
      { name: "Hủ Tiếu Nam Vang Nhân Quán", price: "50.000đ", address: "Âu Cơ, Tân Bình" },
      { name: "Bánh Tráng Trộn Cô Gánh", price: "25.000đ", address: "Hồ Con Rùa, Q.3" }
    ],
    soundscapeTrack: "Tiếng xe xôn xao & Tiếng rao cơm tấm đêm Sài Gòn",
    bgImage: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&auto=format&fit=crop&q=80",
    stamp: {
      id: "stamp_sg",
      code: "SG",
      title: "Chúa Tể Hẻm Sài Gòn",
      provinceName: "TP. Hồ Chí Minh",
      provinceCode: "SG",
      icon: "☕",
      description: "Uống cà phê vợt 2h sáng và lùng sục 101 hẻm ăn vặt trứ danh.",
      rarity: "Rare",
      hologramColor: "from-rose-500 via-orange-500 to-amber-400"
    },
    coordinates: { lat: 10.8231, lng: 106.6297 }
  },
  {
    id: "p_hg",
    code: "HG",
    name: "Hà Giang",
    region: "Bắc",
    tagline: "Cao nguyên đá Đồng Văn & Cực Bắc hùng vĩ",
    description: "Miền đất địa đầu Tổ quốc với những khúc cua chữ M huyền ảo, đèo Mã Pí Lèng sâu thẳm bên dòng sông Nho Quế màu xanh ngọc bích.",
    attractions: ["Cột Cờ Lũng Cú", "Đèo Mã Pí Lèng & Sông Nho Quế", "Phố Cổ Đồng Văn", "Dinh Thự Vua Mèo", "Dốc Thẩm Mã"],
    signatureFoods: [
      { name: "Bánh Tam Giác Mạch Nướng", price: "15.000đ/chiếc", address: "Chợ phiên Đồng Văn" },
      { name: "Thắng Dền Nóng Hổi", price: "20.000đ/bát", address: "Phố cổ Đồng Văn" },
      { name: "Cháo Ấu Tẩu Đêm", price: "35.000đ/bát", address: "TP. Hà Giang" }
    ],
    soundscapeTrack: "Tiếng khèn Mông đón gió trên vách đá Mã Pí Lèng",
    bgImage: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&auto=format&fit=crop&q=80",
    stamp: {
      id: "stamp_hg",
      code: "HG",
      title: "Kẻ Chinh Phục Cột Cờ Lũng Cú",
      provinceName: "Hà Giang",
      provinceCode: "HG",
      icon: "🚩",
      description: "Chạm tay vào lá cờ 54m² tại điểm cực Bắc Tổ quốc.",
      rarity: "Legendary",
      hologramColor: "from-emerald-400 via-teal-500 to-blue-600"
    },
    coordinates: { lat: 22.8233, lng: 104.9839 }
  },
  {
    id: "p_nb",
    code: "NB",
    name: "Ninh Bình",
    region: "Bắc",
    tagline: "Vịnh Hạ Long trên cạn & Cố đô Hoa Lư",
    description: "Non nước Tràng An sơn thủy hữu tình, núi non trùng điệp soi bóng xuống dòng sông Sào Khê trong vắt.",
    attractions: ["Quần Thể Danh Thắng Tràng An", "Chùa Bái Đính", "Hang Múa & Đỉnh Ngoạ Long", "Cố Đô Hoa Lư", "Tam Cốc Bích Động"],
    signatureFoods: [
      { name: "Cơm Cháy Ruốc Chà Bông OCOP", price: "35.000đ - 50.000đ", address: "Khu Tràng An" },
      { name: "Thịt Dê Núi Ninh Bình", price: "80.000đ - 120.000đ", address: "Đường Tràng An" }
    ],
    soundscapeTrack: "Tiếng khua mái chèo gỗ sông Sào Khê & Tiếng chim Hang Múa",
    bgImage: "https://images.unsplash.com/photo-1548013146-72479768bbaa?w=800&auto=format&fit=crop&q=80",
    stamp: {
      id: "stamp_nb",
      code: "NB",
      title: "Chúa Tể Đỉnh Ngoạ Long",
      provinceName: "Ninh Bình",
      provinceCode: "NB",
      icon: "🐉",
      description: "Leo 500 bậc đá ngắm trọn thung lũng Tam Cốc từ lưng rồng đá.",
      rarity: "Epic",
      hologramColor: "from-amber-400 via-emerald-500 to-teal-700"
    },
    coordinates: { lat: 20.2506, lng: 105.9744 }
  },
  {
    id: "p_pq",
    code: "PQ",
    name: "Phú Quốc (Kiên Giang)",
    region: "Nam",
    tagline: "Đảo Ngọc Tây Nam & Hoàng hôn Bãi Sao",
    description: "Hòn đảo lớn nhất Việt Nam với những bãi biển cát trắng tinh như kem, nước biển xanh biếc như ngọc bích và rạn san hô phong phú.",
    attractions: ["Hoàng Hôn Sunset Town", "Bãi Sao & Bãi Khem", "Vườn Tiêu & Nhà Thùng Nước Mắm", "Hòn Mây Rút", "Chợ Đêm Grand World"],
    signatureFoods: [
      { name: "Bún Quậy Kiến Xây", price: "45.000đ - 65.000đ", address: "Bạch Đằng, Dương Đông" },
      { name: "Gỏi Cá Trích Rừng", price: "70.000đ", address: "Chợ Đêm Phú Quốc" }
    ],
    soundscapeTrack: "Tiếng sóng vỗ Bãi Sao & Tiếng đờn ca tài tử đêm đảo ngọc",
    bgImage: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&auto=format&fit=crop&q=80",
    stamp: {
      id: "stamp_pq",
      code: "PQ",
      title: "Chúa Đảo Phú Quốc",
      provinceName: "Phú Quốc",
      provinceCode: "PQ",
      icon: "🏝️",
      description: "Tự tay quậy nước chấm bún quậy và ngắm hoàng hôn Sunset Sanato.",
      rarity: "Epic",
      hologramColor: "from-sky-400 via-blue-500 to-indigo-600"
    },
    coordinates: { lat: 10.2899, lng: 103.9840 }
  }
];

export const TEST_ACTIVATION_CODES: Record<string, { provinceCode: string; boxTitle: string; xp: number; coins: number; stamp: any }> = {
  "HANOI-GENZ-2026": {
    provinceCode: "HN",
    boxTitle: "Travel Box Hà Nội: Tinh Hoa 36 Phố Phường",
    xp: 500,
    coins: 250,
    stamp: {
      id: "stamp_hn",
      code: "HN",
      title: "Thánh Ăn Sập Phố Cổ",
      provinceName: "Hà Nội",
      provinceCode: "HN",
      icon: "🏛️",
      description: "Đã khám phá 36 phố phường và nếm trọn 10 món ăn kinh kỳ chuẩn vị.",
      rarity: "Rare",
      hologramColor: "from-amber-400 via-rose-500 to-red-600"
    }
  },
  "DANANG-PHUOT-2026": {
    provinceCode: "DN",
    boxTitle: "Travel Box Đà Nẵng: Sóng Biển & Hùng Quan",
    xp: 600,
    coins: 300,
    stamp: {
      id: "stamp_dn",
      code: "DN",
      title: "Chiến Thần Đèo Hải Vân",
      provinceName: "Đà Nẵng",
      provinceCode: "DN",
      icon: "🌉",
      description: "Chinh phục đỉnh đèo Hải Vân và săn rồng phun lửa cầu Rồng.",
      rarity: "Epic",
      hologramColor: "from-cyan-400 via-teal-500 to-emerald-600"
    }
  },
  "SAIGON-FOOD-2026": {
    provinceCode: "SG",
    boxTitle: "Travel Box Sài Gòn: Nhịp Sống Không Ngủ",
    xp: 500,
    coins: 250,
    stamp: {
      id: "stamp_sg",
      code: "SG",
      title: "Chúa Tể Hẻm Sài Gòn",
      provinceName: "TP. Hồ Chí Minh",
      provinceCode: "SG",
      icon: "☕",
      description: "Uống cà phê vợt 2h sáng và lùng sục 101 hẻm ăn vặt trứ danh.",
      rarity: "Rare",
      hologramColor: "from-rose-500 via-orange-500 to-amber-400"
    }
  },
  "HAGIANG-TREK-2026": {
    provinceCode: "HG",
    boxTitle: "Travel Box Hà Giang: Hoa Nở Trên Đá",
    xp: 800,
    coins: 400,
    stamp: {
      id: "stamp_hg",
      code: "HG",
      title: "Kẻ Chinh Phục Cột Cờ Lũng Cú",
      provinceName: "Hà Giang",
      provinceCode: "HG",
      icon: "🚩",
      description: "Chạm tay vào lá cờ 54m² tại điểm cực Bắc Tổ quốc.",
      rarity: "Legendary",
      hologramColor: "from-emerald-400 via-teal-500 to-blue-600"
    }
  },
  "NINHBINH-HERITAGE-2026": {
    provinceCode: "NB",
    boxTitle: "Travel Box Ninh Bình: Kỳ Quan Sơn Thủy",
    xp: 600,
    coins: 300,
    stamp: {
      id: "stamp_nb",
      code: "NB",
      title: "Chúa Tể Đỉnh Ngoạ Long",
      provinceName: "Ninh Bình",
      provinceCode: "NB",
      icon: "🐉",
      description: "Leo 500 bậc đá ngắm trọn thung lũng Tam Cốc từ lưng rồng đá.",
      rarity: "Epic",
      hologramColor: "from-amber-400 via-emerald-500 to-teal-700"
    }
  },
  "PHUQUOC-ISLAND-2026": {
    provinceCode: "PQ",
    boxTitle: "Travel Box Phú Quốc: Đảo Ngọc Rực Rỡ",
    xp: 600,
    coins: 300,
    stamp: {
      id: "stamp_pq",
      code: "PQ",
      title: "Chúa Đảo Phú Quốc",
      provinceName: "Phú Quốc",
      provinceCode: "PQ",
      icon: "🏝️",
      description: "Tự tay quậy nước chấm bún quậy và ngắm hoàng hôn Sunset Sanato.",
      rarity: "Epic",
      hologramColor: "from-sky-400 via-blue-500 to-indigo-600"
    }
  }
};

export const MOCK_TRAVEL_BOXES: TravelBox[] = [
  {
    id: "box_hn_01",
    slug: "travel-box-ha-noi",
    title: "Travel Box Hà Nội - Tinh Hoa Kẻ Chợ",
    provinceCode: "HN",
    provinceName: "Hà Nội",
    originalPrice: 289000,
    studentPrice: 239000,
    discountPercent: 17,
    rating: 4.9,
    reviewsCount: 342,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80",
    contents: {
      model3D: "Mô hình gỗ ghép Tháp Rùa 3D phát sáng",
      snacks: ["Ô mai sấu xào gừng Phố Huế OCOP 4 sao", "Trà sen Tây Hồ ướp bông tươi", "Bánh cốm Làng Vòng nén chân không"],
      postcardCount: 5,
      hasActivationCode: true,
      hasAudioGuide: true
    },
    description: "Hộp quà trải nghiệm Hà Nội đong đầy kỷ niệm: vừa có đồ chơi mô hình lắp ráp, đặc sản truyền thống, vừa kích hoạt trọn bộ audio thuyết minh ngõ hẻm và đóng dấu hộ chiếu số.",
    tag: "Bán chạy nhất"
  },
  {
    id: "box_dn_01",
    slug: "travel-box-da-nang",
    title: "Travel Box Đà Nẵng - Hùng Quan Biển Bạc",
    provinceCode: "DN",
    provinceName: "Đà Nẵng",
    originalPrice: 299000,
    studentPrice: 249000,
    discountPercent: 16,
    rating: 4.95,
    reviewsCount: 288,
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&auto=format&fit=crop&q=80",
    contents: {
      model3D: "Mô hình Cầu Rồng thép mạ vàng mini",
      snacks: ["Mực rim me Sơn Trà cay ngọt", "Bánh khô mè Cẩm Lệ chuẩn tiến vua", "Bò khô Cầu Mống thơm lừng"],
      postcardCount: 5,
      hasActivationCode: true,
      hasAudioGuide: true
    },
    description: "Chạm vào chất phóng khoáng của miền Trung: thưởng thức mực rim me cay nồng, chiêm ngưỡng mô hình Cầu Rồng và mở khóa tem Chiến Thần Hải Vân.",
    tag: "Gen Z yêu thích"
  },
  {
    id: "box_hg_01",
    slug: "travel-box-ha-giang",
    title: "Travel Box Hà Giang - Hoa Nở Trên Đá",
    provinceCode: "HG",
    provinceName: "Hà Giang",
    originalPrice: 320000,
    studentPrice: 259000,
    discountPercent: 19,
    rating: 5.0,
    reviewsCount: 195,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&auto=format&fit=crop&q=80",
    contents: {
      model3D: "Mô hình Cột Cờ Lũng Cú & Vách Đá Mã Pí Lèng",
      snacks: ["Bánh tam giác mạch sấy giòn OCOP", "Thịt trâu gác bếp Đồng Văn chuẩn vị", "Trà Shan Tuyết cổ thụ Suối Giàng"],
      postcardCount: 6,
      hasActivationCode: true,
      hasAudioGuide: true
    },
    description: "Bộ sưu tập đậm chất hùng tráng cực Bắc. Trải nghiệm giải mật mã nắp hộp để tìm tọa độ bí mật săn mây Đèo Gió.",
    tag: "Cực phẩm Phượt Thủ"
  },
  {
    id: "box_sg_01",
    slug: "travel-box-sai-gon",
    title: "Travel Box Sài Gòn - Hẻm Phố Không Ngủ",
    provinceCode: "SG",
    provinceName: "TP. Hồ Chí Minh",
    originalPrice: 289000,
    studentPrice: 239000,
    discountPercent: 17,
    rating: 4.88,
    reviewsCount: 410,
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&auto=format&fit=crop&q=80",
    contents: {
      model3D: "Mô hình Chợ Bến Thành & Xe Hủ Tiếu Cổ",
      snacks: ["Cơm cháy chà bông mắm hành cay", "Hạt sen sấy Đồng Tháp giòn bùi", "Cà phê phin giấy Robusta Đắk Lắk"],
      postcardCount: 5,
      hasActivationCode: true,
      hasAudioGuide: true
    },
    description: "Vibe Sài Gòn huyên náo gói trọn trong chiếc hộp: nhâm nhi cà phê phin, cắn miếng cơm cháy giòn rụm và hòa mình vào podcast hẻm đêm.",
    tag: "Đặc sản Đô thị"
  }
];

export const MOCK_QUESTS: Quest[] = [
  {
    id: "quest_hn_1",
    provinceCode: "HN",
    title: "Check-in Tọa Độ Cột Cờ Hà Nội",
    type: "GPS_CHECKIN",
    description: "Có mặt trong bán kính 150m quanh Cột Cờ Hà Nội (Hoàng Thành Thăng Long) và nhấn nút Quét Tọa Độ để nhận tem xác thực.",
    targetCoords: { lat: 21.0327, lng: 105.8402, radiusMeters: 200, locationName: "Cột Cờ Hà Nội - Điện Kính Thiên" },
    xpReward: 300,
    coinReward: 150,
    completed: true
  },
  {
    id: "quest_hn_2",
    provinceCode: "HN",
    title: "Mật Thư Nắp Hộp: Bí Ẩn Tháp Hòa Phong",
    type: "SECRET_CIPHER",
    description: "Giải mã mật thư in dưới đáy bưu thiếp số 3 trong Travel Box Hà Nội để tìm ra năm khánh thành di tích còn sót lại bên Hồ Gươm.",
    cipherClue: {
      hint: "Tôi là di tích duy nhất còn sót lại của chùa Báo Ân đồ sộ ven Hồ Gươm sau năm 1898. Tôi mang tên ngọn tháp đón gió mát lành. Năm hoàn thành tháp là bao nhiêu?",
      answerKey: "1847"
    },
    xpReward: 250,
    coinReward: 100,
    completed: false
  },
  {
    id: "quest_dn_1",
    provinceCode: "DN",
    title: "Săn Khoảnh Khắc Cầu Rồng Phun Lửa",
    type: "PHOTO_MATCH",
    description: "Chụp ảnh khớp với góc chụp trên bưu thiếp Postcard số 2 khi Cầu Rồng trình diễn phun lửa lúc 21:00 thứ Bảy/Chủ Nhật.",
    xpReward: 350,
    coinReward: 200,
    completed: true
  },
  {
    id: "quest_dn_2",
    provinceCode: "DN",
    title: "Định Vị Tọa Độ Đỉnh Đèo Hải Vân",
    type: "GPS_CHECKIN",
    description: "Check-in GPS tại Hải Vân Quan (độ cao 500m so với mực nước biển) để nhận danh hiệu 'Chiến Thần Đèo'.",
    targetCoords: { lat: 16.1969, lng: 108.1317, radiusMeters: 300, locationName: "Hải Vân Quan - Thiên Hạ Đệ Nhất Hùng Quan" },
    xpReward: 400,
    coinReward: 250,
    completed: false
  },
  {
    id: "quest_hg_1",
    provinceCode: "HG",
    title: "Check-in Cực Bắc: Cột Cờ Lũng Cú",
    type: "GPS_CHECKIN",
    description: "Chạm tọa độ 23°21'49''B - 105°18'57''Đ tại đỉnh núi Rồng, Lũng Cú, Hà Giang.",
    targetCoords: { lat: 23.3634, lng: 105.3160, radiusMeters: 300, locationName: "Cột Cờ Quốc Gia Lũng Cú" },
    xpReward: 500,
    coinReward: 300,
    completed: false
  },
  {
    id: "quest_sg_1",
    provinceCode: "SG",
    title: "Mật Thư Cà Phê Vợt 70 Năm Tuổi",
    type: "SECRET_CIPHER",
    description: "Nhập tên con hẻm nổi tiếng nhất quận Phú Nhuận nơi có quán cà phê vợt hoạt động xuyên đêm hơn nửa thế kỷ.",
    cipherClue: {
      hint: "Hẻm 330 đường nào tại quận Phú Nhuận?",
      answerKey: "Phan Đình Phùng"
    },
    xpReward: 250,
    coinReward: 120,
    completed: false
  }
];

export const MOCK_AUDIO_STORIES: AudioStory[] = [
  {
    id: "audio_hn_01",
    provinceCode: "HN",
    provinceName: "Hà Nội",
    title: "Bí mật 36 Phố Phường: Hàng Nào Không Còn Bán Đồ Nữa?",
    speaker: "MC Minh Châu (Gen Z Radio)",
    duration: "04:35",
    category: "Ẩm Thực Ngõ Hẻm",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    soundscapeUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    postcardImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80",
    storyContent: "Bạn có biết tại sao Hàng Buồm bây giờ không ai bán buồm, mà lại nức tiếng với thịt bò khô và trà sữa? Cùng lướt qua những biến thiên thú vị của tên phố kinh kỳ qua giọng kể hài hước nhưng đậm đặc sử liệu..."
  },
  {
    id: "audio_dn_01",
    provinceCode: "DN",
    provinceName: "Đà Nẵng",
    title: "Huyền Tích Hải Vân Quan & Con Đường Hùng Tráng",
    speaker: "Hoàng Long (Phượt thủ Đà Nẵng)",
    duration: "05:12",
    category: "Giai Thoại Lịch Sử",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    soundscapeUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    postcardImage: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&auto=format&fit=crop&q=80",
    storyContent: "Đèo Hải Vân không chỉ có mây phủ và cua tay áo khét lẹt. Nơi đây từng là ranh giới phân định địa lý cổ xưa và chứng kiến những câu chuyện tình sử đẫm lệ thời Huyền Trân Công Chúa..."
  },
  {
    id: "audio_hg_01",
    provinceCode: "HG",
    provinceName: "Hà Giang",
    title: "Chuyện Kể Bên Vách Đá Mã Pí Lèng & Sông Nho Quế",
    speaker: "Vàng Thị Hoa (Thổ địa Đồng Văn)",
    duration: "06:04",
    category: "Bí Kíp Săn Ảnh",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    soundscapeUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    postcardImage: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&auto=format&fit=crop&q=80",
    storyContent: "Lắng nghe huyền tích hẻm Tu Sản sâu nhất Đông Nam Á, nơi dòng nước xanh như ngọc len lỏi giữa hai bức tường đá vôi sừng sững..."
  }
];

export const MOCK_CUSTOM_BOX_OPTIONS: CustomBoxOption = {
  provinces: [
    { code: "HN", name: "Hà Nội", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&auto=format&fit=crop&q=80" },
    { code: "DN", name: "Đà Nẵng", image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400&auto=format&fit=crop&q=80" },
    { code: "SG", name: "TP. Hồ Chí Minh", image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&auto=format&fit=crop&q=80" },
    { code: "HG", name: "Hà Giang", image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=400&auto=format&fit=crop&q=80" },
    { code: "NB", name: "Ninh Bình", image: "https://images.unsplash.com/photo-1548013146-72479768bbaa?w=400&auto=format&fit=crop&q=80" },
    { code: "PQ", name: "Phú Quốc", image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=400&auto=format&fit=crop&q=80" }
  ],
  models3D: [
    { id: "mod_thaprua", name: "Mô hình Gỗ Lắp Ghép Tháp Rùa 3D", provinceCode: "HN", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&auto=format&fit=crop&q=80", price: 80000 },
    { id: "mod_caurong", name: "Mô hình Kim Loại Cầu Rồng Mạ Vàng", provinceCode: "DN", image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=300&auto=format&fit=crop&q=80", price: 85000 },
    { id: "mod_lungcu", name: "Mô hình Cột Cờ Lũng Cú Núi Rồng", provinceCode: "HG", image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=300&auto=format&fit=crop&q=80", price: 90000 },
    { id: "mod_chobenthanh", name: "Mô hình Chợ Bến Thành Tháp Đồng Hồ", provinceCode: "SG", image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=300&auto=format&fit=crop&q=80", price: 80000 },
    { id: "mod_hangmua", name: "Mô hình Rồng Đá Đỉnh Ngoạ Long Hang Múa", provinceCode: "NB", image: "https://images.unsplash.com/photo-1548013146-72479768bbaa?w=300&auto=format&fit=crop&q=80", price: 85000 }
  ],
  snacks: [
    { id: "snack_omai", name: "Ô Mai Sấu Xào Gừng Phố Cổ", provinceCode: "HN", ocopStar: 4, weight: "120g", image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=300&auto=format&fit=crop&q=80" },
    { id: "snack_trasen", name: "Trà Sen Bách Diệp Tây Hồ", provinceCode: "HN", ocopStar: 5, weight: "50g", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=300&auto=format&fit=crop&q=80" },
    { id: "snack_muctrim", name: "Mực Rim Me Cay Ngọt Đà Nẵng", provinceCode: "DN", ocopStar: 4, weight: "150g", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&auto=format&fit=crop&q=80" },
    { id: "snack_khome", name: "Bánh Khô Mè Cẩm Lệ Tiến Vua", provinceCode: "DN", ocopStar: 4, weight: "200g", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80" },
    { id: "snack_tamgiacmach", name: "Bánh Tam Giác Mạch Nướng Giòn", provinceCode: "HG", ocopStar: 4, weight: "180g", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&auto=format&fit=crop&q=80" },
    { id: "snack_traugacbep", name: "Thịt Trâu Gác Bếp Đồng Văn", provinceCode: "HG", ocopStar: 5, weight: "100g", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop&q=80" },
    { id: "snack_comchay", name: "Cơm Cháy Mắm Hành Giòn Cay Sài Gòn", provinceCode: "SG", ocopStar: 4, weight: "150g", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=80" },
    { id: "snack_comchayninhbinh", name: "Cơm Cháy Ruốc Ninh Bình OCOP", provinceCode: "NB", ocopStar: 4, weight: "200g", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=80" }
  ],
  postcards: [
    { id: "pc_1", name: "Hoàng Hôn Hồ Tây & Cầu Long Biên", artist: "Họa sĩ Lê Thanh Lam (ĐH Mỹ Thuật VN)", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&auto=format&fit=crop&q=80" },
    { id: "pc_2", name: "Cầu Rồng Phun Nước Lúc Nửa Đêm", artist: "Nhiếp ảnh gia Tuấn Trần", image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=300&auto=format&fit=crop&q=80" },
    { id: "pc_3", name: "Nắng Sớm Trên Sông Nho Quế", artist: "Tú Họa Sĩ Đi Bụi", image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=300&auto=format&fit=crop&q=80" },
    { id: "pc_4", name: "Cà Phê Vợt Sài Gòn Phố Hẻm", artist: "Minh Thư (Art & Soul)", image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=300&auto=format&fit=crop&q=80" }
  ]
};

export const MOCK_REWARDS: RewardVoucher[] = [
  {
    id: "vouch_01",
    title: "Giảm 50.000đ Vé Xe Khách Phương Trang",
    brand: "FUTA Bus Lines",
    category: "Xe Khách",
    coinsCost: 300,
    discountValue: "50.000đ",
    expiryDate: "30/11/2026",
    code: "FUTA-GENZ-50K",
    claimed: true,
    icon: "🚌"
  },
  {
    id: "vouch_02",
    title: "Voucher Giảm 100.000đ Đặt Phòng Homestay",
    brand: "GenZ Homestay Network",
    category: "Homestay",
    coinsCost: 500,
    discountValue: "100.000đ",
    expiryDate: "15/12/2026",
    code: "HOMESTAY-VIETNAM-100K",
    claimed: false,
    icon: "🏡"
  },
  {
    id: "vouch_03",
    title: "Giảm 70.000đ Khi Mua Travel Box Kế Tiếp",
    brand: "Travel Box Vietnam Official",
    category: "Travel Box",
    coinsCost: 400,
    discountValue: "70.000đ",
    expiryDate: "31/12/2026",
    code: "NEXTBOX-LOYALTY-70K",
    claimed: false,
    icon: "🎁"
  },
  {
    id: "vouch_04",
    title: "Vé Thuyền Sông Nho Quế Giảm 30%",
    brand: "Bến Thuyền Hẻm Tu Sản",
    category: "Vé Tham Quan",
    coinsCost: 350,
    discountValue: "30%",
    expiryDate: "31/10/2026",
    code: "NHOQUE-TREK-30",
    claimed: false,
    icon: "🚣"
  }
];

export const MOCK_BUDDIES: TravelBuddyPost[] = [
  {
    id: "buddy_1",
    authorName: "Trần Bảo Ngọc",
    authorUniversity: "ĐH Ngoại Thương Hà Nội (FTU)",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
    destination: "Hà Giang - Săn Mùa Hoa Tam Giác Mạch",
    dates: "24/10 - 27/10/2026 (3N2Đ)",
    estimatedCost: "1.800.000đ / người",
    seekingCount: 2,
    currentMembers: 2,
    description: "Nhóm mình gồm 2 bạn nữ FTU đã book xe Limousine và 2 xe máy Wave Alpha tại TP. Hà Giang. Tìm thêm 2 bạn (ưu tiên bạn nào biết lái xe cứng chút) để ghép xế - ôm vượt Mã Pí Lèng và chia sẻ tiền phòng homestay cực chill!",
    tags: ["Xe máy phượt", "Săn ảnh", "Tiết kiệm", "Nữ"],
    createdAt: "Vừa xong"
  },
  {
    id: "buddy_2",
    authorName: "Lê Quốc Huy",
    authorUniversity: "ĐH Bách Khoa TP.HCM (HCMUT)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    destination: "Đà Nẵng - Hội An - Cù Lao Chàm",
    dates: "10/11 - 13/11/2026 (4N3Đ)",
    estimatedCost: "2.200.000đ / người",
    seekingCount: 3,
    currentMembers: 3,
    description: "Team Bách Khoa đam mê lặn ngắm san hô và ăn sập chợ đêm Helio. Đã có lịch trình tối ưu chi phí cực chuẩn sinh viên.",
    tags: ["Lặn biển", "Foodtour", "Bách Khoa"],
    createdAt: "2 giờ trước"
  }
];

export const MOCK_FEED: CommunityFeedPost[] = [
  {
    id: "feed_1",
    authorName: "Đặng Hoàng Yến",
    authorUniversity: "ĐH Kinh Tế Quốc Dân (NEU)",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
    province: "Hà Giang",
    boxTitle: "Travel Box Hà Giang: Hoa Nở Trên Đá",
    caption: "Mở hộp Travel Box vừa kịp lúc đặt chân tới đèo Mã Pí Lèng! Mô hình Cột Cờ Lũng Cú bằng gỗ lắp siêu đẹp, bưu thiếp dán lên sổ tay xịn sò cực. Mã nắp hộp đã kích hoạt thành công, mở khóa được huy hiệu 'Kẻ Chinh Phục Cột Cờ' rồi nè cả nhà! 🚩✨",
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80"
    ],
    likesCount: 142,
    liked: false,
    commentsCount: 28,
    timestamp: "1 giờ trước"
  },
  {
    id: "feed_2",
    authorName: "Phạm Hải Đăng",
    authorUniversity: "Đại học FPT",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    province: "Đà Nẵng",
    boxTitle: "Travel Box Đà Nẵng: Hùng Quan Biển Bạc",
    caption: "Mực rim me trong hộp ăn cuốn thực sự, mang theo gặm lúc ngồi chờ Cầu Rồng phun lửa là hết nước chấm. Tính năng Audio Guide giọng kể Gen Z nghe chill phết, vừa ngắm biển vừa nghe soundscape sóng vỗ 10/10.",
    images: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&auto=format&fit=crop&q=80"
    ],
    likesCount: 98,
    liked: true,
    commentsCount: 14,
    timestamp: "3 giờ trước"
  }
];

export const MOCK_LEADERBOARD_INDIVIDUAL: LeaderboardEntry[] = [
  { rank: 1, name: "Trịnh Minh Đức", university: "ĐH Ngoại Thương (FTU)", points: 4850, unlockedCount: 18, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80", badge: "Đại Sứ Văn Hóa" },
  { rank: 2, name: "Lê Thu Thảo", university: "ĐH Kinh Tế Quốc Dân (NEU)", points: 4200, unlockedCount: 15, avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80", badge: "Thánh Phượt 63 Tỉnh" },
  { rank: 3, name: "Nguyễn Minh Khang (Bạn)", university: "ĐH Bách Khoa HN", points: 1450, unlockedCount: 2, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80", badge: "Lữ Khách Tinh Anh" },
  { rank: 4, name: "Vũ Tuấn Anh", university: "ĐH Quốc Gia Hà Nội", points: 1320, unlockedCount: 2, avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80", badge: "Lữ Khách Tinh Anh" }
];

export const MOCK_LEADERBOARD_UNIS = [
  { rank: 1, name: "ĐH Bách Khoa Hà Nội (HUST)", points: 148500, travelersCount: 1240, logo: "🏛️" },
  { rank: 2, name: "ĐH Ngoại Thương (FTU)", points: 139200, travelersCount: 1110, logo: "🌟" },
  { rank: 3, name: "ĐH Kinh Tế Quốc Dân (NEU)", points: 124000, travelersCount: 980, logo: "📈" },
  { rank: 4, name: "Đại học FPT", points: 118400, travelersCount: 920, logo: "💻" },
  { rank: 5, name: "ĐH Quốc Gia TP.HCM (VNU-HCM)", points: 112000, travelersCount: 890, logo: "🎓" },
  { rank: 6, name: "Đại học RMIT Vietnam", points: 94000, travelersCount: 650, logo: "🏆" }
];
