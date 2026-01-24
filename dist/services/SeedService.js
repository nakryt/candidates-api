"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const Candidate_1 = require("../entities/Candidate");
const Skill_1 = require("../entities/Skill");
const seedData_1 = require("../seeds/seedData");
class SeedService {
    static async seed(dataSource) {
        try {
            const candidateRepo = dataSource.getRepository(Candidate_1.Candidate);
            const skillRepo = dataSource.getRepository(Skill_1.Skill);
            const candidateCount = await candidateRepo.count();
            if (candidateCount > 0) {
                console.log("Database already has data, skipping seed.");
                return;
            }
            console.log("Starting database seed...");
            const skills = [];
            for (const skillName of seedData_1.skillsData) {
                let skill = await skillRepo.findOne({ where: { name: skillName } });
                if (!skill) {
                    skill = new Skill_1.Skill();
                    skill.name = skillName;
                    skill = await skillRepo.save(skill);
                }
                skills.push(skill);
            }
            for (const data of seedData_1.candidatesData) {
                const candidate = new Candidate_1.Candidate();
                candidate.name = data.name;
                candidate.position = data.position;
                candidate.status = data.status;
                candidate.email = data.email;
                candidate.phone = data.phone;
                candidate.description = data.description;
                candidate.skills = skills.filter((s) => data.skills.includes(s.name));
                await candidateRepo.save(candidate);
            }
            console.log("Seeding completed successfully!");
        }
        catch (error) {
            console.error("Error during seeding:", error);
        }
    }
}
exports.SeedService = SeedService;
