import { NextFunction, Request, Response } from "express";
import { candidateService } from "../services/CandidateService";

export class CandidateController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
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

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(String(req.params.id), 10);
      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ status: "error", statusCode: 400, message: "Invalid candidate ID" });
        return;
      }
      const candidate = await candidateService.getCandidateById(id);
      res.json(candidate);
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(String(req.params.id), 10);
      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ status: "error", statusCode: 400, message: "Invalid candidate ID" });
        return;
      }
      const { status } = req.body;
      const updatedCandidate = await candidateService.updateStatus(
        id,
        status,
      );
      res.json(updatedCandidate);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newCandidate = await candidateService.createCandidate(req.body);
      res.status(201).json(newCandidate);
    } catch (error) {
      next(error);
    }
  }
}

export const candidateController = new CandidateController();
