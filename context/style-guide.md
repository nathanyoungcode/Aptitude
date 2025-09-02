# Chat Application Style Guide

*Tactical implementation guide for design principles. For strategic philosophy, see `/context/design-principals.md`.*

---

## I. Design Tokens

### Color System

#### Primary Palette
```css
/* Brand Colors */
--primary-500: #2563eb;     /* Primary blue - CTA buttons, links */
--primary-600: #1d4ed8;     /* Primary hover state */
--primary-700: #1e40af;     /* Primary active state */

/* Neutrals - Light Theme */
--gray-50:  #f9fafb;        /* Subtle backgrounds */
--gray-100: #f3f4f6;        /* Card backgrounds */
--gray-200: #e5e7eb;        /* Borders, dividers */
--gray-300: #d1d5db;        /* Disabled states */
--gray-400: #9ca3af;        /* Placeholders, secondary text */
--gray-500: #6b7280;        /* Body text secondary */
--gray-700: #374151;        /* Body text primary */
--gray-900: #111827;        /* Headings, high emphasis */

/* Neutrals - Dark Theme */
--dark-gray-50:  #18181b;   /* App background */
--dark-gray-100: #27272a;   /* Card backgrounds */
--dark-gray-200: #3f3f46;   /* Borders, dividers */
--dark-gray-300: #52525b;   /* Disabled states */
--dark-gray-400: #71717a;   /* Placeholders, secondary text */
--dark-gray-500: #a1a1aa;   /* Body text secondary */
--dark-gray-700: #e4e4e7;   /* Body text primary */
--dark-gray-900: #fafafa;   /* Headings, high emphasis */
```

#### Semantic Colors
```css
/* Success */
--success-500: #10b981;     /* Success states, positive feedback */
--success-600: #059669;     /* Success hover */

/* Error/Destructive */
--error-500: #ef4444;       /* Error states, destructive actions */
--error-600: #dc2626;       /* Error hover */

/* Warning */
--warning-500: #f59e0b;     /* Warning states, caution */
--warning-600: #d97706;     /* Warning hover */

/* Info */
--info-500: #3b82f6;        /* Informational states */
--info-600: #2563eb;        /* Info hover */
```

### Typography Scale

#### Font Families
```css
/* Primary: Geist Sans - UI text, body content */
--font-sans: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace: Geist Mono - Code, technical content */
--font-mono: 'Geist Mono', 'SF Mono', 'Monaco', 'Inconsolata', monospace;
```

#### Type Scale & Usage
```css
/* Display - Marketing headers, large emphasis */
--text-4xl: 2.25rem;        /* 36px, line-height: 1.1 */
--text-3xl: 1.875rem;       /* 30px, line-height: 1.2 */

/* Headings - Section titles, important content */
--text-2xl: 1.5rem;         /* 24px, line-height: 1.3 */
--text-xl:  1.25rem;        /* 20px, line-height: 1.4 */
--text-lg:  1.125rem;       /* 18px, line-height: 1.5 */

/* Body - Default text, chat messages */
--text-base: 1rem;          /* 16px, line-height: 1.5 */
--text-sm:   0.875rem;      /* 14px, line-height: 1.4 */
--text-xs:   0.75rem;       /* 12px, line-height: 1.3 */

/* Font Weights */
--font-normal:    400;      /* Regular body text */
--font-medium:    500;      /* Emphasis, labels */
--font-semibold:  600;      /* Headings, important UI */
--font-bold:      700;      /* Strong emphasis */
```

### Spacing System
```css
/* Base unit: 4px (0.25rem) */
--space-1:  0.25rem;        /* 4px  - Tight spacing */
--space-2:  0.5rem;         /* 8px  - Small gaps */
--space-3:  0.75rem;        /* 12px - Compact elements */
--space-4:  1rem;           /* 16px - Standard spacing */
--space-5:  1.25rem;        /* 20px - Comfortable gaps */
--space-6:  1.5rem;         /* 24px - Section spacing */
--space-8:  2rem;           /* 32px - Large gaps */
--space-10: 2.5rem;         /* 40px - Major sections */
--space-12: 3rem;           /* 48px - Layout spacing */
--space-16: 4rem;           /* 64px - Page sections */
```

### Border Radius
```css
--radius-sm: 0.25rem;       /* 4px  - Small elements, badges */
--radius-md: 0.375rem;      /* 6px  - Buttons, inputs */
--radius-lg: 0.5rem;        /* 8px  - Cards, modals */
--radius-xl: 0.75rem;       /* 12px - Large containers */
--radius-full: 9999px;      /* Circular elements, avatars */
```

---

## II. Component Specifications

### Chat Messages

#### User Messages
```css
/* Container */
.message-user {
  background: var(--primary-500);
  color: white;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg) var(--radius-lg) var(--radius-sm) var(--radius-lg);
  max-width: 70%;
  margin-left: auto;
  margin-bottom: var(--space-3);
}

/* Typography */
.message-user-text {
  font-size: var(--text-base);
  line-height: 1.5;
  font-weight: var(--font-normal);
}
```

#### Assistant Messages
```css
/* Container */
.message-assistant {
  background: var(--gray-100);
  color: var(--gray-900);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg) var(--radius-lg) var(--radius-lg) var(--radius-sm);
  max-width: 70%;
  margin-right: auto;
  margin-bottom: var(--space-3);
}

/* Dark theme variant */
.dark .message-assistant {
  background: var(--dark-gray-100);
  color: var(--dark-gray-900);
}

/* Typography */
.message-assistant-text {
  font-size: var(--text-base);
  line-height: 1.5;
  font-weight: var(--font-normal);
}
```

