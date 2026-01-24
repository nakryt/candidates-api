"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SkillController_1 = require("../controllers/SkillController");
const router = (0, express_1.Router)();
router.get("/", SkillController_1.skillController.getAll);
exports.default = router;
