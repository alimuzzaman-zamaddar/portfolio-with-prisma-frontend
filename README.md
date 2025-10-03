# 🌟 My Portfolio – Frontend

A modern, responsive **Portfolio Website Frontend** built with **Next.js + TypeScript + Tailwind CSS**, connected to an ExpressJS + Prisma backend.

This project allows visitors to view **blogs, projects, and about section** while giving the **portfolio owner** secure access to a dashboard for managing blogs and projects.

---

## 🚀 Live Deployment
- **Frontend URL:** [https://protfolio-frontend-prisma.vercel.app](https://protfolio-frontend-prisma.vercel.app)  
- **Backend API:** [https://portfolio-backend-omega-rust.vercel.app](https://portfolio-backend-omega-rust.vercel.app)

---

## 📹 Demo Video
> 🎥 A **10–15 minute walkthrough video** explaining all features, authentication, and CRUD operations will be submitted along with this project.

---

## 🔑 Admin Credentials
For testing the admin dashboard:

```
Email: admin@portfolio.com
Password: admin123
```

---

## 📖 Project Overview & Features
This is the **Frontend** for the full-stack Portfolio Website.

### 🔓 Public Pages
- **Home Page:** Welcoming landing page with navigation
- **About Page:** Personal bio, skills, and journey
- **Projects Showcase:** Responsive grid of projects with live/demo links
- **Blog Section:**  
  - Blogs list page (ISR enabled for fresh content)
  - Individual blog detail pages (ISR + dynamic routing)

### 🔐 Private Pages (Owner Only)
- **Authentication:** Login with JWT (via backend)
- **Dashboard:**  
  - Manage (Create, Read, Update, Delete) Blogs  
  - Manage Projects  

### 🛠️ Core Features
- Modern, responsive UI (TailwindCSS)
- **SEO-friendly & Fast**: Uses Next.js SSG/ISR
- **Rich text editor** for blog & project content
- Client-side validation with **React Hook Form + Zod**
- User notifications with **react-hot-toast**
- Fully integrated with backend APIs

---

## ⚙️ Technology Stack
**Frontend:**
- [Next.js 15](https://nextjs.org/) with App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/) for styling
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for validation
- [Axios](https://axios-http.com/) for API calls
- [React Hot Toast](https://react-hot-toast.com/) for notifications
- [Lucide-react](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/) for icons
- [Framer Motion](https://www.framer.com/motion/) for subtle animations

**Backend (for reference):**
- [Express.js](https://expressjs.com/) + [Prisma](https://www.prisma.io/)
- PostgreSQL database
- Authentication with **JWT + bcrypt**

---

## 🛠️ Setup Instructions

### 1. Clone Repositories
```bash
# Frontend
git clone <frontend-repo-url>
cd portfolio-website-frontend

# Backend
git clone <backend-repo-url>
cd portfolio-website-backend
```

### 2. Install Dependencies
Make sure you have **Node.js ≥ 18** installed.

For frontend:
```bash
cd portfolio-website-frontend
npm install
```

For backend (for reference):
```bash
cd portfolio-website-backend
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in both repos.

For **frontend**:
```
NEXT_PUBLIC_BACKEND_URL=https://portfolio-backend-omega-rust.vercel.app
```

For **backend** (example):
```
DATABASE_URL=postgresql://<your-connection-string>
JWT_SECRET=super-secret-key
PORT=5000
FRONTEND_URL=https://protfolio-frontend-prisma.vercel.app
SEED_OWNER_EMAIL=admin@portfolio.com
SEED_OWNER_PASSWORD=admin123
SEED_OWNER_NAME=Portfolio Owner
```

### 4. Run Locally
In development mode:
```bash
# Frontend
npm run dev

# Backend
npm run dev
```

Visit frontend at: `http://localhost:3000`

### 5. Build for Production
```bash
npm run build
npm start
```

---

## 🌎 Deployment
Both repos are deployed on **Vercel**:
- **Frontend:** deployed via `vercel --prod`
- **Backend:** deployed via `vercel --prod` with CORS properly configured

---

## 📂 Project Structure (Frontend)
```
src/
 ├─ app/               # Next.js App Router pages
 ├─ components/        # Reusable UI components
 ├─ lib/               # Axios/http configs, auth helpers
 ├─ styles/            # Global styles (Tailwind)
 └─ types/             # TypeScript types
```

---

## 🧪 Testing the Project
1. Open the live site at [Frontend URL](https://protfolio-frontend-prisma.vercel.app)
2. Browse **Blogs**, **Projects**, and **About**
3. Login with admin credentials
4. Test **CRUD** for blogs and projects via dashboard
5. Confirm content appears on public pages after ISR refresh

---
