---
applyTo: '**'
---

# Context7 MCP Server Usage Instructions

## Overview

This project has access to the **Context7 MCP (Model Context Protocol) server** via Upstash, which provides up-to-date documentation and code examples for libraries and frameworks. Use this powerful tool to get the most current information when working with external dependencies.

### 1. `mcp_upstash_conte_resolve-library-id`
**Purpose**: Resolve a package/product name to a Context7-compatible library ID

**When to use**:
- Before getting documentation for any library
- When you need to find the correct library identifier
- User mentions a library but doesn't provide exact Context7 ID format

**Required workflow**:
```
User asks about "Express middleware" → resolve-library-id → get-library-docs
```

### 2. `mcp_upstash_conte_get-library-docs`
**Purpose**: Fetch up-to-date documentation for a specific library

**When to use**:
- After resolving library ID OR when user provides exact ID format (`/org/project` or `/org/project/version`)
- Need current documentation, examples, or API references
- Want to understand library-specific patterns and best practices

## Mandatory Usage Scenarios

You **MUST** use Context7 MCP when:

1. **Adding new dependencies** - Get latest documentation and usage patterns
2. **Implementing library-specific features** - Fetch current API documentation
3. **Debugging library-related issues** - Get up-to-date troubleshooting information
4. **Learning new frameworks** - Access comprehensive guides and examples
5. **Version migration** - Get version-specific documentation for upgrades

## Workflow Examples

### Example 1: Adding a Database Library
```
User: "I want to add Prisma ORM to the project"
1. Use resolve-library-id with "Prisma" or "Prisma ORM"
2. Use get-library-docs with the resolved ID
3. Implement based on current documentation
4. Follow dependency management instructions for installation
```

### Example 2: Working with TypeScript
```
User: "How do I use advanced TypeScript types?"
1. Use resolve-library-id with "TypeScript"
2. Use get-library-docs focusing on "advanced types" topic
3. Apply patterns to the codebase
```

### Example 3: Framework-Specific Implementation
```
User: "I need to implement authentication with Passport.js"
1. Use resolve-library-id with "Passport.js" or "Passport"
2. Use get-library-docs with specific topic "authentication setup"
3. Follow the most current implementation patterns
```

## Best Practices

### 1. **Always Resolve First**
- Never assume library IDs - always use `resolve-library-id` first
- Exception: User provides exact format like `/vercel/next.js/v14.3.0`

### 2. **Be Specific with Topics**
- Use targeted topics like "middleware", "routing", "authentication"
- More specific topics yield better, focused documentation

### 3. **Token Management**
- Default 5000 tokens is usually sufficient
- Increase only when dealing with complex, multi-faceted implementations
- Consider multiple focused calls over one large call

### 4. **Integration with Project Standards**
- Always combine Context7 docs with project's linting requirements
- Follow dependency management instructions when installing
- Apply TypeScript patterns consistently with project setup

## Error Handling

### Common Issues and Solutions

**"Library not found"**
- Try alternative names (e.g., "Prisma ORM" vs "Prisma Client")
- Check if the library is available in Context7's database
- Fall back to official documentation if unavailable

**"Outdated information"**
- Context7 provides up-to-date docs, but verify critical changes
- Cross-reference with official changelogs for major versions

## Integration Points

### With Existing Instructions
1. **Dependencies**: Use Context7 before installing new packages
2. **Linting**: Ensure Context7-guided code follows Biome standards
3. **TypeScript**: Validate type usage with current library documentation

### Code Quality Workflow
1. Get library documentation via Context7
2. Implement feature following current patterns
3. Run `npm run check` to ensure compliance
4. Run `npm run type-check` for TypeScript validation

## Prohibited Actions

❌ **DO NOT**:
- Skip library ID resolution step
- Use outdated documentation from search engines
- Implement patterns without checking current library docs
- Ignore Context7 when working with external libraries

✅ **DO**:
- Always resolve library IDs first
- Use focused topics for better documentation
- Combine Context7 docs with project standards
- Verify implementation follows current best practices

## Example Implementation Workflow

When implementing any feature with external libraries:

1. **Research**: Use Context7 to get current documentation
2. **Plan**: Align implementation with project structure
3. **Code**: Apply patterns from Context7 documentation
4. **Quality**: Run Biome checks and TypeScript validation
5. **Test**: Ensure functionality works as expected

This ensures you're always working with the most current information while maintaining project consistency.