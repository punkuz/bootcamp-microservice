import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { UserController } from "./user/user.controller";

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
    ]),
  ],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
