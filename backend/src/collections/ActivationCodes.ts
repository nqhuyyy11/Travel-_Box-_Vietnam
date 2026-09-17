import { CollectionConfig } from "payload/types";

export const ActivationCodes: CollectionConfig = {
  slug: "activation-codes",
  admin: {
    useAsTitle: "code",
    defaultColumns: ["code", "provinceCode", "isActivated", "activatedBy"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "code",
      type: "text",
      required: true,
      unique: true,
      label: "Mã QR Nắp Hộp",
    },
    {
      name: "provinceCode",
      type: "text",
      required: true,
      label: "Mã Tỉnh Mở Khóa",
    },
    {
      name: "boxTitle",
      type: "text",
      label: "Tên Loại Hộp",
    },
    {
      name: "isActivated",
      type: "checkbox",
      defaultValue: false,
      label: "Đã Được Kích Hoạt?",
    },
    {
      name: "activatedBy",
      type: "relationship",
      relationTo: "users",
      label: "Lữ Khách Đã Kích Hoạt",
    },
    {
      name: "activatedAt",
      type: "date",
      label: "Thời Điểm Kích Hoạt",
    },
    {
      name: "xpReward",
      type: "number",
      defaultValue: 500,
      label: "Thưởng XP",
    },
    {
      name: "coinReward",
      type: "number",
      defaultValue: 250,
      label: "Thưởng Xu",
    },
  ],
};
