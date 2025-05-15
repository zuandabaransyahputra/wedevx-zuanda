# 🛠️ Zuanda Assessmen wedevX

## 🔗 Live Demo (Vercel)

- **Live URL**: [https://wedevx-zuanda.vercel.app](https://wedevx-zuanda.vercel.app)
- **Admin Credentials**:
  - **Email**: `admin@mail.com`
  - **Password**: `admin1234`

---

## 📂 Public GitHub Repository

[https://github.com/zuandabaransyahputra/wedevx-zuanda](https://github.com/zuandabaransyahputra/wedevx-zuanda)

---

## 🚀 Setup Guide (Local Development)

### 1. Clone the repository

```bash
git clone https://github.com/zuandabaransyahputra/wedevx-zuanda.git
cd wedevx-zuanda
```

### 2. Install dependencies

```bash
pnpm install
# atau
npm install
# atau
yarn install
```

### 3. Run the development server

```bash
pnpm dev
# atau
npm run dev
# atau
yarn dev
```

### 4. Running in browser

```
http://localhost:3000
```

---

## 📐 Design & Architecture Document

### Tech Stack

- **Framework**: Next.js (App Router)
- **UI Library**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Form**: react-hook-form + zod
- **Auth (Mock)**: Manual login with frontend credentials + Zustand user store

---

### Design Considerations

- ✅ Responsive layout using Tailwind’s utility classes
- ✅ Protected routes via Zustand login state
- ✅ Form validation using Zod for strong type inference
- ✅ Modular file structure with reusable components
- ✅ Simple, clean, and maintainable codebase
