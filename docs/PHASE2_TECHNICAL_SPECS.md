# PHASE 2 Technical Specifications

## Overview

Phase 2 delivers a robust, accessible, and modern AI Agent Self-Onboarding Platform with a dark, professional UI, seamless onboarding, and comprehensive dashboard features.

---

## 1. Onboarding Wizard

- Multi-step, progressive onboarding (all required fields must be filled before progressing).
- Red asterisks and info-icon tooltips for all required fields.
- Inline error messages for validation failures.
- Unified `isStepComplete` function for progress indicators and AI Agent status.
- Cannot mark AI Agent as live unless all steps are complete (UI feedback for incomplete steps).

## 2. Authentication

- Registration, login, and password reset flows.
- Inline error messages for invalid credentials.
- Password field with centered info icon and tooltip.
- Forgot password link and placeholder page.

## 3. Dashboard

- Tabs: Overview, Analytics, AI Agents, Settings.
- Analytics and AI Agents tabs styled for dark mode.
- MetricsCard and all dashboard tooltips use React portal for unclipped display.
- Settings: Section headers and all fields have tooltips.

## 4. Backend Core Functionality (Milestone 3 Additions)

### 4.1 File Content Extraction
- Supports text extraction from uploaded PDF, DOCX, and plain text files.
- Utilizes `pdf-parse` for PDFs and `mammoth` for DOCX files to extract raw text content.
- Integrates with AWS S3 for secure file storage.

### 4.2 Web Content Acquisition
- **Web Crawling**: Implements `/api/files/crawl` endpoint to fetch and extract text content from specified URLs using `axios` and `cheerio`.
- **Document Link Fetching**: Provides `/api/files/doclink` endpoint to retrieve content from public document URLs (e.g., Google Docs, Notion).

### 4.3 AI Integration
- Integrates with OpenAI API for generating AI agent responses via `backend/src/services/openaiService.js`.
- Includes stubs for future GoHighLevel API interactions in `backend/src/services/goHighLevelService.js`.
- Utilizes onboarding data (niche, goals, tone) to construct prompts for the AI agent.

### 4.4 Chat Core Logic
- The `POST /api/agents/chat` endpoint handles user messages, integrates with OpenAI for responses, and logs conversations.
- Facilitates real-time communication between users and the AI agent.

## 5. UI/UX & Accessibility

- Unified dark theme via Tailwind CSS and global styles.
- Professional icons (e.g., GiBrain) throughout.
- Even spacing in all forms and layouts.
- Responsive and accessible (keyboard navigation, screen reader support, high contrast).

## 6. Error Handling

- All forms and onboarding steps display inline error messages.
- Backend returns clear error messages for API failures.

## 7. State Management

- React Context for authentication and onboarding state.
- Modular, colocated state logic.

## 8. Tooltips

- All fields and section headers have tooltips (info icon), implemented via a reusable Tooltip component with React portal for unclipped display.
- Consistent, visually appealing tooltips across the app.

## 9. Code Quality & Documentation

- Modular, reusable components.
- ES6+ syntax and functional components.
- Up-to-date README, SOP, and technical specs.

---

_Last updated: PHASE 3 completion_