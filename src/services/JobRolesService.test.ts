import { beforeEach, describe, expect, it, vi } from "vitest";
import { DatabaseError, NotFoundError, ValidationError } from "../errors/AppError.js";
import type { JobRole, NewJobRole } from "../models/jobRoles.schema.js";
import type { IJobRolesRepository } from "../repositories/interfaces.js";
import { JobRolesService } from "./JobRolesService.js";

// Mock repository implementation
class MockJobRolesRepository implements IJobRolesRepository {
  private mockData: JobRole[] = [];

  async findAll(): Promise<JobRole[]> {
    return this.mockData;
  }

  async findById(id: number): Promise<JobRole | undefined> {
    return this.mockData.find((role) => role.id === id);
  }

  async create(newJobRole: NewJobRole): Promise<JobRole> {
    const jobRole: JobRole = {
      id: this.mockData.length + 1,
      title: newJobRole.title,
      description: newJobRole.description ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.mockData.push(jobRole);
    return jobRole;
  }

  async update(id: number, updates: Partial<NewJobRole>): Promise<JobRole | undefined> {
    const index = this.mockData.findIndex((role) => role.id === id);
    if (index === -1) return undefined;

    const currentRole = this.mockData[index];
    if (!currentRole) return undefined;

    this.mockData[index] = {
      id: currentRole.id,
      title: updates.title ?? currentRole.title,
      description: updates.description !== undefined ? updates.description : currentRole.description,
      createdAt: currentRole.createdAt,
      updatedAt: new Date(),
    };
    return this.mockData[index];
  }

  async delete(id: number): Promise<boolean> {
    const index = this.mockData.findIndex((role) => role.id === id);
    if (index === -1) return false;

    this.mockData.splice(index, 1);
    return true;
  }

  // Helper method for tests
  setMockData(data: JobRole[]) {
    this.mockData = [...data];
  }

  reset() {
    this.mockData = [];
  }
}

describe("JobRolesService", () => {
  let service: JobRolesService;
  let mockRepository: MockJobRolesRepository;

  beforeEach(() => {
    mockRepository = new MockJobRolesRepository();
    service = new JobRolesService(mockRepository);
  });

  describe("findAll", () => {
    it("should return all job roles", async () => {
      const mockRoles: JobRole[] = [
        {
          id: 1,
          title: "Software Engineer",
          description: "Develops software",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          title: "Product Manager",
          description: "Manages products",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockRepository.setMockData(mockRoles);

      const result = await service.findAll();

      expect(result).toHaveLength(2);
      expect(result).toEqual(mockRoles);
    });

    it("should return empty array when no job roles exist", async () => {
      const result = await service.findAll();

      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });

    it("should throw DatabaseError when repository fails", async () => {
      const errorRepository = {
        findAll: vi.fn().mockRejectedValue(new Error("Database connection failed")),
      } as unknown as IJobRolesRepository;

      const errorService = new JobRolesService(errorRepository);

      await expect(errorService.findAll()).rejects.toThrow(DatabaseError);
      await expect(errorService.findAll()).rejects.toThrow("Failed to retrieve job roles");
    });
  });

  describe("findById", () => {
    it("should return a job role by id", async () => {
      const mockRole: JobRole = {
        id: 1,
        title: "Software Engineer",
        description: "Develops software",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.setMockData([mockRole]);

      const result = await service.findById(1);

      expect(result).toEqual(mockRole);
    });

    it("should throw NotFoundError when job role does not exist", async () => {
      await expect(service.findById(999)).rejects.toThrow(NotFoundError);
      await expect(service.findById(999)).rejects.toThrow("Job role with ID 999 not found");
    });

    it("should throw ValidationError for invalid id (non-integer)", async () => {
      await expect(service.findById(1.5)).rejects.toThrow(ValidationError);
      await expect(service.findById(1.5)).rejects.toThrow("Invalid job role ID");
    });

    it("should throw ValidationError for invalid id (zero)", async () => {
      await expect(service.findById(0)).rejects.toThrow(ValidationError);
      await expect(service.findById(0)).rejects.toThrow("Invalid job role ID");
    });

    it("should throw ValidationError for invalid id (negative)", async () => {
      await expect(service.findById(-1)).rejects.toThrow(ValidationError);
      await expect(service.findById(-1)).rejects.toThrow("Invalid job role ID");
    });

    it("should throw DatabaseError when repository fails", async () => {
      const errorRepository = {
        findById: vi.fn().mockRejectedValue(new Error("Database connection failed")),
      } as unknown as IJobRolesRepository;

      const errorService = new JobRolesService(errorRepository);

      await expect(errorService.findById(1)).rejects.toThrow(DatabaseError);
      await expect(errorService.findById(1)).rejects.toThrow("Failed to retrieve job role");
    });
  });

  describe("create", () => {
    it("should create a new job role with title and description", async () => {
      const newJobRole: NewJobRole = {
        title: "Software Engineer",
        description: "Develops software",
      };

      const result = await service.create(newJobRole);

      expect(result).toMatchObject({
        id: expect.any(Number),
        title: "Software Engineer",
        description: "Develops software",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it("should create a new job role with only title", async () => {
      const newJobRole: NewJobRole = {
        title: "Product Manager",
      };

      const result = await service.create(newJobRole);

      expect(result).toMatchObject({
        id: expect.any(Number),
        title: "Product Manager",
        description: null,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it("should throw ValidationError when title is missing", async () => {
      const newJobRole = { title: "" } as NewJobRole;

      await expect(service.create(newJobRole)).rejects.toThrow(ValidationError);
      await expect(service.create(newJobRole)).rejects.toThrow("Job role title is required");
    });

    it("should throw ValidationError when title is only whitespace", async () => {
      const newJobRole: NewJobRole = { title: "   " };

      await expect(service.create(newJobRole)).rejects.toThrow(ValidationError);
      await expect(service.create(newJobRole)).rejects.toThrow("Job role title is required");
    });

    it("should throw DatabaseError when repository fails", async () => {
      const errorRepository = {
        create: vi.fn().mockRejectedValue(new Error("Database connection failed")),
      } as unknown as IJobRolesRepository;

      const errorService = new JobRolesService(errorRepository);
      const newJobRole: NewJobRole = { title: "Software Engineer" };

      await expect(errorService.create(newJobRole)).rejects.toThrow(DatabaseError);
      await expect(errorService.create(newJobRole)).rejects.toThrow("Failed to create job role");
    });
  });

  describe("update", () => {
    beforeEach(() => {
      const mockRole: JobRole = {
        id: 1,
        title: "Software Engineer",
        description: "Develops software",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepository.setMockData([mockRole]);
    });

    it("should update job role title", async () => {
      const updates = { title: "Senior Software Engineer" };

      const result = await service.update(1, updates);

      expect(result.title).toBe("Senior Software Engineer");
      expect(result.description).toBe("Develops software");
    });

    it("should update job role description", async () => {
      const updates = { description: "Develops and maintains software" };

      const result = await service.update(1, updates);

      expect(result.title).toBe("Software Engineer");
      expect(result.description).toBe("Develops and maintains software");
    });

    it("should update both title and description", async () => {
      const updates = {
        title: "Senior Software Engineer",
        description: "Leads development teams",
      };

      const result = await service.update(1, updates);

      expect(result.title).toBe("Senior Software Engineer");
      expect(result.description).toBe("Leads development teams");
    });

    it("should throw NotFoundError when job role does not exist", async () => {
      const updates = { title: "New Title" };

      await expect(service.update(999, updates)).rejects.toThrow(NotFoundError);
      await expect(service.update(999, updates)).rejects.toThrow("Job role with ID 999 not found");
    });

    it("should throw ValidationError for invalid id (non-integer)", async () => {
      const updates = { title: "New Title" };

      await expect(service.update(1.5, updates)).rejects.toThrow(ValidationError);
      await expect(service.update(1.5, updates)).rejects.toThrow("Invalid job role ID");
    });

    it("should throw ValidationError for invalid id (zero)", async () => {
      const updates = { title: "New Title" };

      await expect(service.update(0, updates)).rejects.toThrow(ValidationError);
      await expect(service.update(0, updates)).rejects.toThrow("Invalid job role ID");
    });

    it("should throw ValidationError for invalid id (negative)", async () => {
      const updates = { title: "New Title" };

      await expect(service.update(-1, updates)).rejects.toThrow(ValidationError);
      await expect(service.update(-1, updates)).rejects.toThrow("Invalid job role ID");
    });

    it("should throw ValidationError when title is empty string", async () => {
      const updates = { title: "" };

      await expect(service.update(1, updates)).rejects.toThrow(ValidationError);
      await expect(service.update(1, updates)).rejects.toThrow("Job role title cannot be empty");
    });

    it("should throw ValidationError when title is only whitespace", async () => {
      const updates = { title: "   " };

      await expect(service.update(1, updates)).rejects.toThrow(ValidationError);
      await expect(service.update(1, updates)).rejects.toThrow("Job role title cannot be empty");
    });

    it("should allow updating description to empty string", async () => {
      const updates = { description: "" };

      const result = await service.update(1, updates);

      expect(result.description).toBe("");
    });

    it("should throw DatabaseError when repository fails", async () => {
      const errorRepository = {
        update: vi.fn().mockRejectedValue(new Error("Database connection failed")),
      } as unknown as IJobRolesRepository;

      const errorService = new JobRolesService(errorRepository);
      const updates = { title: "New Title" };

      await expect(errorService.update(1, updates)).rejects.toThrow(DatabaseError);
      await expect(errorService.update(1, updates)).rejects.toThrow("Failed to update job role");
    });
  });

  describe("delete", () => {
    beforeEach(() => {
      const mockRole: JobRole = {
        id: 1,
        title: "Software Engineer",
        description: "Develops software",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepository.setMockData([mockRole]);
    });

    it("should delete a job role successfully", async () => {
      await expect(service.delete(1)).resolves.toBeUndefined();

      // Verify it's actually deleted
      const allRoles = await mockRepository.findAll();
      expect(allRoles).toHaveLength(0);
    });

    it("should throw NotFoundError when job role does not exist", async () => {
      await expect(service.delete(999)).rejects.toThrow(NotFoundError);
      await expect(service.delete(999)).rejects.toThrow("Job role with ID 999 not found");
    });

    it("should throw ValidationError for invalid id (non-integer)", async () => {
      await expect(service.delete(1.5)).rejects.toThrow(ValidationError);
      await expect(service.delete(1.5)).rejects.toThrow("Invalid job role ID");
    });

    it("should throw ValidationError for invalid id (zero)", async () => {
      await expect(service.delete(0)).rejects.toThrow(ValidationError);
      await expect(service.delete(0)).rejects.toThrow("Invalid job role ID");
    });

    it("should throw ValidationError for invalid id (negative)", async () => {
      await expect(service.delete(-1)).rejects.toThrow(ValidationError);
      await expect(service.delete(-1)).rejects.toThrow("Invalid job role ID");
    });

    it("should throw DatabaseError when repository fails", async () => {
      const errorRepository = {
        delete: vi.fn().mockRejectedValue(new Error("Database connection failed")),
      } as unknown as IJobRolesRepository;

      const errorService = new JobRolesService(errorRepository);

      await expect(errorService.delete(1)).rejects.toThrow(DatabaseError);
      await expect(errorService.delete(1)).rejects.toThrow("Failed to delete job role");
    });
  });
});
