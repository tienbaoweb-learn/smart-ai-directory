# CLAUDE.md — SmartAI for Work: AI Tools Directory

## Mô tả dự án
Website AI Tools Directory cho 5 ngành: Furniture, Architecture, Construction,
Interior Design, Real Estate.
Stack: Next.js 16 (App Router, SSG) + TypeScript + Tailwind CSS + Vercel.
Repo: https://github.com/tienbaoweb-learn/smart-ai-directory
Live: https://www.smartaiforwork.com/

Mô hình nội dung: tool review (affiliate) là trung tâm, bao quanh là hub theo
ngành/use-case và resources (guides, news, case studies, tutorials,
comparisons, workflows) — tất cả liên kết chéo theo quy tắc internal link
bên dưới.

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

## Quy tắc Internal Link & Affiliate (BẮT BUỘC cho mọi bài viết mới)

Các quy tắc này đã được chuẩn hoá trên toàn site (Jul 2026). Mọi bài viết mới
(guide, news, case study, tutorial, comparison, workflow, tool review) phải
tuân theo — không cần hỏi lại.

### 1. Không bao giờ tạo internal link chết

- **Chỉ render `<Link>` khi trang đích tồn tại thật.** Nội dung chưa có trang
  đích thì render text/chip tĩnh (`<span>` xám `text-gray-500 bg-gray-100`),
  KHÔNG dùng `href="#"`, không style text tĩnh giống link (xanh).
- Link tới tool review phải resolve qua `getToolBySlug()` / `findToolByName()`
  trước khi render — không tự ghép slug từ tên tool.
- `ResourceCard` / `ResourceListRow` có `href` optional: bỏ trống `href` cho
  nội dung placeholder chưa có trang detail.

### 2. Tags trên bài viết — dùng resolver, không link mù

Mỗi trang detail (guides, ai-news, case-studies, tutorials) đã có sẵn
`resolveTagHref()` / `TagChip`:

- Tag map được → chip xanh có link. Thứ tự resolve:
  1. `TAG_DESTINATIONS` (map biên tập trong từng page): tên ngành →
     `/industries/<slug>`; cụm từ chủ đề → `/tags/<slug>` hoặc
     `/resources/ai-news`
  2. Fallback: slugify tag rồi so với `tagsData` (lib/tags-data.ts) →
     `/tags/<slug>`
- Tag không map được → chip xám tĩnh (không phải chip xanh).
- Bài mới có tag chủ đề mới: thêm mapping vào `TAG_DESTINATIONS` của page đó,
  hoặc thêm tag vào `tagsData` nếu đáng có trang `/tags` riêng.
- Guide detail: topic tags lấy từ `guidesData.tags` (slug chuẩn); tags trong
  `guidesContent` chỉ là keyword phrases hiển thị tĩnh.

### 3. Affiliate tools liên quan — mỗi bài viết phải có

- **AI News** (`lib/ai-news-data.ts`): mỗi post phải có `recommendedTools`
  (3 tool, `{ slug, note }`) — slug phải tồn tại trong `content/tools/`.
- **Case Studies** (`lib/case-studies-content.ts`): mỗi study phải có
  `recommendedTools` (3 tool được nhắc trong bài).
- **Tutorials** (`lib/tutorials-data.ts`): mỗi tutorial phải có `toolSlug`
  trỏ tới review của tool chính trong bài.
- **Guides**: dùng block `related-reviews` (theo `industry` hoặc `reviews`)
  + bảng `comparison-table` có `slug` cho từng row (tự sinh cột "Visit ↗").
- Mọi link affiliate: `rel="sponsored noopener noreferrer"`, lấy URL từ
  `frontmatter.affiliateLink || websiteUrl`, luôn kèm dòng disclosure link
  về `/affiliate-disclosure`. Link external thường: `noopener noreferrer`.

### 4. Cấu trúc link chuẩn của một bài viết detail

Mỗi bài detail phải có đủ:
1. Breadcrumb hiển thị (mọi cấp trừ trang hiện tại là link) + BreadcrumbList
   schema khớp 100% với breadcrumb hiển thị
2. Tag chips theo quy tắc #2
3. Section tools affiliate theo quy tắc #3 (review link nội bộ + CTA sponsored)
4. Link liên quan chéo: guide ↔ review ↔ comparison ↔ workflow khi có

### 5. Sitemap & nguồn slug

- Slug trang detail lấy từ file **content** (`guidesContent`, `caseStudies`,
  `tutorialsContent`, `aiNewsPosts`, `content/tools/`) — KHÔNG lấy từ file
  `-data.ts` listing (slug listing có thể không có trang thật).
- Bài mới phải xuất hiện trong `app/sitemap.ts` với `lastModified` là ngày
  publish thật — không dùng `new Date()`.
- Tool review mới: khai báo `tags`, `bestOf`, `industries`, `alternatives`
  trong frontmatter; alternatives không có review sẽ tự render không link.

### 6. Checklist trước khi commit bài viết mới

- [ ] Không có `href="#"` mới; không có link tới slug không tồn tại
- [ ] Tags link hoạt động (click thử trên dev server)
- [ ] Có section affiliate tools + disclosure
- [ ] Bài có trong sitemap với ngày thật
- [ ] `npm run build` pass

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
Logo: "SmartAI" bold + "for Work" nhỏ màu cam bên dưới
(file `public/SmartaiforworkLogo.webp`)

---

## Cấu trúc site hiện tại (routes)

