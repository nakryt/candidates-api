import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsEmail, IsEnum, IsPhoneNumber, Length } from "class-validator";
import { Skill } from "./Skill";

export enum CandidateStatus {
  ACTIVE = "active",
  INTERVIEW = "interview",
  REJECTED = "rejected",
}

@Entity("candidates")
export class Candidate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Length(2, 100, { message: "Name must be between 2 and 100 characters" })
  @Column()
  name!: string;

  @Length(2, 100, { message: "Position must be between 2 and 100 characters" })
  @Column()
  position!: string;

  @IsEnum(CandidateStatus, {
    message: "Status must be active, interview, or rejected",
  })
  @Index()
  @Column({
    type: "enum",
    enum: CandidateStatus,
    default: CandidateStatus.ACTIVE,
  })
  status!: CandidateStatus;

  @IsEmail({}, { message: "Invalid email format" })
  @Index()
  @Column({ unique: true })
  email!: string;

  @IsPhoneNumber(undefined, { message: "Invalid phone number format" })
  @Index()
  @Column({ unique: true })
  phone!: string;

  @Length(10, 2000, {
    message: "Description must be between 10 and 2000 characters",
  })
  @Column("text")
  description!: string;

  @ManyToMany(() => Skill, (skill) => skill.candidates)
  @JoinTable({
    name: "candidate_skills",
    joinColumn: { name: "candidateId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "skillId", referencedColumnName: "id" },
  })
  skills!: Skill[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
