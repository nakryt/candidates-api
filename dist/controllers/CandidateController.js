"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.candidateController = exports.CandidateController = void 0;
const CandidateService_1 = require("../services/CandidateService");
class CandidateController {
    async getAll(req, res, next) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const paginatedResult = await CandidateService_1.candidateService.getAllCandidates(page, limit);
            res.json(paginatedResult);
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const candidate = await CandidateService_1.candidateService.getCandidateById(Number(id));
            res.json(candidate);
        }
        catch (error) {
            next(error);
        }
    }
    async updateStatus(req, res, next) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const updatedCandidate = await CandidateService_1.candidateService.updateStatus(Number(id), status);
            res.json(updatedCandidate);
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            const newCandidate = await CandidateService_1.candidateService.createCandidate(req.body);
            res.status(201).json(newCandidate);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CandidateController = CandidateController;
exports.candidateController = new CandidateController();
