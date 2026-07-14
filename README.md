# Portfolio — Lương Quốc Dũng

Personal portfolio built with Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, and Framer Motion. Dark theme, fully static, SEO-ready.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Deploy to Vercel (zero config):

```bash
npx vercel --prod
```

Then update `SITE_URL` in `data/profile.ts` to the real domain.

## Structure

```
app/                  # Routes: home, /projects/[slug], sitemap, robots
components/
  sections/           # Navbar, Hero, About, TechStack, Experience,
                      # Projects, GitHubStats, Skills, Education, Contact, Footer
  motion/             # Reveal/Stagger, Typing, Counter (reduced-motion aware)
  ui/                 # Button, Card, Badge, Section primitives
  flow-diagram.tsx    # CSS architecture diagram (thay Mermaid)
  project-cover.tsx   # Cover sinh tự động khi chưa có screenshot
data/                 # ✏️ TOÀN BỘ nội dung sửa ở đây (profile, projects, skills, experience)
types/                # Shared types
public/cv/            # CV PDF (nút Download CV)
public/projects/      # Screenshot dự án (đang trống — xem TODO)
```

## TODO (cần bổ sung thủ công)

- [ ] **Screenshots**: thêm ảnh thật vào `public/projects/<slug>/` rồi khai báo
      `image` / `screenshots` trong `data/projects.ts` (hiện dùng cover sinh tự động).
- [ ] **SITE_URL** trong `data/profile.ts` — đổi thành domain thật sau khi deploy.
- [ ] **LinkedIn / Facebook** trong `data/profile.ts` (đang `null`, tự ẩn khỏi UI).
- [ ] **Contact form**: đang mở mail client (mailto). Nối Formspree/Resend/API route
      tại `components/sections/contact.tsx` nếu muốn gửi trực tiếp.
- [ ] **Certifications**: chưa có dữ liệu — khi có chứng chỉ, thêm section trong
      `components/sections/education.tsx`.
- [ ] **DPO Lab**: bổ sung số liệu định lượng (loss/win-rate) từ notebook nếu muốn.
