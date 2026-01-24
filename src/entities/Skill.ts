import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Candidate } from "./Candidate";

@Entity("skills")
export class Skill {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @ManyToMany(() => Candidate, (candidate) => candidate.skills)
  candidates!: Candidate[];
}
