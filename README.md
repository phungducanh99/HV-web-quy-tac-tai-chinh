# HVO Finance OS — Web App Tra Cứu Quy Che Tài Chính Hải Vân

Ứng dụng WebApp tra cứu & tương tác dành cho Cán bộ Nhân viên và Quản lý tại **Công ty Liên doanh Vận chuyển Quốc tế Hải Vân**, giúp tra cứu, thấu hiểu và thực thi **Bộ Quy tắc Tài chính Hải Vân (20260930)**.

---

## 🌟 Tính Năng Chính (Giai Đoạn 1)

### 1. 🛡️ Hiến Pháp Dòng Tiền & 5 Mức Cảnh Báo Runway
- **Mô phỏng Runway tương tác:** Thử nghiệm chọn số tuần Runway ($\ge12$, $<12$, $<8$, $<4$, $<2$ tuần) để xem tự động thay đổi các mức cảnh báo (XANH, VÀNG, CAM, ĐỎ, ĐEN) và sự thu hẹp thẩm quyền phê duyệt chi tiêu.
- **7 Quỹ tiền tối thượng (Cash Reserves):** Tra cứu nguyên tắc trích lập không tất tay của 3 nhóm quỹ (Vận hành, Dự phòng, Đầu tư).
- **Thứ tự 9 ưu tiên cắt giảm chi phí:** Lộ trình ưu tiên cắt giảm khi dòng tiền bị suy giảm.

### 2. ⚖️ Phân Quyền DOA 6 Cấp & Chuỗi 6 Mắt Xích Phê Duyệt
- **Trực quan hóa 6 Mắt xích (A1 $\rightarrow$ A2 $\rightarrow$ A3 $\rightarrow$ Z1 $\rightarrow$ Z2 $\rightarrow$ Z3):** Phân định rõ nhóm Phê duyệt và nhóm Thực thi, làm nổi bật nguyên tắc **Phân tách nhiệm vụ (Segregation of Duties)**.
- **Ma trận Hạn mức DOA 6 Cấp:** Tra cứu hạn mức phê duyệt theo Cấp quản lý và loại chi phí.
- **Quy trình chi khẩn cấp & Ủy quyền ERP:** Quy tắc hậu kiểm 24h / 5 ngày làm việc và Sổ đăng ký ủy quyền (Delegation Register).

### 3. 🚀 Cổng Đầu Tư CAPEX & Sơ Đồ Quy Tắc
- **4 Cổng CAPEX (Investment Gates):** Strategic Fit, Financial Return, Cashflow Impact, Execution Readiness.
- **Cổng giai đoạn Gate 0–5:** Tiến trình cấp vốn từng phần cho các dự án mới / Strategic Bet.
- **Mô hình chấm điểm 80/100:** 6 tiêu chí cấp vốn đầu tư.
- **Sơ đồ cấu trúc phân tầng:** Hiến pháp (Phần 1) $\rightarrow$ Quy định chi tiết (Phần 2) $\rightarrow$ Phụ lục.

---

## 🛠️ Công Nghệ sử dụng
- **Frontend:** React 18, Vite, TypeScript
- **Styling:** Tailwind CSS v3, Framer Motion
- **Icons:** Lucide React

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Cục Bộ

```bash
# 1. Cài đặt dependencies
npm install

# 2. Chạy môi trường phát triển (Dev)
npm run dev

# 3. Build sản phẩm (Production)
npm run build
```

---

## 🌐 Hướng Dẫn Deploy Lên Vercel & GitHub

### Cách 1: Deploy trực tiếp qua Vercel CLI
```bash
npx vercel
```

### Cách 2: Push code lên GitHub & Đẩy qua Vercel
```bash
git init
git add .
git commit -m "feat: initial commit HVO Finance OS web app"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```
Sau đó vào trang [Vercel Dashboard](https://vercel.com/new), import repository từ GitHub và chọn framework **Vite** để tự động deploy.
