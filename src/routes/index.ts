import type { Application } from "express";
import { createJobRolesRouter } from "./jobRoles.routes.js";

export const configureRoutes = (app: Application): void => {
  // Root route for hello world
  const jobRolesRouter = createJobRolesRouter();
  app.use("/", jobRolesRouter);
  // Job Roles API Routes
  app.use("/job-roles", createJobRolesRouter());
};
