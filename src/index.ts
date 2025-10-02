import express from "express";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import and configure routes
import { configureRoutes } from "./routes/index.js";

// Configure all routes
configureRoutes(app);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

export default app;
