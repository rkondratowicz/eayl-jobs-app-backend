import { Router } from "express";
import { JobRolesController } from "../controllers/JobRolesController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { JobRolesRepository } from "../repositories/JobRolesRepository.js";
import { JobRolesService } from "../services/JobRolesService.js";

export const createJobRolesRouter = (): Router => {
  const router = Router();
  const repository = new JobRolesRepository();
  const service = new JobRolesService(repository);
  const controller = new JobRolesController(service);

  // GET /job-roles - Get all job roles
  router.get("/", asyncHandler(controller.getAll.bind(controller)));

  // GET /job-roles/:id - Get a job role by ID
  router.get("/:id", asyncHandler(controller.getById.bind(controller)));

  // POST /job-roles - Create a new job role
  router.post("/", asyncHandler(controller.create.bind(controller)));

  // PUT /job-roles/:id - Update a job role
  router.put("/:id", asyncHandler(controller.update.bind(controller)));

  // DELETE /job-roles/:id - Delete a job role
  router.delete("/:id", asyncHandler(controller.delete.bind(controller)));

  return router;
};
