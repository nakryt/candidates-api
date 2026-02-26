import { DataSource, In } from "typeorm";
import { AppDataSource } from "../config/database";
import { CreateCandidateDto } from "../dto/CreateCandidateDto";
import { PaginatedResponse } from "../dto/PaginationDto";
import {
  CandidateDetailDto,
  CandidateListDto,
  toCandidateDetailDto,
  toCandidateListDto,
} from "../dto/CandidateResponseDto";
import { Candidate, CandidateStatus } from "../entities/Candidate";
import { Skill } from "../entities/Skill";
import { AppError } from "../middleware/errorHandler";

export class CandidateService {
  private candidateRepository;

  constructor(dataSource: DataSource = AppDataSource) {
    this.candidateRepository = dataSource.getRepository(Candidate);
  }

  async getAllCandidates(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponse<CandidateListDto>> {
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
      data: data.map(toCandidateListDto),
      total,
      page: validPage,
      limit: validLimit,
      totalPages,
    };
  }

  async getCandidateById(id: number): Promise<CandidateDetailDto> {
    const candidate = await this.candidateRepository.findOne({
      where: { id },
      relations: ["skills"],
    });

    if (!candidate) {
      throw new AppError("Candidate not found", 404);
    }

    return toCandidateDetailDto(candidate);
  }

  async updateStatus(id: number, status: CandidateStatus): Promise<CandidateDetailDto> {
    // Use transaction to ensure atomicity
    return await AppDataSource.transaction(
      async (transactionalEntityManager) => {
        const candidate = await transactionalEntityManager.findOne(Candidate, {
          where: { id },
          relations: ["skills"],
        });

        if (!candidate) {
          throw new AppError("Candidate not found", 404);
        }

        candidate.status = status;
        const saved = await transactionalEntityManager.save(Candidate, candidate);
        return toCandidateDetailDto(saved);
      },
    );
  }

  async createCandidate(dto: CreateCandidateDto): Promise<CandidateDetailDto> {
    return await AppDataSource.transaction(
      async (transactionalEntityManager) => {
        const existingEmail = await transactionalEntityManager.findOne(
          Candidate,
          {
            where: { email: dto.email },
          },
        );

        if (existingEmail) {
          throw new AppError("Email already exists", 409);
        }

        const existingPhone = await transactionalEntityManager.findOne(
          Candidate,
          {
            where: { phone: dto.phone },
          },
        );

        if (existingPhone) {
          throw new AppError("Phone number already exists", 409);
        }

        const candidate = new Candidate();
        candidate.name = dto.name;
        candidate.position = dto.position;
        candidate.email = dto.email;
        candidate.phone = dto.phone;
        candidate.description = dto.description ?? "";
        candidate.status = dto.status || CandidateStatus.ACTIVE;

        if (dto.skillIds && dto.skillIds?.length > 0) {
          const skills = await transactionalEntityManager.findBy(Skill, {
            id: In(dto.skillIds),
          });

          if (skills?.length !== dto.skillIds?.length) {
            throw new AppError("One or more skills not found", 400);
          }

          candidate.skills = skills;
        } else {
          candidate.skills = [];
        }

        const savedCandidate = await transactionalEntityManager.save(
          Candidate,
          candidate,
        );

        const result = await transactionalEntityManager.findOne(Candidate, {
          where: { id: savedCandidate.id },
          relations: ["skills"],
        });

        if (!result) {
          throw new AppError("Failed to create candidate", 500);
        }

        return toCandidateDetailDto(result);
      },
    );
  }
}

export const candidateService = new CandidateService();
