import type { Application } from "express";
import { createJobRolesRouter } from "./jobRoles.routes.js";

export const configureRoutes = (app: Application): void => {
  // Job Roles API Routes
  app.use("/job-roles", createJobRolesRouter());
};
