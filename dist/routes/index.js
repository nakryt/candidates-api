"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const candidateRoutes_1 = __importDefault(require("./candidateRoutes"));
const skillRoutes_1 = __importDefault(require("./skillRoutes"));
const rateLimiter_1 = require("../middleware/rateLimiter");
const router = (0, express_1.Router)();
router.use("/candidates", rateLimiter_1.apiLimiter, candidateRoutes_1.default);
router.use("/skills", rateLimiter_1.apiLimiter, skillRoutes_1.default);
exports.default = router;
