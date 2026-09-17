import { CollectionConfig } from "payload/types";

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "orderCode",
    defaultColumns: ["orderCode", "customerName", "totalAmount", "status", "createdAt"],
  },
  fields: [
    {
      name: "orderCode",
      type: "text",
      required: true,
      unique: true,
      label: "Mã Đơn Hàng",
    },
    {
      name: "customerName",
      type: "text",
      required: true,
      label: "Tên Khách Hàng",
    },
    {
      name: "phone",
      type: "text",
      label: "Số Điện Thoại",
    },
    {
      name: "address",
      type: "textarea",
      label: "Địa Chỉ Nhận Hàng",
    },
    {
      name: "studentIdCard",
      type: "text",
      label: "Mã Thẻ SV (Nếu Có Giảm Giá)",
    },
    {
      name: "totalAmount",
      type: "number",
      required: true,
      label: "Tổng Tiền (VNĐ)",
    },
    {
      name: "paymentMethod",
      type: "select",
      options: [
        { label: "VietQR Ngân Hàng", value: "VIETQR" },
        { label: "Ví MoMo", value: "MOMO" },
        { label: "Ví ZaloPay", value: "ZALOPAY" },
      ],
      defaultValue: "VIETQR",
      label: "Phương Thức Thanh Toán",
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Chờ Thanh Toán", value: "PENDING" },
        { label: "Đã Thanh Toán", value: "PAID" },
        { label: "Đang Đóng Hộp OCOP", value: "PACKING" },
        { label: "Đang Giao Hàng", value: "SHIPPING" },
        { label: "Hoàn Tất", value: "COMPLETED" },
      ],
      defaultValue: "PENDING",
      label: "Trạng Thái Đơn",
    },
  ],
};
