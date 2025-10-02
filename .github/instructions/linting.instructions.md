---
applyTo: '**'
---

# Code Quality and Linting Standards

## Overview

This project uses **Biome** as the primary tool for code formatting, linting, and quality checks. After completing any coding task, you **MUST** ensure your code adheres to the project's standards by running the appropriate Biome commands.

## Mandatory Pre-Commit Workflow

### 1. **Comprehensive Check** (Required)
```bash
npm run check
```
- Runs both formatting and linting in one command
- Most efficient way to ensure full compliance

### 2. **Type Check** (Required for TypeScript)
```bash
npm run type-check
```
- Validates TypeScript types without emitting files
- Must pass before committing TypeScript code

## Error Resolution Workflow

When encountering linting or formatting issues:

1. **Run auto-fix first**: `npm run check`
2. **Review changes**: Verify auto-fixes are appropriate
3. **Manual fixes**: Address remaining issues manually
4. **Re-verify**: Run `npm run check:ci` to confirm compliance

## Prohibited Actions

❌ **DO NOT**:
- Commit code without running Biome checks
- Ignore linting errors or warnings
- Override Biome configuration without team approval
- Use different formatters (Prettier, ESLint) alongside Biome

✅ **DO**:
- Run `npm run check` before every commit
- Address all linting issues immediately
- Use Biome's auto-fix capabilities
- Maintain consistent code style across the project

## Troubleshooting

### Common Issues

**"Biome command not found"**
```bash
npm install  # Reinstall dependencies
```

**"Formatting conflicts"**
```bash
npm run format  # Let Biome handle all formatting
```

**"Persistent linting errors"**
1. Read the error message carefully
2. Check Biome documentation for the specific rule
3. Fix manually or disable rule if necessary (with justification)
