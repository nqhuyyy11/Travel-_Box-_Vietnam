import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "university", "levelTitle", "travelCoins"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Họ và Tên Lữ Khách",
    },
    {
      name: "university",
      type: "text",
      label: "Trường Đại Học",
    },
    {
      name: "studentId",
      type: "text",
      label: "Mã Số Sinh Viên",
    },
    {
      name: "avatar",
      type: "text",
      label: "Ảnh Đại Diện",
    },
    {
      name: "levelTitle",
      type: "select",
      options: [
        { label: "Tân Thủ Lữ Hành", value: "Tân Thủ Lữ Hành" },
        { label: "Lữ Khách Tinh Anh", value: "Lữ Khách Tinh Anh" },
        { label: "Thánh Phượt 63 Tỉnh", value: "Thánh Phượt 63 Tỉnh" },
        { label: "Đại Sứ Văn Hóa Di Sản", value: "Đại Sứ Văn Hóa Di Sản" },
      ],
      defaultValue: "Tân Thủ Lữ Hành",
      label: "Cấp Bậc Lữ Khách",
    },
    {
      name: "xp",
      type: "number",
      defaultValue: 0,
      label: "Điểm Kinh Nghiệm (XP)",
    },
    {
      name: "travelCoins",
      type: "number",
      defaultValue: 0,
      label: "Travel Coins (Xu)",
    },
    {
      name: "unlockedProvinces",
      type: "relationship",
      relationTo: "provinces",
      hasMany: true,
      label: "Các Tỉnh Đã Mở Khóa",
    },
    {
      name: "badges",
      type: "relationship",
      relationTo: "badges",
      hasMany: true,
      label: "Bộ Sưu Tập Tem Số",
    },
  ],
};
