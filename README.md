# Vortex Server

Backend API for Vortex, a developer-first freelance workspace. This service handles authentication, project/client management, invites, activity logs, and transactional email (OTP + invites). It uses Express + MongoDB with JWT cookie auth and Zod validation.

This README reflects the current codebase under `src/` and maps the runtime behavior to the actual routes, models, and middleware in this repository.

---

## What This Server Does

Vortex Server provides:
- **Auth**: email + password, OTP verification, login/logout, profile retrieval.
- **Projects**: create and list projects owned by the authenticated user.
- **Clients**: create and list clients owned by the authenticated user.
- **Invites**: send invites (client/team) via email.
- **Activity Logs**: persist and retrieve audit logs per user.

---

## Tech Stack

- **Runtime**: Node.js + Express (TypeScript)
- **Database**: MongoDB via Mongoose
- **Auth**: JWT (HTTP-only cookie)
- **Validation**: Zod
- **Email**: Nodemailer (Gmail SMTP)
- **Security/ops**: Helmet, CORS, Morgan, dotenv

---

## Project Structure

```
src/
  server.ts                 Express app bootstrap
  config/db.ts              MongoDB connection
  routes/                   HTTP routes (auth, project, client, invite, logs)
  controller/               Request handlers + business logic
  middleware/               Auth and response helpers
  models/                   Mongoose schemas
  types/                    Zod schemas + TS types
  utils/sendEmail.ts        Nodemailer helpers
  validators/               Zod validators for input payloads
```

---

## Server Lifecycle

`src/server.ts` bootstraps:
- Loads environment variables
- Connects to MongoDB
- Applies middleware (cookie-parser, JSON, CORS, Helmet)
- Registers API routes
- Starts the HTTP server

Routes are mounted under `/api/*`:
- `/api/auth`
- `/api/project`
- `/api/client`
- `/api/users`
- `/api/logs`

---

## Authentication Flow

### OTP
1. `POST /api/auth/send-otp`  
   - Generates a 6-digit OTP
   - Stores it in `Otp` collection with 10-minute expiry
   - Sends OTP via `sendOtp()` (Nodemailer)

2. `POST /api/auth/verify-otp`  
   - Validates OTP and sets `verified` = true

### Register
`POST /api/auth/register`:
- Validates payload via Zod schema (`registerSchema`)
- Creates user with hashed password
- Logs activity
- Returns user + JWT token

### Login
`POST /api/auth/login`:
- Validates payload via `loginSchema`
- Compares password (bcrypt)
- Sets JWT token cookie
- Logs activity
- Returns sanitized user object

### Logout
`POST /api/auth/logout`:
- Clears token cookie

### Profile
`GET /api/auth/profile`:
- Returns current user profile from DB

---

## API Routes (Current)

### Auth
```
POST /api/auth/send-otp
POST /api/auth/verify-otp
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout   (protected)
GET  /api/auth/profile  (protected)
```

### Projects
```
POST /api/project/create  (protected)
GET  /api/project/list    (protected)
```

### Clients
```
POST /api/client/create  (protected)
GET  /api/client/list    (protected)
```

### Invites
```
POST /api/users/invite   (protected)
```

### Logs
```
GET /api/logs            (protected, returns user-specific logs)
```

---

## Response Format

All responses are normalized via `sendSuccess` and `sendError`:

```json
{
  "success": true,
  "message": "Message here",
  "data": { ... }
}
```

Error response:
```json
{
  "success": false,
  "message": "Error message",
  "errors": { ... } // optional
}
```

---

## Models (MongoDB)

### User
Fields: email, name, password, role, phone, country, verification flags, profile linkage.  
Default role is `"Admin"`.

### Project
Fields: title, description, status, client, budget, deadline, createdBy, assignedTo, techStack, etc.

### Client
Fields: name, email, phone, company, status, projects, createdBy, assignedTo.

### Invite
Fields: name, email, type (Client|Team), role, projectId(s), invitedBy, accepted.

### LogEntry
Fields: action, actor, target, details, status, timestamp.

### Otp
Fields: email, otp, expiresAt, verified.

### Review
Fields: clientId, projectId, rating, comment, status, featured.

### TeamMember
Fields: name, email, role, projects, status.

---

## Logging & Auditing

`logActivity()` persists activity logs into `LogEntry`:
- Used during registration, login attempts, project/client creation, and invites.
- `GET /api/logs` returns the most recent user logs.

---

## Email Utilities

`src/utils/sendEmail.ts` uses Nodemailer with Gmail SMTP:
- `sendInviteEmail()` for team/client invites
- `sendOtp()` for OTP verification

Both require `EMAIL_USER` + `EMAIL_PASS` in the environment.

---

## Environment Variables

The server expects these variables:
- `PORT`: HTTP port (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `CLIENT_URL`: allowed CORS origin
- `JWT_SECRET`: secret for signing JWTs
- `JWT_EXPIRES_IN`: token lifetime (default: `1d`)
- `EMAIL_USER`: SMTP username
- `EMAIL_PASS`: SMTP password/app password
- `NODE_ENV`: `development` or `production`

---

## Scripts

```bash
yarn dev    # ts-node-dev with hot reload
yarn build  # compile TS to dist/
yarn start  # run compiled server
```

---

## Notes / Current Gaps

- Invite persistence exists in the schema (`Invite`) but currently only sends email; invites are not saved to DB.
- Reviews are modeled but no review routes/controllers are implemented yet.
- Some console logging prints environment values; consider removing before production.
- `routes.ts` appears empty and unused.

---

## Quick Start (Local)

```bash
yarn install
yarn dev
```

Make sure your `.env` is configured and MongoDB is reachable.

---

## License

MIT
