import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";

export const validateDto = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(dtoClass, req.body);
    const errors = await validate(dto);

    if (errors?.length > 0) {
      const messages = errors.map((error: ValidationError) =>
        Object.values(error.constraints || {}).join(", "),
      );

      return res.status(400).json({
        status: "error",
        statusCode: 400,
        message: "Validation failed",
        errors: messages,
      });
    }

    req.body = dto;
    next();
  };
};

export const validateQuery = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(dtoClass, req.query as object);
    const errors = await validate(dto as object);

    if (errors?.length > 0) {
      const messages = errors.map((error: ValidationError) =>
        Object.values(error.constraints || {}).join(", "),
      );

      return res.status(400).json({
        status: "error",
        statusCode: 400,
        message: "Validation failed",
        errors: messages,
      });
    }
    next();
  };
};
