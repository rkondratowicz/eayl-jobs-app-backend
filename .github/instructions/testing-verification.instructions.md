---
applyTo: '**'
---

# Testing and Verification Instructions

## Multi-Terminal Workflow for API Testing

When testing API changes, you **MUST** use separate terminal sessions to avoid killing running processes.

### Terminal 1: Static Checks (One-off Commands)

Run these checks **first**, before starting the server:

```bash
# 1. Code quality and formatting
npm run check

# 2. TypeScript type validation
npm run type-check

# 3. Unit tests (if applicable)
npm test
```

**All checks must pass before proceeding to functional testing.**

### Terminal 2: Development Server (Long-running Process)

Once static checks pass, start the server in a **dedicated terminal**:

```bash
npm run dev
```

**Expected output:**
```
🚀 Server running on http://localhost:3000
```

**Leave this terminal running** - do not close it or run other commands here.

### Terminal 1: API Testing (Return to First Terminal)

Switch back to Terminal 1 and test your endpoints:

```bash
# Test root endpoint
curl http://localhost:3000/

# Test specific endpoints
curl http://localhost:3000/api/job-roles

# POST request example
curl -X POST http://localhost:3000/api/job-roles \
  -H "Content-Type: application/json" \
  -d '{"title":"Developer"}'

# Verbose output for debugging
curl -v http://localhost:3000/
```

**Verify responses:**
- ✅ HTTP status 200 for successful requests
- ✅ Valid JSON format
- ✅ Correct data structure
- ✅ No errors in server terminal (Terminal 2)

### Terminal 2: Stop the Server (When Done)

After testing is complete, switch to Terminal 2 and stop the server:

```bash
# Press Ctrl+C to stop the server
^C
```

**Expected output:**
```
[tsx] Process exited
```

## Complete Testing Checklist

- [ ] **Terminal 1**: Run `npm run check` → Must pass
- [ ] **Terminal 1**: Run `npm run type-check` → Must pass
- [ ] **Terminal 1**: Run `npm test` → All tests pass
- [ ] **Terminal 2**: Start `npm run dev` → Server running
- [ ] **Terminal 1**: Test all affected endpoints with `curl`
- [ ] **Terminal 1**: Verify JSON responses are correct
- [ ] **Terminal 2**: Check for runtime errors in server logs
- [ ] **Terminal 2**: Stop server with `Ctrl+C` → Clean shutdown

## Critical Rules

❌ **NEVER**:
- Run `npm run dev` in the same terminal where you run other commands
- Start multiple dev servers simultaneously (second one kills the first)
- Forget to stop the server when done testing

✅ **ALWAYS**:
- Use separate terminals for server vs testing commands
- Run static checks before starting the server
- Stop the server cleanly with `Ctrl+C` after testing
- Keep server terminal visible to monitor for errors

## Quick Reference

```bash
# Terminal 1 (Static Checks & Testing)
npm run check && npm run type-check && npm test

# Terminal 2 (Server - Keep Running)
npm run dev

# Terminal 1 (API Testing)
curl http://localhost:3000/

# Terminal 2 (Stop Server)
Ctrl+C
```

This workflow prevents accidentally killing your dev server and ensures clean testing! 🚀
