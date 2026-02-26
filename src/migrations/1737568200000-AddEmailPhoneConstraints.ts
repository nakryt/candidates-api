import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailPhoneConstraints1737568200000 implements MigrationInterface {
  name = "AddEmailPhoneConstraints1737568200000";

  public async up(_queryRunner: QueryRunner): Promise<void> {
    // No-op: all indexes and constraints in this migration were already
    // created by InitialSchema1737567600000 with IF NOT EXISTS guards.
    // This migration is kept in history to preserve migration order integrity.
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
