import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";

type ClassConstructor<T extends object> = new (...args: unknown[]) => T;

export const validateDto = <T extends object>(dtoClass: ClassConstructor<T>) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dto = plainToInstance(dtoClass, req.body);
    const errors = await validate(dto as object, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors?.length > 0) {
      const messages = errors.map((error: ValidationError) =>
        Object.values(error.constraints || {}).join(", "),
      );

      res.status(400).json({
        status: "error",
        statusCode: 400,
        message: "Validation failed",
        errors: messages,
      });
      return;
    }

    req.body = dto;
    next();
  };
};

export const validateQuery = <T extends object>(dtoClass: ClassConstructor<T>) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dto = plainToInstance(dtoClass, req.query as object);
    const errors = await validate(dto as object, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors?.length > 0) {
      const messages = errors.map((error: ValidationError) =>
        Object.values(error.constraints || {}).join(", "),
      );

      res.status(400).json({
        status: "error",
        statusCode: 400,
        message: "Validation failed",
        errors: messages,
      });
      return;
    }

    // Write transformed DTO back so controllers get properly typed values
    (req as Request & { validatedQuery: T }).validatedQuery = dto;
    next();
  };
};
