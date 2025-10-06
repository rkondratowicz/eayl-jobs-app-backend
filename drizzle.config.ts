import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "sqlite",
	schema: "./src/models/jobRoles.schema.ts",
	out: "./drizzle",
	dbCredentials: {
		url: "sqlite.db",
	},
});
