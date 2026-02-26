import { DataSource } from "typeorm";
import { Candidate } from "../entities/Candidate";
import { Skill } from "../entities/Skill";
import { candidatesData, skillsData } from "../seeds/seedData";
import { logger } from "../utils/logger";

export class SeedService {
  static async seed(dataSource: DataSource) {
    try {
      const candidateRepo = dataSource.getRepository(Candidate);
      const skillRepo = dataSource.getRepository(Skill);

      const candidateCount = await candidateRepo.count();
      if (candidateCount > 0) {
        logger.info("Database already has data, skipping seed.");
        return;
      }

      logger.info("Starting database seed...");

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

      logger.info("Seeding completed successfully!");
    } catch (error) {
      logger.error({ err: error }, "Error during seeding");
    }
  }
}
