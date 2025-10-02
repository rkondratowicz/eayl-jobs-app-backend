---
applyTo: '**'
---

# Project Information and Architecture

## Project Overview

**eayl-jobs-app-backend** is a modern Node.js TypeScript Express REST API server built with ES modules. It's designed as a job roles management backend API with a focus on modern web development practices and clean architecture patterns.

## Technology Stack

### Core Technologies
- **Runtime**: Node.js 18+ (ESM only, no CommonJS)
- **Language**: TypeScript 5.9+ with strict configuration and comprehensive type checking
- **Web Framework**: Express.js 5.1+ with ES module imports for REST API endpoints
- **API Design**: RESTful endpoints with JSON responses
- **Testing**: Vitest 3.2+ with coverage via V8
- **Code Quality**: Biome 2.2+ (replaces ESLint + Prettier)

### Development Tools
- **TypeScript Execution**: tsx 4.20+ for development with watch mode
- **Build Process**: Native TypeScript compiler (tsc)
- **API Testing**: JSON response validation and endpoint testing

## Architecture Patterns

### MVC Structure
```
src/
├── controllers/     # Express route handlers and business logic
├── services/        # Data access layer and business services
├── models/          # TypeScript interfaces and data models
├── routes/          # Route configuration and middleware
└── index.ts         # Application entry point and server setup
```

### Key Design Patterns
- **Service Layer Pattern**: Business logic isolated in service classes
- **Dependency Injection**: Controllers accept service dependencies via constructor
- **Interface Segregation**: Clean interfaces for service contracts
- **Repository Pattern**: Memory-based data storage with interface abstraction

## Application Structure

### Server Configuration
- **Port**: 3000 (hardcoded)
- **API Format**: JSON requests and responses
- **Middleware**: Express JSON and URL-encoded parsing
- **Auto-restart**: tsx watch handles file changes during development

### Data Layer
- **Current Implementation**: Basic controller structure ready for service layer implementation
- **Planned Features**: In-memory data storage, service layer pattern with dependency injection
- **Architecture Ready**: Service and model directories prepared for business logic
- **Extensible Design**: Controllers designed to accept service dependencies via constructor

### API Layer
- **Response Format**: JSON with consistent structure for all endpoints
- **Error Handling**: Proper HTTP status codes and error responses
- **Request Processing**: Express middleware for parsing and validation
- **Content Type**: application/json for all API communications

## Build and Development Workflow

### Development Commands
- `npm run dev`: tsx server with hot reload for API development
- `npm run type-check`: TypeScript type validation without compilation
- `npm test`: Vitest test runner with watch mode

### Production Commands
- `npm run build`: TypeScript compilation to `/dist`
- `npm run start`: Production server from compiled JavaScript
- `npm run serve`: Full build + start sequence

### Quality Assurance
- `npm run check`: Biome format + lint with auto-fix (MANDATORY before commits)
- `npm run test`: Vitest test runner with watch mode
- `npm run test:coverage`: Test coverage reporting via V8

## Key Features and Capabilities

### Current Features
1. **Basic API Structure**: Express server with controller pattern and JSON responses
2. **REST API Foundation**: JSON-based API endpoints with proper HTTP methods
3. **Type Safety**: Full TypeScript coverage with strict configuration
4. **Clean Architecture Ready**: Folder structure prepared for service layer and dependency injection
5. **Development Experience**: Hot reload, watch modes, fast feedback loops

### Architectural Strengths
1. **ES Modules**: Modern JavaScript module system throughout
2. **Strict TypeScript**: Comprehensive type checking and safety
3. **Clean Architecture**: Separation of concerns with clear layers
4. **Testable Design**: Dependency injection enables easy unit testing
5. **Modern Tooling**: Latest versions of all dependencies with caret versioning

## Important Implementation Details

### TypeScript Configuration
- **Target**: ES2022 with ESNext modules
- **Strict Mode**: All strict checks enabled including unused parameters
- **Module Resolution**: Node.js style with JSON module support
- **Source Maps**: Enabled for debugging with declaration files

### API Design
- **RESTful Structure**: Standard HTTP methods (GET, POST, PUT, DELETE)
- **JSON Communication**: All requests and responses use JSON format
- **Error Handling**: Consistent HTTP status codes and error structures
- **Middleware Stack**: Express JSON parsing and request validation

### Testing Setup
- **Framework**: Vitest with Node.js environment
- **Globals**: describe, it, expect available globally
- **Coverage**: V8-based coverage reporting with HTML output
- **Integration**: TypeScript types included for test environment

### Biome Configuration
- **Line Width**: 120 characters
- **Indentation**: 2 spaces
- **File Handling**: Tracks all files, uses Git ignore patterns
- **Auto-fix**: Enabled for both formatting and linting

## Development Guidelines

### File Structure Conventions
- All TypeScript files use `.ts` extension (no `.js` files in src)
- Interfaces defined in separate files (`interfaces.ts`)
- Controllers, services, and models in dedicated directories
- Test files use `.test.ts` extension following Vitest conventions

### Import/Export Patterns
- ES module imports/exports exclusively
- Named exports preferred over default exports (except main app)
- Type-only imports using `type` keyword where appropriate
- Absolute imports from project root (no relative path traversal)

### Error Handling
- Express error handling through try/catch in controllers
- Service layer throws typed errors
- JSON error responses with proper HTTP status codes

This architecture provides a solid foundation for scaling the application while maintaining code quality, type safety, and modern development practices.
