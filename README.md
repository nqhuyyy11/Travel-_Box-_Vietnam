# Travel Box Vietnam - Nền Tảng Du Lịch Di Sản O2O & Hộ Chiếu Số

Hệ sinh thái kết hợp vật phẩm hộp quà hữu hình và trải nghiệm số game hóa 63 tỉnh thành Việt Nam dành cho thế hệ trẻ Gen Z và sinh viên.

---

## 🚀 Tính Năng Nổi Bật (7 Module Cốt Lõi)

1. **Module 1: Cổng Kích Hoạt & Cuốn Hộ Chiếu Số (Passport & Interactive 63 Provinces Map)**
   - Quét mã QR / Unique code in dưới nắp hộp Travel Box.
   - Bản đồ SVG Việt Nam tương tác phát sáng các tỉnh đã mở khóa, bao gồm quần đảo Hoàng Sa & Trường Sa.
   - Giao diện Cuốn Hộ Chiếu Số định danh thẻ sinh viên và bộ sưu tập tem số đóng mộc đỏ di sản.
2. **Module 2: Trạm Kể Chuyện Đa Phương Tiện (Audio Storytelling & Soundscape Mixer)**
   - Trình phát thuyết minh kèm bộ trộn âm thanh 2 kênh: Voice Thuyết Minh và Soundscape Bản Địa (sóng biển, chuông chùa...).
   - Đồng bộ bưu thiếp nghệ thuật mở ra huyền tích ngõ hẻm thú vị.
3. **Module 3: Thử Thách Thực Địa GPS & Gamification (Real-World Quests)**
   - Check-in tọa độ GPS di sản thật qua HTML5 Geolocation API.
   - Giải mật thư nắp hộp rèn tư duy khám phá.
   - Bảng xếp hạng Top Cá nhân và Top Trường Đại học (HUST, FTU, NEU, FPT, RMIT, VNU...).
4. **Module 4: Cửa Hàng Trực Tuyến & Xưởng Tự Mix Quà (Custom Box Studio)**
   - Quy trình 5 bước tự phối hộp quà OCOP: Chọn tỉnh ➔ Chọn mô hình 3D ➔ Chọn 3 đặc sản OCOP ➔ Soạn lời chúc & Postcard ➔ Chọn gói Solo/Combo.
   - Cổng thanh toán VietQR tự động sinh mã ngân hàng và chiết khấu -20% thẻ sinh viên.
5. **Module 5: Cẩm Nang Du Lịch Sinh Viên & Máy Tính Dự Toán Ngân Sách**
   - Tự động dự toán chi phí trọn gói theo số người & số ngày đi.
   - Bản đồ ẩm thực local ngon - bổ - rẻ cam kết không chặt chém và hotline cứu hộ SOS 24/7.
6. **Module 6: Cộng Đồng Xê Dịch & Kho Đổi Thưởng (Community & Rewards Vault)**
   - Travel Feed chia sẻ ảnh đập hộp và nhật ký hành trình.
   - Ghép bạn phượt cùng trường ĐH, share tiền phòng homestay.
   - Kho đổi xu (Travel Coins) lấy voucher vé xe khách Phương Trang, Homestay, giảm giá hộp quà.
7. **Module 7: Quản Trị Hệ Sinh Thái (Payload CMS 3.x & Express Backend)**
   - Collections quản trị: Users, Provinces, Boxes, ActivationCodes, Quests, AudioStories, Orders, Badges, Vouchers.

---

## 🔑 Mã Kích Hoạt Nắp Hộp Thử Nghiệm Mẫu (Sample Test Codes)

| Mã Nắp Hộp | Tỉnh Thành Mở Khóa | Con Tem Nhận Được | Phần Thưởng |
| :--- | :--- | :--- | :--- |
| `HANOI-GENZ-2026` | Hà Nội | "Thánh Ăn Sập Phố Cổ" | +500 XP / +250 Xu |
| `DANANG-PHUOT-2026` | Đà Nẵng | "Chiến Thần Đèo Hải Vân" | +600 XP / +300 Xu |
| `SAIGON-FOOD-2026` | TP. Hồ Chí Minh | "Chúa Tể Hẻm Sài Gòn" | +500 XP / +250 Xu |
| `HAGIANG-TREK-2026` | Hà Giang | "Kẻ Chinh Phục Cột Cờ Lũng Cú" | +800 XP / +400 Xu |
| `PHUQUOC-ISLAND-2026` | Phú Quốc | "Chúa Đảo Phú Quốc" | +600 XP / +300 Xu |
| `NINHBINH-HERITAGE-2026` | Ninh Bình | "Chúa Tể Đỉnh Ngoạ Long" | +600 XP / +300 Xu |

---

## 💻 Hướng Dẫn Cài Đặt & Khởi Chạy

### 1. Khởi chạy Frontend (Next.js 14):
```bash
cd frontend
npm install
npm run dev
```
Truy cập giao diện: `http://localhost:3000`

### 2. Khởi chạy Backend (Payload CMS & MongoDB):
```bash
cd backend
npm install
npm run dev
```
Truy cập Admin CMS: `http://localhost:3001/admin`
API Endpoints: `http://localhost:3001/api`
