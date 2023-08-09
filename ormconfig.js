module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASS || 'docker',
  database: process.env.POSTGRES_DB || 'opcua',
  logging: false,
  entities: [
    process.env.PRODUCTION.toLowerCase().trim() === 'true'
      ? './dist/modules/**/infra/typeorm/entities/*.js'
      : './src/modules/**/infra/typeorm/entities/*.ts',
  ],
  migrations: [
    process.env.PRODUCTION.toLowerCase().trim() === 'true'
      ? './dist/shared/infra/typeorm/migrations/*.js'
      : './src/shared/infra/typeorm/migrations/*.ts',
  ],
  subscribers: ['common/subscriber/**/*.ts'],
  cli: {
    migrationsDir:
      process.env.PRODUCTION.toLowerCase().trim() === 'true'
        ? './dist/shared/infra/typeorm/migrations'
        : './src/shared/infra/typeorm/migrations',
  },
};
