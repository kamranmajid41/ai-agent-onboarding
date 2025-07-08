# Development SOP: AI Agent Self-Onboarding Platform

## 1. Project Structure

- **backend/**: Node.js/Express API, models, controllers, routes, middleware.
- **frontend/**: Next.js/React app, components, pages, contexts, services, styles.
- **docs/**: Technical specs, SOPs, and documentation.

## 2. UI/UX Standards

- **Dark Theme**: All UI uses a unified dark, high-contrast theme via Tailwind CSS.
- **Professional Icons**: Use icon libraries (e.g., react-icons) for all UI icons.
- **Even Spacing**: Forms and layouts use consistent, even spacing.
- **Tooltips**: All fields and section headers have tooltips (info icon), implemented via a reusable Tooltip component with React portal to prevent clipping.
- **Accessibility**: All forms and components are accessible (keyboard navigation, screen reader support, sufficient contrast).

## 3. Onboarding Flow

- Multi-step wizard, each step validated before progressing.
- Required fields marked with red asterisks and have tooltips.
- Inline error messages for validation failures.
- Unified `isStepComplete` function for progress indicators and AI Agent status.
- Cannot mark AI Agent as live unless all steps are complete.

## 4. Authentication

- Registration, login, and password reset flows.
- Inline error messages for invalid credentials.
- Password field has centered info icon and tooltip.
- Forgot password link and placeholder page.

## 5. Dashboard

- Tabs: Overview, Analytics, AI Agents, Settings.
- Analytics and AI Agents tabs styled for dark mode.
- MetricsCard and all dashboard tooltips use React portal for unclipped display.
- Settings: Section headers and all fields have tooltips.

## 6. Error Handling

- All forms and onboarding steps display inline error messages.
- Backend returns clear error messages for API failures.

## 7. State Management

- Use React Context for authentication and onboarding state.
- Keep state logic modular and colocated with relevant components.

## 8. Code Quality

- Use ES6+ syntax and functional components.
- Keep components modular and reusable.
- Use prop-types or TypeScript for type safety (if applicable).
- Write clear, descriptive commit messages.

## 9. Documentation

- Keep README, SOP, and technical specs up to date with all major changes.
- Document all new components and flows.

## 10. Testing

- Manual testing for all onboarding, authentication, and dashboard flows.
- (Add automated tests as project matures.)

---

_Last updated: PHASE 2 completion_ 