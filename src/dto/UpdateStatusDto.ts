import { IsEnum, IsNotEmpty } from "class-validator";
import { CandidateStatus } from "../entities/Candidate";

export class UpdateStatusDto {
  @IsNotEmpty({ message: "Status is required" })
  @IsEnum(CandidateStatus, {
    message: `Status must be one of: ${Object.values(CandidateStatus).join(", ")}`,
  })
  status!: CandidateStatus;
}
