import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationCreateBootcamp1745494883673 implements MigrationInterface {
    name = 'MigrationCreateBootcamp1745494883673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`bootcamp\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`website\` varchar(255) NULL, \`phone\` varchar(255) NULL, \`email\` varchar(255) NULL, \`address\` varchar(255) NOT NULL, \`careers\` text NOT NULL, \`housing\` tinyint NOT NULL DEFAULT 0, \`jobAssistance\` tinyint NOT NULL DEFAULT 0, \`jobGuarantee\` tinyint NOT NULL DEFAULT 0, \`acceptGi\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_fadf63172caad39223cc0c19f6\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_fadf63172caad39223cc0c19f6\` ON \`bootcamp\``);
        await queryRunner.query(`DROP TABLE \`bootcamp\``);
    }

}
