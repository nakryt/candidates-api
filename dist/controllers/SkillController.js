"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillController = exports.SkillController = void 0;
const SkillService_1 = require("../services/SkillService");
class SkillController {
    async getAll(req, res, next) {
        try {
            const skills = await SkillService_1.skillService.getAllSkills();
            res.json(skills);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.SkillController = SkillController;
exports.skillController = new SkillController();
