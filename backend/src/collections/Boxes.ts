import { CollectionConfig } from "payload/types";

export const Boxes: CollectionConfig = {
  slug: "boxes",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "provinceCode", "studentPrice", "stock"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Tên Hộp Quà",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "provinceCode",
      type: "text",
      required: true,
      label: "Mã Tỉnh",
    },
    {
      name: "provinceName",
      type: "text",
      required: true,
      label: "Tên Tỉnh",
    },
    {
      name: "originalPrice",
      type: "number",
      required: true,
      label: "Giá Gốc (VNĐ)",
    },
    {
      name: "studentPrice",
      type: "number",
      required: true,
      label: "Giá Sinh Viên (VNĐ)",
    },
    {
      name: "image",
      type: "text",
      label: "Ảnh Sản Phẩm",
    },
    {
      name: "model3D",
      type: "text",
      label: "Mô Hình 3D Đi Kèm",
    },
    {
      name: "snacks",
      type: "array",
      label: "3 Gói Đặc Sản OCOP",
      fields: [{ name: "snackName", type: "text" }],
    },
    {
      name: "stock",
      type: "number",
      defaultValue: 100,
      label: "Tồn Kho",
    },
    {
      name: "description",
      type: "textarea",
      label: "Mô Tả Hộp Quà",
    },
  ],
};
