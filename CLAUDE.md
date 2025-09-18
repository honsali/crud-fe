# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm start` or `yarn start`
- **Build for production**: `npm run build` or `yarn build`
- **Run tests**: `npm test` or `yarn test`

## Architecture Overview

This is a React TypeScript application built on the **Waxant framework**, a custom enterprise-grade framework for CRUD applications. The application follows a modular, domain-driven architecture.

### Key Architectural Components

**Waxant Framework (`src/waxant/`)**
- Custom React framework providing:
  - UI components (forms, tables, dialogs, buttons)
  - Redux-based state management with middleware
  - Routing and authentication system
  - Internationalization support
  - Event bus for cross-component communication

**Module Structure**
- Modules follow the pattern: `src/modules/{domain}/`
- Each module contains:
  - `ModuleXX.tsx` - Module definition and configuration
  - `ActionXX.ts` - Redux actions
  - `ReducerXX.ts` - Redux reducer
  - `I18nXX.ts` - Internationalization mappings
  - `ListePageXX.tsx` - Page definitions and routing

**Domain-Driven Architecture**
- Business logic in `src/modele/{domain}/`
- Domain services handle API interactions
- Separate concerns between UI, actions, and domain logic

**Page Organization (CRUD Pattern)**
Each functional area follows a consistent 4-page pattern:
- `lister/` - List view with filtering and pagination
- `creer/` - Create new entity
- `consulter/` - Read-only detail view  
- `modifier/` - Edit existing entity

Each page contains:
- `Ctrl{Action}{Entity}.ts` - Controller logic
- `Mdl{Action}{Entity}.ts` - Model/state management
- `View{Action}{Entity}.tsx` - React component
- `use{Action}{Entity}.ts` - Custom hook
- `element/` - Sub-components

### Technology Stack

- **React 18** with TypeScript
- **Ant Design** for base UI components
- **Redux Toolkit** for state management
- **Styled Components** for styling
- **Axios** for HTTP requests
- **CRACO** for build configuration
- **RxJS** for reactive programming

### Configuration

- Uses CRACO instead of standard CRA configuration
- TypeScript configured with relaxed settings (`strict: false`)
- Base URL set to `src` for absolute imports

## Code Generation Architecture

**IMPORTANT: Generated Code**
- All code in `/modules/` and `/modele/` directories is **entirely generated** by a code generator engine
- The architecture and coding patterns must cooperate with the code generation system
- Design decisions prioritize **generator flexibility** over traditional hand-coded best practices

**Generator-Friendly Design Principles:**
- **Explicit over implicit**: Hardcoded values (like `largeur="600px"`) are intentional to support DSL specification
- **Foundation components**: Components like `Bloc` are designed as flexible building blocks that can be configured by the generator for endless use cases
- **Consistent patterns**: The 4-page CRUD pattern ensures predictable code generation
- **ID conventions**: Dual ID approach (`id` for API, `idDepartement` for navigation) supports complex nested routing generation

**Waxant Foundation Components:**
- `Bloc`: Layout container that serves as intermediate component between functional components (forms, tables) and containing panels
- Allows generator to specify width, background, margins through DSL
- Designed for maximum configurability rather than semantic defaults

## Architectural Analysis Completed

**Status:** Comprehensive architectural review completed (August 2025)  
**Analysis Coverage:** Complete system review including generated code, Waxant framework, and all UX components  
**Overall Rating:** 9.7/10 - Exceptional Enterprise Architecture  
**Review Document:** See `Waxant_Framework_Architectural_Review.md` for full analysis

### Key Architectural Strengths Identified
- **Unified Key Strategy**: Single source of truth across ActionRh → I18n → Controllers → ACL → Buttons
- **Security-by-Design**: Zero-trust role-based module loading with runtime route generation
- **First-Grade Generated Code**: Production-ready code that can be manually extended
- **Enterprise Error Management**: 4-layer error handling with automatic serialization
- **Sophisticated Loading States**: Dual-layer feedback (global overlay + button states)
- **Module-Based I18n**: Role-based selective translation loading

### Generated Code Analysis Results
- **Pattern Consistency**: Perfect 4-layer architecture (Ctrl/Mdl/View/Hook)
- **Framework Integration**: Seamless leverage of all Waxant capabilities
- **Type Safety**: Strong TypeScript throughout generated code
- **Business Logic Ready**: Extension points for complex business rules
- **Enterprise Features**: Security, loading, error handling, i18n all automated

### Current Implementation

The application currently implements an HR (RH) module with Department (Departement) management functionality, demonstrating the full CRUD pattern within the Waxant framework architecture.

### Next Analysis Target
**Generator Engine Project**: Ready for analysis of code generation patterns and template architecture that produces this exceptional generated code quality.