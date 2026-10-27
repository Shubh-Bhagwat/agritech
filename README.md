# 🌾 Agritech — Precision Agricultural Intelligence & Marketplace

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Ready%20Serverless-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![React 18](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-Glassmorphism-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%20ODM-47A248?style=for-the-badge&logo=mongodb)](https://mongodb.com)

**Agritech** is a fullstack agricultural platform combining **precision crop intelligence**, a verified **agro-inputs marketplace**, and on-demand **farm machinery rentals**. Built with a custom **Glassmorphic interface**, distinct dual typography (**Pacifico** & **Droid Serif**), and an Express.js backend optimized for **Vercel Serverless** deployment with MongoDB Atlas.

---

## 🌟 Key Features

- 🌿 **Crop Lifecycle & Advisory:** Comprehensive agronomic reference for 16+ Indian crops across **Kharif**, **Rabi**, and **Zaid** seasons with soil compatibility, water demand, and integrated pest protocols.
- 🛒 **Agro Marketplace:** Verified marketplace for hybrid seeds, organic microbial bio-fertilizers, bio-pesticides, and mechanized farming implements.
- 🚜 **On-Demand Machinery Rentals:** Schedule 50HP tractors, autonomous GPS drone foliar spraying, and rapid laboratory soil health card tests.
- 💎 **Glassmorphism Visual Identity:** Translucent frosted panels with `backdrop-filter: blur(16px)`, white borders, and an agricultural ambient emerald-to-forest gradient mesh.
- 🔴 **Reactive Red-on-Click Buttons:** Every button dynamically transitions to crimson red (`#ef4444` to `#dc2626`) with a vibrant red glow when clicked or active.
- ✍️ **Custom Typography Standard:**
  - **All Headings** (`h1`–`h6`, titles, brand marks): **Pacifico** cursive font.
  - **All Sub-writing / Body Text** (paragraphs, descriptions, inputs, buttons, tables): **Droid Serif** font.
- 🔐 **Secure Role-Based Access:** JWT authentication guarding farmer profiles, land registry, and administrative oversight.
- ⚡ **Vercel Serverless Ready:** Express backend structured as serverless functions with Mongoose connection caching.

---

## 🏗️ Architecture & Technology Stack

```
Frontend (React + Vite SPA)  ──►  Vercel Edge / Serverless  ──►  Express.js API  ──►  MongoDB Atlas
[Glassmorphism + Pacifico]        [api/index.js + Rewrites]      [Mongoose Models]     [Cloud Cluster]
```

| Layer | Technologies |
|---|---|
| **Frontend Client** | React 18, Vite 5, Tailwind CSS, Lucide Icons, Google Fonts (Pacifico & Droid Serif) |
| **Backend API** | Node.js, Express.js 4.21, Mongoose 8.7, JSON Web Tokens (JWT), Dotenv, CORS |
| **Database** | MongoDB Atlas (Cloud NoSQL database) with Mongoose ODM |
| **Deployment** | Vercel (Static CDN for Vite build + Serverless Functions for Express API) |

---

## 📁 Repository Directory Structure

```
agritech/
├── api/
│   └── index.js               # Vercel Serverless entry point
├── backend/                   # 🌿 Express.js Backend Application
│   ├── controllers/           # admin, booking, crop, farm, product, user controllers
│   ├── db/                    # config.js, crops.json, & Mongoose Schema models
│   ├── middleware/           # auth.js (JWT protect & admin authorization)
│   ├── routes/                # Modular REST API routes
│   ├── .env.example           # Template for environment variables
│   ├── package.json           # Backend dependencies
│   └── index.js               # Server entry point with serverless export
├── frontend/                  # 🎨 React + Vite Frontend Application
│   ├── src/
│   │   ├── components/        # Navbar, Hero, CropExplorer, Marketplace, Booking, AuthModal, Footer
│   │   ├── services/          # api.js client
│   │   ├── App.jsx            # Main app shell & search coordination
│   │   ├── main.jsx           # React DOM root
│   │   └── index.css          # Glassmorphic tokens, fonts & red-click styles
│   ├── index.html             # Google Fonts CDN links
│   ├── vite.config.js         # Vite configuration with proxy to port 5000
│   ├── tailwind.config.js     # Custom typography & glass theme extension
│   └── package.json           # Frontend dependencies
├── docs/                      # 📚 Project Documentation & Diagrams
│   ├── SRS.md                 # IEEE 830 Software Requirements Specification
│   ├── UML_DIAGRAMS.md        # Use Case, Class, ER, Sequence, DFD & Architecture Diagrams
│   └── API_DOCUMENTATION.md   # Complete REST API reference with payloads & status codes
├── package.json               # Root monorepo orchestration & build script
├── vercel.json                # Vercel fullstack deployment configuration
└── .gitignore                 # Excludes .env, node_modules, and build outputs
```

---

## 📚 Project Documentation

The **`docs/`** directory contains full system engineering documentation:

- 📋 [**Software Requirements Specification (SRS)**](docs/SRS.md) — Formal IEEE 830 specification covering functional, non-functional requirements, user personas, and verification matrices.
- 📐 [**UML & Architecture Diagrams**](docs/UML_DIAGRAMS.md) — Mermaid visual models:
  - System Architecture & Component Diagram
  - Use Case Diagram (Farmer, Supplier, Buyer, Admin)
  - Class Diagram (Mongoose Schemas & associations)
  - Entity-Relationship (ER) Diagram
  - Sequence Diagrams (User Authentication & Equipment Booking flows)
  - Data Flow Diagrams (DFD Level 0 & Level 1)
  - Component Deployment Diagram
- 🔌 [**REST API Documentation**](docs/API_DOCUMENTATION.md) — Comprehensive API endpoint reference with request/response samples, parameters, and error codes.

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org) (v18.0.0 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas account)
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/Shubh-Bhagwat/agritech.git
cd agritech
```

### 2. Install Dependencies
Install dependencies for root, backend, and frontend with a single command:
```bash
npm run install:all
```

### 3. Environment Configuration
Create a `.env` file inside the `backend/` directory:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/agriculture_db?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_2024
JWT_EXPIRES_IN=30d
```

### 4. Run the Application
Open two terminal windows:

```bash
# Terminal 1 — Start the Express Backend Server (Port 5000)
npm run backend

# Terminal 2 — Start the Vite Frontend Client (Port 3000)
npm run frontend
```

Open **`http://localhost:3000`** in your browser.

---

## ☁️ Deployment on Vercel

The platform is pre-configured with a root `vercel.json` for **1-Click Fullstack Deployment**:

1. Push your code to your GitHub repository.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New..."** → **"Project"**.
3. Select your repository `Shubh-Bhagwat/agritech` and leave **Root Directory** as `./`.
4. In **Environment Variables**, add:
   - `MONGO_URI`: Your MongoDB Atlas connection URI.
   - `JWT_SECRET`: A secure random secret string.
   - `NODE_ENV`: `production`
5. Click **"Deploy"**.

Vercel will compile the frontend into static assets and deploy the backend as an automated Serverless Function accessible under `/api/*`.

---

## 🛡️ Security Best Practices
- Never commit `.env` or sensitive database connection strings to version control.
- Ensure MongoDB Atlas **Network Access** includes `0.0.0.0/0` (Allow Access from Anywhere) to permit connections from Vercel's dynamic serverless IP pools.

---

## 📄 License
This project is licensed under the ISC License.
