# Spectrum.Life Assessment

## Project Structure
```
client/           # React + TypeScript frontend
server/           # Node.js + Express + TypeScript backend
```

## Quick Start

### Prerequisites
- Node.js v22.14.0
- Docker and Docker compose
- Git
- yarn (optional if using npm)
  This project supports both **yarn** and **npm**, choose one and use it consistently for both frontend and backend


### Setup instruction
1. **clone the repository**
```bash
   git clone
   cd spectrum-life
```
2. **Start the database**
```bash
   cd server
   docker compose up -d
```
3. **Setup backend (choose npm or yarn)**
```bash
   cd server
   npm install
   cp .env.example .env 
   # update .env with db credentials
   npm run prisma:generate
   npm run prisma:migrate
   npm run dev
```
```bash
   cd server
   yarn install
   cp .env.example .env 
   # update .env with db credentials
   yarn prisma:generate
   yarn prisma:migrate
   yarn dev
```
backend runs on: `http://localhost:3000`

4. **Setup frontend (choose npm or yarn)**
```bash
   cd client
   npm install
   npm run dev
```
```bash
   cd client
   yarn install
   yarn dev
```
frontend runs on: `http://localhost:5173`

5. **Backend test**
```bash
   cd server
   npm test
   npm run test:coverage
```
```bash
   cd server
   yarn test
   yarn test:coverage
```

6. **frontend tests**
```bash
   cd client
   npm test
   npm run test:coverage
```
```bash
   cd client
   yarn test
   yarn test:coverage
```

## Docker Commands

**Start database:**
```bash
   cd server
   docker compose up -d
```

**Stop database:**
```bash
   docker compose down
```

**View logs:**
```bash
   docker compose logs -f postgres
```

**Reset database (deletes all data):**
```bash
   docker compose down -v
```

## Architecture

### Frontend (`/client`)

**Tech Stack:**
- React 19 with TypeScript
- Redux Toolkit for state management
- React Hook Form + Zod for form validation
- Styled Components with design tokens
- React Router for navigation
- Vite as build tool

**Project Structure:**
```
client/src/
    app/                        # Redux store config
    components/                 # Reusable components
        forms/                  # Form components (GPContactForm)
        layout/                 # Layout components (Header, Footer, Layout)
        ui/                     # UI components (Button, Input, Alert, Loading, SearchBar, Toggle)
    features/                   # Feature-based modules (booking slice)
    pages/                      # Page components
        Home/                   # Home page 
        Services/               # Services page
        GPContactDetails/       # GP contact form page
        BookingConfirmation/    # Confirmation page
    theme/                      # Design tokens (colors, spacing, typography, breakpoints)
    types/                      # TypeScript types
    App.tsx                     # Main app with routing
    GlobalStyles.ts             # Global CSS styles
    main.tsx                    # App entry point
    __tests__/                  # Unit & integration tests
```

### Backend (`/server`)

**Tech Stack:**
- Node.js + Express + TypeScript
- PostgreSQL 16 (via Docker)
- Prisma ORM 7
- Zod for validation
- Jest + Supertest for testing

**Project Structure:**
```
server/src/
    config/             # Database config
    controllers/        # Request handlers
    routes/             # API routes
    validators/         # Zod schemas
    middleware/         # Error handling
    types/                      # TypeScript types
    utils/              # Helper functions
    __tests__/          # Unit & integration tests
    app.ts              # Express app setup
    server.ts           # Server entry point
```

## Deployment

### frontend

**Build:**
```bash
   cd client
   npm run build  # or yarn build
```

**Deploy to:**
- Vercel / Netlify
- Upload `dist/` folder to any static hosting

**Environment Variable:**
```env
VITE_API_BASE_URL=https://your-api-domain.com/api/v1
```

### Backend

**Requirements:**
- Node.js 22.14.0
- PostgreSQL database

**Deploy to:**
- Railway / AWS / Heroku 

**Environment Variable:**
```bash
DATABASE_URL="postgresql://user:password@host:5432/database"
NODE_ENV=production
```