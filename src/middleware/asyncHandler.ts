import type { NextFunction, Request, Response } from "express";

/**
 * Async handler wrapper to catch rejected promises and pass errors to Express error middleware.
 * This eliminates the need for try-catch blocks in every async controller method.
 *
 * @param fn - Async route handler function
 * @returns Wrapped route handler that catches errors
 *
 * @example
 * ```ts
 * router.get('/users', asyncHandler(async (req, res) => {
 *   const users = await userService.findAll();
 *   res.json(users);
 * }));
 * ```
 */
export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
