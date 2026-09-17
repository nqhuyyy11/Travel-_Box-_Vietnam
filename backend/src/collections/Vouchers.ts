import { CollectionConfig } from "payload/types";

export const Vouchers: CollectionConfig = {
  slug: "vouchers",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "brand", "category", "coinsCost"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Tên Voucher",
    },
    {
      name: "brand",
      type: "text",
      label: "Thương Hiệu / Nhà Xe / Homestay",
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Xe Khách Liên Tỉnh", value: "Xe Khách" },
        { label: "Homestay & Khách Sạn", value: "Homestay" },
        { label: "Hộp Quà Travel Box", value: "Travel Box" },
        { label: "Vé Thuyền & Tham Quan", value: "Vé Tham Quan" },
      ],
      required: true,
      label: "Danh Mục Ưu Đãi",
    },
    {
      name: "coinsCost",
      type: "number",
      required: true,
      label: "Giá Quy Đổi (Travel Coins)",
    },
    {
      name: "code",
      type: "text",
      required: true,
      label: "Mã Ưu Đãi / Coupon Code",
    },
    {
      name: "discountValue",
      type: "text",
      label: "Giá Trị Giảm Giá (VD: 50.000đ hoặc 20%)",
    },
    {
      name: "expiryDate",
      type: "text",
      label: "Hạn Sử Dụng",
    },
    {
      name: "icon",
      type: "text",
      label: "Icon Hiển Thị",
    },
  ],
};
