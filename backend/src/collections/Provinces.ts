import { CollectionConfig } from "payload/types";

export const Provinces: CollectionConfig = {
  slug: "provinces",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "code", "region", "tagline"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Tên Tỉnh / Thành Phố",
    },
    {
      name: "code",
      type: "text",
      required: true,
      unique: true,
      label: "Mã Viết Tắt (VD: HN, DN, SG)",
    },
    {
      name: "region",
      type: "select",
      options: [
        { label: "Miền Bắc", value: "Bắc" },
        { label: "Miền Trung", value: "Trung" },
        { label: "Miền Nam", value: "Nam" },
      ],
      required: true,
      label: "Vùng Miền",
    },
    {
      name: "tagline",
      type: "text",
      label: "Khẩu Hiệu Du Lịch",
    },
    {
      name: "description",
      type: "textarea",
      label: "Mô Tả Tổng Quan Di Sản",
    },
    {
      name: "bgImage",
      type: "text",
      label: "Ảnh Bìa Phong Cảnh",
    },
    {
      name: "coordinates",
      type: "group",
      label: "Tọa Độ Trung Tâm",
      fields: [
        { name: "lat", type: "number", label: "Vĩ Độ (Latitude)" },
        { name: "lng", type: "number", label: "Kinh Độ (Longitude)" },
      ],
    },
    {
      name: "attractions",
      type: "array",
      label: "Danh Thắng Tiêu Biểu",
      fields: [{ name: "title", type: "text", label: "Tên Danh Thắng" }],
    },
    {
      name: "signatureFoods",
      type: "array",
      label: "Ẩm Thực Local Sinh Viên",
      fields: [
        { name: "name", type: "text", label: "Tên Món" },
        { name: "price", type: "text", label: "Giá Tham Khảo" },
        { name: "address", type: "text", label: "Địa Chỉ Quán" },
      ],
    },
  ],
};
