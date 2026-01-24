import { AppDataSource } from "../config/database";
import { Candidate } from "../entities/Candidate";
import { Skill } from "../entities/Skill";
import { candidatesData, skillsData } from "./seedData";

const seedDatabase = async () => {
  try {
    await AppDataSource.initialize();

    const candidateRepo = AppDataSource.getRepository(Candidate);
    const skillRepo = AppDataSource.getRepository(Skill);

    const existingCandidates = await candidateRepo.count();
    if (existingCandidates > 0) {
      console.log(`Database already has ${existingCandidates} candidates. Skipping seed.`);
      process.exit(0);
    }

    console.log("Database is empty. Starting seed...");

    const skills: Skill[] = [];
    for (const skillName of skillsData) {
      let skill = await skillRepo.findOne({ where: { name: skillName } });
      if (!skill) {
        skill = new Skill();
        skill.name = skillName;
        skill = await skillRepo.save(skill);
      }
      skills.push(skill);
    }

    for (const data of candidatesData) {
      const existing = await candidateRepo.findOne({ where: { email: data.email } });
      if (existing) {
        console.log(`Candidate ${data.email} already exists. Skipping.`);
        continue;
      }

      const candidate = new Candidate();
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
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
};

seedDatabase();
