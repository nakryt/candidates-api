import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailPhoneConstraints1737568200000 implements MigrationInterface {
  name = "AddEmailPhoneConstraints1737568200000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    const duplicateEmails = await queryRunner.query(`
      SELECT email, COUNT(*) as count
      FROM candidates
      GROUP BY email
      HAVING COUNT(*) > 1
    `);

    const duplicatePhones = await queryRunner.query(`
      SELECT phone, COUNT(*) as count
      FROM candidates
      GROUP BY phone
      HAVING COUNT(*) > 1
    `);

    if (duplicateEmails?.length > 0) {
      throw new Error(
        `Found duplicate emails: ${duplicateEmails.map((r: any) => r.email).join(", ")}. ` +
          `Please clean up duplicates before running this migration.`,
      );
    }

    if (duplicatePhones?.length > 0) {
      throw new Error(
        `Found duplicate phones: ${duplicatePhones.map((r: any) => r.phone).join(", ")}. ` +
          `Please clean up duplicates before running this migration.`,
      );
    }

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_candidates_email" ON "candidates" ("email")
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_candidates_phone" ON "candidates" ("phone")
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_candidates_status" ON "candidates" ("status")
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'UQ_candidates_email'
        ) THEN
          ALTER TABLE "candidates" ADD CONSTRAINT "UQ_candidates_email" UNIQUE ("email");
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'UQ_candidates_phone'
        ) THEN
          ALTER TABLE "candidates" ADD CONSTRAINT "UQ_candidates_phone" UNIQUE ("phone");
        END IF;
      END $$;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "candidates" DROP CONSTRAINT IF EXISTS "UQ_candidates_phone"
    `);

    await queryRunner.query(`
      ALTER TABLE "candidates" DROP CONSTRAINT IF EXISTS "UQ_candidates_email"
    `);

    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_candidates_status"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_candidates_phone"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_candidates_email"`);
  }
}
