# Vortex Client Management System

A professional, scalable client and project management system for developers and service-based teams. Built with the goal of simplifying project tracking, client collaboration (via Vortex spaces), review collection, and showcasing projects through an external API-ready portfolio.

---

## Tech Stack

* **Framework:** Next.js 14+ (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4
* **State Management:** Zustand (Context also considered)
* **Forms & Validation:** React Hook Form + Zod + @hookform/resolvers
* **UI Components:** Tailwind Variants + Class Variance Authority + Radix UI (Dialog, Toast, Tabs)
* **Icons:** Lucide React
* **Animation:** Framer Motion
* **API Handling:** Axios
* **Date Utilities:** date-fns
* **Helpers:** uuid, clsx

---

## Project Structure

```bash
src/
├── app/                 # Routes for pages (App Router)
│   ├── dashboard/
│   ├── projects/
│   ├── vortex/
│   ├── clients/
│   ├── team/
│   ├── logs/
│   ├── settings/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/          # Reusable components
│   ├── ui/              # Low-level primitives (Button, Input)
│   ├── elements/        # Mid-level: ProjectCard, ReviewItem
│   └── shared/          # Navbar, Sidebar, Layout
│
├── container/           # Feature-level logic-aware containers
│   └── DashboardStats.tsx
│
├── context/             # React context for auth, theme, vortex
│   └── AuthContext.tsx
│
├── store/               # Zustand stores for global state
│   └── useSidebar.ts
│
├── hooks/               # Custom React hooks
│   ├── useDarkMode.ts
│   └── useAuth.ts
│
├── forms/               # Form components with validation
│   └── CreateProjectForm.tsx
│
├── data/                # Mock/dummy data during dev
│   ├── projects.ts
│   ├── clients.ts
│   ├── reviews.ts
│   └── logs.ts
│
├── endpoints/           # API endpoint constants
│   └── index.ts
│
├── api/                 # Frontend-side API calls
│   ├── projects.ts
│   ├── clients.ts
│   └── reviews.ts
│
├── types/               # TypeScript interfaces and shared types
│   ├── project.ts
│   ├── client.ts
│   └── vortex.ts
│
├── constants/           # Routes, roles, status enums
│   └── index.ts
│
├── lib/                 # Utility functions, helpers
│   ├── formatDate.ts
│   └── api.ts
│
├── layouts/             # Higher-order layout wrappers
│   └── DashboardLayout.tsx
│
├── styles/              # Tailwind config + global styles
│   └── globals.css
│
└── middleware.ts        # Auth/session middleware (future)
```

---

## Features (Core Scope)

### Developer Dashboard

* Total revenue (monthly/yearly)
* Active and completed jobs count
* Latest activity logs
* Recent comments and feedback

### Projects

* View, edit, and manage all projects
* Filter by status, client, timeline
* Access individual Vortex spaces

### Vortex (Client Workspace)

* Secure space for project-specific collaboration
* Clients can view dev links, leave comments, and give reviews
* Developers can respond, mark resolved, and manage lifecycle

### Clients

* List all clients with metadata
* View client profiles: contact, projects, review history

### Reviews

* Collect and manage feedback from clients
* Approve, reject, or feature reviews
* Analytics view of ratings

### Logs

* Track who did what and when
* Includes comments, logins, edits, uploads

### Team

* Invite, assign roles, and monitor team members

### Settings

* Business info
* Profile settings
* API key management
* Future: billing, theme settings

---

## Authentication (Planned)

* Secure client invite via magic link
* Role-based access control (RBAC)
* Developer vs client vs team member permissions

---

## Theme

**Chosen Palette: Industrial Dark**

| Role       | Color Name      | Hex     |
| ---------- | --------------- | ------- |
| Background | Matte Black     | #121212 |
| Surface    | Iron Gray       | #1E1E1E |
| Accent     | Chrome Blue     | #4A90E2 |
| Highlight  | Tungsten Silver | #777777 |
| Text       | Platinum White  | #F5F5F5 |

---

## Installation

```bash
git clone https://github.com/yourname/vortex-dashboard.git
cd vortex-dashboard
yarn install
yarn dev
```

---

## Getting Started

Start the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## Development Practices

* Use dummy data in `/data/` for testing UI
* Abstract all fetch logic in `/api/`
* Never hardcode endpoints — import from `/endpoints/`
* Reuse layout from `/components/shared/Layout.tsx` or `/layouts/DashboardLayout.tsx`
* Keep all hooks in `/hooks/`
* Store constants and enums in `/constants/`
* Maintain shared types in `/types/`
* Organize form logic and validation in `/forms/`
* Use Zustand or Context API from `/store/` and `/context/`
* Keep helper functions inside `/lib/`
* Use `tailwind-variants` for consistent UI theming
* Animate with Framer Motion for interactivity
* Use `lucide-react` for modern, accessible icons

---

## Next Steps

* [ ] Add Zustand for global state
* [ ] Add `useDarkMode` toggle
* [ ] Integrate real backend or Supabase/Prisma
* [ ] Setup protected routes with middleware

---

## Contribution & Maintenance

* Keep folders modular and small
* Update this README when adding new features
* Maintain consistent naming
* Use the `/endpoints` folder to avoid hardcoding URLs
* Document all shared hooks and utilities

---

## License

This project is private and built by West for internal or licensed use only.

---

*This README will be updated as new features are added.*
