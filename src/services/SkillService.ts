import { AppDataSource } from "../config/database";
import { Skill } from "../entities/Skill";

export class SkillService {
  private skillRepository = AppDataSource.getRepository(Skill);

  async getAllSkills(): Promise<Skill[]> {
    return await this.skillRepository.find({
      order: { name: "ASC" },
    });
  }
}

export const skillService = new SkillService();
