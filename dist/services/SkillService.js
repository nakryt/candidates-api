"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillService = exports.SkillService = void 0;
const database_1 = require("../config/database");
const Skill_1 = require("../entities/Skill");
class SkillService {
    constructor() {
        this.skillRepository = database_1.AppDataSource.getRepository(Skill_1.Skill);
    }
    async getAllSkills() {
        return await this.skillRepository.find({
            order: { name: "ASC" },
        });
    }
}
exports.SkillService = SkillService;
exports.skillService = new SkillService();
