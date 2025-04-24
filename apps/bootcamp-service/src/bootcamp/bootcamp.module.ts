import { Module } from "@nestjs/common";
import { BootcampService } from "./bootcamp.service";
import { BootcampController } from "./bootcamp.controller";
import { Bootcamp } from "./entities/bootcamp.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Bootcamp])],
  controllers: [BootcampController],
  providers: [BootcampService],
})
export class BootcampModule {}
