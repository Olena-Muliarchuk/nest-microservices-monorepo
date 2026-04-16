<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">NestJS Music API — Phase 2: Microservices Architecture</h1>

<p align="center">
  An educational project evolving a production-ready REST API into a distributed microservices system.
</p>

---

This repository represents **Phase 2** of the "Zero to Hero" educational project.

After building a robust monolithic REST API, this phase focuses on evolving the application into a **Distributed Microservices Architecture** using the **Strangler Fig Pattern** — progressively extracting services from the legacy monolith without a full rewrite.

> **Phase 1 (Classic Monolith):** The foundational REST API covering basic architecture, TypeORM, JWT Auth, Swagger, and AWS S3 has been completed and archived.
> 🔗 [Phase 1: Monolith Repository](https://github.com/Olena-Muliarchuk/nestjs-mastery-roadmap)

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | NestJS, TypeScript |
| **Database** | PostgreSQL, TypeORM |
| **Auth** | JWT, Passport, BCrypt |
| **Transport** | TCP → gRPC (planned) |
| **Async Processing** | BullMQ, Redis |
| **Message Broker** | Kafka / RabbitMQ (planned) |
| **Cloud Storage** | AWS S3 / MinIO |
| **Infrastructure** | Docker Compose |

---

## 🏗 Architecture

This phase introduces a **Monorepo** structure (`apps/` and `libs/`) to manage multiple services efficiently.

- **Gateway:** API Gateway (BFF) — single HTTP/REST entry point
- **Inter-service Communication:** TCP (current) → gRPC + Message Brokers (planned)
- **Shared Contracts:** Centralized DDD contracts (`@app/contracts`) for DTOs and Interfaces
- **Async Processing:** BullMQ & Redis for heavy tasks (audio metadata extraction)

---

## 📂 Monorepo Structure

```bash
/
├── apps/
│   ├── api-gateway/        # 🌐 Single HTTP Entry Point & Auth routing
│   ├── auth-service/       # 🛡️ Pure TCP Microservice for Authentication
│   └── nest-zero-to-hero/  # 🏛️ Legacy monolith (currently being strangled)
│
├── libs/
│   └── contracts/          # 📦 Shared DTOs, Interfaces, Enums (@app/contracts)
│
├── docker-compose.yml      # Infrastructure (Postgres, Redis, MinIO)
└── package.json            # Shared dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Docker](https://www.docker.com/) & Docker Compose

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Start Infrastructure

```bash
docker-compose up -d
```

This starts: **PostgreSQL**, **Redis**, and **MinIO**.

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Application
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=nest_db

# Security (JWT)
JWT_SECRET=SuperSecretKey123!
JWT_EXPIRATION=15m
JWT_REFRESH_SECRET=SuperSecretRefreshKey!
JWT_REFRESH_EXPIRATION=7d

# Caching (Redis)
REDIS_HOST=localhost
REDIS_PORT=6379

# Cloud Storage (S3 / MinIO)
AWS_S3_REGION=us-east-1
AWS_S3_ENDPOINT=http://localhost:9000
AWS_ACCESS_KEY_ID=minioadmin
AWS_SECRET_ACCESS_KEY=minioadmin
AWS_S3_BUCKET_NAME=nest-music-uploads
```

### 4. Run Migrations & Seed

```bash
# Run database migrations
npm run migration:run

# Seed the database with dummy data (Artists & Songs)
npm run seed
```

### 5. Start the Services

```bash
# API Gateway (HTTP entry point)
npm run start:dev api-gateway

# Auth Microservice (TCP)
npm run start:dev auth-service

# Legacy Monolith
npm run start:dev nest-zero-to-hero
```

Swagger docs: `http://localhost:3000/api`

---

## 🗺 Roadmap

### ✅ Phase 1: Monolith Foundations (Completed)

All foundational blocks including Database Design, ORM, JWT/RBAC Security, Caching, Cloud Storage, and E2E Testing are implemented in the [monolith repository](https://github.com/Olena-Muliarchuk/nestjs-mastery-roadmap).

### 🟡 Phase 2: Microservices & Advanced Patterns (Current 📍)

- [x] **Monorepo Infrastructure** — Workspace (`apps/` + `libs/`), centralized contracts
- [x] **API Gateway (BFF)** — Single HTTP entry point
- [ ] **Auth Microservice (TCP)** — Extracting Authentication into a standalone TCP service
- [ ] **Strangler Fig Migration** — Progressively routing traffic away from the legacy monolith
- [ ] **Advanced Shared Modules** — Dynamic Modules (`forRootAsync`) for shared infrastructure
- [ ] **Inter-service Security** — Trust/Auth bridging between Gateway and internal services
- [ ] **Worker Isolation** — Extracting `AudioProcessor` via BullMQ into an isolated worker
- [ ] **Event-Driven Architecture** — Kafka/RabbitMQ async Pub/Sub with idempotency strategies
- [ ] **High-Performance RPC (gRPC)** — Binary communication for performance-critical services

### ⚪️ Phase 3: Enterprise Resilience & Observability (Planned)

- [ ] **Health Checks & Graceful Shutdown** — `@nestjs/terminus` readiness probes
- [ ] **Distributed Tracing** — Correlation IDs to track requests across the mesh
- [ ] **Circuit Breaker Pattern** — Preventing cascading failures
- [ ] **Distributed Transactions** — Cross-service data consistency (Saga Pattern)
- [ ] **CQRS** — Separating read/write databases

---

## 👤 Author

Built as part of an intensive **NestJS Mentorship Program** — from monolith to enterprise microservices.
