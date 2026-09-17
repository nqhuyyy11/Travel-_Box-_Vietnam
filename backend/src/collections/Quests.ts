import { CollectionConfig } from "payload/types";

export const Quests: CollectionConfig = {
  slug: "quests",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "provinceCode", "type", "xpReward"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Tên Thử Thách",
    },
    {
      name: "provinceCode",
      type: "text",
      required: true,
      label: "Mã Tỉnh",
    },
    {
      name: "type",
      type: "select",
      options: [
        { label: "Check-in GPS Thực Địa", value: "GPS_CHECKIN" },
        { label: "Giải Mật Thư Nắp Hộp", value: "SECRET_CIPHER" },
        { label: "Chụp Ảnh Khớp Postcard", value: "PHOTO_MATCH" },
        { label: "Khám Phá Ẩm Thực Local", value: "LOCAL_TASTE" },
      ],
      required: true,
      label: "Loại Nhiệm Vụ",
    },
    {
      name: "description",
      type: "textarea",
      label: "Mô Tả & Hướng Dẫn Thực Hiện",
    },
    {
      name: "xpReward",
      type: "number",
      defaultValue: 300,
      label: "Phần Thưởng XP",
    },
    {
      name: "coinReward",
      type: "number",
      defaultValue: 150,
      label: "Phần Thưởng Coins",
    },
  ],
};
