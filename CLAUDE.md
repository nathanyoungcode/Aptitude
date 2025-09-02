# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `pnpm dev` (runs on http://localhost:3002)
- **Build for production**: `pnpm build`
- **Start production server**: `pnpm start`
- **Lint code**: `pnpm lint` (ESLint check) or `pnpm lint:fix` (auto-fix issues)
- **Format code**: `pnpm format` (Prettier write) or `pnpm format:check` (check formatting)
- **Type checking**: `pnpm type-check` (TypeScript compilation check)
- **Quality check**: `pnpm quality` (runs type-check, lint, and format:check)
- **Database operations**: 
  - `pnpm db:push` (push schema changes to dev DB)
  - `pnpm db:migrate` (create and run migrations)
  - `pnpm db:generate` (generate Prisma client)

## Architecture Overview 

This is a **Next.js 15 App Router** project with the following key components:

### Core Stack
- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js + custom JWT fallback system
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Query for server state
- **Animations**: Lenis for smooth scrolling
- **Rate Limiting**: Upstash Redis

### Application Structure

**Route Organization**:
- `src/app/` - App Router pages and API routes
- `src/app/(app)/` - Main application pages (chat, dashboard) with shared layout
- `src/app/auth/` - Authentication pages (signin)
- `src/app/api/` - API routes (auth, chat, conversations, analytics, user)

**Component Architecture**:
- `src/components/layout/` - Layout components (AppShell, Sidebar, Topbar)
- `src/components/ui/` - shadcn/ui component library
- `src/components/` - Shared components (CommandK, Providers)

**Core Services**:
- `src/lib/auth.ts` - Hybrid authentication (NextAuth + JWT)
- `src/lib/api.ts` - API utilities
- `src/lib/ratelimit.ts` - Rate limiting configuration
- `src/lib/queryClient.ts` - React Query setup

### Authentication System
The app uses a **hybrid authentication approach**:
1. **Primary**: NextAuth.js with database sessions
2. **Fallback**: JWT token authentication
3. Session lookup tries NextAuth session cookies first, then falls back to JWT tokens

### Database Schema (Prisma)
Key models:
- **User** - Core user data with NextAuth.js integration
- **Account/Session** - NextAuth.js authentication tables
- **Conversation/Message** - Chat system with user relationships
- **MessageRole** enum - USER, ASSISTANT, SYSTEM

### Layout System
- **Root Layout**: Global styles and fonts (Geist Sans/Mono)
- **App Layout**: Wraps authenticated routes with Providers + AppShell
- **AppShell**: Main layout with Sidebar + Topbar + content area

The application appears to be a **chat/conversation platform** with user authentication, real-time messaging, and dashboard functionality.

## Design Review & Quality Standards

### Design Standards Reference
Two complementary files guide all design decisions:

**Strategic Philosophy** (`context/design-principals.md`):
- **Conversational Partnership**: Our singular vision of transparent collaboration between human and AI
- **Friction Obsession**: Eliminate interaction, cognitive, and workflow friction at all layers
- **Strategic Trade-offs**: Optimized speed with thoughtful flexibility (following Linear's approach)
- **Trust Through Transparency**: Make AI processes visible and understandable (following Anthropic's model)
- **Purposeful Minimalism**: Strategic "less but better" approach for better conversations

**Implementation Guide** (`context/style-guide.md`):
- Design tokens (colors, typography, spacing, border radius)
- Component specifications (chat messages, inputs, buttons)
- Layout patterns (app shell, chat thread)
- Interactive states and animations
- Accessibility requirements (WCAG 2.1 AA)
- Responsive breakpoints and performance guidelines

### Chat Application UX Guidelines

**Message Interface:**
- Clear visual distinction between user/assistant messages
- Smooth streaming with typing/thinking indicators  
- Transparent AI reasoning when possible
- Message actions: copy, edit, delete, regenerate
- Error recovery with retry options

**Navigation & Layout:**
- Sidebar: Conversation history with search
- Main area: Chat thread with proper message hierarchy
- Top bar: User profile, settings, theme toggle
- Keyboard shortcuts: Ctrl+Enter (send), Shift+Enter (new line)
- Command palette: /command patterns for special functions

**Trust & Safety:**
- Transparent system state communication
- Clear error messages with actionable solutions
- Privacy-first data handling with user control
- Consistent interaction patterns across all features

### Visual Development

#### Design Principles
- Comprehensive design checklist in `/context/design-principles.md`
- Brand style guide in `/context/style-guide.md`
- When making visual (front-end, UI/UX) changes, always refer to these files for guidance

#### Quick Visual Check
IMMEDIATELY after implementing any front-end change:
1. **Identify what changed** - Review the modified components/pages
2. **Navigate to affected pages** - Use `mcp__playwright__browser_navigate` to visit each changed view
3. **Verify design compliance** - Compare against `/context/design-principles.md` and `/context/style-guide.md`
4. **Validate feature implementation** - Ensure the change fulfills the user's specific request
5. **Check acceptance criteria** - Review any provided context files or requirements
6. **Capture evidence** - Take full page screenshot at desktop viewport (1440px) of each changed view
7. **Check for errors** - Run `mcp__playwright__browser_console_messages`

This verification ensures changes meet design standards and user requirements.

### Comprehensive Design Review
Invoke the `@agent-design-review` subagent for thorough design validation when:
- Completing significant UI/UX changes
- Before finalizing PRs with visual changes
- Needing comprehensive design standards review