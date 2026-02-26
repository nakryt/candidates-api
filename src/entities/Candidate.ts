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

  @Column()
  name!: string;

  @Column()
  position!: string;

  @Index()
  @Column({
    type: "enum",
    enum: CandidateStatus,
    default: CandidateStatus.ACTIVE,
  })
  status!: CandidateStatus;

  @Index()
  @Column({ unique: true })
  email!: string;

  @Index()
  @Column({ unique: true })
  phone!: string;

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
