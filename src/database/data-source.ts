import { DataSource } from 'typeorm';
import config from '../config/config';


const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: config.app.env === 'development', // Enable only in development
  logging: config.app.env === 'development',
  entities: ['app/**/*.entity.js'],
  migrations: ['db/migrations/*.js'],
});

export default AppDataSource;
