import type { Request, Response } from "express";
import type { NewJobRole } from "../models/jobRoles.schema.js";
import type { JobRolesService } from "../services/JobRolesService.js";

export class JobRolesController {
  private jobRolesService: JobRolesService;

  constructor(jobRolesService: JobRolesService) {
    this.jobRolesService = jobRolesService;
  }

  public getHelloWorld(_req: Request, res: Response): void {
    res.json({
      message: "Hello World!",
    });
  }

  public async getAllJobRoles(_req: Request, res: Response): Promise<void> {
    try {
      const jobRoles = await this.jobRolesService.findAll();
      res.json(jobRoles);
    } catch (_error) {
      res.status(500).json({ error: "Failed to fetch job roles" });
    }
  }

  public async getJobRoleById(req: Request, res: Response): Promise<void> {
    try {
      const idParam = req.params["id"];
      if (!idParam) {
        res.status(400).json({ error: "ID parameter is required" });
        return;
      }

      const id = Number.parseInt(idParam, 10);
      if (Number.isNaN(id)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }

      const jobRole = await this.jobRolesService.findById(id);
      if (!jobRole) {
        res.status(404).json({ error: "Job role not found" });
        return;
      }

      res.json(jobRole);
    } catch (_error) {
      res.status(500).json({ error: "Failed to fetch job role" });
    }
  }
  public async createJobRole(req: Request, res: Response): Promise<void> {
    try {
      const newJobRole: NewJobRole = req.body;
      if (!newJobRole.title) {
        res.status(400).json({ error: "Title is required" });
        return;
      }

      const createdJobRole = await this.jobRolesService.create(newJobRole);
      res.status(201).json(createdJobRole);
    } catch (_error) {
      res.status(500).json({ error: "Failed to create job role" });
    }
  }

  public async updateJobRole(req: Request, res: Response): Promise<void> {
    try {
      const idParam = req.params["id"];
      if (!idParam) {
        res.status(400).json({ error: "ID parameter is required" });
        return;
      }

      const id = Number.parseInt(idParam, 10);
      if (Number.isNaN(id)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }

      const updates: Partial<NewJobRole> = req.body;
      const updatedJobRole = await this.jobRolesService.update(id, updates);

      if (!updatedJobRole) {
        res.status(404).json({ error: "Job role not found" });
        return;
      }

      res.json(updatedJobRole);
    } catch (_error) {
      res.status(500).json({ error: "Failed to update job role" });
    }
  }

  public async deleteJobRole(req: Request, res: Response): Promise<void> {
    try {
      const idParam = req.params["id"];
      if (!idParam) {
        res.status(400).json({ error: "ID parameter is required" });
        return;
      }

      const id = Number.parseInt(idParam, 10);
      if (Number.isNaN(id)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }

      const deleted = await this.jobRolesService.delete(id);
      if (!deleted) {
        res.status(404).json({ error: "Job role not found" });
        return;
      }

      res.status(204).send();
    } catch (_error) {
      res.status(500).json({ error: "Failed to delete job role" });
    }
  }
}
