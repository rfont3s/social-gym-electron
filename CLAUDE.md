# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Social Gym is an Electron-based desktop application for gym management with a React frontend. It combines a React web app with Electron for cross-platform desktop deployment, featuring social feed functionality, authentication, and a responsive design.

## Development Commands

### Core Development

- `npm run dev` - Start Vite development server on port 5173
- `npm run build` - Build both TypeScript and Vite for production
- `npm run lint` - Run ESLint on all files
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting without modifying

### Electron Development

- `npm run electron:dev` - Build Electron and run both web dev server and Electron app
- `npm run electron` - Run Electron app (requires dev server running)
- `npm run build:electron` - Build Electron TypeScript files and rename to .cjs
- `npm run electron:pack` - Package Electron app without distribution
- `npm run electron:dist` - Build and create distributable packages

### Testing & Documentation

- `npm test` - Run all unit tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Run tests with Vitest UI interface
- `npm run test:coverage` - Run tests with coverage report
- `npm run storybook` - Start Storybook dev server on port 6006
- `npm run build-storybook` - Build Storybook for production

## Architecture Overview

### Application Structure

- **Electron Layer**: Main process (`electron/main.ts`) and preload script (`electron/preload.ts`)
- **React Application**: Standard React app with routing, contexts, and component architecture
- **Build Pipeline**: Vite for web bundling, TypeScript compilation for Electron, Electron Builder for packaging

### Key Architectural Patterns

**Context-Based State Management**:

- `AuthContext`: Handles user authentication, token management, and localStorage persistence
- `ThemeContext`: Manages light/dark theme with system preference detection and localStorage persistence

**Routing Strategy**:

- Smart homepage that redirects to Feed (authenticated) or Login (unauthenticated)
- Protected routes wrapper that enforces authentication
- Public routes wrapper that redirects authenticated users away from login/register

**Component Organization**:

- Global components in `src/global/components/` with individual folders
- Page-specific components nested under each page directory
- Barrel exports (`index.ts`) for clean imports

### File Structure Conventions

- Each component has its own folder with `ComponentName.tsx` and `index.ts`
- Pages follow `/pages/PageName/view.tsx` structure with components subfolder
- Path aliases configured in Vite for clean imports (`@components`, `@pages`, `@contexts`, etc.)

### Styling & Theme System

- Tailwind CSS with custom color palette (primary, secondary, accent)
- Dark mode support via CSS classes
- Custom theme provider with system preference detection

### Electron Configuration

- Security-focused setup with context isolation and disabled node integration
- Development mode loads from localhost:5173
- Production mode loads from built files
- Window management for cross-platform compatibility

## Development Workflow

### Adding New Features

1. Create component in appropriate directory with folder structure
2. Add to barrel exports in relevant `index.ts` files
3. Implement with TypeScript and follow existing patterns
4. Use established contexts for auth and theme
5. Add Storybook stories for components in same folder the component

### Code Quality & Testing

- ESLint configuration includes React hooks, TypeScript, and Storybook rules
- Prettier formatting with lint-staged for pre-commit hooks
- Husky for git hooks management
- Vitest + React Testing Library for unit testing
- Tests located alongside components with `.test.tsx` extension
- Test utilities in `src/test/` with custom render function and mocks
- Comprehensive test coverage for components, contexts, hooks, and pages

### Building and Distribution

- `npm run build` creates both web and Electron builds
- Electron Builder configured for Windows (NSIS), macOS (DMG), and Linux (AppImage)
- Build artifacts output to `release/` directory
