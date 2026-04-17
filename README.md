# 🌱 Interactive Urban Farming Platform

[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7.x-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Better Auth](https://img.shields.io/badge/Better--Auth-1.6-orange?style=for-the-badge)](https://www.better-auth.com/)

An advanced, feature-rich backend infrastructure for an **Interactive Urban Farming Platform**. This platform connects urban dwellers with farming opportunities, providing tools for garden space rentals, a professional produce marketplace, real-time plant tracking, and community engagement.

---

## 🚀 Key Features

### 🏢 Garden Space Rental
- **Search & Book**: Flexible rental of urban garden plots based on location, size, and amenities.
- **Management**: Vendors can list and manage their available farming spaces with detailed specifications.

### 🥦 Produce Marketplace
- **Direct-to-Consumer**: A robust marketplace for urban farmers (vendors) to sell fresh produce.
- **Order Management**: Comprehensive checkout and order tracking system.

### 🪴 Real-time Plant Tracking
- **Growth Monitoring**: Track the lifecycle of plants from seed to harvest.
- **Data Insights**: Maintain health logs and growth metrics for individual plants.

### 🤝 Community & Forum
- **Engagement**: Interactive forum for urban farmers to share tips, experiences, and advice.
- **Categorized Discussions**: Organize posts into relevant farming topics.

### 🛡️ Sustainability Verification
- **Certifications**: Verification system for sustainable farming practices to ensure high-quality urban produce.
- **Trust**: Tiered sustainability badges for vendors.

---

## 🛠️ Tech Stack

- **Framework**: [Express.js](https://expressjs.com/) (v5.2.1)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/) (v7.7.0) with Schema Separation
- **Authentication**: [Better Auth](https://www.better-auth.com/) & JWT
- **Validation**: [Zod](https://zod.dev/)
- **Security**: 
  - [Helmet](https://helmetjs.github.io/) (HTTP headers)
  - [Express Rate Limit](https://www.npmjs.com/package/express-rate-limit) (DoS protection)
  - [Bcryptjs](https://www.npmjs.com/package/bcryptjs) (Password hashing)
- **API Documentation**: [Swagger](https://swagger.io/) (Ready)

---

## 📁 Project Structure

```bash
├── prisma              # Database configuration & multi-file schemas
│   └── schema          # Modular Prisma schema files
├── src
│   ├── app
│   │   ├── config      # Environment variables & constants
│   │   ├── lib         # Shared libraries (Prisma, Auth)
│   │   ├── middleware  # Global middlewares (Auth, Errors)
│   │   ├── modules     # Feature-based business logic (Produce, Rental, etc.)
│   │   └── routes      # Global API routing
│   ├── app.ts          # Express application initialization
│   └── server.ts       # Server entry point
└── .env                # Environment configuration
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [PostgreSQL](https://www.postgresql.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd urban-farming-platform
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory and configure following:
   ```env
   PORT=5000
   DATABASE_URL="postgresql://user:password@localhost:5432/farming_db"
   BETTER_AUTH_SECRET="your-secret-key"
   FRONTEND_URL="http://localhost:3000"
   ```

4. **Database Migration**:
   ```bash
   npx prisma migrate dev
   ```

5. **Seed Initial Data** (Optional):
   ```bash
   npm run seed:admin
   ```

### Running the Application

- **Development Mode**:
  ```bash
  npm run dev
  ```
  The server will be available at `http://localhost:5000/api/v1`

---

## 📜 API Documentation

The project is configured with **Swagger**. You can access the interactive API exploration at:
`http://localhost:5000/api-docs` (Coming Soon)

---

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git checkout -b feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the ISC License. See `LICENSE` for more information.

---

<p align="center">
  Developed with ❤️ by the Urban Farming Team
</p>