```
/                          Homepage (HomeClient + ItemList schema từ data thật)
/tools                     Danh sách tool + filter theo category
/tools/[slug]              Tool review (~240 bài, nguồn: content/tools/*.mdx)
/ai-tools                  Hub theo use-case
/ai-tools/{design|sales|content-marketing|automation|productivity}
/best-of                   Hub Best Of
/best-of/{architecture|construction|interior-design|real-estate}
/industries                Hub ngành
/industries/{furniture|architecture|construction|interior-design|real-estate}
/compare/[slug]            So sánh head-to-head (~10 bài)
/all-reviews               Tổng hợp review
/ai-glossary               Thuật ngữ AI
/tags                      Index chủ đề
/tags/[slug]               Trang chủ đề (13 tags, lib/tags-data.ts)
/resources                 Hub resources (+ ResourceSearch)
/resources/guides[/slug]           6 guides
/resources/ai-news[/slug]          6 bản tin tuần
/resources/case-studies[/slug]     5 case studies
/resources/tutorials[/slug]        2 tutorials thật (+7 placeholder chưa link)
/resources/comparisons             Hub comparisons
/resources/workflows[/slug]        11 workflows
/about-us  /how-we-review  /contact
/privacy-policy  /terms-of-use  /affiliate-disclosure
/sitemap.xml  /robots.txt  /llms.txt   (đều generate từ data thật)
API: /api/contact, /api/newsletter
```

Build hiện tại: ~334 trang static (SSG). Không có trang dynamic runtime.

---

## Nguồn dữ liệu (source of truth)

| Nội dung | Trang detail (content) | Listing/chrome (-data) |
|---|---|---|
| Tool reviews | `content/tools/*.mdx` (frontmatter + MDX) qua `lib/tools.ts` | `app/data/tools.ts`, `tool-logos.ts` |
| Guides | `lib/guides-content.ts` | `lib/guides-data.ts` (topic tags chuẩn ở đây) |
| AI News | `lib/ai-news-data.ts` (content + data chung 1 file) | — |
| Case studies | `lib/case-studies-content.ts` | `lib/case-studies-data.ts` (CHỈ chrome — slug KHÔNG có trang thật) |
| Tutorials | `lib/tutorials-content.ts` | `lib/tutorials-data.ts` (`isPlaceholder`, `toolSlug`) |
| Comparisons | `lib/comparisons.ts` | `lib/comparisons-data.ts` |
| Workflows | `lib/workflows-data.ts` | — |
| Tags | `lib/tags-data.ts` | — |

Quy tắc vàng: **sitemap + mọi internal link lấy slug từ cột "content"**,
không lấy từ cột listing.

- `content/drafts/` — bài nháp, không được import vào site
- Tool `sample-tool` bị exclude khỏi mọi listing (EXCLUDED_SLUGS trong lib/tools.ts)

---

## SEO / AEO / GEO đã chuẩn hoá (đừng làm hỏng)

- Mọi trang có `alternates.canonical` + OpenGraph; layout có WebSite +
  Organization schema (KHÔNG thêm SearchAction khi chưa có search thật)
- Tool review: FAQPage + BreadcrumbList + SoftwareApplication/Review schema
  (có datePublished/dateModified, KHÔNG dùng aggregateRating tự chấm),
  Quick Verdict block đầu bài, breadcrumb category link về industry hub
- Affiliate CTA luôn `rel="sponsored"` — đã áp dụng toàn site
- `app/sitemap.ts`: priority phân tầng (hub 0.9 / section 0.7 / legal 0.3),
  ngày thật; `app/robots.ts` allow rõ các AI crawler; `app/llms.txt/route.ts`
  generate từ data
- `/how-we-review` là trang methodology (E-E-A-T) — được link từ meta badges
  trên mọi review + footer

---

## Deploy workflow

```bash
npm run build          # Kiểm tra lỗi build (bắt buộc trước khi commit)
git add <file liên quan>   # chỉ add file thuộc task, không add -A bừa
git commit -m "mô tả thay đổi"
git push               # Vercel tự động deploy
```

---

## Backlog thật (cập nhật Jul 2026)

### 🔴 Content
- [ ] Viết 7 tutorial thật thay các placeholder trong `lib/tutorials-data.ts`
- [ ] Viết trang detail cho 5 case study listing-only trong
      `lib/case-studies-data.ts` (hoặc gỡ hẳn khỏi listing)
- [ ] FAQ thật (override template) cho các tool review quan trọng —
      hiện `generateFAQs()` sinh 4 câu template giống nhau cho 240 bài
- [ ] Bản tin AI News hàng tuần (kèm `recommendedTools` — xem quy tắc #3)

### 🟡 SEO / tính năng
- [ ] Điền `sameAs` trong Organization schema khi có social profile thật
- [ ] Search thật cho `/tools` (khi có thì thêm lại SearchAction schema)
- [ ] Inline contextual links trong body text của guides/case studies
      (hiện chỉ link qua block related-reviews / comparison-table)
- [ ] Số liệu bảng "vs Top Alternatives" trong tool review đang synthetic
      (derive từ rating) — thay bằng đánh giá thật cho các tool lớn

### 🟢 Nice to have
- [ ] OG image riêng cho từng loại trang (hiện dùng og-image.svg chung)
- [ ] Free resources (PDF/template) thật cho box "Free Resources" ở /resources

---

## Khi Claude Code nhận task

1. Đọc file này trước
2. Task liên quan bài viết/content: áp dụng "Quy tắc Internal Link &
   Affiliate" ở trên, không cần hỏi lại
3. Chỉnh sửa trực tiếp file, không hỏi lại những gì đã rõ
4. Sau khi xong chạy `npm run build` kiểm tra
5. Commit chỉ các file thuộc task; báo cáo những gì đã làm và kết quả
