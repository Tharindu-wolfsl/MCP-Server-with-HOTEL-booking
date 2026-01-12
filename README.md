# 🏨 AI‑Ready Hotel Booking Platform (Next.js + MCP)

A **simple, modern hotel booking web application** built with **Next.js, TypeScript, MCP (Model Context Protocol)** and **Tailwind + shadcn/ui**.

This project demonstrates how to build a **hybrid REST + MCP architecture** where:
- Traditional web users use REST APIs
- AI agents (ChatGPT, mobile AI agents) interact via MCP
- Both share the **same business logic**

---

## ✨ Features

- ✅ Next.js App Router (TypeScript, strict mode)
- 🏨 Hotel listing & booking (basic demo)
- 🤖 Built‑in MCP server (same project)
- 🔐 Role‑based MCP tools (USER / ADMIN)
- 🌍 Hybrid REST + MCP APIs
- 🎨 Tailwind CSS + shadcn/ui components
- 📱 Ready for mobile AI agent integration

---

## 🧱 Architecture Overview

```
Web UI / Mobile App
        ↓
     REST API
        ↓
  Shared Services  ←→  MCP Server  ←→  AI Agents
        ↓
     Data Layer
```

> MCP tools directly call internal services (no REST‑to‑REST calls).

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── bookings/route.ts   # REST API
│   │   └── mcp/route.ts        # MCP HTTP bridge
│   ├── hotels/page.tsx         # UI
│
├── mcp/
│   ├── server.ts               # MCP server
│   ├── tools.ts                # MCP tools
│   └── types.ts                # MCP request/response types
│
├── services/
│   ├── hotel.service.ts
│   └── booking.service.ts
│
├── types/
│   └── index.ts                # Domain types
│
├── lib/
│   └── jwt.ts                  # JWT utilities
```

---

## 🚀 Getting Started

### 1️⃣ Prerequisites

- Node.js 18+
- npm / pnpm

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Run Development Server

```bash
npm run dev
```

Open:
```
http://localhost:3000
```

---

## 🔌 MCP Usage

### MCP Endpoint

```
POST /api/mcp
```

### Example MCP Request

```json
{
  "method": "search_hotels",
  "params": { "location": "Galle" },
  "id": 1
}
```

### Example Response

```json
{
  "result": [
    {
      "id": "1",
      "name": "Sea View Hotel",
      "location": "Galle",
      "pricePerNight": 12000
    }
  ],
  "id": 1
}
```

---

## 🔐 Role‑Based MCP Tools

- `search_hotels` → Public
- `create_booking` → USER only

Authorization is enforced **inside MCP tools**, not at the API layer.

---

## 🎨 UI Stack

- **Tailwind CSS** – Utility‑first styling
- **shadcn/ui** – Accessible UI components
- Fully customizable and production‑ready

---

## 🧠 Why MCP?

- No duplicated APIs
- AI agents safely call business logic
- One backend for web, mobile & AI
- Fine‑grained permission control

---

## 🛣️ Roadmap

- ⏳ PostgreSQL + Prisma
- 🔐 JWT auth middleware for MCP
- 💳 Payment integration
- 📊 Admin dashboard
- 🐳 Docker & production deployment

---

## 📌 Tech Stack

- Next.js (App Router)
- TypeScript
- Model Context Protocol (MCP)
- Tailwind CSS
- shadcn/ui
- Zod

---

## 📄 License

MIT License

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## ⭐️ Support

If this project helps you, consider giving it a ⭐️ on GitHub.

