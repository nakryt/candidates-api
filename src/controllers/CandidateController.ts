import { NextFunction, Request, Response } from "express";
import { candidateService } from "../services/CandidateService";

export class CandidateController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 10 } = req.query as {
        page?: number;
        limit?: number;
      };

      const paginatedResult = await candidateService.getAllCandidates(
        page,
        limit,
      );
      res.json(paginatedResult);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const candidate = await candidateService.getCandidateById(Number(id));
      res.json(candidate);
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedCandidate = await candidateService.updateStatus(
        Number(id),
        status,
      );
      res.json(updatedCandidate);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newCandidate = await candidateService.createCandidate(req.body);
      res.status(201).json(newCandidate);
    } catch (error) {
      next(error);
    }
  }
}

export const candidateController = new CandidateController();
