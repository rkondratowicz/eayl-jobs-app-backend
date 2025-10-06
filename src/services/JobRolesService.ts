import { DatabaseError, NotFoundError, ValidationError } from "../errors/AppError.js";
import type { JobRole, NewJobRole } from "../models/jobRoles.schema.js";
import type { IJobRolesRepository } from "../repositories/interfaces.js";

export class JobRolesService {
  private repository: IJobRolesRepository;

  constructor(repository: IJobRolesRepository) {
    this.repository = repository;
  }

  async findAll(): Promise<JobRole[]> {
    try {
      return await this.repository.findAll();
    } catch (_error) {
      throw new DatabaseError("Failed to retrieve job roles");
    }
  }

  async findById(id: number): Promise<JobRole> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new ValidationError("Invalid job role ID");
    }

    try {
      const jobRole = await this.repository.findById(id);
      if (!jobRole) {
        throw new NotFoundError(`Job role with ID ${id} not found`);
      }
      return jobRole;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError("Failed to retrieve job role");
    }
  }

  async create(newJobRole: NewJobRole): Promise<JobRole> {
    // Validate required fields
    if (!newJobRole.title || newJobRole.title.trim() === "") {
      throw new ValidationError("Job role title is required");
    }

    try {
      return await this.repository.create(newJobRole);
    } catch (_error) {
      throw new DatabaseError("Failed to create job role");
    }
  }

  async update(id: number, updates: Partial<NewJobRole>): Promise<JobRole> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new ValidationError("Invalid job role ID");
    }

    // Validate that we're not setting title to empty string
    if (updates.title !== undefined && updates.title.trim() === "") {
      throw new ValidationError("Job role title cannot be empty");
    }

    try {
      const updatedJobRole = await this.repository.update(id, updates);
      if (!updatedJobRole) {
        throw new NotFoundError(`Job role with ID ${id} not found`);
      }
      return updatedJobRole;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError("Failed to update job role");
    }
  }

  async delete(id: number): Promise<void> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new ValidationError("Invalid job role ID");
    }

    try {
      const deleted = await this.repository.delete(id);
      if (!deleted) {
        throw new NotFoundError(`Job role with ID ${id} not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError("Failed to delete job role");
    }
  }
}
