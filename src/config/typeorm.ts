export default {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: parseInt(process.env.TYPEORM_PORT, 10),
  entities: [__dirname + process.env.TYPEORM_ENTITIES],
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
};
