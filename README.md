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
# or
npm install
# or
yarn install
```

### 3. Run the development server

```bash
pnpm dev
# or
npm run dev
# or
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

## 🔐 Authentication & Middleware

- I implemented **middleware** to restrict access:

  - Users who are **not logged in cannot access** the `/admin` pages.
  - Users who are **already logged in cannot access** the `/login` and `/register` pages.

- For mock authentication:

  - I used a simple **constant array** of users **without any additional libraries**.
  - The get, create, and update data processes are handled via **Next.js API routes**.

- With this setup, although data persistence is not implemented, the entire application flow **mimics a real-world app**. The only limitation is:
  - On page refresh, data resets to initial state since there is no persistent storage like a database yet.
