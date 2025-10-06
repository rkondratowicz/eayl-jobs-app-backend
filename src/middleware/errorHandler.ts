import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  // Default error values
  let statusCode = 500;
  let message = "Internal Server Error";
  let isOperational = false;

  // Check if it's an operational error (AppError or its subclasses)
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    isOperational = err.isOperational;
  }

  // Log error for debugging (in production, use a proper logger)
  if (!isOperational) {
    console.error("💥 Unexpected Error:", err);
  } else {
    console.log(`⚠️  Operational Error: ${message}`);
  }

  // Send JSON error response
  res.status(statusCode).json({
    error: message,
    ...(process.env["NODE_ENV"] === "development" && !isOperational && { stack: err.stack }),
  });
};
