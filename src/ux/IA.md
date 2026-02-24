# Information Architecture (IA) Spec

## Primary Navigation Groups and Routes

### Workspace
- `/dashboard` - high-level metrics, recent activity, quick actions.

### Work
- `/projects` - project list and management.
- `/projects/[id]` - project detail workspace.
- `/reviews` - review moderation and status.
- `/invoices` - invoice list and summary.
- `/invoices/new` - create invoice flow.
- `/payments` - payment events and totals.
- `/spaces` - owner list of project share spaces.

### CRM
- `/clients` - client directory and management.
- `/clients/[id]` - client detail and linked work.

### Collaboration
- `/team` - team roster and role visibility.
- `/invites/[token]` - invite accept/decline flow.
- `/v/[token]` - external share space (guest portal).

### Audit
- `/logs` - activity and audit trail.

### Preferences
- `/settings` - workspace and account settings.

### Auth and Access
- `/login` - sign in.
- `/signup` - registration and OTP verification.

### System and Fallback
- `/dev/ui` - development-only UI sandbox.
- `/401` - unauthenticated error page.
- `/403` - forbidden page.
- `/maintenance` - maintenance state.
- `/` - marketing/entry page.

## Route Conventions

- Use plural resource routes, e.g., `/projects`, `/clients`, `/invoices`.
- Dynamic resource segments use `[id]`, e.g., `/projects/[id]`.
- Tokenized access routes use `[token]`, e.g., `/invites/[token]`, `/v/[token]`.
- Marketing routes are isolated from app routes.
- Public-facing routes are namespaced under `/public/*`.

## Secondary Routes Per Feature

### Dashboard
- Summary cards by domain: projects, clients, revenue/payments, reviews.
- Recent activity stream links out to entity detail pages.
- Quick action links to create project, create client, new invoice, invite.

### Projects
- List states: all, active, completed, archived.
- Detail sections: overview, timeline/deadlines, team assignment, client linkage, payments, share-space status, review status.
- Project-level actions: edit, delete/archive, open share link controls.

### Clients
- List states: active/inactive and searchable directory.
- Detail sections: profile, linked projects, payments/invoices, communication context.
- Client-level actions: edit, invite, attach project.

### Reviews
- Moderation states: pending, approved, rejected.
- Public review view feed source: approved + consented only.
- Review actions: approve/reject, view originating project/client.

### Invoices
- List states: draft/sent/paid/overdue.
- Create flow route (`/invoices/new`) for line items, totals, and recipient.
- Invoice detail behavior should be reachable from list cards.

### Payments
- Surface project-level payment events in project detail.
- Aggregate payment totals in dashboard and invoice/client contexts.
- Void/posted event status must be visible where events are listed.

### Team and Invites
- Team route for members and project association.
- Invite accept route (`/invites/[token]`) for token status, accept, decline.
- Invite lifecycle states: pending, accepted, declined, expired.

### Logs
- Chronological stream with action, actor, target, status, timestamp.
- Filter model: action type, status, date range.

### Share Spaces
- Guest route (`/v/[token]`) sections: summary, messages, files, OTP access state.
- Guest flow: request access -> verify OTP -> interact.

## Page Layout Template Rules

## Base Shell
- Header: page title, short subtitle, and top-right primary action(s).
- Body: 12-column responsive grid; main content uses 8-9 columns on desktop.
- Right panel: 3-4 columns on desktop for context, secondary actions, and metadata.
- Mobile: collapse to single column; right panel content moves below main content.

## Header Rules
- Must include a single primary task label (verb-first), e.g., `Add Project`, `Send Invite`.
- Secondary actions (max 2) rendered as ghost/outline buttons.
- Destructive action never in primary slot.

## Body Rules
- Lists: toolbar (search/filter/sort) above content.
- Detail pages: overview block first, then tabs/sections by workflow order.
- Forms: grouped into sections with explicit labels and helper text.

## Right Panel Rules
- Only contextual information: status, ownership, timestamps, quick links.
- No critical form fields exclusively in right panel.
- Sticky on desktop for long pages; static flow on mobile.

## Empty State Rules

- Every list page must define:
  - `No data yet` state: explain value and provide one primary creation action.
  - `No results` state: indicate active filters/search and provide reset action.
- Detail pages missing linked entities must show inline placeholders (not blank blocks).
- Share-space empty states:
  - No messages: prompt first message action.
  - No files: show upload CTA + allowed formats/size guidance.

## Loading and Error State Rules

## Loading
- Use skeletons for cards/tables/forms; avoid full-page spinners except first app bootstrap.
- Preserve layout structure during loading to prevent layout shift.
- Async actions must show in-button pending state with action-specific copy (`Saving...`, `Sending...`).

## Error
- Inline field errors for validation failures.
- Section-level errors for partial fetch failures (e.g., payments panel failed but project loaded).
- Full-page error state only when critical page data fails.
- Every error state includes a clear retry action.
- Permission errors route to `/401` or `/403` based on auth/authorization status.
