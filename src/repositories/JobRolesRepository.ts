import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import type { JobRole, NewJobRole } from "../models/jobRoles.schema.js";
import { jobRoles } from "../models/jobRoles.schema.js";
import type { IJobRolesRepository } from "./interfaces.js";

export class JobRolesRepository implements IJobRolesRepository {
  async findAll(): Promise<JobRole[]> {
    return db.select().from(jobRoles).all();
  }

  async findById(id: number): Promise<JobRole | undefined> {
    const result = await db.select().from(jobRoles).where(eq(jobRoles.id, id)).get();
    return result;
  }

  async create(newJobRole: NewJobRole): Promise<JobRole> {
    const result = await db.insert(jobRoles).values(newJobRole).returning().get();
    return result;
  }

  async update(id: number, updates: Partial<NewJobRole>): Promise<JobRole | undefined> {
    const updatedJobRole = {
      ...updates,
      updatedAt: new Date(),
    };
    const result = await db.update(jobRoles).set(updatedJobRole).where(eq(jobRoles.id, id)).returning().get();
    return result;
  }

  async delete(id: number): Promise<boolean> {
    const result = await db.delete(jobRoles).where(eq(jobRoles.id, id)).returning().get();
    return result !== undefined;
  }
}
