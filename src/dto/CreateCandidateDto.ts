import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  Length,
} from "class-validator";
import { CandidateStatus } from "../entities/Candidate";

export class CreateCandidateDto {
  @IsNotEmpty({ message: "Name is required" })
  @Length(2, 100, { message: "Name must be between 2 and 100 characters" })
  name!: string;

  @IsNotEmpty({ message: "Position is required" })
  @Length(2, 100, { message: "Position must be between 2 and 100 characters" })
  position!: string;

  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Email is required" })
  email!: string;

  @IsPhoneNumber(undefined, { message: "Invalid phone number format" })
  @IsNotEmpty({ message: "Phone is required" })
  phone!: string;

  @IsOptional()
  @Length(10, 2000, {
    message: "Description must be between 10 and 2000 characters",
  })
  description?: string;

  @IsOptional()
  @IsEnum(CandidateStatus, {
    message: `Status must be one of: ${Object.values(CandidateStatus).join(", ")}`,
  })
  status?: CandidateStatus;

  @IsOptional()
  @IsArray({ message: "Skills must be an array" })
  @ArrayMinSize(0, { message: "Skills array cannot be empty if provided" })
  skillIds?: number[];
}
