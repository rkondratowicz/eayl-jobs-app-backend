# eayl-jobs-app-backend

A modern Node.js TypeScript Express REST API server built with ES modules and designed for job roles management.

## Features

- 🚀 TypeScript with strict configuration and comprehensive type checking
- 📦 ES Modules (ESM) support throughout
- ⚡ Fast development with `tsx` hot reload
- 🌐 Express.js REST API server with JSON responses
- 🛠️ Modern Node.js setup (18+)
- ⚡ **Biome** for fast formatting, linting, and code quality
- 🔧 Pre-configured code style with automatic fixes
- 📝 Import organization and sorting
- ✅ Comprehensive testing setup with Vitest
- 🔍 Test coverage reporting with V8

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
npm install
```

### Development

Run the Express API server in development mode with hot reload:

```bash
npm run dev
```

The server will start on `http://localhost:3000` with the following API endpoints:
- `GET /` - Returns a simple Hello World JSON response

### Build

Compile TypeScript to JavaScript for production:

```bash
npm run build
```

### Production

Run the compiled application in production:

```bash
npm start
```

Or build and start in one command:

```bash
npm run serve
```

### Testing

Run the test suite:

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Generate test coverage report
npm run test:coverage
```

### Code Quality & Formatting

This project uses Biome for consistent code quality:

```bash
# Format and fix all files (run before every commit)
npm run check

# Check formatting without fixing
npm run format:check

# Lint and fix all files
npm run lint

# Check linting without fixing
npm run lint:check

# CI-optimized check without fixes
npm run check:ci
```

### Other Scripts

- `npm run type-check` - Check TypeScript types without building
- `npm run clean` - Remove build directory

## API Endpoints

### Job Roles Management

- `GET /` - Health check endpoint returning "Hello World!" message

*More endpoints will be added as the API develops.*

## Project Structure

```
├── src/
│   ├── index.ts              # Main application entry point and server setup
│   ├── utils.ts              # Utility functions
│   ├── utils.test.ts         # Utility function tests
│   ├── controllers/          # Express route handlers and business logic
│   │   └── JobRolesController.ts
│   ├── models/               # TypeScript interfaces and data models
│   ├── routes/               # Route configuration and middleware
│   │   └── index.ts
│   └── services/             # Data access layer and business services
├── dist/                     # Compiled JavaScript (after build)
├── coverage/                 # Test coverage reports (auto-generated)
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vitest.config.ts         # Vitest testing configuration
├── biome.json              # Biome configuration for formatting & linting
├── .biomeignore            # Files to ignore from Biome checking
├── .gitignore              # Git ignore patterns
└── README.md               # This file
```

## Architecture

This backend API follows clean architecture principles with clear separation of concerns:

### Key Design Patterns

- **Service Layer Pattern**: Business logic isolated in service classes
- **Dependency Injection**: Controllers accept service dependencies via constructor
- **Interface Segregation**: Clean interfaces for service contracts
- **Repository Pattern**: Data storage abstraction for easy testing and swapping

### Development Principles

- **ES Modules**: Modern JavaScript module system throughout
- **Strict TypeScript**: Comprehensive type checking and safety
- **Clean Code**: Consistent formatting and linting with Biome
- **Test-Driven Development**: Vitest setup with coverage reporting
- **Hot Reload**: Fast development feedback with tsx watch mode

### API Design

- **RESTful Endpoints**: Following REST conventions for resource management
- **JSON Responses**: All endpoints return JSON with consistent structure
- **Error Handling**: Proper HTTP status codes and error responses
- **Middleware**: Express middleware for request parsing and processing

## Code Style & Quality

This project uses [Biome](https://biomejs.dev/) for code formatting, linting, and organization:

- **Formatting**: 2-space indentation, 120-character line width, double quotes
- **Linting**: Recommended rules enabled for JavaScript/TypeScript
- **Import Organization**: Automatic import sorting and organization
- **Git Integration**: Uses `.gitignore` for file exclusion

### Testing

- **Framework**: Vitest with Node.js environment
- **Coverage**: V8-based coverage reporting with HTML output
- **Globals**: `describe`, `it`, `expect` available globally
- **Watch Mode**: Automatic test re-running during development

### Editor Setup

For the best development experience, install the [Biome VS Code extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) to get:
- Real-time formatting and linting
- Auto-fix on save  
- Import organization on save

### CI/CD Integration

The project includes GitHub Actions workflow for automated:
- Code quality checks with `npm run check:ci`
- Test execution with `npm run test:run`
- Dependency updates with Dependabot

## Development Guidelines

### Mandatory Pre-Commit Workflow

1. **Run comprehensive check**: `npm run check`
2. **Run type check**: `npm run type-check`  
3. **Run tests**: `npm test`
4. **Verify build**: `npm run build`

### API Response Format

All API endpoints should return consistent JSON responses:

```typescript
// Success Response
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation completed successfully"
}

// Error Response  
{
  "success": false,
  "error": "Error description",
  "code": "ERROR_CODE"
}
```

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following the code style guidelines
4. Run all checks: `npm run check && npm test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## License

This project is licensed under the ISC License.