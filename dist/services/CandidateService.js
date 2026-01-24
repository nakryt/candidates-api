"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.candidateService = exports.CandidateService = void 0;
const database_1 = require("../config/database");
const Candidate_1 = require("../entities/Candidate");
const Skill_1 = require("../entities/Skill");
const errorHandler_1 = require("../middleware/errorHandler");
class CandidateService {
    constructor() {
        this.candidateRepository = database_1.AppDataSource.getRepository(Candidate_1.Candidate);
        this.skillRepository = database_1.AppDataSource.getRepository(Skill_1.Skill);
    }
    async getAllCandidates(page = 1, limit = 10) {
        const validPage = Math.max(1, page);
        const validLimit = Math.min(100, Math.max(1, limit));
        const offset = (validPage - 1) * validLimit;
        const [data, total] = await this.candidateRepository.findAndCount({
            relations: ["skills"],
            order: { createdAt: "DESC" },
            take: validLimit,
            skip: offset,
        });
        const totalPages = Math.ceil(total / validLimit);
        return {
            data,
            total,
            page: validPage,
            limit: validLimit,
            totalPages,
        };
    }
    async getCandidateById(id) {
        const candidate = await this.candidateRepository.findOne({
            where: { id },
            relations: ["skills"],
        });
        if (!candidate) {
            throw new errorHandler_1.AppError("Candidate not found", 404);
        }
        return candidate;
    }
    async updateStatus(id, status) {
        // Use transaction to ensure atomicity
        return await database_1.AppDataSource.transaction(async (transactionalEntityManager) => {
            const candidate = await transactionalEntityManager.findOne(Candidate_1.Candidate, {
                where: { id },
                relations: ["skills"],
            });
            if (!candidate) {
                throw new errorHandler_1.AppError("Candidate not found", 404);
            }
            candidate.status = status;
            return await transactionalEntityManager.save(Candidate_1.Candidate, candidate);
        });
    }
    async createCandidate(dto) {
        return await database_1.AppDataSource.transaction(async (transactionalEntityManager) => {
            const existingEmail = await transactionalEntityManager.findOne(Candidate_1.Candidate, {
                where: { email: dto.email },
            });
            if (existingEmail) {
                throw new errorHandler_1.AppError("Email already exists", 409);
            }
            const existingPhone = await transactionalEntityManager.findOne(Candidate_1.Candidate, {
                where: { phone: dto.phone },
            });
            if (existingPhone) {
                throw new errorHandler_1.AppError("Phone number already exists", 409);
            }
            const candidate = new Candidate_1.Candidate();
            candidate.name = dto.name;
            candidate.position = dto.position;
            candidate.email = dto.email;
            candidate.phone = dto.phone;
            candidate.description = dto.description || "";
            candidate.status = dto.status || Candidate_1.CandidateStatus.ACTIVE;
            if (dto.skillIds && dto.skillIds?.length > 0) {
                const skills = await transactionalEntityManager.findByIds(Skill_1.Skill, dto.skillIds);
                if (skills?.length !== dto.skillIds?.length) {
                    throw new errorHandler_1.AppError("One or more skills not found", 400);
                }
                candidate.skills = skills;
            }
            else {
                candidate.skills = [];
            }
            const savedCandidate = await transactionalEntityManager.save(Candidate_1.Candidate, candidate);
            const result = await transactionalEntityManager.findOne(Candidate_1.Candidate, {
                where: { id: savedCandidate.id },
                relations: ["skills"],
            });
            if (!result) {
                throw new errorHandler_1.AppError("Failed to create candidate", 500);
            }
            return result;
        });
    }
}
exports.CandidateService = CandidateService;
exports.candidateService = new CandidateService();