#### System Messages
```css
.message-system {
  background: var(--gray-50);
  color: var(--gray-600);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  text-align: center;
  margin: var(--space-4) 0;
  border-left: 2px solid var(--gray-200);
}
```

### Input Components

#### Chat Input Field
```css
.chat-input {
  min-height: 44px;           /* Touch target size */
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  font-family: var(--font-sans);
  background: white;
  resize: vertical;
  max-height: 200px;
}

/* Focus state */
.chat-input:focus {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
  border-color: var(--primary-500);
}

/* Dark theme */
.dark .chat-input {
  background: var(--dark-gray-100);
  border-color: var(--dark-gray-200);
  color: var(--dark-gray-900);
}
```

### Button Components

#### Primary Button
```css
.btn-primary {
  background: var(--primary-500);
  color: white;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  border: none;
  min-height: 36px;
  cursor: pointer;
  transition: all 150ms ease-in-out;
}

/* Hover state */
.btn-primary:hover {
  background: var(--primary-600);
  transform: translateY(-1px);
}

/* Active state */
.btn-primary:active {
  background: var(--primary-700);
  transform: translateY(0);
}

/* Focus state */
.btn-primary:focus {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* Disabled state */
.btn-primary:disabled {
  background: var(--gray-300);
  color: var(--gray-500);
  cursor: not-allowed;
  transform: none;
}
```

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: var(--gray-700);
  border: 1px solid var(--gray-200);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  min-height: 36px;
  cursor: pointer;
  transition: all 150ms ease-in-out;
}

.btn-secondary:hover {
  background: var(--gray-50);
  border-color: var(--gray-300);
}
```

---

## III. Layout Patterns

### App Shell Layout
```css
.app-shell {
  display: grid;
  grid-template-columns: 280px 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas: 
    "sidebar topbar"
    "sidebar main";
  height: 100vh;
}

.sidebar {
  grid-area: sidebar;
  background: var(--gray-50);
  border-right: 1px solid var(--gray-200);
  padding: var(--space-4);
}

.topbar {
  grid-area: topbar;
  background: white;
  border-bottom: 1px solid var(--gray-200);
  padding: var(--space-3) var(--space-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main-content {
  grid-area: main;
  padding: var(--space-6);
  overflow-y: auto;
}
```

### Chat Thread Layout
```css
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 768px;
  margin: 0 auto;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.chat-input-area {
  padding: var(--space-4);
  border-top: 1px solid var(--gray-200);
  background: white;
}
```

---

## IV. Interactive States & Animations

### Loading States
```css
/* Typing indicator */
.typing-indicator {
  display: flex;
  gap: var(--space-1);
  padding: var(--space-3) var(--space-4);
  background: var(--gray-100);
  border-radius: var(--radius-lg);
  width: fit-content;
}

.typing-dot {
  width: 6px;
  height: 6px;
  background: var(--gray-400);
  border-radius: 50%;
  animation: typing 1.4s ease-in-out infinite;
}

.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes typing {
  0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
  30% { opacity: 1; transform: translateY(-4px); }
}
```

### Micro-interactions
```css
/* Message appearance */
.message-enter {
  opacity: 0;
  transform: translateY(8px);
  animation: messageAppear 200ms ease-out forwards;
}

@keyframes messageAppear {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Button feedback */
.btn:active {
  transform: scale(0.98);
}

/* Hover transitions */
.interactive:hover {
  transition: all 150ms ease-in-out;
}
```

---

## V. Accessibility Requirements

### Focus States
- All interactive elements must have visible focus indicators
- Focus rings should be 2px solid with appropriate color contrast
- Focus should be visible on both light and dark themes

### Color Contrast
- Text on background: minimum 4.5:1 ratio (WCAG AA)
- Large text (18px+): minimum 3:1 ratio
- Interactive elements: minimum 3:1 ratio for borders/controls

### Touch Targets
- Minimum 44px × 44px for all interactive elements
- Adequate spacing (8px minimum) between touch targets
- Consider larger targets for primary actions

### Semantic HTML
- Use proper heading hierarchy (h1, h2, h3...)
- Form labels associated with inputs
- ARIA labels for complex interactions
- Role attributes for custom components

---

## VI. Responsive Breakpoints

```css
/* Mobile First Approach */
/* Base: 320px+ (mobile) */

/* Small tablets */
@media (min-width: 640px) {
  .chat-messages {
    padding: var(--space-6);
  }
}

/* Tablets */
@media (min-width: 768px) {
  .app-shell {
    grid-template-columns: 320px 1fr;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .chat-container {
    max-width: 800px;
  }
}

/* Large desktop */
@media (min-width: 1440px) {
  .main-content {
    padding: var(--space-8);
  }
}
```

---

## VII. Implementation Notes

### CSS Architecture
- Use Tailwind CSS utility classes where possible
- Custom CSS for complex components only
- CSS custom properties for all design tokens
- Component-scoped styles with CSS modules or styled-components

### Icon System
- Use Lucide React for consistent SVG icons
- 16px and 24px sizes for most use cases
- Color should inherit from parent text color
- Icons should have accessible labels

### Performance
- Optimize for 60fps animations
- Use CSS transforms for animations (GPU acceleration)
- Minimize repaints and reflows
- Lazy load non-critical components

---

*This style guide should be used in conjunction with the strategic design principles in `/context/design-principals.md`. When in doubt, refer to the core philosophy of conversational partnership and friction reduction.*