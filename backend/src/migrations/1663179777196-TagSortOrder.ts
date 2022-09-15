import { MigrationInterface, QueryRunner } from "typeorm";

export class TagSortOrder1663179777196 implements MigrationInterface {
    name = 'TagSortOrder1663179777196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "sortOrder"`);
        await queryRunner.query(`ALTER TABLE "tags" ADD "sortOrder" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "sortOrder"`);
        await queryRunner.query(`ALTER TABLE "tags" ADD "sortOrder" integer NOT NULL`);
    }

}
