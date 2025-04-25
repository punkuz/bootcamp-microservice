import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CacheModule } from "src/cache/cache.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: configService.get<string>("JWT_EXPIRES_IN"),
        },
      }),
      inject: [ConfigService],
    }),
    CacheModule,
    // CacheModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     store: redisStore,
    //     host: configService.get<string>("REDIS_HOST"),
    //     port: configService.get<number>("REDIS_PORT"),
    //     ttl: 3600,
    //   }),
    //   inject: [ConfigService],
    //   isGlobal: true, // if you want cache to be available app-wide
    // }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
