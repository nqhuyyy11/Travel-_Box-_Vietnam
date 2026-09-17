import { CollectionConfig } from "payload/types";

export const Badges: CollectionConfig = {
  slug: "badges",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "provinceCode", "rarity"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Tên Tem Số / Huy Hiệu",
    },
    {
      name: "provinceCode",
      type: "text",
      required: true,
      label: "Mã Tỉnh",
    },
    {
      name: "icon",
      type: "text",
      label: "Biểu Tượng Emoji / Icon",
    },
    {
      name: "description",
      type: "textarea",
      label: "Ý Nghĩa Danh Hiệu",
    },
    {
      name: "rarity",
      type: "select",
      options: [
        { label: "Phổ Thông (Common)", value: "Common" },
        { label: "Hiếm (Rare)", value: "Rare" },
        { label: "Sử Thi (Epic)", value: "Epic" },
        { label: "Huyền Thoại (Legendary)", value: "Legendary" },
      ],
      defaultValue: "Rare",
      label: "Độ Hiếm",
    },
    {
      name: "hologramColor",
      type: "text",
      label: "Màu Hologram Gradient",
    },
  ],
};
