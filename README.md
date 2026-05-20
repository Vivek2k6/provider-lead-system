# Provider Lead System

A premium Next.js 16 + Prisma 7 application featuring a concurrency-safe, round-robin lead allocation algorithm with real-time operational dashboard monitoring.

## System Prerequisites
* Node.js v18+
* PostgreSQL Database Instance (Local or Docker container)

## Setup & Deployment Instructions

1. Initialize Configuration
Create a `.env` file in the root directory and append your database connection link:
```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/provider_lead_db?schema=public"


2. Install Engine Dependencies
Bash
npm install


3. Sync Database Schemas & Types
Deploy the schema layouts and compile the Prisma client types locally:
Bash
npx prisma db push
npx prisma generate


4. Seed Mock Provider Data (Optional)
Populate the database container with the initial 8 provider slots:
Bash
npx prisma db seed


5. Launch Application Server
Boot up the development execution space:
Bash
npm run dev


Active Portals
Customer Intake Workspace: http://localhost:3000/request-service
Command Center Dashboard: http://localhost:3000/dashboard