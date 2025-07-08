# AI Agent Self-Onboarding Platform

## Overview

This platform enables users to onboard AI agents through a modern, multi-step wizard, manage agent settings, and monitor analytics, all within a secure, dark-themed dashboard. It features robust authentication, accessible UI components, and a seamless onboarding experience.

---

## Features

- **Multi-Step Onboarding Wizard**: Progressive onboarding with required fields, inline error messages, and tooltips for every field.
- **Authentication**: Secure registration, login, and password reset with inline error feedback and accessibility.
- **Dashboard**: Modular, dark-themed dashboard with analytics, agent management, and settings.
- **Tooltips**: Consistent, professional tooltips (info icon) for all fields and section headers, using a React portal for unclipped display.
- **Accessibility**: High-contrast text, keyboard navigation, and screen reader support.
- **Responsive Design**: Fully responsive for desktop and mobile.
- **Error Handling**: Inline error messages for all forms and onboarding steps.
- **State Management**: Context-based authentication and onboarding state.
- **Modern UI**: Professional icons, even spacing, and unified design language.

---

## Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: (Specify if used)

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Setup

#### Backend
```bash
cd backend
cp env.example .env
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
cp env.example .env
npm install
npm run dev
```

### Access
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## Key Components

### Onboarding Wizard
- Multi-step, cannot progress unless all required fields are filled.
- Red asterisks and tooltips for required fields.
- Inline error messages for validation.
- Unified `isStepComplete` logic for progress indicators.

### Authentication
- Registration, login, and password reset flows.
- Inline error messages for invalid credentials.
- Forgot password link and placeholder page.
- Password field with centered info icon and tooltip.

### Dashboard
- Tabs: Overview, Analytics, AI Agents, Settings.
- Analytics and AI Agents tabs styled for dark mode.
- MetricsCard uses unclipped tooltips via React portal.
- Section headers and fields in Settings have tooltips.

### UI/UX
- Dark, aesthetic theme via Tailwind and global styles.
- Professional icons (e.g., GiBrain) throughout.
- Even spacing in all forms and layouts.
- Responsive and accessible.

---

## Development Notes

- All tooltips use a reusable Tooltip component with React portal for robust display.
- All forms and onboarding steps have inline error handling and accessibility features.
- Dashboard and onboarding state managed via React Context.
- All documentation is up to date as of PHASE 2.

---

## Contributing

1. Fork the repo
2. Create a feature branch
3. Commit changes with clear messages
4. Open a pull request

---

## License

MIT
