---
applyTo: '**'
---

# Dependency Management Instructions

## Core Principles

1. **Always use the LATEST STABLE versions** of all dependencies when adding new packages or updating existing ones
2. **Use caret (^) versioning** for all dependencies to allow automatic minor and patch updates
3. **Check npm registry** for the most recent version before installation
4. **Maintain consistency** with the existing project structure and TypeScript/ES modules setup

## Mandatory Checks Before Adding Dependencies

Before adding any new dependency, you MUST:

1. **Check the latest version** on npm registry using: `npm view <package-name> version`
2. **Verify compatibility** with the current Node.js version (>=18.0.0)
3. **Ensure TypeScript support** - prefer packages with built-in TypeScript definitions or install corresponding `@types/` packages
4. **Check for security vulnerabilities** using: `npm audit`

## Installation Commands

### For Production Dependencies
```bash
# Always use --save-exact for major version installations, then update to caret
npm install <package-name>@latest
# Or specify the latest version with caret
npm install <package-name>@^<latest-version>
```

### For Development Dependencies
```bash
npm install --save-dev <package-name>@latest
# For TypeScript definitions
npm install --save-dev @types/<package-name>@latest
```

## Version Pinning Rules

1. **Production dependencies**: Use caret (^) versioning to allow minor/patch updates
2. **DevDependencies**: Use caret (^) versioning for consistency
3. **CI/CD**: Use package-lock.json for deterministic builds
4. **Security patches**: Always update immediately regardless of semantic versioning

## Prohibited Actions

❌ **DO NOT**:
- Install outdated versions without justification
- Add dependencies without checking for latest versions
- Skip TypeScript definitions for JavaScript packages
- Ignore security vulnerabilities in dependencies

✅ **DO**:
- Always verify latest version before installation
- Install TypeScript definitions for all JS packages
- Run tests after dependency updates
- Document breaking changes in commit messages

## Example Workflow

When adding a new dependency:

1. **Research**: `npm view <package> version`
2. **Install**: `npm install <package>@^<latest-version>`
3. **Types**: `npm install --save-dev @types/<package>@latest` (if needed)
4. **Test**: `npm test` to ensure no breaking changes
