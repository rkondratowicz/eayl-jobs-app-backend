# Database Migrations Guide

## Overview

This project uses **Drizzle ORM** with **SQLite** for database management and migrations. The migration system is fully configured and ready to use.

## Migration Files

All generated migrations are stored in the `/drizzle` directory:
- **SQL migrations**: `drizzle/*.sql` - The actual migration SQL files
- **Metadata**: `drizzle/meta/` - Migration tracking and snapshots

## Available Commands

### Generate Migrations
Creates new migration files based on schema changes:
```bash
npm run db:generate
```
This compares your schema (`src/models/jobRoles.schema.ts`) with the current database state and generates SQL migration files.

### Apply Migrations (Drizzle Kit)
Apply migrations using Drizzle Kit CLI:
```bash
npm run db:migrate
```
⚠️ **Note**: This command may fail if tables already exist. Use the programmatic approach below instead.

### Apply Migrations (Programmatic)
Apply migrations programmatically using the custom script:
```bash
npm run db:migrate:run
```
This runs `src/scripts/migrate.ts` which safely applies migrations.

### Push Schema Directly
Push schema changes directly to the database without generating migration files (useful for development):
```bash
npm run db:push
```

### Drizzle Studio
Launch the Drizzle Studio GUI to view and manage your database:
```bash
npm run db:studio
```

## Workflow

### 1. Modify Your Schema
Edit your schema file(s) in `src/models/`:
```typescript
// src/models/jobRoles.schema.ts
export const jobRoles = sqliteTable("job_roles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  // Add new fields here
});
```

### 2. Generate Migration
```bash
npm run db:generate
```
This creates a new SQL migration file in `/drizzle` with your changes.

### 3. Review Migration
Check the generated SQL file in `/drizzle` to ensure it's correct:
```sql
-- Example: drizzle/0001_new_migration.sql
ALTER TABLE `job_roles` ADD `new_field` text;
```

### 4. Apply Migration
```bash
npm run db:migrate:run
```
This applies the migration to your database.

### 5. Verify Changes
Use Drizzle Studio to verify:
```bash
npm run db:studio
```

## Current Schema

The project currently has one table:

**job_roles**
- `id` - INTEGER PRIMARY KEY AUTOINCREMENT
- `title` - TEXT NOT NULL
- `description` - TEXT
- `created_at` - INTEGER (timestamp) NOT NULL
- `updated_at` - INTEGER (timestamp) NOT NULL

## Migration History

- **0000_calm_trish_tilby.sql** - Initial schema creation
  - Created `job_roles` table with all base fields

## Best Practices

1. **Always generate migrations** for schema changes (don't use `db:push` in production)
2. **Review generated SQL** before applying migrations
3. **Run migrations before starting your app** in production
4. **Backup your database** before running migrations in production
5. **Test migrations** in a development environment first

## Troubleshooting

### "Table already exists" Error
If you get this error, the table was likely created outside the migration system. You can:
1. Drop the existing table (⚠️ loses data)
2. Use `npm run db:push` to sync without migrations (development only)
3. Manually adjust the migration history

### Starting Fresh
To reset the database completely:
```bash
rm sqlite.db
rm -rf drizzle/
npm run db:generate
npm run db:migrate:run
```

## Production Deployment

For production, include migrations in your deployment pipeline:
```bash
# Build the application
npm run build

# Run migrations
npm run db:migrate:run

# Start the server
npm start
```

Consider adding migrations to your start script or running them automatically on application startup.
