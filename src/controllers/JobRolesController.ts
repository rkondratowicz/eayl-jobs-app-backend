import type { NextFunction, Request, Response } from "express";
import type { NewJobRole } from "../models/jobRoles.schema.js";
import type { JobRolesService } from "../services/JobRolesService.js";

export class JobRolesController {
  private jobRolesService: JobRolesService;

  constructor(jobRolesService: JobRolesService) {
    this.jobRolesService = jobRolesService;
  }

  public async getAllJobRoles(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const jobRoles = await this.jobRolesService.findAll();
      res.json(jobRoles);
    } catch (error) {
      next(error);
    }
  }

  public async getJobRoleById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idParam = req.params["id"];
      if (!idParam) {
        throw new Error("ID parameter is required");
      }

      const id = Number.parseInt(idParam, 10);
      const jobRole = await this.jobRolesService.findById(id);
      res.json(jobRole);
    } catch (error) {
      next(error);
    }
  }

  public async createJobRole(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newJobRole: NewJobRole = req.body;
      const createdJobRole = await this.jobRolesService.create(newJobRole);
      res.status(201).json(createdJobRole);
    } catch (error) {
      next(error);
    }
  }

  public async updateJobRole(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idParam = req.params["id"];
      if (!idParam) {
        throw new Error("ID parameter is required");
      }

      const id = Number.parseInt(idParam, 10);
      const updates: Partial<NewJobRole> = req.body;
      const updatedJobRole = await this.jobRolesService.update(id, updates);
      res.json(updatedJobRole);
    } catch (error) {
      next(error);
    }
  }

  public async deleteJobRole(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idParam = req.params["id"];
      if (!idParam) {
        throw new Error("ID parameter is required");
      }

      const id = Number.parseInt(idParam, 10);
      await this.jobRolesService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
