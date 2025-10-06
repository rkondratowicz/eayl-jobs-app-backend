import type { JobRole, NewJobRole } from "../models/jobRoles.schema.js";

export interface IJobRolesRepository {
  findAll(): Promise<JobRole[]>;
  findById(id: number): Promise<JobRole | undefined>;
  create(newJobRole: NewJobRole): Promise<JobRole>;
  update(id: number, updates: Partial<NewJobRole>): Promise<JobRole | undefined>;
  delete(id: number): Promise<boolean>;
}
