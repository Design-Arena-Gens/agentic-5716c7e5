# PocketNotes

PocketNotes is a mobile‑first notes application with tagging and instant search, built with Next.js 14 and Tailwind CSS. Notes are stored locally in the browser so everything works offline by default.

## ✨ Features

- Fast capture flow for new notes with titles, rich text area, and tag support
- Smart tag suggestions and keyboard shortcuts for quick organization
- Instant search across note titles, content, and tags
- Tag filters to drill into related notes
- Local-first storage powered by Zustand + localStorage
- Responsive, touch-friendly design that feels great on mobile

## 🚀 Getting Started

```bash
npm install
npm run dev
# visit http://localhost:3000
```

### Build & Production

```bash
npm run build
npm start
```

## 🧱 Tech Stack

- [Next.js 14](https://nextjs.org/) App Router
- [React 18](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand) with persisted storage
- TypeScript end-to-end

## 📁 Structure

```
app/
  components/    # UI building blocks
  layout.tsx     # App shell + metadata
  page.tsx       # Notes experience
lib/
  store.ts       # Zustand notes store
```

## 📄 License

Released under the MIT License. Feel free to adapt and extend.
