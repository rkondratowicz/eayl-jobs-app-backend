import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

console.log("🔄 Running database migrations...");

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);

try {
  migrate(db, { migrationsFolder: "./drizzle" });
  console.log("✅ Migrations completed successfully!");
} catch (error) {
  console.error("❌ Migration failed:", error);
  process.exit(1);
} finally {
  sqlite.close();
}
