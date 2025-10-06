import { Router } from "express";
import { JobRolesController } from "../controllers/JobRolesController.js";
import { JobRolesRepository } from "../repositories/JobRolesRepository.js";
import { JobRolesService } from "../services/JobRolesService.js";

export const createJobRolesRouter = (): Router => {
  const router = Router();
  const repository = new JobRolesRepository();
  const service = new JobRolesService(repository);
  const controller = new JobRolesController(service);

  // GET /job-roles - Get hello world message
  router.get("/", controller.getHelloWorld.bind(controller));

  // GET /job-roles/all - Get all job roles
  router.get("/all", controller.getAllJobRoles.bind(controller));

  // GET /job-roles/:id - Get a job role by ID
  router.get("/:id", controller.getJobRoleById.bind(controller));

  // POST /job-roles - Create a new job role
  router.post("/", controller.createJobRole.bind(controller));

  // PUT /job-roles/:id - Update a job role
  router.put("/:id", controller.updateJobRole.bind(controller));

  // DELETE /job-roles/:id - Delete a job role
  router.delete("/:id", controller.deleteJobRole.bind(controller));

  return router;
};
