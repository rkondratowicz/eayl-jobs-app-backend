import type { JobRole, NewJobRole } from "../models/jobRoles.schema.js";
import type { IJobRolesRepository } from "../repositories/interfaces.js";

export class JobRolesService {
  private repository: IJobRolesRepository;

  constructor(repository: IJobRolesRepository) {
    this.repository = repository;
  }

  async findAll(): Promise<JobRole[]> {
    return this.repository.findAll();
  }

  async findById(id: number): Promise<JobRole | undefined> {
    return this.repository.findById(id);
  }

  async create(newJobRole: NewJobRole): Promise<JobRole> {
    return this.repository.create(newJobRole);
  }

  async update(id: number, updates: Partial<NewJobRole>): Promise<JobRole | undefined> {
    return this.repository.update(id, updates);
  }

  async delete(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}
