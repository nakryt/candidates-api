import { IsEnum } from "class-validator";
import { CandidateStatus } from "../entities/Candidate";

export class UpdateStatusDto {
  @IsEnum(CandidateStatus, {
    message: `Status must be one of: ${Object.values(CandidateStatus).join(", ")}`,
  })
  status!: CandidateStatus;
}
