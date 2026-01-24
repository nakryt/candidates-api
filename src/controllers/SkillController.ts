import { NextFunction, Request, Response } from "express";
import { skillService } from "../services/SkillService";

export class SkillController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const skills = await skillService.getAllSkills();
      res.json(skills);
    } catch (error) {
      next(error);
    }
  }
}

export const skillController = new SkillController();
