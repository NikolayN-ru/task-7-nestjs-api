import { MigrationInterface, QueryRunner } from "typeorm";

export class tagsUuid1663178918956 implements MigrationInterface {
    name = 'tagsUuid1663178918956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "creator"`);
        await queryRunner.query(`ALTER TABLE "tags" ADD "creator" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "creator"`);
        await queryRunner.query(`ALTER TABLE "tags" ADD "creator" integer NOT NULL`);
    }

}
