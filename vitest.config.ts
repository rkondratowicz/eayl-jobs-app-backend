import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Configure test environment
    environment: "node",
    // Enable globals like describe, it, expect
    globals: true,
  },
});
