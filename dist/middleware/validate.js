"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = exports.validateDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const validateDto = (dtoClass) => {
    return async (req, res, next) => {
        const dto = (0, class_transformer_1.plainToInstance)(dtoClass, req.body);
        const errors = await (0, class_validator_1.validate)(dto);
        if (errors?.length > 0) {
            const messages = errors.map((error) => Object.values(error.constraints || {}).join(", "));
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
exports.validateDto = validateDto;
const validateQuery = (dtoClass) => {
    return async (req, res, next) => {
        const dto = (0, class_transformer_1.plainToInstance)(dtoClass, req.query);
        const errors = await (0, class_validator_1.validate)(dto);
        if (errors?.length > 0) {
            const messages = errors.map((error) => Object.values(error.constraints || {}).join(", "));
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
exports.validateQuery = validateQuery;
