import { CandidateStatus } from "../entities/Candidate";

export interface SkillDto {
  id: number;
  name: string;
}

// Returned by GET /candidates (list) — no PII
export interface CandidateListDto {
  id: number;
  name: string;
  position: string;
  status: CandidateStatus;
  skills: SkillDto[];
  createdAt: Date;
  updatedAt: Date;
}

// Returned by GET /candidates/:id (detail) and POST/PATCH — full data
export interface CandidateDetailDto {
  id: number;
  name: string;
  position: string;
  status: CandidateStatus;
  email: string;
  phone: string;
  description: string;
  skills: SkillDto[];
  createdAt: Date;
  updatedAt: Date;
}

export function toCandidateListDto(candidate: {
  id: number;
  name: string;
  position: string;
  status: CandidateStatus;
  skills: { id: number; name: string }[];
  createdAt: Date;
  updatedAt: Date;
}): CandidateListDto {
  return {
    id: candidate.id,
    name: candidate.name,
    position: candidate.position,
    status: candidate.status,
    skills: candidate.skills.map((s) => ({ id: s.id, name: s.name })),
    createdAt: candidate.createdAt,
    updatedAt: candidate.updatedAt,
  };
}

export function toCandidateDetailDto(candidate: {
  id: number;
  name: string;
  position: string;
  status: CandidateStatus;
  email: string;
  phone: string;
  description: string;
  skills: { id: number; name: string }[];
  createdAt: Date;
  updatedAt: Date;
}): CandidateDetailDto {
  return {
    id: candidate.id,
    name: candidate.name,
    position: candidate.position,
    status: candidate.status,
    email: candidate.email,
    phone: candidate.phone,
    description: candidate.description,
    skills: candidate.skills.map((s) => ({ id: s.id, name: s.name })),
    createdAt: candidate.createdAt,
    updatedAt: candidate.updatedAt,
  };
}
