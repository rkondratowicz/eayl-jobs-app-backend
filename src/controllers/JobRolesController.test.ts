import type { NextFunction, Request, Response } from "express";
import { beforeEach, describe, expect, it, type Mock, vi } from "vitest";
import { DatabaseError, NotFoundError, ValidationError } from "../errors/AppError.js";
import type { JobRole, NewJobRole } from "../models/jobRoles.schema.js";
import type { JobRolesService } from "../services/JobRolesService.js";
import { JobRolesController } from "./JobRolesController.js";

// Mock Express Request
const mockRequest = (params = {}, body = {}): Partial<Request> => ({
  params,
  body,
});

// Mock Express Response
const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.json = vi.fn().mockReturnValue(res);
  res.status = vi.fn().mockReturnValue(res);
  res.send = vi.fn().mockReturnValue(res);
  return res;
};

// Mock NextFunction
const mockNext = (): NextFunction => vi.fn();

// Mock JobRolesService with proper types
interface MockJobRolesService {
  findAll: Mock;
  findById: Mock;
  create: Mock;
  update: Mock;
  delete: Mock;
}

const mockJobRolesService = (): MockJobRolesService => ({
  findAll: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
});

describe("JobRolesController", () => {
  let controller: JobRolesController;
  let service: MockJobRolesService;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    service = mockJobRolesService();
    controller = new JobRolesController(service as unknown as JobRolesService);
    req = mockRequest();
    res = mockResponse();
    next = mockNext();
  });

  describe("getAllJobRoles", () => {
    it("should return all job roles with status 200", async () => {
      const mockJobRoles: JobRole[] = [
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

      service.findAll.mockResolvedValue(mockJobRoles);

      await controller.getAllJobRoles(req as Request, res as Response, next);

      expect(service.findAll).toHaveBeenCalledOnce();
      expect(res.json).toHaveBeenCalledWith(mockJobRoles);
      expect(next).not.toHaveBeenCalled();
    });

    it("should return empty array when no job roles exist", async () => {
      service.findAll.mockResolvedValue([]);

      await controller.getAllJobRoles(req as Request, res as Response, next);

      expect(service.findAll).toHaveBeenCalledOnce();
      expect(res.json).toHaveBeenCalledWith([]);
      expect(next).not.toHaveBeenCalled();
    });

    it("should call next with error when service throws DatabaseError", async () => {
      const error = new DatabaseError("Failed to retrieve job roles");
      service.findAll.mockRejectedValue(error);

      await controller.getAllJobRoles(req as Request, res as Response, next);

      expect(service.findAll).toHaveBeenCalledOnce();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });

    it("should call next with error when service throws generic error", async () => {
      const error = new Error("Unexpected error");
      service.findAll.mockRejectedValue(error);

      await controller.getAllJobRoles(req as Request, res as Response, next);

      expect(service.findAll).toHaveBeenCalledOnce();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("getJobRoleById", () => {
    it("should return job role by id with status 200", async () => {
      const mockJobRole: JobRole = {
        id: 1,
        title: "Software Engineer",
        description: "Develops software",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      req = mockRequest({ id: "1" });
      service.findById.mockResolvedValue(mockJobRole);

      await controller.getJobRoleById(req as Request, res as Response, next);

      expect(service.findById).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith(mockJobRole);
      expect(next).not.toHaveBeenCalled();
    });

    it("should parse id parameter correctly", async () => {
      const mockJobRole: JobRole = {
        id: 42,
        title: "Data Scientist",
        description: "Analyzes data",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      req = mockRequest({ id: "42" });
      service.findById.mockResolvedValue(mockJobRole);

      await controller.getJobRoleById(req as Request, res as Response, next);

      expect(service.findById).toHaveBeenCalledWith(42);
      expect(res.json).toHaveBeenCalledWith(mockJobRole);
    });

    it("should call next with error when id parameter is missing", async () => {
      req = mockRequest({});

      await controller.getJobRoleById(req as Request, res as Response, next);

      expect(service.findById).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "ID parameter is required",
        })
      );
    });

    it("should call next with error when service throws NotFoundError", async () => {
      const error = new NotFoundError("Job role with ID 999 not found");
      req = mockRequest({ id: "999" });
      service.findById.mockRejectedValue(error);

      await controller.getJobRoleById(req as Request, res as Response, next);

      expect(service.findById).toHaveBeenCalledWith(999);
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });

    it("should call next with error when service throws ValidationError", async () => {
      const error = new ValidationError("Invalid job role ID");
      req = mockRequest({ id: "-1" });
      service.findById.mockRejectedValue(error);

      await controller.getJobRoleById(req as Request, res as Response, next);

      expect(service.findById).toHaveBeenCalledWith(-1);
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });

    it("should handle non-numeric id parameter", async () => {
      req = mockRequest({ id: "abc" });
      service.findById.mockRejectedValue(new ValidationError("Invalid job role ID"));

      await controller.getJobRoleById(req as Request, res as Response, next);

      expect(service.findById).toHaveBeenCalledWith(Number.NaN);
      expect(next).toHaveBeenCalled();
    });
  });

  describe("createJobRole", () => {
    it("should create job role with status 201", async () => {
      const newJobRole: NewJobRole = {
        title: "Software Engineer",
        description: "Develops software",
      };

      const createdJobRole: JobRole = {
        id: 1,
        title: newJobRole.title,
        description: newJobRole.description ?? null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      req = mockRequest({}, newJobRole);
      service.create.mockResolvedValue(createdJobRole);

      await controller.createJobRole(req as Request, res as Response, next);

      expect(service.create).toHaveBeenCalledWith(newJobRole);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdJobRole);
      expect(next).not.toHaveBeenCalled();
    });

    it("should create job role with only title", async () => {
      const newJobRole: NewJobRole = {
        title: "Product Manager",
      };

      const createdJobRole: JobRole = {
        id: 2,
        title: "Product Manager",
        description: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      req = mockRequest({}, newJobRole);
      service.create.mockResolvedValue(createdJobRole);

      await controller.createJobRole(req as Request, res as Response, next);

      expect(service.create).toHaveBeenCalledWith(newJobRole);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdJobRole);
    });

    it("should call next with error when service throws ValidationError", async () => {
      const newJobRole: NewJobRole = {
        title: "",
      };

      const error = new ValidationError("Job role title is required");
      req = mockRequest({}, newJobRole);
      service.create.mockRejectedValue(error);

      await controller.createJobRole(req as Request, res as Response, next);

      expect(service.create).toHaveBeenCalledWith(newJobRole);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });

    it("should call next with error when service throws DatabaseError", async () => {
      const newJobRole: NewJobRole = {
        title: "Software Engineer",
      };

      const error = new DatabaseError("Failed to create job role");
      req = mockRequest({}, newJobRole);
      service.create.mockRejectedValue(error);

      await controller.createJobRole(req as Request, res as Response, next);

      expect(service.create).toHaveBeenCalledWith(newJobRole);
      expect(res.status).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });

    it("should handle empty request body", async () => {
      req = mockRequest({}, {});
      const error = new ValidationError("Job role title is required");
      service.create.mockRejectedValue(error);

      await controller.createJobRole(req as Request, res as Response, next);

      expect(service.create).toHaveBeenCalledWith({});
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("updateJobRole", () => {
    it("should update job role with status 200", async () => {
      const updates: Partial<NewJobRole> = {
        title: "Senior Software Engineer",
      };

      const updatedJobRole: JobRole = {
        id: 1,
        title: "Senior Software Engineer",
        description: "Develops software",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      req = mockRequest({ id: "1" }, updates);
      service.update.mockResolvedValue(updatedJobRole);

      await controller.updateJobRole(req as Request, res as Response, next);

      expect(service.update).toHaveBeenCalledWith(1, updates);
      expect(res.json).toHaveBeenCalledWith(updatedJobRole);
      expect(next).not.toHaveBeenCalled();
    });

    it("should update only description", async () => {
      const updates: Partial<NewJobRole> = {
        description: "Updated description",
      };

      const updatedJobRole: JobRole = {
        id: 1,
        title: "Software Engineer",
        description: "Updated description",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      req = mockRequest({ id: "1" }, updates);
      service.update.mockResolvedValue(updatedJobRole);

      await controller.updateJobRole(req as Request, res as Response, next);

      expect(service.update).toHaveBeenCalledWith(1, updates);
      expect(res.json).toHaveBeenCalledWith(updatedJobRole);
    });

    it("should update both title and description", async () => {
      const updates: Partial<NewJobRole> = {
        title: "Lead Engineer",
        description: "Leads the team",
      };

      const updatedJobRole: JobRole = {
        id: 1,
        title: "Lead Engineer",
        description: "Leads the team",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      req = mockRequest({ id: "1" }, updates);
      service.update.mockResolvedValue(updatedJobRole);

      await controller.updateJobRole(req as Request, res as Response, next);

      expect(service.update).toHaveBeenCalledWith(1, updates);
      expect(res.json).toHaveBeenCalledWith(updatedJobRole);
    });

    it("should call next with error when id parameter is missing", async () => {
      req = mockRequest({}, { title: "New Title" });

      await controller.updateJobRole(req as Request, res as Response, next);

      expect(service.update).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "ID parameter is required",
        })
      );
    });

    it("should call next with error when service throws NotFoundError", async () => {
      const error = new NotFoundError("Job role with ID 999 not found");
      req = mockRequest({ id: "999" }, { title: "New Title" });
      service.update.mockRejectedValue(error);

      await controller.updateJobRole(req as Request, res as Response, next);

      expect(service.update).toHaveBeenCalledWith(999, { title: "New Title" });
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });

    it("should call next with error when service throws ValidationError", async () => {
      const error = new ValidationError("Invalid job role ID");
      req = mockRequest({ id: "-1" }, { title: "New Title" });
      service.update.mockRejectedValue(error);

      await controller.updateJobRole(req as Request, res as Response, next);

      expect(service.update).toHaveBeenCalledWith(-1, { title: "New Title" });
      expect(next).toHaveBeenCalledWith(error);
    });

    it("should handle empty update body", async () => {
      const updatedJobRole: JobRole = {
        id: 1,
        title: "Software Engineer",
        description: "Develops software",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      req = mockRequest({ id: "1" }, {});
      service.update.mockResolvedValue(updatedJobRole);

      await controller.updateJobRole(req as Request, res as Response, next);

      expect(service.update).toHaveBeenCalledWith(1, {});
      expect(res.json).toHaveBeenCalledWith(updatedJobRole);
    });
  });

  describe("deleteJobRole", () => {
    it("should delete job role with status 204", async () => {
      req = mockRequest({ id: "1" });
      service.delete.mockResolvedValue(undefined);

      await controller.deleteJobRole(req as Request, res as Response, next);

      expect(service.delete).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalledOnce();
      expect(next).not.toHaveBeenCalled();
    });

    it("should parse id parameter correctly", async () => {
      req = mockRequest({ id: "42" });
      service.delete.mockResolvedValue(undefined);

      await controller.deleteJobRole(req as Request, res as Response, next);

      expect(service.delete).toHaveBeenCalledWith(42);
      expect(res.status).toHaveBeenCalledWith(204);
    });

    it("should call next with error when id parameter is missing", async () => {
      req = mockRequest({});

      await controller.deleteJobRole(req as Request, res as Response, next);

      expect(service.delete).not.toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "ID parameter is required",
        })
      );
    });

    it("should call next with error when service throws NotFoundError", async () => {
      const error = new NotFoundError("Job role with ID 999 not found");
      req = mockRequest({ id: "999" });
      service.delete.mockRejectedValue(error);

      await controller.deleteJobRole(req as Request, res as Response, next);

      expect(service.delete).toHaveBeenCalledWith(999);
      expect(res.status).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });

    it("should call next with error when service throws ValidationError", async () => {
      const error = new ValidationError("Invalid job role ID");
      req = mockRequest({ id: "0" });
      service.delete.mockRejectedValue(error);

      await controller.deleteJobRole(req as Request, res as Response, next);

      expect(service.delete).toHaveBeenCalledWith(0);
      expect(res.status).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });

    it("should call next with error when service throws DatabaseError", async () => {
      const error = new DatabaseError("Failed to delete job role");
      req = mockRequest({ id: "1" });
      service.delete.mockRejectedValue(error);

      await controller.deleteJobRole(req as Request, res as Response, next);

      expect(service.delete).toHaveBeenCalledWith(1);
      expect(res.status).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
