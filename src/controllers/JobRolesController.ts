import type { Request, Response } from "express";
import type { NewJobRole } from "../models/jobRoles.schema.js";
import type { JobRolesService } from "../services/JobRolesService.js";

export class JobRolesController {
  private jobRolesService: JobRolesService;

  constructor(jobRolesService: JobRolesService) {
    this.jobRolesService = jobRolesService;
  }

  public async getAll(_req: Request, res: Response): Promise<void> {
    const jobRoles = await this.jobRolesService.findAll();
    res.json(jobRoles);
  }

  public async getById(req: Request, res: Response): Promise<void> {
    const idParam = req.params["id"];
    if (!idParam) {
      throw new Error("ID parameter is required");
    }

    const id = Number.parseInt(idParam, 10);
    const jobRole = await this.jobRolesService.findById(id);
    res.json(jobRole);
  }

  public async create(req: Request, res: Response): Promise<void> {
    const newJobRole: NewJobRole = req.body;
    const createdJobRole = await this.jobRolesService.create(newJobRole);
    res.status(201).json(createdJobRole);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const idParam = req.params["id"];
    if (!idParam) {
      throw new Error("ID parameter is required");
    }

    const id = Number.parseInt(idParam, 10);
    const updates: Partial<NewJobRole> = req.body;
    const updatedJobRole = await this.jobRolesService.update(id, updates);
    res.json(updatedJobRole);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const idParam = req.params["id"];
    if (!idParam) {
      throw new Error("ID parameter is required");
    }

    const id = Number.parseInt(idParam, 10);
    await this.jobRolesService.delete(id);
    res.status(204).send();
  }
}
