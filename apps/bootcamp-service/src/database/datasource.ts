import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  database: "bootcamp",
  logging: true,
  synchronize: false,
  // logger: "simple-console",
  entities: [__dirname + "/../**/*.entity{.ts,.js}"], // Path to entity files
  migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
});
