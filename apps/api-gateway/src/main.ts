import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { RpcExceptionFilter } from "./filters/rpc.exception.filter";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1");
  app.useGlobalFilters(new RpcExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`API Gateway is running on: ${process.env.PORT ?? 3000}`);
  });
}
bootstrap();
