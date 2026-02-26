import { NextFunction, Request, Response } from "express";
import { AppError } from "./errorHandler";

export const apiKeyAuth = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["x-api-key"];
  const expectedKey = process.env.API_KEY;

  if (!expectedKey) {
    if (process.env.NODE_ENV !== "production") {
      return next();
    }
    return next(new AppError("Server misconfiguration", 500));
  }

  if (!apiKey || apiKey !== expectedKey) {
    return res.status(401).json({
      status: "error",
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  next();
};
