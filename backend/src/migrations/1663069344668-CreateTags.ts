import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTags1663069344668 implements MigrationInterface {
    name = 'CreateTags1663069344668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "creator" integer NOT NULL, "name" character varying NOT NULL, "sortOrder" integer NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
