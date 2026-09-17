import { CollectionConfig } from "payload/types";

export const AudioStories: CollectionConfig = {
  slug: "audio-stories",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "provinceCode", "speaker", "duration"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Tiêu Đề Thuyết Minh",
    },
    {
      name: "provinceCode",
      type: "text",
      required: true,
      label: "Mã Tỉnh",
    },
    {
      name: "speaker",
      type: "text",
      label: "Giọng Đọc / Người Kể",
    },
    {
      name: "duration",
      type: "text",
      label: "Thời Lượng",
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Giai Thoại Lịch Sử", value: "Giai Thoại Lịch Sử" },
        { label: "Ẩm Thực Ngõ Hẻm", value: "Ẩm Thực Ngõ Hẻm" },
        { label: "Chuyện Ma Dân Gian", value: "Chuyện Ma Dân Gian" },
        { label: "Bí Kíp Săn Ảnh", value: "Bí Kíp Săn Ảnh" },
      ],
      label: "Thể Loại",
    },
    {
      name: "audioUrl",
      type: "text",
      label: "Link File Audio Thuyết Minh",
    },
    {
      name: "soundscapeUrl",
      type: "text",
      label: "Link File Soundscape Thực Cảnh",
    },
    {
      name: "postcardImage",
      type: "text",
      label: "Ảnh Bưu Thiếp Đi Kèm",
    },
    {
      name: "storyContent",
      type: "textarea",
      label: "Văn Bản / Lời Thoại",
    },
  ],
};
