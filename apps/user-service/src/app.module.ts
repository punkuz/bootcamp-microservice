import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST ?? "localhost",
      port: 3306,
      username: process.env.DB_USERNAME ?? "root",
      password: process.env.DB_PASSWORD ?? "",
      database: process.env.DB_NAME || "bootcamp",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      // synchronize: process.env.NODE_ENV !== "production",
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
