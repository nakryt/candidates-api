import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const isOperational = err instanceof AppError;
  const statusCode = isOperational ? err.statusCode : 500;

  // Always log full error server-side
  logger.error({ err, path: req.path, method: req.method }, "Request error");

  // Only expose controlled AppError messages; mask everything else
  const message = isOperational ? err.message : "Internal Server Error";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};
