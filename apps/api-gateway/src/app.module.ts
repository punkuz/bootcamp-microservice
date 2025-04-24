import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { UserController } from "./user/user.controller";
import { BootcampController } from './bootcamp/bootcamp.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "USER_CLIENT",
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL ?? "amqp://localhost:5672"],
          queue: "user_queue",
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: "BOOTCAMP_CLIENT",
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL ?? "amqp://localhost:5672"],
          queue: "bootcamp_queue",
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [UserController, BootcampController],
  providers: [],
})
export class AppModule {}
