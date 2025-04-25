import { createKeyv } from "@keyv/redis";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cacheable } from "cacheable";

@Module({
  imports: [],
  providers: [
    {
      provide: "CACHE_INSTANCE",
      useFactory: (configService: ConfigService) => {
        const redisHost =
          configService.get<string>("REDIS_HOST") ?? "localhost";
        const redisPort = configService.get<number>("REDIS_PORT") || 6379;
        const redisUsername =
          configService.get<string>("REDIS_USERNAME") ?? "default";
        const redisPassword = configService.get<string>("REDIS_PASSWORD");
        const redisUrl = `redis://${redisUsername}:${redisPassword}@${redisHost}:${redisPort}`;
        console.log("Redis URL:", redisUrl);
        const secondary = createKeyv(redisUrl);
        return new Cacheable({ secondary, ttl: "1h" });
      },
      inject: [ConfigService],
    },
  ],
  exports: ["CACHE_INSTANCE"],
})
export class CacheModule {}
