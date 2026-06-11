# CLAUDE.md — SmartAI for Work: AI Tools Directory

## Mô tả dự án
Website AI Tools Directory tập trung vào 4 ngành: Furniture, Architecture, Construction, Real Estate.
Stack: Next.js 16 + TypeScript + Tailwind CSS + Vercel.
Repo: https://github.com/tienbaoweb-learn/smart-ai-directory
Live: https://smart-ai-tools-for-work-directory.vercel.app/

---

## Quy tắc bắt buộc khi chỉnh sửa code

- Luôn dùng Tailwind CSS, không dùng inline style hay CSS modules
- Không cài thêm thư viện UI (shadcn, MUI, Chakra...) trừ khi được yêu cầu
- Ảnh dùng Next.js `<Image>` với `fill` hoặc `width/height` rõ ràng
- Mọi component có interactivity phải có `"use client"` ở đầu file
- Không dùng `Math.random()`, `Date.now()`, hay `toLocaleString()` — dùng giá trị tĩnh
- Không dùng `domains` trong next.config.ts, dùng `remotePatterns`
- Sau mỗi thay đổi lớn, chạy `npm run build` để kiểm tra lỗi

---

## Brand Guidelines

```
Primary Orange:  #F97316
Dark Navy:       #1E293B
Teal Accent:     #0EA5E9
White:           #FFFFFF
Gray text:       #6B7280
```

Font: System font stack (Tailwind default)
Logo text: "SmartAI" bold + "for Work" nhỏ màu cam bên dưới

---

## Cấu trúc file hiện tại

```
smart-ai-directory/
├── app/
│   ├── page.tsx         ← Homepage (tất cả sections)
│   ├── layout.tsx       ← Root layout + metadata
│   └── globals.css      ← Global styles
├── public/              ← Static assets
├── next.config.ts       ← Cho phép images từ images.unsplash.com
└── CLAUDE.md            ← File này
```

---

## Các sections trong Homepage (app/page.tsx)

1. **Navbar** — Logo, nav links (AI Tools, Industries, Best Of, Resources, About), Search, Subscribe button
2. **HeroSection** — Headline, subtitle, 2 CTA buttons, trust badges, 2×2 industry cards với ảnh Unsplash
3. **StatsBar** — 4 stats: 20K+ Professionals, 50K+ Monthly Visitors, 4.9/5 Rating, 100+ Countries
4. **ExploreByIndustry** — Horizontal scroll cards với ảnh Unsplash + arrows
5. **TopTools** — Filter tabs + 6 tool cards grid
6. **HowAIHelps** — 5 benefit columns
7. **LatestInsights** — 3 article cards
8. **Newsletter** — Email signup với gradient background
9. **Footer** — 6 columns: Brand, Explore, Industries, Resources, Company, Newsletter

---

## Danh sách việc cần làm (TODO)

### 🔴 Ưu tiên cao
- [ ] **Page title/metadata** — Đổi từ "Create Next App" thành "SmartAI for Work - AI Tools Directory" trong `app/layout.tsx`
- [ ] **Article thumbnails** — Thay emoji+gradient bằng ảnh Unsplash thật cho 3 bài viết
- [ ] **Newsletter section** — Đổi nền thành gradient xanh-cam giống design demo (blue left + orange right)
- [ ] **Hero blob decoration** — Thêm blob tròn cam mờ góc phải phía sau industry cards

### 🟡 Ưu tiên trung bình
- [ ] **Stats Bar icons** — Thêm icon SVG màu cho mỗi stat (người, chart, star, globe)
- [ ] **ExploreByIndustry card layout** — Icon nằm trong circle trắng ở giữa card (không phải góc trên)
- [ ] **Tool card logos** — Thay emoji bằng logo màu thật (SVG hoặc colored div)
- [ ] **Footer "By Industry"** — Đổi thành "Industries" trong Explore column

### 🟢 Ưu tiên thấp
- [ ] **Copyright năm** — Đổi từ "2025" thành "2026"
- [ ] **Favicon** — Thêm favicon SmartAI
- [ ] **OG image** — Thêm Open Graph image cho social sharing
- [ ] **Mobile responsive** — Kiểm tra và fix layout trên màn hình nhỏ

---

## Ảnh Unsplash đang dùng

```
Furniture:     https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80
Architecture:  https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80
Construction:  https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80
Real Estate:   https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80
```

Ảnh cho articles (cần thêm):
```
Article 1 (Furniture Guide):    https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80
Article 2 (Comparison):        https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80
Article 3 (Construction Tools): https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80
```

---

## Deploy workflow

```bash
# Sau khi chỉnh sửa xong, chạy:
npm run build          # Kiểm tra lỗi build
git add .
git commit -m "mô tả thay đổi"
git push               # Vercel tự động deploy
```

---

## Các trang cần build tiếp theo

- `/tools` — Danh sách tất cả AI tools với filter/search
- `/tools/[slug]` — Trang chi tiết từng tool
- `/categories` — Danh sách categories
- `/industries/[slug]` — Trang theo ngành (furniture, architecture...)
- `/blog` — Danh sách bài viết
- `/blog/[slug]` — Chi tiết bài viết

---

## Khi Claude Code nhận task

1. Đọc file này trước
2. Xem TODO list, ưu tiên theo màu 🔴 → 🟡 → 🟢
3. Chỉnh sửa trực tiếp file, không hỏi lại những gì đã rõ
4. Sau khi xong chạy `npm run build` kiểm tra
5. Báo cáo những gì đã làm và kết quả
