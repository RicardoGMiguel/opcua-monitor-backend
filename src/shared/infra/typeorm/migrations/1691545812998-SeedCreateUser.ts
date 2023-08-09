import { hash } from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCreateUser1691545812998 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await hash('opc@2023', 8);
    const id = uuidV4();

    await queryRunner.query(`
      INSERT INTO users(id, name, email, password)
      VALUES ('${id}', 'admin', 'admin@opc.com', '${password}')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM users WHERE email = 'admin@opc.com'
    `);
  }
}
