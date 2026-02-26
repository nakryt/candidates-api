import { DataSource } from "typeorm";
import { AppDataSource } from "../config/database";
import { Skill } from "../entities/Skill";

export class SkillService {
  private skillRepository;

  constructor(dataSource: DataSource = AppDataSource) {
    this.skillRepository = dataSource.getRepository(Skill);
  }

  async getAllSkills(): Promise<Skill[]> {
    return await this.skillRepository.find({
      order: { name: "ASC" },
    });
  }
}

export const skillService = new SkillService();
