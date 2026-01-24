"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialSchema1737567600000 = void 0;
class InitialSchema1737567600000 {
    constructor() {
        this.name = "InitialSchema1737567600000";
    }
    async up(queryRunner) {
        await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'candidate_status_enum') THEN
          CREATE TYPE "candidate_status_enum" AS ENUM('active', 'interview', 'rejected');
        END IF;
      END $$;
    `);
        await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "candidates" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "position" character varying NOT NULL,
        "status" "candidate_status_enum" NOT NULL DEFAULT 'active',
        "email" character varying NOT NULL,
        "phone" character varying NOT NULL,
        "description" text NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_candidates_id" PRIMARY KEY ("id")
      )
    `);
        await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "skills" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        CONSTRAINT "PK_skills_id" PRIMARY KEY ("id")
      )
    `);
        await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "candidate_skills" (
        "candidateId" integer NOT NULL,
        "skillId" integer NOT NULL,
        CONSTRAINT "PK_candidate_skills" PRIMARY KEY ("candidateId", "skillId")
      )
    `);
        await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_candidate_skills_candidateId') THEN
          ALTER TABLE "candidate_skills"
          ADD CONSTRAINT "FK_candidate_skills_candidateId"
          FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        END IF;
      END $$;
    `);
        await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_candidate_skills_skillId') THEN
          ALTER TABLE "candidate_skills"
          ADD CONSTRAINT "FK_candidate_skills_skillId"
          FOREIGN KEY ("skillId") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        END IF;
      END $$;
    `);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_candidate_skills_candidateId" ON "candidate_skills" ("candidateId")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_candidate_skills_skillId" ON "candidate_skills" ("skillId")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_candidates_email" ON "candidates" ("email")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_candidates_phone" ON "candidates" ("phone")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_candidates_status" ON "candidates" ("status")`);
        await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'UQ_candidates_email') THEN
          ALTER TABLE "candidates" ADD CONSTRAINT "UQ_candidates_email" UNIQUE ("email");
        END IF;
      END $$;
    `);
        await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'UQ_candidates_phone') THEN
          ALTER TABLE "candidates" ADD CONSTRAINT "UQ_candidates_phone" UNIQUE ("phone");
        END IF;
      END $$;
    `);
        await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'UQ_skills_name') THEN
          ALTER TABLE "skills" ADD CONSTRAINT "UQ_skills_name" UNIQUE ("name");
        END IF;
      END $$;
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_candidates_status"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_candidates_phone"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_candidates_email"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_candidate_skills_skillId"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_candidate_skills_candidateId"`);
        await queryRunner.query(`ALTER TABLE "candidate_skills" DROP CONSTRAINT IF EXISTS "FK_candidate_skills_skillId"`);
        await queryRunner.query(`ALTER TABLE "candidate_skills" DROP CONSTRAINT IF EXISTS "FK_candidate_skills_candidateId"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "candidate_skills"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "skills"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "candidates"`);
        await queryRunner.query(`DROP TYPE IF EXISTS "candidate_status_enum"`);
    }
}
exports.InitialSchema1737567600000 = InitialSchema1737567600000;
