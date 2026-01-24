"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const Candidate_1 = require("../entities/Candidate");
const Skill_1 = require("../entities/Skill");
const seedData_1 = require("./seedData");
const seedDatabase = async () => {
    try {
        await database_1.AppDataSource.initialize();
        const candidateRepo = database_1.AppDataSource.getRepository(Candidate_1.Candidate);
        const skillRepo = database_1.AppDataSource.getRepository(Skill_1.Skill);
        const existingCandidates = await candidateRepo.count();
        if (existingCandidates > 0) {
            console.log(`Database already has ${existingCandidates} candidates. Skipping seed.`);
            process.exit(0);
        }
        console.log("Database is empty. Starting seed...");
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
            const existing = await candidateRepo.findOne({ where: { email: data.email } });
            if (existing) {
                console.log(`Candidate ${data.email} already exists. Skipping.`);
                continue;
            }
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
        console.log("Seeding completed!");
        process.exit(0);
    }
    catch (error) {
        console.error("Error during seeding:", error);
        process.exit(1);
    }
};
seedDatabase();
