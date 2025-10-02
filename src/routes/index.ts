import type { Application } from "express";
import { JobRolesController } from "../controllers/JobRolesController.js";

export const configureRoutes = (app: Application): void => {
  // Initialize controllers
  const jobRolesController = new JobRolesController();

  // Job Roles Routes - using as root route for hello world
  app.use("/", jobRolesController.router);
};
